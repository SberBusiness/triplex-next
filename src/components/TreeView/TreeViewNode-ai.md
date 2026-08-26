---
component: TreeViewNode
category: TreeView
related: [TreeView]
tokens: []
stories: stories/TreeView/TreeView.stories.tsx
version: "1.0"
---

# TreeViewNode

## Назначение

Узел визуального дерева `TreeView` (доступен также как `TreeView.Node`). Рендерит
`<li role="treeitem">` с `aria-expanded` и `tabIndex`, регистрирует себя в
абстрактном дереве `TreeView`, обрабатывает `focus`/`blur` для перемещения
активной ноды с клавиатуры и отдаёт потребителю пять provide-props через
render-функцию `children`.

Собственного оформления у ноды нет: она добавляет только семантику и сброс
маркеров списка — всю разметку узла (шеврон, подпись, линии-коннекторы,
подсветку активного состояния) рисует потребитель.

Используй когда: строишь дерево на `TreeView` и нужен полный контроль над
разметкой узла.

Не используй когда:
- нужно типовое дерево «папка/файл» с шевроном, hover и focus-visible — бери
  `CollapsibleTree`;
- нужен свой UI узла, но с анимацией раскрытия и controlled/uncontrolled
  состоянием — бери `CollapsibleTreeExtended`, он оборачивает `TreeView.Node`
  и добавляет accordion-логику;
- узел нужен вне `TreeView` — вне провайдера контекста нода получает
  `initialTreeContext`, где `registerNode` и остальные методы пустые: `<li>`
  отрисуется, но в дерево нода не попадёт, `tabIndex` останется `-1`,
  `hasChildNodes` всегда будет `false` (дети не регистрируются), а
  `isLastNode` — всегда `true` (у ноды нет родителя).

---

## Варианты и props

Экспортируемый `TreeViewNode` — это `withTreeViewContext(TreeViewNodeWithContext)`,
то есть class-компонент, обёрнутый HOC-ом контекста. Prop `treeViewContext`
подставляет HOC, снаружи его передавать не нужно.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `id` | `string` | Идентификатор ноды, уникальный в пределах дерева. По нему абстрактное дерево ищет и связывает ноды, на него ссылаются `prevNodeId` / `nextNodeId` соседей |
| `children` | `(props: ITreeViewNodeProvideProps) => JSX.Element` | Render-функция разметки узла. Не ReactNode: нода отдаёт своё состояние только через аргумент |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `opened` | `boolean` | `false` | Состояние раскрытия. Синхронизируется в абстрактное дерево в конструкторе и далее в `componentDidUpdate` при смене значения |
| `prevNodeId` | `string` | — | Id ноды, после которой вставить текущую в абстрактное дерево |
| `nextNodeId` | `string` | — | Id ноды, перед которой вставить текущую в абстрактное дерево |
| `...HTMLAttributes` | — | — | Уходят на `<li>`. `className` мерджится с собственным классом, `onFocus` / `onBlur` вызываются после внутренних обработчиков |

`ITreeViewNodeProps` расширяет `Omit<React.HTMLAttributes<HTMLElement>, "children">` —
`children` переопределён под render-функцию намеренно.

### Provide-props render-функции (`ITreeViewNodeProvideProps`)

| Поле | Описание |
|---|---|
| `activeNode` | Нода активна при перемещении с клавиатуры. Подсветку рисует потребитель |
| `openedNode` | Нода раскрыта — значение из абстрактного дерева, а не из prop `opened` |
| `hasChildNodes` | У ноды есть **зарегистрированные** дочерние ноды |
| `isLastNode` | Нода последняя в дереве целиком (последняя на своём уровне и все её предки — последние). Используется для линий-коннекторов |
| `setOpenedNode(opened)` | Пишет флаг раскрытия в абстрактную ноду и инкрементит `updateCount` в `TreeView` для перерендера. Uncontrolled-путь: prop `opened` при этом не меняется |

### Порядок нод и `prevNodeId` / `nextNodeId`

