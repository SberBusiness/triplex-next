---
component: TreeView
category: TreeView
related: [CollapsibleTreeExtended, CollapsibleTree]
tokens: []
stories: stories/TreeView/TreeView.stories.tsx
version: "1.0"
---

# TreeView

## Назначение

Каркас визуального дерева: семантическая разметка (`<ul role="tree">`,
`<li role="treeitem">`, `aria-expanded`), построение абстрактного дерева нод по
JSX-разметке, управление `tabIndex` и перемещение активной ноды стрелками
вверх/вниз. Собственного оформления у компонента нет — разметку узла целиком
рисует потребитель через render-функцию `children`.

Используй когда: нужен только каркас дерева (семантика, регистрация нод,
навигация стрелками), а весь UI узла — свой.

Не используй когда:
- нужно типовое дерево «папка/файл» с шевроном, hover и focus-visible —
  бери `CollapsibleTree`;
- нужен свой UI узла, но с анимацией раскрытия и controlled/uncontrolled
  состоянием — бери `CollapsibleTreeExtended`.

---

## Варианты и props

### `TreeView`

Class-компонент. Собственных props, кроме `children`, нет — остальное это
стандартные атрибуты `<ul>`.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Ноды дерева: `TreeView.Node` напрямую или компоненты-обёртки над ним |
| `...HTMLUListElementAttributes` | — | — | Все стандартные атрибуты `<ul>`; `className` мерджится с собственным классом |

Статические свойства: `TreeView.Node` (= `TreeViewNode`),
`TreeView.Group` (= `TreeViewGroup`).

### `TreeView.Node` (`TreeViewNode`)

Экспортируемый `TreeViewNode` — это `withTreeViewContext(TreeViewNodeWithContext)`,
то есть class-компонент, обёрнутый HOC-ом контекста.

Обязательные props:

| Prop | Тип | Описание |
|---|---|---|
| `id` | `string` | Идентификатор ноды, уникальный в пределах дерева. Используется абстрактным деревом для поиска и связывания нод |
| `children` | `(props: ITreeViewNodeProvideProps) => JSX.Element` | Render-функция разметки узла |

Опциональные props:

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `opened` | `boolean` | `false` | Состояние раскрытия. При смене синхронизируется в абстрактное дерево через `componentDidUpdate` |
| `prevNodeId` | `string` | — | Id ноды, после которой вставить текущую в абстрактное дерево |
| `nextNodeId` | `string` | — | Id ноды, перед которой вставить текущую в абстрактное дерево |
| `...HTMLAttributes` | — | — | Уходят на `<li>`; `className` мерджится, `onFocus`/`onBlur` вызываются после внутренних обработчиков |

### Provide-props render-функции (`ITreeViewNodeProvideProps`)

| Поле | Описание |
|---|---|
| `activeNode` | Нода активна при перемещении с клавиатуры |
| `openedNode` | Нода раскрыта (значение из абстрактного дерева) |
| `hasChildNodes` | У ноды есть **зарегистрированные** дочерние ноды |
| `isLastNode` | Нода последняя в дереве целиком (последняя на своём уровне и все её предки — последние). Используется для линий-коннекторов |
| `setOpenedNode(opened)` | Меняет состояние раскрытия во внутреннем состоянии `TreeView` |

### `TreeView.Group` (`TreeViewGroup`)

`<ul role="group">` — обёртка вложенных нод. `forwardRef` на `<ul>`,
`className` мерджится, остальные атрибуты пробрасываются. Собственных props нет.

### Порядок нод и `prevNodeId` / `nextNodeId`

Абстрактное дерево заполняется в **конструкторах** нод, то есть в порядке
рендера. `prevNodeId` / `nextNodeId` позволяют вставить ноду в произвольное
место уровня: порядок в абстрактном дереве (а значит и `isLastNode`, и порядок
обхода стрелками) может отличаться от порядка в разметке.

### Раскрытие и регистрация детей

`hasChildNodes` вычисляется по абстрактному дереву, поэтому дочерние ноды
должны быть **смонтированы**. Если размонтировать `TreeView.Group` в свёрнутом
состоянии, родитель узнает `hasChildNodes === false` и, например, не отрисует
шеврон. Рабочий приём (используется в stories и в `CollapsibleTreeExtended`) —
держать группу в разметке всегда, скрывая её стилями.

---

## Дизайн-токены

Собственных CSS-переменных компонент не определяет. `TreeView.module.less`
задаёт только сброс отступов и маркеров списка плюс `outline: none` на `<li>`
(focus-стиль рисует потребитель).

---

## Инварианты

- **`TreeView` и `TreeViewNodeWithContext` — class-компоненты.** Это legacy,
  зафиксированный публичным API: `ref` на `TreeView` отдаёт инстанс класса.
  Перевод на функциональные компоненты и добавление `forwardRef` — breaking
  change поведения `ref`. Не мигрировать без отдельного решения мейнтейнера.
