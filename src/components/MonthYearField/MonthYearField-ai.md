---
component: MonthYearField
category: Date components
related: [DatePickerExtended, MonthYearRange, TextField, Calendar]
tokens: []
stories: stories/MonthYearField/MonthYearField.stories.tsx
version: "1.0"
---

# MonthYearField

## Назначение

Поле для выбора месяца и года. Read-only текстовое поле (`TextField`) с иконкой календаря в постфиксе, по клику раскрывающее выпадающий календарь `DatePickerExtended` в режиме выбора месяца (`ECalendarPickType.MONTH_YEAR`). Выбранная дата форматируется и отображается в поле.

Используй когда: нужно выбрать только месяц и год (без дня), а ввод с клавиатуры не требуется — значение задаётся через календарь.

Не используй когда: нужен полноценный ввод даты с клавиатуры (`DateField`), выбор диапазона месяцев (`MonthYearRange`) или произвольной даты с днём (`DatePickerExtended` напрямую).

---

## Варианты и props

`MonthYearField` — обёртка над `DatePickerExtended`, поэтому помимо собственных props принимает все props `DatePickerExtended`, кроме управляемых внутри (`pickedDate`, `onDateChange`, `renderTarget`, `renderDropdownHeaderTarget`), и часть props `TextField` (`size`, `status`, `label`). Остальные неперечисленные props пробрасываются в `DatePickerExtended`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `value` | `string` | Значение даты в формате `format`. Пустая строка — поле очищено. Невалидное значение или дата вне `limitRange` отображаются как пустое поле. |
| `onChange` | `(value: string) => void` | Вызывается при выборе даты в календаре. Аргумент — строка даты в формате `format`. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `MD` (в target) | Размер поля: SM / MD / LG. Определяет и размер иконки календаря. |
| `status` | `EFormFieldStatus` | `default` | Статус поля: default / error / warning / disabled. `disabled` блокирует поле и кнопку календаря. |
| `label` | `ReactNode` | — | Лейбл поля (проброс в `TextField`). |
| `placeholder` | `string` | — | Текст подсказки, когда значение пустое. |
| `format` | `string` | `dateFormatYYYYMMDD` (`"YYYYMMDD"`) | Формат парсинга/сериализации `value`. На отображение НЕ влияет — в поле всегда показывается формат `"MMM YYYY"`. |
| `limitRange` | `IDateLimitRange` | `globalLimitRange` | Допустимый диапазон дат. Значение вне диапазона трактуется как пустое. |
| `onClear` | `MouseEventHandler<HTMLButtonElement>` | — | Если передан — в постфиксе появляется кнопка очистки. Реальную очистку значения выполняет потребитель. |
| `targetProps` | `ITextFieldProps` | — | Дополнительные props для внутреннего `TextField` (postfix, description, inputProps и т.д.). `inputProps.value`, `placeholder`, `readOnly` устанавливаются компонентом, но могут быть переопределены через `targetProps.inputProps`. |

### Особенности отображения

- Отображаемая строка в поле формируется по фиксированному формату `inputMonthYearFormat = "MMM YYYY"` (`constants.ts`), независимо от `format`. `format` управляет только парсингом `value` и аргументом `onChange`.
- Поле всегда `readOnly` — ввод значения возможен только выбором в календаре.

---

## Дизайн-токены

Собственных CSS-токенов нет. Внешний вид наследуется от `TextField`, `ButtonIcon`, `FormFieldClear` и `Calendar`/`DatePickerExtended`.

---

## Инварианты

- `forwardRef` на компоненте — не убирать. Ref пробрасывается в `DatePickerExtended` (корневой DOM-элемент — элемент `DatePickerExtended`).
- Публичный API (`IMonthYearFieldProps`: `value`, `onChange`, `onClear`, `targetProps`, `placeholder` + унаследованные `size`/`status`/`label` и props `DatePickerExtended`) — изменение имён/типов/значений — breaking change.
- Поле read-only по контракту — не делать его редактируемым без обсуждения (компонент не имеет логики валидации клавиатурного ввода).
- Отображаемый формат `"MMM YYYY"` зафиксирован в `inputMonthYearFormat`; менять его — визуальный breaking change для потребителей.
- Sync-эффект в `MonthYearField.tsx` (`useEffect` по `[value, format, limitRange]` с `eslint-disable react-hooks/exhaustive-deps`) — намеренная синхронизация derived-стейта `pickerValues` с внешним `value`. Не переписывать без анализа поведения: сравнение идёт по `inputString`, чтобы не сбрасывать стейт при эквивалентных значениях.
- Внутренние символы `MonthYearPickerUtils` (`utils.ts`), `MonthYearFieldContext`, `MonthYearFieldTarget` не экспортируются через barrel — это приватные детали реализации.

---

## Accessibility

- Триггер — текстовое поле `TextField` с `readOnly`. Открытие/закрытие календаря по клику и по клавишам `Enter` / `Space` (с `preventDefault` для `Space`, чтобы не скроллить страницу). Обработчики в `MonthYearFieldTarget`.
- Кнопка иконки календаря — `ButtonIcon` с `role="presentation"` и `tabIndex={-1}`: она не попадает в таб-обход (фокус остаётся на поле), клик дублирует открытие календаря.
- Состояние `disabled` (`status === EFormFieldStatus.DISABLED`) блокирует и поле, и кнопку календаря.
- ARIA-роль выпадающего календаря (`dialog`) и навигация по нему — на стороне `DatePickerExtended` / `Calendar`.

---

## Связанные компоненты

- `DatePickerExtended` — родительский компонент выпадающего календаря; `MonthYearField` конфигурирует его в режим `MONTH_YEAR` через render-props.
- `MonthYearRange` — выбор диапазона месяцев; использует `MonthYearField` как поля «от» и «до».
- `TextField` — внутреннее поле-триггер.
- `MonthYearFieldTarget` (внутренний, не в barrel) — рендерит `TextField` с иконкой календаря и кнопкой очистки, обрабатывает клик/клавиатуру для открытия дропдауна. Описан здесь, отдельного AI.md не имеет.
- `MonthYearFieldContext` (внутренний, не в barrel) — прокидывает `onChange` в target; тривиальный контекст без своей логики.
- `MonthYearPickerUtils` (`utils.ts`, внутренний) — чистые функции парсинга/валидации даты (`getPickerValues`, `getCalendarDate`, `isAvailableDate`). Покрыты `__tests__/utils.test.tsx`.

---

## Stories

Основные истории: `stories/MonthYearField/MonthYearField.stories.tsx`
Файлы примеров: `stories/MonthYearField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль size / status / label / placeholder + настройки postfix и description |
| `Default` | `DefaultExample.tsx` | Минимальное поле с label и placeholder |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `Statuses` | `StatusesExample.tsx` | Статусы default / disabled / error / warning |
| `Production` (`Example: production`) | `ProductionExample.tsx` | Production-композиция: postfix `HelpBox`, description со ссылкой, кнопка очистки и фокус на input |
| `VisualTests` | `VisualTestsExample.tsx` | Скриншот-регрессия: все размеры (пустые/заполненные), статусы, поле с очисткой и постфиксом |
| `VisualTestsOpen` | `VisualTestsOpenExample.tsx` | Скриншот-регрессия раскрытого состояния: dropdown с календарём открывается через `play` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-06-16 | Создан документ. AI-рефакторинг (JSDoc-фиксы), unit-тесты для `utils.ts`, story `VisualTests` и включение скриншот-тестов |
| 2026-06-16 | Добавлена story `VisualTestsOpen` — скриншот раскрытого dropdown с календарём (через `play`) |
