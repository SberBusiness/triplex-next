---
component: ColumnSettingsSortableListItem
category: Table
related: [ColumnSettingsSortableList, ListSortableItem, ExpandAnimation]
tokens:
  - TableBasic.TableBasicSettings_ListItem_Background_Default
  - TableBasic.TableBasicSettings_ListItem_Background_Hover
  - TableBasic.TableBasicSettings_ListItem_Background_Dragging
stories: stories/TableBasic/TableBasic.stories.tsx
version: "1.0"
---

# ColumnSettingsSortableListItem

## Назначение

Строка сортируемых настроек колонок: добавляет к `ListSortableItem` оформление
таблицы, controls-область с `data-draggable="false"` и необязательное
дополнительное содержимое, сворачиваемое на время перетаскивания.

Используй когда: рендеришь колонки в `ColumnSettings.SortableList`, в том числе
колонку с вложенными настройками.
Не используй когда: нужен статичный список — выбирай `ColumnSettings.StaticList.Item`;
для произвольной сортируемой карточки подходит `ListSortableItem`.

Публичные пути из `@sberbusiness/triplex-next`:

```tsx
import { ColumnSettings, ColumnSettingsSortableListItem } from "@sberbusiness/triplex-next";

const SettingsItem = ColumnSettings.SortableList.Item;
// SettingsItem и ColumnSettingsSortableListItem — один компонент.
```

Именованный компонент и `IColumnSettingsSortableListItemProps` экспортируются
через `Table/index.ts`. Доступ через
`MasterTable.TableBasicSettings.ColumnSettings.SortableList.Item` и
`TableBasicSettings.ColumnSettings.SortableList.Item` также сохраняется.

---

## Варианты и props

Наследует props `ListSortableItem`, но `children` принимает обычный `ReactNode`,
а не render-функцию. Состояние DnD связывается с target внутри компонента.

### Обязательный prop

| Prop | Описание |
|---|---|
| `id` | Уникальный идентификатор строки; в настройках колонок должен совпадать с `column.fieldKey` и идентификатором элемента родительского списка |

### Опциональные props

| Prop | По умолчанию | Описание |
|---|---|---|
| `children` | — | Содержимое основной строки, обычно чекбокс с названием колонки. Оборачивается в `ListSortableItemControls` с `data-draggable="false"` |
| `disabled` | `false` | Отключает drag этой строки и скрывает индикатор перетаскивания; не отключает автоматически вложенные чекбоксы и кнопки |
| `staticContent` | — | Дополнительный блок под основной строкой. При перетаскивании сворачивается через `ExpandAnimation`, после — раскрывается |
| `className`, HTML-/`data-*`-/`aria-*`-атрибуты | — | Передаются в корневой `<li>` через `ListSortableItem` |
| `style` | — | Стили `<li>`; по контракту `ListSortableItem` дополняют и могут переопределять вычисленные transform/transition |
| `ref` | — | Указывает на корневой `HTMLLIElement`; это отдельная ссылка от внутреннего activator-ref |

### Перетаскивание и дополнительный блок

`ListSortableItem` предоставляет `listeners`, `dragging`, `disabled` и
`setActivatorNodeRef`. Этот компонент передаёт их внутреннему
`ColumnSettingsSortableListItemTarget`: listeners и activator-ref относятся к
основному `<div>`, внешний ref — к `<li>`.

Основные children лежат в controls-области с `data-draggable="false"`.
Сенсоры исключают начало drag из неё, когда цель события — `HTMLElement`.
Для SVG-целей (`svg`, `path`) базовый `isDraggableTarget` сразу возвращает `true`
без обхода предков, поэтому SVG внутри controls может начать перетаскивание.
Это существующее ограничение сенсоров `ListSortable`.

`staticContent` рендерится отдельным соседним блоком ниже target и уже
находится вне его области активации. События его интерактивных элементов не
всплывают в target и не начинают перетаскивание этой строки.

Для непустого `staticContent` всегда смонтирован `ExpandAnimation` с
`expanded={!dragging}`. Контент сворачивается без размонтирования; вложенное
состояние сохраняется. После завершения сворачивания содержимое скрывает
`ExpandAnimation`, включая обычный Tab-переход. `null`, `undefined`, `false` и
пустая строка обёртку не создают. Число `0` не передавай: оно выводится текстом
без обёртки.

---

