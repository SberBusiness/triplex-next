---
component: DropdownListItem
category: Dropdown
related: [DropdownList, Badge]
tokens:
  - DropdownList.Background_Active
  - DropdownList.Background_Default
  - DropdownList.Background_Selected
  - DropdownList.Color
stories: stories/Dropdown/Dropdown.stories.tsx
version: "1.0"
---

# DropdownListItem

## Назначение

`DropdownListItem` представляет одну опцию десктопного `DropdownList`. Используй его для выбора значения мышью и с клавиатуры. Для действий на мобильной шторке семейства `Dropdown` используй `PullerListItem` внутри `PullerList`.

Импортируй `DropdownListItem` или `DropdownList` из `@sberbusiness/triplex-next`. Именованный экспорт и `DropdownList.Item` указывают на один компонент. В готовых композициях он также доступен как `ButtonDropdownExtended.DropdownList.Item`, `SelectExtendedField.Dropdown.List.Item` и `SelectExtendedFieldDropdown.List.Item`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `id` | `string` | Уникальный в документе стабильный идентификатор. Список использует его для навигации, прокрутки и связи с триггером через `aria-activedescendant` |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `onSelect` | `() => void` | — | Обрабатывает выбор опции. При клике вызывается перед `onClick`, а при выборе с клавиатуры его вызывает список |
| `selected` | `boolean` | `false` | Выбранное потребителем значение. Управляет `aria-selected` и оформлением выбранной опции |
| `keyCodesForSelection` | `number[]` | `[SPACE, ENTER]` в `DropdownList` | Коды клавиш выбора активной опции. Для текстового поля обычно достаточно `[EVENT_KEY_CODES.ENTER]`, чтобы пробел оставался доступен для ввода |
| `showNotificationIcon` | `boolean` | `false` | Показывает `Badge.Dot` в углу опции. Размер точки берётся из списка |

Передавай видимый текст или разметку опции через `children`. Для строкового `children` компонент задаёт `title`, который можно переопределить HTML-атрибутом.

---

## Дизайн-токены

Токены оформления опции определены в `src/components/DesignTokens/components/DropdownList.ts` и переопределяются через `ThemeProvider` с prop `tokens`.

```text
DropdownList.Background_Active
DropdownList.Background_Default
DropdownList.Background_Selected
DropdownList.Color
```

Цвет точки задаёт группа `Badge` через токен `Badge.Background`.

---

## Инварианты

- `forwardRef` передаёт ссылку на корневой `<div>`. Туда же передаются `className` и HTML-атрибуты, включая `data-test-id`.
- `selected` управляется потребителем. Наведение и стрелки меняют активную опцию списка, а состояние выбора обновляется в обработчике потребителя. Размер опции и подсветку активности задаёт `DropdownList`. Вне списка сохраняется клик, а размер точки по умолчанию — `MD`.
- Наведение активирует опцию через `mouseenter`, а `mouseleave` снимает её активность, пока она остаётся текущей. Перемещение курсора между опцией и её вложенной разметкой сохраняет активность.
- Для компонента-обёртки передай `id`, `selected`, `onSelect` и `keyCodesForSelection` в props прямого дочернего элемента списка и пробрось их во вложенный `DropdownListItem`. Список читает эти значения из props обёртки.

---

## Accessibility

- Корневой элемент по умолчанию имеет `role="option"` и `aria-selected`. Задай опции доступное имя текстом или `aria-label`, если содержимое состоит только из иконки.
- Фокус остаётся на управляющем элементе. В собственной композиции настрой передачу клавиш через `useDropdownListKeyboard`, как в примере `Default`. Передавай `activeDescendant` в `aria-activedescendant`, если роль управляющего элемента поддерживает этот атрибут. [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#aria-activedescendant)
- `Enter` и `Space` вызывают `onSelect` активной опции через список. `keyCodesForSelection` переопределяет этот набор. `onClick` получает событие мыши при клике по опции.

---

## Связанные компоненты

- [DropdownList](DropdownList-ai.md) — контейнер `listbox` и источник активности, размера и клавиатурного выбора.
- [Badge](../Badge/Badge-ai.md) — `Badge.Dot` отображает индикатор уведомления.

---

## Stories

Основные истории находятся в `stories/Dropdown/Dropdown.stories.tsx`.

Файлы примеров: `stories/Dropdown/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `Default.tsx` | Публичный импорт `DropdownList`, статический `DropdownList.Item` и выбор значения |
| `WithSelectedOption` | `WithSelectedOption.tsx` | Управляемый `selected` и открытие на выбранной опции |
| `Sizes` | `Sizes.tsx` | Размеры опций `SM`, `MD` и `LG` от контейнера списка |
| `Playground` | `Playground.tsx` | Настройка списка с интерактивными опциями |
| `VisualTests` | `VisualTests.tsx` | Выбранное состояние и индикатор уведомления в длинном списке |

Статический путь `ButtonDropdownExtended.DropdownList.Item` показан в `stories/Buttons/ButtonDropdownExtended.stories.tsx`.

Файлы примеров: `stories/Buttons/examples/ButtonDropdownExtended/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Controlled` | `Controlled.tsx` | Пункт в управляемой композиции с кнопкой и выпадающим списком |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-17 | Создан документ (TRI-186) |
