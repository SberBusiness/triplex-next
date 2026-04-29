---
component: Button
category: Buttons
related: [ButtonIcon, ButtonDropdown, ButtonDropdownExtended]
tokens:
  - --triplex-next-Button-General_Background_Default
  - --triplex-next-Button-General_Color_Default
  - --triplex-next-Button-General_Background_Hover
  - --triplex-next-Button-General_Color_Hover
  - --triplex-next-Button-General_Background_Active
  - --triplex-next-Button-General_Color_Active
  - --triplex-next-Button-General_Shadow_Focus
  - --triplex-next-Button-General_Background_Disabled
  - --triplex-next-Button-General_Color_Disabled
  - --triplex-next-Button-Secondary_Background_Default
  - --triplex-next-Button-Secondary_Color_Default
  - --triplex-next-Button-Secondary_Background_Hover
  - --triplex-next-Button-Secondary_Color_Hover
  - --triplex-next-Button-Secondary_Background_Active
  - --triplex-next-Button-Secondary_Color_Active
  - --triplex-next-Button-Secondary_Shadow_Focus
  - --triplex-next-Button-Secondary_Background_Disabled
  - --triplex-next-Button-Secondary_Color_Disabled
  - --triplex-next-Button-SecondaryLight_Background_Default
  - --triplex-next-Button-SecondaryLight_Color_Default
  - --triplex-next-Button-SecondaryLight_Background_Hover
  - --triplex-next-Button-SecondaryLight_Color_Hover
  - --triplex-next-Button-SecondaryLight_Background_Active
  - --triplex-next-Button-SecondaryLight_Color_Active
  - --triplex-next-Button-SecondaryLight_Shadow_Focus
  - --triplex-next-Button-SecondaryLight_Background_Disabled
  - --triplex-next-Button-SecondaryLight_Color_Disabled
  - --triplex-next-Button-Danger_Background_Default
  - --triplex-next-Button-Danger_Color_Default
  - --triplex-next-Button-Danger_Background_Hover
  - --triplex-next-Button-Danger_Color_Hover
  - --triplex-next-Button-Danger_Background_Active
  - --triplex-next-Button-Danger_Color_Active
  - --triplex-next-Button-Danger_Shadow_Focus
  - --triplex-next-Button-Danger_Background_Disabled
  - --triplex-next-Button-Danger_Color_Disabled
  - --triplex-next-Button-Link_Color_Default
  - --triplex-next-Button-Link_Color_Hover
  - --triplex-next-Button-Link_Color_Active
  - --triplex-next-Button-Link_Shadow_Focus
  - --triplex-next-Button-Link_Color_Disabled
  - --triplex-next-Button-Icon_Shadow_Focus
stories: stories/Buttons/Button.stories.tsx
version: "1.0"
---

# Button

## Назначение

Основной интерактивный элемент для запуска действий. Существует в пяти визуальных темах
и трёх размерах. Поддерживает состояния загрузки, иконки и полноширинный режим.

Используй `Button` когда: нужна кнопка с текстом (с иконкой или без).
Используй `ButtonIcon` когда: нужна кнопка только с иконкой без текста.
Используй `ButtonDropdown` когда: нужен выбор из нескольких действий.

---

## Варианты и props

### Темы (`EButtonTheme`)

| Значение | Описание |
|---|---|
| `GENERAL` | Основной стиль (primary) |
| `SECONDARY` | Вторичный |
| `SECONDARY_LIGHT` | Вторичный светлый (для тёмных фонов) |
| `DANGER` | Деструктивное действие |
| `LINK` | Текстовая ссылка |

### Размеры (`EComponentSize`)

| Значение | Высота | Padding | Border-radius | Font-size |
|---|---|---|---|---|
| `SM` | 28px | 0 12px | 6px | 12px |
| `MD` | 40px | 0 20px | 8px | 14px |
| `LG` | 56px | 0 24px | 10px | 16px |

### Обязательные props (`Button`)

| Prop | Тип | Описание |
|---|---|---|
| `theme` | `EButtonTheme` | Визуальный стиль |
| `size` | `EComponentSize` | Размер |

### Опциональные props (`Button`)

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `block` | `boolean` | `false` | Полноширинный режим |
| `loading` | `boolean` | `false` | Состояние загрузки: скрывает контент через `visibility: hidden`, показывает спиннер, ставит `tabIndex={-1}` |
| `icon` | `React.ReactElement` | — | Иконка слева от текста; если без `children` — кнопка становится квадратной (icon-only) |
| `children` | `React.ReactNode` | — | Текст кнопки |
| `...HTMLButtonAttributes` | — | — | Все стандартные атрибуты `<button>`, включая `aria-expanded` (см. Accessibility) |

