#!/usr/bin/env bash
# Reuse only this repository's release PR and wait for required checks.
set -euo pipefail
: "${BASE_BRANCH:?}" "${BRANCH:?}" "${VERSION:?}" "${SHA:?}"
[[ "$SHA" =~ ^[a-f0-9]{40}$ ]] || exit 1
: "${GITHUB_REPOSITORY:?}" "${GITHUB_OUTPUT:?}"
case "$BASE_BRANCH" in
  release-0) [[ "$VERSION" =~ ^0\.[0-9]+\.0$ ]] || exit 1 ;;
  main) [[ "$VERSION" =~ ^1\.[0-9]+\.0$ ]] || exit 1 ;;
  *) exit 1 ;;
esac
BASE_NAME="${BRANCH%%-run-*}"
[[ "$BASE_NAME" == "prerelease-$VERSION" ]] || exit 1
[[ "$BRANCH" == "$BASE_NAME" || "${BRANCH#"$BASE_NAME"}" =~ ^-run-[1-9][0-9]*-[1-9][0-9]*$ ]] || exit 1

find_pr() {
  gh pr list --repo "$GITHUB_REPOSITORY" --head "$BRANCH" --base "$BASE_BRANCH" \
    --state all --json number,isCrossRepository,headRefOid,state | \
    jq -c '[.[] | select(.isCrossRepository == false)] | .[0] // empty'
}
INFO=$(find_pr)
if [[ -z "$INFO" ]]; then
  gh pr create --repo "$GITHUB_REPOSITORY" --base "$BASE_BRANCH" --head "$BRANCH" \
    --title "Подготовка релиза ${VERSION}" \
    --body 'Релизный коммит еженедельного прогона. После успешных проверок требуется одобрение владельца кода. Затем workflow выполнит обычное слияние PR без обхода защиты.'
  INFO=$(find_pr)
fi
PR=$(jq -r '.number // empty' <<< "$INFO")
[[ "$PR" =~ ^[1-9][0-9]*$ ]] || { echo 'Релизный PR не найден'; exit 1; }
[[ $(jq -r .headRefOid <<< "$INFO") == "$SHA" ]] || {
  echo "SHA PR #$PR не совпадает с подготовленным коммитом"; exit 1;
}
STATUS=$(jq -r .state <<< "$INFO")
[[ "$STATUS" == OPEN || "$STATUS" == MERGED ]] || {
  echo "PR #$PR закрыт без слияния; новый PR автоматически не создаётся"; exit 1;
}
echo "pr=$PR" >> "$GITHUB_OUTPUT"
echo "PR #$PR"
if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  echo "### Проверки [PR #${PR}](https://github.com/${GITHUB_REPOSITORY}/pull/${PR})" >> "$GITHUB_STEP_SUMMARY"
fi
if [[ "$STATUS" == MERGED ]]; then
  echo 'PR уже слит: финализатор проверит исходный SHA, дерево и целевую ветку'
  exit 0
fi

# Keep in sync with protection on main/release-0. GitHub remains the final gate
# if an administrator adds another required check before this list is updated.
REQUIRED='["AI.md tokens", "Build library", "E2E tests", "Unit tests", "Visual regression tests", "Deployment safety", "Python security"]'
ERROR_FILE=$(mktemp)
trap 'rm -f "$ERROR_FILE"' EXIT
ERRORS=0
MISSING=$(jq -r 'join(", ")' <<< "$REQUIRED")
# A preview or one early required check cannot stand in for the full CI suite.
for _ in $(seq 1 30); do
  if CHECKS=$(gh pr checks "$PR" --repo "$GITHUB_REPOSITORY" --required --json name,bucket 2>"$ERROR_FILE"); then
    :
  elif grep -Eq "^no (required )?checks reported on the '.+' branch$" "$ERROR_FILE"; then
    # gh v2.100 returns this diagnostic before emitting any JSON.
    CHECKS='[]'
  else
    ERRORS=$((ERRORS + 1))
    if (( ERRORS >= 3 )); then
      echo 'Не удалось получить статусы проверок PR после трёх ошибок запроса'
      cat "$ERROR_FILE" >&2
      exit 1
    fi
    sleep 10
    continue
  fi
  jq -e 'type == "array" and all(.[]; (.name | type == "string") and (.bucket | type == "string"))' <<< "$CHECKS" >/dev/null || {
    echo 'Некорректный ответ при чтении статусов проверок'; exit 1;
  }
  ERRORS=0
  if jq -e 'any(.[]; .bucket == "fail" or .bucket == "cancel")' <<< "$CHECKS" >/dev/null; then
    echo 'Обязательная проверка завершилась неудачно'; exit 1
  fi
  MISSING=$(jq -r --argjson expected "$REQUIRED" '$expected - [.[].name] | join(", ")' <<< "$CHECKS")
  if [[ -z "$MISSING" ]]; then
    gh pr checks "$PR" --repo "$GITHUB_REPOSITORY" --required --watch --fail-fast
    # gh watch may return zero for cancelled/skipped checks; re-read final results.
    CHECKS=$(gh pr checks "$PR" --repo "$GITHUB_REPOSITORY" --required --json name,bucket) || {
      echo 'Не удалось подтвердить итоговые статусы проверок'; exit 1;
    }
    jq -e --argjson expected "$REQUIRED" \
      'type == "array" and (($expected - [.[].name]) | length == 0) and all(.[]; .bucket == "pass")' \
      <<< "$CHECKS" >/dev/null || {
      echo 'Не все обязательные проверки завершились успешно'; exit 1;
    }
    exit 0
  fi
  sleep 10
done
echo "За пять минут не зарегистрированы обязательные проверки: $MISSING"
exit 1
