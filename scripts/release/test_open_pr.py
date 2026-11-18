"""PR selection and delayed registration of required checks."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).with_name('open-pr.sh')
GH = '''#!/usr/bin/env python3
import json, os, subprocess, sys
from pathlib import Path
args = sys.argv[1:]
root = Path(os.environ['TEST_ROOT'])
case = os.environ['TEST_CASE']
if args[:2] == ['pr', 'list']:
    assert args[args.index('--base') + 1] == os.environ['BASE_BRANCH']
    assert args[args.index('--head') + 1] == os.environ['BRANCH']
    entries = [{'number': 999, 'isCrossRepository': True}]
    if case != 'create' or (root / 'created').exists():
        entries.append({'number': 42, 'isCrossRepository': False})
    # Apply the real selection expression, including the fork exclusion.
    subprocess.run(['jq', '-r', args[args.index('--jq') + 1]],
                   input=json.dumps(entries), text=True, check=True)
elif args[:2] == ['pr', 'create']:
    (root / 'created').touch()
elif args[:2] == ['pr', 'checks']:
    assert args[2] == '42', 'must not reuse the fork PR'
    assert '--required' in args, 'unrelated checks must not end registration wait'
    if '--watch' in args:
        assert (root / 'all_checks').exists(), 'watch cannot prove unregistered checks passed'
        (root / 'watched').touch()
        sys.exit(1 if case == 'watch_failure' else 0)
    counter = root / 'polls'
    count = int(counter.read_text()) if counter.exists() else 0
    counter.write_text(str(count + 1))
    if case == 'forbidden' or (case == 'transient' and count < 2):
        print('HTTP 403: Resource not accessible', file=sys.stderr)
        sys.exit(1)
    if case == 'missing' or (case == 'delayed' and count == 0):
        print("no required checks reported on the 'prerelease-test' branch", file=sys.stderr)
        sys.exit(1)
    if case == 'invalid_json':
        print('invalid JSON')
        sys.exit(0)
    names = ['AI.md tokens', 'Build library', 'E2E tests', 'Unit tests',
             'Visual regression tests', 'Deployment safety', 'Python security']
    if case == 'never_all' or (case == 'partial' and count == 0):
        print(json.dumps([{'name': 'Build library', 'bucket': 'pass'}]))
        sys.exit(0)
    (root / 'all_checks').touch()
    print(json.dumps([{'name': name, 'bucket': 'fail' if case == 'failed' else 'pending'}
                      for name in names]))
    # --json exports the response and returns zero even for pending/failing checks.
    sys.exit(0)
else:
    raise AssertionError(args)
'''


class OpenReleasePrTests(unittest.TestCase):
    def test_pr_selection_and_required_check_registration(self):
        for base, version in (('main', '1.99.0'), ('release-0', '0.99.0')):
            for case in ('reuse', 'create', 'delayed', 'partial', 'never_all', 'failed', 'missing',
                         'watch_failure', 'forbidden', 'transient', 'invalid_json'):
                with self.subTest(base=base, case=case), tempfile.TemporaryDirectory() as directory:
                    root = Path(directory)
                    for name, source in (('gh', GH), ('sleep', '#!/bin/sh\nexit 0\n')):
                        path = root / name
                        path.write_text(source)
                        path.chmod(0o700)
                    env = dict(os.environ, PATH=directory + os.pathsep + os.environ['PATH'],
                               TEST_ROOT=directory, TEST_CASE=case, BASE_BRANCH=base,
                               VERSION=version, BRANCH='prerelease-' + version,
                               GITHUB_REPOSITORY='test/repo', GITHUB_OUTPUT=str(root / 'output'),
                               GITHUB_STEP_SUMMARY=str(root / 'summary'))
                    result = subprocess.run(['bash', str(SCRIPT)], env=env, capture_output=True,
                                            text=True, timeout=10, check=False)
                    self.assertEqual(result.returncode == 0, case in ('reuse', 'create', 'delayed', 'partial', 'transient'),
                                     result.stdout + result.stderr)
                    self.assertEqual((root / 'output').read_text(), 'pr=42\n')
                    self.assertEqual((root / 'created').exists(), case == 'create')
                    self.assertEqual((root / 'watched').exists(), case in ('reuse', 'create', 'delayed', 'partial', 'transient', 'watch_failure'))
                    if case in ('delayed', 'partial'):
                        self.assertEqual((root / 'polls').read_text(), '2')
                    if case == 'never_all':
                        self.assertIn('Deployment safety', result.stdout)
                        self.assertIn('Python security', result.stdout)
                    if case == 'forbidden':
                        self.assertEqual((root / 'polls').read_text(), '3')
                        self.assertIn('Не удалось получить статусы', result.stdout)
                    if case == 'missing':
                        self.assertIn('не зарегистрированы', result.stdout)


if __name__ == '__main__':
    unittest.main()
