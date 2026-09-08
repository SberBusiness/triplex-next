---
component: DateField
category: Date components
related: [DatePickerExtended, MonthYearField, MaskedField, Calendar, Tooltip]
tokens: []
stories: stories/DateField/DateField.stories.tsx
version: "1.0"
---

# DateField

## Назначение

Поле ввода и выбора даты. Поле ввода с маской (`MaskedField` + `FormFieldMaskedInput`) и иконкой календаря в постфиксе, по клику раскрывающее выпадающий календарь `DatePickerExtended`. Дату можно как ввести с клавиатуры в формате `дд.мм.гггг`, так и выбрать в календаре.

Используй когда: нужен ввод конкретной даты (с днём), и потребителю важна возможность набрать её с клавиатуры, а не только выбрать мышью.

Не используй когда: нужен выбор только месяца и года (`MonthYearField`), диапазона дат (`DateRange`), компактный chip-триггер вместо полноценного поля (`ChipDatePicker`), или календарь без поля ввода (`DatePickerExtended` / `Calendar` напрямую).

---

## Варианты и props

`DateField` — обёртка над `DatePickerExtended`, поэтому помимо собственных props принимает все props `DatePickerExtended` (включая props `Calendar`: `limitRange`, `disabledDays`, `markedDays`, `format` и др.), кроме управляемых внутри (`pickedDate`, `onDateChange`, `renderTarget`, `renderDropdownHeaderTarget`), и часть props `MaskedField` (`size`, `status`, `label`). Остальные неперечисленные props пробрасываются в `DatePickerExtended`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `value` | `string` | Значение даты в формате `format`. Пустая строка — поле очищено. Невалидное значение, дата вне `limitRange` или дата из `disabledDays` отображаются как пустое поле. |
| `onChange` | `(value: string) => void` | Вызывается при фиксации значения. Аргумент — строка даты в формате `format` либо пустая строка при очистке поля. |
| `invalidDateHint` | `ReactNode` | Текст тултипа, который показывается, когда в поле введена полная (10 символов), но недоступная для выбора дата. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `MD` (в target) | Размер поля: SM / MD / LG. Определяет и размер иконки календаря, и `min-width` поля ввода. |
| `status` | `EFormFieldStatus` | `default` | Статус поля: default / error / warning / disabled. `disabled` блокирует поле и кнопку календаря. |
| `label` | `ReactNode` | — | Лейбл поля (проброс в `MaskedField`). |
| `placeholderMask` | `string` | — | Символы для заполнения пустых редактируемых позиций маски, например `"дд.мм.гггг"`. |
| `format` | `string` | `dateFormatYYYYMMDD` (`"YYYYMMDD"`) | Формат парсинга/сериализации `value` и аргумента `onChange`. На отображение НЕ влияет — в поле всегда показывается `"DD.MM.YYYY"`. |
| `limitRange` | `IDateLimitRange` | `globalLimitRange` | Допустимый диапазон дат. Значение вне диапазона трактуется как пустое и не фиксируется через `onChange`. |
| `disabledDays` | `string[]` | — | Недоступные для выбора дни. **Строки должны быть в формате `format`**, а не в формате отображения. |
| `onClear` | `MouseEventHandler<HTMLButtonElement>` | — | Если передан — в постфиксе появляется кнопка очистки. Реальную очистку значения выполняет потребитель. |
| `onDropdownOpen` / `onDropdownClose` | `() => void` | — | Колбэки открытия/закрытия выпадающего календаря. Вызываются после внутренней обработки: при закрытии `onChange` (фиксация введённого значения) может сработать раньше `onDropdownClose`. |
| `targetProps` | `DeepPartial<IMaskedFieldProps>` | — | Дополнительные props внутреннего `MaskedField` (`postfix`, `description`, `maskedInputProps` и т.д.). Значения `maskedInputProps.value`, `mask`, `placeholderMask`, `aria-label`, `aria-labelledby` задаются компонентом **по умолчанию** — переданные в `targetProps.maskedInputProps` одноимённые ключи их переопределяют (`...restMaskedInputProps` разворачивается последним). Исключение — `maskedInputProps.onChange`: он не переопределяет внутренний обработчик, а вызывается ПОСЛЕ него. |

