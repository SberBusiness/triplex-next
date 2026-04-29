---
component: List
category: List
related: [ListSortable, ListItem, ListEmptyState, ListItemLoading]
tokens: []
stories: stories/List/List.stories.tsx
version: "1.0"
---

# List

## Назначение

Контейнер `<ul>` для набора элементов списка. Управляет состоянием загрузки
через prop `loading` (показывает overlay-спиннер `LoaderScreen` поверх
содержимого).

Используй `List` когда: нужен стандартный список с произвольным контентом.
Используй `ListSortable` когда: нужна сортировка элементов через drag-and-drop.

---

## Варианты и props

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `loading` | `boolean` | `false` | Показывает `LoaderScreen` поверх содержимого. Используется при обновлении текущего списка новыми данными (например, после применения фильтра) |
| `children` | `React.ReactNode` | — | Элементы списка (обычно `<ListItem>` или `<ListItemTable>`) |
| `...HTMLUListElementAttributes` | — | — | Все стандартные атрибуты `<ul>` |

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLUListElement`. Не убирать.
- **Корневой элемент `<ul>`** — не менять. Семантика списка важна для accessibility.
- `loading` — overlay-стратегия (содержимое не размонтируется), не путать с `ListItemLoading` (отдельный элемент-спиннер для пагинации).

---

## Связанные компоненты

- `ListItem` — базовый элемент списка, провайдер контекста для `selected`-состояния.
- `ListSortable` — тот же `<ul>`, но с DnD-обвязкой через `@dnd-kit`.
- `ListEmptyState` — отображается вместо элементов, когда данных нет (например, после фильтра).
- `ListItemLoading` — элемент-спиннер для подгрузки следующей страницы (пагинация).
- `LoaderScreen` — используется внутри `List` для состояния `loading`.

---

## Stories

Основные истории: `stories/List/List.stories.tsx`
Файлы примеров: `stories/List/examples/List/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `loading` |
| `Default` | `Default.tsx` | Базовый список |
| `Loading` | `Loading.tsx` | Состояние загрузки (overlay) |
| `EmptyState` | `EmptyState.tsx` | Использование `ListEmptyState` |
| `Virtualized` | `Virtualized.tsx` | Виртуализированный список (большие наборы данных) |
| `Sortable` | `Sortable.tsx` | DnD-сортировка через `ListSortable` + `ListSortableItem` |
| `SortableWithInteractiveElements` | `SortableWithInteractiveElements.tsx` | DnD с интерактивными элементами внутри строк (`data-draggable="false"`) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
