---
component: CollapsibleTreeExtendedNode
category: CollapsibleTree
related: [CollapsibleTreeExtended, TreeViewNode]
tokens: []
stories: stories/CollapsibleTreeExtended/CollapsibleTreeExtended.stories.tsx
version: "1.0"
---

# CollapsibleTreeExtendedNode

## Назначение

Публичный узел `CollapsibleTreeExtended.Node`: связывает регистрацию узла в
`TreeView` с анимацией раскрытия из `AccordionBase`. Разметку видимой части и
раскрываемого содержимого задаёт потребитель через `renderHeader` и `renderBody`.

Используй когда: нужен собственный заголовок, содержимое или управление раскрытием
отдельного узла внутри `CollapsibleTreeExtended`.
Не используй когда: достаточно готового дерева из массива данных — используй
`CollapsibleTree`. Для самостоятельного аккордеона без семантики дерева подходит
`Accordion`.

Публичные импорты: `CollapsibleTreeExtendedNode` и интерфейсы
`ICollapsibleTreeExtendedNodeProps`, `ICollapsibleTreeExtendedNodeHeaderProvideProps`,
`ICollapsibleTreeExtendedNodeBodyProvideProps` из `@sberbusiness/triplex-next`.
В композиции предпочтителен доступ через `CollapsibleTreeExtended.Node`.

---

## Варианты и props

Наследует атрибуты узла из `ITreeViewNodeProps`, кроме `children`, и callbacks
`toggle` / `onToggle` из внутреннего `IAccordionBaseProps`.

### Обязательные props

| Prop | Описание |
|---|---|
| `id` | Уникальный идентификатор в пределах дерева; используется также для связи соседних узлов |
| `renderHeader` | Возвращает всегда видимую часть узла; получает открытость, функцию переключения и состояние дерева |
| `renderBody` | Возвращает раскрываемое содержимое; дочерние узлы передаются здесь, а не через `children` |

### Опциональные props

| Prop | По умолчанию | Описание |
|---|---|---|
| `opened` | `undefined` | При заданном boolean включает controlled-режим; `false` является заданным значением |
| `toggle` | — | Запрос нового состояния в controlled-режиме. Потребитель обновляет `opened`; без callback запрос ничего не меняет |
| `onToggle` | — | Получает итоговый boolean после завершения анимации, а не в момент запроса переключения |
| `prevNodeId`, `nextNodeId` | — | Положение относительно уже зарегистрированных соседей по контракту `TreeViewNode` |
| `className`, HTML-/`data-*`-/`aria-*`-атрибуты | — | Передаются в корневой `<li>` через `TreeView.Node`; `className` объединяется с базовым классом |
| `children` | Запрещён (`never`) | Содержимое задаётся только render-функциями |

### Состояние раскрытия

Режим определяется на каждом рендере условием `opened !== undefined`.

- В controlled-режиме все render-функции читают `opened` из props, а
  предоставленный им `toggle(nextOpened)` вызывает внешний `toggle`.
- В uncontrolled-режиме состояние хранится в абстрактном дереве `TreeView`;
  `toggle(nextOpened)` вызывает его `setOpenedNode`, внешний `toggle` игнорируется.
- Запрос уже установленного состояния ничего не делает. Переход между режимами
  поддерживается; при снятии `opened` действуют правила синхронизации `TreeViewNode`,
  сохранение прежнего раскрытия автоматически не гарантируется.

### Provide-props

| Поле | Где передаётся | Значение |
|---|---|---|
| `opened` | Header и body | Текущее раскрытие, выбранное по режиму управления |
| `toggle(nextOpened)` | Header и body | Запрашивает конкретное состояние, а не инвертирует его автоматически |
| `animating` | Header и body | Идёт анимация раскрытия или сворачивания |
| `activeNode` | Header и body | Активность в абстрактном дереве, не выбранность и не гарантия DOM-фокуса |
| `hasChildNodes` | Header и body | Есть зарегистрированные дочерние узлы, а не просто непустой `renderBody` |
| `isLastNode` | Только header | Узел последний на своём уровне и все его предки последние на своих уровнях |

При `hasChildNodes` содержимое автоматически оборачивается в `TreeView.Group`
(`<ul role="group">`). Без зарегистрированных детей `renderBody` рендерится без
этой группы: произвольное содержимое тоже может раскрываться, сам узел этого не
запрещает. Не размонтируй дочерние узлы при сворачивании — иначе исчезнет их
регистрация и изменится `hasChildNodes`.

