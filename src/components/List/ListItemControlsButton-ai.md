---
component: ListItemControlsButton
category: List
related: [ListItemControls, ListItemControlsButtonDropdown, IconWrapper]
tokens:
  - --triplex-next-ListItemControlsButton-Background_Default
  - --triplex-next-ListItemControlsButton-Background_Hover
  - --triplex-next-ListItemControlsButton-Background_Active
  - --triplex-next-ListItemControlsButton-Color_Default
  - --triplex-next-ListItemControlsButton-Color_Hover
  - --triplex-next-ListItemControlsButton-Color_Active
stories: stories/List/ListItemControls.stories.tsx
version: "1.0"
---

# ListItemControlsButton

## Назначение

Кнопка действия для области под свайпом списка. Рендерит вертикальную
композицию `icon` + `children` (текст), оборачивает их в `IconWrapper`,
который автоматически меняет цвет иконки/текста в hover/active состоянии.

Используй `ListItemControlsButton` когда: нужно одно действие в swipe-actions.
Используй `ListItemControlsButtonDropdown` когда: нужен выбор из нескольких
действий через dropdown.

---

## Варианты и props

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `icon` | `React.ReactNode` | — | Иконка, отображается над текстом. Добавляет класс `withIcon` |
| `children` | `React.ReactNode` | — | Текст кнопки (рендерится через `<Text size={B4} weight={SEMIBOLD}>`). Добавляет класс `withText` |
| `disabled` | `boolean` | — | Стандартный атрибут `<button>`. Передаётся в `IconWrapper.disabled` |
| `aria-expanded` | `boolean` | — | Стандартный ARIA-атрибут. Если `true` — `IconWrapper` получает класс `active` (визуальное состояние «нажато») |
| `...HTMLButtonAttributes` | — | — | Все стандартные атрибуты `<button>`. `type` по умолчанию `"button"` |

---

## Дизайн-токены

Паттерн: `--triplex-next-ListItemControlsButton-{Property}_{State}`

```
--triplex-next-ListItemControlsButton-Background_Default
--triplex-next-ListItemControlsButton-Background_Hover
--triplex-next-ListItemControlsButton-Background_Active   // применяется при :active или классе .expanded (если выставлен снаружи)
--triplex-next-ListItemControlsButton-Color_Default
--triplex-next-ListItemControlsButton-Color_Hover
--triplex-next-ListItemControlsButton-Color_Active
```

Цвет лейбла переопределяет токен `Color_*` через `!important`, потому что
`<Text>` имеет свой `color`-стиль.

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLButtonElement`. Не убирать.
- **`type="button"`** по умолчанию — не убирать, иначе кнопка внутри `<form>` будет сабмитить.
- **Классы `withIcon` / `withText`** — выставляются автоматически по наличию `icon` / `children`. Не передавать вручную.
- **Лейбл оборачивается в `<Text>`** — не заменять на `<span>`, иначе сломается типографика и переопределение цвета через токены.

---

## Accessibility

- Нативный `<button>` — полная поддержка клавиатуры (Tab, Enter, Space).
- **Иконочный режим** (без `children`) — потребитель **обязан** передать `aria-label` через `...rest`. Библиотека мультиязычная, текст не хардкодится.
- **`aria-expanded`** — используется когда кнопка является триггером dropdown (см. `ListItemControlsButtonDropdown`); визуально активирует подсветку иконки/текста через `IconWrapper.active`.

---

## Связанные компоненты

- `ListItemControls` — обёртка-контейнер для группы `ListItemControlsButton`.
- `ListItemControlsButtonDropdown` — расширение, добавляющее dropdown.
- `IconWrapper` — обёртка для иконки, управляет цветом через `hoverable` / `active` / `disabled`.
- `Text` — типографический компонент для лейбла.

---

## Stories

Основные истории: `stories/List/ListItemControls.stories.tsx`
Файл примера: `stories/List/examples/ListItemControls/Default.tsx`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `Default.tsx` | Несколько кнопок (icon-only, text-only, icon+text) и `ListItemControlsButtonDropdown` внутри `ListItemControls` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