## Дизайн-токены

Собственное оформление задаёт внутренний target в
`TableBasicSettings/styles/ColumnSettingsSortableListItemTarget.module.less`:

```text
TableBasic.TableBasicSettings_ListItem_Background_Default
TableBasic.TableBasicSettings_ListItem_Background_Hover
TableBasic.TableBasicSettings_ListItem_Background_Dragging
```

Эти фоны переопределяют стандартные фоны `ListSortableItem.Target`.
Тень активного drag наследуется от `ListItem.Shadow_Dragging`; цвет индикатора
задаёт icons-next через `paletteIndex={5}`. Размеры и отступы заданы LESS-модулем,
а не отдельными токенами.

Значения собственных токенов — `src/components/DesignTokens/components/TableBasic.ts`.
Переопределение через `ThemeProvider` описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- Сохранять `forwardRef<HTMLLIElement>`, корневой `<li>` и публичные named /
  compound-пути компонента; `displayName` — `ColumnSettingsSortableListItem`.
- `id` соответствует идентификатору элемента `ListSortable`; в настройках
  колонок это `fieldKey`. Не генерировать новые id на рендере.
- Сохранять передачу listeners, dragging, disabled и activator-ref в target,
  не смешивая activator-ref с внешним ref на строку.
- Основные children — обычное содержимое и автоматически помещаются в
  `data-draggable="false"` controls-область.
- `disabled` относится к drag; состояние вложенных контролов задаёт потребитель.
- Сохранять анимацию `expanded={!dragging}` без размонтирования
  дополнительного блока.
- Сохранять три токена фона, CSS-классы и проброс HTML-атрибутов на `<li>`.

---

## Accessibility

- Строка — нативный `<li>` внутри сортируемого `<ul>`. Доступные имена чекбоксов
  и кнопок задаёт потребитель их содержимым или ARIA-атрибутами.
- Основной target — `<div>` с drag-индикатором; клавиатурная перестановка этим
  компонентом не добавляется. У родительского `ListSortable` включены мышь и touch,
  `KeyboardSensor` отсутствует.
- Передавай `disabled` вложенному чекбоксу отдельно, если он тоже должен быть
  недоступен: disabled drag не означает disabled управления видимостью колонки.
- Вложенный блок остаётся в DOM во время drag. После завершения сворачивания
  `ExpandAnimation` скрывает его через height/overflow/visibility.
- Строка не управляет фокусом и не объявляет изменение порядка сама — это
  механика родительского DnD и ответственность доступной композиции.

---

## Связанные компоненты

- [ColumnSettingsSortableList](./ColumnSettingsSortableList-ai.md) — публичный
  родитель `.Item`, преобразует `fieldKey` колонок в DnD-id и сообщает новый
  порядок через `onColumnsChange`.
- [ListSortableItem](../List/ListSortableItem-ai.md) — рендерится внутри,
  предоставляет props строки и состояние `useSortable`.
- [ExpandAnimation](../ExpandAnimation/ExpandAnimation-ai.md) — рендерится при
  непустом `staticContent`, сворачивает дополнительное содержимое на время drag.
- `ColumnSettingsSortableListItemTarget` — внутренний target: оформление,
  индикатор и controls-область; отдельного публичного barrel-export нет.

---

## Stories

Основные истории: `stories/TableBasic/TableBasic.stories.tsx`
Файлы примеров: `stories/TableBasic/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `TableSettingsColumn` | `TableSettingsColumn.tsx` | Публичный compound-путь `.SortableList.Item`, `id={column.fieldKey}` и чекбоксы |
| `TableSettingsColumnExtended` | `TableSettingsColumnExtended.tsx` | Строка со `staticContent`, содержащим вложенные настройки |

Дополнительное визуальное покрытие находится отдельно:
`stories/ColumnSettingsSortableListItem/ColumnSettingsSortableListItem.stories.tsx`
и `stories/ColumnSettingsSortableListItem/examples/VisualTests.tsx`. Эта скрытая
story использует настоящую композицию списка; документационные примеры для MCP
берутся из таблицы выше.

Протокол render-props, refs, listeners, disabled/dragging и сворачивание без
размонтирования проверяет
`src/components/Table/__tests__/ColumnSettingsSortableListItem.test.tsx`;
есть также smoke-тест с реальным `ListSortable`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-03 | Создан документ. |
