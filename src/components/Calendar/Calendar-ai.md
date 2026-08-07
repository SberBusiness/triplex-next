---
component: Calendar
category: Date components
related: [DatePickerExtended, DateField, DateRange, MonthYearField, MonthYearRange, ChipDatePicker]
tokens:
  - --triplex-next-Calendar-Background
  - --triplex-next-Calendar-View_Header_Color
  - --triplex-next-Calendar-View_Item_Background_Default
  - --triplex-next-Calendar-View_Item_Background_Hover
  - --triplex-next-Calendar-View_Item_Background_Selected_Default
  - --triplex-next-Calendar-View_Item_Background_Selected_Hover
  - --triplex-next-Calendar-View_Item_Background_Selected_Muted_Default
  - --triplex-next-Calendar-View_Item_Background_Selected_Muted_Hover
  - --triplex-next-Calendar-View_Item_BorderColor_Default
  - --triplex-next-Calendar-View_Item_BorderColor_Focus
  - --triplex-next-Calendar-View_Item_Color_Default
  - --triplex-next-Calendar-View_Item_Color_Disabled
  - --triplex-next-Calendar-View_Item_Color_Hover
  - --triplex-next-Calendar-View_Item_Color_Muted
  - --triplex-next-Calendar-View_Item_Color_Selected
  - --triplex-next-Calendar-View_Item_Color_Selected_Muted_Default
  - --triplex-next-Calendar-View_Item_Color_Selected_Muted_Hover
  - --triplex-next-Calendar-View_Item_Mark_Basic_Background_Default
  - --triplex-next-Calendar-View_Item_Mark_Basic_Background_Selected_Default
  - --triplex-next-Calendar-View_Item_Mark_Basic_Background_Selected_Hover
  - --triplex-next-Calendar-View_Item_Mark_Standard_Background_Default
  - --triplex-next-Calendar-View_Item_Mark_Standard_Background_Selected_Default
  - --triplex-next-Calendar-View_Item_Mark_Standard_Background_Selected_Hover
  - --triplex-next-Calendar-View_Item_Mark_Attention_Background_Default
  - --triplex-next-Calendar-View_Item_Mark_Attention_Background_Selected_Default
  - --triplex-next-Calendar-View_Item_Mark_Attention_Background_Selected_Hover
  - --triplex-next-Calendar-View_Item_Mark_Critical_Background_Default
  - --triplex-next-Calendar-View_Item_Mark_Critical_Background_Selected_Default
  - --triplex-next-Calendar-View_Item_Mark_Critical_Background_Selected_Hover
stories: stories/Calendar/Calendar.stories.tsx
version: "1.0"
---

# Calendar

## Назначение

Календарная сетка выбора даты или месяца: заголовок с периодом и кнопками перелистывания, таблица дней / месяцев / годов и опциональный футер с кнопками быстрого перехода. Компонент полностью управляемый — выбранную дату хранит потребитель (`pickedDate` + `onDateChange`), внутри хранится только состояние навигации (текущая страница и вид отображения).

Используй когда: нужна встроенная в макет календарная сетка (внутри поповера, дропдауна, карточки) — например, при построении собственного date picker'а.

Не используй когда: нужен готовый инпут с датой (`DateField`), выпадающий календарь у поля (`DatePickerExtended`), выбор месяца и года через поле (`MonthYearField`) или выбор диапазона (`DateRange`, `MonthYearRange`) — все они уже используют `Calendar` внутри.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `pickedDate` | `string \| Moment \| null` | Выбранная дата. Строка парсится по `format`. `null` — дата не выбрана. |
| `onDateChange` | `(date: Moment) => void` | Вызывается при выборе даты пользователем. Компонент не хранит выбор — потребитель обязан обновить `pickedDate`. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `format` | `string` | `dateFormatYYYYMMDD` (`"YYYYMMDD"`) | Формат парсинга `pickedDate` / `defaultViewDate` и ключей `markedDays` / `disabledDays`. |
| `pickType` | `ECalendarPickType` | `DATE` | `DATE` — выбор дня (стартовый вид `DAYS`), `MONTH_YEAR` — выбор месяца (стартовый вид `MONTHS`, клик по месяцу вызывает `onDateChange`). |
| `defaultViewDate` | `string \| Moment` | — | Страница, открываемая при пустой `pickedDate`. Учитывается только при инициализации. |
| `limitRange` | `IDateLimitRange` | `globalLimitRange` (1900-01-01 — 2199-12-31) | Допустимый период. Даты вне периода отключены, кнопки перелистывания у границы — `disabled`. Обе границы (`dateFrom` / `dateTo`) опциональны — незаданная сторона берётся из `globalLimitRange`. |
| `markedDays` | `string[] \| Record<string, ECalendarDateMarkType>` | — | Дни с точкой-отметкой. Массив — отметка типа `BASIC`; объект — тип отметки на каждый день. Ключи в формате `format`. |
| `disabledDays` | `string[]` | — | Дни, недоступные для выбора (в формате `format`). При клавиатурной навигации пропускаются. |
| `reversedPick` | `boolean` | `false` | Обратный порядок выбора: старт с вида `YEARS` (год → месяц → день). Учитывается только при инициализации. |
| `adaptiveMode` | `boolean` | `false` | Адаптивная (мобильная) вёрстка: резиновая ширина и увеличенные ячейки, кнопки футера размера `MD` вместо `SM`. |
| `onPageChange` | `(viewDate: Moment, viewMode: ECalendarViewMode) => void` | — | Смена страницы внутри текущего вида (перелистывание, уход навигации за пределы страницы). |
| `onViewChange` | `(viewDate: Moment, viewMode: ECalendarViewMode) => void` | — | Смена вида отображения (дни ⇄ месяцы ⇄ годы). |

