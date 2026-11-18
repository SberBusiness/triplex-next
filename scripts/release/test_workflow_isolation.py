"""Guard the boundary between project code and release write credentials."""
from copy import deepcopy
from pathlib import Path
import re
import unittest

import yaml


WORKFLOW = Path(__file__).resolve().parents[2] / '.github/workflows/release-weekly.yml'


def find_checkout(job):
    return next(step for step in job['steps'] if step.get('uses', '').startswith('actions/checkout@'))


def find_release_step(job):
    return next(step for step in job['steps'] if step.get('run', '').strip() == 'bash scripts/release/open-pr.sh')


def assert_isolated(job, expected_command):
    steps = job['steps']
    checkouts = [step for step in steps if step.get('uses', '').startswith('actions/checkout@')]
    assert len(checkouts) == 1
    options = checkouts[0].get('with', {})
    assert options.get('ref') == '${{ github.workflow_sha }}'
    assert options.get('persist-credentials') is False
    release_steps = [step for step in steps if step.get('run', '').strip() == expected_command]
    assert len(release_steps) == 1
    release_step = release_steps[0]
    assert steps.index(checkouts[0]) < steps.index(release_step)
    assert release_step.get('env', {}).get('GH_TOKEN') == '${{ secrets.DUDIM_AI_GH_TOKEN }}'
    for scope in (job, checkouts[0], release_step):
        assert 'if' not in scope
        assert scope.get('continue-on-error', False) is False
    for step in steps:
        assert not re.search(r'download-artifact|actions/cache', step.get('uses', ''))
        assert not re.search(r'\bnpm\b', step.get('run', ''))


class WorkflowIsolationTests(unittest.TestCase):
    def test_privileged_scripts_use_fresh_workflow_checkout(self):
        jobs = yaml.safe_load(WORKFLOW.read_text())['jobs']
        for react in ('17', '18'):
            for operation in ('open', 'finalize'):
                with self.subTest(react=react, operation=operation):
                    assert_isolated(jobs[f'{operation}-react{react}'], f'bash scripts/release/{operation}-pr.sh')
            commands = '\n'.join(step.get('run', '') for step in jobs[f'prepare-react{react}']['steps'])
            self.assertNotRegex(commands, r'npm ci|npm install|npm run')
            self.assertIn('--no-git-tag-version --ignore-scripts', commands)
            self.assertIn('-run-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}', commands)
            self.assertNotIn('git push --force', commands)

    def test_guard_rejects_missing_checkout_options_and_project_execution(self):
        job = yaml.safe_load(WORKFLOW.read_text())['jobs']['open-react17']
        job['steps'].insert(0, {'run': 'echo harmless preparation'})
        for option in ('ref', 'persist-credentials'):
            bad = deepcopy(job)
            del find_checkout(bad)['with'][option]
            with self.subTest(option=option), self.assertRaises(AssertionError):
                assert_isolated(bad, 'bash scripts/release/open-pr.sh')
        for step in ({'run': 'npm ci'}, {'uses': 'actions/cache@some-sha'},
                     {'uses': 'actions/download-artifact@some-sha'}):
            bad = deepcopy(job)
            bad['steps'].append(step)
            with self.subTest(step=step), self.assertRaises(AssertionError):
                assert_isolated(bad, 'bash scripts/release/open-pr.sh')

    def test_yaml_comments_do_not_change_the_security_contract(self):
        text = WORKFLOW.read_text()
        assert_isolated(yaml.safe_load('# No npm commands here\n' + text)['jobs']['open-react17'], 'bash scripts/release/open-pr.sh')
        commented = text.replace('          ref: ${{ github.workflow_sha }}',
                                 '          # ref: ${{ github.workflow_sha }}')
        with self.assertRaises(AssertionError):
            assert_isolated(yaml.safe_load(commented)['jobs']['open-react17'], 'bash scripts/release/open-pr.sh')

    def test_release_step_owns_token_and_cannot_be_skipped_or_ignored(self):
        job = yaml.safe_load(WORKFLOW.read_text())['jobs']['open-react17']
        job['steps'].insert(0, {'run': 'echo harmless preparation'})
        bad = deepcopy(job)
        find_checkout(bad)['env'] = {'GH_TOKEN': find_release_step(bad)['env'].pop('GH_TOKEN')}
        with self.assertRaises(AssertionError):
            assert_isolated(bad, 'bash scripts/release/open-pr.sh')
        for level in ('job', 'step', 'checkout'):
            for key, value in (('if', 'false'), ('continue-on-error', True)):
                bad = deepcopy(job)
                scope = bad if level == 'job' else (find_checkout(bad) if level == 'checkout' else find_release_step(bad))
                scope[key] = value
                with self.subTest(level=level, key=key), self.assertRaises(AssertionError):
                    assert_isolated(bad, 'bash scripts/release/open-pr.sh')
        bad = deepcopy(job)
        find_release_step(bad)['run'] = 'bash scripts/release/finalize-pr.sh'
        with self.assertRaises(AssertionError):
            assert_isolated(bad, 'bash scripts/release/open-pr.sh')
        bad = deepcopy(job)
        checkout, release_step = find_checkout(bad), find_release_step(bad)
        ci, ri = bad['steps'].index(checkout), bad['steps'].index(release_step)
        bad['steps'][ci], bad['steps'][ri] = release_step, checkout
        with self.assertRaises(AssertionError):
            assert_isolated(bad, 'bash scripts/release/open-pr.sh')
        job['steps'].append({'if': 'failure()', 'run': 'echo failure'})
        assert_isolated(job, 'bash scripts/release/open-pr.sh')


if __name__ == '__main__':
    unittest.main()
