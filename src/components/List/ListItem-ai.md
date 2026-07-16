---
component: ListItem
category: List
related: [List, ListItemContent, ListActionItem, ListItemSelectable, ListItemTable, ListSortableItem]
tokens:
  - --triplex-next-ListItem-Background
  - --triplex-next-ListItem-Background_Selected
  - --triplex-next-ListItem-Background_Hover
  - --triplex-next-ListItem-BorderColor_Focus
stories: stories/List/ListItem.stories.tsx
version: "1.0"
---

# ListItem

## Назначение

Базовый элемент списка `<li>` — обёртка вокруг произвольного содержимого
(`ListItemContent`, `ListItemSelectable`, `SwipeableArea` и т.п.). Создаёт
React-контекст `ListItemContext` с состояниями `selected` и `selectable`:
`selected` управляет подсветкой `ListItemContent`, `selectable` сообщает
дочернему `ListItemContent`, что элемент выбираемый — для применения скругления
углов (`border-radius`). Оба флага пишутся `ListItemSelectable` через `useEffect`.

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
(`ListItemContent`, `ListItemSelectable`, `ListActionItem`):

```text
--triplex-next-ListItem-Background          // фон по умолчанию (ListItemContent)
--triplex-next-ListItem-Background_Selected // фон, когда selected=true (ListItemContent)
--triplex-next-ListItem-Background_Hover    // фон при hover на desktop (ListActionItem на ListItemContent)
--triplex-next-ListItem-BorderColor_Focus   // цвет focus-обводки на desktop (ListActionItem)
```

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLLIElement`. Не убирать.
- **`ListItemContext`** — провайдер на каждом `ListItem`. Не выносить наружу — context используется парой `ListItemSelectable` (writer для `selected` и `selectable`) ↔ `ListItemContent` (reader) внутри одной строки.
- **Поля контекста `selected` / `selectable`** — оба `boolean`, дефолт `false`. `selectable` всегда выставляется в `true` из `ListItemSelectable` (через `useEffect`), `selected` синхронизируется с одноимённым prop'ом `ListItemSelectable`. Сеттеры (`setSelected`, `setSelectable`) предназначены только для внутренних консьюмеров.
- **Корневой элемент `<li>`** — не менять. Семантика важна для accessibility.

---

## Связанные компоненты

- `ListItemContent` — внутренняя обёртка для контента, читает `selected` из контекста.
- `ListActionItem` — самодостаточный интерактивный элемент: сам рендерит `ListItem` + `ListItemContent` (hover, focus по Tab, клик по всей строке — `onClick`, Enter/Space). Используется напрямую внутри `List`. Другие компоненты семейства его не используют.
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
| `Action` | `Action.tsx` | Использование `ListActionItem`  |
| `Loading` | `Loading.tsx` | `ListItemLoading` как последний элемент при пагинации |
| `Selectable` | `Selectable.tsx` | Использование `ListItemSelectable` внутри `ListItem` |
| `Swipeable` | `Swipeable.tsx` | `ListItem` внутри `SwipeableArea` с `ListItemControls` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
| 2026-05-21 | `ListItemContext` расширен полями `selectable` / `setSelectable`. Исправлен цвет токена `Background_Selected` в тёмной теме (`ColorDarkNeutral.10` → `ColorDarkNeutral.60`). |
| 2026-07-16 | Добавлен самодостаточный компонент `ListActionItem` (сам рендерит `ListItem` + `ListItemContent`; hover, focus по Tab, `onClick` + Enter/Space). Координация фона через контекст не понадобилась — `ListItemContext` без изменений. Другие компоненты семейства его не используют. |
