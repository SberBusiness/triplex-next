"""A failed GitHub request must not look like an absent release."""
import os
from pathlib import Path
import subprocess
import unittest

import yaml


class FreezeGuardTests(unittest.TestCase):
    def test_release_status_distinguishes_not_found_from_api_failure(self):
        workflow = Path(__file__).resolve().parents[2] / '.github/workflows/release-freeze-guard.yml'
        jobs = yaml.safe_load(workflow.read_text())['jobs']
        commands = next(step['run'] for job in jobs.values() for step in job['steps']
                        if 'V0_STATUS=unknown' in step.get('run', ''))
        classification = commands.split('V0_STATUS=unknown', 1)[1].split('if [ -n "${RUN_URL}" ]; then', 1)[0]
        script = '''set -eu
gh() { printf '%s\\n' "$TEST_RESPONSE"; return "$TEST_EXIT"; }
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
