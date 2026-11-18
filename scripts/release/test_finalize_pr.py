"""Release merge guards, with local stand-ins for GitHub and Git commands."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).with_name('finalize-pr.sh')
SHA = 'a' * 40
MERGED = 'c' * 40

GH = '''#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
args = sys.argv[1:]
root = Path(os.environ['TEST_ROOT'])
case = os.environ['TEST_CASE']
with (root / 'commands').open('a') as log:
    log.write(json.dumps(['gh', *args]) + '\\n')
if args[:2] == ['pr', 'view']:
    count = root / 'polls'
    n = int(count.read_text()) if count.exists() else 0
    count.write_text(str(n + 1))
    merged = case == 'already_merged' or (root / 'merged').exists()
    print(json.dumps({
        'headRefOid': 'b' * 40 if case == 'wrong_head' else os.environ['SHA'],
        'headRefName': 'unexpected' if case == 'wrong_branch' else os.environ['BRANCH'],
        'baseRefName': 'unexpected' if case == 'wrong_base' else os.environ['BASE_BRANCH'],
        'state': 'MERGED' if merged else ('CLOSED' if case == 'closed' else 'OPEN'),
        'reviewDecision': 'REVIEW_REQUIRED' if case == 'wait' and n == 0 else 'APPROVED',
        'mergeCommit': {'oid': 'c' * 40},
    }))
elif args[:3] == ['api', '--method', 'PUT']:
    assert 'sha=' + os.environ['SHA'] in args
    assert 'merge_method=merge' in args
    if case == 'server_rejected':
        sys.exit(1)
    (root / 'merged').touch()
    print('c' * 40)
elif args[:3] == ['api', '--method', 'DELETE']:
    assert args[3].endswith('/git/refs/heads/' + os.environ['BRANCH'])
else:
    raise AssertionError(args)
'''

GIT = '''#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
args = sys.argv[1:]
root = Path(os.environ['TEST_ROOT'])
case = os.environ['TEST_CASE']
with (root / 'commands').open('a') as log:
    log.write(json.dumps(['git', *args]) + '\\n')
if args[0] == 'rev-parse':
    print(('d' if case == 'base_moved' and args[1].startswith('origin/') else 'b') * 40)
elif args[0] == 'diff':
    if '--exit-code' in args and case == 'merge_changed_content':
        sys.exit(1)
    if '--quiet' in args:
        if case == 'main_moved' or (case == 'main_moved_during_merge' and (root / 'merged').exists()):
            sys.exit(1)
elif args[:3] == ['fetch', 'origin', 'c' * 40] and case == 'retry_after_merge':
    failed = root / 'fetch_failed'
    if not failed.exists():
        failed.touch()
        sys.exit(1)
elif args[0] not in ('fetch', 'cat-file'):
    raise AssertionError(args)
'''


class FinalizeReleaseTests(unittest.TestCase):
    def run_case(self, case, base='main', succeeds=True, merges=True, retry=False, **overrides):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            commands = root / 'bin'
            commands.mkdir()
            for name, source in (('gh', GH), ('git', GIT), ('sleep', '#!/bin/sh\nexit 0\n')):
                path = commands / name
                path.write_text(source)
                path.chmod(0o700)
            env = dict(os.environ, PATH=str(commands) + os.pathsep + os.environ['PATH'],
                       TEST_CASE=case, TEST_ROOT=directory, BASE_BRANCH=base,
                       SHA=SHA, PR='42', BRANCH=f'prerelease-{0 if base == "release-0" else 1}.99.0',
                       VERIFIED_MAIN='e' * 40, GITHUB_REPOSITORY='test/repo',
                       GITHUB_OUTPUT=str(root / 'output'), GITHUB_STEP_SUMMARY=str(root / 'summary'))
            env.update(overrides)

            def run():
                return subprocess.run(['bash', str(SCRIPT)], env=env, text=True,
                                      capture_output=True, timeout=10, check=False)

            result = run()
            self.assertEqual(result.returncode == 0, succeeds, result.stdout + result.stderr)
            if retry:
                self.assertFalse((root / 'output').exists())
                result = run()
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertEqual((root / 'merged').exists(), merges)
            log = root / 'commands'
            calls = [json.loads(line) for line in log.read_text().splitlines()] if log.exists() else []
            self.assertFalse(any('--admin' in call or call[:2] == ['git', 'push'] for call in calls))
            if succeeds or retry:
                self.assertEqual((root / 'output').read_text(), f'sha={MERGED}\n')
                self.assertEqual(sum(call[:4] == ['gh', 'api', '--method', 'PUT'] for call in calls),
                                 1 if merges else 0)
            else:
                self.assertFalse((root / 'output').exists())
                self.assertFalse(any(call[:4] == ['gh', 'api', '--method', 'DELETE'] for call in calls))

    def test_both_bases_require_review_and_preserve_tree(self):
        for base in ('main', 'release-0'):
            for case in ('approved', 'wait'):
                with self.subTest(base=base, case=case):
                    self.run_case(case, base)

    def test_changed_or_closed_pr_never_merges(self):
        for base in ('main', 'release-0'):
            for case in ('wrong_head', 'wrong_branch', 'wrong_base', 'closed', 'base_moved', 'server_rejected'):
                with self.subTest(base=base, case=case):
                    self.run_case(case, base, succeeds=False, merges=False)

    def test_merge_must_preserve_prepared_tree(self):
        for base in ('main', 'release-0'):
            with self.subTest(base=base):
                self.run_case('merge_changed_content', base, succeeds=False)

    def test_already_merged_pr_is_not_merged_again(self):
        for base in ('main', 'release-0'):
            with self.subTest(base=base):
                self.run_case('already_merged', base, merges=False)

    def test_retry_after_merge_does_not_prepare_or_merge_again(self):
        for base in ('main', 'release-0'):
            with self.subTest(base=base):
                self.run_case('retry_after_merge', base, succeeds=False, retry=True)

    def test_react17_rechecks_main_before_and_after_merge(self):
        self.run_case('main_moved', 'release-0', succeeds=False, merges=False)
        self.run_case('main_moved_during_merge', 'release-0', succeeds=False)

    def test_invalid_inputs_stop_before_github(self):
        for overrides in ({'BASE_BRANCH': 'feature'}, {'SHA': 'bad'}, {'PR': '-1'},
                          {'BRANCH': 'main'}, {'BRANCH': 'prerelease-0.99.0'}):
            with self.subTest(overrides=overrides):
                self.run_case('approved', succeeds=False, merges=False, **overrides)
        self.run_case('approved', 'release-0', succeeds=False, merges=False, VERIFIED_MAIN='')


if __name__ == '__main__':
    unittest.main()
