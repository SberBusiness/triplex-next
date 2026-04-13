---
component: HelpBox
category: HelpBox
figma-node: ""
figma-file: ""
related: [Tooltip, ButtonIcon, MobileView, FocusTrap]
tokens: []
stories: stories/HelpBox/HelpBox.stories.tsx
version: "1.0"
---

# HelpBox

## Назначение

Иконка "?" (`QuestioncircleFilledSrvIcon16`) с всплывающей подсказкой (Tooltip).
Объединяет ButtonIcon-триггер, Tooltip и FocusTrap в одном компоненте.

Используй когда: нужна контекстная подсказка рядом с элементом интерфейса.
Не используй когда: нужен полноценный попап с формой или сложным контентом — используй Dropdown или Modal.

---

## Файловая структура

```text
src/components/HelpBox/
├── HelpBox.tsx                   # Основной компонент
├── index.ts                      # Barrel export
├── styles/
│   └── HelpBox.module.less       # Минимальные стили (position, vertical-align)
└── __tests__/
    └── HelpBox.test.tsx          # Unit-тесты
```

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `tooltipSize` | `ETooltipSize` | Размер тултипа: `SM` или `LG` |
| `children` | `React.ReactNode` | Контент тела подсказки |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `isOpen` | `boolean` | `undefined` | Управляемое состояние открытия тултипа |
| `toggle` | `(open: boolean) => void` | — | Callback при открытии/закрытии |
| `onShow` | `(node: HTMLDivElement) => void` | — | Callback при появлении тултипа в DOM |
| `preferPlace` | `ETooltipPreferPlace` | — | Предпочтительное расположение: `ABOVE`, `BELOW`, `LEFT`, `RIGHT` |
| `mobileHeaderContent` | `React.ReactNode` | — | Контент заголовка в мобильной версии тултипа |
| `focusTrapProps` | `FocusTrapProps` | — | Свойства `focus-trap-react` для ловушки фокуса |
| `tooltipAriaAttributes` | `TAriaHTMLAttributes` | — | Aria-атрибуты, пробрасываемые в Tooltip-контейнер |
| `tooltipDataAttributes` | `TDataHTMLAttributes` | — | Data-атрибуты, пробрасываемые в Tooltip-контейнер |
| `iconProps` | `ISingleColorIconProps` | — | Свойства иконки вопроса (например, `paletteIndex`) |
| `tooltipXButtonProps` | `ITooltipXButtonProps` | — | Свойства кнопки закрытия Tooltip (включая `aria-label`) |
| `className` | `string` | — | CSS-класс, пробрасывается на кнопку-триггер |
| `...rest` | `React.HTMLAttributes<HTMLButtonElement>` | — | Все стандартные атрибуты `<button>`, включая `aria-label`, пробрасываются на кнопку-триггер |

### Controlled / Uncontrolled

- **Uncontrolled** (по умолчанию): `isOpen` не передан — компонент сам управляет `openState`.
- **Controlled**: передай `isOpen` + `toggle` — компонент не меняет внутреннее состояние.

---

## Ключевые особенности реализации

### Композиция внутренних компонентов

HelpBox — обёртка над несколькими внутренними компонентами:
- `ButtonIcon` (shape=CIRCLE) — кнопка-триггер с иконкой `QuestioncircleFilledSrvIcon16`
- `Tooltip` (toggleType="hover", role="dialog") — всплывающая подсказка
- `FocusTrap` (только desktop, через `MobileView`) — ловушка фокуса при открытом тултипе
- `TooltipMobileHeader` — заголовок мобильной версии (рендерится только при наличии `mobileHeaderContent`)

### FocusTrap

Ловушка фокуса активируется только на desktop (через `MobileView` fallback). При открытии:
- `initialFocus` — элемент Tooltip (по ID)
- `clickOutsideDeactivates: true` — клик за пределами закрывает
- `preventScroll: true`

Потребитель может расширить настройки через `focusTrapProps.focusTrapOptions`.

### Ref forwarding

`forwardRef` пробрасывает ref на внутренний `ButtonIcon` (кнопку-триггер). Внутренний `buttonRef` используется для позиционирования Tooltip через `targetRef`.

---

## Accessibility

- Кнопка-триггер — нативный `<button>` через `ButtonIcon`, shape `CIRCLE`.
- **`aria-label` триггера** — не захардкожен. Потребитель **обязан** передать `aria-label` через `...rest` (например, `aria-label="Подсказка"`). Библиотека мультиязычная, текст не хардкодится.
- **`aria-label` кнопки закрытия** — передаётся через `tooltipXButtonProps={{ "aria-label": "Закрыть" }}`. Потребитель **обязан** указать значение на своём языке.
- Tooltip открывается с `role="dialog"`, `tabIndex={-1}`.
- FocusTrap удерживает фокус внутри открытого тултипа на desktop.
- `tooltipAriaAttributes` позволяет добавить aria-атрибуты к контейнеру Tooltip.

---

## Дизайн-токены

Компонент не использует собственных CSS-переменных. Все визуальные стили наследуются от `ButtonIcon` и `Tooltip`.

---

## Инварианты

- **`forwardRef`** — обязателен, не убирать.
- **`IHelpBoxProps` интерфейс** — экспортируемый, часть публичного API.
- **`tooltipSize` prop** — обязательный, не делать optional.
- **Barrel export в `index.ts`** — не удалять.
- **`toggleType="hover"`** — Tooltip реагирует на наведение, не менять без согласования.

---

## Связанные компоненты

- `Tooltip` (`src/components/Tooltip/`) — всплывающая подсказка, основной визуальный элемент
- `ButtonIcon` (`src/components/Button/ButtonIcon.tsx`) — кнопка-триггер
- `MobileView` (`src/components/MobileView/`) — переключение desktop/mobile поведения
- `FocusTrap` (npm: `focus-trap-react`) — ловушка фокуса для desktop

---

## Stories

`stories/HelpBox/HelpBox.stories.tsx`

| Story | Что демонстрирует |
|---|---|
| `Playground` | Интерактивный контроль всех props |
| `Default` | Минимальное использование |
| `Sizes` | Размеры тултипа SM / LG |
| `Placement` | Расположение: above, below, left, right |
| `WithMobileHeader` | Мобильный заголовок |
| `Controlled` | Управляемое состояние (isOpen + toggle) |
| `ChangeIconProps` | Кастомизация иконки через iconProps |
| `VisualTests` | Скриншот-тест с открытым тултипом |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-08 | Создан документ. Добавлен `forwardRef`. |
