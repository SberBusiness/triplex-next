---
name: release-react17
description: Парный React 17-релиз triplex-next (0.Y.0, npm-тег react17) — перелитие main в release-0 с разрешением конфликтов React 17-адаптаций, локальные гейты (tsc, unit-тесты, build), перенос release notes v1 → v0, бамп версии, прямой push в release-0 и GitHub Release без пометки latest. Под-skill для release; запускается после успешной публикации 1.Y.0.
---

# release-react17

Выпускает React 17-версию `0.Y.0` — точный функциональный аналог только что
опубликованной `1.Y.0`, npm-тег `react17`.

Вызывается из skill [`release`](../release/SKILL.md) после подтверждённой
публикации `1.Y.0`. Можно запустить и отдельно, если React 18-релиз уже вышел,
а парный — нет.

## Входные данные

- `V1` — уже опубликованная React 18-версия, `1.Y.0`.
- `V0` — `0.Y.0`, минор совпадает с `V1`.
- `NEXT0` — `0.(Y+1).0`, для заготовки notes.

## Ключевые отличия от [React 18-части](../release-react18/SKILL.md)

**CI на `release-0` не запускается** — [`ci.yml`](../../../.github/workflows/ci.yml)
триггерится только на `pull_request`, а сюда мы пушим напрямую. Значит
единственная защита от сломанного мержа — локальные гейты шага 4. Пропускать
их нельзя ни при каких обстоятельствах.

Ветка `release-0` расходится с main примерно по 36 файлам — это устойчивые
React 17-адаптации, а не случайный дрейф. Мерж почти всегда даёт конфликты;
разрешать их нужно по правилам шага 3.

---

## 1. Предусловия

```bash
git status --porcelain
git fetch origin main release-0
gh release view <V1> --json tagName,isLatest
gh release view <V0> 2>&1 | head -3
npm view @sberbusiness/triplex-next@<V1> version
git show origin/release-0:package.json | grep -m1 '"version"'
```

Проверки — при провале остановись и сообщи разработчику:

- Релиз `V1` существует и **уже опубликован в npm** (иначе нет смысла
  выпускать парный).
- Релиза/тега `V0` ещё нет.
- Версия в `origin/release-0` — `0.(Y-1).0`, то есть минор ровно на 1 меньше
  выпускаемого.
- Рабочее дерево чистое.

## 2. Перелитие main в release-0

```bash
git checkout release-0
git pull origin release-0
git merge origin/main
```

Мерж делается **напрямую в `release-0`, без PR** — это осознанное исключение
из общего правила, зафиксированное в [`docs/ai/commits.md`](../../../docs/ai/commits.md).

## 3. Разрешение конфликтов

**Общий принцип:** из main берётся *логика и поведение*, из `release-0`
сохраняется *React 17-совместимость* — версии зависимостей, типовая обвязка и
API-адаптации. Если новая логика из main написана на React 18-only API — её
надо перенести, адаптировав, а не выкинуть.

### Правила по файлам

| Файл | Как разрешать |
|---|---|
| `package.json` — `version` | Не важно, перезапишется бампом на шаге 5 |
| `package.json` — React-зависимости | **Всегда из `release-0`**: `react`/`react-dom` `17.0.2`, `@types/react`/`@types/react-dom` `17.0.2`, `@testing-library/react` `12.1.5`, `focus-trap-react` `10.3.0`, `react-resize-detector` `9.1.0`, `@types/react-transition-group` `4.4.9`, `peerDependencies` — `^16.8.0 \|\| ^17.0.0` |
| `package.json` — всё остальное | Из main (новые/обновлённые зависимости, скрипты, конфиги) |
| `package-lock.json` | Руками не разрешать. Взять любую сторону, затем перегенерировать: `npm install` |
| `.github/workflows/release.yml` | **Из main.** Версия на `release-0` устарела (`npm publish` без `--tag`); реально работает main-версия, потому что для события `release` GitHub берёт workflow из default-ветки. Брать main — значит сокращать расхождение |
| `stories/release-notes/v0/*` | Из `release-0` (в main их нет) |
| `stories/release-notes/v1/*` | Из main |
| `src/**` | По принципу выше — см. известные адаптации ниже |

### Известные React 17-адаптации в `src/`

Это не полный список, а карта того, что расходится систематически:

- **Полиморфные типы.** В `release-0` есть `PolymorphicComponentPropsWithRef`,
  `PolymorphicComponentPropsWithoutRef`, `PolymorphicRef`, `PropsOf`,
  `ExtendableProps`, `InheritableElementProps` в `src/types/CoreTypes.ts` —
  в main их нет. Typography (`Text`, `Title`, `Caption`, `CodeText`) в
  `release-0` типизирован через них, в main — через
  `JSX.IntrinsicElements[T]`. Сохраняй вариант `release-0`.
- **`React.JSX.Element`** — namespace `React.JSX` появился в типах React 18.
  В `release-0` возвращаемый тип опускается или пишется как `JSX.Element`.
- **`src/types/CoreTypes.ts`**: `symbol` (строчный) вместо `Symbol` плюс
  `// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type`.
