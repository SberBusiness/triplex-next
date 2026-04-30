---
component: ListSortableItem
category: List
related: [ListSortable, ListSortableItemTarget, ListSortableItemControls, ListItem]
tokens:
  - --triplex-next-ListItem-Background
  - --triplex-next-ListItem-Background_Selected
  - --triplex-next-ListItem-Background_Dragging
  - --triplex-next-ListItem-Shadow_Dragging
stories: stories/List/List.stories.tsx
version: "1.0"
---

# ListSortableItem

## Назначение

Элемент `<li>` с обвязкой `useSortable` из `@dnd-kit/sortable` — даёт ему
transform/transition для анимации перетаскивания и активирует drag-handle.
Имеет статический подкомпонент `Target` (`ListSortableItem.Target`) для
визуальной «карточки» с drag-индикатором.

Используй `ListSortableItem` внутри `ListSortable` для элементов, которые
надо перетаскивать. Может принимать render-prop children — это даёт доступ к
`dragging`/`disabled`/`listeners`/`setActivatorNodeRef` для случаев, когда
drag-handle нужно вынести в отдельный элемент.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `id` | `string` | Уникальный идентификатор. Должен совпадать с `id` в массиве `items` родительского `ListSortable` |

### Опциональные props

| Prop | Тип | Описание |
|---|---|---|
| `disabled` | `boolean` | Запрещает drag для конкретного элемента |
| `children` | `React.ReactNode \| ((provideProps) => React.ReactNode)` | Контент или render-prop. Render-prop принимает `{ disabled, dragging, listeners, setActivatorNodeRef }` |
| `style` | `React.CSSProperties` | Дополняется автоматическими `transform`/`transition` от `useSortable` |
| `...HTMLLIElementAttributes` | — | Прокидываются на корневой `<li>` через `ListItem` |

### Статический подкомпонент

| Имя | Описание |
|---|---|
| `ListSortableItem.Target` | `ListSortableItemTarget` — стандартная карточка с drag-индикатором (`DragdotsStrokeSrvIcon24`) |

---

## Дизайн-токены

Сам `ListSortableItem` не использует токены (только z-index при `dragging`).
Токены применяются в `ListSortableItem.Target`:

```text
--triplex-next-ListItem-Background           // фон по умолчанию
--triplex-next-ListItem-Background_Selected  // фон при hover
--triplex-next-ListItem-Background_Dragging  // фон во время drag
--triplex-next-ListItem-Shadow_Dragging      // тень во время drag
```

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLLIElement`. Объявлен через `Object.assign` с `Target` в качестве static-свойства, чтобы `displayName` работал корректно.
- **`Object.assign({...forwardRef}, { Target })`** — паттерн compound-component. Не разворачивай в отдельный экспорт, иначе сломается DX (`<ListSortableItem.Target>`).
- **`transition: { duration: 300, easing: "ease-out" }`** — фиксированное значение, согласовано с дизайнером. Не менять без согласования.
- **Render-prop children** — публичный API, потребитель может полагаться на сигнатуру `IListSortableItemChildrenProvideProps`.

---

## Accessibility

- Drag-handle по умолчанию — вся карточка (`<li>`-элемент). Если нужно вынести handle — используй render-prop и `setActivatorNodeRef`.
- В нативном виде — поддержка только мыши/тача (см. ограничения `ListSortable`).

---

## Связанные компоненты

- `ListSortable` — родительский контекст DnD; без него `useSortable` не работает.
- `ListSortableItemTarget` (= `ListSortableItem.Target`) — стандартная визуальная «карточка».
- `ListSortableItemControls` — обёртка с `data-draggable="false"` для интерактивных элементов внутри строки (кнопки, чекбоксы), которые не должны инициировать drag.
- `ListItem` — внутренний `<li>`-контейнер.

---

## Stories

Основные истории: `stories/List/List.stories.tsx`
Файлы примеров: `stories/List/examples/List/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Sortable` | `Sortable.tsx` | Простой случай — `ListSortableItem` с `ListSortableItem.Target` |
| `SortableWithInteractiveElements` | `SortableWithInteractiveElements.tsx` | Render-prop children + `ListSortableItemControls` для исключения интерактивных элементов из drag-области |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
