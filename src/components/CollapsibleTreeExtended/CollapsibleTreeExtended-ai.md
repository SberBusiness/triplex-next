---
component: CollapsibleTreeExtended
category: CollapsibleTree
related: [CollapsibleTreeExtendedNode, CollapsibleTree, TreeView, TreeViewNode]
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

`forwardRef`-обёртка над `TreeView` без собственных props. `ref` уходит насквозь
и указывает на корневой `<ul role="tree">`.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Дочерние `CollapsibleTreeExtended.Node` |
| `...HTMLUListElementAttributes` | — | — | Все стандартные атрибуты `<ul>` (наследуются от `TreeView`) |

Доступ к ноде: `CollapsibleTreeExtended.Node` (статическое свойство, ссылка на
`CollapsibleTreeExtendedNode`). Полный контракт —
[CollapsibleTreeExtendedNode-ai.md](./CollapsibleTreeExtendedNode-ai.md).

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
| `toggle(opened)` | Функция смены `opened`. Controlled — передаёт каждый запрос во внешний `toggle`; uncontrolled — значение, совпадающее с текущим, пропускается |
| `animating` | Идёт ли анимация раскрытия (из `AccordionBase`) |
| `activeNode` | Текущая активная нода дерева (из `TreeView`) |
| `hasChildNodes` | Есть ли у текущей ноды дочерние |
| `isLastNode` | Нода последняя на своём уровне и все её предки последние на своих уровнях |

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
  применяется: обычный `ref` указывает на экземпляр `CollapsibleTreeExtendedNode`,
  не на DOM-элемент.
- **`ref` указывает на корневой `<ul role="tree">`.** Компонент — тонкая обёртка
  `props → <TreeView>` без своего рендера, поэтому `ref` просто уходит насквозь
  в `TreeView`, который и отдаёт корневой `<ul>`.
- **Доступ к ноде только через `CollapsibleTreeExtended.Node`** (compound
  pattern). Прямой импорт `CollapsibleTreeExtendedNode` из barrel разрешён,
  но в потребительском коде предпочтительнее `.Node`.
- **Публичный API** — имена `ICollapsibleTreeExtendedNodeProps`,
  `ICollapsibleTreeExtendedNodeBodyProvideProps`,
  `ICollapsibleTreeExtendedNodeHeaderProvideProps`, `ICollapsibleTreeExtendedProps`,
  `ICollapsibleTreeExtendedFC` (и deprecated-алиас `ICollapsibleTreeExtendedSFC`)
  и сигнатуры `toggle`, `onToggle`,
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
- `TreeView` обрабатывает ArrowUp / ArrowDown при наличии активной ноды:
  меняет `activeNode`, но не переносит DOM-фокус. Home / End и раскрытие по
  ArrowLeft / ArrowRight не реализованы. `CollapsibleTreeExtended` не добавляет
  клавиатурных обработчиков.
- `TreeView.Node` задаёт `role="treeitem"` и `aria-expanded` на `<li>`.
  Доступное имя и атрибуты toggle-кнопки **передаёт потребитель** в разметке
  `renderHeader`; библиотека не хардкодит локализованные строки.
- Свёрнутое `renderBody` получает `visibility: hidden` — фокус Tab не уходит
  в скрытое содержимое, но reflow сохраняется (важно для анимации).
- Активная нода (`activeNode` в provide-props) — текущая нода навигации
  `TreeView`, не selected-состояние и не гарантия DOM-фокуса. Визуальную подсветку реализует
  потребитель через `renderHeader`.

---

## Связанные компоненты

- [`CollapsibleTreeExtendedNode`](./CollapsibleTreeExtendedNode-ai.md) — публичная
  часть `.Node`: render-props, controlled/uncontrolled-режимы и class-ref.
- `CollapsibleTree` (`src/components/CollapsibleTree`) — готовая обёртка
  верхнего уровня с типовым UI узла (шеврон, hover, focus-visible). Если
  нестандартный UI узла не нужен — используй её.
- `TreeView` (`src/components/TreeView`) — нижний слой: семантика дерева,
  абстрактное дерево нод, фокус, активная нода, клавиатурная навигация.
- `TreeViewNode` (`TreeView.Node`) — узел, который оборачивает каждая нода
  `CollapsibleTreeExtended`: `ICollapsibleTreeExtendedNodeProps` наследует
  `Omit<ITreeViewNodeProps, "children">`, поэтому `id`, `opened`, `prevNodeId`,
  `nextNodeId` и остальные props узла работают здесь так же, как у голой ноды.
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
| 2026-07-06 | В story-примерах шеврон открытого узла теперь указывает вверх (`rotate(-90deg)`), а не вниз — синхронно с `CollapsibleTree` |
| 2026-07-14 | В story-примерах на кнопку заголовка добавлены глобальные классы icons-next: `hoverable` всегда и `active` при `opened` — цвет иконки раскрытия, синхронно с `CollapsibleTreeNodeHeader` |
| 2026-08-26 | В `related` добавлен `TreeViewNode` — у узла появился собственный AI.md, и он точный адресат наследования `ICollapsibleTreeExtendedNodeProps` |
| 2026-09-17 | TRI-22: `CollapsibleTreeExtended` обёрнут `forwardRef` — `ref` отдаёт корневой `<ul>`; тип переименован в `ICollapsibleTreeExtendedFC`, старое имя оставлено deprecated-алиасом |
| 2026-10-16 | При сверке ROADMAP с публичными экспортами внутренний `AccordionBase` исключён из `related`; описание зависимости сохранено в «Связанные компоненты». |
| 2026-11-09 | TRI-180: `toggle` из render-props в controlled-режиме передаёт во внешний `toggle` каждый запрос, включая совпадающий с текущим `opened`; в uncontrolled-режиме последовательные вызовы применяются по актуальному состоянию ноды |
