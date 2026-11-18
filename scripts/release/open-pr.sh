#!/usr/bin/env bash
# Reuse only this repository's release PR and wait for required checks.
set -euo pipefail
: "${BASE_BRANCH:?}" "${BRANCH:?}" "${VERSION:?}"
: "${GITHUB_REPOSITORY:?}" "${GITHUB_OUTPUT:?}"
case "$BASE_BRANCH" in
  release-0) [[ "$VERSION" =~ ^0\.[0-9]+\.0$ ]] || exit 1 ;;
  main) [[ "$VERSION" =~ ^1\.[0-9]+\.0$ ]] || exit 1 ;;
  *) exit 1 ;;
esac
[[ "$BRANCH" == "prerelease-$VERSION" ]] || exit 1

find_pr() {
  gh pr list --repo "$GITHUB_REPOSITORY" --head "$BRANCH" --base "$BASE_BRANCH" \
    --state open --json number,isCrossRepository \
    --jq '[.[] | select(.isCrossRepository == false)] | .[0].number // empty'
}
PR=$(find_pr)
if [[ -z "$PR" ]]; then
  gh pr create --repo "$GITHUB_REPOSITORY" --base "$BASE_BRANCH" --head "$BRANCH" \
    --title "Подготовка релиза ${VERSION}" \
    --body 'Релизный коммит еженедельного прогона. После успешных проверок требуется одобрение владельца кода. Затем workflow выполнит обычное слияние PR без обхода защиты.'
  PR=$(find_pr)
fi
[[ "$PR" =~ ^[1-9][0-9]*$ ]] || { echo 'Релизный PR не найден'; exit 1; }
echo "pr=$PR" >> "$GITHUB_OUTPUT"
echo "PR #$PR"

# A preview or third-party check may appear before the required workflows.
for _ in $(seq 1 30); do
  CHECKS=$(gh pr checks "$PR" --repo "$GITHUB_REPOSITORY" --required --json name,bucket) || CHECKS=${CHECKS:-'[]'}
  if jq -e 'type == "array" and length > 0' <<< "$CHECKS" >/dev/null; then
    if jq -e 'any(.[]; .bucket == "fail" or .bucket == "cancel")' <<< "$CHECKS" >/dev/null; then
      echo 'Обязательная проверка завершилась неудачно'; exit 1
    fi
    exec gh pr checks "$PR" --repo "$GITHUB_REPOSITORY" --required --watch --fail-fast
  fi
  sleep 10
done
echo 'Обязательные проверки не зарегистрированы за пять минут'
exit 1
