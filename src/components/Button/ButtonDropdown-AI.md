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

Кнопка-триггер с выпадающим списком действий. Поддерживает два визуальных режима: обычная кнопка (`EButtonTheme`) и dots-вариант (`EButtonDotsTheme`).

Используй когда: нужно сгруппировать несколько действий под один триггер и дать выбор опции из списка.
Не используй когда: нужна одиночная кнопка без списка — используй `Button`.

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
| `children` | `React.ReactNode` | — | Текст/контент кнопки (используется также в mobile header) |
| `selected` | `IButtonDropdownOption` | — | Предвыбранная опция для подсветки в списке |
| `disabled` | `boolean` | `false` | Блокирует кнопку и открытие списка |
| `buttonAttributes` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | — | Дополнительные HTML-атрибуты нативной кнопки (включая `aria-label`) |
| `block` | `boolean` | `false` | Полноширинный режим (только для non-dots тем) |
| `className` | `string` | — | Дополнительный CSS-класс контейнера |
| `...rest` | `React.HTMLAttributes<HTMLDivElement>` | — | Атрибуты корневого `<div>` компонента |

### Структура опции (`IButtonDropdownOption`)

| Поле | Тип | Описание |
|---|---|---|
| `id` | `string` | Уникальный идентификатор опции |
| `label` | `React.ReactNode` | Видимый контент пункта меню |
| `onSelect` | `() => void` | Callback выбора опции |
| `...rest` | `IDropdownListItemProps` (без ряда запрещённых полей) | Остальные настройки `DropdownList.Item` |

### Ограничения по темам

- Для `EButtonDotsTheme` prop `block` запрещён типизацией (`never`).
- Dots-режим использует иконку `Dotshorizontal*` вместо текстового контента кнопки.
- Desktop рендерит `DropdownList` с `DropdownList.Item`; mobile через `mobileViewProps` рендерит `DropdownMobileHeader` + `DropdownMobileList`.

---

## Дизайн-токены

`ButtonDropdown` не использует собственных CSS color-токенов. Визуальные токены берутся из `Button` и `Dropdown`, которые рендерятся внутри.

---

## Инварианты

- `forwardRef` на `ButtonDropdown` обязателен: ref должен оставаться на `HTMLButtonElement` триггера.
- `IButtonDropdownOption.id` должен оставаться обязательным и уникальным ключом для рендера списков.
- `closeOnTab` в вызове `ButtonDropdownExtended` должен сохраняться (часть текущего UX-контракта закрытия).
- Выбор опции должен закрывать dropdown и на desktop, и на mobile.
- Публичный экспорт из `src/components/Button/index.ts` должен оставаться.

---

## Accessibility

- Триггер строится на `Button` (нативный `<button>`), базовая keyboard-навигация сохраняется.
- Кнопка получает `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`. Связка trigger/list осуществляется через `instanceId` (`uniqueId()`); `aria-activedescendant` синхронизируется через `DropdownListContext`.
- На кнопке перехватываются `Space`, `ArrowUp`, `ArrowDown` с `preventDefault`. `ArrowUp` / `ArrowDown` открывают dropdown, если он закрыт. Dropdown закрывается по `Escape` и (из-за `closeOnTab`) по `Tab`.
- Компонент **не хардкодит** aria-тексты: при необходимости `aria-label` нужно передавать через `buttonAttributes`. Для корректной доступности меню потребитель должен передавать понятные `label` для `options`.
- На mobile-заголовке dropdown отображается `children` триггера; если в продукте нужен локализованный отдельный заголовок, его нужно задавать на уровне композиции (через `ButtonDropdownExtended`).

---

## Связанные компоненты

- `Button` (`src/components/Button/Button.tsx`) — базовый триггер, на котором построен `ButtonDropdown`.
- `ButtonDropdownExtended` (`src/components/Button/ButtonDropdownExtended.tsx`) — управляет открытием/закрытием dropdown через render-функции `renderButton` и `renderDropdown`.
- `Dropdown` (`src/components/Dropdown`) — контейнер и пункты списка для desktop/mobile представления.

---

## Stories

Основные истории: `stories/Buttons/ButtonDropdown.stories.tsx`
Файлы примеров: `stories/Buttons/examples/ButtonDropdown/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `children`, `theme`, `size`, `block`, `disabled` |
| `Default` | `DefaultExample.tsx` | Базовый сценарий открытия и выбора опций |
| `Sizes` | `SizesExample.tsx` | Размеры `SM` / `MD` / `LG` |
| `Themes` | `ThemesExample.tsx` | Разные темы (`EButtonTheme` + `EButtonDotsTheme`) |
| `BlockMode` | `BlockModeExample.tsx` | Блочный режим non-dots кнопки |
| `Disabled` | `DisabledExample.tsx` | Неактивное состояние |
| `WithSelectedOption` | `WithSelectedOptionExample.tsx` | Предвыбранная опция через `selected` |
| `VisualTests` | `VisualTestsExample.tsx` | Сценарий визуальной регрессии |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-15 | Создан документ AI-ready для `ButtonDropdown`. |
| 2026-04-27 | Приведён в соответствие с `docs/ai/template-ai.md`: убраны секции «Файловая структура» и «Ключевые особенности реализации», их содержимое перенесено в `Ограничения по темам` и `Accessibility`, добавлена колонка `Example file`. |
