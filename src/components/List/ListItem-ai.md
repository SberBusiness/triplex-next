---
component: ListItem
category: List
related: [List, ListItemContent, ListItemAction, ListItemSelectable, ListItemTable, ListSortableItem]
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
React-контекст `ListItemContext` с состояниями `selected`, `selectable` и
`action`: `selected` управляет подсветкой `ListItemContent`, `selectable`
сообщает дочернему `ListItemContent`, что элемент выбираемый — для применения
скругления углов (`border-radius`). `selectable`/`selected` пишутся
`ListItemSelectable` через `useEffect`. `action` пишется `ListItemAction`
(тоже через `useEffect`) и сообщает `ListItemContent`, что строка интерактивная,
поэтому он сам подсвечивает свой фон при hover.

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
(`ListItemContent`, `ListItemSelectable`, `ListItemAction`):

```text
--triplex-next-ListItem-Background          // фон по умолчанию (ListItemContent)
--triplex-next-ListItem-Background_Selected // фон, когда selected=true (ListItemContent)
--triplex-next-ListItem-Background_Hover    // фон при hover на desktop (ListItemContent в режиме action)
--triplex-next-ListItem-BorderColor_Focus   // цвет focus-обводки на desktop (ListItemAction)
```

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLLIElement`. Не убирать.
- **`ListItemContext`** — провайдер на каждом `ListItem`. Не выносить наружу — context используется writer'ами (`ListItemSelectable` для `selected`/`selectable`, `ListItemAction` для `action`) ↔ reader'ом `ListItemContent` внутри одной строки.
- **Поля контекста `selected` / `selectable` / `action`** — все `boolean`, дефолт `false`. `selectable` выставляется в `true` из `ListItemSelectable`, `action` — из `ListItemAction` (оба через `useEffect` с очисткой), `selected` синхронизируется с одноимённым prop'ом `ListItemSelectable`. Сеттеры (`setSelected`, `setSelectable`, `setAction`) предназначены только для внутренних консьюмеров.
- **Корневой элемент `<li>`** — не менять. Семантика важна для accessibility.

---

## Связанные компоненты

- `ListItemContent` — внутренняя обёртка для контента, читает `selected` и `action` из контекста.
- `ListItemAction` — независимая интерактивная обёртка строки: hover, focus по Tab и клик по всей строке (`onClick`, Enter/Space). Используй, когда строка целиком кликабельна. Другие компоненты семейства её не используют.
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
| `Action` | `Action.tsx` | Использование `ListItemAction`  |
| `Loading` | `Loading.tsx` | `ListItemLoading` как последний элемент при пагинации |
| `Selectable` | `Selectable.tsx` | Использование `ListItemSelectable` внутри `ListItem` |
| `Swipeable` | `Swipeable.tsx` | `ListItem` внутри `SwipeableArea` с `ListItemControls` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
| 2026-05-21 | `ListItemContext` расширен полями `selectable` / `setSelectable`. Исправлен цвет токена `Background_Selected` в тёмной теме (`ColorDarkNeutral.10` → `ColorDarkNeutral.60`). |
| 2026-07-15 | Добавлен независимый компонент `ListItemAction` — интерактивная опциональная обёртка строки (hover, focus по Tab, `onClick` + Enter/Space). Другие компоненты семейства (включая `ListItemTable`) его не используют. |
| 2026-07-16 | `ListItemContext` расширен полями `action` / `setAction`. `ListItemAction` сообщает через контекст, что строка интерактивная, а `ListItemContent` по флагу `action` сам рисует hover-фон (убран CSS-хак `> *`). |
