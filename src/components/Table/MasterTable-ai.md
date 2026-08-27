---
component: MasterTable
category: Table
related:
  - TableBasic
  - Pagination
tokens: []
stories: stories/MasterTable/MasterTable.stories.tsx
version: "1.0"
---

# MasterTable

## Назначение

Контейнер таблицы. Сам рисует только позиционирующую обёртку (`<div>` с `position: relative`), а его настоящая работа — собрать вокруг таблицы панели (фильтры, чипы, настройки колонок, подвал, пагинацию) и раздать им общее состояние через `MasterTableContext`: признак загрузки и текущую структуру колонок.

Используй когда: строишь табличный экран из нескольких частей — над таблицей фильтры, под ней подвал с массовыми действиями и пагинация, а состояние загрузки должно синхронно блокировать всё это.

Не используй когда: нужна только таблица без обвязки — тогда достаточно `TableBasic` (он работает и вне `MasterTable`, читая значения контекста по умолчанию). Для простых списков без колонок бери `List`.

---

## Варианты и props

`MasterTable` — контейнер, а не управляющий компонент: он не хранит данные, страницы и фильтры. Единственное собственное состояние — массив колонок, который в него записывает `MasterTable.TableBasic`.

### Props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `loading` | `boolean` | `false` | Состояние загрузки. Не рисуется на самом контейнере, а раздаётся потомкам через контекст. |
| `children` | `React.ReactNode` | — | Панели и таблица. Порядок в разметке = порядок на экране, компонент ничего не переставляет. |
| `...rest` | `React.HTMLAttributes<HTMLDivElement>` | — | Прокидывается на корневой `<div>`. `className` объединяется с собственным классом. |

Интерфейс props — `IMasterTableProps` в `src/components/Table/TableBasic/types.ts` (там же живут интерфейсы остальных частей семейства).

### Статические субкомпоненты

Публичный API строится через статические свойства. Те же компоненты доступны и напрямую из barrel `src/components/Table/index.ts` — статики нужны для читаемой композиции.

| Субкомпонент | Роль |
|---|---|
| `MasterTable.FilterPanel` | Панель под элементы фильтрации над таблицей. |
| `MasterTable.ChipPanel` | Панель чипов активных фильтров; `.Links` — блок ссылок справа. |
| `MasterTable.TableBasicSettings` | Выпадающие настройки таблицы (видимость и порядок колонок). |
| `MasterTable.TableBasic` | Сама таблица. |
| `MasterTable.NoColumns` | Заглушка для случая, когда пользователь скрыл все колонки. |
| `MasterTable.TableFooter` | Подвал: `.Summary` (подытоги, выбор всех) и `.Controls` (кнопки). |
| `MasterTable.PaginationPanel` | Панель под пагинацию. |

### Что раздаёт контекст

`MasterTableContext` (`src/components/Table/MasterTableContext.ts`) — единственный канал связи между частями:

| Поле | Кто пишет | Кто читает |
|---|---|---|
| `loading` | `MasterTable` из props | `TableBasic` — лоадер поверх таблицы; `PaginationNavigationButton`, `PaginationPageButton`, `PaginationSelect` — блокировка элементов пагинации |
| `columns` | `TableBasic` в `useEffect`, из своего props `columns` | `ColumnSettings` — список колонок для настройки видимости |
| `setColumns` | — | `TableBasic` |

Из этого следует неочевидное: `ColumnSettings` показывает колонки, **только если** внутри того же `MasterTable` отрисован `TableBasic` — до его первого эффекта контекст пуст.

---

## Дизайн-токены

Собственных токенов нет. `MasterTable.module.less` задаёт только `position: relative` — контекст позиционирования для лоадера, который `TableBasic` кладёт поверх таблицы. Визуал целиком приходит от вложенных частей (`TableBasic`, `TableFooter`, `Pagination`, `Typography`).

---

## Инварианты

