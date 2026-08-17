---
component: CheckboxTreeExtended
category: Inputs
related: [CheckboxTree, CollapsibleTreeExtended, Checkbox]
tokens:
  - --triplex-next-Checkbox-BorderColor_Focus
stories: stories/CheckboxTreeExtended/CheckboxTreeExtended.stories.tsx
version: "1.0"
---

# CheckboxTreeExtended

## Назначение

Низкоуровневое декларативное дерево чекбоксов. Обёртка над
`CollapsibleTreeExtended` (и, соответственно, над `TreeView`), которая задаёт
разметку и отступы веток, а размер чекбоксов раздаёт через контекст.

Дерево описывается вручную, узел за узлом: каждый узел — это
`CheckboxTreeExtended.Node` с render-функцией `checkbox`, а вложенные узлы
передаются в `children`. Состояние чекбоксов (`checked`, `bulk`) целиком на
стороне потребителя — компонент ничего не хранит и не пересчитывает.

Используй когда: нужна своя структура данных или своя логика связи родитель ↔
потомки (частичный выбор, ленивая загрузка ветки, произвольный контент рядом
с чекбоксом), либо дерево строится из уже готовой разметки.

Не используй когда: достаточно передать массив чекбоксов и получить готовую
логику каскадного выбора — для этого есть `CheckboxTree`, обёртка поверх этого
компонента.

---

## Варианты и props

### `CheckboxTreeExtended`

Наследует `ICollapsibleTreeExtendedProps` (то есть все атрибуты `<ul>`).

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер чекбоксов и вертикальных отступов веток. Раздаётся через контекст, в атрибуты DOM не попадает |
| `children` | `React.ReactNode` | — | Узлы `CheckboxTreeExtended.Node` |
| `className` | `string` | — | Мерджится с собственным классом корневого `<ul>` |

Составные части: `CheckboxTreeExtended.Node` (`CheckboxTreeExtendedNode`) и
`CheckboxTreeExtended.Checkbox` (`CheckboxTreeExtendedCheckbox`).

### `CheckboxTreeExtended.Node`

Наследует `ICollapsibleTreeExtendedNodeProps` без `children`, `renderBody`,
`renderHeader` — заголовок и тело узла формирует сам компонент.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `id` | `string` | — | Обязательный идентификатор узла в дереве |
| `checkbox` | `(props: ICheckboxTreeExtendedCheckboxProvideProps) => JSX.Element` | — | Render-функция чекбокса узла. Обязательна |
| `children` | `React.ReactNode` | — | Вложенные `CheckboxTreeExtended.Node` |
| `opened` | `boolean` | — | Игнорируется, пока дерево статично (см. «Инварианты») |
| `className` | `string` | — | Мерджится с собственным классом узла `<li>` |
| `prevNodeId` / `nextNodeId` | `string` | — | Порядок узлов для клавиатурной навигации `TreeView` |

`ICheckboxTreeExtendedCheckboxProvideProps` — то, что узел передаёт в `checkbox`:

| Поле | Описание |
|---|---|
| `active` | Узел активен при перемещении по дереву с клавиатуры. Нужен, чтобы чекбокс забрал фокус |
| `opened` | Узел раскрыт. Пока дерево статично — всегда `true` |

Эти props положено разворачивать прямо в `CheckboxTreeExtended.Checkbox`
(`checkbox={(props) => <CheckboxTreeExtended.Checkbox {...props} …>}`) — сам
чекбокс их обрабатывает и в DOM не пропускает.

### `CheckboxTreeExtended.Checkbox`

Обёртка над `Checkbox`: добавляет классы дерева, забирает `size` из контекста и
переводит на себя фокус, когда узел стал активным при навигации с клавиатуры.
Принимает все props `Checkbox` (`checked`, `bulk`, `onChange`, `disabled`,
`labelAttributes`, `children` …) плюс служебные `active` и `opened` из
render-функции узла.

`size`, переданный явно, перекрывает размер из контекста — так сделано намеренно
(spread props идёт после), но в дереве это не нужно и ломает единый ритм.

---

## Дизайн-токены

Собственных токенов компонент не вводит. Единственная CSS-переменная в стилях —
у стрелки раскрытия (см. «Инварианты», сейчас не отрисовывается):

