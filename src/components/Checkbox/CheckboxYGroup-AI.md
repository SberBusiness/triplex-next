---
component: CheckboxYGroup
category: Inputs
figma-node: ""
figma-file: ""
related: [Checkbox, CheckboxXGroup]
tokens: []
stories: stories/Checkbox/Checkbox.stories.tsx
version: "1.0"
---

# CheckboxYGroup

## Назначение
Компонент-группа для компоновки чекбоксов с направлением по оси `Y`.
Используется как контейнер для нескольких `Checkbox`, когда нужно разложить их вертикально.

---

## Варианты и props
### Опциональные props
| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Внутри обычно рендерятся `Checkbox` (или компоненты, использующие `Checkbox`). |
| `...divAttributes` | `React.HTMLAttributes<HTMLDivElement>` | — | Все стандартные HTML-атрибуты для корневого элемента. |

---

## Ключевые особенности реализации
- Корневой элемент: `<div role="group">`.
- Разметка: `inline-flex` и `flex-flow: column wrap`.

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
- `Checkbox` — базовый чекбокс, обычно используется внутри `CheckboxYGroup`.
- `CheckboxXGroup` — аналогичная группа, но с направлением по оси `X`.

---

## Stories
`stories/Checkbox/Checkbox.stories.tsx`

| Story | Что демонстрирует |
|---|---|
| `YGroup` | Группа по оси Y |

---

## История изменений
| Дата | Изменение |
|---|---|
| 2026-04-16 | Приведение `CheckboxYGroup` к AI-ready: добавлен `forwardRef`, типизирован `children`, созданы AI-документ и инварианты. |

