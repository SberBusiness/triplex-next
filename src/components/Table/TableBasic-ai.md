---
component: TableBasic
category: Table
related: [MasterTable, ListTableItem, LoaderScreen, LoaderMiddle, Text]
tokens:
  - TableBasic.Header_Background
  - TableBasic.Color
  - TableBasic.Background_Hover
  - TableBasic.Background_Selected
stories: stories/TableBasic/TableBasic.stories.tsx
version: "1.0"
---

# TableBasic

## Назначение

Табличное представление данных: `<table>` с шапкой из `columns`, строками из
`data` и подвалом, в котором показывается заглушка пустого состояния или лоадер.
Обвязку вокруг таблицы — панель чипов, фильтры, настройки колонок, футер
выделения и пагинацию — добавляет родительский `MasterTable`; из его контекста
`TableBasic` берёт состояние загрузки и публикует в него свой набор колонок.

Используй когда: нужен структурированный набор данных в строках и столбцах —
реестр документов, выписка, список операций.

Не используй когда:
- нужен список карточек с собственной вёрсткой строки, свайпом или
  drag-and-drop — бери `List` / `ListTableItem`;
- таблица должна работать без `MasterTable`. Формально это возможно (контекст
  имеет значения по умолчанию), но тогда не работают `loading` и настройки
  колонок — это не поддерживаемый сценарий.

---

## Варианты и props

`TableBasic` доступен и напрямую, и как `MasterTable.TableBasic` — это один и
тот же компонент.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `columns` | `ITableBasicColumn[]` | Описание столбцов: ключ поля, заголовок, выравнивание, ширина, сортировка |
| `data` | `ITableBasicRow[]` | Строки таблицы. Пустой массив — рендерится `renderNoData` |
| `renderNoData` | `() => React.JSX.Element` | Заглушка для пустой таблицы. Обязателен даже там, где данные всегда есть |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `renderNoColumns` | `() => React.ReactNode` | — | Заглушка вместо таблицы, когда все `columns` скрыты (`hidden`) |
| `highlightRowOnHover` | `boolean` | `false` | Подсветка строки под курсором |
| `onOrderBy` | `(order: ISortOrder) => void` | — | Обработчик сортировки. Включает кнопку сортировки у колонок с `orderDirection` |
| `onClickRow` | `(rowKey: string) => void` | — | Клик по строке. Включает `cursor: pointer` и подсветку при наведении |
| `headless` | `boolean` | `false` | Скрыть шапку таблицы |
| `...HTMLTableElementAttributes` | — | — | Стандартные атрибуты `<table>`, включая `className`; `ref` — на `<table>` (в ветке `renderNoColumns` таблицы нет, ref пустой) |

### `ITableBasicColumn`

| Поле | Тип | По умолчанию | Описание |
|---|---|---|---|
| `fieldKey` | `string` | — | Ключ в `rowData`, значение которого выводится в ячейке |
| `label` | `string \| React.JSX.Element` | — | Содержимое заголовка |
| `title` | `string` | — | Нативный `title` у `<th>` |
| `orderDirection` | `EOrderDirection` | — | Текущее направление. Наличие значения + `onOrderBy` включают сортировку |
| `horizontalAlign` | `EHorizontalAlign` | `LEFT` | Горизонтальное выравнивание |
| `verticalAlign` | `EVerticalAlign` | `BASELINE` для `TEXT`, `TOP` для остальных | Вертикальное выравнивание |
| `cellType` | `ECellType` | `TEXT` | Отступы ячейки и способ вывода контента |
| `width` | `string \| number` | — | У `<th>` задаёт `min/max/width`, у `<td>` — только `width` |
| `hidden` | `boolean` | `false` | Столбец не рендерится ни в шапке, ни в строках |
| `renderCell` | `(param: any) => React.ReactNode` | — | Кастомный рендер значения ячейки |
| `dataAttributes` / `ariaAttributes` | `TDataHTMLAttributes` / `TAriaHTMLAttributes` | — | Ключи без префикса: `{label: "..."}` → `aria-label="..."` |