### Props компонента `ButtonIcon`

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `shape` | `EButtonIconShape` | `SQUIRCLE` | Форма: `SQUIRCLE` (4px radius) или `CIRCLE` (50%) |
| `active` | `boolean` | `false` | Визуальное активное состояние |
| `...HTMLButtonAttributes` | — | — | Включая `disabled` |

### Ограничения по темам

- `block`, `loading`, `icon` недоступны для темы `LINK` — тип `never` в интерфейсе, TypeScript запрещает передачу.
- Тема `LINK` не имеет `min-width`, фона (`background: transparent`) и использует уменьшенный вертикальный `padding`.
- Тема лоадера (`loading`) для `SECONDARY` и `SECONDARY_LIGHT` — `ELoaderSmallTheme.BRAND`, для остальных — `ELoaderSmallTheme.NEUTRAL`.

---

## Дизайн-токены

Паттерн: `--triplex-next-Button-{Theme}_{Property}_{State}`

Каждая тема (кроме `LINK`) имеет полный набор:
- `_Background_Default/Hover/Active/Disabled`
- `_Color_Default/Hover/Active/Disabled`
- `_Shadow_Focus`

Тема `LINK` — только `_Color_*` и `_Shadow_Focus` (нет фона).

При добавлении нового визуального состояния нужен новый токен в `src/generated/themesCssVariables.css`.

---

## Инварианты

- **`forwardRef`** — обязателен на `Button`, `ButtonBase`, `ButtonIcon`, `ButtonDropdown`. Не убирать.
- **`TButtonProps` union type** — должен включать все тематические интерфейсы. При добавлении новой темы — добавь интерфейс в union.
- **`EButtonTheme` значения** — не переименовывать. Это публичное API.
- **`EComponentSize`** — общий enum из `src/enums/EComponentSize`, не делай локальный аналог.
- **Размеры (28px / 40px / 56px)** — не менять без согласования с дизайнером, другие компоненты ориентируются на эти размеры.

---

## Accessibility

- Нативный `<button>` — полная поддержка клавиатуры (Tab, Enter, Space) без дополнительных атрибутов.
- **`ButtonIcon`**: иконочная кнопка без видимого текста — потребитель **обязан** передать `aria-label` через `...rest`. Библиотека мультиязычная, текст не хардкодится.
- **`loading`**: устанавливает `tabIndex={-1}` — кнопка исключается из tab-порядка. Если нужна доступность состояния загрузки для скринридеров, потребитель добавляет `aria-busy="true"` через props.
- **`aria-expanded`**: управляет визуальным состоянием «раскрыто» (добавляет CSS-классы `.expanded`, `.active`). Передаётся потребителем при использовании кнопки как триггера dropdown. Отдельного prop `expanded` нет — используй стандартный HTML-атрибут.
- Фокус-стиль через `:focus-visible` — виден только при клавиатурной навигации.

---

## Связанные компоненты

- `ButtonIcon` (`src/components/Button/ButtonIcon.tsx`) — иконочная кнопка, часть того же компонента
- `ButtonDropdown` (`src/components/Button/ButtonDropdown.tsx`) — кнопка с выпадающим меню опций
- `ButtonDropdownExtended` — контейнер для кастомного dropdown с render-функциями
- `Loader` (`src/components/Loader`) — используется внутри Button для состояния загрузки
- `Dropdown` (`src/components/Dropdown`) — используется внутри ButtonDropdown

---

## Stories

Основные истории: `stories/Buttons/Button.stories.tsx`
Файлы примеров: `stories/Buttons/examples/Button/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль всех props |
| `Default` | `DefaultExample.tsx` | Базовое использование |
| `States` | `StatesExample.tsx` | Expanded, loading, disabled |
| `Sizes` | `SizesExample.tsx` | SM / MD / LG для всех тем |
| `Themes` | `ThemesExample.tsx` | Все пять тем |
| `WithIcon` | `WithIconExample.tsx` | Icon-only и text+icon |
| `WithNotificationIcon` | `WithNotificationIconExample.tsx` | Иконка с индикатором уведомления |
| `BlockMode` | `BlockModeExample.tsx` | Полноширинный режим |
| `TextWithIcon` | `TextWithIconExample.tsx` | Текст вместе с иконкой |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-03-31 | Создан документ (пилот AI-Ready) |
| 2026-04-27 | Приведён в соответствие с `docs/ai/template-ai.md`: убраны секции «Файловая структура» и «Ключевые особенности реализации», переструктурированы props, добавлена колонка `Example file` в таблице Stories |
