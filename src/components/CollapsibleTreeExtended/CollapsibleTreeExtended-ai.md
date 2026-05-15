---
component: CollapsibleTreeExtended
category: CollapsibleTree
related: [CollapsibleTree, TreeView, AccordionBase]
tokens: []
stories: stories/CollapsibleTreeExtended/CollapsibleTreeExtended.stories.tsx
version: "1.0"
---

# CollapsibleTreeExtended

## Назначение

Низкоуровневое декларативное дерево с раскрывающимися узлами. Тонкая обёртка
над `TreeView`, дополняющая каждую ноду accordion-логикой (анимация раскрытия,
controlled/uncontrolled-состояние) через `CollapsibleTreeExtended.Node`.

Узел рендерится через две render-функции:

- `renderHeader` — видимая часть узла, всегда отрисовывается в `<li>`. Кнопка с
  шевроном, текст, иконка-toggle, бэйдж — любая разметка.
- `renderBody` — раскрываемое содержимое (обычно дочерние ноды, но может быть
  любым контентом).

Используй `CollapsibleTreeExtended` когда: нужен нестандартный UI узла (своя
иконка раскрытия, кликабельный header целиком, layout с несколькими колонками,
полный контроль состояния раскрытия из родителя).

Используй `CollapsibleTree` когда: достаточно типового UI «папка/файл» с
шевроном, hover и focus-visible. `CollapsibleTree` построен поверх
`CollapsibleTreeExtended` и закрывает большинство случаев.

---

## Варианты и props

### `CollapsibleTreeExtended`

FC-обёртка над `TreeView` без собственных props.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Дочерние `CollapsibleTreeExtended.Node` |
| `...HTMLUListElementAttributes` | — | — | Все стандартные атрибуты `<ul>` (наследуются от `TreeView`) |

Доступ к ноде: `CollapsibleTreeExtended.Node` (статическое свойство, ссылка на
`CollapsibleTreeExtendedNode`).

### `CollapsibleTreeExtended.Node` (`CollapsibleTreeExtendedNode`)

Обязательные props:

| Prop | Тип | Описание |
|---|---|---|
| `id` | `string` | Уникальный идентификатор ноды (наследуется из `TreeView.Node`) |
| `renderHeader` | `(props: ICollapsibleTreeExtendedNodeHeaderProvideProps) => React.ReactNode` | Видимая часть ноды |
| `renderBody` | `(props: ICollapsibleTreeExtendedNodeBodyProvideProps) => React.ReactNode` | Раскрываемое содержимое |

Опциональные props:

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `opened` | `boolean` | `undefined` | Контролируемое состояние раскрытия. Если задан — нода controlled |
| `toggle` | `(opened: boolean) => void` | — | Запрос на смену `opened` в controlled-режиме. Вызывается с новым значением |
| `onToggle` | `(opened: boolean) => void` | — | Колбэк по факту завершения анимации раскрытия/сворачивания |
| `children` | `never` | — | Запрещён — содержимое задаётся через `renderBody` |

### Provide-props в render-функциях

`renderHeader` получает `ICollapsibleTreeExtendedNodeHeaderProvideProps`:

| Поле | Описание |
|---|---|
| `opened` | Текущее состояние раскрытия |
| `toggle(opened)` | Функция смены `opened` (no-op при совпадении значений) |
| `animating` | Идёт ли анимация раскрытия (из `AccordionBase`) |
| `activeNode` | Текущая активная нода дерева (из `TreeView`) |
| `hasChildNodes` | Есть ли у текущей ноды дочерние |
| `isLastNode` | Последняя ли нода на своём уровне |

`renderBody` получает `ICollapsibleTreeExtendedNodeBodyProvideProps` — тот же
набор без `isLastNode`.

### Controlled vs uncontrolled

Режим вычисляется на **каждом** рендере по `props.opened !== undefined` —
переход controlled ↔ uncontrolled во время жизни ноды поддерживается.

- **Controlled** (`opened` задан): состояние читается из props, `toggle(next)`
  делегируется в `props.toggle`. `setOpenedNode` (внутреннее состояние
  `TreeView`) не вызывается.
- **Uncontrolled** (`opened === undefined`): состояние хранит `TreeView`,
  `toggle(next)` вызывает `setOpenedNode`. `props.toggle` не дергается.
- В обоих режимах `onToggle` срабатывает после завершения анимации
  раскрытия/сворачивания.

---

## Дизайн-токены

Собственных CSS-переменных компонент не определяет. Используется
`visibility: hidden` для скрытого содержимого (чтобы Tab не уходил в свёрнутую
ветку) — без токенов.

