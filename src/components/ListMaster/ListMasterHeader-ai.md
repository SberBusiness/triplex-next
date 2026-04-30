---
component: ListMasterHeader
category: List
related: [ListMaster, SelectionControls]
tokens:
  - --triplex-next-ListMaster-Header_Background
  - --triplex-next-ListMaster-Header_Shadow
stories: stories/ListMaster/ListMaster.stories.tsx
version: "1.0"
---

# ListMasterHeader

## Назначение

Sticky-шапка `ListMaster`. Показывается обычно при выделении ≥1 элемента
списка (для отображения selection controls). При монтировании компенсирует
свою высоту через `window.scrollTo`, чтобы появление шапки не сдвигало
содержимое визуально вниз; при размонтировании — откатывает скролл.

Используется как `<ListMaster.Header>` или импортируется напрямую — оба
варианта поддерживаются barrel'ом.

---

## Варианты и props

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `sticky` | `boolean` | `true` | Sticky-позиционирование (`top: 0`, `z-index: 1`). При `false` шапка ведёт себя как обычный блок |
| `children` | `React.ReactNode` | — | Содержимое шапки (обычно `<ListMaster.SelectionControls>`) |
| `...HTMLDivAttributes` | — | — | Все атрибуты `<div>` |

---

## Дизайн-токены

```
--triplex-next-ListMaster-Header_Background  // фон шапки
--triplex-next-ListMaster-Header_Shadow      // тень снизу
```

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLDivElement`. Не убирать.
- **`useEffect` со scroll-компенсацией** — публичное наблюдаемое поведение, на котором завязан UX (контент не «прыгает» при появлении шапки). Не удалять без согласования с дизайнером.
- **`z-index: 1`** в sticky-режиме — нужен чтобы шапка перекрывала `ListMasterBody`. Не уменьшать.
- **Корневой DOM** — `<div>`. Не менять.

---

## Accessibility

- Семантика — обычный `<div>`. Если используется как landmark, потребитель должен передать `role="banner"` или обернуть в `<header>` через `as`-паттерн (сейчас не поддерживается, см. барьер: компонент рендерит `<div>` хардкодом).
- Содержимое (selection-controls) обычно содержит `<button>`-ы — их accessibility — задача потребителя.

---

## Связанные компоненты

- **`ListMaster`** — родительский compound. `ListMasterHeader` доступен как `ListMaster.Header`.
- **`SelectionControls`** (`ListMaster.SelectionControls`) — flex-контейнер для типичного контента шапки (выбрать все / счётчик / сбросить).
- **`ListMasterFooter`** — симметричный sticky-футер.

---

## Stories

Демонстрируется в общей story `Default` компонента `ListMaster` — появляется,
когда `selectedListItemIds.length > 0`. Отдельных stories нет.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` (в `ListMaster.stories.tsx`) | `Default.tsx` | Sticky-шапка с `SelectionControls` (Выбрать все / счётчик / Сбросить) при наличии выделенных элементов |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ. Уточнён JSDoc по `useEffect`-логике компенсации скролла. Добавлены unit-тесты. |
