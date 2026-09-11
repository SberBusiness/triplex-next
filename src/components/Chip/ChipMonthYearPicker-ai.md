---
component: ChipMonthYearPicker
category: Chips
related: [Chip, ChipDatePicker, ChipGroup, MonthYearField, DatePickerExtended]
tokens: []
stories: stories/Chips/ChipMonthYearPicker.stories.tsx
version: "1.0"
---

# ChipMonthYearPicker

## Назначение

Выбор месяца и года в виде чипса: в свёрнутом виде показывает название фильтра либо
выбранный месяц, по нажатию открывает календарь, сразу открытый на сетке месяцев
(`ECalendarPickType.MONTH_YEAR`). Ввода с клавиатуры нет — значение меняется только
выбором в календаре.

Используй когда: в панели фильтров нужен период гранулярности «месяц» (отчётный период,
месяц выписки) и результат должен читаться прямо на чипсе.
Не используй когда: нужна конкретная дата (`ChipDatePicker`), нужен диапазон месяцев
(`MonthYearRange`) или поле в форме с лейблом и статусом валидации (`MonthYearField`).

Компонент управляемый: `value` и `onChange` держит потребитель. Рекомендуется
располагать внутри `ChipGroup` — он задаёт отступы и режим одной строки.

---

## Варианты и props

`IChipMonthYearPickerProps` — это `IMonthYearFieldProps` без props поля формы
(`status`, `label`, `onClear`, `targetProps`) и без `pickType` (зафиксирован
компонентом), плюс `type` / `disabled` от `IChipProps` и собственные `label`,
`displayedValue`, `clearButtonProps`. То есть все props `DatePickerExtended`
(`alignment`, `limitRange`, `disabledDays`, `defaultViewDate`, `onDropdownOpen` /
`onDropdownClose`, `focusTrapProps`, кнопки навигации календаря) доступны и уходят
в него спредом.

`label` переопределён по сравнению с `MonthYearField`: там это лейбл поля из
`TextField`, здесь — **обязательный** текст самого чипса в невыбранном состоянии.

Неизвестные компоненту атрибуты (`data-*`, `aria-*`, `id`, обработчики `<div>`)
попадают на корневой `<div>` `DatePickerExtended`, а не на чипс-таргет.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `value` | `string` | Значение в формате `format`. Пустая строка либо непарсимое/выходящее за `limitRange` значение = «не выбрано» |
| `label` | `React.ReactNode` | Текст чипса, пока значение не выбрано |
| `onChange` | `(value: string) => void` | Вызывается с датой в формате `format` при выборе месяца и с `""` при очистке |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `format` | `string` | `"YYYYMMDD"` (`dateFormatYYYYMMDD`) | Транспортный формат `value`. На отображение не влияет |
| `limitRange` | `IDateLimitRange` | `globalLimitRange` (1900-01-01 … 2199-12-31) | Границы выбора. Значение вне диапазона считается невыбранным |
| `displayedValue` | `React.ReactNode` | — | Показывается вместо отформатированного значения, **только когда значение выбрано** |
| `placeholder` | `string` | — | Подсказка в поле шапки мобильного дропдауна. В самом чипсе не видна |
| `size` | `EComponentSize` | `MD` (дефолт `Chip`) | Размер чипса, иконки очистки и стрелки |
| `type` | `EChipType` | `TYPE_1` | Визуальный тип чипса |
| `disabled` | `boolean` | `false` | Блокирует открытие календаря и очистку |
| `clearButtonProps` | `Omit<IChipClearButtonProps, "size" \| "disabled" \| "onClick" \| "onKeyDown">` | — | Props кнопки очистки; основное назначение — задать `aria-label`. `size` и `disabled` наследуются от чипса и не переопределяются |
| `alignment` | `EDropdownAlignment` | `LEFT` | Выравнивание дропдауна относительно чипса |
| `className` | `string` | — | Дополнительный класс корневого `<div>`, мержится с `.chipGroupItem` |

### Отображаемое значение

Порядок вычисления того, что видно на чипсе:

```text
selected = getPickerValues(value, format, limitRange).calendarDate !== null
чипс     = selected ? (displayedValue ?? value в формате "MMM YYYY") : label
```

- формат отображения — `inputMonthYearFormat` (`"MMM YYYY"`) из
  `MonthYearField/constants.ts`, локализуется глобальной локалью `moment`
  (`Jan 1970` по умолчанию, `янв. 1970` при `moment.locale("ru")`). Он **не**
  зависит от `format` — тот описывает только транспортное значение;
- `value`, которое не парсится по `format` или выходит за `limitRange`, молча
  трактуется как «не выбрано»: показывается `label`, исключения не бросаются;
- `displayedValue` при пустом `value` игнорируется — приоритет всегда у `label`.

### Постфикс чипса

Правый слот переключается по тому же `selected`: выбранное значение → `ChipClearButton`
(очистка), невыбранное → `ChipDropdownArrow`, повёрнутая при открытом дропдауне.
Отдельной кнопки-календаря, как в `MonthYearField`, у чипса нет.

---

## Дизайн-токены

Собственных токенов у компонента нет: в `styles/Chip.module.less` ему принадлежит
только `.chipGroupItem` (`display: inline-block`). Весь визуал приходит из компонентов,
на которых он построен:

- чипс-таргет — `Chip` (группа `Chip`: фон, цвет, тень фокуса, состояния `selected` и `disabled`);
- кнопка очистки и стрелка — `ChipClearButton` / `ChipDropdownArrow` поверх `ButtonIcon`
  и `IconWrapper`, палитра иконок задаётся `paletteIndex`, а не токеном;
- календарь и выпадающий блок — `Calendar` (группа `Calendar`) и `Dropdown`.

