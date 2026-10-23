---
component: ChipDatePicker
category: Chips
related: [Chip, ChipDatePickerTarget, ChipMonthYearPicker, DateField, DatePickerExtended, FormField]
tokens: []
stories: stories/Chips/ChipDatePicker.stories.tsx
version: "1.0"
---

# ChipDatePicker

## Назначение

Управляемый выбор даты в виде чипса-фильтра. Показывает название фильтра либо
выбранную дату, открывает календарь и позволяет очистить выбор. В мобильном
дропдауне дополнительно доступен ручной ввод даты с маской.

Используй когда: в панели фильтров нужна конкретная дата, а выбранное значение
должно читаться прямо на чипсе. Размещай в `ChipGroup` для общих отступов и переноса.
Не используй когда: нужен месяц без дня (`ChipMonthYearPicker`), диапазон дат
(`DateRange`) или поле формы со статусом валидации (`DateField`).

Публичное подключение: `import { ChipDatePicker } from "@sberbusiness/triplex-next"`.
Потребитель хранит `value` и обновляет его в `onChange`.

---

## Варианты и props

`IChipDatePickerProps` наследует `IDateFieldProps` без `status` и `invalidDateHint`,
добавляет `type` / `disabled` от `IChipProps` и обязательный `label`.
Точные типы и полный список календарных props находятся в исходниках этих интерфейсов.

### Значение и отображение

| Prop | По умолчанию | Назначение и ограничения |
|---|---|---|
| `value` | Обязателен | Строка в формате `format`; `""` означает отсутствие выбора |
| `onChange` | Обязателен | Получает дату в формате `format` или `""` при очистке. Выбор календаря вызывает его сразу, ручной ввод — при закрытии дропдауна |
| `label` | Обязателен | `React.ReactNode` в невыбранном состоянии |
| `displayedValue` | — | Заменяет текст выбранной даты. При пустом или недоступном `value` игнорируется; `0` и `""` сохраняются, так как используется `??` |
| `format` | `"YYYYMMDD"` | Транспортный формат `value` и аргумента `onChange`. Отображение и мобильный ввод используют `"DD.MM.YYYY"` (`inputDateFormat`) |
| `placeholderMask` | — | Заполнение пустых позиций маски мобильного поля; не является подписью чипса |

Значение разбирается строго: невозможная дата, несовпадение с `format`, выход за
`limitRange` или попадание в `disabledDays` превращают его в невыбранное состояние.
Вместо ошибки показывается `label`, а справа — стрелка раскрытия. При выбранной
дате справа отображается кнопка очистки.

### Внешний вид и календарь

| Prop или группа | По умолчанию | Назначение и ограничения |
|---|---|---|
| `size` | `EComponentSize.MD` | SM / MD / LG; размер чипса, стрелки и кнопки очистки |
| `type` | `EChipType.TYPE_1` | TYPE_1 / TYPE_2; фон чипса |
| `disabled` | `false` | Визуальное отключение чипса и исключение его из tab-порядка; ограничения описаны в Accessibility |
| `limitRange` | `globalLimitRange` | Границы выбора: 1900-01-01 … 2199-12-31 по умолчанию |
| `disabledDays` | — | Недоступные дни в транспортном формате, проверяются и для `value`, и для ручного ввода |
| `alignment` | `EDropdownAlignment.LEFT` | Выравнивание дропдауна |
| `defaultViewDate`, `markedDays`, `reversedPick`, `pickType` | От `Calendar` | Настройка календаря через `DatePickerExtended`. `pickType` по умолчанию `DATE`, в отличие от `ChipMonthYearPicker` не зафиксирован |
| `onViewChange`, `onPageChange`, `dayHtmlAttributes`, `monthHtmlAttributes`, `yearHtmlAttributes` | — | События навигации и атрибуты ячеек календаря |
| `prevButtonProps`, `nextButtonProps`, `viewButtonProps`, `yesterdayButtonProps`, `todayButtonProps`, `tomorrowButtonProps` | — | Кнопки управления и футер календаря |
| `onDropdownOpen`, `onDropdownClose` | — | Уведомления о переходах открытости; при закрытии сначала обрабатывается мобильный ввод, затем вызывается `onDropdownClose` |
| `focusTrapProps` | От `DatePickerExtended` | Настройка десктопной ловушки фокуса |

### Передача атрибутов

`className`, `id`, `data-*`, `aria-*` и обработчики `<div>` из `...rest` уходят
на корневой `<div>` `DatePickerExtended`, а не на чипс-таргет и не на мобильное поле.
В текущей реализации пользовательский `className` переопределяет `.chipGroupItem`
корня из-за порядка spread; его слияние изменило бы существующее поведение.

Унаследованные `onClear` и `targetProps` присутствуют в типе, но не подключены к
`ChipDatePickerTarget`: они не настраивают очистку и внутренний таргет.
Очистка всегда сообщает `onChange("")`. Удалять эти props при рефакторинге нельзя.

### Незавершённый мобильный ввод

- Открытый чипс сохраняет последнее значение из внешних props; промежуточный
  ввод меняет мобильное поле и выбранный день календаря, а не подпись чипса.
- При закрытии полная допустимая дата коммитится через `onChange`; пустой ввод
  очищает ранее выбранную дату. Повторная передача того же значения не нужна.
- Неполная, невозможная, запрещённая или выходящая за границы дата откатывается
  к последнему значению из props без вызова `onChange`.
- Выбор в календаре закрывает дропдаун и сообщает дату один раз: флаг
  `dropdownClosedByCalendarRef` предотвращает дополнительный коммит ручного ввода.
