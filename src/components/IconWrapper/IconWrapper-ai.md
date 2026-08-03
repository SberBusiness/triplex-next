---
component: IconWrapper
category: Icons
related: [ButtonIcon, Button, Link, Chip, ListItemControlsButton]
tokens: []
stories: stories/Icons/IconWrapper/IconWrapper.stories.tsx
version: "1.0"
---

# IconWrapper

## Назначение

Обёртка-`<span>` для иконок из `@sberbusiness/icons-next`. Сама ничего не рисует: выставляет
на корневом элементе глобальные классы `hoverable` / `active` / `disabled`, по которым стили
пакета иконок подбирают цвет вложенной иконки в обычном, наведённом, активном и отключённом
состоянии.

Используй когда: иконка должна менять цвет вместе с состоянием интерактивного элемента
(кнопка, ссылка, чип, строка списка) — оборачивай ею иконку и прокидывай `active` / `disabled`
из состояния родителя.

Не используй когда:
- Нужен интерактивный элемент — IconWrapper не кнопка: это `<span>` без роли, фокуса и
  клавиатурной обработки, и сам он ничего из этого не реализует, даже если прокинуть
  обработчики через spread. Возьми `ButtonIcon` (он сам оборачивает `<button>` в IconWrapper).
- Иконка статична и её цвет задаётся напрямую через `paletteIndex` иконки или CSS родителя —
  обёртка избыточна.
- Нужно менять размер иконки — IconWrapper не влияет на размер, его задаёт сама иконка
  (`...Icon16` / `...Icon20` / `...Icon24`).

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `children` | `React.ReactNode` | Иконка (или произвольный контент), которую оборачивает компонент |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `active` | `boolean` | `false` | Ставит глобальный класс `active` — цвет иконки для нажатого/выбранного состояния |
| `disabled` | `boolean` | `false` | Ставит глобальный класс `disabled` — приглушённый цвет иконки. Это только визуальное состояние, взаимодействие не блокируется |
| `disableInteraction` | `boolean` | `false` | `pointer-events: none` на обёртке. Нужен, чтобы иконка выглядела disabled и не реагировала на hover, когда клика по ней не предполагается |
| `displayContents` | `boolean` | `false` | `display: contents` — обёртка исчезает из layout, потомок наследует место `<span>` в сетке/флексе родителя |

Компонент расширяет `React.HTMLAttributes<HTMLSpanElement>`, поэтому принимает все стандартные
атрибуты `<span>` (`className`, `style`, `onClick`, `aria-*`, `data-*`) — они попадают на корневой
элемент.

### Ограничения

- `disabled` и `disableInteraction` независимы: `disabled` красит, `disableInteraction` гасит
  события мыши. Для «выглядит выключенным и не кликается» нужны оба — пример:
  `stories/MultiselectField/examples/StatusesExample.tsx`. В `src/**` `disableInteraction`
  не передаёт ни один компонент.
- `displayContents` меняет только участие обёртки в layout; классы состояний по-прежнему стоят
  на `<span>`, и сам `<span>` остаётся в DOM — на это опираются тесты потребителей, которые
  достают обёртку через `parentElement` (`Button/__tests__/ButtonIcon.test.tsx`,
  `IconWrapper/__tests__/IconWrapper.test.tsx`).
- Класс `hoverable` выставляется всегда, включая `disabled`-состояние — так работает цветовая
  логика `@sberbusiness/icons-next`.

---

## Дизайн-токены

Компонент не использует собственных CSS-переменных. Цвета иконок задают глобальные стили
`@sberbusiness/icons-next`, привязанные к классам `hoverable` / `active` / `disabled`. Собственный
CSS-модуль `styles/IconWrapper.module.less` содержит только два служебных класса:
`.disableInteraction` (`pointer-events: none`) и `.displayContents` (`display: contents`).

---

## Инварианты

- **`forwardRef`** — обязателен, не убирать. `ref` пробрасывается на корневой `<span>`.
- **Корневой элемент — `<span>`.** Смена тега сломает потребителей, которые верстают IconWrapper
  внутри инлайн-контекста и опираются на `parentElement`.
- **Глобальные классы `hoverable` / `active` / `disabled`** приходят не из CSS-модуля, а из
  `@sberbusiness/icons-next`, поэтому пишутся строковыми литералами и не должны хешироваться или
  переименовываться. На них опираются тесты других компонентов (например,
  `ListItemControlsButton.test.tsx` ищет `.hoverable`).
- **Имена `IconWrapper`, `IIconWrapperProps`** и все props (`active`, `disabled`,
  `disableInteraction`, `displayContents`) — часть публичного API, экспортируются из barrel
  `src/components/IconWrapper/index.ts`.
- **`children` обязателен** по типу — обёртка без содержимого бессмысленна.

---

## Accessibility

- Компонент неинтерактивен и не добавляет ARIA-атрибутов: `<span>` без роли остаётся прозрачным
  для assistive technologies, доступное имя даёт интерактивный родитель (`ButtonIcon`, `Link`,
  `ListItemControlsButton`).
- `disabled` — чисто визуальный класс, он не выставляет `aria-disabled` и не блокирует события.
  Реальную блокировку обеспечивает вложенный `<button disabled>` или `disableInteraction` у
  потребителя.
- Если иконка декоративная и рядом есть текст — потребитель передаёт `aria-hidden` через spread.
  Компонент не хардкодит текстовых строк (библиотека мультиязычная).

---

## Связанные компоненты

- `ButtonIcon` (`src/components/Button/ButtonIcon.tsx`) — оборачивает `<button>` в
  `IconWrapper displayContents` и прокидывает в него `active` / `disabled`. Основной способ
  сделать кликабельную иконку.
- `Link` (`src/components/Link/Link.tsx`) — оборачивает содержимое ссылки в
  `IconWrapper displayContents`, чтобы иконка внутри ссылки красилась вместе с текстом.
- `Button` (`src/components/Button/Button.tsx`) — оборачивает содержимое кнопки в
  `IconWrapper` с кастомным `className` и прокидывает `disabled` / `active`. Единственный
  в `src/**` случай передачи собственного `className` в IconWrapper.
- `Chip`, `ChipSort`, `SegmentedControlSegment`, `StepperStep`, `ListItemControlsButton`,
  `SelectExtendedFieldTarget` — используют IconWrapper для синхронизации цвета иконки
  с состоянием элемента.
- `CollapsibleTreeNodeHeader` (`src/components/CollapsibleTree/components/`) — не использует
  IconWrapper, но ставит те же глобальные классы напрямую на `<button>`; при изменении логики
  классов держи оба места синхронными.

---

## Stories

Основные истории: `stories/Icons/IconWrapper/IconWrapper.stories.tsx`
Файлы примеров: `stories/Icons/IconWrapper/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контроль `active`, `disabled`, `disableInteraction`, `displayContents` |
| `Default` | `DefaultExample.tsx` | Минимальное использование: обёртка вокруг иконки `@sberbusiness/icons-next` |
| `States` | `StatesExample.tsx` | Состояния Default / Active / Disabled рядом |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-03 | Создан документ. AI-рефакторинг: JSDoc на `children`, комментарий о происхождении глобальных классов icons-next, убраны избыточные `!!` в `clsx`, `{...props}` перенесён перед управляемыми атрибутами, расширены unit-тесты (`displayContents`, дефолты, мердж `className`, spread rest-props, `onClick`). Публичный API не изменён. |