Полный список токенов чипса — в `Chip-ai.md` → «Дизайн-токены», календаря —
в `Calendar-ai.md`.

---

## Инварианты

- **`forwardRef`** — не убирать. `ref` указывает на корневой `<div>` `DatePickerExtended`,
  а не на чипс-таргет. Цель `ref` не менять — на ней держится тест `Should forward ref correctly`.
- **`pickType` зафиксирован** значением `ECalendarPickType.MONTH_YEAR` и исключён из props
  (`Omit`). Возможность выбрать день здесь не открывать — для этого есть `ChipDatePicker`.
- **`label` обязателен и переопределяет опциональный `label` из `IMonthYearFieldProps`** —
  без него у чипса нет невыбранного состояния.
- **Пустая строка — контракт очистки.** Кнопка очистки вызывает `onChange("")`;
  отдельного `onClear` (как в `MonthYearField`) у компонента намеренно нет.
- **`className` мержится через `clsx` с `.chipGroupItem`** на корневом `<div>` —
  общий маркер семейства Chip*. Не удалять и не заменять спредом `...rest`.
- **Значение вне `limitRange` не является ошибкой** — оно показывается как невыбранное.
  Компонент библиотеки не бросает исключений в рантайме.
- **Barrel `src/components/Chip/index.ts`** экспортирует `ChipMonthYearPicker`,
  `ChipMonthYearPickerTarget` и их интерфейсы — сохранять.
- **Story ids `chips-chipmonthyearpicker--*`** завязаны на baseline-скриншоты
  в `__screenshots__/` — переименование story требует обновления baseline.

---

## Accessibility

- Таргет — `<span role="button">` из `Chip` с `aria-expanded`, отражающим состояние
  дропдауна. Доступное имя берётся из содержимого чипса (`label` либо значение).
- **Клавиатура на чипсе:** Enter и Space открывают и закрывают календарь с
  `preventDefault()` (гасят прокрутку и «клик» по пробелу). Escape на открытом
  дропдауне закрывает его (`DatePickerExtended`). `onKeyDown`, переданный в
  `ChipMonthYearPicker`, в чипс-таргет не пробрасывается — он попадает на корневой
  `<div>` `DatePickerExtended` вместе с остальным `...rest` и ловит всплывающие
  события. Собственный `onKeyDown` экспортируемого `ChipMonthYearPickerTarget`
  вызывается на любую клавишу, как у базового `Chip`; Enter/Space дополнительно
  переключают дропдаун, если чипс не `disabled`. Навигация по сетке месяцев —
  стрелки (шаг: ±1 месяц по горизонтали, ±3 по вертикали, PageUp/PageDown — ±1 год),
  внутри `CalendarViewMonths`.
- **Кнопка очистки** гасит всплытие Enter/Space и клика, поэтому активируется сама,
  а не открывает календарь. Своего текста у неё нет: задать доступное имя обязан
  потребитель через `clearButtonProps={{ "aria-label": "…" }}` — библиотека
  мультиязычная и текст не хардкодит.
  Её `disabled` не переопределяется из `clearButtonProps` (исключён из типа) —
  на задизейбленном чипсе очистка всегда недоступна.
- **Фокус:** дропдаун — `role="dialog"` с `aria-modal` и `FocusTrap`. При открытии
  с клавиатуры фокус уходит в календарь и возвращается на чипс при закрытии; при
  открытии мышью фокус не перехватывается (`mouseUsedRef` в `DatePickerExtended`).
- `disabled` у `Chip` не нативный: `pointer-events: none` плюс `tabIndex={-1}`.
  Дополнительно таргет сам игнорирует клик и Enter/Space, а `ChipClearButton`
  получает `disabled`. Программно диспатченные события всё же дойдут до DOM —
  см. `Chip-ai.md`.
- В мобильном режиме календарь показывается как мобильный `Dropdown`: в шапке —
  поле `readOnly` с выбранным значением и `placeholder`, справа — кнопка закрытия.

---

## Связанные компоненты

- `Chip` — база таргета: классы состояний, фокус, `role="button"`, ограничения `disabled`
- `ChipDatePicker` — альтернатива для выбора конкретной даты; тот же чипс-таргет,
  но с маскированным ручным вводом и связанным с ним локальным состоянием
- `ChipGroup` — рекомендуемый контейнер: отступы, перенос строк, режим `oneLine`
- `MonthYearField` — тот же выбор месяца в виде поля формы; источник
  `IMonthYearFieldProps` и утилит `MonthYearPickerUtils`
- `DatePickerExtended` — база: владеет состоянием открытости, дропдауном, календарём
  и корневым `<div>`; получает `renderTarget` и `renderDropdownHeaderTarget`
- `ChipMonthYearPickerTarget` — чипс-таргет этого компонента (экспортируется, но
  собственного AI.md не имеет): читает открытость из `DatePickerExtendedContext`,
  переключает её по клику и Enter/Space, рендерит `ChipClearButton` либо
  `ChipDropdownArrow` в `postfix`

---

## Stories

Основные истории: `stories/Chips/ChipMonthYearPicker.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipMonthYearPicker/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `type`, `size`, `label`, `placeholder`, `displayedValue`, `disabled` |
| `Default` | `DefaultExample.tsx` | Базовое управляемое использование: `value` + `onChange` + `aria-label` кнопки очистки |
| `Types` | `TypesExample.tsx` | `TYPE_1` и `TYPE_2` |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `WithCustomDisplayedValue` | `WithCustomDisplayedValueExample.tsx` | Подмена отображаемого значения через `displayedValue` |
| `VisualTests` | `VisualTestsExample.tsx` | Скриншот-регрессия: три размера с выбранным значением, у последнего открыт календарь |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-07 | Создан компонент и документ (AI-Ready Phase 1) |
