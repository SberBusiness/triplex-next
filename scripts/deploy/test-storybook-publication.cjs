const {test} = require('node:test');
const assert = require('node:assert/strict');
const publication = require('./storybook-publication.cjs');
const sha = 'a'.repeat(40);
const other = 'b'.repeat(40);
const repo = {owner: 'SberBusiness', repo: 'triplex-next'};
const full_name = 'SberBusiness/triplex-next';

function fixture() {
    const pr = {number: 799, state: 'open', base: {ref: 'main'}, head: {sha, ref: 'feature', repo: {full_name}}, user: {login: 'contributor'}};
    const run = {id: 10, repository: {full_name}, head_repository: {full_name}, conclusion: 'success',
        path: '.github/workflows/storybook-preview.yml', event: 'pull_request', head_sha: sha, head_branch: 'feature', pull_requests: [{number: 799}]};
    const artifacts = [{id: 20, name: `storybook--pr-799--${sha}`, expired: false, created_at: '2026-11-17T10:00:00Z'}];
    const context = {repo, eventName: 'workflow_run', payload: {workflow_run: {id: 10}}};
    let ancestry = 'ahead';
    let currentSha = sha;
    const github = {rest: {
        actions: {getWorkflowRun: async () => ({data: run}), listWorkflowRunArtifacts: () => {}},
        pulls: {get: async () => ({data: pr})},
        repos: {getBranch: async () => ({data: {commit: {sha: currentSha}}}),
            getCommit: async () => ({data: {sha}}), compareCommitsWithBasehead: async () => ({data: {status: ancestry}})}
    }, paginate: async () => artifacts};
    return {pr, run, artifacts, context, github, setAncestry: value => {ancestry = value;}, setCurrent: value => {currentSha = value;}};
}

test('same-repository current PR receives only preview authorization', async () => {
    const f = fixture();
    const result = await publication(f);
    assert.equal(result.length, 1);
    assert.equal(result[0].environment, 'storybook-preview');
    assert.equal(result[0].channel, 'pr-799');
});

test('PR artifact cannot select main, a release, another PR or a different revision', async () => {
    for (const name of [`storybook--main--${sha}`, `storybook--releases__1.49.0--${sha}`, `storybook--pr-800--${sha}`, `storybook--pr-799--${other}`]) {
        const f = fixture(); f.artifacts[0].name = name;
        assert.deepEqual(await publication(f), []);
    }
});

test('forks, closed PRs, stale commits and wrong workflows are rejected', async () => {
    const changes = [f => {f.run.head_repository.full_name = 'attacker/fork';}, f => {f.pr.state = 'closed';},
        f => {f.pr.head.sha = other;}, f => {f.run.path = '.github/workflows/attacker.yml';},
        f => {f.run.conclusion = 'failure';}, f => {f.pr.user.login = 'dependabot[bot]';}];
    for (const change of changes) {const f = fixture(); change(f); assert.deepEqual(await publication(f), []);}
});

test('only the current trusted branch build can publish production', async () => {
    const f = fixture();
    Object.assign(f.run, {path: '.github/workflows/storybook-release-branches.yml', event: 'push', head_branch: 'main'});
    f.artifacts[0].name = `storybook--main--${sha}`;
    assert.equal((await publication(f))[0].environment, 'storybook-production');
    f.setCurrent(other);
    assert.deepEqual(await publication(f), []);
    f.run.head_branch = 'release-attacker'; f.setCurrent(sha);
    assert.deepEqual(await publication(f), []);
});

test('release must match a tag and belong to the release branch', async () => {
    const f = fixture();
    Object.assign(f.run, {path: '.github/workflows/release.yml', event: 'workflow_dispatch', head_branch: 'main'});
    f.artifacts[0].name = `storybook--releases__1.49.0--${sha}`;
    assert.equal((await publication(f))[0].channel, 'releases/1.49.0');
    f.setAncestry('diverged'); assert.deepEqual(await publication(f), []);
    f.setAncestry('ahead'); f.artifacts[0].name = `storybook--releases__1.49.0--${other}`;
    assert.deepEqual(await publication(f), []);
});

test('a retry selects the newest artifact for the same authorized revision', async () => {
    const f = fixture(); f.artifacts.unshift({...f.artifacts[0], id: 19, created_at: '2026-11-17T10:01:00Z'});
    const plan = await publication(f);
    assert.equal(plan.length, 1);
    assert.equal(plan[0].artifact, 19);
});

test('cleanup handles only closed same-repository previews', async () => {
    const f = fixture(); f.context.eventName = 'pull_request_target'; f.pr.state = 'closed';
    f.context.payload = {action: 'closed', pull_request: f.pr};
    assert.equal((await publication(f))[0].action, 'remove');
    f.pr.state = 'open'; assert.deepEqual(await publication(f), []);
    f.pr.state = 'closed'; f.pr.head.repo.full_name = 'attacker/fork'; assert.deepEqual(await publication(f), []);
});