### Props вложенных элементов (`ICalendarNestedProps`)

| Prop | Тип | Описание |
|---|---|---|
| `dayHtmlAttributes` | `TTdHTMLAttributesWithData \| (({marked}) => TTdHTMLAttributesWithData)` | Атрибуты ячейки дня. Функциональный вариант получает признак `marked` — им удобно помечать дни с отметкой. Оба варианта допускают `data-*` атрибуты. |
| `monthHtmlAttributes` / `yearHtmlAttributes` | `TTdHTMLAttributesWithData` | Атрибуты ячеек месяца / года. |
| `prevButtonProps` / `nextButtonProps` | `TButtonHTMLAttributesWithData \| ((viewMode) => ...)` | Props кнопок перелистывания. `disabled` объединяется с внутренним расчётом по `limitRange`, `onClick` вызывается после смены страницы. |
| `viewButtonProps` | `TButtonHTMLAttributesWithData \| ((viewMode) => ...)` | Props кнопки заголовка (смена вида). В виде `YEARS` кнопка не рендерится — период выводится как `<span>`. |
| `todayButtonProps` | `TButtonHTMLAttributesWithData \| (({viewMode, currentPeriodSelected}) => ...)` | **Наличие этого prop включает футер.** Без него футер не рендерится вовсе. Текст задаёт потребитель (обычно «Сегодня» / «К текущей дате» по `currentPeriodSelected`). |
| `yesterdayButtonProps` / `tomorrowButtonProps` | `TButtonHTMLAttributesWithData \| ((viewMode) => ...)` | Кнопки «Вчера» / «Завтра». Рендерятся только вместе с футером и только когда открыта страница текущего месяца в виде `DAYS`. |

### Ограничения

- `defaultViewDate` и `reversedPick` влияют на стартовое состояние и не пересчитываются при последующих ререндерах (кроме синхронизации страницы с изменившейся `pickedDate`).
- `pickType` задаёт стартовый вид только при инициализации, но продолжает влиять на поведение при каждом рендере: от него зависят выбор месяца (`MONTH_YEAR` возвращает дату, иначе — проваливается в дни) и состав футера.

---

## Дизайн-токены

