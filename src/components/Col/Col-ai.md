---
component: Col
category: Layout
related: [Row, Gap]
tokens: []
stories: stories/Col/Col.stories.tsx
version: "1.0"
---

# Col

## Назначение

Колонка адаптивной 12-колоночной сетки (по модели Bootstrap 4). Задаёт ширину,
отступ слева и видимость содержимого на разных диапазонах экранов. Используется
только внутри `Row` — горизонтальный отступ между колонками (gutter) получает из
`RowContext`.

Используй когда: нужно разместить контент в адаптивной сетке — распределить
блоки по ширине страницы, менять раскладку по breakpoint'ам, скрывать колонки
на отдельных диапазонах экранов.

Не используй когда:
- Колонка находится вне `Row` — без контекста применится дефолтный gutter, а
  flex-раскладка родителя не гарантируется.
- Нужен вертикальный отступ между блоками — используй `Gap`.
- Нужна произвольная (не кратная 1/12) ширина — управляй стилями контейнера
  напрямую.

---

## Варианты и props

Обязательных props нет — `<Col>` без props занимает всю ширину (`size` по
умолчанию `12`).

### Группы props

Каждая группа существует в пяти вариантах: базовый (все экраны, mobile-first) и
breakpoint-модификаторы `*Sm`, `*Md`, `*Lg`, `*Xl`, действующие «от breakpoint
и шире». Более узкий breakpoint перекрывается более широким.

| Группа | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size`, `sizeSm/Md/Lg/Xl` | `TColumnSize` (1–12) | `size = 12` | Ширина колонки в долях сетки: `flex-basis`/`max-width` = N/12 |
| `offset`, `offsetSm/Md/Lg/Xl` | `TOffsetSize` (0–11) | — | Отступ слева (`margin-left`) в долях сетки; `0` — валидное значение, сбрасывает отступ на breakpoint'е |
| `hidden`, `hiddenSm/Md/Lg/Xl` | `boolean` | — | Скрывает колонку (`display: none !important`) от breakpoint'а и шире |
| `block`, `blockSm/Md/Lg/Xl` | `boolean` | — | Принудительно показывает колонку (`display: block !important`) от breakpoint'а и шире; в паре с `hidden` даёт диапазонную видимость |
| `...HTMLDivAttributes` | — | — | Все стандартные атрибуты `<div>`, включая `className` (мерджится с grid-классами через `clsx`) |

### Breakpoint'ы

Значения из `src/helpers/less/breakpoints.less` (media query `min-width`,
mobile-first):

| Суффикс | Диапазон |
|---|---|
| — (базовый) | все экраны, от 0 |
| `Sm` | ≥576px |
| `Md` | ≥768px |
| `Lg` | ≥992px |
| `Xl` | ≥1200px |

### Особенности поведения

- Паттерн диапазонной видимости: `hidden` + `blockMd` = колонка скрыта на
  xs/sm и видима с md и шире.
- `hidden` **переопределяет одноимённый нативный HTML-атрибут** с другой
  семантикой: prop добавляет CSS-класс `d-none`, а не атрибут `hidden` на div.
  Выставить нативный атрибут через Col нельзя — это исторический публичный
  контракт.
- Gutter (горизонтальный `padding` колонки) задаётся не props, а `Row`:
  `RowContext.gridHorizontalGap` (`EComponentSize.SM` = 8px,
  `EComponentSize.MD` = 12px; дефолт контекста — SM). Col лишь применяет
  соответствующий класс, устанавливающий `--grid-horizontal-gap`.

---

## Дизайн-токены

Собственных дизайн-токенов у компонента нет. Ширины и отступы вычисляются в LESS как доли `100% / 12`; gutter —
локальная переменная `--grid-horizontal-gap`, значение которой берётся из LESS-
переменных `@grid-horizontal-gap-SM` (8px) / `@grid-horizontal-gap-MD` (12px)
в `src/styles/components/grid.less`.

---

## Инварианты

- **`forwardRef`** — обязателен, не убирать. `ref` пробрасывается на корневой
  `<div>`.
- **Имена всех 20 responsive-props** (`size*`, `offset*`, `hidden*`, `block*`)
  и типы **`TColumnSize`**, **`TOffsetSize`** — публичное API, экспортируются
  из barrel. Изменение перечня значений — breaking change.
- **Дефолт `size = 12`** — колонка без props занимает всю ширину.
- **Корневой элемент `<div>`** и мердж `className` потребителя с
  grid-классами — не менять.
- **Схема генерации классов** `col-{prefix}-N` / `offset-{prefix}-N` /
  `d-none-{prefix}` / `d-block-{prefix}` в `Col.module.less` — классы
  резолвятся через `styles[c]`-маппинг; переименование селекторов ломает
  раскладку и тесты.
- **Зависимость от `RowContext`** — источник gutter'а. Не заменять на prop.
- Breakpoint-значения (576/768/992/1200) — общие для библиотеки
  (`breakpoints.less`), не задавать локальные.

---

## Accessibility

- Неинтерактивный layout-контейнер: без ARIA-роли, keyboard navigation и
  focus management не применимы.
- Скрытие через `hidden*` использует `display: none` — контент скрытой колонки
  недоступен и для screen reader'ов (в отличие от visually-hidden паттернов).
  Это ожидаемое поведение адаптивной сетки.
- Потребитель может передать `role`, `aria-*`, `data-*` через spread.

---

## Связанные компоненты

- `Row` (`src/components/Row/`) — обязательный родитель: flex-контейнер строки,
  провайдер `RowContext.gridHorizontalGap`.
- `Gap` (`src/components/Gap/`) — вертикальный отступ между блоками; используй
  вместо сетки, когда нужен только отступ.

---

## Stories

Основные истории: `stories/Col/Col.stories.tsx`
Файлы примеров: `stories/Col/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `size`, `offset`, `hidden`, `block` |
| `Default` | `DefaultExample.tsx` | Колонка без props — ширина по умолчанию (12/12) |
| `DifferentSizes` | `DifferentSizesExample.tsx` | Разные значения `size`, включая дефолтный |
| `ResponsiveSizes` | `ResponsiveSizesExample.tsx` | Адаптивные ширины `sizeSm/Md/Lg/Xl` |
| `WithOffsets` | `WithOffsetsExample.tsx` | Отступы слева через `offset` |
| `ResponsiveOffsets` | `ResponsiveOffsetsExample.tsx` | Адаптивные отступы `offsetSm/Md/Lg/Xl` |
| `HiddenColumns` | `HiddenColumnsExample.tsx` | Скрытие колонок на диапазонах экранов (`hidden*` + `block*`) |
| `VisualTests` | `VisualTestsExample.tsx` | Скриншот-регрессия основных состояний |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-28 | Создан документ. AI-рефакторинг (TRI-28): добавлен `forwardRef` на корневой `<div>`, JSDoc на `TColumnSize`/`TOffsetSize`/все props `IColProps`, rest-props переименован в `htmlDivAttributes`, расширены unit-тесты (49 кейсов: forwardRef, полный перебор size/offset, falsy-ветки). Публичный API не менялся. |