### Логика фиксации значения

Ключевая особенность компонента: ввод с клавиатуры **не** вызывает `onChange` на каждое нажатие. Значение фиксируется, когда пользователь заканчивает редактирование:

- **При вводе** обновляется только внутренний стейт (`pickerValues`): строка поля и подсвеченная в календаре дата. Если введены все 10 символов и дата невалидна/недоступна — открывается тултип с `invalidDateHint`.
- **По blur** поля (при закрытом дропдауне) и **по закрытию дропдауна** (если поле не в фокусе) вызывается `triggerChangeFromInput`:
  - поле очищено, а `value` не пустое → `onChange("")`;
  - введена валидная и доступная дата, отличная от текущего `value` → `onChange(date.format(format))`;
  - иначе поле откатывается к последнему валидному значению (`lastValidPickerValuesRef`).
- **Выбор даты в календаре** вызывает `onChange` сразу.

Компонент контролируемый: пока потребитель не обновит `value` в ответ на `onChange`, зафиксированное значение в поле не изменится.

---

## Дизайн-токены

Собственных токенов нет — в `styles/DateFieldTarget.module.less` заданы только `min-width` поля по размерам. Внешний вид наследуется от `MaskedField` / `FormField`, `ButtonIcon`, `FormFieldClear`, `Tooltip` и `Calendar` / `DatePickerExtended`.

---

## Инварианты

- `forwardRef` на компоненте — не убирать. Ref пробрасывается в `DatePickerExtended` (корневой DOM-элемент — элемент `DatePickerExtended`); та же ссылка используется внутри как `targetRef` тултипа, поэтому `setRef` должен продолжать писать и в `tooltipTargetRef`.
- Публичный API (`IDateFieldProps`: `value`, `onChange`, `onClear`, `invalidDateHint`, `placeholderMask`, `targetProps` + унаследованные `size`/`status`/`label` и props `DatePickerExtended`) — изменение имён/типов/значений — breaking change.
- Отображаемый формат ввода зафиксирован константой `inputDateFormat = "DD.MM.YYYY"` (`constants.ts`) и связан с маской `FormFieldMaskedInput.presets.masks.date`. Менять его нужно синхронно с маской — иначе разъедутся длина ввода (`event.target.value.length === inputDateFormat.length`) и парсинг.
- `disabledDays` сравниваются со строкой даты в формате `format` (`isDayDisabled` делает `includes`) — не менять формат сравнения без обновления документации потребителя.
- Sync-эффект в `DateField.tsx` (`useEffect` по `[value, format, limitRange, disabledDays]` с `eslint-disable react-hooks/exhaustive-deps`) — намеренная синхронизация derived-стейта `pickerValues` с внешним `value`. `pickerValues` намеренно не в зависимостях: иначе эффект затирал бы промежуточный ввод пользователя. Сравнение идёт по `inputString`.
- Внутренние символы `DateFieldUtils` (`utils.ts`), `DateFieldContext`, `DateFieldTarget`, `inputDateFormat` не экспортируются через barrel — это приватные детали реализации. **Исключение — тип `IDateFieldTargetProps`:** он лежит в `types.ts`, а `index.ts` делает `export * from "./types"`, поэтому тип уходит в публичный API пакета. Переименование или изменение его полей — breaking change.
- **`DateFieldUtils` и `inputDateFormat` переиспользует `ChipDatePicker`** (`src/components/Chip/ChipDatePicker/ChipDatePicker.tsx`), который повторяет ту же логику ввода даты. Переименование или изменение сигнатур этих символов ломает `ChipDatePicker` — правь их только синхронно с ним.

---

## Accessibility