```
--triplex-next-Calendar-Background
--triplex-next-Calendar-View_Header_Color
--triplex-next-Calendar-View_Item_Background_Default
--triplex-next-Calendar-View_Item_Background_Hover
--triplex-next-Calendar-View_Item_Background_Selected_Default
--triplex-next-Calendar-View_Item_Background_Selected_Hover
--triplex-next-Calendar-View_Item_Background_Selected_Muted_Default
--triplex-next-Calendar-View_Item_Background_Selected_Muted_Hover
--triplex-next-Calendar-View_Item_BorderColor_Default
--triplex-next-Calendar-View_Item_BorderColor_Focus
--triplex-next-Calendar-View_Item_Color_Default
--triplex-next-Calendar-View_Item_Color_Disabled
--triplex-next-Calendar-View_Item_Color_Hover
--triplex-next-Calendar-View_Item_Color_Muted
--triplex-next-Calendar-View_Item_Color_Selected
--triplex-next-Calendar-View_Item_Color_Selected_Muted_Default
--triplex-next-Calendar-View_Item_Color_Selected_Muted_Hover
--triplex-next-Calendar-View_Item_Mark_Basic_Background_Default
--triplex-next-Calendar-View_Item_Mark_Basic_Background_Selected_Default
--triplex-next-Calendar-View_Item_Mark_Basic_Background_Selected_Hover
--triplex-next-Calendar-View_Item_Mark_Standard_Background_Default
--triplex-next-Calendar-View_Item_Mark_Standard_Background_Selected_Default
--triplex-next-Calendar-View_Item_Mark_Standard_Background_Selected_Hover
--triplex-next-Calendar-View_Item_Mark_Attention_Background_Default
--triplex-next-Calendar-View_Item_Mark_Attention_Background_Selected_Default
--triplex-next-Calendar-View_Item_Mark_Attention_Background_Selected_Hover
--triplex-next-Calendar-View_Item_Mark_Critical_Background_Default
--triplex-next-Calendar-View_Item_Mark_Critical_Background_Selected_Default
--triplex-next-Calendar-View_Item_Mark_Critical_Background_Selected_Hover
```

Кнопки заголовка и футера используют токены `Button` / `ButtonIcon`.

---

## Инварианты

- **`Calendar` — классовый компонент** (`React.PureComponent`), один из немногих оставшихся в библиотеке. `ref` на нём — экземпляр класса, а не DOM-элемент. Перевод на функциональный компонент или добавление `forwardRef` — breaking change, требует отдельного решения мейнтейнера.
- Компонент полностью управляемый: клик по дате не меняет `pickedDate`, а только вызывает `onDateChange`. Внутреннее состояние — `viewDate` (страница), `viewMode` (вид) и производная от `pickedDate` копия.
- Публичный API (`ICalendarProps`, `ICalendarNestedProps`, `ICalendarViewProps`, `TPickedDate`, `TPickedDateProp`, `TCalendarMarkedDays`, `TDayHtmlAttributes`, `TTdHTMLAttributesWithData`, `TButtonHTMLAttributesWithData`, `ECalendarPickType`, `ECalendarViewMode`, `ECalendarDateMarkType`) экспортируется через `src/components/Calendar/index.ts` — переименования и изменения значений enum'ов недопустимы.
- `ECalendarDateMarkType` — числовой enum. Проверки типа отметки делаются через `markType !== undefined`, а не через truthy — `BASIC` равен `0`.
- Компонент не хардкодит текст: подписи кнопок футера, `aria-label` кнопок перелистывания и любые заголовки передаёт потребитель через `*ButtonProps`. Библиотека мультиязычная.
- Внутренние модули (`utils.ts`, `CalendarContext`, `CalendarViewContext`, `components/*`) в barrel не экспортируются, но `isDayDisabled` и `isDateOutOfRange` из `utils.ts` импортируются соседними компонентами (`DateField`, `MonthYearField`) — не удалять и не переименовывать без проверки потребителей внутри `src`.
- `periodId` (`calendar-period-{uniqueId}`) связывает заголовок и таблицу через `aria-labelledby` — не удалять.
- В библиотеке действует React 17-совместимость (ветка `release-0`): не переводить компонент на `useId` и другие React 18-only API.

---

## Accessibility

- Таблица вида имеет `role="grid"` и `aria-labelledby={periodId}`, указывающий на заголовок с текущим периодом. Заголовок помечен `aria-live="polite"` — смена месяца/года озвучивается скринридером.
- Внутри сетки реализована roving tabindex-навигация: ровно одна ячейка имеет `tabIndex=0` (выбранная дата, либо первая доступная дата страницы), остальные — `tabIndex=-1`.
- Клавиатура в сетке:
  - `ArrowLeft` / `ArrowRight` — соседняя ячейка строки (день / месяц / год);
  - `ArrowUp` / `ArrowDown` — соседняя строка (неделя / 3 месяца / 3 года);
  - `PageUp` / `PageDown` — предыдущая / следующая страница (месяц / год / 12 лет);
  - `Enter` / `Space` — выбор даты (с `preventDefault`).
- Недоступные дни (`disabledDays`, выход за `limitRange`) при навигации стрелками пропускаются; попытка выйти за `limitRange` оставляет фокус на текущей дате.
- Уход навигации за пределы текущей страницы автоматически перелистывает страницу (`onPageChange`) и возвращает фокус на новую tabbable-ячейку. Фокус восстанавливается только если он уже находился внутри сетки — программная смена страницы (кнопки перелистывания, внешняя смена `pickedDate`) фокус не забирает.
- Выбранная ячейка помечается `aria-selected="true"`; отключённая — классом `disabled` и `pointer-events: none` (атрибут `disabled` у `<td>` невозможен).
- Кнопки перелистывания — `ButtonIcon` без текста: потребитель обязан передать `aria-label` через `prevButtonProps` / `nextButtonProps`.

