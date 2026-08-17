---
name: release-react18
description: React 18-релиз triplex-next (1.Y.0) — вторая половина выпуска: бамп версии в ветке prerelease-X.Y.0, заготовка release notes на следующую версию, PR в main, мерж по зелёному CI (с учётом branch protection), GitHub Release, публикация в npm, после которой dist-tags.latest встаёт на 1.Y.0. Под-skill для release; запускается ПОСЛЕ подтверждённой публикации 0.Y.0. В unattended (облако) публикация запрещена прокси — остановка с готовой командой для человека.
---

# release-react18

Выпускает React 18-версию `1.Y.0` из ветки `main`.

**Это вторая половина релиза.** Вызывается из skill
[`release`](../release/SKILL.md) после подтверждённой публикации `0.Y.0`.
Порядок важен: теги не проносятся во внутренний npm registry, `--tag` при
публикации игнорируется, и `dist-tags.latest` встаёт на последнюю
опубликованную версию. Публикуясь второй, `1.Y.0` забирает `latest` себе —
и тем закрывает промежуточное состояние, в котором он стоял на `0.Y.0`.

Отсюда же следует срочность: пока эта половина не вышла, `npm install`
отдаёт всем React 17-сборку.

Запустить отдельно можно, чтобы довыпустить пару к уже вышедшей `0.Y.0` —
этим же снимается зависший на ней `latest`.

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
- `TASK` — номер задачи Linear на этот релиз, формат `TRI-XXX`. Идёт префиксом
  в релизный коммит по [`docs/ai/commits.md`](../../../docs/ai/commits.md).
  Если задачи нет — заведи её через skill `create-task` («Релиз
  <VERSION>») и возьми её номер; не выдумывай номер и не используй legacy-
  префикс `TRIPLEX-XXX`.
- `V0` — парная React 17-версия `0.Y.0`, выпущенная первой половиной.
  Нужна для гейта шага 1: без подтверждённой публикации `V0` релиз `1.Y.0`
  не создаётся.
- `UNATTENDED` — признак запуска из routine, без человека у клавиатуры.
  По умолчанию `false`. Влияет только на точки ожидания подтверждения —
  см. «Unattended-режим». Гейты и стоп-условия одинаковы в обоих режимах.
- `PUBLISH_MODE` — режим публикации в unattended: `full` (право на диспатч
  `release.yml` подтверждено зондом [`release-auto`](../release-auto/SKILL.md))
  или `prepare` (по умолчанию; облако — публикация запрещена прокси).
  В интерактивном режиме не используется.

## 1. Валидация

```bash
git status --porcelain
git rev-parse --abbrev-ref HEAD
git fetch origin main
git show origin/main:package.json | grep -m1 '"version"'
gh release view <VERSION> 2>&1 | head -3
npm view @sberbusiness/triplex-next@<V0> version
```

Проверки. **При любом провале — остановись и сообщи разработчику**, ничего
не чини молча:

- `VERSION` — валидный semver вида `1.Y.0`, минор ровно на 1 больше версии
  **в `origin/main`**. Сравнивать нужно именно с ней, а не с рабочей копией
  (`node -p "require('./package.json').version"`): на этом шаге чекаут ещё
  не переключён и может стоять на произвольной ветке — в unattended-прогоне
  это дало бы ложный стоп.
- Релиза/тега `VERSION` ещё нет (`gh release view` отвечает `release not found`).
- **Парная `V0` уже опубликована в npm** — `npm view @sberbusiness/triplex-next@<V0> version`
  резолвится. Это гейт порядка: React 17-половина обязана выйти первой, иначе
  `dist-tags.latest` останется на ней. **Исключений нет ни в одном режиме:**
  нет `V0` в реестре — остановись.

  Отдельный запуск ради починки зависшего `latest` этому не противоречит:
  `latest` может застрять на `0.x` только после публикации `V0`, то есть гейт
  в такой ситуации заведомо пройден. Если `V0` не опубликована, а `latest`
  всё равно указывает на `0.x` — это другая проблема, и решать её выпуском
  `1.Y.0` нельзя.
- `stories/release-notes/v1/<VERSION>.mdx` существует **и не пустой** по
  предикату заготовки (ниже). Если файла нет или он заготовка — **публиковать
  нечего**, остановись.
- Файла `stories/release-notes/v1/<NEXT>.mdx` ещё нет.
- Рабочее дерево чистое. Исключение: уже созданный вручную untracked
  `<NEXT>.mdx` — он войдёт в релизный коммит.

### Предикат заготовки

Общий канон для обоих под-скилов: `release-react17` применяет его к
`v0/<V0>.mdx`, решая, переносить ли туда notes из `v1`.

> Выброси из файла строки `import …`, `<Meta … />`, `<Title>…</Title>`,
> одиночные `<Heading>…</Heading>` и пустые строки. Если ничего не осталось —
> это заготовка; если что-то осталось — файл заполнен.

Побайтовое сравнение с шаблоном использовать нельзя: любая ручная правка
пробелов или перевода строки его ломает.

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
  git -c user.name="$BOT_LOGIN" -c user.email="$BOT_EMAIL" commit -m "<TASK> Подготовка релиза <VERSION>"
