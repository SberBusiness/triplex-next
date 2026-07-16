---
component: ListActionItem
category: List
related: [ListItem, ListItemContent, ListSortableItem]
tokens:
  - --triplex-next-ListItem-Background_Hover
  - --triplex-next-ListItem-BorderColor_Focus
stories: stories/List/ListItem.stories.tsx
version: "1.0"
---

# ListActionItem

## Назначение

Самодостаточный интерактивный элемент списка. Сам рендерит `ListItem` и
`ListItemContent` (по аналогии с тем, как `ListSortableItem` рендерит внутри себя
`ListItem`), поэтому потребителю не нужно вручную составлять композицию. Добавляет
hover-подсветку, focus-обводку по Tab и активацию по клику / Enter / Space.

Ключевая идея: интерактивные атрибуты (`role`, `tabIndex`, обработчики) и класс
`styles.listActionItem` навешиваются на сам `ListItemContent`, поэтому фоном
управляет один элемент — базовый фон приходит из `.listItemContent`, а hover-фон
из `.listActionItem:hover` на том же узле. Нет перекрытия фона между обёрткой и
контентом.

Используй `ListActionItem` когда: строка целиком кликабельна (навигация, открытие
деталей, выбор из списка без чекбокса). Не используй внутри `ListTableItem` —
там `onClickItem` вешается напрямую на `ListItemContent` без hover/focus/keyboard.

Распределение пропсов:

- **собственные пропсы `ListActionItem`** (`extends React.LiHTMLAttributes<HTMLLIElement>`)
  уходят на корневой `<li>` (`ListItem`) — `className`, `style`, `id`, `data-*` строки;
- **`listActionItemProps`** — на интерактивный `ListItemContent`: `onClick`,
  `onKeyDown`, переопределение `role` / `tabIndex`, `className` контента и т.д.

Типичная композиция:

```tsx
<List>
    <ListActionItem listActionItemProps={{ onClick: handleClick }}>Текст строки</ListActionItem>
</List>
```

---

## Варианты и props

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Содержимое строки (рендерится внутри `ListItemContent`) |
| `listActionItemProps` | `React.HTMLAttributes<HTMLDivElement>` | — | Пропсы интерактивного слоя (`ListItemContent`): `onClick`, `onKeyDown`, `role`, `tabIndex`, `className` контента и т.д. |
| `className` | `string` | — | CSS-класс корневого `<li>` (`ListItem`) |
| `...HTMLLIAttributes` | — | — | Остальные атрибуты `<li>` спредятся на внутренний `ListItem` |

### Пропсы внутри `listActionItemProps`

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `onClick` | `(event: React.MouseEvent<HTMLDivElement>) => void` | — | Обработчик клика по всей строке |
| `onKeyDown` | `(event: React.KeyboardEvent<HTMLDivElement>) => void` | — | Вызывается до внутренней обработки Enter/Space |
| `className` | `string` | — | Дополнительный CSS-класс, мержится с `styles.listActionItem` на `ListItemContent` |
| `tabIndex` | `number` | `0` | Фокусируемость по Tab. Можно переопределить (например, `-1`) |
| `role` | `string` | `"button"` | ARIA-роль. Можно переопределить (например, `"link"`) |

---

## Дизайн-токены

```text
--triplex-next-ListItem-Background_Hover    // фон при hover (desktop)
--triplex-next-ListItem-BorderColor_Focus   // цвет focus-обводки (:focus-visible)
```

Класс `styles.listActionItem` навешивается на сам `ListItemContent`, поэтому весь
фон живёт на одном элементе: базовый фон и `selected`/`selectable` — из
`.listItemContent`, а hover-фон (`&:hover`) и focus-обводка (`&:focus-visible`) —
из `.listActionItem` на том же узле.

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLDivElement` (внутренний
  `ListItemContent`). Не убирать.
- **Самодостаточная композиция** — компонент сам рендерит `ListItem` →
  `ListItemContent` (как `ListSortableItem` рендерит `ListItem`). Использовать
  прямо внутри `List`, не оборачивать вручную в `ListItem`/`ListItemContent`.
- **Интерактивность на `ListItemContent`** — `role`, `tabIndex`, обработчики и
  класс `styles.listActionItem` навешиваются на сам `ListItemContent`, а не на
  отдельную обёртку. Это то, что позволяет одному элементу управлять фоном. Не
  вводить промежуточный `<div>` между `ListItemContent` и hover-фоном — вернётся
  перекрытие слоёв.
- **Разделение пропсов** — собственные пропсы компонента (`extends
  LiHTMLAttributes`) идут на корневой `ListItem` (`<li>`), интерактивные — только
  через `listActionItemProps` на `ListItemContent`. Не спредить `...rest` на
  `ListItemContent`: тогда пропсы `<li>` и контента снова смешаются.
- **`role="button"` и `tabIndex={0}`** — задаются по умолчанию, но переопределяются
  через `listActionItemProps` (`{...restActionProps}` идёт после дефолтов). Не
  убирать дефолты без обновления тестов и a11y-контракта.
- **Клавиатура** — Enter и Space обрабатываются через `isKey` из
  `@sberbusiness/triplex-next/utils/keyboard`; Space вызывает `preventDefault()`,
  затем `event.currentTarget.click()`. Не заменять на прямое сравнение `event.key`.
- **`data-tx`** — атрибут версии пакета, не убирать.

---

## Accessibility

- Элемент объявлен как `role="button"` и попадает в tab-order (`tabIndex={0}`).
- Активация: клик мышью, Enter, Space (через программный `click()`).
- Focus-индикатор — `border-color` на `:focus-visible`, `outline: none`.
- **`onKeyDown` вызывается до** внутренней обработки Enter/Space.
- **Не вкладывай другие интерактивные элементы** (кнопки, ссылки, чекбоксы) внутрь
  `ListActionItem` — получится nested interactive elements. Для выбора с чекбоксом
  используй `ListItemSelectable` без `ListActionItem`; для клика по всей строке в
  табличном списке — `ListTableItem` + `onClickItem`.
- Для навигации по ссылке предпочтительнее нативный `<a>` / роутер-линк, а не
  `ListActionItem` с `role="link"` — компонент не даёт семантики ссылки из коробки.

---

## Связанные компоненты

- `ListItem` — `<li>`, который `ListActionItem` рендерит сам внутри себя.
- `ListItemContent` — слой с фоном и padding, который `ListActionItem` рендерит
  сам и на который навешивает интерактивность. Именно он держит весь фон.
- `ListSortableItem` — образец паттерна: тоже самодостаточный компонент, рендерит
  `ListItem` внутри себя.
- `ListItemSelectable` — альтернатива для multi-select с чекбоксом. Не комбинировать
  с `ListActionItem` в одной строке без явной a11y-стратегии.
- `ListTableItem` — использует `onClickItem` на `ListItemContent`, не `ListActionItem`.
- `CardAction` — аналогичный паттерн интерактивной обёртки в семействе Card.

---

## Stories

Основные истории: `stories/List/ListItem.stories.tsx`
Файл примера: `stories/List/examples/ListItem/Action.tsx`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Action` | `Action.tsx` | `ListActionItem` напрямую внутри `List` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-16 | Создан компонент `ListActionItem` — самодостаточная интерактивная строка (hover, focus по Tab, `onClick` + Enter/Space). Сам рендерит `ListItem` + `ListItemContent`; интерактивность и весь фон живут на одном `ListItemContent`. Пропсы разделены: собственные — на `<li>`, интерактивные — через `listActionItemProps`. |
