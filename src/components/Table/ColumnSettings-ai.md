---
component: ColumnSettings
category: Table
related: [MasterTable, TableBasicSettings, ColumnSettingsSortableList]
tokens: []
stories: stories/TableBasic/TableBasic.stories.tsx
version: "1.0"
---

# ColumnSettings

## Назначение

Контейнер содержимого настроек колонок. Рендерит `<div>` и передаёт текущие
колонки из `MasterTableContext` в children-функцию; также принимает обычные
дочерние элементы. Предоставляет статические списки `.SortableList` и `.StaticList`.

Используй когда: собираешь настройки видимости и порядка колонок для `MasterTable`
либо оборачиваешь собственное содержимое настроек.
Не используй когда: нужна сама таблица или автоматическое управление видимостью.
Данные, `hidden` и порядок колонок хранит и изменяет потребитель.

Публичные импорты из `@sberbusiness/triplex-next`:

```tsx
import { ColumnSettings, MasterTable, TableBasicSettings } from "@sberbusiness/triplex-next";

// Все три пути указывают на один компонент.
const DirectSettings = ColumnSettings;
const NestedSettings = TableBasicSettings.ColumnSettings;
const MasterSettings = MasterTable.TableBasicSettings.ColumnSettings;
```

Интерфейс `IColumnSettingsProps` также экспортируется из корня пакета.

---

## Варианты и props

Собственных обязательных props нет. Наследует HTML-атрибуты `<div>`, переопределяя
только `children`.

| Prop | По умолчанию | Описание |
|---|---|---|
| `children` | — | Обычный `ReactNode` либо функция `({ columns }) => ReactNode`; функция получает весь массив из контекста, включая скрытые колонки |
| `className`, HTML-/`data-*`-/`aria-*`-атрибуты | — | Передаются на корневой `<div>`; собственных CSS-классов у контейнера нет |
| `ref` | — | Указывает на корневой `HTMLDivElement` |

### Откуда берутся колонки

`MasterTable` создаёт контекст с пустым массивом. Вложенный `TableBasic` публикует
в него свой prop `columns` через эффект. Поэтому children-функция сначала может
получить `[]`, а после синхронизации — актуальный массив. Обновление колонок
таблицы обновляет и содержимое настроек.

Вне `MasterTable` используется контекст по умолчанию: children-функция получает
`[]`. Обычные дочерние элементы отображаются и без provider. Компонент не
вызывает `setColumns`, не меняет `hidden` и не обрабатывает `loading`.

Массив приходит по ссылке из контекста: не мутируй его и объекты колонок.
Для изменения видимости или порядка обновляй состояние потребителя и возвращай
новый массив в `TableBasic.columns`.

### Статические компоненты

| Доступ | Назначение |
|---|---|
| `ColumnSettings.SortableList` | Управляемый список колонок с drag-and-drop; принимает собственные `columns` и `onColumnsChange` |
| `ColumnSettings.SortableList.Item` | Строка сортируемого списка; `id` должен совпадать с `fieldKey` колонки |
| `ColumnSettings.StaticList` | Несортируемый список; `depth` по умолчанию `0`, задаёт левый отступ `12 + 12 * depth` px; `style` может его переопределить |
| `ColumnSettings.StaticList.Item` | Строка статического списка с оформлением настроек колонок |

Children-функция не обязательна: в существующих примерах список получает колонки
из локального состояния напрямую. Контейнер сам не создаёт списки и чекбоксы.

---

## Дизайн-токены

У самого `<div>` нет LESS-модуля и собственных дизайн-токенов: `tokens: []`.
Токены `TableBasic.TableBasicSettings_ListItem_*` принадлежат строкам списков,
а не этому контейнеру. Фон, фокус и загрузку вложенных частей определяют их
собственные компоненты.

Переопределение токенов через `ThemeProvider` описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- Сохранять `forwardRef<HTMLDivElement>` и корневой `<div>`.
- Сохранять named export `ColumnSettings`, интерфейс `IColumnSettingsProps`,
  статики `.SortableList` / `.StaticList` и доступ через `TableBasicSettings`.
  `displayName` — `ColumnSettings`.
- Обычные children отображаются как есть; функция получает объект `{ columns }`,
  а не массив отдельным аргументом и не расширенный контекст.
- Источник колонок для render-prop — `MasterTableContext`. Не подменять его
  внутренним состоянием и не фильтровать `hidden` до вызова children.
- Контейнер не изменяет колонки и не синхронизирует их с таблицей сам.
- Сохранять проброс `className`, HTML-атрибутов и обработчиков на корень.

---

## Accessibility

Контейнер — обычный `<div>` без собственной роли и клавиатурных обработчиков.
При необходимости `role`, `aria-label` и `aria-labelledby` задаёт потребитель.
Доступность чекбоксов, drag-строк и меню принадлежит вложенным компонентам;
этот контейнер не добавляет фокус-ловушку и не объявляет изменение колонок.

---

## Связанные компоненты

- [MasterTable](./MasterTable-ai.md) — родитель семейства и provider контекста
  колонок; предоставляет путь `MasterTable.TableBasicSettings.ColumnSettings`.
- `TableBasicSettings` — родитель выпадающего меню; предоставляет `.ColumnSettings`,
  `.Header`, `.Body` и `.Footer`. Описан в AI.md `MasterTable`.
- [ColumnSettingsSortableList](./ColumnSettingsSortableList-ai.md) — часть
  `.SortableList`, адаптирует объекты колонок к `ListSortable`.
- `ColumnSettingsStaticList` и `ColumnSettingsStaticListItem` — обёртки списка и
  строки, доступные через `.StaticList` / `.StaticList.Item`; описаны выше.
- [TableBasic](./TableBasic-ai.md) — публикует колонки в контекст того же
  `MasterTable`; от его эффекта зависит актуальность render-prop.

---

## Stories

Основные истории: `stories/TableBasic/TableBasic.stories.tsx`
Файлы примеров: `stories/TableBasic/examples/`

Используются примеры родителя; отдельный stories-файл атому не нужен.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `TableSettingsColumn` | `TableSettingsColumn.tsx` | Содержимое настроек с сортируемым списком и управлением видимостью колонок |
| `TableSettingsColumnExtended` | `TableSettingsColumnExtended.tsx` | Сортируемые колонки и вложенные статические настройки |
| `VisualTests` | `VisualTests.tsx` | Play раскрывает настройки: children-функция получает колонки таблицы, видны показанная, скрытая и заблокированная строки |

Дополнительно `stories/MasterTable/examples/Example.tsx` (story `Example` в
`stories/MasterTable/MasterTable.stories.tsx`) использует children-функцию и
несортируемую группу чекбоксов. Этот пример относится к другому stories-файлу,
поэтому не включён в таблицу путей для MCP.

Контракт контейнера и обновление через реальные `MasterTable` / `TableBasic`
проверяются в `src/components/Table/__tests__/ColumnSettings.test.tsx`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-03 | Создан документ; зафиксированы публичные пути, контекст колонок, children-функция и DOM-ref. |
