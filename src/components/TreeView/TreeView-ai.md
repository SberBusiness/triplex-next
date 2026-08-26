---
component: TreeView
category: TreeView
related: [TreeViewNode, CollapsibleTreeExtended, CollapsibleTree]
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

Узел дерева со своим API: `id`, `opened`, `prevNodeId` / `nextNodeId`,
render-prop `children` с пятью provide-props, контракт по `focus` / `blur` и
`aria-expanded`. Props, инварианты, порядок регистрации нод и правила
раскрытия описаны в отдельном документе —
[`TreeViewNode-ai.md`](./TreeViewNode-ai.md).

### `TreeView.Group` (`TreeViewGroup`)

`<ul role="group">` — обёртка вложенных нод. `forwardRef` на `<ul>`,
`className` мерджится, остальные атрибуты пробрасываются. Собственных props нет.

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
  нода не обязана иметь DOM-фокус. Подписка живёт ровно столько, сколько в дереве
  есть активная нода: появляется на `focus` узла и снимается, как только фокус
  ушёл из дерева. Пока активной ноды нет, дерево не обрабатывает стрелки и не
  отменяет скролл страницы.
- **`role="tree"` / `role="treeitem"` / `role="group"` и `aria-expanded`**
  выставляются после `{...props}` — семантика дерева часть контракта компонента,
  потребитель её не переопределяет. `tabIndex` остаётся до спреда: roving
  tabindex — поведение, а не семантика, и его потребитель при желании может
  задать сам.

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
  Стрелки спускаются только в раскрытые (`opened`) ветки: `ArrowUp` с самой
  первой ноды дерева переходит на последнюю **видимую** ноду — если последняя
  ветка свёрнута, активной становится она сама, а не её скрытый потомок.
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

- `TreeViewNode` (`TreeView.Node`) — узел дерева, единственная часть семейства
  со своим API: render-prop `children`, регистрация в абстрактном дереве,
  focus/blur-контракт. См. [`TreeViewNode-ai.md`](./TreeViewNode-ai.md).
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
| 2026-08-26 | Описание `TreeView.Node` вынесено в отдельный `TreeViewNode-ai.md`, здесь оставлена ссылка |
| 2026-08-25 | Слушатель `keydown` подписан только пока в дереве есть активная нода: после ухода фокуса из дерева стрелки снова достаются странице. `role` и `aria-expanded` перенесены после `{...props}` — потребитель больше не может их переопределить |
| 2026-08-24 | `ArrowUp` с первой ноды дерева больше не заходит внутрь свёрнутой последней ветки — активной становится последняя видимая нода (`TreeViewAbstractNodeUtils.getPrevNode`) |
| 2026-08-21 | Создан документ. AI-рефакторинг: починен счётчик `updateCount` (постфиксный инкремент не увеличивал значение), удалён мёртвый код, добавлены unit-тесты и stories. `TreeView.Group` получил `forwardRef` и перестал затирать собственный класс переданным `className`; после удаления ноды соседние ноды теперь перерисовываются (актуальные `hasChildNodes` / `isLastNode`) |
