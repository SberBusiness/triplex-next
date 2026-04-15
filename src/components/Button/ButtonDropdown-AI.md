---
component: ButtonDropdown
category: Buttons
figma-node: ""
figma-file: ""
related: [Button, ButtonDropdownExtended, Dropdown]
tokens: []
stories: stories/Buttons/ButtonDropdown.stories.tsx
version: "1.0"
---

# ButtonDropdown

## Назначение

Кнопка-триггер с выпадающим списком действий.
Поддерживает два визуальных режима: обычная кнопка (`EButtonTheme`) и dots-вариант (`EButtonDotsTheme`).

Используй когда: нужно сгруппировать несколько действий под один триггер и дать выбор опции из списка.
Не используй когда: нужна одиночная кнопка без списка - используй `Button`.

---

## Файловая структура

```text
src/components/Button/
├── ButtonDropdown.tsx                  # Основной компонент (forwardRef, рендер button + dropdown)
├── ButtonDropdownExtended.tsx          # Базовый контейнер с контролем opened/close и outside click
├── styles/
│   ├── ButtonDropdown.module.less      # Стили caret, active-состояния, block-режима
│   └── ButtonDropdownExtended.module.less
└── index.ts                            # Публичный экспорт ButtonDropdown
```

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `theme` | `EButtonTheme.GENERAL \| EButtonTheme.SECONDARY \| EButtonTheme.SECONDARY_LIGHT \| EButtonTheme.DANGER \| EButtonDotsTheme` | Визуальная тема триггера |
| `size` | `EComponentSize` | Размер кнопки (`SM` / `MD` / `LG`) |
| `options` | `IButtonDropdownOption[]` | Опции выпадающего списка |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | `undefined` | Текст/контент кнопки (используется также в mobile header) |
| `selected` | `IButtonDropdownOption` | `undefined` | Предвыбранная опция для подсветки в списке |
| `disabled` | `boolean` | `false` | Блокирует кнопку и открытие списка |
| `buttonAttributes` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | `undefined` | Дополнительные HTML-атрибуты нативной кнопки |
| `block` | `boolean` | `false` | Доступен только для non-dots тем |
| `className` | `string` | — | Дополнительный CSS-класс контейнера |
| `...rest` | `React.HTMLAttributes<HTMLDivElement>` | — | Атрибуты корневого `div` компонента |

### Ограничения по темам

- Для `EButtonDotsTheme` prop `block` запрещен типизацией (`never`).
- Dots-режим использует иконку `Dotshorizontal*` вместо текстового контента кнопки.

### Структура опции (`IButtonDropdownOption`)

| Поле | Тип | Описание |
|---|---|---|
| `id` | `string` | Уникальный идентификатор опции |
| `label` | `React.ReactNode` | Видимый контент пункта меню |
| `onSelect` | `() => void` | Callback выбора опции |
| `...rest` | `IDropdownListItemProps` (без ряда запрещенных полей) | Остальные настройки `DropdownList.Item` |

---

## Ключевые особенности реализации

### Композиция через `ButtonDropdownExtended`

- `ButtonDropdown` делегирует управление opened-state и close-on-outside в `ButtonDropdownExtended`.
- Передает две render-функции: `renderButton` и `renderDropdown`.

### Desktop + mobile dropdown

- Desktop: рендерится `DropdownList` с `DropdownList.Item`.
- Mobile: через `mobileViewProps` рендерится `DropdownMobileHeader` + `DropdownMobileList`.
- После выбора любого пункта вызывается `option.onSelect?.()` и dropdown закрывается.

### Управление клавиатурой

- На кнопке перехватываются `Space`, `ArrowUp`, `ArrowDown` с `preventDefault`.
- `ArrowUp/ArrowDown` открывают dropdown, если он закрыт.
- В `ButtonDropdownExtended` dropdown закрывается по `Escape` и (из-за `closeOnTab`) по `Tab`.

### ARIA-связка trigger/list

- Кнопка получает `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`.
- `aria-controls` и `DropdownList` связываются через `instanceId` (`uniqueId()`).
- `aria-activedescendant` синхронизируется через `DropdownListContext`.

---

## Accessibility

- Триггер строится на `Button` (нативный `button`), базовая keyboard-навигация сохраняется.
- Компонент не хардкодит aria-тексты: при необходимости `aria-label` нужно передавать через `buttonAttributes`.
- На mobile-заголовке dropdown отображается `children` триггера; если в продукте нужен локализованный отдельный заголовок, его нужно задавать на уровне композиции (через `ButtonDropdownExtended`).
- Для корректной доступности меню потребитель должен передавать понятные `label` для `options`.

---

## Дизайн-токены

`ButtonDropdown` не использует собственных CSS color-токенов в `ButtonDropdown.module.less`.
Визуальные токены берутся из `Button` и `Dropdown`, которые рендерятся внутри.

---

## Инварианты

- `forwardRef` на `ButtonDropdown` обязателен: ref должен оставаться на `HTMLButtonElement` триггера.
- `IButtonDropdownOption.id` должен оставаться обязательным и уникальным ключом для рендера списков.
- `closeOnTab` в вызове `ButtonDropdownExtended` должен сохраняться (часть текущего UX-контракта закрытия).
- Выбор опции должен закрывать dropdown и на desktop, и на mobile.
- Публичный экспорт из `src/components/Button/index.ts` должен оставаться.

---

## Связанные компоненты

- `Button` (`src/components/Button/Button.tsx`) - базовый триггер, на котором построен `ButtonDropdown`.
- `ButtonDropdownExtended` (`src/components/Button/ButtonDropdownExtended.tsx`) - управляет открытием/закрытием dropdown.
- `Dropdown` (`src/components/Dropdown`) - контейнер и пункты списка для desktop/mobile представления.

---

## Stories

`stories/Buttons/ButtonDropdown.stories.tsx`

| Story | Что демонстрирует |
|---|---|
| `Playground` | Интерактивный контроль `children`, `theme`, `size`, `block`, `disabled` |
| `Default` | Базовый сценарий открытия и выбора опций |
| `Sizes` | Размеры `SM` / `MD` / `LG` |
| `Themes` | Разные темы (`EButtonTheme` + `EButtonDotsTheme`) |
| `BlockMode` | Блочный режим non-dots кнопки |
| `Disabled` | Неактивное состояние |
| `WithSelectedOption` | Предвыбранная опция через `selected` |
| `VisualTests` | Сценарий визуальной регрессии |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-15 | Создан документ AI-ready для `ButtonDropdown`. |