### `ITableBasicRow`

| Поле | Тип | По умолчанию | Описание |
|---|---|---|---|
| `rowKey` | `string` | — | React-key строки, он же аргумент `onClickRow` |
| `rowData` | `any` | — | Объект «ключ колонки → значение ячейки» |
| `rowLayout` | `Record<string, ITableRowCellSpanProps>` | — | `rowSpan` / `colSpan` по ключу колонки |
| `selected` | `boolean` | `false` | Подсветка выбранной строки. Компонент сам флаг не проставляет |
| `dataAttributes` / `ariaAttributes` | `TDataHTMLAttributes` / `TAriaHTMLAttributes` | — | Атрибуты `<tr>`; `test-id` дополнительно строит `data-test-id` ячеек |

### Ограничения по типам ячеек

- `ECellType.TEXT` (по умолчанию) — значение оборачивается в `Text` размера `B3`.
- `ECellType.COMPONENTS` и `ECellType.CHECKBOX` — разметка выводится как есть,
  меняются только внутренние отступы ячейки.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/TableBasic.ts`.

```text
TableBasic.Header_Background
TableBasic.Color
TableBasic.Background_Hover
TableBasic.Background_Selected
```

Остальные токены группы `TableBasic` (`TableFooter_*`, `TableBasicSettings_*`)
принадлежат соседним компонентам семейства — `TableFooter` и `TableBasicSettings`,
у которых пока нет собственных AI.md. Поэтому `syncAiMdTokens` предупреждает,
что эти токены есть в LESS директории, но не перечислены ни в одном документе.

---

## Инварианты

- **Корневой DOM — `<div>` со стилями таблицы, а `ref` и остальные HTML-атрибуты
  идут на вложенный `<table>`.** Так исторически ведёт себя `className`, и
  `forwardRef` добавлен туда же. Переносить их на корневой `<div>` — breaking
  change. Проброс не безусловный: когда все колонки скрыты и задан
  `renderNoColumns`, вместо таблицы рендерится заглушка и `ref.current` остаётся
  `null` — измерять таблицу по ref в этом состоянии нельзя.
- **`renderNoData` обязателен.** Сделать его опциональным можно только вместе с
  решением, что рендерится при пустых данных без него.
- **Ячейка рендерится, только если ключ колонки есть в `rowData`.** Колонка без
  соответствующего ключа не даёт `<td>` вовсе — строка окажется короче шапки.
  Для пустой ячейки передавай `null`, а не отсутствие ключа.
- **Пустое значение ячейки заменяется плейсхолдером `---`.** Проверка falsy,
  поэтому `0`, `""` и `false` тоже дают `---`. Менять это правило —
  наблюдаемое изменение поведения.
- **Компонент не сортирует данные.** `onOrderBy` вызывается со **следующим**
  направлением по циклу `none → asc → desc → none`; сортировку выполняет
  потребитель и возвращает новый `orderDirection` в колонке.
- **Колонки публикуются в `MasterTableContext`** через `useEffect` с
  `isEqual`-сравнением — на нём держатся настройки колонок
  (`TableBasicSettings` / `ColumnSettings`). Собирай `columns` стабильно
  (по возможности вне рендера), иначе таблица будет лишний раз обновлять
  контекст.
- **`loading` приходит только из контекста `MasterTable`**, собственного prop'а
  у таблицы нет.
- **Класс `selected` на `<tr>` выставляется дважды** — хешированный из
  CSS-модуля и глобальный `"selected"`. Глобальный оставлен для внешних стилей
  и тестов, удалять нельзя.

---

## Accessibility

- Разметка нативная: `<table>` / `<thead>` / `<tbody>` / `<th>` / `<td>`,
  скринридер читает её как таблицу без дополнительных ролей.
- Собственных `aria-*` компонент не хардкодит — библиотека мультиязычная.
  `aria-label` таблицы передаётся через props (уходит на `<table>`), атрибуты
  столбца и строки — через `ariaAttributes` (ключи без префикса `aria-`).
- **Сортировка не доступна с клавиатуры.** Заголовок с сортировкой — это
  `<span>` с `onClick`, без `role="button"`, `tabIndex` и обработки
  `Enter` / `Space`; `aria-sort` не выставляется. То же с `onClickRow`: клик по
  `<tr>` не имеет клавиатурного эквивалента. Если нужен доступный вариант —
  клади в ячейку интерактивный элемент через `renderCell`.
- Иконка направления сортировки в состоянии `NONE` видна только при наведении на
  заголовок — состояние сортировки передаётся только цветом и формой иконки.

---

## Связанные компоненты

- `MasterTable` — родитель семейства: провайдер контекста (`loading`, `columns`)
  и контейнер для панелей. Предоставляет `MasterTable.TableBasic`,
  `MasterTable.FilterPanel`, `MasterTable.ChipPanel`,
  `MasterTable.TableBasicSettings`, `MasterTable.TableFooter`,
  `MasterTable.PaginationPanel`, `MasterTable.NoColumns`.
- `ListTableItem` — альтернатива для табличного списка, когда строка это
  карточка со своей вёрсткой, свайпом и контролами.
- `LoaderScreen` — рендерится поверх таблицы, когда `loading` пришёл из
  контекста, а данные уже есть.
- `LoaderMiddle` — рендерится в подвале, когда идёт загрузка и данных ещё нет.
- `Text` — в него оборачивается содержимое заголовков и ячеек типа
  `ECellType.TEXT`.

---

## Stories

Основные истории: `stories/TableBasic/TableBasic.stories.tsx`
Файлы примеров: `stories/TableBasic/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль загрузки, шапки, подсветки, данных, скролла и кнопок |
| `Default` | `Default.tsx` | Минимальная таблица: `columns`, `data`, `renderNoData` |
| `Alignments` | `Alignments.tsx` | `horizontalAlign` и `verticalAlign` и их значения по умолчанию |
| `CellTypes` | `CellTypes.tsx` | `ECellType.TEXT` / `COMPONENTS` / `CHECKBOX` |
| `Sorting` | `Sorting.tsx` | Цикл `none → asc → desc → none`, сортировка на стороне потребителя |
| `Headless` | `Headless.tsx` | Таблица без шапки |
| `HighlightRowOnHover` | `HighlightRowOnHover.tsx` | Подсветка строки под курсором |
| `ClickableRows` | `ClickableRows.tsx` | `onClickRow` и флаг `selected` в данных строки |
| `NoData` | `NoData.tsx` | Заглушка пустой таблицы |
| `NoColumns` | `NoColumns.tsx` | Заглушка, когда все колонки скрыты |
| `Loading` | `Loading.tsx` | Загрузка поверх данных и загрузка при пустой таблице |
| `TableSpan` | `TableSpan.tsx` | Объединение ячеек через `rowLayout` |
| `TableSettingsColumn` | `TableSettingsColumn.tsx` | Настройка видимости и порядка колонок |
| `TableSettingsColumnExtended` | `TableSettingsColumnExtended.tsx` | Настройка не только колонок, но и блоков внутри колонки |
| `TableWithPagination` | `TableWithPagination.tsx` | Таблица с `Pagination` при известном количестве данных |
| `TableWithPaginationLoading` | `TableWithPaginationLoading.tsx` | Фильтры, таблица и пагинация в состоянии загрузки |
| `TableWithPaginationExtended` | `TableWithPaginationExtended.tsx` | Таблица с `PaginationExtended` при неизвестном количестве данных |
| `Example: production` | `ExampleProduction.tsx` | Композиция, приближённая к production: чипы-сегменты, фильтры, теги |
| `VisualTests` | `VisualTests.tsx` | Статичные визуальные состояния в одном кадре |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-27 | Создан документ. AI-рефакторинг: `TableBasic` получил `forwardRef` на `<table>`, JSDoc на всех публичных полях, разбор подвала по состояниям, удалён неиспользуемый `TableBasicAdaptive.module.less`. Stories переведены на modern pattern, добавлены unit-тесты (46) |