Анимация раскрытия и визуальные токены наследуются от `AccordionBase` и
`TreeView`.

---

## Инварианты

- **`CollapsibleTreeExtended.Node` — class-компонент.** Намеренное решение —
  не переписывать на FC + hooks без согласования. `forwardRef` к нему не
  применяется (классы используют обычный `ref`).
- **`CollapsibleTreeExtended` — FC без `forwardRef`.** Это тонкая обёртка
  `props → <TreeView>`, своего рендера нет; `ref` не имеет смысла, потому
  что под капотом — class-компонент `TreeView` с собственной обработкой
  фокуса.
- **Доступ к ноде только через `CollapsibleTreeExtended.Node`** (compound
  pattern). Прямой импорт `CollapsibleTreeExtendedNode` из barrel разрешён,
  но в потребительском коде предпочтительнее `.Node`.
- **Публичный API** — имена `ICollapsibleTreeExtendedNodeProps`,
  `ICollapsibleTreeExtendedNodeBodyProvideProps`,
  `ICollapsibleTreeExtendedNodeHeaderProvideProps`, `ICollapsibleTreeExtendedProps`,
  `ICollapsibleTreeExtendedSFC` и сигнатуры `toggle`, `onToggle`,
  `renderHeader`, `renderBody` — нельзя менять без breaking. Зависимости:
  `CollapsibleTree`, `CollapsibleTreeBranchNode`, `CollapsibleTreeLeafNode`.
- **`children: never` на `Node`** — содержимое задаётся только через
  `renderBody`. Передача `children` запрещена типом.
- **`opened` — controlled-флаг.** Считать `controlled = props.opened !== undefined`
  на каждом рендере. Не возвращать хранение режима в state (был баг, починен
  в 2026-05).
- **Корневой DOM** — `<ul>` от `TreeView`, узлы — `<li>` (см. accessibility).

---

## Accessibility

- Семантика дерева задаётся `TreeView` — корневой `<ul>`, узлы `<li>`, ветки
  оборачиваются в `<TreeView.Group>` (доп. `<ul role="group">`) при наличии
  детей.
- Клавиатурная навигация по дереву (стрелки, Home/End, раскрытие/сворачивание)
  обрабатывается на уровне `TreeView` — `CollapsibleTreeExtended` ничего не
  добавляет сверху.
- `aria-expanded`, `aria-label` на toggle-кнопке и любые другие aria-атрибуты
  узла **передаёт потребитель** в разметке `renderHeader`. Компонент не
  хардкодит текст и aria-атрибуты — библиотека мультиязычная и `renderHeader`
  по контракту произвольный.
- Свёрнутое `renderBody` получает `visibility: hidden` — фокус Tab не уходит
  в скрытое содержимое, но reflow сохраняется (важно для анимации).
- Активная нода (`activeNode` в provide-props) — это нода в фокусе клавиатуры
  `TreeView`, не selected-состояние. Визуальную подсветку реализует
  потребитель через `renderHeader`.

---

## Связанные компоненты

- `CollapsibleTree` (`src/components/CollapsibleTree`) — готовая обёртка
  верхнего уровня с типовым UI узла (шеврон, hover, focus-visible). Если
  нестандартный UI узла не нужен — используй её.
- `TreeView` (`src/components/TreeView`) — нижний слой: семантика дерева,
  абстрактное дерево нод, фокус, активная нода, клавиатурная навигация.
- `AccordionBase` (`src/components/AccordionBase`) — анимация раскрытия и
  `onToggle` после завершения анимации. Используется внутри каждой ноды.

---

## Stories

Основные истории: `stories/CollapsibleTreeExtended/CollapsibleTreeExtended.stories.tsx`
Файлы примеров: `stories/CollapsibleTreeExtended/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `defaultOpened` и `withCustomToggle` |
| `Default` | `DefaultExample.tsx` | Типовой UI: кнопка с шевроном для веток, плоский `div` для листьев (по сути воспроизводит `CollapsibleTree`) |
| `Custom toggle (Plus/Minus)` | `CustomToggleExample.tsx` | Альтернативная иконка раскрытия — Plus/Minus вместо шеврона |
| `VisualTests` | `VisualTestsExample.tsx` | Три состояния в одном кадре: collapsed, expanded, custom toggle — для baseline-скриншотов |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-05-15 | Создан документ. Зафиксирован фикс controlled-инварианта (режим вычисляется на каждом рендере) и пополнение stories (`Playground`, `VisualTests`) |
