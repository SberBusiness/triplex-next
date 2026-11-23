---
component: CheckboxTreeExtendedNode
category: Inputs
related: [CheckboxTreeExtended, CollapsibleTreeExtendedNode]
tokens:
  - Checkbox.BorderColor_Focus
stories: stories/CheckboxTreeExtended/CheckboxTreeExtended.stories.tsx
version: "1.0"
---

# CheckboxTreeExtendedNode

## Назначение

Узел декларативного дерева чекбоксов. Используется как `CheckboxTreeExtended.Node`
внутри `CheckboxTreeExtended`: формирует заголовок с чекбоксом и отступы вложенных
веток, передаёт состояние активности в render-функцию `checkbox`. Семантику узла и
регистрацию в дереве получает через `CollapsibleTreeExtended.Node` от `TreeView`.

Используй когда: дерево собирается вручную, а состояние выбора и связь родителя с
потомками контролирует потребитель. Узел сам не хранит `checked` / `bulk` и не
пересчитывает выбор дочерних чекбоксов.

Не используй когда: нужен готовый каскадный выбор по массиву данных — для этого
есть `CheckboxTree`; нужен сворачиваемый узел с произвольным заголовком — используй
`CollapsibleTreeExtended.Node`.

Основное обращение в копируемых примерах — через родителя:

```tsx
import { CheckboxTreeExtended } from "@sberbusiness/triplex-next";

<CheckboxTreeExtended>
    <CheckboxTreeExtended.Node
        id="item"
        checkbox={(props) => <CheckboxTreeExtended.Checkbox {...props}>Значение</CheckboxTreeExtended.Checkbox>}
    />
</CheckboxTreeExtended>;
```

Именованные экспорты `CheckboxTreeExtendedNode`, `ICheckboxTreeExtendedNodeProps`
и `ICheckboxTreeExtendedCheckboxProvideProps` также доступны через публичный
barrel семейства и корень пакета. Тип props нужен, например, для собственной
обёртки узла; deep import из `components/CheckboxTreeExtended/components/` не нужен.

---

## Варианты и props

### Идентификация и порядок

| Prop | Назначение и ограничения |
|---|---|
| `id` | Обязательный идентификатор, уникальный в пределах дерева. Используется и как DOM `id`, и для регистрации в `TreeView`; сохраняй его стабильным в течение жизни узла |
| `prevNodeId` / `nextNodeId` | Унаследованы через `ICollapsibleTreeExtendedNodeProps` от `ITreeViewNodeProps`. Задают позицию при регистрации: после / перед уже зарегистрированным соседом того же уровня. Без найденного соседа сохраняется порядок рендера; перестановка DOM сама по себе порядок зарегистрированных узлов не меняет |

### Содержимое и состояние

| Prop | Назначение и ограничения |
|---|---|
| `checkbox` | Обязательная render-функция, возвращающая `JSX.Element`. Полученные `active` / `opened` передавай в `CheckboxTreeExtended.Checkbox`, чтобы сохранить передачу фокуса при навигации |
| `children` | Вложенные узлы `CheckboxTreeExtended.Node`, обычный `React.ReactNode`. Заголовок и тело формируются самим компонентом; `renderHeader` / `renderBody` исключены из публичного типа |
| `opened` | Унаследован от нижнего слоя, но при текущем `isStaticCheckboxTreeExtended = true` игнорируется: узел всегда раскрыт, включая `opened={false}` |
| `toggle` / `onToggle` | Унаследованы от `CollapsibleTreeExtended.Node` и передаются ему. В статичном дереве UI раскрытия отсутствует, `checkbox` не получает `toggle`; изменение выбора чекбокса не вызывает эти callback'и. В нижнем слое `toggle` запрашивает состояние раскрытия, `onToggle` сообщает его после анимации |

Аргумент `checkbox` описан публичным `ICheckboxTreeExtendedCheckboxProvideProps`:

| Поле | Текущее поведение |
|---|---|
| `active` | Флаг активности текущего узла из `TreeView`. Передаётся и веткам, и листьям, поскольку в статичном режиме фокус получает чекбокс |
| `opened` | Всегда `true` в статичном режиме |

`checked`, `bulk`, `disabled`, подпись и обработчик `onChange` задаются на чекбоксе
внутри render-функции. У Node отдельного состояния выбора или prop `size` нет:
размер заголовка читается из `CheckboxTreeExtendedContext`, который заполняет
родитель. По умолчанию это `MD`, в мобильном представлении родитель всегда
передаёт `MD`.

### DOM-атрибуты и события

`className` объединяется через `clsx` с `checkboxTreeExtendedNode` на корневом
`<li>`. Остальные HTML-атрибуты, включая `aria-*`, `data-*`, `onClick`, `onFocus`
и `onBlur`, уходят через нижние слои на этот же элемент. `TreeView` сохраняет
`role="treeitem"` и `aria-expanded` за собой; пользовательские `onFocus` / `onBlur`
вызываются после внутренней смены активности с исходным событием.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значение по умолчанию —
`src/components/DesignTokens/components/Checkbox.ts`.

Собственных токенов у узла нет. Единственный токен в общем модуле
`styles/CheckboxTreeExtended.module.less` используется внутренней стрелкой
раскрытия, сохранённой для будущего сворачиваемого режима:

```text
Checkbox.BorderColor_Focus
```

