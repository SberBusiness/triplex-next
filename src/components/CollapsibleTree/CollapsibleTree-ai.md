---
component: CollapsibleTree
category: CollapsibleTree
related: [CollapsibleTreeExtended, CollapsibleTreeNodeHeader, CollapsibleTreeNodeLabel, TreeView, AccordionBase]
tokens:
  - --triplex-next-CollapsibleTree-Header_Background_Hover
  - --triplex-next-CollapsibleTree-Header_Shadow_Focus
stories: stories/CollapsibleTree/CollapsibleTree.stories.tsx
version: "1.0"
---

# CollapsibleTree

## Назначение

Готовое дерево с раскрывающимися ветками и типовым UI узла: кнопка-заголовок с
шевроном-индикатором раскрытия, hover и focus-visible на интерактивной строке.
Обёртка над [`CollapsibleTreeExtended`](../CollapsibleTreeExtended/CollapsibleTreeExtended-ai.md).

Структура задаётся декларативно через массив `nodes`: ветка
(`ICollapsibleTreeNodeBranch`) с `label` и опциональными `children`, либо лист
(`ICollapsibleTreeNodeLeaf`) с произвольным `content`. На верхнем уровне
допустимы только ветки.

Используй `CollapsibleTree` когда: достаточно типового UI «папка/файл», нужен
шеврон, hover и focus-visible, и хочется задавать структуру через данные.

Используй `CollapsibleTreeExtended` когда: нужен нестандартный UI узла —
своя иконка раскрытия, кастомный header, особое поведение клика, layout с
несколькими колонками, полный контроль состояния раскрытия из родителя.

---

## Варианты и props

### `CollapsibleTree`

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `nodes` | `ICollapsibleTreeNodeBranch[]` | — | Данные дерева. На верхнем уровне — только ветки; листья — внутри `children` ветки |
| `children` | `never` | — | Запрещён — структура задаётся через `nodes` |
| `...HTMLUListElementAttributes` | — | — | Атрибуты `<ul>`, наследуются от `CollapsibleTreeExtended` → `TreeView` |

### Модель данных

`ICollapsibleTreeNodeBranch` — ветка:

| Поле | Тип | Описание |
|---|---|---|
| `id` | `string` | Уникальный идентификатор узла в дереве |
| `label` | `React.ReactNode` | Содержимое заголовка. Для типовой типографики — оборачивай в `CollapsibleTreeNodeLabel` |
| `children` | `TCollapsibleTreeNode[]` | Дочерние узлы. Пустой массив / `undefined` — ветка отображается без шеврона и не раскрывается |
| `defaultOpened` | `boolean` | Начальное состояние раскрытия |

`ICollapsibleTreeNodeLeaf` — лист:

| Поле | Тип | Описание |
|---|---|---|
| `id` | `string` | Уникальный идентификатор узла в дереве |
| `content` | `React.ReactNode` | Произвольный контент листа |

Type guard: `isCollapsibleTreeNodeLeaf(node)` — `"content" in node`.

### `CollapsibleTreeNodeHeader`

Кнопка-заголовок для интеграции с кастомным `renderHeader` у
`CollapsibleTreeExtended`. Принимает provide-props из `CollapsibleTreeExtended.Node`
(`opened`, `toggle`, `hasChildNodes`, `animating`, `activeNode`, `isLastNode`)
и все стандартные `React.ButtonHTMLAttributes<HTMLButtonElement>`. Внутри
`CollapsibleTree` подставляется автоматически.

| Поведение | Условие |
|---|---|
| `disabled={true}` | `hasChildNodes === false` |
| `aria-expanded={opened}` | `hasChildNodes === true` (для листьев не ставится) |
| Шеврон отрендерен | `hasChildNodes === true` |
| Класс `interactive` | `hasChildNodes === true` |
| Класс `chevron.opened` | `opened === true` |
| `toggle(!opened)` вызывается | по клику, только при `hasChildNodes === true` |
| Кастомный `onClick` | вызывается всегда после `toggle` |

### `CollapsibleTreeNodeLabel`

Обёртка над `Text` для лейбла ветки. Дефолты — `size=B1`, `weight=SEMIBOLD`.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `ETextSize` | `B1` | Размер текста |
| `weight` | `EFontWeightText` | `SEMIBOLD` | Толщина шрифта |
| `...TTextProps` | — | — | Все props `Text<"span">` кроме `tag` и `size` (тэг зафиксирован как `span`) |

---

## Дизайн-токены

```text
--triplex-next-CollapsibleTree-Header_Background_Hover
--triplex-next-CollapsibleTree-Header_Shadow_Focus
```

Анимация раскрытия и базовая семантика дерева наследуются от
`CollapsibleTreeExtended` / `TreeView` / `AccordionBase` — своих токенов на
анимацию у `CollapsibleTree` нет.

---

## Инварианты

- **`CollapsibleTree` — FC без `forwardRef`.** Под капотом class-компонент
  `TreeView`, ref не пробрасывается осмысленно. Тот же инвариант, что у
  `CollapsibleTreeExtended` и `CollapsibleTreeLeafNode` (тоже проксируют в
  class-компонент).
- **`CollapsibleTreeNodeHeader` — `forwardRef<HTMLButtonElement>`** — ref
  идёт на корневой `<button>`, чтобы потребитель мог управлять фокусом
  заголовка (например, программно фокусировать конкретный узел).
- **`CollapsibleTreeLeafContent` — `forwardRef<HTMLDivElement>`** — ref на
  корневой `<div>` контента листа (стандартный контракт для контейнерных
  компонентов).
- **`CollapsibleTreeNodeLabel` — `forwardRef<HTMLSpanElement>`** — нужен для
  измерения ширины лейбла потребителем.
