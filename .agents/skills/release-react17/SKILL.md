---
name: release-react17
description: Парный React 17-релиз triplex-next (0.Y.0, npm-тег react17) — предусловия на уже перелитую человеком ветку release-0, локальные гейты (tsc, unit-тесты, build), перенос release notes v1 → v0, бамп версии, прямой push в release-0 и GitHub Release без пометки latest. Под-skill для release; запускается после успешной публикации 1.Y.0.
---

# release-react17

Выпускает React 17-версию `0.Y.0` — точный функциональный аналог только что
опубликованной `1.Y.0`, npm-тег `react17`.

Вызывается из skill [`release`](../release/SKILL.md) после подтверждённой
публикации `1.Y.0`. Можно запустить и отдельно, если React 18-релиз уже вышел,
а парный — нет.

**Перелитие `main` → `release-0` этот skill не делает.** Мерж и разрешение
конфликтов React 17-адаптаций — ручной шаг мейнтейнера, выполняемый заранее
(см. «Что делает человек до релиза»). Сюда ветка приходит уже готовой, и
задача skill'а — убедиться в этом и выпустить.

## Входные данные

- `V1` — уже опубликованная React 18-версия, `1.Y.0`.
- `V0` — `0.Y.0`, минор совпадает с `V1`.
- `NEXT0` — `0.(Y+1).0`, для заготовки notes.
- `TASK` — номер задачи Linear на релиз, формат `TRI-XXX`; тот же, что и в
  React 18-части. Идёт префиксом в коммит по
  [`docs/ai/commits.md`](../../../docs/ai/commits.md).
- `MAIN_SHA` — состояние `origin/main` **до** выпуска React 18-половины,
  зафиксированное вызывающим скилом. Именно против него проверяется
  перелитие (шаг 1). При самостоятельном запуске не передаётся — тогда
  работает запасной вариант проверки.
- `UNATTENDED` — признак запуска из routine, без человека у клавиатуры.
  По умолчанию `false`. Влияет только на точки ожидания подтверждения —
  см. «Unattended-режим». Гейты и стоп-условия одинаковы в обоих режимах.

## Ключевое отличие от [React 18-части](../release-react18/SKILL.md)

**CI на `release-0` запускается на push** ([`ci.yml`](../../../.github/workflows/ci.yml),
триггер `push: branches: [release-0]`) — в том числе на релизный коммит
этого skill'а. Но **дождаться** его нельзя: GitHub Release создаётся сразу
после push, и прогон, стартующий одновременно, ничего не защищает.

Значит гейтов два: зелёный прогон на вершине `release-0` *после ручного
перелития* (предусловие шага 1) и локальные гейты шага 2. Пропускать вторые
нельзя — релизный коммит меняет версию и notes уже после того, как первый
прогон отработал.

---

## Что делает человек до релиза

Не инструкция агенту — регламент мейнтейнера, зафиксированный здесь, чтобы
предусловия шага 1 читались осмысленно. Человеческий гайд —
[`docs/human/release.md`](../../../docs/human/release.md).

Ветка `release-0` расходится с main примерно по 36 файлам — это устойчивые
React 17-адаптации, а не случайный дрейф, поэтому мерж почти всегда даёт
конфликты.

```bash
git checkout release-0 && git pull origin release-0
git merge origin/main
```

Мерж делается **напрямую в `release-0`, без PR** — осознанное исключение из
общего правила, зафиксированное в [`docs/ai/commits.md`](../../../docs/ai/commits.md).

**Общий принцип разрешения конфликтов:** из main берётся *логика и
поведение*, из `release-0` сохраняется *React 17-совместимость* — версии
зависимостей, типовая обвязка и API-адаптации. Если новая логика из main
написана на React 18-only API — её надо перенести, адаптировав, а не выкинуть.

| Файл | Как разрешать |
|---|---|
| `package.json` — `version` | Не важно, перезапишется бампом на шаге 3 |
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

После разрешения конфликтов человек проходится по изменившимся файлам:

```bash
git diff --name-only origin/release-0..HEAD -- src | \
  xargs grep -nE 'useId|useSyncExternalStore|useInsertionEffect|createRoot|hydrateRoot|react-dom/client' 2>/dev/null
```

Любое попадание — стоп-сигнал: этот код не заработает на React 17, его нужно
адаптировать (см. [`docs/ai/codestyle.md`](../../../docs/ai/codestyle.md) и
правило про совместимость с React 17).

Дальше — push `release-0` и зелёный CI. С этого момента ветка готова
к релизу.

---

## 1. Предусловия

```bash
git status --porcelain
git fetch origin main release-0
gh release view <V1> --json tagName,publishedAt
gh release view <V0> 2>&1 | head -3
npm view @sberbusiness/triplex-next@<V1> version
git show origin/release-0:package.json | grep -m1 '"version"'
```