---

## Дизайн-токены

Собственных дизайн-токенов нет: `tokens: []`. LESS-модуль
`styles/CollapsibleTreeExtended.module.less` задаёт только `visibility: hidden`
для свёрнутого содержимого. Оформление заголовка определяет потребитель;
готовый `CollapsibleTreeNodeHeader` использует токены группы `CollapsibleTree`.

---

## Инварианты

- Это публичный **class-компонент**: обычный `ref` указывает на экземпляр
  `CollapsibleTreeExtendedNode`, не на DOM. Сохранять этот контракт;
  перевод в FC / `forwardRef` требует отдельного согласования.
- Сохранять экспорт класса, трёх интерфейсов и статическое свойство
  `CollapsibleTreeExtended.Node`; `displayName` — `CollapsibleTreeExtendedNode`.
- Корневой DOM-элемент — `<li role="treeitem">` из `TreeView.Node`.
  Его `role` и `aria-expanded` не переопределяются внешними атрибутами.
- Проверку controlled-режима выполнять по `!== undefined` при каждом рендере.
  Не хранить режим в state и не считать `opened={false}` отсутствием значения.
- `renderHeader` и `renderBody` получают согласованное раскрытие и одинаковую
  семантику `toggle`; `onToggle` относится к завершению анимации.
- Сохранять обёртку `TreeView.Group` при наличии зарегистрированных детей и
  скрытие свёрнутого body без размонтирования.

---

## Accessibility

- Рендерить внутри `CollapsibleTreeExtended`: дерево предоставляет контекст,
  корневой `<ul role="tree">`, регистрацию и активность узлов.
- `TreeView.Node` задаёт `<li role="treeitem">`, `aria-expanded` и `tabIndex`.
  Первый узел верхнего уровня по умолчанию имеет `tabIndex=0`, остальные `-1`.
  Внешний `tabIndex` имеет приоритет: потребитель тогда отвечает за фокус сам.
- Заголовок произвольный. Потребитель задаёт доступное имя и клавиатурную
  активацию своего toggle-элемента; для типовой кнопки можно использовать
  `CollapsibleTreeNodeHeader`. Связь заголовка с body через `aria-controls`
  автоматически не предоставляется в provide-props этого узла.
- `TreeView` обрабатывает ArrowUp / ArrowDown только при наличии активного узла:
  меняет `activeNode`, но не переносит DOM-фокус. Home / End и раскрытие через
  ArrowLeft / ArrowRight не реализованы этим атомом.
- Свёрнутое содержимое скрывается через `visibility: hidden`, поэтому его
  элементы не участвуют в обычном Tab-переходе.

---

## Связанные компоненты

- [`CollapsibleTreeExtended`](./CollapsibleTreeExtended-ai.md) — родитель и
  compound-доступ `.Node`, предоставляет дерево через `TreeView`.
- [`TreeViewNode`](../TreeView/TreeViewNode-ai.md) — рендерится внутри, предоставляет
  интерфейс props, регистрацию, активность и семантику узла.
- `AccordionBase` — внутренняя зависимость: анимация body и callback `onToggle`.
- [`CollapsibleTreeNodeHeader`](../CollapsibleTree/CollapsibleTreeNodeHeader-ai.md)
  — готовая кнопка для `renderHeader`, принимающая его provide-props.

---

## Stories

Основные истории: `stories/CollapsibleTreeExtended/CollapsibleTreeExtended.stories.tsx`
Файлы примеров: `stories/CollapsibleTreeExtended/examples/`

Используются истории родителя, которые непосредственно рендерят `.Node`;
отдельный stories-файл атому не нужен.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Раскрытие веток и выбор оформления toggle |
| `Default` | `DefaultExample.tsx` | Вложенные controlled-узлы, `renderHeader` / `renderBody` и порядок соседей |
| `Custom toggle (Plus/Minus)` | `CustomToggleExample.tsx` | Произвольный header с кнопкой раскрытия |
| `VisualTests` | `VisualTestsExample.tsx` | Свёрнутые, раскрытые узлы и альтернативный toggle; существующие xs/xl baseline |

Unit-контракт: `src/components/CollapsibleTreeExtended/__tests__/CollapsibleTreeExtendedNode.test.tsx`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-03 | Создан документ; зафиксированы class-ref, режимы управления, render-props и завершение анимации. |