---

## Связанные компоненты

- `DatePickerExtended` — выпадающий календарь над произвольным таргетом; рендерит `Calendar` внутри дропдауна.
- `DateField` — поле ввода даты с календарём; использует `isDayDisabled` и `isDateOutOfRange` из `Calendar/utils` и тип `TPickedDate` из `Calendar/types`.
- `MonthYearField`, `MonthYearRange` — выбор месяца и года, конфигурируют `Calendar` через `pickType={ECalendarPickType.MONTH_YEAR}`; `MonthYearField` использует `isDateOutOfRange` из `Calendar/utils`.
- `DateRange` — выбор диапазона дат двумя полями.
- `ChipDatePicker` — чип-фильтр с календарём.

Внутренние субкомпоненты (в barrel не экспортируются, отдельного AI.md не имеют):

- `CalendarControls` — заголовок с кнопками перелистывания и смены вида.
- `CalendarView` — переключатель видов; хранит `viewItemFocusedRef` (признак фокуса внутри сетки) в `CalendarViewContext`, чтобы не сбрасывать выбранную для фокуса ячейку при перелистывании.
- `CalendarViewDays` / `CalendarViewMonths` / `CalendarViewYears` — сетки дней, месяцев и годов.
- `CalendarViewItem` — ячейка сетки: классы состояний, отметка, `aria-selected`, обработка `Enter` / `Space` и фокуса.
- `CalendarFooter` / `CalendarFooterButton` — футер и его кнопки быстрого перехода («Вчера» / «Сегодня» / «Завтра»).
- `utils.ts` — чистые функции: парсинг даты, формат заголовка, проверки периода и отключённых дней, сдвиг даты при клавиатурной навигации. Покрыты `__tests__/utils.test.tsx`.

---

## Stories

Основные истории: `stories/Calendar/Calendar.stories.tsx`
Файлы примеров: `stories/Calendar/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `defaultViewDate` / `adaptiveMode` и переключатели отмеченных дней, отключённых дней и кнопок футера |
| `Default` | `DefaultExample.tsx` | Минимальный управляемый календарь: `pickedDate` + `onDateChange` |
| `MarkedDays` | `MarkedDaysExample.tsx` | Отображается как «With marked days». Все четыре типа отметок (`BASIC` / `STANDARD` / `ATTENTION` / `CRITICAL`) |
| `DisabledDays` | `DisabledDaysExample.tsx` | Отображается как «With disabled days». Дни, недоступные для выбора |
| `Buttons` | `ButtonsExample.tsx` | Отображается как «With buttons». Футер с кнопками «Вчера» / «Сегодня» / «Завтра» и текстом по `currentPeriodSelected` |
| `ReversedPick` | `ReversedPickExample.tsx` | Обратный порядок выбора: год → месяц → день |
| `VisualTests` | `VisualTestsExample.tsx` | Скриншот-регрессия: календарь на фиксированной дате (январь 1970), чтобы снимок не зависел от текущей даты |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-30 | Создан документ. AI-рефакторинг: общие хелперы клавиатурной навигации и сдвига даты в `utils.ts`, чистка дублирования в `CalendarControls` и сетках, JSDoc на публичных типах, `displayName` у субкомпонентов; добавлены unit-тесты (`Calendar`, `CalendarViewItem`, `utils`) |
| 2026-07-30 | Исправлены найденные при рефакторинге баги: выбор первой tabbable-ячейки перебирал кандидатов с накоплением шага (в виде годов — месяцами вместо лет; хелпер `getFirstEnabledDate`); заголовок при внешней смене `pickedDate` игнорировал формат вида (`MONTH_YEAR` показывал «March 1970» вместо «1970»); фокус после `PageUp`/`PageDown` не возвращался на tabbable-ячейку, если её позиция сетки не менялась; шаг страницы в `changeTabbableDate`/`changeFocusedDate` переведён на `NAVIGATION_STEPS.page`. Расширения API: `dateFrom`/`dateTo` в `IDateLimitRange` стали опциональными, функциональный `dayHtmlAttributes` допускает `data-*` (`TTdHTMLAttributesWithData`) |
