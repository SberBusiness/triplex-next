---
component: Pagination
category: Navigation
related:
  - PaginationExtended
  - PaginationNavigation
  - PaginationNavigationButton
  - PaginationNavigationExtended
  - PaginationNavigationExtendedItem
  - PaginationPageButton
  - PaginationPageEllipsis
  - PaginationSelect
  - SelectField
  - ButtonIcon
  - ButtonBase
  - MasterTable
tokens:
  - --triplex-next-Pagination-PageButton_Background_Hover
  - --triplex-next-Pagination-PageButton_Background_Active
  - --triplex-next-Pagination-PageButton_Background_Selected
  - --triplex-next-Pagination-PageButton_BorderColor_Focus
stories: stories/Pagination/Pagination.stories.tsx
version: "1.0"
---

# Pagination

## Назначение

Составной компонент пагинации: навигация по страницам (кнопки «Назад»/«Вперёд», номера страниц, многоточия) и опциональный выбор количества элементов на странице. `Pagination` — готовая точка входа, которая собирает `PaginationSelect` и `PaginationNavigation` внутри контейнера `PaginationExtended`.

Используй когда: нужно дать пользователю переход по страницам списка/таблицы, при необходимости — с выбором размера страницы.

Не используй когда: данных немного и они помещаются на один экран (навигация всё равно отрисуется — одной страницей с заблокированными стрелками); нужна бесконечная прокрутка вместо постраничной.

---

## Варианты и props

`Pagination` — управляемый компонент: текущая страница и размер страницы хранятся в стейте потребителя и передаются через колбэки. Компонент не хранит состояние страницы сам.

### `Pagination` (точка входа)

| Prop | Тип | Обяз. | Описание |
|---|---|---|---|
| `paginationNavigationProps` | `IPaginationNavigationProps` | да | Настройки навигации по страницам. Навигация рендерится всегда: при `totalPages <= 1` — одна страница с заблокированными стрелками. |
| `paginationSelectProps` | `IPaginationSelectProps` | нет | Настройки селекта размера страницы. Если не передан — селект не отображается. |
| `...rest` | `IPaginationExtendedProps` | — | Прокидывается в корневой `<nav>` (className, aria-атрибуты и т.д.). |

### `PaginationNavigation` props (через `paginationNavigationProps`)

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `currentPage` | `number` | — | Номер текущей страницы (нумерация с 1). |
| `totalPages` | `number` | — | Общее число страниц. Значения меньше 1 отображаются как одна страница. |
| `onCurrentPageChange` | `(page: number) => void` | — | Колбэк смены страницы. Вызывается с целевым номером. |
| `boundaryCount` | `number` | `0` | Сколько страниц всегда показывать в начале и в конце. |
| `siblingCount` | `number` | `0` | Сколько соседних страниц показывать вокруг текущей. |
| `buttonPrevProps` / `buttonNextProps` | `Omit<IPaginationNavigationButtonProps, "direction" \| "children">` | — | Доп. настройки кнопок навигации. |

Логика расстановки видимых страниц и многоточий — в `utils/paginationUtils.tsx` (`PaginationUtils.createPagesArray`). При больших `totalPages` и нулевых `boundaryCount`/`siblingCount` отображается минимальный набор; увеличение этих значений раскрывает больше номеров и добавляет многоточия по краям. Места многоточий помечаются sentinel-значением `PAGINATION_ELLIPSIS_VALUE` (`-1`) в массиве страниц.

### `PaginationSelect` props (через `paginationSelectProps`)

Расширяет `ISelectFieldProps` (без `size`, с обязательным `value`) и добавляет `paginationLabel: React.ReactNode` — текст лейбла перед селектом. Размер селекта зафиксирован как `EComponentSize.SM`. `value`, `options`, `onChange` — управляются потребителем.

### Состояние загрузки внутри `MasterTable`

Собственного prop загрузки у пагинации нет. Внутри `MasterTable` с `loading` элементы пагинации
блокируются автоматически: `PaginationNavigationButton` и `PaginationPageButton` получают
`disabled`, `PaginationSelect` — `status={EFormFieldStatus.DISABLED}`, из-за которого выпадающий
список не открывается. Читается это из `MasterTableContext` (`loading`), поэтому работает и через
`Pagination`, и через ручную компоновку на `PaginationExtended`.

Лоадер при этом рисует `TableBasic` — он лежит в собственном `position: relative`-контейнере и
перекрывает только таблицу. Пагинация в `MasterTable.PaginationPanel` остаётся видимой и читаемой.

Вне `MasterTable` контекст отдаёт `loading: false`, поэтому автономная пагинация ведёт себя
как раньше: блокировка приходит только из `disabled` на `buttonPrevProps`/`buttonNextProps` и из
крайних страниц.

### Subкомпоненты для кастомной компоновки

Для нестандартной раскладки используется `PaginationExtended` напрямую с вложенными `PaginationNavigation` и `PaginationSelect` (см. story `Extended`). Низкоуровневые части (`PaginationNavigationExtended`, `PaginationNavigationExtendedItem`, `PaginationPageButton`, `PaginationPageEllipsis`, `PaginationNavigationButton`) экспортируются для построения полностью кастомной навигации, но обычно используются неявно через `PaginationNavigation`.

---

## Дизайн-токены

Собственные токены использует только `PaginationPageButton`:

```text
--triplex-next-Pagination-PageButton_Background_Hover
--triplex-next-Pagination-PageButton_Background_Active
--triplex-next-Pagination-PageButton_Background_Selected
--triplex-next-Pagination-PageButton_BorderColor_Focus
```

