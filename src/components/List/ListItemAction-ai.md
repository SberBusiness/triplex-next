---
component: ListItemAction
category: List
related: [ListItem, ListItemContent]
tokens:
  - --triplex-next-ListItem-Background_Hover
  - --triplex-next-ListItem-BorderColor_Focus
stories: stories/List/ListItem.stories.tsx
version: "1.0"
---

# ListItemAction

## Назначение

Интерактивная обёртка `<div>` для элемента списка. Добавляет hover-подсветку,
focus-обводку по Tab и активацию по клику / Enter / Space. Через
`ListItemContext` выставляет флаг `action`, по которому `ListItemContent`
включает свою hover-подсветку.

Используй `ListItemAction` когда: строка целиком кликабельна (навигация, открытие
деталей, выбор из списка без чекбокса). Не используй внутри `ListItemTable` —
там `onClickItem` вешается напрямую на `ListItemContent` без hover/focus/keyboard.

Типичная композиция:

```tsx
<ListItem>
    <ListItemAction onClick={handleClick}>
        <ListItemContent>Текст строки</ListItemContent>
    </ListItemAction>
</ListItem>
```

---

## Варианты и props

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Содержимое строки (обычно `ListItemContent`) |
| `onClick` | `(event: React.MouseEvent<HTMLDivElement>) => void` | — | Обработчик клика по всей области обёртки |
| `onKeyDown` | `(event: React.KeyboardEvent<HTMLDivElement>) => void` | — | Вызывается после внутренней обработки Enter/Space |
| `className` | `string` | — | Дополнительный CSS-класс, мержится с `styles.listItemAction` |
| `tabIndex` | `number` | `0` | Фокусируемость по Tab. Можно переопределить (например, `-1`) |
| `role` | `string` | `"button"` | ARIA-роль. Можно переопределить (например, `"link"`) |
| `...HTMLDivAttributes` | — | — | Все остальные стандартные атрибуты `<div>` |

---

## Дизайн-токены

```text
--triplex-next-ListItem-Background_Hover    // фон при hover (desktop), применяет ListItemContent
--triplex-next-ListItem-BorderColor_Focus   // цвет focus-обводки (:focus-visible) на самой обёртке
```

Собственного фона у обёртки нет — в её стилях остаётся только focus-обводка
(`border-color` на `:focus-visible`). Hover-подсветку рисует `ListItemContent`:
через `ListItemContext` он узнаёт, что находится внутри `ListItemAction`
(флаг `action`), и включает правило `&.action:hover`. Это тот же контекстный
механизм, что у пары `ListItemSelectable` ↔ `ListItemContent`
(флаги `selectable`/`selected`), без CSS-хака `> *`.

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLDivElement`. Не убирать.
- **Корневой элемент `<div>`** — не менять на `<button>` / `<a>`. Компонент
  намеренно div-based, как `CardAction`, чтобы внутри мог быть произвольный layout.
- **`role="button"` и `tabIndex={0}`** — задаются по умолчанию, но переопределяются
  через props (`{...rest}` идёт после дефолтов). Не убирать дефолты без обновления
  тестов и a11y-контракта.
- **`ListItemContext`** — компонент выставляет флаг `action` (`setAction(true)` в
  `useEffect` с очисткой `setAction(false)` при размонтировании), как
  `ListItemSelectable` выставляет `selectable`. Hover-подсветку по этому флагу
  рисует `ListItemContent` — не возвращать CSS-хак `> *`.
- **Focus-обводка живёт на самой обёртке** — `:focus-visible` срабатывает только
  на сфокусированном элементе, а `tabIndex={0}` стоит именно на `ListItemAction`.
  Не переносить правило `:focus-visible` на `ListItemContent` — там оно не
  сработает, и браузер нарисует дефолтную (синюю) обводку вместо жёлтой.
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
  `ListItemAction` — получится nested interactive elements. Для выбора с чекбоксом
  используй `ListItemSelectable` без `ListItemAction`; для клика по всей строке в
  табличном списке — `ListItemTable` + `onClickItem`.
- Для навигации по ссылке предпочтительнее нативный `<a>` / роутер-линк, а не
  `ListItemAction` с `role="link"` — компонент не даёт семантики ссылки из коробки.

---

## Связанные компоненты

- `ListItem` — родительский `<li>`. `ListItemAction` рендерится внутри него.
- `ListItemContent` — типичный дочерний слой с фоном и padding. Читает `selected`
  и `action` из контекста (в режиме `action` сам подсвечивает фон при hover), но
  не отвечает за интерактивность.
- `ListItemSelectable` — альтернатива для multi-select с чекбоксом. Не комбинировать
  с `ListItemAction` в одной строке без явной a11y-стратегии.
- `ListItemTable` — использует `onClickItem` на `ListItemContent`, не `ListItemAction`.
- `CardAction` — аналогичный паттерн интерактивной обёртки в семействе Card.

---

## Stories

Основные истории: `stories/List/ListItem.stories.tsx`
Файл примера: `stories/List/examples/ListItem/Action.tsx`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Action` | `Action.tsx` | Использование `ListItemAction` внутри `ListItem` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-15 | Создан документ. Добавлен компонент `ListItemAction` — независимая интерактивная обёртка строки (hover, focus по Tab, `onClick` + Enter/Space). |
| 2026-07-16 | Hover переведён на контекстный механизм: `ListItemAction` выставляет флаг `action` в `ListItemContext`, `ListItemContent` по нему сам рисует hover-фон. Убран CSS-хак `> * { background }` и `box-sizing` с обёртки; focus-обводка осталась на `ListItemAction`. |
