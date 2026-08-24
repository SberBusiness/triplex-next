---
component: DatePickerExtended
category: Date components
related: [Calendar, Dropdown, DateField, MonthYearField, ChipDatePicker]
tokens: []
stories: stories/DatePickerExtended/DatePickerExtended.stories.tsx
version: "1.0"
---

# DatePickerExtended

## Назначение

Связка «произвольный целевой элемент + выпадающий календарь». Компонент рендерит целевой элемент (render-prop `renderTarget`) и `Calendar` внутри `Dropdown`, хранит состояние открытости календаря и отдаёт его целевому элементу через `DatePickerExtendedContext`. На мобильной ширине экрана вместо десктопного дропдауна открывается полноэкранный `DropdownMobile` с заголовком из `renderDropdownHeaderTarget`.

Используй когда: строишь собственный компонент выбора даты с нестандартным триггером (поле, чип, кнопка) и хочешь переиспользовать готовую механику дропдауна с календарём. Именно так устроены `DateField`, `MonthYearField` и `ChipDatePicker`.

Не используй когда: подходит готовый компонент — поле ввода даты (`DateField`), выбор месяца и года (`MonthYearField`), диапазон (`DateRange`, `MonthYearRange`), чип-фильтр (`ChipDatePicker`); или календарь нужен без дропдауна — тогда бери `Calendar` напрямую.

---

## Варианты и props

`IDatePickerExtendedProps` собирается из трёх источников: собственные props (ниже), props календаря (`ICalendarProps` без `adaptiveMode`, включая `ICalendarNestedProps`) и `alignment` из `IDropdownProps`. Плюс `React.HTMLAttributes<HTMLDivElement>` без `onChange` — они уходят на корневой `div`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `renderTarget` | `() => ReactNode` | Рендер целевого элемента. Вызывается внутри `DatePickerExtendedContext.Provider`, поэтому возвращённое дерево может читать и менять открытость календаря через контекст. |
| `renderDropdownHeaderTarget` | `() => ReactNode` | Рендер целевого элемента в заголовке мобильного дропдауна (`DropdownMobileHeader`). Обычно — `DropdownMobileInput` с текущим значением. |
| `pickedDate` | `string \| Moment \| null` | Выбранная дата (prop `Calendar`). Компонент неуправляемый только в части открытости — выбранную дату хранит потребитель. |
| `onDateChange` | `(date: Moment) => void` | Вызывается при выборе даты в календаре. Компонент дополнительно закрывает дропдаун. |

### Собственные опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `dropdownTargetRef` | `RefObject<HTMLElement>` | корневой элемент | Элемент, относительно которого позиционируется дропдаун. Нужен, когда целевой элемент занимает не всю ширину корневого `div` (так делает `DateField`). |
| `alignment` | `EDropdownAlignment` | `LEFT` | Выравнивание дропдауна относительно целевого элемента. |
| `onDropdownOpen` | `() => void` | — | Дропдаун открылся (проброшен в `Dropdown.onOpen`). |
| `onDropdownClose` | `() => void` | — | Дропдаун закрылся (проброшен в `Dropdown.onClose`). |
| `focusTrapProps` | `FocusTrapProps` | — | Props `FocusTrap` (`focus-trap-react`) вокруг десктопного календаря. Переданный `focusTrapOptions` объединяется с внутренним: пользовательские ключи имеют приоритет. |

### Props календаря

Пробрасываются в `Calendar` как есть: `pickType`, `format`, `defaultViewDate`, `limitRange`, `markedDays`, `disabledDays`, `reversedPick`, `onPageChange`, `onViewChange`, `dayHtmlAttributes`, `monthHtmlAttributes`, `yearHtmlAttributes`, `prevButtonProps`, `nextButtonProps`, `viewButtonProps`, `yesterdayButtonProps`, `todayButtonProps`, `tomorrowButtonProps`. Семантика — в `Calendar-ai.md`.

