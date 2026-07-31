---
name: release-react18
description: React 18-релиз triplex-next (1.Y.0, npm-тег latest) — бамп версии в ветке prerelease-X.Y.0, заготовка release notes на следующую версию, PR в main, автомерж по зелёному CI, GitHub Release с notes из MDX, ожидание workflow и проверка публикации в npm. Под-skill для release; можно запустить отдельно, если нужна только React 18-половина.
---

# release-react18

Выпускает React 18-версию `1.Y.0` из ветки `main`, npm-тег `latest`.

Вызывается из skill [`release`](../release/SKILL.md) первым шагом. Можно
запустить отдельно, если нужна только React 18-половина — тогда парный
`0.Y.0` останется невыпущенным, и об этом надо явно сказать разработчику.

Это **релиз в npm**. Точка невозврата — создание GitHub Release: после неё
[`release.yml`](../../../.github/workflows/release.yml) сам собирает пакет,
публикует его и деплоит Storybook. Опубликованную версию нельзя отозвать.
Гейты ниже обязательны, обходить их нельзя.

## Входные данные

- `VERSION` — релизная версия, формат `1.Y.0`. Выпускаются только минорные
  релизы: `Y` = текущий минор + 1, патч всегда `0`. Если запрошено иное
  (патч-релиз, скачок минора) — остановись и спроси.
- `NEXT` — `1.(Y+1).0`. На неё создаётся **заготовка** release notes, в которой
  будут копиться изменения до следующего релиза.

## 1. Валидация

```bash
git status --porcelain
git rev-parse --abbrev-ref HEAD
node -p "require('./package.json').version"
git fetch origin main
gh release view <VERSION> 2>&1 | head -3
```

Проверки. **При любом провале — остановись и сообщи разработчику**, ничего
не чини молча:

- `VERSION` — валидный semver вида `1.Y.0`, минор ровно на 1 больше текущего
  в `package.json`.
- Релиза/тега `VERSION` ещё нет (`gh release view` отвечает `release not found`).
- `stories/release-notes/v1/<VERSION>.mdx` существует **и не пустой**: в нём
  есть контент помимо шапки (`import`, `<Meta>`, `<Title>`) и пустых
  `<Heading>`. Если файла нет или он пустой — **публиковать нечего**,
  остановись.
- Файла `stories/release-notes/v1/<NEXT>.mdx` ещё нет.
- Рабочее дерево чистое. Исключение: уже созданный вручную untracked
  `<NEXT>.mdx` — он войдёт в релизный коммит.

## 2. Ветка `prerelease-<VERSION>`

Релизная ветка называется `prerelease-<VERSION>` (например `prerelease-1.40.0`).
В ней же обычно уже лежат фиксы, вошедшие в релиз.

```bash
git rev-parse --verify --quiet prerelease-<VERSION>            # локально
git ls-remote --heads origin prerelease-<VERSION>              # на origin
```

- Текущая ветка уже `prerelease-<VERSION>` → работаем в ней.
- Ветка существует, но мы не в ней → `git checkout prerelease-<VERSION>`,
  затем `git pull` (если есть upstream).
- Ветки нет → создать от актуального main:
  ```bash
  git checkout main && git pull origin main && git checkout -b prerelease-<VERSION>
  ```

Если ветка существует и отстала от `origin/main` — влей main в неё
(`git merge origin/main`). Конфликты здесь — сигнал, что что-то не так:
остановись и покажи разработчику.

## 3. Бамп версии

```bash
npm version <VERSION> --no-git-tag-version
```

Обновляет `package.json` и `package-lock.json`. Флаг `--no-git-tag-version`
обязателен — тег создаётся отдельно, на шаге GitHub Release.

## 4. Заготовка release notes на следующую версию

Создай `stories/release-notes/v1/<NEXT>.mdx` (если разработчик уже создал его
вручную — оставь как есть, не перезаписывай):

```mdx
import { Meta, Title, Heading } from "@storybook/addon-docs/blocks";

<Meta title="release-notes/v1/<NEXT>" />

<Title>v<NEXT></Title>

<Heading>Изменения</Heading>
```

Подставь `<NEXT>` во все три места. Файл заканчивается переводом строки.

## 5. Коммит и PR

Стейдж **только** релизные файлы — не `git add -A` / `git add .`:

```bash
git add package.json package-lock.json stories/release-notes/v1/<NEXT>.mdx
```

Коммит от бота, если задан токен (канон — [`docs/ai/commits.md`](../../../docs/ai/commits.md)):

