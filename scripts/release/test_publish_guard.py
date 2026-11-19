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
    def test_recovery_exception_cannot_recreate_a_missing_release(self):
        steps = yaml.safe_load(WORKFLOW.read_text())['jobs']['build-and-publish']['steps']
        step = next(step for step in steps if step.get('name') == 'Create GitHub Release')
        self.assertEqual(step['env']['RECOVERY_ONLY'], "${{ steps.compatibility.outputs.recovery == 'true' }}")
        self.assertEqual(next(step for step in steps if step.get('name') == 'Check workflow compatibility for GitHub Release')['id'], 'compatibility')
        script = '''set -euo pipefail
git() { [[ "$*" == 'rev-parse HEAD' ]] || return 99; printf '%s' "$TEST_SHA"; }
gh() {
  printf '%s\n' "$*" >> "$GH_CALLS"
  [[ "$*" == 'api repos/test/repo/releases/tags/1.99.0' ]] || return 99
  printf '%s' "$TEST_RELEASE"; return "$TEST_EXIT"
}
''' + step['run'] + '\necho must-not-reach-creation\n'
        for case in ('published', 'missing', 'draft', 'wrong_tag'):
            with self.subTest(case=case), tempfile.TemporaryDirectory() as directory:
                calls = Path(directory) / 'gh-calls'
                info = {'tag_name': '0.99.0' if case == 'wrong_tag' else '1.99.0',
                        'draft': case == 'draft', 'published_at': '2026-01-01T00:00:00Z'}
                result = subprocess.run(['bash', '-c', script], cwd=directory, capture_output=True, text=True, timeout=5,
                                        env=dict(os.environ, GITHUB_REPOSITORY='test/repo', RELEASE_TAG='1.99.0',
                                        RECOVERY_ONLY='true', TEST_SHA=SHA, TEST_RELEASE=json.dumps(info),
                                        TEST_EXIT='1' if case == 'missing' else '0', GH_CALLS=str(calls),
                                        NOTES='Test notes', MAKE_LATEST='true'))
                self.assertEqual(result.returncode == 0, case == 'published', result.stdout + result.stderr)
                self.assertNotIn('must-not-reach-creation', result.stdout)
                self.assertNotIn('release create', calls.read_text())

    def test_mcp_eligibility_uses_actual_release_prerelease_flag(self):
        steps = yaml.safe_load(WORKFLOW.read_text())['jobs']['build-and-publish']['steps']
        step = next(step for step in steps if step.get('name') == 'Detect MCP bundle eligibility')
        script = r'''set -euo pipefail
gh() {
  [[ "$RELEASE_TAG" =~ ^1\.[0-9]+\.0$ ]] || { echo unexpected-api-call >&2; return 99; }
  [[ "$*" == "api repos/test/repo/releases/tags/${RELEASE_TAG} --jq .prerelease" ]] || return 99
  printf '%s' "$TEST_PRERELEASE"; return "$TEST_EXIT"
}
''' + step['run']
        for version, prerelease, code, expected in (
            ('1.99.0', 'false', 0, 'true'), ('1.99.0', 'true', 0, 'false'),
            ('0.99.0', 'false', 0, 'false'), ('0.99.0', 'true', 0, 'false'),
            ('0.99.0', '', 1, 'false'), ('1.99.1', '', 1, 'false'),
            ('1.99.0-beta', '', 1, 'false'),
            ('1.99.0', 'null', 0, None), ('1.99.0', '', 1, None),
        ):
            with self.subTest(version=version, prerelease=prerelease), tempfile.TemporaryDirectory() as directory:
                output = Path(directory) / 'output'
                result = subprocess.run(['bash', '-c', script], capture_output=True, text=True, timeout=5,
                                        env=dict(os.environ, GITHUB_REPOSITORY='test/repo', RELEASE_TAG=version,
                                        TEST_PRERELEASE=prerelease, TEST_EXIT=str(code), GITHUB_OUTPUT=str(output)))
                self.assertEqual(result.returncode == 0, expected is not None, result.stdout + result.stderr)
                self.assertNotIn('unexpected-api-call', result.stderr)
                self.assertEqual(output.read_text() if output.exists() else '',
                                 f'eligible={expected}\n' if expected is not None else '')

    def test_asset_uploads_never_create_a_release(self):
        steps = yaml.safe_load(WORKFLOW.read_text())['jobs']['build-and-publish']['steps']
        for name, filename in (('Upload build artifacts to GitHub Release', 'dist-1.99.0.zip'),
                               ('Upload MCP bundle to GitHub Release', 'mcp-data-1.99.0.json')):
            with self.subTest(name=name):
                step = next(step for step in steps if step.get('name') == name)
                script = 'set -euo pipefail\ngh() { printf "%s\\n" "$*"; }\n' + step['run']
                result = subprocess.run(['bash', '-c', script], check=True, capture_output=True, text=True,
                                        timeout=5, env=dict(os.environ, RELEASE_TAG='1.99.0'))
                self.assertEqual(result.stdout, f'release upload 1.99.0 {filename} --clobber\n')

    def test_existing_publication_can_recover_after_workflow_changes(self):
        steps = yaml.safe_load(WORKFLOW.read_text())['jobs']['build-and-publish']['steps']
        guard = next(step for step in steps if step.get('name') == 'Check workflow compatibility for GitHub Release')
        script = '''set -euo pipefail
gh() {
  case "$*" in
    'api repos/test/repo/releases/tags/0.99.0') printf '%s' "$RELEASE_INFO_TEST" ;;
    'api repos/test/repo/commits/refs/tags/0.99.0 --jq .sha') printf '%s' "$TAG_SHA_TEST" ;;
    'api repos/test/repo --jq .default_branch') echo main ;;
    *) return 99 ;;
  esac
}
git() {
  case "$*" in
    'rev-parse HEAD') printf '%s' "$CHECKOUT_SHA_TEST" ;;
    'fetch --no-tags --depth=1 origin refs/heads/main') return 0 ;;
    'diff --quiet HEAD FETCH_HEAD -- .github/workflows') return 1 ;;
    *) return 99 ;;
  esac
}
curl() {
  [[ "$*" == '-fsS --max-time 30 -H Cache-Control: no-cache https://registry.npmjs.org/@sberbusiness%2Ftriplex-next/0.99.0' ]] || return 99
  printf '%s' "$MANIFEST_TEST"; return "$CURL_EXIT_TEST"
}
''' + guard['run']
        release = {'tag_name': '0.99.0', 'draft': False, 'published_at': '2026-01-01T00:00:00Z'}
        manifest = {'name': '@sberbusiness/triplex-next', 'version': '0.99.0', 'gitHead': SHA}
        for case in ('matching', 'draft', 'unpublished', 'wrong_tag', 'wrong_sha', 'unknown_sha', 'network'):
            with self.subTest(case=case), tempfile.TemporaryDirectory() as directory:
                output = Path(directory) / 'output'
                info, package = dict(release), dict(manifest)
                if case == 'draft':
                    info['draft'] = True
                if case == 'unpublished':
                    info['published_at'] = None
                if case == 'wrong_sha':
                    package['gitHead'] = 'b' * 40
                if case == 'unknown_sha':
                    del package['gitHead']
                result = subprocess.run(['bash', '-c', script], capture_output=True, text=True, timeout=5,
                                        env=dict(os.environ, GITHUB_REPOSITORY='test/repo', RELEASE_TAG='0.99.0',
                                        RELEASE_INFO_TEST=json.dumps(info), MANIFEST_TEST=json.dumps(package),
                                        TAG_SHA_TEST='b' * 40 if case == 'wrong_tag' else SHA,
                                        CHECKOUT_SHA_TEST=SHA, CURL_EXIT_TEST='1' if case == 'network' else '0', GITHUB_OUTPUT=str(output)))
                self.assertEqual(result.returncode == 0, case == 'matching', result.stdout + result.stderr)
                self.assertEqual(output.read_text() if output.exists() else '', 'recovery=true\n' if case == 'matching' else '')

    def test_all_publication_paths_recheck_tags_and_share_a_version_queue(self):
        workflow = yaml.safe_load(WORKFLOW.read_text())
        self.assertEqual(workflow['concurrency'], {
            'group': 'release-package-${{ github.event.release.tag_name || inputs.tag }}',
            'cancel-in-progress': False, 'queue': 'max'})
        steps = workflow['jobs']['build-and-publish']['steps']
        positions = [i for i, step in enumerate(steps) if step.get('name') == 'Validate release tag against checkout']
        self.assertEqual(len(positions), 3)
        self.assertEqual([steps[i]['env']['REQUIRE_TAG'] for i in positions],
                         ["${{ github.event_name == 'release' }}"] * 2 + ['true'])
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
        publish = next(step for step in steps if step.get('name') == 'Publish to npm')
        self.assertEqual(publish['env']['RECOVERY_ONLY'], "${{ steps.compatibility.outputs.recovery == 'true' }}")
        commands = publish['run']
        script = '''set -euo pipefail
git() {
  printf '%s\n' "$*" >> "$GIT_CALLS"
  case "$*" in
    'rev-parse HEAD') printf '%s' "$TEST_SHA" ;;
    '-C .. fetch --no-tags --depth=1 origin HEAD') return "$FETCH_EXIT" ;;
    '-C .. diff --quiet HEAD FETCH_HEAD -- .github/workflows') return "$DIFF_EXIT" ;;
    *) return 99 ;;
  esac
}
node() { echo 0.99.0; }
npm() {
  printf '%s\n' "$*" >> "$NPM_CALLS"
  if [[ "$*" == "pkg set gitHead=${TEST_SHA}" ]]; then return 0; fi
  if [[ "$*" == 'publish --access public --tag react17' ]]; then return 0; fi
  [[ "$*" == 'view @sberbusiness/triplex-next@0.99.0 --json --prefer-online --registry=https://registry.npmjs.org' ]] || return 99
  printf '%s' "$TEST_METADATA"; return "$TEST_EXIT"
}
''' + commands
        metadata = {'name': '@sberbusiness/triplex-next', 'version': '0.99.0', 'gitHead': SHA}
        missing = {'error': {'code': 'E404'}}
        for data, code, recovery, event, fetch, diff, expected in (
            (metadata, 0, False, 'workflow_dispatch', 0, 0, 'existing'),
            (metadata, 0, True, 'workflow_dispatch', 0, 0, 'existing'),
            ({**metadata, 'gitHead': 'b' * 40}, 0, False, 'workflow_dispatch', 0, 0, 'stop'),
            ({**metadata, 'gitHead': None}, 0, False, 'workflow_dispatch', 0, 0, 'stop'),
            ({**metadata, 'version': '0.98.0'}, 0, False, 'workflow_dispatch', 0, 0, 'stop'),
            (missing, 1, False, 'workflow_dispatch', 0, 0, 'new'),
            (missing, 1, True, 'workflow_dispatch', 0, 0, 'stop'),
            (missing, 1, False, 'workflow_dispatch', 0, 1, 'stop'),
            (missing, 1, False, 'workflow_dispatch', 1, 0, 'stop'),
            (missing, 1, False, 'release', 1, 1, 'new'),
            ({'error': {'code': 'E503'}}, 1, False, 'workflow_dispatch', 0, 0, 'stop'),
            ({}, 0, False, 'workflow_dispatch', 0, 0, 'stop'),
        ):
            with self.subTest(data=data, recovery=recovery, event=event, fetch=fetch, diff=diff), tempfile.TemporaryDirectory() as directory:
                output = Path(directory) / 'output'
                calls, git_calls = Path(directory) / 'npm-calls', Path(directory) / 'git-calls'
                (Path(directory) / 'dist').mkdir()
                result = subprocess.run(['bash', '-c', script], cwd=directory, capture_output=True, text=True, timeout=5,
                                        env=dict(os.environ, TEST_SHA=SHA, TEST_METADATA=json.dumps(data),
                                        TEST_EXIT=str(code), RELEASE_TAG='0.99.0', GITHUB_OUTPUT=str(output),
                                        RECOVERY_ONLY=str(recovery).lower(), NPM_CALLS=str(calls), GIT_CALLS=str(git_calls),
                                        GITHUB_EVENT_NAME=event, FETCH_EXIT=str(fetch), DIFF_EXIT=str(diff)))
                self.assertEqual(result.returncode == 0, expected != 'stop', result.stdout + result.stderr)
                self.assertEqual(output.read_text() if output.exists() else '',
                                 {'existing': 'published=false\n', 'new': 'published=true\n', 'stop': ''}[expected])
                publications = [call for call in calls.read_text().splitlines() if call.startswith('publish ')]
                self.assertEqual(publications, ['publish --access public --tag react17'] if expected == 'new' else [])
                if event == 'release':
                    self.assertNotIn('fetch ', git_calls.read_text())

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
gh() {
  printf '%s\n' "$*" >> "$GH_CALLS"
  case "$*" in
    'release view 0.99.0') return 1 ;;
    'release create '*) return 0 ;;
    *) return 99 ;;
  esac
}
''' + release['run']
        with tempfile.TemporaryDirectory() as directory:
            calls = Path(directory) / 'gh-calls'
            subprocess.run(['bash', '-c', target_script], cwd=directory, capture_output=True, text=True, timeout=5,
                           check=True, env=dict(os.environ, TARGET='moving-branch', TEST_SHA=SHA,
                           NOTES='Test release notes', MAKE_LATEST='false', RECOVERY_ONLY='false',
                           RELEASE_TAG='0.99.0', GH_CALLS=str(calls)))
            self.assertEqual(calls.read_text().splitlines(), [
                'release view 0.99.0',
                f'release create 0.99.0 --target {SHA} --title 0.99.0 --latest=false --notes-file release-notes.md'])
        script = '''set -euo pipefail
gh() { [[ "$*" == 'api repos/test/repo --jq .default_branch' ]] || return 99; echo main; }
git() {
  if [[ "$*" == 'rev-parse HEAD' ]]; then printf '%s' "$TEST_SHA"; return 0; fi
  if [[ "$*" == 'fetch --no-tags --depth=1 origin refs/heads/main' ]]; then return "$FETCH_EXIT"; fi
  [[ "$*" == 'diff --quiet HEAD FETCH_HEAD -- .github/workflows' ]] || return 99
  return "$DIFF_EXIT"
}
''' + guard['run']
        for fetch, diff in ((0, 0), (1, 0), (0, 1)):
            with self.subTest(fetch=fetch, diff=diff):
                result = subprocess.run(['bash', '-c', script], capture_output=True, text=True, timeout=5,
                                        env=dict(os.environ, GITHUB_REPOSITORY='test/repo', TEST_SHA=SHA, RELEASE_TAG='0.99.0',
                                        FETCH_EXIT=str(fetch), DIFF_EXIT=str(diff)))
                self.assertEqual(result.returncode == 0, fetch == diff == 0, result.stdout + result.stderr)


if __name__ == '__main__':
    unittest.main()