Пока дерево статично, стрелка не рендерится. Цвета и состояния самого чекбокса
определяет `Checkbox`. Заголовок узла задаёт вертикальный отступ 8px для `SM` и
12px для `MD` / `LG`; отступ вложенной ветки — соответственно 16px и 24px.

---

## Инварианты

- **Узел остаётся статичным.** `isStaticCheckboxTreeExtended = true`
  принудительно задаёт `opened={true}` нижнему слою и `opened: true` в
  render-функции; стрелка не рендерится даже у веток с детьми. Обе ветки флага
  оставлены намеренно до появления стандартного сворачиваемого дерева.
- **Компонент — `React.FC` без внешнего ref.** У Node нет `forwardRef` и ref на
  DOM в текущем API; не добавляй его попутно при рефакторинге. `forwardRef`
  родительского `CheckboxTreeExtended` сохраняется и отдаёт корневой `<ul>`.
- **Разметка узла — `<li role="treeitem">`.** Регистрация, активность,
  `aria-expanded` и порядок обхода принадлежат `TreeView`. Не переносить эту
  логику в Node и не менять нижние слои ради его документации.
- **Render-prop получает только `active` / `opened`.** Состояние выбора и
  обработка `onChange` остаются у потребителя; `children` передаются в тело
  узла, а не в заголовок.
- **Размер берётся из контекста.** Класс заголовка и отступ ветки должны
  соответствовать размеру дерева; `className` потребителя не затирает
  собственный класс узла.
- **`mousedown` отменяется только на самом контейнере заголовка**, когда
  `event.target === event.currentTarget`. События от label, input и любого
  другого потомка не должны отменяться этим guard.
- **Публичные имена и barrel-экспорты сохраняются:** `CheckboxTreeExtended.Node`,
  `CheckboxTreeExtendedNode`, оба интерфейса Node, а также
  `displayName = "CheckboxTreeExtendedNode"`.

---

## Accessibility

- Через `TreeView.Node` узел получает `role="treeitem"`, `aria-expanded="true"`
  и `tabIndex`: у первого узла первого уровня `0`, у остальных `-1`, если
  потребитель не переопределил `tabIndex` сам.
  Вложенные зарегистрированные узлы оборачиваются в `<ul role="group">`.
- Фокус внутри узла делает его активным. `TreeView` обрабатывает
  `ArrowDown` / `ArrowUp` и перемещает активность по видимым узлам с переходом
  через границы дерева; `active` из render-функции позволяет
  `CheckboxTreeExtended.Checkbox` перевести DOM-фокус на свой input.
  `Home` / `End` здесь не реализованы; стрелки раскрытия отсутствуют в
  статичном режиме.
- Пользовательский чекбокс должен обеспечивать доступную подпись. Для
  `CheckboxTreeExtended.Checkbox` это `children` либо `aria-label`, заданный
  потребителем. Node не добавляет текст и не назначает состояние `aria-checked`
  самому `treeitem` — состояние выбора принадлежит вложенному чекбоксу.
- `mousedown` на свободном месте заголовка отменяется, чтобы клик сбоку не
  переводил фокус на чекбокс. Взаимодействие с самим чекбоксом сохраняется.
- Известное ограничение нижнего слоя: на первом рендере возможен React warning
  о вложенных `<li>` до регистрации дочерних узлов и появления `TreeView.Group`.
  Это общее поведение семейства, описанное в `CheckboxTreeExtended-ai.md`.

---

## Связанные компоненты

- `CheckboxTreeExtended` — родитель, предоставляет размер через контекст и
  семантику дерева через `CollapsibleTreeExtended`; Node доступен его статическим
  полем `.Node`.
- `CollapsibleTreeExtendedNode` (`CollapsibleTreeExtended.Node`) — нижний слой,
  который Node рендерит и от которого наследует props. Соединяет заголовок и
  тело с `TreeView.Node` и accordion-логикой.
- `CheckboxTreeExtended.Checkbox` — получатель `active` / `opened` из
  render-функции. Добавляет оформление дерева к `Checkbox` и переводит на
  себя фокус при активности узла.
- `CheckboxTreeExtendedArrow` — внутренняя стрелка; в текущем статичном режиме
  отсутствует. Из публичного barrel не экспортируется.

---

## Stories

Отдельного набора stories у Node нет: существующие истории родителя показывают
статичное дерево, вложенность и все размеры. Node используется через
`CheckboxTreeExtended`, импортированный из корня пакета.

Основные истории: `stories/CheckboxTreeExtended/CheckboxTreeExtended.stories.tsx`
Файлы примеров: `stories/CheckboxTreeExtended/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Размер дерева с вложенными узлами |
| `Default` | `DefaultExample.tsx` | Рекурсивная сборка узлов, render-функция чекбокса и состояние выбора у потребителя |
| `Sizes` | `SizesExample.tsx` | Заголовки и отступы узлов для SM / MD / LG |

Интеграция: `stories/Chips/ChipMultiselect.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipMultiselect/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `WithCheckboxTree` | `WithCheckboxTreeExample.tsx` | Узлы в dropdown мультиселекта, фильтрация и каскадный выбор на стороне потребителя |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-21 | Создан документ. Зафиксированы статичный режим, render-prop, наследуемые props, публичные экспорты и передача активности из TreeView |