Исключение — `adaptiveMode`: он входит в `ICalendarProps`, но исключён из `IDatePickerExtendedProps` через `Omit`. Режим определяет версия дропдауна (десктопный — `false`, мобильный — `true`), задать его снаружи нельзя.

Футер календаря (`yesterdayButtonProps`, `todayButtonProps`, `tomorrowButtonProps`) рендерится только при переданном `todayButtonProps` — без него «Вчера» и «Завтра» не появятся. «Вчера» и «Завтра» дополнительно требуют открытой страницы текущего месяца в режиме `DAYS`.

### Что уходит на корневой элемент

Всё, что не перечислено выше (`className`, `style`, `id`, `data-*`, `aria-*`, обработчики), спредится на корневой `div`. Собственные `onKeyDown` и `onMouseDown` компонента вызываются первыми, пользовательские — после них (не отменяются).

---

## Дизайн-токены

Собственных CSS-токенов нет. Единственный стиль компонента — `datePickerExtendedMobileDropdown` (`max-height: 100vh` для мобильного дропдауна). Внешний вид определяется `Calendar`, `Dropdown` и целевым элементом.

---

## Инварианты

- `forwardRef` на компоненте — не убирать. Ref ведёт на корневой `div` и одновременно используется внутри как `containerRef` (позиционирование дропдауна и определение кликов «снаружи»), поэтому менять ref-target нельзя.
- Публичный API (`DatePickerExtended`, `IDatePickerExtendedProps`, `DatePickerExtendedContext`, `IDatePickerExtendedContext`) экспортируется через `src/components/DatePickerExtended/index.ts` — переименования props и смена их типов недопустимы.
- **Открыть календарь снаружи можно только через `DatePickerExtendedContext`** — управляемого prop открытости у компонента нет. Контекст экспортируется из barrel, поэтому целевой элемент пишется и внутри библиотеки (`DateField`, `MonthYearField`, `ChipDatePicker`), и в коде потребителя.
- Форма контекста (`dropdownOpen`, `mouseUsedRef`, `setDropdownOpen`) — часть публичного API и одновременно контракт трёх внутренних потребителей. Её изменение ломает `DateFieldTarget`, `MonthYearFieldTarget` и `ChipDatePickerTarget` — править только вместе с ними.
- `mouseUsedRef` — флаг «взаимодействие было мышью». Он выставляется на `mousedown` по корневому элементу и сбрасывается при закрытии дропдауна; от него зависят `initialFocus` и `returnFocusOnDeactivate` у `FocusTrap`. Не заменять на state: значение читается во время рендера дропдауна и не должно вызывать перерисовку.
- `DatePickerExtendedDropdown` в barrel не экспортируется.
- Размер дропдауна зафиксирован (`EComponentSize.MD`) и наружу не выведен.
- Компонент не хардкодит текст: подписи кнопок календаря и `aria-label` целевого элемента задаёт потребитель. Библиотека мультиязычная.
- React 17-совместимость (ветка `release-0`): не переводить на `useId` и другие React 18-only API.

---

## Accessibility

- Дропдаун имеет `role="dialog"` и `aria-modal="true"`. Доступное имя диалога компонент не задаёт, и передать его через props нельзя: `...restProps` уходят на корневой `div`, а в `DatePickerExtendedDropdown` передаются только явно перечисленные props. Aria-атрибуты, переданные в `DatePickerExtended`, окажутся на корневом элементе, а не на диалоге.
- Десктопный календарь обёрнут в `FocusTrap` (`focus-trap-react`):
  - при открытии с клавиатуры фокус уходит внутрь календаря, при закрытии возвращается на целевой элемент;
  - при открытии мышью (`mouseUsedRef`) фокус не перехватывается и не возвращается — иначе после клика мышью фокус «прыгал» бы в календарь;
  - `clickOutsideDeactivates: true`; `fallbackFocus` — контейнер календаря внутри ловушки (`tabIndex={-1}`), поэтому при отсутствии tabbable-элементов фокус остаётся внутри диалога. Задаётся ленивой функцией, т.к. на момент рендера ref ещё не заполнен; целевой элемент и `document.body` оставлены запасными вариантами, потому что focus-trap бросает исключение на пустом fallback.