else
  git commit -m "<TASK> Подготовка релиза <VERSION>"
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

В unattended вместо `--watch` — поллинг с таймаутом (`gh pr checks
<PR_NUMBER>` раз в минуту, потолок ~30 минут). По таймауту **не мержить**:
завершиться с отчётом «CI не дошёл до результата», PR остаётся открытым.

**Гейт.** Мержить можно только при полностью зелёных проверках. Красный CI —
остановись, покажи разработчику лог упавшей проверки и **не мержь**. Не
перезапускай проверки повторно в надежде на «моргнуло».

```bash
gh pr merge <PR_NUMBER> --merge --delete-branch
git checkout main && git pull origin main
```

На `main` включена branch protection: пушить и мержить могут только
аккаунты из списка restrictions, плюс требуется апрув code owner'а. Если
мерж отклонён политикой (`base branch policy prohibits the merge` /
`Merging into a protected base branch is not permitted`) — **не обходи**
через прямые пуши. Интерактивно: мерж делает человек с правами
администратора репозитория —
`gh pr merge <PR_NUMBER> --merge --delete-branch --admin` (флаг обходит
требования защиты, включая апрув code owner'а; без админ-прав не
сработает). Помни: к этому
моменту `0.Y.0` уже опубликована и `latest` стоит на ней — тянуть с мержем
нельзя (см. «Если `latest` завис на 0.x» в
[`release-react17`](../release-react17/SKILL.md)).

В unattended `--delete-branch` не сработает: удаление веток облачной сессии
запрещено (`Write access to this GitHub API path is not permitted through
this proxy`). Если сам мерж прошёл — не считай это провалом и не пытайся
обойти: просто смержи без флага и упомяни в отчёте, что ветку
`prerelease-<VERSION>` надо удалить вручную. Если мерж отклонён политикой
ветки — остановись с отчётом и готовой командой для человека (см. выше).

Убедись, что версия в main действительно обновилась:

```bash
node -p "require('./package.json').version"   # должно быть <VERSION>
```

## 7. Собрать текст release notes

Преобразуй `stories/release-notes/v1/<VERSION>.mdx` в markdown по канону из
[`release`](../release/SKILL.md) (раздел «Преобразование MDX → release notes»):
убрать `import` / `<Meta>` / `<Title>`, `<Heading>X</Heading>` → `## X`.
Результат — во временный файл в скретчпаде, не в репозиторий.

Покажи готовый текст разработчику перед созданием релиза; в unattended —
включи его в отчёт и продолжай, содержимое notes писал человек по ходу
разработки, и проверять его нечем.

## 8. Создать GitHub Release

**Точка невозврата** — после этого шага пакет уедет в npm.

**Интерактивно** — напрямую (скрипт
[`scripts/releaseNotesMd.js`](../../../scripts/releaseNotesMd.js) —
исполняемая форма канона преобразования из шага 7):

```bash
node scripts/releaseNotesMd.js stories/release-notes/v1/<VERSION>.mdx > /tmp/notes-<VERSION>.md
gh release create <VERSION> --target main --title "<VERSION>" --latest \
  --notes-file /tmp/notes-<VERSION>.md
```

**В unattended при `PUBLISH_MODE=full`** (право на диспатч подтверждено
зондом `release-auto` — например, локальный запуск с PAT) — через workflow:

```bash
gh workflow run release.yml --ref main \
  -f tag=<VERSION> -f target=main -f make_latest=true \
  -F notes=@<путь_к_временному_файлу>
```

[`release.yml`](../../../.github/workflows/release.yml) сам собирает пакет,
публикует его и **только потом** создаёт GitHub Release — если сборка или
публикация упадут, релиза не появится вовсе.

**В unattended при `PUBLISH_MODE=prepare`** (облако) публикация невозможна —
здесь skill останавливается. Прокси облачных сессий запрещает все пути
запуска релиза: `gh release create`, `gh workflow run release.yml`,
`repository_dispatch`, создание и push тегов (зонд TRI-117, 2026-08-14;
диспатч нерелизных workflow, например `visual-update.yml`, проходит). Это
ограничение типа сессии, а не прав токена — см.
[`docs/ai/commits.md`](../../../docs/ai/commits.md), «Облачные сессии:
подмена токена прокси». Остановка — штатный исход подготовки: в отчёт
первой строкой «публикацию завершает человек» и готовая команда (подставь
`<VERSION>`; работает из любого чекаута):

```bash
git fetch origin main && \
  git show origin/main:stories/release-notes/v1/<VERSION>.mdx | \
  node scripts/releaseNotesMd.js - > /tmp/notes-<VERSION>.md && \
  gh release create <VERSION> --target main --title "<VERSION>" --latest \
  --notes-file /tmp/notes-<VERSION>.md
```

Флаг `--latest` / вход `make_latest=true` для `1.x` обязателен.

## 9. Дождаться публикации и проверить npm

