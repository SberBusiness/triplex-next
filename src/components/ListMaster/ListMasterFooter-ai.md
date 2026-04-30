---
component: ListMasterFooter
category: List
related: [ListMaster, ListMasterFooterDescription, ListMasterFooterControls]
tokens:
  - --triplex-next-ListMaster-Footer_Background
  - --triplex-next-ListMaster-Footer_Shadow
stories: stories/ListMaster/ListMaster.stories.tsx
version: "1.0"
---

# ListMasterFooter

## Назначение

Sticky-футер `ListMaster`. Используется обычно при выделении ≥1 элемента
списка для показа агрегатов (например, суммы выбранных) и действий по
выбранному. По умолчанию имеет `display: flex; justify-content: space-between;
align-items: center` — слева текст (`FooterDescription`), справа кнопки
(`FooterControls`).

Используется как `<ListMaster.Footer>` или импортируется напрямую.

---

## Варианты и props

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `sticky` | `boolean` | `true` | Sticky-позиционирование (`bottom: 0`). При `false` футер ведёт себя как обычный блок |
| `children` | `React.ReactNode` | — | Содержимое футера (обычно пара `FooterDescription` + `FooterControls`) |
| `...HTMLDivAttributes` | — | — | Все атрибуты `<div>` |

---

## Дизайн-токены

```
--triplex-next-ListMaster-Footer_Background  // фон футера
--triplex-next-ListMaster-Footer_Shadow      // тень сверху
```

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLDivElement`. Не убирать.
- **Внутренний layout `flex / space-between`** — публичный визуальный контракт. `FooterDescription` и `FooterControls` не делают `justify-content` сами — это задача футера.
- **Корневой DOM** — `<div>`. Не менять.
- В отличие от `ListMasterHeader`, scroll-компенсации НЕТ — футер не сдвигает контент при появлении.

---

## Связанные компоненты

- **`ListMaster`** — родительский compound. `ListMasterFooter` доступен как `ListMaster.Footer`.
- **`ListMasterFooterDescription`** (`ListMaster.FooterDescription`) — левая текстовая часть. Тривиальный wrapper, описан в `ListMaster-ai.md`.
- **`ListMasterFooterControls`** (`ListMaster.FooterControls`) — правый контейнер кнопок. Тривиальный wrapper, описан в `ListMaster-ai.md`.
- **`ListMasterHeader`** — симметричная sticky-шапка.

---

## Stories

Демонстрируется в общей story `Default` компонента `ListMaster` — появляется,
когда `selectedListItemIds.length > 0`. Отдельных stories нет.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` (в `ListMaster.stories.tsx`) | `Default.tsx` | Sticky-футер с суммой выбранных (`FooterDescription`) и действиями `ButtonDropdown` + `Button` (`FooterControls`) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ. Уточнён JSDoc по дефолтному значению `sticky`. Добавлены unit-тесты. |
