---
component: ColumnSettingsSortableList
category: Table
related: [ColumnSettings, ColumnSettingsSortableListItem, ListSortable]
tokens: []
stories: stories/TableBasic/TableBasic.stories.tsx
version: "1.0"
---

# ColumnSettingsSortableList

## Назначение

Сортируемый список настроек колонок: адаптирует `ITableBasicColumn[]` к
`ListSortable`, используя `fieldKey` как DnD-идентификатор, и возвращает новый
порядок колонок через `onColumnsChange`.

Используй когда: пользователь должен менять порядок столбцов таблицы мышью или
касанием, сохраняя остальные настройки колонок.
Не используй когда: нужен несортируемый список — выбирай `ColumnSettings.StaticList`;
для произвольных объектов с `id` используй `ListSortable`.

Публичный доступ — через статическое свойство импортированного родителя:

```tsx
import { ColumnSettings, MasterTable, TableBasicSettings } from "@sberbusiness/triplex-next";

const SortableColumns = ColumnSettings.SortableList;
const SettingsList = TableBasicSettings.ColumnSettings.SortableList;
const MasterSettingsList = MasterTable.TableBasicSettings.ColumnSettings.SortableList;
```

Именованного экспорта `ColumnSettingsSortableList` из корня пакета нет.
Интерфейс `IColumnSettingsSortableListProps` экспортируется из корня.

---

## Варианты и props

### Обязательные props

| Prop | Описание |
|---|---|
| `columns` | Полный упорядоченный массив колонок. `fieldKey` уникален в пределах списка; скрытые колонки не отфильтровываются |
| `onColumnsChange` | Получает новый массив колонок в порядке после drag-and-drop, без служебного `id`. Потребитель сохраняет его в своём состоянии |

### Опциональные props

Наследует props `ListSortable`, исключая `items` и `onItemsChange`.

| Prop | По умолчанию | Описание |
|---|---|---|
| `children` | — | Разметка строк. Обычно `columns.map(...)` с `ColumnSettings.SortableList.Item`; список не создаёт её автоматически |
| `loading` | `false` (отсутствует) | Показывает overlay-лоадер внутреннего `List`; не читается из `MasterTableContext` |
| `className`, HTML-/`data-*`-/`aria-*`-атрибуты | — | Передаются через `ListSortable` во внутренний `<ul>` |
| `ref` | — | Указывает на внутренний `HTMLUListElement` |

### Преобразование и управление состоянием

Для DnD каждая колонка копируется в объект с `id`, равным её `fieldKey`.
При получении нового порядка служебное поле `id` удаляется из каждой колонки;
остальные данные, включая `hidden`, `renderCell` и атрибуты, сохраняются.
Исходные массивы и объекты компонент не мутирует.

Список управляемый: после `onColumnsChange` передай новый массив и отрисуй children
в том же порядке. У каждой строки `Item.id` должен совпадать с `column.fieldKey`.
Пустой массив допустим. Замена `columns` должна быть иммутабельной — адаптированные
элементы мемоизируются по ссылке на массив.

Список не читает контекст `MasterTable`: может использоваться самостоятельно,
а внутри таблицы нужно передавать ему тот же набор колонок, что и в `TableBasic`.
Он не меняет `hidden` по клику и не сортирует строки таблицы по значениям ячеек.

---

## Дизайн-токены

У контейнера нет собственного LESS-модуля и токенов: `tokens: []`.
Разметку и загрузку предоставляет `ListSortable` → `List`, оформление строк —
`ColumnSettingsSortableListItem` и его target. Токены
`TableBasic.TableBasicSettings_ListItem_*` относятся к строкам, а не к адаптеру.

Переопределение через `ThemeProvider` описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- Сохранять `forwardRef<HTMLUListElement>` и ref на `<ul>` внутреннего `List`.
- Публичный доступ — `ColumnSettings.SortableList` и вложенное `.Item`;
  сохранять идентичность статик и `IColumnSettingsSortableListProps`.
  `displayName` — `ColumnSettingsSortableList`.
- `fieldKey` служит DnD-идентификатором. Не генерировать отдельные нестабильные
  идентификаторы и не менять соответствие `Item.id` / `fieldKey`.
- `onColumnsChange` получает полный массив в новом порядке без служебного `id`.
  Не терять метаданные, скрытые колонки и функции рендера.
- Сохранять controlled-поведение и мемоизацию по ссылке на `columns`.
- Не брать `columns` и `loading` из контекста: их источником являются props.
- Сохранять проброс children, HTML-атрибутов и ref в `ListSortable`.

---

## Accessibility

- Корень — нативный `<ul>` из `List`. Потребитель рендерит строки через `.Item`
  и задаёт подписи вложенным чекбоксам и кнопкам.
- DnD наследуется от `ListSortable`: доступны мышь и touch; `KeyboardSensor`
  в его конфигурации не включён. Этот адаптер не добавляет клавиатурную
  перестановку и не предоставляет настройки сенсоров через свой API.
- Обычная клавиатурная работа интерактивных элементов строки сохраняется.
  `ColumnSettingsSortableListItem` размещает children в controls-области,
  исключённой из зоны начала перетаскивания.
- `loading` передаётся во внутренний `List`; автоматическое `aria-busy` этот
  адаптер не задаёт. При необходимости передай его как HTML/ARIA-атрибут.

---

## Связанные компоненты

- [ColumnSettings](./ColumnSettings-ai.md) — родитель и публичный путь
  `.SortableList`; предоставляет также альтернативный `.StaticList`.
- [ColumnSettingsSortableListItem](./ColumnSettingsSortableListItem-ai.md) —
  статическое `.Item`: DnD-строка с областью управления и необязательным
  `staticContent`.
- [ListSortable](../List/ListSortable-ai.md) — рендерится внутри; предоставляет
  props списка, DnD-сенсоры и callback нового порядка.

---

## Stories

Основные истории: `stories/TableBasic/TableBasic.stories.tsx`
Файлы примеров: `stories/TableBasic/examples/`

Истории родителя используют публичный путь `ColumnSettings.SortableList`.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `TableSettingsColumn` | `TableSettingsColumn.tsx` | Управляемый порядок колонок, `.Item.id` и чекбоксы видимости |
| `TableSettingsColumnExtended` | `TableSettingsColumnExtended.tsx` | Сортируемые колонки со вложенными статическими настройками |
| `VisualTests` | `VisualTests.tsx` | Открытые настройки с чекбоксами, скрытой и заблокированной колонками; пустой список и загрузка |

Преобразование данных, callbacks, ref и HTML-атрибуты проверяются в
`src/components/Table/__tests__/ColumnSettingsSortableList.test.tsx`. В этих
unit-тестах подменяется граница `ListSortable`, а не эмулируется сторонний drag.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-03 | Создан документ; зафиксированы публичный статический путь, адаптация колонок и управляемая сортировка. |