- Изменение `value`, `format`, `limitRange` или `disabledDays` синхронизирует поле
  с внешними props. Эффект намеренно не зависит от промежуточного `pickerValues`,
  иначе каждый введённый символ затирался бы прежним `value`.

---

## Дизайн-токены

Собственных токенов нет: используемый самим компонентом `.chipGroupItem` из
`styles/Chip.module.less` задаёт только `display: inline-block`, поэтому
frontmatter содержит `tokens: []`.

Внешний вид композиции задают зависимости: `Chip` (фон, цвет, фокус, selected и
disabled), `Calendar` (календарь) и `Dropdown` (выпадающий блок). Их токены описаны
в соответствующих AI.md; например, фон обычного чипса — `Chip.Background_Type1_Default`,
фокус — `Chip.Shadow_Focus`, фон календаря — `Calendar.Background`.

Порядок переопределения токенов описан в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- `forwardRef<HTMLDivElement>` сохраняется: ссылка указывает на корневой
  `<div>` `DatePickerExtended`, а не на `<span>` чипса или `<input>`.
- `value` / `onChange` — управляемый контракт, очистка передаёт пустую строку.
  `format` не меняет `inputDateFormat` и видимую маску.
- Нельзя добавлять промежуточные значения поля в зависимости эффекта
  синхронизации с props либо терять разграничение ввода и выбора календаря.
- `DateFieldUtils` и `inputDateFormat` импортируются из внутренних модулей
  `DateField`; изменения их логики или сигнатур требуют проверки обоих компонентов.
- `IChipDatePickerProps`, `ChipDatePicker`, `ChipDatePickerTarget` и его props
  экспортируются через `src/components/Chip/index.ts` и вложенный barrel; сохранять
  имена, типы и экспорты. Контракт таргета описан в [ChipDatePickerTarget-ai.md](./ChipDatePickerTarget-ai.md).
- Story ids `chips-chipdatepicker--*` используются существующими baseline-файлами
  xs / xl, поэтому их нельзя переименовывать без обновления visual-проверок.

---

## Accessibility

- Таргет — `Chip` с `<span role="button">`, фокусируемый через `tabIndex={0}`.
  Доступное имя берётся из `label` или отображаемого значения; `aria-expanded`
  отражает состояние календаря. Enter / Space переключают дропдаун с
  `preventDefault()`, Escape из корня или портала закрывает его.
- Десктопный календарь находится в `role="dialog"` с `aria-modal` и `FocusTrap`.
  При открытии с клавиатуры фокус переходит внутрь и возвращается на таргет при
  закрытии; открытие мышью не перехватывает фокус. Настройки делегированы
  `DatePickerExtended`.
- В мобильном режиме шапка содержит редактируемое маскированное поле с
  `autoFocus`, изменение коммитится при закрытии. `aria-label` корня не
  пробрасывается этому полю: отдельного prop для его настройки сейчас нет.
- `disabled` даёт классу `Chip` `pointer-events: none` и `tabIndex={-1}`,
  но не является нативным `disabled`. `ChipDatePickerTarget` пока не блокирует
  программно отправленные клики и клавиши, а кнопка очистки не получает
  `disabled`; на такое отключение нельзя полагаться как на защиту обработчиков.
- Кнопка очистки останавливает всплытие клика, чтобы не открывать календарь.
  Доступное имя ей пока нельзя передать через `ChipDatePicker`: собственного
  `clearButtonProps` нет, а `targetProps` не подключён. Это существующее ограничение,
  связанное с задачами `ChipClearButton` / `ChipDatePickerTarget`, а не требование
  добавлять локализованную строку внутрь библиотеки.

---

## Связанные компоненты

- `Chip` — база таргета и источник визуальных состояний; родитель семейства.
- [ChipDatePickerTarget](./ChipDatePickerTarget-ai.md) — публичный таргет со своим контекстным и клавиатурным
  контрактом: читает `DatePickerExtendedContext`, переключает дропдаун, выбирает
  между `ChipClearButton` и `ChipDropdownArrow`.
- `ChipMonthYearPicker` — альтернатива для выбора месяца без дня и ручного ввода.
- `DateField` — альтернатива в форме; источник унаследованного интерфейса,
  `DateFieldUtils` и `inputDateFormat`.
- `DatePickerExtended` — рендерится внутри, владеет календарём, дропдауном,
  открытостью и корневым DOM-элементом.
- `FormField` — семейство маскированного ввода, используемого через
  `DropdownMobileMaskedInput`; общие props поля и маски описаны в нём.
- `ChipGroup` — рекомендуемый контейнер для ряда фильтров.

---

## Stories

Основные истории: `stories/Chips/ChipDatePicker.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipDatePicker/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Управляемый выбор с контролами type, size, label, displayedValue, disabled |
| `Default` | `DefaultExample.tsx` | Минимальный управляемый фильтр value / onChange |
| `Types` | `TypesExample.tsx` | TYPE_1 / TYPE_2 |
| `Sizes` | `SizesExample.tsx` | SM / MD / LG |
| `WithCustomDisplayedValue` | `WithCustomDisplayedValueExample.tsx` | Подмена текста выбранного значения |
| `VisualTests` | `VisualTestsExample.tsx` | Три размера с фиксированной датой 19700101; play открывает последний календарь |

Для всех пяти не-Playground историй существуют baseline-скриншоты xs / xl в
`__screenshots__/`. Stories и их идентификаторы в TRI-136 сохранены.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-19 | Создан документ; подтверждены контракт управляемой даты, мобильного ввода и существующие ограничения. Лениво инициализировано состояние и дополнены unit-тесты (TRI-136) |
| 2026-10-21 | Добавлена ссылка на отдельную AI-документацию ChipDatePickerTarget |