Проверки — при провале остановись и сообщи (в unattended — заверши с отчётом):

- Релиз `V1` существует и **уже опубликован в npm** (иначе нет смысла
  выпускать парный).
- Релиза/тега `V0` ещё нет.
- Версия в `origin/release-0` — `0.(Y-1).0`, то есть минор ровно на 1 меньше
  выпускаемого.
- Рабочее дерево чистое.

**Перелитие выполнено.** Проверяется тем, что состояние `main` достижимо из
`release-0`. Важно: **не против вершины `origin/main`.** К этому моменту
React 18-половина уже смержила релизный PR, и в `main` лежит коммит с бампом
`1.Y.0`, которого в `release-0` нет и быть не должно, — проверка против
вершины упала бы ложно.

```bash
git merge-base --is-ancestor <MAIN_SHA> origin/release-0
```

`MAIN_SHA` — состояние `main` до релиза, зафиксированное вызывающим скилом
([`release`](../release/SKILL.md), шаг 1). Проверка индифферентна к
собственным коммитам `release-0` поверх мержа — их может быть сколько угодно,
включая правки после разрешения конфликтов.

**Запасной вариант, если `MAIN_SHA` не передан** (самостоятельный запуск,
когда `1.Y.0` выпущена раньше и в другой сессии). Посмотри, чего в
`release-0` не хватает относительно `main`:

```bash
git log origin/main --not origin/release-0 --name-only --format='%h %s'
```

Допустимо, только если все затронутые файлы — это результат релизной
подготовки React 18-половины:

- `package.json`, `package-lock.json`;
- `stories/release-notes/v1/**`.

Любой другой файл означает, что перелитие не сделано или устарело. При
провале покажи этот вывод — без него сообщение бесполезно.

Разрешать ситуацию самостоятельно (доливать main) **нельзя**: мерж — ручной
шаг, и его результат никто не проверил.

**CI на вершине `release-0` зелёный:**

```bash
gh run list --workflow=ci.yml --branch release-0 --limit 1 \
  --json headSha,status,conclusion,url
git rev-parse origin/release-0
```

`headSha` прогона должен совпадать с вершиной `origin/release-0`,
`status` = `completed`, `conclusion` = `success`. Прогон на другом коммите
не считается — значит проверялось не то состояние ветки.

## 2. Перейти в `release-0` и прогнать гейты

Первым делом — переключиться на ветку. Все дальнейшие шаги (гейты, бамп,
коммит, push) идут в `release-0`, а текущей веткой почти наверняка будет
`main`: React 18-половина закончила на ней после мержа релизного PR.

```bash
git checkout release-0
git pull origin release-0
```

Рабочее дерево должно остаться чистым, а `git rev-parse HEAD` — совпасть
с `origin/release-0`: это то состояние, которое проверил CI на шаге 1.
Расхождение — стоп.

**Гейты — обязательно до push:**

```bash
npm install
npx tsc --noEmit
npm run test-unit
npm run build
```

Все четыре должны пройти. `npm run build` здесь не формальность: он гоняет
`tsc -p tsconfig.build.json`, собирает бандл и запускает
`scripts/checkBundleSize.js` — именно проблема сборки (утечка `vitest`
в бандл) сломала релиз 1.39.0.

**При падении любого гейта — остановись.** Не пушь, не создавай релиз,
покажи вывод. Ветку можно вернуть: `git reset --hard origin/release-0`
(пока не запушено). Чинить упавший гейт самостоятельно нельзя — причина
почти всегда в перелитии, а его делал человек.

## 3. Release notes и версия

**Notes.** Тело `stories/release-notes/v1/<V1>.mdx` переносится в
`stories/release-notes/v0/<V0>.mdx` без изменений — меняются только заголовки:

- `<Meta title="release-notes/v1/<V1>" />` → `<Meta title="release-notes/v0/<V0>" />`
- `<Title>v<V1></Title>` → `<Title>v<V0></Title>`

Файл `v0/<V0>.mdx` почти всегда уже существует: заготовку на него создал
предыдущий релиз. Что с ним делать — решает **предикат заготовки**, тот же,
которым [`release-react18`](../release-react18/SKILL.md) проверяет
`v1/<VERSION>.mdx` на шаге 1:

> Выброси из файла строки `import …`, `<Meta … />`, `<Title>…</Title>`,
> одиночные `<Heading>…</Heading>` и пустые строки. Если ничего не осталось —
> это заготовка.

- **Заготовка** → перезаписать телом из `v1/<V1>.mdx`.
- **Что-то осталось** → человек заполнил файл осознанно (например, пункт для
  React 17-сборки звучит иначе). Не трогать, взять как есть.

Побайтовое сравнение с шаблоном использовать нельзя: любая ручная правка
пробелов или перевода строки сломает совпадение, и заполненный человеком
файл будет молча перезаписан.