- Триггер — поле ввода с маской. Открытие/закрытие календаря по клику (`mousedown`), по клавише `Enter` и по `Space` (с `preventDefault` для `Space`, чтобы не вводить пробел и не скроллить страницу). Обработчики в `DateFieldTarget`.
- `aria-label` и `aria-labelledby` пробрасываются потребителем на элемент input через одноимённые props `DateField`. Компонент не хардкодит текст — библиотека мультиязычная.
- Состояние `disabled` (`status === EFormFieldStatus.DISABLED`) блокирует и поле, и кнопку календаря.
- Тултип с `invalidDateHint` показывается только в desktop-ветке (`MobileView.fallback`); в мобильном представлении ввод идёт через `DropdownMobileMaskedInput` в заголовке дропдауна.
- ARIA-роль выпадающего календаря (`dialog`) и навигация по нему — на стороне `DatePickerExtended` / `Calendar`.
- **Известный пробел (тесты):** у `DateFieldTarget` нет отдельного `__tests__/DateFieldTarget.test.tsx`, хотя логика нетривиальна (открытие по `mousedown` с `setTimeout`, `preventDefault` в adaptive-ветке, проброс фокуса в `DateFieldContext`). Сейчас она покрыта только косвенно — через тесты `DateField`.
- **Известный пробел:** кнопка-иконка календаря (`ButtonIcon` в `DateFieldTarget`) фокусируема и не имеет `aria-label` — скринридер объявит её без имени. В `MonthYearFieldTarget` аналогичная кнопка выведена из таб-обхода (`role="presentation"`, `tabIndex={-1}`). Приведение к общему поведению требует изменения публичного API (новый prop для локализованного лейбла) и вынесено за рамки AI-рефакторинга.

---

## Связанные компоненты

- `DatePickerExtended` — база выпадающего календаря; `DateField` конфигурирует её через render-props (`renderTarget`, `renderDropdownHeaderTarget`) и наследует её props.
- `MonthYearField` — альтернатива для выбора только месяца и года; устроен по той же схеме, но поле read-only.
- `MaskedField` — внутреннее поле-триггер; его props частично входят в публичный API (`size`, `status`, `label`, `targetProps`).
- `Calendar` — календарь внутри дропдауна; его props (`limitRange`, `disabledDays`, `markedDays`, `format`) входят в публичный API через `DatePickerExtended`.
- `Tooltip` — показывает `invalidDateHint` при вводе недоступной даты (только desktop-ветка).
- `DateFieldTarget` (внутренний, не в barrel) — рендерит `MaskedField` с иконкой календаря и кнопкой очистки, обрабатывает клик/клавиатуру/фокус. Описан здесь, отдельного AI.md не имеет.
- `DateFieldContext` (внутренний, не в barrel) — прокидывает `onChange`, `inputFocusedRef` и `triggerChangeFromInput` в target.
- `DateFieldUtils` (`utils.ts`, внутренний) — чистые функции парсинга/валидации даты (`getPickerValues`, `getCalendarDate`, `isAvailableDate`). Покрыты `__tests__/utils.test.tsx`.

---

## Stories

Основные истории: `stories/DateField/DateField.stories.tsx`
Файлы примеров: `stories/DateField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль size / status / label / placeholderMask / invalidDateHint + настройки postfix и description |
| `Default` | `DefaultExample.tsx` | Минимальное поле с label и маской-плейсхолдером |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `Statuses` | `StatusesExample.tsx` | Статусы default / disabled / error / warning |
| `Production` | `ProductionExample.tsx` | Production-композиция (`Example: production`): postfix `HelpBox`, description со ссылкой, кнопка очистки и возврат фокуса на input |
| `VisualTests` | `VisualTestsExample.tsx` | Скриншот-регрессия: заполненные поля всех размеров; `play` кликает по последнему полю, раскрывая календарь |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-08 | Создан документ. AI-рефакторинг (JSDoc-фиксы, `displayName` у `DateFieldTarget`), unit-тесты для `utils.ts` и поведения поля (ввод, blur, клавиатура, колбэки дропдауна) |
