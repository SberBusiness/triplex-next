---
component: ListMaster
category: List
related: [ListMasterHeader, ListMasterFooter, List, ChipGroup]
tokens: []
stories: stories/ListMaster/ListMaster.stories.tsx
version: "1.0"
---

# ListMaster

## Назначение

Compound-компонент, оборачивающий список и фильтры в единый layout. Объединяет
sticky-шапку (selection-controls), тело со списком и `ChipGroup`-фильтрами,
sticky-футер с агрегатами и действиями. Сам по себе — простой `<div>`-контейнер;
смысл придают статические подкомпоненты.

Используй `ListMaster` когда: страница со списком, где нужны фильтры, выбор
элементов и действия по выбранному.

---

## Варианты и props

### Опциональные props (`ListMaster`)

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Композиция из статических подкомпонентов |
| `...HTMLDivAttributes` | — | — | Все стандартные атрибуты `<div>` |

### Статические подкомпоненты (compound API)

| Имя | Назначение | Отдельный AI.md |
|---|---|---|
| `ListMaster.Header` | Sticky-шапка (обычно показывается при выделении ≥1 элемента) | ✅ `ListMasterHeader-ai.md` |
| `ListMaster.Body` | Основная область с фильтрами и списком | — (тривиальная обёртка) |
| `ListMaster.ChipGroup` | Горизонтальная группа `Chip`-фильтров с фиксированным `oneLine` и отступами | — (описано ниже) |
| `ListMaster.Footer` | Sticky-футер с агрегатами и действиями | ✅ `ListMasterFooter-ai.md` |
| `ListMaster.FooterDescription` | Текстовая часть футера (например, «Сумма: 1 220 000 RUB») | — (тривиальная обёртка) |
| `ListMaster.FooterControls` | Контейнер для кнопок в футере | — (тривиальная обёртка) |
| `ListMaster.SelectionControls` | Flex-контейнер с `justify-content: space-between` для управления выделением (обычно: «Выбрать все» / «Выбрано: N» / «Сбросить») | — (описано ниже) |

---

## Инварианты

- **`forwardRef`** — обязателен на `ListMaster`. Реализован через `Object.assign(forwardRef, { Body, Header, ... })`. Не убирать.
- **Статические свойства** (`Body`, `Header`, `ChipGroup`, `Footer`, `FooterControls`, `FooterDescription`, `SelectionControls`) — часть публичного API. Не переименовывать без подтверждения.
- **Все компоненты семейства `ListMaster*`** также экспортируются из barrel `index.ts` отдельно (можно использовать как `import { ListMasterHeader }`, так и `<ListMaster.Header>`). Сохраняй оба варианта.
- **Корневой DOM** — `<div>`. Не менять, ref-target — этот div.

---

## Связанные компоненты

### Описаны здесь (тривиальные обёртки без отдельного AI.md)

- **`ListMasterBody`** (`ListMaster.Body`) — `<div>`-контейнер для основной области; ничего кроме `className + ...rest` не делает. Семантика — «между Header и Footer».
- **`ListMasterChipGroup`** (`ListMaster.ChipGroup`) — обёртка над `<ChipGroup>` с фиксированным `oneLine={true}` и горизонтальным padding `0 16px`. Используется для горизонтальной полосы фильтров с прокруткой.
- **`ListMasterFooterDescription`** (`ListMaster.FooterDescription`) — `<div>` с `padding-right: 16px`. Левая текстовая часть футера.
- **`ListMasterFooterControls`** (`ListMaster.FooterControls`) — `<div>` с `white-space: nowrap`. Правая часть футера для кнопок.
- **`SelectionControls`** (`ListMaster.SelectionControls`) — `<div>` с `display: flex; justify-content: space-between; align-items: center`. Layout для controls внутри `ListMaster.Header`.

### Имеют отдельный AI.md

- **`ListMasterHeader`** — sticky-шапка с компенсацией высоты через `window.scrollTo` (см. `ListMasterHeader-ai.md`).
- **`ListMasterFooter`** — sticky-футер (см. `ListMasterFooter-ai.md`).

### Внешние

- **`List`** — обычно содержится внутри `ListMaster.Body`.
- **`ChipGroup`** — используется внутри `ListMasterChipGroup` как реализация.

---

## Stories

Основные истории: `stories/ListMaster/ListMaster.stories.tsx`
Файлы примеров: `stories/ListMaster/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `Default.tsx` | Production-like пример: TabsLine + `ChipGroup`-фильтры + selectable `ListItemTable` + sticky Header при выделении + sticky Footer с суммой и действиями + LightBox с расширенными фильтрами + пустое состояние |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ. Добавлен `forwardRef` на `ListMaster` (breaking — изменён TS-тип, удалён `IListMasterFC`). Исправлен `displayName` у `ListMasterChipGroup`. Экспортирован `IListMasterChipGroupProps`. Добавлены unit-тесты. |