- `Escape` на корневом элементе закрывает календарь (только когда он открыт), после чего вызывается пользовательский `onKeyDown`.
- `mousedown` вне корневого элемента и вне дропдауна закрывает календарь; клик внутри календаря — нет.
- Открытие календаря — ответственность целевого элемента: он же должен нести `aria-haspopup="dialog"` и `aria-expanded` (значение берётся из контекста).
- Клавиатурная навигация внутри сетки календаря — на стороне `Calendar`.

---

## Связанные компоненты

- `Calendar` — календарная сетка, рендерится внутри дропдауна; её props входят в `IDatePickerExtendedProps`, кроме `adaptiveMode`.
- `Dropdown` — выпадающее меню; из его props наружу выведен только `alignment`, мобильная версия конфигурируется внутри.
- `DateField` — поле ввода даты; передаёт `dropdownTargetRef` и открывает календарь из `DateFieldTarget` через контекст.
- `MonthYearField` — выбор месяца и года; конфигурирует `pickType={ECalendarPickType.MONTH_YEAR}`.
- `ChipDatePicker` — чип-фильтр с календарём; открывает дропдаун из `ChipDatePickerTarget` через контекст.
- `DatePickerExtendedContext` — контекст открытости дропдауна для целевого элемента. Экспортируется из barrel вместе с типом `IDatePickerExtendedContext`, отдельного AI.md не имеет.

Внутренние части (в barrel не экспортируются, отдельного AI.md не имеют):

- `DatePickerExtendedDropdown` — дропдаун с `FocusTrap` вокруг календаря и мобильной версткой (`DropdownMobileHeader` + `DropdownMobileBody`).

---

## Stories

Основные истории: `stories/DatePickerExtended/DatePickerExtended.stories.tsx`
Файлы примеров: `stories/DatePickerExtended/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `alignment`, `pickType`, `reversedPick` и кнопок футера |
| `Default` | `Default.tsx` | Минимальный пример: кнопка-триггер открывает календарь через контекст |
| `Alignments` | `Alignments.tsx` | Выравнивание дропдауна LEFT / RIGHT |
| `PickTypes` | `PickTypes.tsx` | Выбор дня (DATE) и месяца с годом (MONTH_YEAR) |
| `WithMarkedAndDisabledDays` | `WithMarkedAndDisabledDays.tsx` | Отмеченные и недоступные дни, ограничение периода |
| `WithFooterButtons` | `WithFooterButtons.tsx` | Кнопки футера «Вчера» / «Сегодня» / «Завтра» |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: раскрытый календарь с отметками, ограничением периода и футером (на xs — мобильный дропдаун) |
| `VisualTestsMonthYear` | `VisualTestsMonthYear.tsx` | Скриншот-регрессия: раскрытый календарь в режиме MONTH_YEAR |
| `VisualTestsAlignmentRight` | `VisualTestsAlignmentRight.tsx` | Скриншот-регрессия: раскрытый календарь с выравниванием RIGHT |

Примеры импортируют `DatePickerExtendedContext` из `@sberbusiness/triplex-next` наравне с самим компонентом — без контекста целевой элемент не может открыть календарь, см. «Инварианты».

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-24 | `DatePickerExtendedContext` и `IDatePickerExtendedContext` экспортируются из barrel — целевой элемент можно написать снаружи библиотеки. `adaptiveMode` исключён из `IDatePickerExtendedProps` (ломающее изменение, затрагивает также `DateField`, `MonthYearField`, `ChipDatePicker`) |
| 2026-08-20 | Создан документ. AI-рефакторинг, unit-тесты (`__tests__/DatePickerExtended.test.tsx`), stories по modern pattern. Исправлено: `yesterdayButtonProps` / `tomorrowButtonProps` пробрасываются в `Calendar`, `adaptiveMode` больше не попадает в DOM |
