import importlib.util
import io
import json
import os
from pathlib import Path
import tarfile
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('receiver', Path(__file__).with_name('storybook-receive.py'))
receiver = importlib.util.module_from_spec(spec)
spec.loader.exec_module(receiver)


def bundle(files, unsafe=None):
    stream = io.BytesIO()
    with tarfile.open(fileobj=stream, mode='w:gz') as archive:
        for name, data in files.items():
            info = tarfile.TarInfo(name)
            info.size = len(data)
            archive.addfile(info, io.BytesIO(data))
        if unsafe:
            archive.addfile(unsafe)
    return io.BytesIO(stream.getvalue())


class Publication(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        for name in ('BASE', 'PUBLIC', 'SHARED'):
            setattr(receiver, name, root / name)
            getattr(receiver, name).mkdir()
        self.files = {'index.html': b'first', 'iframe.html': b'frame', 'index.json': b'{}', 'assets/old-hash.js': b'old'}

    def run_deploy(self, command, files=None, unsafe=None):
        with patch.dict(os.environ, {'SSH_ORIGINAL_COMMAND': command}), patch('sys.stdin', SimpleNamespace(buffer=bundle(files or self.files, unsafe))):
            receiver.main()

    def test_switch_retains_old_chunks_and_reports_revision(self):
        self.run_deploy('deploy main ' + 'a' * 40)
        old = (receiver.PUBLIC / 'main').resolve()
        self.run_deploy('deploy main ' + 'b' * 40, {'index.html': b'second', 'iframe.html': b'frame', 'index.json': b'{}', 'assets/new-hash.js': b'new'})
        public = receiver.PUBLIC / 'main'
        self.assertNotEqual(public.resolve(), old)
        self.assertEqual((public / 'index.html').read_bytes(), b'second')
        self.assertEqual((receiver.SHARED / 'main/old-hash.js').read_bytes(), b'old')
        self.assertTrue(old.exists())
        self.assertEqual(json.loads((public / 'deployment.json').read_text())['revision'], 'b' * 40)

    def test_incomplete_upload_does_not_replace_live_site(self):
        self.run_deploy('deploy main ' + 'a' * 40)
        old = (receiver.PUBLIC / 'main').resolve()
        with self.assertRaises(ValueError):
            self.run_deploy('deploy main ' + 'b' * 40, {'index.html': b'broken'})
        self.assertEqual((receiver.PUBLIC / 'main').resolve(), old)

    def test_rejects_traversal_absolute_paths_and_links(self):
        for name, kind in [('../outside', tarfile.REGTYPE), ('/tmp/outside', tarfile.REGTYPE), ('link', tarfile.SYMTYPE), ('hardlink', tarfile.LNKTYPE)]:
            with self.subTest(name=name):
                unsafe = tarfile.TarInfo(name)
                unsafe.type = kind
                unsafe.linkname = '/etc/passwd'
                with self.assertRaises(ValueError):
                    self.run_deploy('deploy main ' + 'a' * 40, unsafe=unsafe)
                self.assertFalse((receiver.PUBLIC / 'main').exists())

    def test_key_cannot_run_shell_or_remove_main(self):
        for command in ['id', 'sudo id', 'remove main', 'deploy ../main ' + 'a' * 40, 'deploy release-.. ' + 'a' * 40, 'deploy main bad', 'deploy main ' + 'a' * 40 + '; id']:
            with self.subTest(command=command), self.assertRaises(ValueError):
                self.run_deploy(command)

    def test_preview_cleanup_preserves_main(self):
        self.run_deploy('deploy main ' + 'a' * 40)
        self.run_deploy('deploy pr-123 ' + 'b' * 40)
        self.run_deploy('remove pr-123')
        self.assertTrue((receiver.PUBLIC / 'main/index.html').exists())
        self.assertFalse((receiver.PUBLIC / 'pr-123').exists())
        self.assertFalse((receiver.SHARED / 'pr-123').exists())


if __name__ == '__main__':
    unittest.main()