`release.yml` делает всё остальное: сборку, `npm publish`, `dist-<VERSION>.zip`
в ассеты, деплой Storybook. На пути `release: published` он запускается
событием; на пути `PUBLISH_MODE=full` — тем же `gh workflow run`, что
создал релиз. В unattended при `PUBLISH_MODE=prepare` этот шаг не
выполняется — публикации не было (см. шаг 8).

```bash
gh run list --workflow=release.yml --limit 1
gh run watch <RUN_ID> --exit-status
```

Если `gh run watch` не дождался завершения — отчёт: «релиз создан,
публикация не подтверждена». Сам релиз уже существует, отзывать его нельзя.

После успешного run — проверь, что версия реально в реестре:

```bash
npm view @sberbusiness/triplex-next@<VERSION> version
npm view @sberbusiness/triplex-next dist-tags --json
```

Ожидается: версия резолвится и **`dist-tags.latest` = `<VERSION>`**. Это
главная проверка всего релиза: до публикации `latest` стоял на `<V0>`, и
именно этот шаг возвращает его на React 18-сборку.

Если `latest` не встал на `<VERSION>` — сообщи немедленно и не считай релиз
завершённым: `npm install` продолжает отдавать React 17-версию. Починка —
`npm dist-tag add @sberbusiness/triplex-next@<VERSION> latest`; в unattended
тег не трогай, а вынеси проблему первой строкой отчёта.

`dist-tags.react17` не проверяй: тег не поддерживается, теги не проносятся
во внутренний registry.

**Если workflow упал** — остановись и покажи разработчику лог. Не создавай
релиз повторно и не удаляй тег без явного разрешения. Частая причина —
несовпадение версии в `dist/package.json` и тега; workflow проверяет это явно.

Storybook релиза: `https://storybook.triplex-dev.ru/releases/<VERSION>`.

## Unattended-режим

При `UNATTENDED=true` меняется только поведение в точках ожидания:

| Точка | Интерактивно | Unattended |
|---|---|---|
| Ожидание CI по PR (шаг 6) | `gh pr checks --watch` | Поллинг с таймаутом; таймаут → не мержить, отчёт |
| Мерж отклонён политикой ветки (шаг 6) | Мержит человек с админ-правами: `gh pr merge --admin` | Остановиться с отчётом и готовой командой для человека |
| Текст release notes перед релизом (шаг 7) | Показать, ждать подтверждения | Включить в отчёт |
| Создание релиза (шаг 8) | `gh release create` напрямую | `PUBLISH_MODE=full` → `gh workflow run release.yml`; `PUBLISH_MODE=prepare` (облако) → **не выполняется**: штатная остановка с готовой командой в отчёте |
| Удаление ветки при мерже (шаг 6) | `--delete-branch` | Не сработает (403) — смержить без флага, упомянуть в отчёте |
| Ожидание `release.yml` и проверка npm (шаг 9) | `gh run watch` + `npm view` | `full` → поллинг с таймаутом; таймаут → отчёт «релиз создан, публикация не подтверждена». `prepare` → не выполняется: публикации не было |
| Отсутствует задача Linear для `TASK` | Завести через `create-task` | Не заводить: `TASK` приходит из [`release-auto`](../release-auto/SKILL.md); нет номера — стоп |
| `latest` не встал на `VERSION` (шаг 9) | Предложить `npm dist-tag add` | Тег не трогать, вынести первой строкой отчёта |

**Что не меняется:** валидация шага 1, гейт зелёного CI перед мержем и все
жёсткие ограничения. Провал любого из них останавливает релиз в обоих
режимах — unattended не означает «продолжать несмотря на».

## Итог

Верни разработчику (или вызвавшему оркестратору):

- версию, ссылку на смерженный PR и на GitHub Release;
- подтверждение из npm: версия резолвится, **`dist-tags.latest` = `VERSION`**;
- ссылку на Storybook релиза;
- путь к созданной заготовке `<NEXT>.mdx`;
- если ветку `prerelease-<VERSION>` удалить не удалось — напоминание сделать
  это вручную.

Если skill запускался напрямую, а не из [`release`](../release/SKILL.md) —
скажи, для чего: довыпуск пары к вышедшей `0.Y.0` (тогда релиз завершён) или
починка зависшего `latest`.

## Жёсткие ограничения

- Не запускать без явно указанной версии.
- Не создавать релиз `1.Y.0`, пока не подтверждена публикация парной `0.Y.0`
  в npm — от порядка зависит, на чём останется `dist-tags.latest`.
- Не считать релиз завершённым, пока `dist-tags.latest` не равен `VERSION`.
- Пустые/отсутствующие release notes `<VERSION>.mdx` — стоп, релиза нет.
- Не мержить PR с красным CI и не создавать релиз до мержа PR.
- Не редактировать содержимое `<VERSION>.mdx` — notes писались по ходу
  разработки.
- Не удалять и не пересоздавать уже опубликованные теги и релизы, не
  публиковать в npm руками в обход workflow.
- Не форс-пушить.
- `--no-verify` запрещён: упал hook — чини причину.
- Токен `TRIPLEX_BOT_GH_TOKEN` не печатать и не логировать.
