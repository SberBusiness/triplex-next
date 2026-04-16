---
component: Checkbox
category: Inputs
figma-node: ""
figma-file: ""
related: [CheckboxXGroup, CheckboxYGroup, CheckboxTree, CheckboxTreeExtended]
tokens:
  - --triplex-next-Checkbox-Background_Default
  - --triplex-next-Checkbox-BorderColor_Default
  - --triplex-next-Checkbox-Checkmark_Fill_Default
  - --triplex-next-Checkbox-Background_Hover
  - --triplex-next-Checkbox-BorderColor_Hover
  - --triplex-next-Checkbox-Background_Checked_Default
  - --triplex-next-Checkbox-BorderColor_Checked_Default
  - --triplex-next-Checkbox-Background_Disabled
  - --triplex-next-Checkbox-BorderColor_Disabled
  - --triplex-next-Checkbox-Background_Checked_Disabled
  - --triplex-next-Checkbox-BorderColor_Checked_Disabled
  - --triplex-next-Checkbox-Checkmark_Fill_Disabled
  - --triplex-next-Checkbox-BorderColor_Focus
  - --triplex-next-Checkbox-Background_Checked_Hover
stories: stories/Checkbox/Checkbox.stories.tsx
version: "1.0"
---

# Checkbox

## Назначение
Нативный чекбокс в обертке `<label>`, который поддерживает визуальные состояния (default/checked/disabled/focus) и режим частичного выбора через `bulk`.

Используй когда: нужен чекбокс с текстовой подписью (`children`) и стандартным поведением `<input type="checkbox">`.
Не используй когда: нужен сложный многошаговый выбор или компонент с нестандартной семантикой (тогда лучше другой control).

---

## Варианты и props
### Опциональные props
| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `checked` | `boolean` | — | Состояние чекбокса (controlled). Передаётся через стандартные props `<input>`. |
| `defaultChecked` | `boolean` | — | Состояние чекбокса (uncontrolled). Передаётся через стандартные props `<input>`. |
| `disabled` | `boolean` | `false` | Блокирует взаимодействие и меняет визуальное состояние. |
| `bulk` | `boolean` | `false` | Влияет на отображаемую иконку (используется bulk-иконка), при этом видимость checkmark всё равно определяется состоянием `checked`. |
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер: `SM` / `MD` / `LG`. |
| `children` | `React.ReactNode` | — | Контент лейбла рядом с чекбоксом. Если `children` нет — добавляется класс `.nonempty` не применяется. |
| `labelAttributes` | `React.LabelHTMLAttributes<HTMLLabelElement>` | — | Дополнительные HTML-атрибуты для корневого `<label>` (например, `className`, `onFocus`). |
| `...inputAttributes` | `Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">` | — | Все стандартные атрибуты `<input type="checkbox">` (включая `name`, `onChange`, `aria-label` и т.д.). |

---

## Ключевые особенности реализации
### Ref forwarding
`ref` прокидывается на внутренний `<input type="checkbox">`.

### Иконка
- `bulk=false` — отрисовывается обычная checkmark-иконка.
- `bulk=true` — отрисовывается bulk-иконка.

### Структура DOM
Компонент рендерит:
1. корневой `<label>`
2. `<input type="checkbox">`
3. декоративные `<span>`/`svg` для отрисовки фона и галочки

---

## Accessibility
Компонент использует нативный `<input type="checkbox">`, поэтому поддерживает стандартную клавиатурную навигацию (Tab + Space) и семантику формы.

Библиотека мультиязычная: текст `aria-label`/`title` не захардкожен в компоненте. При необходимости потребитель передаёт `aria-*` через `...inputAttributes`.

---

## Инварианты
- `forwardRef` на компоненте обязателен и должен указывать на `<input>`.
- Корневой DOM-элемент компонента — `<label>`, внутри которого находится `<input>`.
- `className` и `size` — публичные части внешнего контрактного API: не менять семантику без согласования.

---

## Дизайн-токены
Компонент использует CSS-переменные:
`--triplex-next-Checkbox-Background_Default`,
`--triplex-next-Checkbox-BorderColor_Default`,
`--triplex-next-Checkbox-Checkmark_Fill_Default`,
`--triplex-next-Checkbox-Background_Hover`,
`--triplex-next-Checkbox-BorderColor_Hover`,
`--triplex-next-Checkbox-Background_Checked_Default`,
`--triplex-next-Checkbox-BorderColor_Checked_Default`,
`--triplex-next-Checkbox-Background_Disabled`,
`--triplex-next-Checkbox-BorderColor_Disabled`,
`--triplex-next-Checkbox-Background_Checked_Disabled`,
`--triplex-next-Checkbox-BorderColor_Checked_Disabled`,
`--triplex-next-Checkbox-Checkmark_Fill_Disabled`,
`--triplex-next-Checkbox-BorderColor_Focus`,
`--triplex-next-Checkbox-Background_Checked_Hover`.

---

## Связанные компоненты
- `CheckboxXGroup` — группировка чекбоксов по оси X.
- `CheckboxYGroup` — группировка чекбоксов по оси Y.
- `CheckboxTree` — декларативное дерево чекбоксов (обертка над `CheckboxTreeExtended`), поддерживает bulk-логику и распространение состояния checked по родителям/детям.
- `CheckboxTreeExtended` — расширенное дерево чекбоксов на базе `CollapsableTree` с Node/Checkbox подкомпонентами (использует нативный `Checkbox` внутри для каждого узла).

---

## Stories
`stories/Checkbox/Checkbox.stories.tsx`

| Story | Что демонстрирует |
|---|---|
| `Playground` | Интерактивный контроль основных props |
| `Default` | Минимальное использование |
| `Sizes` | Размеры SM / MD / LG |
| `XGroup` | Группа по оси X |
| `YGroup` | Группа по оси Y |

---

## История изменений
| Дата | Изменение |
|---|---|
| 2026-04-16 | Приведение `Checkbox` к AI-ready: соблюдены правила `docs/ai/codestyle.md`, добавлена AI-документация и unit-тест на передачу `className` корневому `label`. |