- **Публичные экспорты barrel** (`src/components/CollapsibleTree/index.ts`):
  `CollapsibleTree`, `CollapsibleTreeNodeHeader`, `CollapsibleTreeNodeLabel`,
  все типы из `types.ts` (`ICollapsibleTreeNodeBranch`, `ICollapsibleTreeNodeLeaf`,
  `TCollapsibleTreeNode`, `isCollapsibleTreeNodeLeaf`). Менять имена нельзя.
- **Внутренние компоненты** — `CollapsibleTreeBranchNode`, `CollapsibleTreeLeafNode`,
  `CollapsibleTreeLeafContent` — намеренно НЕ в barrel. Если внешнему
  потребителю нужен кастомный лист или ветка — это сигнал использовать
  `CollapsibleTreeExtended` напрямую, а не расширять `CollapsibleTree`.
- **Диспетчер ветка/лист инлайнится в `CollapsibleTreeBranchNode`** — выбор
  через `isCollapsibleTreeNodeLeaf(child)` прямо в `renderBody`. Раньше был
  отдельный `CollapsibleTreeNode.tsx`, но это создавало циклическую
  зависимость `BranchNode ↔ Node` (madge `deps:cycles`). Не возвращать.
- **`children: never` на `CollapsibleTree`** — структура задаётся только через
  `nodes`. Передача `children` запрещена типом.
- **`CollapsibleTreeBranchNode` хранит локальный `opened`** — инициализируется
  из `node.defaultOpened ?? false`. Чтобы программно менять раскрытие извне —
  используй `CollapsibleTreeExtended` (controlled-режим через `opened` /
  `toggle`).
- **`CollapsibleTreeLeafNode` использует «семантический хак»** — передаёт в
  `CollapsibleTreeExtended.Node` `opened={true}` и `toggle=noop`. Это
  намеренное решение по контракту API `Extended.Node` (renderBody возвращает
  `null`, шеврон не рендерится потому, что `hasChildNodes === false`).
  Не переписывать без обсуждения с командой.
- **Корневой DOM** — `<ul>` от `TreeView`, узлы — `<li>`.

---

## Accessibility

- Семантика дерева наследуется от `TreeView` — корневой `<ul>`, узлы `<li>`,
  ветки оборачиваются в `<ul role="group">` через `TreeView.Group` при наличии
  детей.
- Клавиатурная навигация по дереву (стрелки, Home/End, раскрытие/сворачивание)
  обрабатывается на уровне `TreeView` — `CollapsibleTree` ничего не добавляет
  сверху.
- `CollapsibleTreeNodeHeader` рендерит нативный `<button>` с
  `aria-expanded={opened}` для веток с детьми; для веток без детей и листьев
  кнопка `disabled` и `aria-expanded` не выставляется.
- Лейбл (`label` в `ICollapsibleTreeNodeBranch`) — это видимая текстовая
  подпись, которая служит accessible name кнопки-заголовка. Если в `label`
  передаётся не-текстовый контент (иконка, badge) — потребитель **обязан**
  обеспечить accessible name через `aria-label` на самой кнопке заголовка
  через `CollapsibleTreeExtended` (для типового UI таких кейсов не бывает).
- Свёрнутая ветка получает `visibility: hidden` на body через
  `CollapsibleTreeExtended` — Tab не уходит в скрытое содержимое.
- Фокус-стиль — `:focus-visible` через токен
  `--triplex-next-CollapsibleTree-Header_Shadow_Focus`.

---

## Связанные компоненты

- [`CollapsibleTreeExtended`](../CollapsibleTreeExtended/CollapsibleTreeExtended-ai.md)
  — низкоуровневая база с произвольным `renderHeader`/`renderBody`.
  `CollapsibleTree` — типовая обёртка над ней.
- `CollapsibleTreeNodeHeader` (этот же barrel) — кнопка-заголовок с шевроном,
  доступна для использования в кастомном `renderHeader` у `CollapsibleTreeExtended`.
- `CollapsibleTreeNodeLabel` (этот же barrel) — типографика заголовка
  (`Text` со span-тегом, дефолты B1 / SEMIBOLD). Используй внутри `label`
  ветки или в кастомном header'е, когда нужен другой `size`/`weight`.
- `TreeView` (`src/components/TreeView`) — нижний слой: семантика дерева,
  абстрактное дерево нод, фокус, активная нода, клавиатурная навигация.
- `AccordionBase` (`src/components/AccordionBase`) — анимация раскрытия,
  используется внутри каждой ветки через `CollapsibleTreeExtended`.

---

## Stories

Основные истории: `stories/CollapsibleTree/CollapsibleTree.stories.tsx`
Файлы примеров: `stories/CollapsibleTree/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контрол `nodes` |
| `Default` | `Default.tsx` | Базовое плоское дерево «папка/файл» |
| `Opened` | `Opened.tsx` | Стартово раскрытая ветка через `defaultOpened` |
| `Nested` | `Nested.tsx` | Многоуровневое дерево с вложенными ветками |
| `Custom label` | `CustomLabel.tsx` | Переопределение `size`/`weight` через `CollapsibleTreeNodeLabel` |
| `VisualTests` | `VisualTestsExample.tsx` | Три состояния в одном кадре — для baseline-скриншотов |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-05-15 | Создан документ. Зафиксирован «семантический хак» `LeafNode` (`opened=true + toggle=noop`), список внутренних компонентов вне barrel, инварианты по `forwardRef` |
| 2026-05-15 | `CollapsibleTreeNodeHeader` и `CollapsibleTreeLeafContent` переведены на `forwardRef` (DOM-ref на `<button>` и `<div>` соответственно). Защищены инварианты `<button>` (`type`, `disabled`, `aria-expanded`) от перетирания через `{...props}` |
