---
name: prepare-release
description: Подготовка нового релиза triplex-next — обновляет версию в package.json/package-lock.json, создаёт заготовку release notes на следующую версию (X.Y+1.0) в stories/release-notes/v1/, создаёт ветку TRIPLEX-0, пушит и открывает PR "New release". Запускается по фразе «Подготовь релиз X.Y.Z» (номер версии обязателен).
---

# prepare-release

Готовит релизную ветку и PR для новой версии библиотеки.

## Когда запускать

Когда пользователь пишет «Подготовь релиз X.Y.Z» (или аналогичную явную просьбу
подготовить релиз с указанием версии). Версия — обязательный аргумент; если её
нет в запросе — спроси, не угадывай.

## Входные данные

- `VERSION` — номер релизной версии из запроса пользователя, формат semver
  `X.Y.Z` (например `1.38.0`). Она попадёт в `package.json`.
- `NEXT_VERSION` — вычисляется: `X.(Y+1).0` (минорная +1, патч сбрасывается).
  Например для релиза `1.38.0` это `1.39.0`. На неё создаётся **заготовка**
  release notes — в ней будут копиться изменения до следующего релиза.

Release notes самой `VERSION` (`stories/release-notes/v1/<VERSION>.mdx`)
к моменту релиза уже должны существовать и быть заполнены по ходу
разработки — этот skill их не создаёт и не редактирует.

## Воркфлоу

### 1. Валидация и преднастройка

```bash
git status                     # рабочее дерево должно быть чистым
git rev-parse --abbrev-ref HEAD
node -p "require('./package.json').version"
git ls-remote --heads origin TRIPLEX-0
```

Проверки (при любом провале — остановись и сообщи пользователю):

- `VERSION` — валидный semver и **больше** текущей версии из `package.json`.
- Рабочее дерево чистое. Исключение: если единственное изменение —
  уже созданный вручную untracked файл заготовки release notes
  (`<VERSION>.mdx` или `<NEXT_VERSION>.mdx`) — это нормально, он войдёт
  в релизный коммит.
- Файл `stories/release-notes/v1/<VERSION>.mdx` существует (notes текущего
  релиза, заполнялись по ходу разработки). Если его нет — сообщи
  пользователю и уточни, как поступить.
- Файла `stories/release-notes/v1/<NEXT_VERSION>.mdx` ещё нет в main
  (иначе релиз уже готовился).
- Ветки `TRIPLEX-0` нет на origin. Если есть — спроси пользователя:
  удалить/пересоздать или использовать другое имя. Не форс-пушить без
  явного разрешения.

### 2. Ветка от актуального main

```bash
git checkout main
git pull origin main
git checkout -b TRIPLEX-0
```

Если локальная ветка `TRIPLEX-0` уже существует — спроси пользователя, прежде
чем удалять или переиспользовать.

### 3. Обновить версию

```bash
npm version <VERSION> --no-git-tag-version
```

Это обновит и `package.json`, и `package-lock.json`. Тег не создаётся —
флаг `--no-git-tag-version` обязателен.

### 4. Заготовка release notes на следующую версию

Создай `stories/release-notes/v1/<NEXT_VERSION>.mdx` (если пользователь уже
создал его вручную — оставь как есть, не перезаписывай). Шаблон — как в
предыдущих версиях:

```mdx
import { Meta, Title, Heading } from "@storybook/addon-docs/blocks";

<Meta title="release-notes/v1/<NEXT_VERSION>" />

<Title>v<NEXT_VERSION></Title>

<Heading>Изменения</Heading>
```

Подставь `<NEXT_VERSION>` во все три места. Файл заканчивается переводом
строки.

### 5. Коммит

Стейджи **только** три файла:

```bash
git add package.json package-lock.json stories/release-notes/v1/<NEXT_VERSION>.mdx
git commit -m "TRIPLEX-0 Подготовка релиза <VERSION>"
```

Если заготовка `<VERSION>.mdx` тоже оказалась untracked (создана вручную до
запуска skill) — добавь и её в этот же коммит.

Не используй `git add -A` / `git add .` и `--no-verify`.

### 6. Push и PR

```bash
git push -u origin TRIPLEX-0
```

Создай PR из `TRIPLEX-0` в `main` с названием `New release`:

```bash
gh pr create --base main --head TRIPLEX-0 --title "New release" \
  --body "Подготовка релиза <VERSION>: версия в package.json + заготовка release notes."
```

**Если `gh` не установлен или не авторизован** — не считай это провалом:
push уже сделан, дай пользователю готовую ссылку для создания PR в один клик:

```text
https://github.com/SberBusiness/triplex-next/compare/main...TRIPLEX-0?quickPull=1&title=New+release
```

### 7. Итог для пользователя

Покажи:
- новую версию и хеш коммита;
- путь к созданному файлу release notes;
- ссылку на PR (или compare-ссылку, если PR создавался вручную).

## Жёсткие ограничения

- Не запускать без явно указанной версии.
- Один запуск = один коммит с тремя файлами (package.json, package-lock.json,
  `<NEXT_VERSION>.mdx`). Ничего лишнего в коммит не добавлять.
- Не редактировать содержимое `<VERSION>.mdx` — notes текущего релиза уже
  написаны по ходу разработки.
- Не создавать git-теги и не публиковать GitHub Release — это отдельный шаг
  после мержа PR.
- Не форс-пушить и не удалять ветки без явного разрешения пользователя.
- Если упал pre-commit hook — исправить причину, не обходить через
  `--no-verify`.
