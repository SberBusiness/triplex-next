---
component: Row
category: Layout
related: [Col, Gap]
tokens: []
stories: stories/Row/Row.stories.tsx
version: "1.0"
---

# Row

## Назначение

Строка сетки: flex-контейнер с нижним отступом, предназначенный для использования с колонками `Col` в children. Передаёт размер горизонтального отступа между колонками (`gridHorizontalGap`) в дочерние `Col` через внутренний `RowContext`.

Используй когда: нужно разместить контент в колоночной сетке — несколько `Col` в одной строке с управляемым горизонтальным отступом между ними и вертикальным отступом между строками.

Не используй когда:
- Нужен только вертикальный отступ между блоками без колонок — используй `Gap`.
- Children — не колонки `Col`: компонент рассчитан на связку `Row` → `Col`, отрицательные боковые margin компенсируются padding колонок.

---

## Варианты и props

### Обязательные props

Обязательных props нет.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `paddingBottom` | `boolean` | `true` | Нижний отступ строки (16px). При `false` — отступ убирается. У последней строки (`:last-child`) отступ убирается стилями независимо от значения prop. |
| `gridHorizontalGap` | `EComponentSize.SM \| EComponentSize.MD` | `EComponentSize.SM` | Размер отступа между колонками: SM — 8px, MD — 12px. Передаётся в дочерние `Col` через `RowContext`. |

Компонент расширяет `React.HTMLAttributes<HTMLDivElement>` — принимает все стандартные атрибуты `<div>` (`className`, `style`, `aria-*`, `data-*` и т.д.).

### Ограничения

- `gridHorizontalGap` намеренно сужен до `SM | MD` — остальные значения `EComponentSize` не входят в контракт сетки.
- Механика gap: `Row` задаёт отрицательные `margin-left`/`margin-right`, а `Col` — соответствующий горизонтальный padding (значение получает из `RowContext`). Управлять gap нужно только через prop на `Row`, а не стилями `Col`.

---

## Дизайн-токены

Компонент не использует CSS-переменных `--triplex-next-*`. Размеры берутся из LESS-переменных сетки в `src/styles/components/grid.less`:

```less
@row-bottom-padding: 16px
@grid-horizontal-gap-SM: 8px
@grid-horizontal-gap-MD: 12px
```

---

## Инварианты

- **`forwardRef`** — обязателен, не убирать. `ref` пробрасывается на корневой `<div>`.
- **Имена публичного API**: компонент `Row`, интерфейс `IRowProps`, props `paddingBottom`, `gridHorizontalGap` и их дефолты — менять нельзя (breaking change).
- **Barrel `src/components/Row/index.ts` экспортирует только `./Row`** — `RowContext` остаётся внутренним модулем, в barrel не добавлять.
- **`RowContext` — внутренний контракт с `Col`**: `Col` читает `gridHorizontalGap` из контекста (`src/components/Col/Col.tsx`). Изменение формы `IRowContext` или дефолтного значения контекста требует синхронного обновления `Col`.
- **Значение контекста мемоизировано** (`React.useMemo` по `gridHorizontalGap`) — не убирать, иначе все `Col`-потребители будут перерендериваться на каждом рендере `Row`.
- **Корневой DOM-элемент — `<div>`** без ARIA-роли.
- **CSS-классы `SM`, `MD`, `noPaddingBottom`** в `Row.module.less` используются в unit-тестах; класс `row` — корневой, тестами не проверяется, но фиксируется visual baseline. `SM`/`MD` — исторически не camelCase, переименование требует синхронного обновления тестов и проверки visual baseline.
- **`displayName = "Row"`** — проверяется тестом.

---

## Accessibility

Компонент не интерактивный: рендерит обычный `<div>` без роли, keyboard navigation и focus management не применимы. Потребитель может передать `role` и `aria-*` атрибуты через spread.

---

## Связанные компоненты

- `Col` (`src/components/Col/`) — колонка сетки, единственный ожидаемый тип children. Потребляет `gridHorizontalGap` из `RowContext`.
- `Gap` (`src/components/Gap/`) — вертикальный отступ-разделитель вне колоночной сетки.

---

## Stories

Основные истории: `stories/Row/Row.stories.tsx`
Файлы примеров: `stories/Row/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `paddingBottom` и `gridHorizontalGap` |
| `Default` | `Default.tsx` | Две строки по две колонки, отступ между строками по умолчанию |
| `GridHorizontalGaps` | `GridHorizontalGaps.tsx` | Отступы между колонками SM (8px) и MD (12px) |
| `WithoutPaddingBottom` | `WithoutPaddingBottom.tsx` | Строки 1 и 3 с `paddingBottom={false}` в контрасте со строкой 2 с отступом по умолчанию |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-28 | Создан документ. AI-рефакторинг (TRI-71): добавлен `forwardRef`, значение `RowContext` мемоизировано, JSDoc на props и контекст, расширены unit-тесты (ref, проброс gap через контекст); stories переведены на modern pattern (`stories/Row/`), включены визуальные тесты. |