```bash
if [ -n "$TRIPLEX_BOT_GH_TOKEN" ]; then
  BOT_LOGIN=$(GH_TOKEN="$TRIPLEX_BOT_GH_TOKEN" gh api user -q .login)
  BOT_EMAIL=$(GH_TOKEN="$TRIPLEX_BOT_GH_TOKEN" gh api user -q '"\(.id)+\(.login)@users.noreply.github.com"')
  git -c user.name="$BOT_LOGIN" -c user.email="$BOT_EMAIL" commit -m "TRIPLEX-0 Подготовка релиза <VERSION>"
else
  git commit -m "TRIPLEX-0 Подготовка релиза <VERSION>"
fi
```

Если упал pre-commit hook — исправь причину. `--no-verify` запрещён.

```bash
git push -u origin prerelease-<VERSION>
if [ -n "$TRIPLEX_BOT_GH_TOKEN" ]; then export GH_TOKEN="$TRIPLEX_BOT_GH_TOKEN"; fi
gh pr create --base main --head prerelease-<VERSION> --title "New release <VERSION>" \
  --body "Релиз <VERSION>: версия в package.json + заготовка release notes <NEXT>."
```

## 6. Дождаться зелёного CI и смержить

```bash
gh pr checks <PR_NUMBER> --watch
```

**Гейт.** Мержить можно только при полностью зелёных проверках. Красный CI —
остановись, покажи разработчику лог упавшей проверки и **не мержь**. Не
перезапускай проверки повторно в надежде на «моргнуло».

```bash
gh pr merge <PR_NUMBER> --merge --delete-branch
git checkout main && git pull origin main
```

Убедись, что версия в main действительно обновилась:

```bash
node -p "require('./package.json').version"   # должно быть <VERSION>
```

## 7. Собрать текст release notes

Преобразуй `stories/release-notes/v1/<VERSION>.mdx` в markdown по канону из
[`release`](../release/SKILL.md) (раздел «Преобразование MDX → release notes»):
убрать `import` / `<Meta>` / `<Title>`, `<Heading>X</Heading>` → `## X`.
Результат — во временный файл в скретчпаде, не в репозиторий.

Покажи готовый текст разработчику перед созданием релиза.

## 8. Создать GitHub Release

**Точка невозврата** — после этого шага пакет уедет в npm.

```bash
gh release create <VERSION> --target main --title "<VERSION>" --latest \
  --notes-file <путь_к_временному_файлу>
```

Флаг `--latest` для `1.x` обязателен.

## 9. Дождаться публикации и проверить npm

`release.yml` триггерится событием `release: published` и делает всё
остальное: сборку, `npm publish --tag latest`, `dist-<VERSION>.zip` в ассеты,
деплой Storybook.

```bash
gh run list --workflow=release.yml --limit 1
gh run watch <RUN_ID> --exit-status
```

После успешного run — проверь, что версия реально в реестре:

```bash
npm view @sberbusiness/triplex-next@<VERSION> version
npm view @sberbusiness/triplex-next dist-tags --json
```

Ожидается: версия резолвится, `dist-tags.latest` = `<VERSION>`.

**Если workflow упал** — остановись и покажи разработчику лог. Не создавай
релиз повторно и не удаляй тег без явного разрешения. Частая причина —
несовпадение версии в `dist/package.json` и тега; workflow проверяет это явно.

Storybook релиза: `https://storybook.triplex-dev.ru/releases/<VERSION>`.

## Итог

Верни разработчику (или вызвавшему оркестратору):

- версию, ссылку на смерженный PR и на GitHub Release;
- подтверждение из npm (`version` + `dist-tags.latest`);
- ссылку на Storybook релиза;
- путь к созданной заготовке `<NEXT>.mdx`.

Если skill запускался напрямую, а не из [`release`](../release/SKILL.md) —
явно скажи, что парный React 17-релиз `0.Y.0` **не выпущен**, и напомни про
[`release-react17`](../release-react17/SKILL.md).

## Жёсткие ограничения

- Не запускать без явно указанной версии.
- Пустые/отсутствующие release notes `<VERSION>.mdx` — стоп, релиза нет.
- Не мержить PR с красным CI и не создавать релиз до мержа PR.
- Не редактировать содержимое `<VERSION>.mdx` — notes писались по ходу
  разработки.
- Не удалять и не пересоздавать уже опубликованные теги и релизы, не
  публиковать в npm руками в обход workflow.
- Не форс-пушить.
- `--no-verify` запрещён: упал hook — чини причину.
- Токен `TRIPLEX_BOT_GH_TOKEN` не печатать и не логировать.
