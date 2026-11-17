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


def bundle(files, unsafe=None, roots=0):
    stream = io.BytesIO()
    with tarfile.open(fileobj=stream, mode='w:gz') as archive:
        for _ in range(roots):
            info = tarfile.TarInfo('./')
            info.type = tarfile.DIRTYPE
            archive.addfile(info)
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

    def run_deploy(self, command, files=None, unsafe=None, scope="production", mirror=False, roots=0):
        with patch.dict(os.environ, {'SSH_ORIGINAL_COMMAND': command}), patch('sys.stdin', SimpleNamespace(buffer=bundle(files or self.files, unsafe, roots))):
            receiver.main(scope, mirror)

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

    def test_first_mirror_deployment_creates_state_directory(self):
        receiver.BASE.rmdir()
        self.run_deploy('deploy main ' + 'a' * 40, mirror=True)
        self.assertTrue((receiver.BASE / 'deploy.lock').is_file())
        self.assertTrue((receiver.PUBLIC / 'main/index.html').is_file())

    def test_mirror_retains_old_chunks_without_nginx_changes(self):
        self.run_deploy('deploy main ' + 'a' * 40, mirror=True)
        self.run_deploy('deploy main ' + 'b' * 40,
                        {'index.html': b'next', 'iframe.html': b'frame', 'index.json': b'{}', 'assets/new.js': b'next'}, mirror=True)
        self.assertEqual((receiver.PUBLIC / 'main/assets/old-hash.js').read_bytes(), b'old')
        self.assertEqual((receiver.PUBLIC / 'main/assets/new.js').read_bytes(), b'next')

    def test_incomplete_upload_does_not_replace_live_site(self):
        self.run_deploy('deploy main ' + 'a' * 40)
        old = (receiver.PUBLIC / 'main').resolve()
        with self.assertRaises(ValueError):
            self.run_deploy('deploy main ' + 'b' * 40, {'index.html': b'broken'})
        self.assertEqual((receiver.PUBLIC / 'main').resolve(), old)

    def test_single_archive_root_is_accepted(self):
        self.run_deploy('deploy main ' + 'a' * 40, roots=1)
        self.assertTrue((receiver.PUBLIC / 'main/index.html').is_file())

    def test_duplicate_archive_roots_are_rejected(self):
        with self.assertRaisesRegex(ValueError, 'Duplicate archive member'):
            self.run_deploy('deploy main ' + 'a' * 40, roots=2)
        self.assertFalse((receiver.PUBLIC / 'main').exists())

    def test_archive_root_counts_toward_member_limit(self):
        with patch.object(receiver, 'MAX_MEMBERS', len(self.files)):
            self.run_deploy('deploy main ' + 'a' * 40)
            old = (receiver.PUBLIC / 'main').resolve()
            with self.assertRaisesRegex(ValueError, 'Archive exceeds deployment limit'):
                self.run_deploy('deploy main ' + 'b' * 40, roots=1)
            self.assertEqual((receiver.PUBLIC / 'main').resolve(), old)

    def test_failed_asset_copy_preserves_live_chunk_and_site(self):
        self.run_deploy('deploy main ' + 'a' * 40)
        old = (receiver.PUBLIC / 'main').resolve()
        files = {**self.files, 'assets/old-hash.js': b'changed'}

        def fail_after_partial_copy(source, target):
            Path(target).write_bytes(b'partial')
            raise OSError('copy failed')

        with patch.object(receiver.shutil, 'copyfile', side_effect=fail_after_partial_copy):
            with self.assertRaisesRegex(OSError, 'copy failed'):
                self.run_deploy('deploy main ' + 'b' * 40, files)
        shared = receiver.SHARED / 'main'
        self.assertEqual((shared / 'old-hash.js').read_bytes(), b'old')
        self.assertEqual((receiver.PUBLIC / 'main').resolve(), old)
        self.assertEqual(sorted(p.name for p in shared.iterdir()), ['old-hash.js'])

    def test_identical_assets_are_not_rewritten(self):
        self.run_deploy('deploy main ' + 'a' * 40)
        asset = receiver.SHARED / 'main/old-hash.js'
        inode = asset.stat().st_ino
        with patch.object(receiver.shutil, 'copyfile', side_effect=AssertionError('unexpected copy')):
            self.run_deploy('deploy main ' + 'b' * 40)
        self.assertEqual(asset.stat().st_ino, inode)

    def test_asset_replacement_preserves_in_flight_reader(self):
        self.run_deploy('deploy main ' + 'a' * 40)
        asset = receiver.SHARED / 'main/old-hash.js'
        with asset.open('rb') as reader:
            self.run_deploy('deploy main ' + 'b' * 40, {**self.files, 'assets/old-hash.js': b'changed'})
            self.assertEqual(reader.read(), b'old')
        self.assertEqual(asset.read_bytes(), b'changed')
        self.assertEqual(asset.stat().st_mode & 0o777, 0o644)

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

    def test_preview_key_cannot_publish_production(self):
        for channel in ('main', 'release-0', 'releases/1.49.0'):
            with self.subTest(channel=channel), self.assertRaises(ValueError):
                self.run_deploy('deploy ' + channel + ' ' + 'a' * 40, scope='preview')
        self.assertEqual(list(receiver.PUBLIC.iterdir()), [])

    def test_production_key_cannot_modify_previews(self):
        for command in ('deploy pr-123 ' + 'a' * 40, 'remove pr-123'):
            with self.subTest(command=command), self.assertRaises(ValueError):
                self.run_deploy(command)

    def test_unknown_key_scope_is_rejected(self):
        with self.assertRaises(ValueError):
            self.run_deploy('deploy main ' + 'a' * 40, scope=None)

    def test_preview_cleanup_preserves_main(self):
        self.run_deploy('deploy main ' + 'a' * 40)
        self.run_deploy('deploy pr-123 ' + 'b' * 40, scope='preview')
        self.run_deploy('remove pr-123', scope='preview')
        self.assertTrue((receiver.PUBLIC / 'main/index.html').exists())
        self.assertFalse((receiver.PUBLIC / 'pr-123').exists())
        self.assertFalse((receiver.SHARED / 'pr-123').exists())


if __name__ == '__main__':
    unittest.main()