- `forwardRef` на компоненте — не убирать. Ref идёт на корневой `<div>` (`HTMLDivElement`).
- Все семь статических субкомпонентов (`NoColumns`, `FilterPanel`, `ChipPanel`, `TableBasic`, `TableBasicSettings`, `TableFooter`, `PaginationPanel`) — часть публичного API. Ни переименовывать, ни удалять, ни менять их набор.
- `displayName` — `"MasterTable"`.
- Корневой элемент — `<div>`. `data-tx` выставляется **после** спреда `...rest`, поэтому потребитель не может его переопределить — это осознанное поведение, общее для семейства (`FilterPanel`, `PaginationPanel`).
- Собственный класс `styles.masterTable` объединяется с пользовательским `className` через `clsx`, а не затирается им.
- Значение контекста мемоизировано (`useMemo` по `columns` и `loading`) — не откатывать: возврат к новому объекту на каждый рендер снова заставит `useEffect` в `TableBasic` перезапускаться на каждый рендер контейнера.
- Колонки потребитель обязан заменять иммутабельно (`map`/спред, а не мутация на месте): эффект в `TableBasic` сравнивает `isEqual(columns, context.columns)`, а после первой синхронизации в контексте лежит **та же ссылка**, что пришла в props, — поэтому мутация на месте до `ColumnSettings` не доходит. К мемоизации это отношения не имеет, ограничение существовало и до неё; откат `useMemo` мутации не «починит».
- Статики перечислены в `IMasterTableStatics` вручную. Явная аннотация типа снимает проверку лишних свойств у `Object.assign`, поэтому набор в интерфейсе и в `Object.assign` правится синхронно — иначе новая статика не попадёт в публичный тип.
- `IMasterTableProps` объявлен в `src/components/Table/TableBasic/types.ts`, а не рядом с компонентом. Расположение историческое; перенос — breaking change для тех, кто импортирует тип по глубокому пути.
- Компонент React 17-совместим: никакого `useId`/`useSyncExternalStore` — код синхронизируется в ветку `release-0`.

---

## Accessibility

Собственной семантики контейнер не добавляет: это `<div>` без роли, вся доступность живёт в частях (таблица — `<table>` с заголовками, пагинация — `<nav>` со списком, настройки — `aria-haspopup`/`aria-expanded` на ссылке-триггере).

Что важно для потребителя:

- `loading` — визуальное и функциональное состояние, но не объявляемое: скринридер о начале загрузки не узнает. Если это критично, добавь свой `aria-live`-регион рядом с таблицей.
- Роль и подпись контейнера (`role`, `aria-label`) не хардкодятся — библиотека мультиязычная, передавай их сам через `...rest`, если экран того требует.

---

## Связанные компоненты

- `TableBasic` — сама таблица; единственная часть, которая пишет в контекст (`columns`). Работает и вне `MasterTable`, но тогда `loading` всегда `false`.
- `Pagination` — обычно кладётся в `MasterTable.PaginationPanel`. Её кнопки и селект читают `MasterTableContext.loading` и блокируются в загрузке; это опора на деталь `MasterTable`, поэтому связь зафиксирована с обеих сторон.
- `FilterPanel`, `ChipPanel` (`.Links`), `PaginationPanel`, `NoColumns` — тривиальные обёртки: `clsx(className)` + спред + собственный класс, без своей логики. Отличаются только стилями и тем, что `FilterPanel` и `PaginationPanel` выставляют `data-tx`.
- `TableFooter` — подвал поверх `FooterDescription`; `.Summary` даёт `.SelectedCount`, `.SelectAllButton` и `.Amount`, `.Controls` — это `FooterDescriptionControls` из семейства `Footer`.
- `TableBasicSettings` — выпадающие настройки поверх `ButtonDropdownExtended`; внутри `ColumnSettings` читает `columns` из контекста и поддерживает children-функцию `({ columns }) => ...`.

---

## Stories

Основные истории: `stories/MasterTable/MasterTable.stories.tsx`
Файлы примеров: `stories/MasterTable/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `loading` и набора панелей (фильтры, подвал, пагинация, пустая таблица) |
| `Default` | `Default.tsx` | Минимальная композиция: контейнер + `MasterTable.TableBasic` |
| `Loading` | `Loading.tsx` | `loading` — лоадер поверх заполненной таблицы |
| `NoData` | `NoData.tsx` | Пустой `data` — таблица показывает `renderNoData` |
| `NoColumns` | `NoColumns.tsx` | Все колонки с `hidden` — таблица показывает `renderNoColumns` с `MasterTable.NoColumns` |
| `Example` | `Example.tsx` | Production-like композиция: фильтры, настройки колонок, сортировка, выбор строк, подвал с подытогом, пагинация |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: загрузка поверх пустой таблицы, выделенная строка, пагинация, заблокированная загрузкой |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-27 | Создан документ. Компонент переведён с `React.FC` на `Object.assign(forwardRef(...), {...})` — теперь пробрасывает `ref` на корневой `<div>`; значение контекста мемоизировано. Публичный API не изменился. |
