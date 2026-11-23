---
component: CheckboxTreeExtendedCheckbox
category: Inputs
related: [CheckboxTreeExtended, Checkbox]
tokens:
  - Checkbox.Background_Default
  - Checkbox.BorderColor_Default
  - Checkbox.Checkmark_Fill_Default
  - Checkbox.Background_Hover
  - Checkbox.BorderColor_Hover
  - Checkbox.Background_Checked_Default
  - Checkbox.BorderColor_Checked_Default
  - Checkbox.Background_Disabled
  - Checkbox.BorderColor_Disabled
  - Checkbox.Background_Checked_Disabled
  - Checkbox.BorderColor_Checked_Disabled
  - Checkbox.Checkmark_Fill_Disabled
  - Checkbox.BorderColor_Focus
  - Checkbox.Background_Checked_Hover
stories: stories/CheckboxTreeExtended/CheckboxTreeExtended.stories.tsx
version: "1.0"
---

# CheckboxTreeExtendedCheckbox

## Назначение

Чекбокс узла декларативного `CheckboxTreeExtended`. Оборачивает базовый `Checkbox`,
добавляет классы дерева, получает размер из контекста и переводит фокус на input
активного узла. Состоянием выбора и связью родитель ↔ потомки управляет потребитель.

Публичное обращение — `CheckboxTreeExtended.Checkbox`. Именованного экспорта
`CheckboxTreeExtendedCheckbox` из пакета нет; собственный интерфейс props также
не экспортируется из barrel. Для типизации обёртки можно использовать
`React.ComponentProps<typeof CheckboxTreeExtended.Checkbox>`.

```tsx
import React from "react";
import { CheckboxTreeExtended } from "@sberbusiness/triplex-next";

export const TreeWithCheckbox = () => (
    <CheckboxTreeExtended>
        <CheckboxTreeExtended.Node
            id="account"
            checkbox={(props) => (
                <CheckboxTreeExtended.Checkbox {...props} defaultChecked>
                    Расчётный счёт
                </CheckboxTreeExtended.Checkbox>
            )}
        />
    </CheckboxTreeExtended>
);
```

Используй внутри render-функции `checkbox` узла, разворачивая её аргумент в
`CheckboxTreeExtended.Checkbox`. Для отдельного флажка вне дерева используй
`Checkbox`; для готового каскадного выбора по массиву данных — `CheckboxTree`.

---

## Варианты и props

Обязательных props нет. Наследует `ICheckboxProps`; сведения ниже описывают
особенности обёртки, полный набор нативных атрибутов доступен в исходном типе.

### Связь с узлом и размер

| Prop | Назначение и ограничения |
|---|---|
| `active` | Служебный признак активного узла из render-функции `checkbox`. При монтировании и изменении этого prop запускает проверку фокуса; сам в DOM не передаётся |
| `opened` | Принимается из той же render-функции, исключается из props input и ни на отрисовку, ни на фокус не влияет |
| `size` | Обычно берётся из `CheckboxTreeExtendedContext`: по умолчанию `MD`, в дереве — размер родителя. Явный prop перекрывает контекст, включая мобильный `MD`, потому что spread идёт после `size={size}`. Для единого ритма дерева оставляй его родителю |

### Выбор и доступность

| Prop | Назначение и ограничения |
|---|---|
| `checked`, `defaultChecked`, `onChange` | Нативное controlled/uncontrolled состояние input и событие изменения. Компонент не пересчитывает состояние соседних узлов |
| `bulk` | Меняет галочку на иконку частичного выбора. Для её видимости нужен `checked`; не задаёт нативный `indeterminate` или `aria-checked="mixed"` |
| `disabled` | Отключает нативный input и задаёт оформление disabled; браузер не переводит на него фокус |
| `children` | Видимая подпись и доступное имя чекбокса через вложенный `<label>` |

### Атрибуты и события

| Prop | Назначение и ограничения |
|---|---|
| `className` | Объединяется с классами базового Checkbox и дерева на корневом `<label>`, не попадает на input |
| `labelAttributes` | HTML-атрибуты корневого `<label>`. Его `className` сохраняется вместе с внутренними классами. `onFocus` вызывается обёрткой после проверки режима статичности дерева |
| `name`, `value`, `id`, `aria-*`, `data-*`, `onFocus` и остальные нативные props | Передаются базовому Checkbox на `<input type="checkbox">`; `onFocus` input отличается от `labelAttributes.onFocus` и всплывает к нему |

В текущем статичном режиме обёртка сама не останавливает всплытие focus от label:
сначала выполняется `labelAttributes.onFocus`, затем событие достигает ноды
дерева, если потребитель не остановил его. При `isStaticCheckboxTreeExtended = false`
обёртка сначала вызывает `event.stopPropagation()`, затем пользовательский
`labelAttributes.onFocus`. Не меняй этот порядок при объединении обработчиков.

---

## Дизайн-токены

Собственных токенов обёртка не вводит. Цвета и состояния приходят из базового
`Checkbox.module.less`; дерево добавляет отступы label и мобильную область нажатия.
Токен фокуса стрелки в общем LESS-файле семейства относится к
`CheckboxTreeExtendedArrow`, а не к отдельному элементу этой обёртки.

Переопределяются через `ThemeProvider` (prop `tokens`) — см.
`src/components/ThemeProvider/ThemeProvider-ai.md`, раздел «Как переопределять
токены». Значения по умолчанию — `src/components/DesignTokens/components/Checkbox.ts`.

