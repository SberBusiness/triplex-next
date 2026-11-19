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
    assert args[args.index('--state') + 1] == 'all'
    entries = [{'number': 999, 'isCrossRepository': True, 'state': 'OPEN', 'headRefOid': 'a' * 40}]
    if case != 'create' or (root / 'created').exists():
        entries.append({'number': 42, 'isCrossRepository': False,
                        'state': 'MERGED' if case == 'merged' else ('CLOSED' if case == 'closed' else 'OPEN'),
                        'headRefOid': 'b' * 40 if case == 'wrong_sha' else os.environ['SHA']})
    print(json.dumps(entries))
elif args[:2] == ['pr', 'create']:
    (root / 'created').touch()
elif args[:2] == ['pr', 'view']:
    assert args[args.index('--json') + 1] == 'headRefOid,statusCheckRollup'
    names = ['AI.md tokens', 'Build library', 'E2E tests', 'Unit tests',
             'Visual regression tests', 'Deployment safety', 'Python security']
    checks = [{'__typename': 'CheckRun', 'name': name, 'status': 'COMPLETED', 'conclusion': 'SUCCESS'} for name in names]
    if case == 'snapshot_pending':
        checks[-1]['status'] = 'IN_PROGRESS'
    if case == 'snapshot_missing':
        checks.pop()
    print(json.dumps({'headRefOid': 'b' * 40 if case == 'head_moved' else os.environ['SHA'],
                      'statusCheckRollup': checks}))
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
    if (root / 'watched').exists() and case == 'post_watch_error':
        print('HTTP 503: Unavailable', file=sys.stderr)
        sys.exit(1)
    names = ['AI.md tokens', 'Build library', 'E2E tests', 'Unit tests',
             'Visual regression tests', 'Deployment safety', 'Python security']
    if case == 'never_all' or (case == 'partial' and count == 0):
        print(json.dumps([{'name': 'Build library', 'bucket': 'pass'}]))
        sys.exit(0)
    (root / 'all_checks').touch()
    bucket = 'pass' if (root / 'watched').exists() else 'pending'
    checks = [{'name': name, 'bucket': 'fail' if case == 'failed' else bucket} for name in names]
    if (root / 'watched').exists():
        if case == 'cancel_during_watch':
            checks[-1]['bucket'] = 'cancel'
        if case == 'partial_after_watch':
            checks.pop()
    print(json.dumps(checks))
    # --json exports the response and returns zero even for pending/failing checks.
    sys.exit(0)
else:
    raise AssertionError(args)
'''


class OpenReleasePrTests(unittest.TestCase):
    def test_pr_selection_and_required_check_registration(self):
        for base, version in (('main', '1.99.0'), ('release-0', '0.99.0')):
            for case in ('reuse', 'create', 'delayed', 'partial', 'never_all', 'failed', 'missing',
                         'watch_failure', 'forbidden', 'transient', 'invalid_json', 'merged', 'closed',
                         'wrong_sha', 'cancel_during_watch', 'partial_after_watch', 'post_watch_error', 'manual',
                         'head_moved', 'snapshot_pending', 'snapshot_missing'):
                with self.subTest(base=base, case=case), tempfile.TemporaryDirectory() as directory:
                    root = Path(directory)
                    for name, source in (('gh', GH), ('sleep', '#!/bin/sh\nexit 0\n')):
                        path = root / name
                        path.write_text(source)
                        path.chmod(0o700)
                    env = dict(os.environ, PATH=directory + os.pathsep + os.environ['PATH'],
                               TEST_ROOT=directory, TEST_CASE=case, BASE_BRANCH=base,
                               VERSION=version, BRANCH='prerelease-' + version + ('' if case == 'manual' else '-run-123-1'),
                               SHA='a' * 40,
                               GITHUB_REPOSITORY='test/repo', GITHUB_OUTPUT=str(root / 'output'),
                               GITHUB_STEP_SUMMARY=str(root / 'summary'))
                    result = subprocess.run(['bash', str(SCRIPT)], env=env, capture_output=True,
                                            text=True, timeout=10, check=False)
                    self.assertEqual(result.returncode == 0, case in ('reuse', 'create', 'delayed', 'partial', 'transient', 'merged', 'manual'),
                                     result.stdout + result.stderr)
                    if case in ('closed', 'wrong_sha'):
                        self.assertFalse((root / 'output').exists())
                    else:
                        self.assertEqual((root / 'output').read_text(), 'pr=42\n')
                    self.assertEqual((root / 'created').exists(), case == 'create')
                    self.assertEqual((root / 'watched').exists(), case in ('reuse', 'create', 'delayed', 'partial', 'transient', 'watch_failure',
                                              'cancel_during_watch', 'partial_after_watch', 'post_watch_error', 'manual',
                                              'head_moved', 'snapshot_pending', 'snapshot_missing'))
                    if case in ('delayed', 'partial'):
                        self.assertEqual((root / 'polls').read_text(), '3')
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