- **Barrel `src/components/TreeView/index.ts`** экспортирует `TreeView`,
  `TreeViewNode`, `TreeViewGroup` и их типы (`ITreeViewProps`,
  `ITreeViewNodeProps`, `ITreeViewNodeProvideProps`,
  `ITreeViewNodePropsWithContext`, `ITreeViewGroupProps`). Состав и имена менять
  нельзя — от них зависят `CollapsibleTreeExtended` и `CollapsibleTree`.
- **`TreeViewContext` не экспортируется из barrel**, но `ITreeViewContext`
  транзитивно виден через `ITreeViewNodePropsWithContext`. Поле `updateCount`
  из контекста убирать нельзя без breaking change типа.
- **Абстрактное дерево мутируемое.** `TreeViewAbstractNode` меняется на месте,
  поэтому смена контекста сигнализируется числом `updateCount` в состоянии
  `TreeView`. Любая мутация дерева обязана сопровождаться его инкрементом,
  иначе ноды отрендерят устаревшие `hasChildNodes` / `isLastNode`.
- **Слушатель `keydown` висит на `window`**, а не на корневом `<ul>`: активная
  нода не обязана иметь DOM-фокус. Стрелки обрабатываются только когда в дереве
  есть активная нода.
- **`role="tree"` / `role="treeitem"` и `aria-expanded`** выставляются до
  `{...props}`, потребитель может их переопределить — но не должен.

---

## Accessibility

Ориентир — WAI-ARIA Authoring Practices,
[treeview-2a](https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html).

- Корень — `<ul role="tree">`, узел — `<li role="treeitem">` с `aria-expanded`,
  вложенная группа — `<ul role="group">` (`TreeView.Group`).
- **Roving tabindex:** первая нода первого уровня получает `tabIndex={0}`,
  остальные — `tabIndex={-1}`. Пересчитывается при регистрации и удалении нод,
  то есть в дерево можно попасть одним Tab.
- **Клавиатура:** `ArrowDown` / `ArrowUp` (по `event.keyCode`) переносят
  активную ноду на следующую/предыдущую с `preventDefault` (чтобы не скроллить
  страницу). Обход циклический: после последней ноды активной становится первая.
  Стрелки спускаются только в раскрытые (`opened`) ветки.
- **Активная нода ≠ DOM-фокус.** Активной нода становится по `focus`
  (`focusin` всплывает до `<li>`, дальше `stopPropagation`), а стрелки двигают
  только флаг активности в абстрактном дереве — DOM-фокус остаётся на исходном
  узле. Подсветку рисует потребитель по provide-prop `activeNode`. `blur`
  снимает активность.
- Раскрытие/сворачивание по клавиатуре (`ArrowRight`/`ArrowLeft`, `Home`/`End`)
  компонент **не** реализует — это на потребителе.
- Текстовые подписи и `aria-label` компонент не хардкодит: библиотека
  мультиязычная, всю разметку узла даёт потребитель.

---

## Связанные компоненты

- `CollapsibleTreeExtended` (`src/components/CollapsibleTreeExtended`) — обёртка
  над `TreeView`, добавляющая каждой ноде accordion-логику: анимацию раскрытия
  и controlled/uncontrolled состояние.
- `CollapsibleTree` (`src/components/CollapsibleTree`) — готовое дерево
  «папка/файл» поверх `CollapsibleTreeExtended`. Закрывает большинство
  прикладных случаев.
- `AbstractTreeNode` (`src/components/AbstractTree`) — базовая реализация
  абстрактного дерева, от которой наследуется `TreeViewAbstractNode`, и функция
  обхода `traverseAbstractTree`.

---

## Stories

Основные истории: `stories/TreeView/TreeView.stories.tsx`
Файлы примеров: `stories/TreeView/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `defaultOpened` и глубины вложенности |
| `Default` | `Default.tsx` | Минимальное дерево: плоский список `TreeView.Node` |
| `Nested` | `Nested.tsx` | Вложенность через `TreeView.Group`, раскрытие через prop `opened`, `hasChildNodes` |
| `Keyboard navigation` | `KeyboardNavigation.tsx` | Перемещение `activeNode` стрелками, подсветка активной ноды, `isLastNode` |
| `VisualTests` | `VisualTests.tsx` | Свёрнутое и раскрытое дерево в одном кадре, активная нода через `play` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-21 | Создан документ. AI-рефакторинг: починен счётчик `updateCount` (постфиксный инкремент не увеличивал значение), удалён мёртвый код, добавлены unit-тесты и stories. `TreeView.Group` получил `forwardRef` и перестал затирать собственный класс переданным `className`; после удаления ноды соседние ноды теперь перерисовываются (актуальные `hasChildNodes` / `isLastNode`) |
