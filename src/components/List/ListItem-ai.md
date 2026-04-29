---
component: ListItem
category: List
related: [List, ListItemContent, ListItemSelectable, ListItemTable, ListSortableItem]
tokens:
  - --triplex-next-ListItem-Background
  - --triplex-next-ListItem-Background_Selected
stories: stories/List/ListItem.stories.tsx
version: "1.0"
---

# ListItem

## Назначение

Базовый элемент списка `<li>` — обёртка вокруг произвольного содержимого
(`ListItemContent`, `ListItemSelectable`, `SwipeableArea` и т.п.). Создаёт
React-контекст `ListItemContext` с состоянием `selected`, чтобы дочерний
`ListItemContent` мог визуально подсвечиваться, когда родитель — `ListItemSelectable`.

Используй `ListItem` когда: нужен произвольный layout строки списка.
Используй `ListItemTable` когда: нужна готовая табличная строка с support'ом
swipe-actions и selectable.

---

## Варианты и props

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Содержимое строки |
| `...HTMLLIElementAttributes` | — | — | Все стандартные атрибуты `<li>` |

---

## Дизайн-токены

Сами стили `ListItem.tsx` пустые — токены применяются в подкомпонентах
(`ListItemContent`, `ListItemSelectable`):

```
--triplex-next-ListItem-Background          // фон по умолчанию
--triplex-next-ListItem-Background_Selected // фон, когда selected=true
```

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLLIElement`. Не убирать.
- **`ListItemContext`** — провайдер на каждом `ListItem`. Не выносить наружу — context используется парой `ListItemSelectable` (writer) ↔ `ListItemContent` (reader) внутри одной строки.
- **Корневой элемент `<li>`** — не менять. Семантика важна для accessibility.

---

## Связанные компоненты

- `ListItemContent` — внутренняя обёртка для контента, читает `selected` из контекста.
- `ListItemSelectable` — добавляет чекбокс выбора, синхронизирует `selected` в контекст через `useEffect`.
- `ListItemLoading` — элемент-спиннер для пагинации (используется как последний элемент).
- `ListItemControls`, `ListItemControlsButton`, `ListItemControlsButtonDropdown` — кнопки действий, обычно внутри `SwipeableArea.rightSwipeableArea`.
- `ListItemTailLeft` / `ListItemTailRight` — декоративные хвосты для `SwipeableArea`.
- `ListItemTable` — комбинированная высокоуровневая обёртка.

---

## Stories

Основные истории: `stories/List/ListItem.stories.tsx`
Файлы примеров: `stories/List/examples/ListItem/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `Default.tsx` | Базовый элемент с произвольным контентом |
| `Loading` | `Loading.tsx` | `ListItemLoading` как последний элемент при пагинации |
| `Selectable` | `Selectable.tsx` | Использование `ListItemSelectable` внутри `ListItem` |
| `Swipeable` | `Swipeable.tsx` | `ListItem` внутри `SwipeableArea` с `ListItemControls` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
