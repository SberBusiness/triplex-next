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

Нативный чекбокс в обёртке `<label>`, который поддерживает визуальные состояния (default / checked / disabled / focus) и режим частичного выбора через `bulk`.

Используй когда: нужен чекбокс с текстовой подписью (`children`) и стандартным поведением `<input type="checkbox">`.
Не используй когда: нужен сложный многошаговый выбор или компонент с нестандартной семантикой (тогда лучше другой control).

---

## Варианты и props

### Обязательные props

Обязательных custom-props нет.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `checked` | `boolean` | — | Состояние чекбокса (controlled). Передаётся через стандартные props `<input>`. |
| `defaultChecked` | `boolean` | — | Состояние чекбокса (uncontrolled). Передаётся через стандартные props `<input>`. |
| `disabled` | `boolean` | `false` | Блокирует взаимодействие и меняет визуальное состояние. |
| `bulk` | `boolean` | `false` | Влияет на отображаемую иконку (используется bulk-иконка). Видимость checkmark всё равно определяется состоянием `checked`. |
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер: `SM` / `MD` / `LG`. |
| `children` | `React.ReactNode` | — | Контент лейбла рядом с чекбоксом. Если `children` нет — класс `.nonempty` не применяется. |
| `labelAttributes` | `React.LabelHTMLAttributes<HTMLLabelElement>` | — | Дополнительные HTML-атрибуты для корневого `<label>` (например, `className`, `onFocus`). |
| `...inputAttributes` | `Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" \| "size">` | — | Все стандартные атрибуты `<input type="checkbox">` (включая `name`, `onChange`, `aria-label` и т.д.). |

### Ограничения использования

- DOM-структура фиксирована: корневой `<label>` → `<input type="checkbox">` → декоративные `<span>` / `<svg>` для отрисовки фона и галочки.
- `ref` прокидывается на внутренний `<input type="checkbox">`.

---

## Дизайн-токены

```
--triplex-next-Checkbox-Background_Default
--triplex-next-Checkbox-BorderColor_Default
--triplex-next-Checkbox-Checkmark_Fill_Default
--triplex-next-Checkbox-Background_Hover
--triplex-next-Checkbox-BorderColor_Hover
--triplex-next-Checkbox-Background_Checked_Default
--triplex-next-Checkbox-BorderColor_Checked_Default
--triplex-next-Checkbox-Background_Disabled
--triplex-next-Checkbox-BorderColor_Disabled
--triplex-next-Checkbox-Background_Checked_Disabled
--triplex-next-Checkbox-BorderColor_Checked_Disabled
--triplex-next-Checkbox-Checkmark_Fill_Disabled
--triplex-next-Checkbox-BorderColor_Focus
--triplex-next-Checkbox-Background_Checked_Hover
```

---

## Инварианты

- `forwardRef` на компоненте обязателен и должен указывать на `<input>`.
- Корневой DOM-элемент компонента — `<label>`, внутри которого находится `<input>`.
- `className` и `size` — публичные части внешнего контрактного API: не менять семантику без согласования.

---

## Accessibility

- Компонент использует нативный `<input type="checkbox">`, поэтому поддерживает стандартную клавиатурную навигацию (Tab + Space) и семантику формы.
- Библиотека мультиязычная: текст `aria-label` / `title` не захардкожен в компоненте. При необходимости потребитель передаёт `aria-*` через `...inputAttributes`.

---

## Связанные компоненты

- `CheckboxXGroup` — группировка чекбоксов по оси X.
- `CheckboxYGroup` — группировка чекбоксов по оси Y.
- `CheckboxTree` — декларативное дерево чекбоксов (обёртка над `CheckboxTreeExtended`), поддерживает bulk-логику и распространение состояния checked по родителям/детям.
- `CheckboxTreeExtended` — расширенное дерево чекбоксов на базе `CollapsableTree` с `Node` / `Checkbox` подкомпонентами (использует нативный `Checkbox` внутри для каждого узла).

---

## Stories

Основные истории: `stories/Checkbox/Checkbox.stories.tsx`
Файлы примеров: `stories/Checkbox/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль основных props |
| `Default` | `DefaultExample.tsx` | Минимальное использование |
| `Sizes` | `SizesExample.tsx` | Размеры `SM` / `MD` / `LG` |
| `XGroup` | `XGroupExample.tsx` | Группа по оси X |
| `YGroup` | `YGroupExample.tsx` | Группа по оси Y |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-16 | Приведение `Checkbox` к AI-ready: соблюдены правила `docs/ai/codestyle.md`, добавлена AI-документация и unit-тест на передачу `className` корневому `label`. |
| 2026-04-27 | Приведён в соответствие с `docs/ai/template-AI.md`: убрана секция «Ключевые особенности реализации» (содержимое перенесено в `Ограничения использования`), переставлены секции (Accessibility после Инвариантов), добавлена колонка `Example file`. |