```
--triplex-next-Checkbox-BorderColor_Focus
```

Размеры и цвета самих чекбоксов приходят из `Checkbox`, вертикальные отступы
задаются размером узла (`sm` — 8px, `md` / `lg` — 12px), отступ вложенной ветки
— 16px для `sm` и 24px для `md` / `lg`.

---

## Инварианты

- **Дерево статично.** Флаг `isStaticCheckboxTreeExtended = true`
  (`isStaticCheckboxTreeExtended.ts`) принудительно раскрывает все узлы и
  прячет стрелку раскрытия: `opened` на узле игнорируется, в `checkbox`
  всегда приходит `opened: true`, `CheckboxTreeExtendedArrow` не
  отрисовывается. Файл и обе ветки кода намеренно оставлены — по TODO флаг
  снимут, когда сворачиваемое дерево станет стандартом. Не удаляй ветки
  `!isStaticCheckboxTreeExtended` как «мёртвый код».
- **`forwardRef` нет ни у одной части** — `CheckboxTreeExtended`,
  `.Node` и `.Checkbox` объявлены как `React.FC`. Это осознанно и повторяет
  `CollapsibleTreeExtended`: под капотом class-компоненты `TreeView` /
  `TreeViewNode` с собственной работой с DOM. Добавление `forwardRef` меняет
  форму экспортируемого `ICheckboxTreeExtendedSFC` — это отдельное решение
  мейнтейнера, а не рефакторинг.
- **Публичный API** — имена `ICheckboxTreeExtendedProps`,
  `ICheckboxTreeExtendedSFC`, `ICheckboxTreeExtendedCheckboxProvideProps`,
  статические `Checkbox` / `Node` и barrel-экспорты `index.ts` менять нельзя:
  на них опирается `CheckboxTree`, а также stories `Chips` и `MultiselectField`.
- **`size` раздаётся только через контекст** `CheckboxTreeExtendedContext`. Не
  прокидывай его пропом по дереву — узлы и чекбоксы читают контекст сами.
- **В мобильном представлении размер всегда `MD`** (`useMobileView`), чтобы
  область нажатия оставалась достаточной. Значение `size` при этом не
  «запоминается» — оно возвращается при выходе из мобильного представления.
- **Содержимое узла — только через `checkbox` и `children`.** `renderHeader` /
  `renderBody` у `CollapsibleTreeExtended.Node` заняты и исключены из типа.
- **Корневой DOM** — `<ul role="tree">` от `TreeView`, узлы — `<li>`.

---

## Известные ограничения

Найдено при AI-рефакторинге (TRI-23). Оставлено намеренно — не «чини» их
походя, по каждому пункту есть решение.

- **`ICheckboxTreeExtendedNodeProps` не экспортируется**, хотя сам
  `CheckboxTreeExtendedNode` уходит в barrel. Потребитель не может
  типизировать свою обёртку узла. Экспорт расширяет публичный API (barrel),
  поэтому в TRI-23 не делался: ревьюер за экспорт, решение — за владельцем
  библиотеки. Пока вопрос открыт, тип остаётся приватным.
- **`CheckboxTreeExtendedArrow` разбирает клавиши через `event.keyCode`**
  (`EVENT_KEY_CODES`) — устаревший API. Миграция на `event.key` относится ко
  всему семейству `TreeView`.
- **`<li> cannot appear as a descendant of <li>`** — предупреждение React на
  первом рендере вложенных узлов. `<ul role="group">` (`TreeViewGroup`)
  отрисовывается только при `hasChildNodes`, а он берётся из
  `abstractNode.getChildren()`, который наполняется, когда дочерние узлы уже
  смонтировались. Лечится только в `TreeView` и задевает всё семейство
  (`CollapsibleTree`, `CollapsibleTreeExtended`, `CheckboxTree`,
  `CheckboxTreeExtended`), поэтому по решению ревьюера оставлено как есть.
  См. «Accessibility».

---

## Accessibility

- Семантику и клавиатурную навигацию (стрелки, Home/End, перемещение по узлам)
  обеспечивает `TreeView`. Компонент добавляет к ней только передачу фокуса.
