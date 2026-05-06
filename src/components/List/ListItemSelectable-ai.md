---
component: ListItemSelectable
category: List
related: [ListItem, ListItemContent, Checkbox]
tokens:
  - --triplex-next-ListItem-Background
  - --triplex-next-ListItem-Background_Selected
stories: stories/List/ListItem.stories.tsx
version: "1.0"
---

# ListItemSelectable

## Назначение

Контейнер выбора элемента списка. Рендерит контент + чекбокс справа.
Управляется снаружи (`selected` + `onSelect`). Через `useEffect` записывает
`selected` в `ListItemContext`, чтобы дочерний `ListItemContent` мог
подсветиться (`background_selected`).

Используй `ListItemSelectable` когда: нужен выбор отдельного элемента списка
с собственным чекбоксом (multi-select).

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `selected` | `boolean` | Состояние «выбран». Управляется снаружи |
| `onSelect` | `(selected: boolean) => void` | Вызывается при изменении состояния чекбокса |

### Опциональные props

| Prop | Тип | Описание |
|---|---|---|
| `children` | `React.ReactNode` | Контент строки (рендерится в `<div className="childrenWrapper">`) |
| `...HTMLDivAttributes` | — | Все атрибуты `<div>`, кроме конфликтующего `onSelect` (исключён через `Omit`) |

---

## Дизайн-токены

```text
--triplex-next-ListItem-Background          // фон по умолчанию
--triplex-next-ListItem-Background_Selected // фон, когда selected=true
```

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLDivElement`. Не убирать.
- **Контракт `onSelect: (boolean) => void`** — не путать с нативным `onSelect: SelectionEvent` от `<div>`. Тип специально перекрывает нативный через `Omit<..., "onSelect">`.
- **`useEffect` с зависимостями `[selected, setSelected]`** — синхронизация `selected` в `ListItemContext` обязательна. Без него подсветка `ListItemContent` не работает.
- **Использование внутри `ListItem`** — `setSelected` берётся из `ListItemContext`. Если рендерить `ListItemSelectable` без родительского `ListItem`, контекст вернёт no-op `setSelected`.

---

## Accessibility

- Чекбокс — встроенный `<Checkbox>` из библиотеки, имеет нативный `<input type="checkbox">`.
- Клик по любой части `.childrenWrapper` **не** переключает чекбокс — только клик по самому чекбоксу или его расширенной области (`.checkboxLabelClickArea`, `+4px` со всех сторон).
- Если нужен клик по всей строке — оборачивай в `<label>` или используй `ListItemTable` + `onClickItem`.

---

## Связанные компоненты

- `ListItem` — родительский `<li>`, провайдер `ListItemContext`.
- `ListItemContent` — потребитель `ListItemContext.selected` для применения класса `selected`.
- `Checkbox` — встроенный чекбокс выбора.
- `ListItemTable` — использует `ListItemSelectable` автоматически в selectable-варианте.

---

## Stories

Основные истории: `stories/List/ListItem.stories.tsx`
Файл примера: `stories/List/examples/ListItem/Selectable.tsx`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Selectable` | `Selectable.tsx` | Использование `ListItemSelectable` внутри `ListItem` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
