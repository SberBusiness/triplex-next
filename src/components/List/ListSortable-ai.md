---
component: ListSortable
category: List
related: [List, ListSortableItem, ListSortableItemTarget, ListSortableItemControls]
tokens: []
stories: stories/List/List.stories.tsx
version: "1.0"
---

# ListSortable

## Назначение

`<ul>`-контейнер с поддержкой drag-and-drop сортировки на основе `@dnd-kit`.
Принимает массив `items` (каждый объект должен иметь `id: string`) и
callback `onItemsChange`, в который пробрасывает результат `arrayMove` после
успешного перетаскивания.

Используй `ListSortable` когда: нужна сортировка элементов мышью/тачем.
Иначе используй обычный `List`.

---

## Варианты и props

`ListSortable<T extends { id: string }>` — generic.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `items` | `T[]` | Текущий упорядоченный список элементов. У каждого должен быть уникальный `id: string` |
| `onItemsChange` | `(items: T[]) => void` | Вызывается с новым порядком после drag-and-drop |

### Опциональные props

| Prop | Тип | Описание |
|---|---|---|
| `loading` | `boolean` | Передаётся во внутренний `<List>` (overlay-спиннер) |
| `children` | `React.ReactNode` | Обычно `items.map(item => <ListSortableItem id={item.id}>...)` |
| `...HTMLUListElementAttributes` | — | Прокидываются во внутренний `<ul>` |

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLUListElement` (внутренний `<List>`). Не убирать.
- **Generic `T extends { id: string }`** — обязательно, иначе `arrayMove` + `findIndex` сломаются.
- **`AdvancedMouseSensor` / `AdvancedTouchSensor`** — экспортируются из barrel, переименовывать или удалять — breaking change.
- **`isDraggableTarget`** (из `src/components/List/utils.ts`) — общий хелпер для обоих сенсоров; проверяет цепочку `data-draggable="false"` вверх по DOM. Используй `ListSortableItemControls` или вручную выставляй `data-draggable="false"`, чтобы исключить элемент из drag-area (см. `SortableWithInteractiveElements`-стори).
- **`measuring.droppable.frequency: WhileDragging`** — нужен для корректной перерисовки виртуализированных списков; не менять без причины.

---

## Accessibility

- DnD на `@dnd-kit` поддерживает клавиатурную навигацию через `KeyboardSensor`, но в текущей конфигурации он **не включён** — добавляется потребителем при необходимости.
- Сенсоры реагируют только на клик левой кнопкой мыши (правая кнопка `event.button === 2` отбрасывается).
- Touch — отбрасывается мульти-тач (`event.touches.length > 1`).

---

## Связанные компоненты

- `List` — внутренний `<ul>`-контейнер; `ListSortable` оборачивает его в `DndContext` + `SortableContext`.
- `ListSortableItem` — элемент с `useSortable`-обвязкой; обычно используется как непосредственный child.
- `ListSortableItemTarget` — визуальная «карточка» элемента с drag-индикатором.
- `ListSortableItemControls` — обёртка для интерактивных элементов внутри строки (`data-draggable="false"`).

---

## Stories

Основные истории: `stories/List/List.stories.tsx`
Файлы примеров: `stories/List/examples/List/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Sortable` | `Sortable.tsx` | Базовая DnD-сортировка |
| `SortableWithInteractiveElements` | `SortableWithInteractiveElements.tsx` | Сортировка с интерактивными элементами внутри строк (`data-draggable="false"` через `ListSortableItemControls`) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
