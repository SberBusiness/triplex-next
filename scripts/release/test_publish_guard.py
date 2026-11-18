"""Publication retries must not attach an existing npm version to another commit."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

import yaml


WORKFLOW = Path(__file__).resolve().parents[2] / '.github/workflows/release.yml'
SHA = 'a' * 40


class PublishGuardTests(unittest.TestCase):
    def test_all_publication_paths_recheck_tags_and_share_a_version_queue(self):
        workflow = yaml.safe_load(WORKFLOW.read_text())
        self.assertEqual(workflow['concurrency'], {
            'group': 'release-package-${{ github.event.release.tag_name || inputs.tag }}',
            'cancel-in-progress': False, 'queue': 'max'})
        steps = workflow['jobs']['build-and-publish']['steps']
        positions = [i for i, step in enumerate(steps) if step.get('name') == 'Validate release tag against checkout']
        self.assertEqual(len(positions), 3)
        publish = next(i for i, step in enumerate(steps) if step.get('name') == 'Publish to npm')
        release = next(i for i, step in enumerate(steps) if step.get('name') == 'Create GitHub Release')
        assets = next(i for i, step in enumerate(steps) if step.get('name') == 'Create dist.zip')
        self.assertTrue(positions[0] < publish < positions[1] < release < positions[2] < assets)
        for position in positions:
            self.assertNotIn('if', steps[position])
            self.assertIs(steps[position].get('continue-on-error', False), False)
            self.assertEqual(steps[position]['run'], steps[positions[0]]['run'])

    def test_existing_npm_version_must_match_the_checked_out_commit(self):
        steps = yaml.safe_load(WORKFLOW.read_text())['jobs']['build-and-publish']['steps']
        commands = next(step['run'] for step in steps if step.get('name') == 'Publish to npm')
        guard = 'BUILD_SHA=' + commands.split('BUILD_SHA=', 1)[1].split('# Порядок половин', 1)[0]
        script = '''set -euo pipefail
git() { [[ "$*" == 'rev-parse HEAD' ]] || return 99; printf '%s' "$TEST_SHA"; }
npm() {
  if [[ "$*" == "pkg set gitHead=${TEST_SHA}" ]]; then return 0; fi
  [[ "$*" == 'view @sberbusiness/triplex-next@0.99.0 --json --prefer-online --registry=https://registry.npmjs.org' ]] || return 99
  printf '%s' "$TEST_METADATA"; return "$TEST_EXIT"
}
''' + guard + '\nprintf "new-version"\n'
        metadata = {'name': '@sberbusiness/triplex-next', 'version': '0.99.0', 'gitHead': SHA}
        for data, code, expected in (
            (metadata, 0, 'existing'),
            ({**metadata, 'gitHead': 'b' * 40}, 0, 'stop'),
            ({**metadata, 'gitHead': None}, 0, 'stop'),
            ({**metadata, 'version': '0.98.0'}, 0, 'stop'),
            ({'error': {'code': 'E404'}}, 1, 'new'),
            ({'error': {'code': 'E503'}}, 1, 'stop'),
            ({}, 0, 'stop'),
        ):
            with self.subTest(data=data), tempfile.TemporaryDirectory() as directory:
                output = Path(directory) / 'output'
                result = subprocess.run(['bash', '-c', script], capture_output=True, text=True, timeout=5,
                                        env=dict(os.environ, TEST_SHA=SHA, TEST_METADATA=json.dumps(data),
                                        TEST_EXIT=str(code), RELEASE_TAG='0.99.0', GITHUB_OUTPUT=str(output)))
                self.assertEqual(result.returncode == 0, expected != 'stop', result.stdout + result.stderr)
                self.assertEqual(output.read_text() if output.exists() else '',
                                 'published=false\n' if expected == 'existing' else '')
                self.assertEqual('new-version' in result.stdout, expected == 'new')

    def test_workflow_difference_stops_before_npm_and_release_uses_checkout_sha(self):
        steps = yaml.safe_load(WORKFLOW.read_text())['jobs']['build-and-publish']['steps']
        guard = next(step for step in steps if step.get('name') == 'Check workflow compatibility for GitHub Release')
        publish = next(step for step in steps if step.get('name') == 'Publish to npm')
        release = next(step for step in steps if step.get('name') == 'Create GitHub Release')
        self.assertLess(steps.index(guard), steps.index(publish))
        self.assertEqual(guard['if'], "github.event_name != 'release'")
        self.assertIs(guard.get('continue-on-error', False), False)
        target_script = '''set -euo pipefail
git() { [[ "$*" == 'rev-parse HEAD' ]] || return 99; printf '%s' "$TEST_SHA"; }
''' + release['run'].split('# Пустой notes', 1)[0] + '\nprintf "%s" "$TARGET"\n'
        result = subprocess.run(['bash', '-c', target_script], capture_output=True, text=True, timeout=5,
                                check=True, env=dict(os.environ, TARGET='moving-branch', TEST_SHA=SHA))
        self.assertEqual(result.stdout, SHA)
        script = '''set -euo pipefail
gh() { [[ "$*" == 'api repos/test/repo --jq .default_branch' ]] || return 99; echo main; }
git() {
  if [[ "$*" == 'fetch --no-tags --depth=1 origin refs/heads/main' ]]; then return "$FETCH_EXIT"; fi
  [[ "$*" == 'diff --quiet HEAD FETCH_HEAD -- .github/workflows' ]] || return 99
  return "$DIFF_EXIT"
}
''' + guard['run']
        for fetch, diff in ((0, 0), (1, 0), (0, 1)):
            with self.subTest(fetch=fetch, diff=diff):
                result = subprocess.run(['bash', '-c', script], capture_output=True, text=True, timeout=5,
                                        env=dict(os.environ, GITHUB_REPOSITORY='test/repo',
                                        FETCH_EXIT=str(fetch), DIFF_EXIT=str(diff)))
                self.assertEqual(result.returncode == 0, fetch == diff == 0, result.stdout + result.stderr)


if __name__ == '__main__':
    unittest.main()