Остальные части наследуют визуал от переиспользуемых компонентов: кнопки навигации — от `ButtonIcon`, кнопка-страница — от `ButtonBase`, селект — от `SelectField`, текст — от `Typography` (`Text`).

---

## Инварианты

- `forwardRef` на всех компонентах семейства — не убирать. Refs: `Pagination` → `HTMLSpanElement` (фактически прокидывается в корневой `<nav>` через `PaginationExtended`, ref-тип которого `HTMLElement`), `PaginationNavigation`/`PaginationNavigationExtended` → `HTMLUListElement`, `PaginationNavigationExtendedItem` → `HTMLLIElement`, `PaginationSelect` → `HTMLDivElement`, кнопки → `HTMLButtonElement`, ellipsis → `HTMLSpanElement`.
- Публичный API не менять: имена и обязательность props (`paginationNavigationProps` — обязателен, `paginationSelectProps` — опционален), enum `EPaginationNavigationIconDirection` (`BACK`/`NEXT`), barrel-экспорты из `index.ts`.
- Корневой DOM-элемент `Pagination`/`PaginationExtended` — `<nav>`; навигация по страницам — семантический список `<ul>/<li>`. Не менять без обсуждения: семантика участвует в accessibility-контракте.
- Навигация рендерится всегда, включая случай единственной страницы: `PaginationNavigation` приводит `totalPages` к минимуму 1, рисует одну страницу и блокирует обе стрелки. Это держит высоту панели пагинации постоянной независимо от размера страницы — не возвращать условный рендер по `totalPages > 1`.
- Логику `PaginationUtils.createPagesArray` / `generatePageRanges` / `generateRange` не менять без перегенерации `__tests__/paginationUtils.test.tsx` — там зафиксированы граничные случаи раскладки.
- `PAGINATION_ELLIPSIS_VALUE = -1` — sentinel в массиве страниц, на него завязан рендер многоточия.
- Блокировка по `MasterTableContext.loading` перекрывает `disabled`, пришедший из props: в состоянии загрузки кнопка заблокирована независимо от того, что передал потребитель. Обратное неверно — вне загрузки решает prop.
- Импорт `MasterTableContext` в частях пагинации — абсолютный (`@sberbusiness/triplex-next/components/Table/MasterTableContext`), как в самом `Table`. Относительный путь сюда не ставить.

---

## Accessibility

- Корень — `<nav>`, навигация — список `<ul>/<li>`, что даёт ассистивным технологиям корректную семантику пагинации.
- Кнопки «Назад»/«Вперёд» автоматически получают `disabled` на первой/последней странице соответственно.
- Текущая страница (`PaginationPageButton` с `isCurrent`) помечается `aria-live="polite"`, чтобы смена страницы озвучивалась скринридером.
- `PaginationSelect` связывает лейбл и контрол через `aria-labelledby` (генерируемый `instanceId`), лейбл также используется как `mobileTitle`.
- Текст кнопок навигации не хардкодится в компоненте — при необходимости потребитель передаёт `aria-label` через `buttonPrevProps`/`buttonNextProps` (библиотека мультиязычная).

---

## Связанные компоненты

- `PaginationExtended` — контейнер `<nav>` для кастомной компоновки пагинации.
- `PaginationNavigation` — блок навигации по страницам (используется внутри `Pagination`, доступен отдельно).
- `PaginationSelect` — селект размера страницы поверх `SelectField`.
- `PaginationNavigationExtended` / `PaginationNavigationExtendedItem` — список `<ul>` и его элемент `<li>` для построения кастомной навигации.
- `PaginationPageButton` — кнопка-страница (поверх `ButtonBase`).
- `PaginationPageEllipsis` — многоточие, заменяющее группу скрытых страниц.
- `PaginationNavigationButton` — кнопка «Назад»/«Вперёд» (поверх `ButtonIcon`), направление задаётся `EPaginationNavigationIconDirection`.
- `MasterTable` — таблица, в паре с которой пагинация обычно и используется (`MasterTable.PaginationPanel`). Её `loading` через `MasterTableContext` блокирует элементы пагинации.

---

## Stories

Основные истории: `stories/Pagination/Pagination.stories.tsx`
Файлы примеров: `stories/Pagination/examples/Pagination/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `currentPage`, `totalPages`, `boundaryCount`, `siblingCount`, `hidePaginationSelect`, `paginationLabel`, `className` |
| `Default` | `Default.tsx` | Базовая навигация без селекта (50 элементов, размер страницы 10) |
| `WithSelectField` | `WithSelectField.tsx` | Навигация с селектом размера страницы, `boundaryCount`/`siblingCount = 1` |
| `Extended` | `Extended.tsx` | Кастомная компоновка через `PaginationExtended` + `PaginationNavigation` + `PaginationSelect` |
| `VisualTests` | — | Скриншот-регрессия: короткая навигация, многоточия слева/справа/с обеих сторон, disabled-крайние кнопки, вариант с селектом |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-06-22 | Создан документ |
| 2026-08-12 | В состоянии загрузки `MasterTable` элементы пагинации становятся `disabled` — читается из `MasterTableContext.loading`. Публичный API не изменился. Заодно `PaginationSelect` перестал молча терять переданный `status`. |
| 2026-08-27 | Навигация больше не скрывается при `totalPages <= 1`: отрисовывается одна страница с заблокированными стрелками, высота панели пагинации не схлопывается. Публичный API не изменился. |