Если в заготовке `<Meta title>` или `<Title>` содержат **не** `<V0>` —
остановись. Значит предыдущий релиз оставил заготовку не на ту версию, и
чинить это молча нельзя.

В итоговом отчёте одной строкой скажи, каким путём пошли notes: перенесены
из `v1/<V1>.mdx` или использован заполненный вручную `v0/<V0>.mdx`.

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

## 4. Показать diff и запушить

Показывать нужно **несохранённые изменения релизной подготовки** — бамп
версии и notes. Сравнение `origin/release-0..HEAD` здесь бессмысленно: мерж
сделал и запушил человек, `HEAD` совпадает с `origin/release-0`, и такой
diff всегда пуст.

```bash
git status --short
git diff --stat
git diff -- package.json "stories/release-notes/v0/<V0>.mdx"
```

Ожидается ровно четыре файла: `package.json`, `package-lock.json` и два
`v0/*.mdx`. Что-то ещё — стоп: в дерево попало постороннее.

Считай по `git status --short`: `<NEXT0>.mdx` ты только что создал, он
untracked, и в `git diff --stat` его не будет. По той же причине в
unattended-отчёт кроме `--stat` включи и `--short` — иначе созданная
заготовка в отчёте не появится вовсе.

Что именно приехало перелитием, при необходимости смотрится отдельно —
`git diff --stat <MAIN_SHA>..origin/release-0`, — но это работа человека,
сделанная до релиза, и повторно её здесь не ревьюят.

В интерактивном режиме покажи сводку разработчику и дождись подтверждения.
В unattended — включи `git diff --stat` в отчёт и продолжай: содержимое
ветки уже проверено зелёным CI и гейтами шага 2, подтверждать некому.

```bash
git add package.json package-lock.json \
  "stories/release-notes/v0/<V0>.mdx" "stories/release-notes/v0/<NEXT0>.mdx"
git commit -m "<TRI-XXX> Подготовка релиза <V0>"     # от бота, если задан TRIPLEX_BOT_GH_TOKEN
git push origin release-0
```

Пути к notes указывай точно — `git add stories/release-notes/v0/` затянул бы
в релизный коммит любой посторонний файл, оказавшийся в каталоге.

Авторство бота — по паттерну из [`docs/ai/commits.md`](../../../docs/ai/commits.md).

## 5. GitHub Release

**Точка невозврата.** Текст notes собирается из `v0/<V0>.mdx` по канону из
[`release`](../release/SKILL.md), раздел «Преобразование MDX → release notes»
(убрать `import` / `<Meta>` / `<Title>`, `<Heading>X</Heading>` → `## X`).

```bash
gh release create <V0> --target release-0 --title "<V0>" --latest=false \
  --notes-file <путь_к_временному_файлу>
```

`--latest=false` **обязателен**: пометка latest должна оставаться на `1.x`.
Без флага GitHub может сам пометить релиз последним.

## 6. Дождаться публикации и проверить npm

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

## Unattended-режим

При `UNATTENDED=true` меняется только поведение в точках ожидания:

| Точка | Интерактивно | Unattended |
|---|---|---|
| Сводка diff перед push (шаг 4) | Показать, ждать подтверждения | Включить `--stat` в отчёт, продолжить |
| Текст release notes перед релизом (шаг 5) | Показать, ждать подтверждения | Включить в отчёт, продолжить |
| Расхождение notes v1 для React 17 (шаг 3) | Спросить разработчика | Не спрашивать: предикат заготовки решает однозначно |
| Ожидание `release.yml` (шаг 6) | `gh run watch` | Поллинг с таймаутом; таймаут → отчёт «релиз создан, публикация не подтверждена» |

**Что не меняется:** все предусловия шага 1, гейты шага 2 и стоп-условия
шага 3. Провал любого из них останавливает релиз в обоих режимах — unattended
не означает «продолжать несмотря на». Никакой шаг не «чинится» автоматически.

## Итог для разработчика

- версия `V0`, ссылка на GitHub Release;
- каким путём пошли release notes (перенос из `v1` / ручной `v0`);
- результат гейтов (tsc / unit / build) и ссылка на прогон CI `release-0`;
- подтверждение из npm: `react17` = `V0`, `latest` = `V1`;
- Storybook: `https://storybook.triplex-dev.ru/releases/<V0>`.

## Жёсткие ограничения

- Не мержить `main` в `release-0` — это ручной шаг мейнтейнера. Не «дотягивать»
  ветку самостоятельно при провале `is-ancestor`.
- Не пушить в `release-0` при упавшем гейте.
- Не менять смысл release notes при переносе v1 → v0 и не перезаписывать
  заполненный человеком `v0/<V0>.mdx`.
- Не помечать `0.x` как latest.
- Не форс-пушить в `release-0` и не переписывать её историю.
- Не «чинить» React 17-адаптации в сторону main — они намеренные.
- `--no-verify` запрещён.
