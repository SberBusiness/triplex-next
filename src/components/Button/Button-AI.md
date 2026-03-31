---
component: Button
category: Buttons
figma-node: "1-328"
figma-file: "https://www.figma.com/design/MeAqaaLV9acAgoBOkZC9C2/-W--LIB-DSN-01-Components-DCB-Next-v.1.3.0"
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

## Файловая структура

```
src/components/Button/
├── Button.tsx                     # Основной компонент, union type TButtonProps
├── ButtonBase.tsx                 # Базовый <button>, extends HTML attrs
├── ButtonIcon.tsx                 # Иконочная кнопка (squircle / circle)
├── ButtonDropdown.tsx             # Кнопка с выпадающим меню
├── ButtonDropdownExtended.tsx     # Контейнер с кастомным dropdown
├── enums.ts                       # EButtonTheme, EButtonDotsTheme, EButtonIconShape
├── index.ts                       # Barrel exports
└── styles/
    ├── Button.module.less         # Размеры, block, loading, base layout
    ├── ButtonGeneral.module.less  # Тема GENERAL
    ├── ButtonSecondary.module.less
    ├── ButtonSecondaryLight.module.less
    ├── ButtonDanger.module.less
    ├── ButtonLink.module.less     # Тема LINK — нет min-width, нет bg
    ├── ButtonIcon.module.less     # Стили ButtonIcon
    ├── ButtonDropdown.module.less
    └── ButtonDropdownExtended.module.less
```

---

## Варианты и props

### Темы (`EButtonTheme`)

| Значение | Описание | Поддерживает loading/icon/block |
|---|---|---|
| `GENERAL` | Основной стиль (primary) | Да |
| `SECONDARY` | Вторичный | Да |
| `SECONDARY_LIGHT` | Вторичный светлый (для тёмных фонов) | Да |
| `DANGER` | Деструктивное действие | Да |
| `LINK` | Текстовая ссылка | Нет — `loading`, `icon`, `block` запрещены через `never` |

### Размеры (`EComponentSize`)

| Значение | Высота | Padding | Border-radius | Font-size |
|---|---|---|---|---|
| `SM` | 28px | 0 12px | 6px | 12px |
| `MD` | 40px | 0 20px | 8px | 14px |
| `LG` | 56px | 0 24px | 10px | 16px |

### Props компонента `Button`

| Prop | Тип | Обязателен | Описание |
|---|---|---|---|
| `theme` | `EButtonTheme` | Да | Визуальный стиль |
| `size` | `EComponentSize` | Да | Размер |
| `block` | `boolean` | Нет | Полноширинный режим (только не-LINK темы) |
| `loading` | `boolean` | Нет | Состояние загрузки: скрывает контент, показывает спиннер (только не-LINK темы) |
| `icon` | `React.ReactElement` | Нет | Иконка слева от текста; если без `children` — кнопка становится квадратной |
| `children` | `React.ReactNode` | Нет | Текст кнопки |
| `...HTMLButtonAttributes` | — | — | Все стандартные атрибуты `<button>` |

### Props компонента `ButtonIcon`

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `shape` | `EButtonIconShape` | `SQUIRCLE` | Форма: `SQUIRCLE` (4px radius) или `CIRCLE` (50%) |
| `active` | `boolean` | `false` | Визуальное активное состояние |
| `...HTMLButtonAttributes` | — | — | Включая `disabled` |

---

## Ключевые особенности реализации

### Иконка без текста
Если передан `icon` без `children` — добавляется класс `.icon`, который делает кнопку квадратной:
```tsx
// Button.tsx — логика определения icon-only режима
const iconOnly = Boolean(icon) && !children;
<button className={clsx(styles.button, { [styles.icon]: iconOnly })}>
```

### Состояние загрузки
- `loading` скрывает контент через `visibility: hidden` (не `display: none`) — сохраняет размеры
- Устанавливает `tabIndex={-1}` — кнопка недоступна с клавиатуры
- Тема лоадера: `SECONDARY` и `SECONDARY_LIGHT` → `ELoaderSmallTheme.BRAND`, остальные → `ELoaderSmallTheme.NEUTRAL`

### `aria-expanded` управляет визуалом
Состояние "раскрыто" (например, когда кнопка открывает dropdown) управляется через `aria-expanded`:
```tsx
<Button aria-expanded={true} ...> → добавляет CSS-классы .expanded и .active
```
Отдельного prop `expanded` нет — используй стандартный HTML-атрибут.

### Тема LINK
- Нет `min-width`
- `background: transparent`
- `padding` по вертикали отличается от других тем (меньше)
- `block`, `loading`, `icon` — тип `never` в интерфейсе, TypeScript запрещает передачу

---

## Дизайн-токены

Паттерн: `--triplex-next-Button-{Theme}_{Property}_{State}`

Каждая тема (кроме LINK) имеет полный набор:
- `_Background_Default/Hover/Active/Disabled`
- `_Color_Default/Hover/Active/Disabled`
- `_Shadow_Focus`

Тема LINK — только `_Color_*` и `_Shadow_Focus` (нет фона).

При добавлении нового визуального состояния нужен новый токен в `src/generated/themesCssVariables.css`.

---

## Инварианты

- **`forwardRef`** — обязателен на `Button`, `ButtonBase`, `ButtonIcon`, `ButtonDropdown`. Не убирать.
- **`TButtonProps` union type** — должен включать все тематические интерфейсы. При добавлении новой темы — добавь интерфейс в union.
- **`EButtonTheme` значения** — не переименовывать. Это публичное API.
- **`EComponentSize`** — общий enum из `src/enums/EComponentSize`, не делай локальный аналог.
- **Размеры (28px/40px/56px)** — не менять без согласования с дизайнером, другие компоненты ориентируются на эти размеры.

---

## Связанные компоненты

- `ButtonIcon` (`src/components/Button/ButtonIcon.tsx`) — иконочная кнопка, часть того же компонента
- `ButtonDropdown` (`src/components/Button/ButtonDropdown.tsx`) — кнопка с выпадающим меню опций
- `ButtonDropdownExtended` — контейнер для кастомного dropdown с render-функциями
- `Loader` (`src/components/Loader`) — используется внутри Button для состояния загрузки
- `Dropdown` (`src/components/Dropdown`) — используется внутри ButtonDropdown

---

## Stories

`stories/Buttons/Button.stories.tsx`

| Story | Что демонстрирует |
|---|---|
| `Playground` | Интерактивный контроль всех props |
| `Default` | Базовое использование |
| `States` | Expanded, loading, disabled |
| `Sizes` | SM / MD / LG для всех тем |
| `Themes` | Все пять тем |
| `WithIcon` | Icon-only и text+icon |
| `BlockMode` | Полноширинный режим |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-03-31 | Создан документ (пилот AI-Ready) |
