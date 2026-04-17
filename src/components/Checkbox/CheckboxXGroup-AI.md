---
component: CheckboxXGroup
category: Inputs
figma-node: ""
figma-file: ""
related: [Checkbox]
tokens: []
stories: stories/Checkbox/Checkbox.stories.tsx
version: "1.0"
---

# CheckboxXGroup

## Назначение
Компонент-группа для компоновки чекбоксов с направлением по оси `X`.
Используется как контейнер для нескольких `Checkbox`, когда нужно разложить их в строку с переносами.

---

## Варианты и props
### Опциональные props
| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `indent` | `TIndentSize` | `12` | Отступы/зазоры между чекбоксами в группе. Возможные значения: `12, 16, 20, 24, 28, 32`. |
| `children` | `React.ReactNode` | — | Внутри обычно рендерятся `Checkbox`. |
| `...divAttributes` | `React.HTMLAttributes<HTMLDivElement>` | — | Все стандартные HTML-атрибуты для корневого элемента. |

---

## Ключевые особенности реализации
- Корневой элемент: `<div role="group">`.
- Разметка: `inline-flex` и `flex-flow: row wrap`.
- `indent` управляет применением LESS-класса `indent-{n}` и задает отрицательные/положительные маргины для выравнивания сетки.

---

## Accessibility
- `role="group"` описывает группу взаимосвязанных контролов.
- Семантика чекбоксов остается нативной на уровне `Checkbox` внутри группы.

---

## Инварианты
- `forwardRef` обязателен и должен указывать на корневой `<div>`.
- Корневой DOM-элемент компонента — `<div>`, роль зафиксирована как `role="group"`.

---

## Связанные компоненты
- `Checkbox` — базовый чекбокс, обычно используется внутри `CheckboxXGroup`.

---

## Stories
`stories/Checkbox/Checkbox.stories.tsx`

| Story | Что демонстрирует |
|---|---|
| `XGroup` | Группа по оси X |

---

## История изменений
| Дата | Изменение |
|---|---|
| 2026-04-16 | Приведение `CheckboxXGroup` к AI-ready: добавлен `forwardRef`, типизирован `children`, созданы AI-документ и инварианты. |

