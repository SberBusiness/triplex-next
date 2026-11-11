---
component: CollapsibleTreeNodeHeader
category: CollapsibleTree
related: [CollapsibleTree, CollapsibleTreeExtendedNode]
tokens:
  - CollapsibleTree.Header_Background_Hover
  - CollapsibleTree.Header_Shadow_Focus
stories: stories/CollapsibleTree/CollapsibleTree.stories.tsx
version: "1.0"
---

# CollapsibleTreeNodeHeader

## Назначение

Готовая кнопка-заголовок узла дерева: показывает шеврон при наличии дочерних
узлов и запрашивает раскрытие через `toggle(!opened)`. Используется внутри
`CollapsibleTree`, а также доступна для собственного `renderHeader` у
`CollapsibleTreeExtended.Node`.

Используй когда: в собственной композиции дерева нужен стандартный заголовок
с шевроном, hover, focus-visible и disabled-состоянием.
Не используй когда: нужен самостоятельный аккордеон или своя разметка toggle —
выбери `Accordion` либо задай собственный `renderHeader`.

Публичные импорты: `CollapsibleTreeNodeHeader` и
`ICollapsibleTreeNodeHeaderProps` из `@sberbusiness/triplex-next`.

---

## Варианты и props

Наследует `ICollapsibleTreeExtendedNodeHeaderProvideProps` и стандартные
`React.ButtonHTMLAttributes<HTMLButtonElement>`. Своего состояния раскрытия нет.

### Обязательные provide-props

Передавай весь аргумент `renderHeader` через spread — он содержит все обязательные
поля интерфейса.

| Prop | Описание |
|---|---|
| `opened` | Текущее раскрытие; определяет направление шеврона и `aria-expanded` |
| `toggle` | Получает `!opened` по клику на доступную кнопку узла с детьми |
| `hasChildNodes` | Наличие зарегистрированных детей: включает шеврон и возможность раскрытия |
| `activeNode`, `animating`, `isLastNode` | Принимаются как часть provide-контракта, но не управляют оформлением header и не передаются в DOM |

### Опциональные props

| Prop | По умолчанию | Описание |
|---|---|---|
| `children` | — | Содержимое и доступное имя кнопки. Для типовой типографики используй `CollapsibleTreeNodeLabel` |
| `disabled` | `false` | Отключает кнопку даже при наличии детей, убирает интерактивное оформление |
| `onClick` | — | Получает исходное событие после `toggle`. У нативной disabled-кнопки не вызывается |
| `className`, HTML-/`data-*`-/`aria-*`-атрибуты | — | Передаются на `<button>`, `className` объединяется с базовыми классами |

### Приоритет атрибутов и состояния

- `type="button"` задан после spread: внешний `type="submit"` его не меняет.
- Нативный `disabled` вычисляется как `disabled || !hasChildNodes`. Узел без
  детей всегда неактивен, даже при внешнем `disabled={false}`.
- `aria-expanded` задан после spread: при детях равен `opened`, иначе отсутствует.
  Внешний `aria-expanded` не переопределяет семантику.
- При детях шеврон остаётся видимым и у disabled-кнопки.
- Глобальный класс icons-next `hoverable` присутствует всегда, `active` — только
  при `hasChildNodes && opened`, `disabled` — при внешнем `disabled`.
  Класс `active` отражает раскрытие, а не provide-prop `activeNode`.
- LESS-класс `interactive` добавляется только при `hasChildNodes && !disabled`.

---

## Дизайн-токены

Собственные токены из `styles/CollapsibleTreeNodeHeader.module.less`:

```text
CollapsibleTree.Header_Background_Hover
CollapsibleTree.Header_Shadow_Focus
```

Hover-фон и тень `:focus-visible` применяются только к интерактивной кнопке.
Цвет шеврона определяет `@sberbusiness/icons-next` через `paletteIndex={5}` и
глобальные классы состояния. Цвет текста наследуется; disabled-типографику
потребитель задаёт через `CollapsibleTreeNodeLabel`.

Значения — `src/components/DesignTokens/components/CollapsibleTree.ts`.
Переопределение через `ThemeProvider` описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- Сохранять `forwardRef<HTMLButtonElement>`: ref указывает на корневой `<button>`.
- Сохранять экспорт компонента и `ICollapsibleTreeNodeHeaderProps` в barrel
  семейства `CollapsibleTree`; `displayName` — `CollapsibleTreeNodeHeader`.
- `opened` управляется снаружи. Header только вызывает `toggle(!opened)`;
  пользовательский `onClick` получает событие после этого запроса.
- Не позволять внешним атрибутам перетирать `type`, вычисленный `disabled` и
  `aria-expanded`; сохранять порядок spread.
- Сохранять разницу между `activeNode` и глобальным классом `active`, а также
  отсутствие `active` у узла без детей при любом `opened`.
- Служебные provide-props не должны попадать в HTML-атрибуты кнопки.
- Сохранять имена токенов, LESS-классы и глобальные классы icons-next.

---

## Accessibility

- Корень — нативный `<button type="button">`. Enter / Space активируют его
  стандартным браузерным кликом; собственного keydown-переключателя нет.
- Доступное имя задаётся текстом `children`, `aria-label` либо `aria-labelledby`.
  Шеврон декоративный, скрыт от скринридера через `aria-hidden`.
- При наличии детей `aria-expanded` отражает раскрытие, включая disabled-ветку.
  У узла без детей атрибут отсутствует, кнопка нативно disabled.
- Нативный disabled блокирует пользовательскую активацию и исключает кнопку
  из обычного Tab-перехода. Шеврон остаётся индикатором структуры.
- `aria-controls` автоматически не задаётся. Связь с содержимым и дополнительные
  ARIA-атрибуты задаёт потребитель своей композиции.
- Отображение focus-visible использует `CollapsibleTree.Header_Shadow_Focus`.
  Управление активным узлом и стрелками принадлежит `TreeView`, не header.

---

## Связанные компоненты

- [`CollapsibleTree`](./CollapsibleTree-ai.md) — родитель, автоматически создаёт
  этот header для веток массива `nodes`.
- [`CollapsibleTreeExtendedNode`](../CollapsibleTreeExtended/CollapsibleTreeExtendedNode-ai.md)
  — предоставляет интерфейс provide-props и `toggle` для собственного `renderHeader`.
- `CollapsibleTreeNodeLabel` — публичная типографическая обёртка `Text` для
  `children`; по умолчанию B1 / SEMIBOLD. Описана в AI.md родителя.

---

## Stories

Основные истории: `stories/CollapsibleTree/CollapsibleTree.stories.tsx`
Файлы примеров: `stories/CollapsibleTree/examples/`

Истории родителя рендерят header через ветки дерева; отдельный stories-файл
атому не требуется.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Заголовки для управляемого через контролы массива `nodes` |
| `Default` | `Default.tsx` | Стандартный заголовок закрытой и открытой ветки |
| `Opened` | `Opened.tsx` | Стартовое раскрытие и направление шеврона |
| `Nested` | `Nested.tsx` | Заголовки на разных уровнях дерева |
| `Custom label` | `CustomLabel.tsx` | Размер и вес текста внутри header |
| `Disabled` | `Disabled.tsx` | Отключённая ветка, шеврон и приглушённый label |
| `VisualTests` | `VisualTestsExample.tsx` | Свёрнутое, раскрытое, disabled-состояния и типографика; существующие xs/xl baseline |

Unit-контракт: `src/components/CollapsibleTree/__tests__/CollapsibleTreeNodeHeader.test.tsx`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-03 | Создан документ |