```text
Checkbox.Background_Default
Checkbox.BorderColor_Default
Checkbox.Checkmark_Fill_Default
Checkbox.Background_Hover
Checkbox.BorderColor_Hover
Checkbox.Background_Checked_Default
Checkbox.BorderColor_Checked_Default
Checkbox.Background_Disabled
Checkbox.BorderColor_Disabled
Checkbox.Background_Checked_Disabled
Checkbox.BorderColor_Checked_Disabled
Checkbox.Checkmark_Fill_Disabled
Checkbox.BorderColor_Focus
Checkbox.Background_Checked_Hover
```

---

## Инварианты

- Публичный путь — `CheckboxTreeExtended.Checkbox`, `displayName` —
  `"CheckboxTreeExtendedCheckbox"`; существующие exports семейства сохраняются.
- Обёртка остаётся `React.FC` без внешнего `ref`/`forwardRef`: это текущий контракт.
  Внутренний `useRef<HTMLInputElement>` передаётся в `forwardRef` базового Checkbox
  и нужен для управления фокусом. Не подменять его публичным ref без отдельной задачи.
- Корневой DOM — `<label>` базового Checkbox с вложенным нативным input.
  `className` и `labelAttributes.className` сохраняются на label вместе с классом
  `checkboxTreeCheckboxLabel` и классами базового Checkbox; остальные нативные props — на input.
- `active` и `opened` не попадают в DOM. `opened` намеренно не используется;
  при статичном дереве Node передаёт `opened: true`.
- Эффект фокуса зависит только от `active`. Он не различает mount и update:
  если `active` истинно и `document.activeElement` не содержит текущий input,
  вызывается `input.focus()`. При неизменном `active` новый рендер не забирает
  фокус повторно. Не заменять проверку `contains` на сравнение элементов или
  проверку предыдущего `active`: это изменит поведение.
- Размер из контекста задаётся перед spread нативных props. Явный `size`
  должен сохранять возможность его перекрыть.
- Ветку `!isStaticCheckboxTreeExtended` в focus-обработчике label не удалять:
  она оставлена для будущего сворачиваемого режима семейства.
- В заголовке узла нижний margin label обнуляется, а на мобильной ширине
  добавляется padding сверху/снизу по 16 px. Вне `CheckboxTreeExtended.Node`
  эта раскладка не применяется.

---

## Accessibility

- Семантику формы и переключение по Space обеспечивает нативный
  `<input type="checkbox">`. `children` дают видимую подпись; без неё передай
  доступное имя, например `aria-label`. Язык выбирает потребитель.
- Семантика `tree`/`treeitem` и навигация между узлами принадлежат
  `CheckboxTreeExtended` и нижележащему `TreeView`. Обёртка реагирует только на
  переданный `active`, направляя фокус на input.
- При первом рендере активный чекбокс обычно не получает фокус: активным
  элементом является `<body>`, который содержит input. Если фокус стоит на
  постороннем элементе, активный чекбокс заберёт его уже на mount. Когда
  `active` меняется на `true` после клавиатурной навигации, действует та же проверка.
- В статичном режиме focus от label всплывает к Node и делает активным
  соответствующий узел. Пользовательский `labelAttributes.onFocus` может
  остановить всплытие; `preventDefault` сам по себе этот контракт не заменяет.
- Фокусное оформление использует `:focus-visible` базового Checkbox; hover
  включается только на устройствах с `hover: hover`. `bulk` описывает иконку,
  а доступное mixed-состояние автоматически не создаётся.
- Ограничение начальной разметки вложенных узлов (`li` внутри `li` до регистрации
  группы) описано в `CheckboxTreeExtended-ai.md` и исправляется на уровне `TreeView`.

---

## Связанные компоненты

- `CheckboxTreeExtended` — родитель; владеет контекстом размера и предоставляет
  `.Node`, чья render-функция передаёт `active` / `opened` в `.Checkbox`.
- `Checkbox` — непосредственно рендерится обёрткой; её props наследуют
  `ICheckboxProps`. Отвечает за input, label, состояния и визуальные токены.

---

## Stories

Основные копируемые примеры переиспользуются из историй родителя.

Основные истории: `stories/CheckboxTreeExtended/CheckboxTreeExtended.stories.tsx`
Файлы примеров: `stories/CheckboxTreeExtended/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Размер родительского дерева |
| `Default` | `DefaultExample.tsx` | Публичное обращение `.Checkbox`, передача provide-props и controlled-состояние потребителя |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG с подписями и единым размером дерева |
| `VisualTests` | `VisualTests.tsx` | SM / MD / LG в checked, checked bulk и disabled, реальный клавиатурный фокус в дереве (только SM — фокус в документе один) и hover выбранного input; мобильная раскладка |

Композиционный пример: `stories/Chips/ChipMultiselect.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipMultiselect/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `WithCheckboxTree` | `WithCheckboxTreeExample.tsx` | Дерево внутри ChipMultiselect, пересчёт checked/bulk и фильтрация на стороне потребителя; исключён из скриншотов |

`Playground` и `VisualTests` исключаются из MCP bundle. Focus/hover-состояния
проверяются после play и перемонтирования истории на двух viewport: xs / xl.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-21 | Создан документ: описаны публичный compound-путь, наследуемые props, размер из контекста, точный эффект фокуса и порядок label onFocus. Добавлены проверки недостающих контрактов и визуальных состояний без изменения production-кода. |
