---
component: ListItemControlsButtonDropdown
category: List
related: [ListItemControlsButton, ButtonDropdownExtended, Dropdown, Puller]
tokens:
  - ListItemControlsButton.Background_Default
  - ListItemControlsButton.Background_Hover
  - ListItemControlsButton.Background_Active
  - ListItemControlsButton.Color_Default
  - ListItemControlsButton.Color_Hover
  - ListItemControlsButton.Color_Active
stories: stories/List/ListItemControls.stories.tsx
version: "1.0"
---

# ListItemControlsButtonDropdown

## Назначение

Кнопка-триггер для dropdown-меню в swipe-actions списка. Использует
`ListItemControlsButton` как кнопку и `ButtonDropdownExtended` для
выпадающего списка опций. На мобильном — bottom sheet, на десктопе — обычный
dropdown.

Используй когда: в swipe-actions нужно несколько действий, объединённых под
одной кнопкой (обычно «Действия» / «Ещё»).

---

## Варианты и props

Тип props: `Omit<IButtonDropdownProps, "size"> & Pick<IListItemControlsButtonProps, "icon">`

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `options` | `IButtonDropdownOption[]` | Список опций dropdown. Каждая опция: `{ id, label, onSelect?, ...IDropdownListItemProps }` |
| `children` | `React.ReactNode` | Текст кнопки (становится заголовком mobile-bottom-sheet) |

### Опциональные props

| Prop | Тип | Описание |
|---|---|---|
| `icon` | `React.ReactNode` | Иконка кнопки (как в `ListItemControlsButton`) |
| `selected` | `IButtonDropdownOption` | Текущая выбранная опция (отмечается в dropdown) |
| `disabled` | `boolean` | Блокирует кнопку и открытие dropdown |
| `buttonAttributes` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | Атрибуты, пробрасываемые на `<button>` |
| `...HTMLDivAttributes` | — | Атрибуты внешнего `<div>` контейнера |

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/ListItemControlsButton.ts`.

Использует те же токены, что и `ListItemControlsButton`. Дополнительно — стиль
`.buttonDropdownMenuItem` для опций dropdown (ellipsis для длинных лейблов).

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLButtonElement` (на саму кнопку, не на контейнер).
- **`aria-haspopup="menu"`, `aria-controls={instanceId}`** — выставляются автоматически. `aria-expanded` синхронизируется с состоянием `opened`.
- **`closeOnTab`** — включён всегда (Tab закрывает dropdown).
- **`uniqueId` для `instanceId`** — используется `lodash-es/uniqueId` через `useRef(uniqueId())`. **Не** мигрировать на `useId()` — ветка `release-0` поддерживает React 17, см. `docs/ai/ai-refactoring.md`.

---

## Accessibility

- **Клавиатура:**
  - `Space`, `ArrowUp`, `ArrowDown` — `preventDefault` (не скроллит страницу). Клавиши сравниваются по `event.code` (обработчик `createButtonDropdownKeyDownHandler` из `Button/utils.ts` общий с `ButtonDropdown`): `event.key` пробела — `" "`.
  - `Space` на закрытой кнопке открывает dropdown — явно, так как нативная click-активация отменена `preventDefault`.
  - `ArrowUp` / `ArrowDown` в закрытом состоянии — открывают dropdown.
  - `Escape` / `Tab` — закрывают dropdown (через `ButtonDropdownExtended`).
  - В открытом dropdown `ArrowUp` / `ArrowDown` перемещают активный пункт, `Enter` / `Space` выбирают его — клавиши кнопки передаёт списку `ButtonDropdownExtended`.
- **`aria-haspopup="menu"`** — указывает на наличие меню.
- **`aria-expanded`** — синхронизирован с `opened` (true/false).
- **`aria-controls`** — связывает кнопку с id dropdown.
- **`aria-activedescendant`** — приходит из `activeDescendant` в `renderButton` `ButtonDropdownExtended`, указывает на текущий выделенный элемент.

---

## Связанные компоненты

- `ListItemControlsButton` — используется как сама кнопка-триггер.
- `ButtonDropdownExtended` — обвязка для кастомных кнопок + dropdown.
- `Dropdown`, `DropdownList` (desktop) — выпадающий список на десктопе.
- `Puller` (`PullerBody`, `PullerList`, `PullerListItem`, `PullerHeader`, `PullerClose`) — bottom-sheet на мобильном.
- `DropdownListContext` / `useDropdownListKeyboard` — связка кнопки со списком; подключает `ButtonDropdownExtended`.

---

## Stories

Основные истории: `stories/List/ListItemControls.stories.tsx`
Файл примера: `stories/List/examples/ListItemControls/Default.tsx`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `Default.tsx` | `ListItemControlsButtonDropdown` рядом с `ListItemControlsButton` внутри `ListItemControls` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-29 | Создан документ |
| 2026-10-21 | Переход на `Puller` (TRIPLEX-961): мобильная версия собрана из частей `Puller` (бывший `DropdownMobile*`). |
| 2026-11-05 | TRIPLEX-1039: клавиши в открытом dropdown список получает от кнопки через `ButtonDropdownExtended`. Клавиши кнопки сравниваются по `event.code`: раньше `preventDefault` на `Space` не срабатывал. |
