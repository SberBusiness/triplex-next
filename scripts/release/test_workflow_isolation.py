"""Guard the boundary between project code and release write credentials."""
from pathlib import Path
import re
import unittest


WORKFLOW = Path(__file__).resolve().parents[2] / '.github/workflows/release-weekly.yml'


class WorkflowIsolationTests(unittest.TestCase):
    def test_privileged_scripts_use_fresh_workflow_checkout(self):
        workflow = WORKFLOW.read_text().split('\njobs:\n', 1)[1]
        parts = re.split(r'^  ([a-z0-9-]+):\n', workflow, flags=re.MULTILINE)
        jobs = dict(zip(parts[1::2], parts[2::2]))
        for react in ('17', '18'):
            for operation in ('open', 'finalize'):
                with self.subTest(react=react, operation=operation):
                    job = jobs[f'{operation}-react{react}']
                    self.assertIn('ref: ${{ github.workflow_sha }}', job)
                    self.assertIn('persist-credentials: false', job)
                    self.assertIn('GH_TOKEN: ${{ secrets.DUDIM_AI_GH_TOKEN }}', job)
                    # No project execution or artifacts/caches may contaminate the fresh runner.
                    self.assertNotRegex(job, r'npm |download-artifact|actions/cache')
            preparation = jobs[f'prepare-react{react}']
            self.assertNotRegex(preparation, r'npm ci|npm install|npm run')
            self.assertIn('--no-git-tag-version --ignore-scripts', preparation)


if __name__ == '__main__':
    unittest.main()