Абстрактное дерево заполняется в **конструкторах** нод, то есть в порядке
рендера. `prevNodeId` / `nextNodeId` позволяют вставить ноду в произвольное
место уровня: порядок в абстрактном дереве (а значит `isLastNode` и порядок
обхода стрелками) может отличаться от порядка в разметке. Ссылаться можно
только на **уже зарегистрированную** ноду: к моменту конструктора текущей ноды
конструктор соседа должен был отработать — монтирование при этом не требуется,
оно происходит позже. Id соседей выводят из массива данных
`CollapsibleTree` и `CheckboxTree`; `CollapsibleTreeExtended` своего массива не
имеет и пробрасывает `prevNodeId` / `nextNodeId` как есть от потребителя.

Промаха по id компонент не сигнализирует — оба prop'а деградируют молча. Ноду с
указанным id ищут **в поддереве текущего родителя**, а не по всему дереву;
если она там не нашлась или не является прямым ребёнком того же родителя,
позиция вставки получается непредсказуемой. Конкретное место при промахе —
**деталь текущей реализации `AbstractTreeNode.addChild`, а не контракт**
(индексная арифметика `splice` в классе, общем для всех абстрактных деревьев),
тестами не закреплена и полагаться на неё нельзя. Правильное употребление одно:
ссылаться только на существующую соседнюю ноду того же уровня.

### Раскрытие и регистрация детей

`hasChildNodes` вычисляется по абстрактному дереву, поэтому дочерние ноды
должны быть **смонтированы**. Если размонтировать `TreeView.Group` в свёрнутом
состоянии, родитель получит `hasChildNodes === false` и, например, не отрисует
шеврон. Рабочий приём (используется в stories и в `CollapsibleTreeExtended`) —
держать группу в разметке всегда, скрывая её стилями.

---

## Дизайн-токены

Собственных CSS-переменных нода не определяет. Класс `treeViewNode` в
`styles/TreeView.module.less` задаёт только сброс отступов и маркера списка
плюс `outline: none` — focus-стиль рисует потребитель.

---

## Инварианты

- **`TreeViewNodeWithContext` — class-компонент, и `forwardRef` на нём нет.**
  Регистрация в абстрактном дереве происходит в **конструкторе** (до маунта
  детей), а снятие — в `componentWillUnmount`; порядок этих вызовов и есть
  порядок нод в дереве. Перевод на функциональный компонент меняет момент
  регистрации и ломает `prevNodeId` / `nextNodeId`. Не мигрировать без
  отдельного решения мейнтейнера.
- **Корневой DOM-элемент — `<li>`.** Менять тег нельзя: `role="treeitem"`
  валиден только внутри `<ul role="tree">` / `<ul role="group">`.
- **`role="treeitem"` и `aria-expanded` выставляются после `{...props}`** —
  семантика узла часть контракта компонента, потребитель её не переопределяет.
  `tabIndex` остаётся **до** спреда: roving tabindex — поведение, а не
  семантика, и потребитель при желании может задать его сам.
- **`event.stopPropagation()` в `handleFocus` / `handleBlur` обязателен.**
  `focusin` всплывает, и без остановки активной становилась бы не текущая нода,
  а её родитель. Пользовательские `onFocus` / `onBlur` вызываются после
  внутренней логики — порядок менять нельзя.
- **`children` — функция, а не `ReactNode`.** Смена сигнатуры — breaking change
  для всех потребителей (`CollapsibleTree`, `CheckboxTree`,
  `CollapsibleTreeExtended`).
- **Barrel `src/components/TreeView/index.ts`** реэкспортирует модуль ноды
  целиком (`export * from "./components/TreeViewNode"`), поэтому публичны и
  `TreeViewNode`, и класс `TreeViewNodeWithContext`, и типы
  `ITreeViewNodeProps`, `ITreeViewNodeProvideProps`,
  `ITreeViewNodePropsWithContext` — всё это через `src/components/index.ts`
  доходит до корня пакета. Состав и имена менять нельзя.
- **`displayName` класса — `"TreeViewNodeWithContext"`**, у экспортируемой
  обёртки — `"WithTreeViewContext(TreeViewNodeWithContext)"` (добавляет HOC).
  Значения видны в React DevTools и в snapshot-тестах.
