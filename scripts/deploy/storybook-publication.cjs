// Runs only from the default branch in the privileged publisher.
// Artifact names are untrusted; authorize them against GitHub run/PR/tag data.
module.exports = async function publication({github, context}) {
    const repo = context.repo;
    const fullName = `${repo.owner}/${repo.repo}`;
    if (context.eventName === 'pull_request_target') {
        const number = context.payload.pull_request.number;
        if (!Number.isSafeInteger(number) || number <= 0) return [];
        const {data: pr} = await github.rest.pulls.get({...repo, pull_number: number});
        if (context.payload.action !== 'closed' || pr.state !== 'closed' || pr.base.ref !== 'main' ||
            pr.head.repo?.full_name !== fullName || !Number.isSafeInteger(pr.number)) return [];
        return [{channel: `pr-${pr.number}`, environment: 'storybook-preview', action: 'remove', pr: pr.number}];
    }
    if (context.eventName !== 'workflow_run') return [];
    const {data: run} = await github.rest.actions.getWorkflowRun({...repo, run_id: context.payload.workflow_run.id});
    if (run.conclusion !== 'success' || run.repository.full_name !== fullName ||
        run.head_repository?.full_name !== fullName) return [];
    const path = run.path.split('@')[0];
    const preview = path === '.github/workflows/storybook-preview.yml' && run.event === 'pull_request';
    const branch = path === '.github/workflows/storybook-release-branches.yml' &&
        ['push', 'workflow_dispatch'].includes(run.event) && ['main', 'release-0'].includes(run.head_branch);
    const release = ['.github/workflows/release.yml', '.github/workflows/release-weekly.yml'].includes(path) &&
        ['workflow_dispatch', 'schedule', 'release'].includes(run.event);
    if (!preview && !branch && !release) return [];
    let pr;
    if (preview) {
        if (run.pull_requests.length !== 1) return [];
        ({data: pr} = await github.rest.pulls.get({...repo, pull_number: run.pull_requests[0].number}));
        if (pr.state !== 'open' || pr.base.ref !== 'main' || pr.head.repo?.full_name !== fullName ||
            pr.head.sha !== run.head_sha || pr.user.login === 'dependabot[bot]' || pr.head.ref.startsWith('prerelease-')) return [];
    } else if (branch) {
        const {data: current} = await github.rest.repos.getBranch({...repo, branch: run.head_branch});
        if (current.commit.sha !== run.head_sha) return [];
    } else if (run.event !== 'release' && run.head_branch !== 'main') {
        return [];
    }
    const artifacts = await github.paginate(github.rest.actions.listWorkflowRunArtifacts, {...repo, run_id: run.id, per_page: 100});
    const plan = [];
    for (const artifact of artifacts) {
        if (artifact.expired) continue;
        const match = /^storybook--(main|release-0|pr-[1-9][0-9]*|releases__[01]\.[0-9]+\.0)--([a-f0-9]{40})$/.exec(artifact.name);
        if (!match) continue;
        const channel = match[1].replace('releases__', 'releases/');
        const revision = match[2];
        if (preview && (channel !== `pr-${pr.number}` || revision !== run.head_sha)) continue;
        if (branch && (channel !== run.head_branch || revision !== run.head_sha)) continue;
        if (release) {
            if (!channel.startsWith('releases/')) continue;
            const tag = channel.slice('releases/'.length);
            if (run.event === 'release' && run.head_branch !== tag) continue;
            const target = tag.startsWith('0.') ? 'release-0' : 'main';
            const {data: tagged} = await github.rest.repos.getCommit({...repo, ref: `refs/tags/${tag}`});
            if (tagged.sha !== revision) continue;
            // A new tag must not grant production access to unreviewed commits.
            const {data: ancestry} = await github.rest.repos.compareCommitsWithBasehead({...repo, basehead: `${revision}...${target}`});
            if (!['ahead', 'identical'].includes(ancestry.status)) continue;
            const {data: definition} = await github.rest.repos.compareCommitsWithBasehead({...repo, basehead: `${run.head_sha}...${target}`});
            if (!['ahead', 'identical'].includes(definition.status)) continue;
        }
        const createdAt = Date.parse(artifact.created_at);
        if (!Number.isFinite(createdAt)) throw new Error('Artifact creation time is missing');
        const previous = plan.findIndex(item => item.channel === channel);
        if (previous !== -1) {
            if (plan[previous].revision !== revision) throw new Error('Conflicting publication revisions');
            // Retries may expose more than one upload of the same revision.
            // Prefer the latest creation time, with a deterministic tie-breaker.
            const old = plan[previous];
            if (old.createdAt > createdAt || (old.createdAt === createdAt && old.artifact >= artifact.id)) continue;
            plan.splice(previous, 1);
        }
        plan.push({channel, revision, createdAt, artifact: artifact.id, run: run.id, action: 'deploy',
            environment: preview ? 'storybook-preview' : 'storybook-production', pr: pr?.number || 0});
    }
    return plan;
};
