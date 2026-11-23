"""A failed GitHub request must not look like an absent release."""
import os
from pathlib import Path
import subprocess
import unittest

import yaml


class FreezeGuardTests(unittest.TestCase):
    def test_publication_requires_matching_tag_or_confirmed_absence(self):
        workflow = Path(__file__).resolve().parents[2] / '.github/workflows/release.yml'
        jobs = yaml.safe_load(workflow.read_text())['jobs']
        commands = next(step['run'] for step in jobs['build-and-publish']['steps']
                        if step.get('name') == 'Validate release tag against checkout')
        script = """set -euo pipefail
gh() {
  case "$*" in
    'api --include repos/test/repo/git/ref/tags/0.99.0')
      printf 'HTTP/2.0 %s\\r\\n\\r\\n{}\\n' "$REF_STATUS"
      [[ "$REF_STATUS" == 200 ]] ;;
    'api repos/test/repo/commits/refs/tags/0.99.0 --jq .sha')
      [[ "$REF_STATUS" == 200 ]] || return 99
      printf '%s' "$COMMIT_SHA"; return "$COMMIT_EXIT" ;;
    *) return 99 ;;
  esac
}
git() { [[ "$*" == 'rev-parse HEAD' ]] || return 99; printf '%s' "$TEST_CHECKOUT_SHA"; }
""" + commands
        checkout = 'a' * 40
        cases = (
            (200, checkout, 0, True),
            (200, 'b' * 40, 0, False),
            (200, 'null', 0, False),
            (200, '', 1, False),
            (404, '', 1, True),
            (403, '', 1, False),
            (422, '', 1, False),
            (503, '', 1, False),
        )
        for status, commit, code, succeeds in cases:
            for required in (False, True):
                with self.subTest(status=status, commit=commit, required=required):
                    result = subprocess.run(['bash', '-c', script], capture_output=True, text=True, timeout=5,
                                            env=dict(os.environ, GITHUB_REPOSITORY='test/repo', RELEASE_TAG='0.99.0',
                                                     TEST_CHECKOUT_SHA=checkout, REQUIRE_TAG=str(required).lower(),
                                                     REF_STATUS=str(status), COMMIT_SHA=commit, COMMIT_EXIT=str(code)))
                    self.assertEqual(result.returncode == 0, succeeds and not (required and status == 404),
                                     result.stdout + result.stderr)

    def test_release_status_distinguishes_not_found_from_api_failure(self):
        workflow = Path(__file__).resolve().parents[2] / '.github/workflows/release-freeze-guard.yml'
        jobs = yaml.safe_load(workflow.read_text())['jobs']
        commands = next(step['run'] for job in jobs.values() for step in job['steps']
                        if 'V0_STATUS=unknown' in step.get('run', ''))
        classification = commands.split('V0_STATUS=unknown', 1)[1].split('if [ -n "${RUN_URL}" ]; then', 1)[0]
        script = '''set -eu
gh() {
  [[ "$*" == "api --include repos/test/repo/releases/tags/0.99.0" ]] || return 99
  printf '%s\\n' "$TEST_RESPONSE"; return "$TEST_EXIT"
}
V0_STATUS=unknown
''' + classification + '\nprintf "%s" "$V0_STATUS"\n'
        for response, code, expected in (
            ('HTTP/2.0 200 OK\n\n{}', 0, 'present'),
            ('HTTP/2.0 404 Not Found\n\n{}', 1, 'absent'),
            ('HTTP/2.0 403 Forbidden\n\n{}', 1, 'unknown'),
            ('HTTP/2.0 503 Unavailable\n\n{}', 1, 'unknown'),
            ('', 1, 'unknown'),
            ('HTTP/2.0 503 Unavailable\n\nHTTP/2.0 404 fake', 1, 'unknown'),
        ):
            with self.subTest(response=response):
                result = subprocess.run(['bash', '-c', script], check=True, capture_output=True,
                                        text=True, timeout=5, env=dict(os.environ, GITHUB_REPOSITORY='test/repo',
                                        V0='0.99.0', TEST_RESPONSE=response, TEST_EXIT=str(code)))
                self.assertEqual(result.stdout, expected)


if __name__ == '__main__':
    unittest.main()