- **Абстрактная нода мутируемая.** `this.abstractNode` меняется на месте, и сам
  по себе перерендер не вызывает: любая мутация должна идти через методы
  контекста (`setOpenedNode`, `setActiveNode`, `registerNode`, `removeNode`),
  которые инкрементят `updateCount` в состоянии `TreeView`. Прямая запись в
  `abstractNode` в обход контекста оставит ноду с устаревшими
  `hasChildNodes` / `isLastNode`.

---

## Accessibility

Ориентир — WAI-ARIA Authoring Practices,
[treeview-2a](https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html).

- Узел — `<li role="treeitem">` с `aria-expanded`, отражающим состояние
  раскрытия из абстрактного дерева. Вложенные ноды оборачиваются в
  `TreeView.Group` (`<ul role="group">`).
- **Roving tabindex.** `tabIndex` нода читает из абстрактной ноды
  (`getTabIndex()`): первая нода первого уровня получает `0`, остальные `-1`.
  Пересчитывает значения `TreeView` при регистрации и удалении нод — в дерево
  можно попасть одним Tab.
- **Активная нода ≠ DOM-фокус.** Активной нода становится по `focus`, а стрелки
  (`ArrowDown` / `ArrowUp`, обрабатываются в `TreeView` на `window`) двигают
  только флаг активности в абстрактном дереве — DOM-фокус остаётся на исходном
  узле. Потребитель обязан визуально отрисовать активное состояние по
  provide-prop `activeNode`, иначе клавиатурная навигация не видна.
- `blur` снимает активность; когда активной ноды в дереве не остаётся,
  `TreeView` отписывает слушатель стрелок.
- Раскрытие/сворачивание по клавиатуре (`ArrowRight` / `ArrowLeft`,
  `Home` / `End`) нода **не** реализует — это на потребителе, в его разметке
  узла.
- Текстовые подписи и `aria-label` нода не хардкодит: библиотека мультиязычная,
  всю разметку узла даёт потребитель. `aria-label` на дерево вешается на
  `TreeView`.

---

## Связанные компоненты

- `TreeView` (`src/components/TreeView`) — родительский компонент и владелец
  абстрактного дерева: регистрирует ноды, считает `tabIndex`, обрабатывает
  стрелки. Нода без него не работает.
- `TreeViewGroup` (`TreeView.Group`) — `<ul role="group">`, обёртка вложенных
  нод. Тривиальная обёртка (`forwardRef` + `clsx` + спред), отдельного AI.md
  нет.
- `CollapsibleTreeExtended` (`src/components/CollapsibleTreeExtended`) — обёртка
  над `TreeView.Node`, добавляющая анимацию раскрытия и
  controlled/uncontrolled состояние. Берут вместо голой ноды, когда свой UI
  узла нужен, а возиться с состоянием — нет.
- `CollapsibleTree` (`src/components/CollapsibleTree`) и `CheckboxTree`
  (`src/components/CheckboxTree`) — готовые деревья поверх ноды; оба
  протаскивают `prevNodeId` / `nextNodeId` из массива данных.

---

## Stories

Отдельных stories у ноды нет: без `TreeView` она не рендерится, а собственного
оформления у неё нет — все её состояния показаны в stories родителя. Ниже —
только те, что демонстрируют API самой ноды; полный список историй семейства
(`Playground`, `Default`) — в [TreeView-ai.md](./TreeView-ai.md).

Основные истории: `stories/TreeView/TreeView.stories.tsx`
Файлы примеров: `stories/TreeView/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Nested` | `Nested.tsx` | Вложенность через `TreeView.Group`, prop `opened`, provide-props `openedNode` и `hasChildNodes` |
| `Keyboard navigation` | `KeyboardNavigation.tsx` | Перемещение `activeNode` стрелками, подсветка активной ноды, `isLastNode` |
| `VisualTests` | `VisualTests.tsx` | Свёрнутая и раскрытая нода, узел с детьми и лист, `isLastNode`; активная нода снимается через `play` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-26 | Создан документ. Описание ноды вынесено из `TreeView-ai.md`. Добавлен unit-тест на `prevNodeId` — единственный публичный prop ноды, не покрытый тестами |
