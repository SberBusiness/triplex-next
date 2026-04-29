---
component: ListItemTable
category: List
related: [ListItem, ListItemSelectable, ListItemControls, ListItemControlsButton, SwipeableArea]
tokens:
  - --triplex-next-ListItem-Background
  - --triplex-next-ListItem-Background_Selected
stories: stories/List/ListItemTable.stories.tsx
version: "1.0"
---

# ListItemTable

## Назначение

Высокоуровневая обёртка `<li>` для табличных строк. Объединяет `ListItem` +
`SwipeableArea` + опциональный `ListItemSelectable`. Автоматически рисует
правый «хвост» (`ListItemTailRight`) и контейнер для swipe-actions
(`ListItemControls`).

Используй `ListItemTable` когда: нужна готовая строка с поддержкой swipe и
выбора. Не нужен — собирай руками из `ListItem` + `ListItemContent` +
`SwipeableArea` + `ListItemSelectable`.

---

## Варианты и props

`ListItemTable` имеет **discriminated union** API: либо без выбора (`onSelect`/`selected` запрещены типом), либо selectable (оба обязательны).

### Общие опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `controlButtons` | `React.ReactNode` | — | Кнопки действий, оборачиваются в `<ListItemControls>` и подключаются как `rightSwipeableArea` у `SwipeableArea` |
| `onClickItem` | `(event: React.MouseEvent<HTMLDivElement>) => void` | — | Передаётся как `onClick` на контейнер контента (`ListItemContent`). Не вызывается при клике на чекбокс или swipe-actions |
| `swipeableAreaRef` | `React.Ref<ISwipeableAreaRef>` | — | Ref на внутренний `SwipeableArea` (для программного открытия/закрытия swipe-области, например в `WithSwipeEmulation`-сторе) |
| `children` | `React.ReactNode` | — | Содержимое строки (рендерится внутри `ListItemContent`) |

### Selectable-вариант (оба prop'а обязательны вместе)

| Prop | Тип | Описание |
|---|---|---|
| `selected` | `boolean` | Состояние «выбран» — управляется снаружи |
| `onSelect` | `(selected: boolean) => void` | Вызывается при изменении состояния чекбокса |

В non-selectable варианте оба prop'а имеют тип `never` — TypeScript запрещает их передачу.

---

## Дизайн-токены

```
--triplex-next-ListItem-Background          // фон строки
--triplex-next-ListItem-Background_Selected // фон выбранной строки (через ListItemSelectable + ListItemContent)
```

Применяются в подкомпонентах `ListItemContent`/`ListItemSelectable`. Сам
`ListItemTable.module.less` задаёт только `margin-bottom: 4px` и
`border-radius: 8px` для `swipeableArea`.

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLLIElement`. Не убирать.
- **Discriminated union** `IListItemTableProps | IListItemTableSelectableProps` — selectable определяется наличием **обоих** prop'ов `onSelect` и `selected`. Не делай частичную проверку.
- **Корневой элемент `<li>`** — не менять.
- **`SwipeableArea`** всегда оборачивает контент, даже без `controlButtons` — нужно для свайп-жестов на мобильных.

---

## Связанные компоненты

- `ListItem` — базовый `<li>`, используется внутри.
- `ListItemContent` — контейнер контента, получает `onClick = onClickItem`.
- `ListItemSelectable` — добавляется автоматически, если переданы `selected` + `onSelect`.
- `ListItemControls` — обёртка для `controlButtons`, подключается как `rightSwipeableArea`.
- `ListItemTailRight` — декоративный «хвост» в правой части (всегда отрисовывается).
- `SwipeableArea` — внешняя зависимость, обеспечивает swipe-жесты.

---

## Stories

Основные истории: `stories/List/ListItemTable.stories.tsx`
Файлы примеров: `stories/List/examples/ListItemTable/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль |
| `Default` | `Default.tsx` | Базовая табличная строка с `controlButtons` |
| `Selectable` | `Selectable.tsx` | Selectable-вариант с чекбоксом |
| `WithSwipeEmulation` | `WithSwipeEmulation.tsx` | Программное управление swipe через `swipeableAreaRef` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