- **Фокус при навигации с клавиатуры.** Узел сообщает в render-функцию
  `active`; `CheckboxTreeExtended.Checkbox` по этому флагу вызывает
  `focus()` на `<input>`. Правило ровно одно: фокус берётся, когда `active`
  и текущий `document.activeElement` **не содержит** чекбокс. Mount и update
  эффект не различает — при монтировании активного узла фокус не уезжает
  только потому, что `activeElement` по умолчанию `<body>`, а
  `body.contains(input)` истинно; если в этот момент фокус стоит на
  постороннем элементе, чекбокс заберёт его сразу на маунте. У стрелки
  поведение другое — там guard через `prevActive` даёт настоящий
  mount-иммунитет (фокус только на переходе `active` false → true). Когда
  флаг статичности снимут, у узлов с детьми фокус вместо чекбокса будет
  получать стрелка раскрытия.
- **Клик мимо чекбокса не наводит фокус**: `mousedown` по самому контейнеру
  заголовка (а не по label/чекбоксу) отменяется через `preventDefault`.
- Подпись чекбокса — `children` у `CheckboxTreeExtended.Checkbox`, она же
  связывает `<label>` и `<input>`. Для чекбокса без видимой подписи
  `aria-label` передаёт потребитель — библиотека мультиязычная.
- Стрелка раскрытия (пока не отрисовывается) — `role="button"`,
  `tabIndex={-1}`, обрабатывает `ArrowRight` / `ArrowLeft` (раскрыть /
  свернуть) и `Enter` / `Space` (инвертировать). Фокус она берёт в `useEffect`
  (пассивная фаза, после отрисовки), а не в layout-фазе, как было у прежнего
  class-компонента, — так же, как это делает `CheckboxTreeExtended.Checkbox`.
- Известное ограничение семейства: на первом рендере вложенные `<li>` попадают
  внутрь родительского `<li>` без обёртки `<ul role="group">` — `TreeView`
  добавляет группу только после регистрации дочерних узлов. Поведение общее с
  `CollapsibleTreeExtended`, лечится на уровне `TreeView`.

---

## Связанные компоненты

- `CheckboxTree` (`src/components/CheckboxTree`) — обёртка верхнего уровня:
  принимает массив `ICheckboxTreeCheckboxData` и сама пересчитывает `checked` /
  `bulk` вверх и вниз по дереву. Если своя структура данных не нужна — бери её.
- `CollapsibleTreeExtended` (`src/components/CollapsibleTreeExtended`) —
  нижний слой: узлы, accordion-логика и семантика дерева от `TreeView`.
  `ICheckboxTreeExtendedProps` наследует `ICollapsibleTreeExtendedProps`.
- `Checkbox` (`src/components/Checkbox`) — сам чекбокс; `CheckboxTreeExtended.Checkbox`
  добавляет к нему только классы дерева, размер из контекста и работу с фокусом.
- `CheckboxTreeExtendedArrow` — внутренняя стрелка раскрытия ветки, из barrel не
  экспортируется и сейчас не отрисовывается (см. «Инварианты»).

---

## Stories

Основные истории: `stories/CheckboxTreeExtended/CheckboxTreeExtended.stories.tsx`
Файлы примеров: `stories/CheckboxTreeExtended/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `size` |
| `Default` | `DefaultExample.tsx` | Дерево из двух веток с вложенным узлом, состояние чекбоксов в `useState` потребителя |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG рядом |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-17 | Создан документ. Проведён AI-рефакторинг: JSDoc на props, `CheckboxTreeExtendedArrow` переведён с class-компонента на FC, добавлен `displayName` у `CheckboxTreeExtendedNode`, класс состояния раскрытия узла берётся из CSS-модуля; добавлены unit-тесты на все части компонента |
| 2026-08-17 | `className` у `CheckboxTreeExtended.Node` больше не затирает собственный класс узла — классы мерджатся через `clsx` (правка по ревью PR #535) |
| 2026-08-17 | Убран мёртвый селектор `.checkboxTreeCheckbox` из мобильной медиа-выборки (рабочие `> span` и `> svg` оставлены), `.caretIconWrapper:focus` заменён на `:focus-visible` (правки по ревью PR #535) |