- **`Portal`**: `container: Element` — без `| DocumentFragment` (типы
  `react-dom` 17).
- **Тесты**: `@testing-library/react` 12 — другой API, чем в 14+.

### Проверка на React 18-only API

После разрешения конфликтов пройдись по изменившимся файлам:

```bash
git diff --name-only origin/release-0..HEAD -- src | \
  xargs grep -nE 'useId|useSyncExternalStore|useInsertionEffect|createRoot|hydrateRoot|react-dom/client' 2>/dev/null
```

Любое попадание — стоп-сигнал: этот код не заработает на React 17, его нужно
адаптировать (см. [`docs/ai/codestyle.md`](../../../docs/ai/codestyle.md) и
правило про совместимость с React 17).

## 4. Гейты — обязательно до push

```bash
npm install
npx tsc --noEmit
npm run test-unit
npm run build
```

Все четыре должны пройти. `npm run build` здесь не формальность: он гоняет
`tsc -p tsconfig.build.json`, собирает бандл и запускает
`scripts/checkBundleSize.js` — именно проблема сборки (утечка `vitest`
в бандл) сломала релиз 1.39.0, и на `release-0` её некому поймать, кроме этого
шага.

**При падении любого гейта — остановись.** Не пушь, не создавай релиз, покажи
разработчику вывод. Мерж можно откатить: `git merge --abort` (до коммита) или
`git reset --hard origin/release-0` (после, пока не запушено).

## 5. Release notes и версия

**Notes.** Тело `stories/release-notes/v1/<V1>.mdx` переносится в
`stories/release-notes/v0/<V0>.mdx` без изменений — меняются только заголовки:

- `<Meta title="release-notes/v1/<V1>" />` → `<Meta title="release-notes/v0/<V0>" />`
- `<Title>v<V1></Title>` → `<Title>v<V0></Title>`

Файл `v0/<V0>.mdx` часто уже существует как пустая заготовка — заполни его,
не создавай заново.

Если в `V1` есть пункты, которые для React 17-сборки неверны, — не выдумывай
правки сам, спроси разработчика.

**Заготовка на следующую версию.** Создай `stories/release-notes/v0/<NEXT0>.mdx`:

```mdx
import { Meta, Title, Heading } from "@storybook/addon-docs/blocks";

<Meta title="release-notes/v0/<NEXT0>" />

<Title>v<NEXT0></Title>

<Heading>Изменения</Heading>
```

**Версия:**

```bash
npm version <V0> --no-git-tag-version
```

## 6. Показать diff и запушить

Перед push покажи разработчику сводку — что именно приехало и как разрешены
конфликты:

```bash
git diff --stat origin/release-0..HEAD
git diff origin/release-0..HEAD -- src package.json
```

Отдельно перечисли текстом: какие файлы были конфликтными и в чью пользу
решены. После подтверждения:

```bash
git add package.json package-lock.json stories/release-notes/v0/
git commit -m "TRIPLEX-0 Подготовка релиза <V0>"     # от бота, если задан TRIPLEX_BOT_GH_TOKEN
git push origin release-0
```

Коммит мержа и коммит подготовки релиза — два отдельных коммита, это нормально.
Авторство бота — по паттерну из [`docs/ai/commits.md`](../../../docs/ai/commits.md).

## 7. GitHub Release

**Точка невозврата.** Текст notes собирается из `v0/<V0>.mdx` по канону из
[`release`](../release/SKILL.md), раздел «Преобразование MDX → release notes»
(убрать `import` / `<Meta>` / `<Title>`, `<Heading>X</Heading>` → `## X`).

```bash
gh release create <V0> --target release-0 --title "<V0>" --latest=false \
  --notes-file <путь_к_временному_файлу>
```

`--latest=false` **обязателен**: пометка latest должна оставаться на `1.x`.
Без флага GitHub может сам пометить релиз последним.

## 8. Дождаться публикации и проверить npm

```bash
gh run list --workflow=release.yml --limit 1
gh run watch <RUN_ID> --exit-status
npm view @sberbusiness/triplex-next@<V0> version
npm view @sberbusiness/triplex-next dist-tags --json
```

Ожидается: версия резолвится, `dist-tags.react17` = `<V0>`, а
`dist-tags.latest` **не изменился** и остался равен `<V1>`. Если `latest`
съехал на `0.x` — сообщи немедленно, это ломает установку пакета по умолчанию
у всех потребителей.

## Итог для разработчика

- версия `V0`, ссылка на GitHub Release;
- перечень конфликтных файлов и как они разрешены;
- результат гейтов (tsc / unit / build);
- подтверждение из npm: `react17` = `V0`, `latest` = `V1`;
- Storybook: `https://storybook.triplex-dev.ru/releases/<V0>`.

## Жёсткие ограничения

- Не пушить в `release-0` при упавшем гейте — CI там не подстрахует.
- Не менять смысл release notes при переносе v1 → v0.
- Не помечать `0.x` как latest.
- Не форс-пушить в `release-0` и не переписывать её историю.
- Не «чинить» React 17-адаптации в сторону main — они намеренные.
- `--no-verify` запрещён.
