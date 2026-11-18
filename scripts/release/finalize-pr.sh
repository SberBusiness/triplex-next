#!/usr/bin/env bash
# Merge a reviewed release PR and publish only its verified tree.
set -euo pipefail

: "${BASE_BRANCH:?}" "${BRANCH:?}" "${SHA:?}" "${PR:?}"
: "${GITHUB_REPOSITORY:?}" "${GITHUB_OUTPUT:?}" "${GITHUB_STEP_SUMMARY:?}"
[[ "$SHA" =~ ^[a-f0-9]{40}$ && "$PR" =~ ^[1-9][0-9]*$ ]] || exit 1
case "$BASE_BRANCH" in
  release-0)
    [[ "$BRANCH" =~ ^prerelease-0\.[0-9]+\.0$ ]] || exit 1
    [[ "${VERIFIED_MAIN:-}" =~ ^[a-f0-9]{40}$ ]] || exit 1
    ;;
  main) [[ "$BRANCH" =~ ^prerelease-1\.[0-9]+\.0$ ]] || exit 1 ;;
  *) echo 'Неподдерживаемая релизная ветка'; exit 1 ;;
esac

check_main() {
  if [[ "$BASE_BRANCH" == release-0 ]]; then
    git fetch origin main --quiet
    git cat-file -e "${VERIFIED_MAIN}^{commit}"
    if ! git diff --quiet "$VERIFIED_MAIN" origin/main --; then
      echo 'main изменился после предполёта; публикация React 17 остановлена.'
      echo 'См. docs/human/release.md: восстановление до публикации React 17.'
      exit 1
    fi
  fi
}

echo "Релиз ждёт одобрения владельца кода: https://github.com/${GITHUB_REPOSITORY}/pull/${PR}"
echo "### Ожидается ревью [PR #${PR}](https://github.com/${GITHUB_REPOSITORY}/pull/${PR}) → ${BASE_BRANCH}" >> "$GITHUB_STEP_SUMMARY"
DEADLINE=$((SECONDS + 3600))
while true; do
  STATE=$(gh pr view "$PR" --repo "$GITHUB_REPOSITORY" \
    --json state,headRefOid,headRefName,baseRefName,reviewDecision,mergeCommit)
  [[ $(jq -r .headRefOid <<< "$STATE") == "$SHA" &&
     $(jq -r .headRefName <<< "$STATE") == "$BRANCH" &&
     $(jq -r .baseRefName <<< "$STATE") == "$BASE_BRANCH" ]] || {
    echo 'Вершина или ветки PR изменились; требуется новая подготовка и ревью'; exit 1;
  }
  STATUS=$(jq -r .state <<< "$STATE")
  if [[ "$STATUS" == MERGED ]]; then
    MERGED=$(jq -r .mergeCommit.oid <<< "$STATE")
    break
  fi
  [[ "$STATUS" == OPEN ]] || { echo 'Релизный PR закрыт без слияния'; exit 1; }
  if [[ $(jq -r .reviewDecision <<< "$STATE") == APPROVED ]]; then
    # GitHub's strict required checks also guard against a concurrent base update.
    git fetch origin "$BASE_BRANCH" --quiet
    [[ $(git rev-parse "origin/$BASE_BRANCH") == $(git rev-parse "$SHA^") ]] || {
      echo "$BASE_BRANCH изменился после подготовки релиза; слияние остановлено."
      echo 'См. docs/human/release.md: восстановление при изменении базы PR.'
      exit 1
    }
    check_main
    MERGED=$(gh api --method PUT "repos/${GITHUB_REPOSITORY}/pulls/${PR}/merge" \
      -f sha="$SHA" -f merge_method=merge --jq .sha)
    break
  fi
  if (( SECONDS >= DEADLINE )); then
    echo 'За час ревью не получено. Одобрите PR и перезапустите упавшие jobs; новый коммит потребует повторного одобрения.'
    exit 1
  fi
  sleep 30
done

[[ "$MERGED" =~ ^[a-f0-9]{40}$ ]] || exit 1
git fetch origin "$MERGED" --quiet
git diff --exit-code "$SHA" "$MERGED" --
# Also checked on retries after a successful merge, before handing off to publish.
check_main
echo "sha=$MERGED" >> "$GITHUB_OUTPUT"
gh api --method DELETE "repos/${GITHUB_REPOSITORY}/git/refs/heads/${BRANCH}" \
  || echo 'PR слит; одноразовую ветку можно удалить вручную'
