---
component: DateRange
category: Date components
related: [MonthYearRange, DateField, ButtonIcon]
tokens: []
stories: stories/DateRange/DateRange.stories.tsx
version: "1.0"
---

# DateRange

## Назначение

Диапазон дат: два поля выбора даты («от» и «до») и кнопки сдвига всего диапазона назад и вперёд. Сам компонент ни полей, ни кнопок не рендерит — их отдаёт потребитель через render-props (`renderPickerFrom`, `renderPickerTo`, `renderButtonBack`, `renderButtonForward`). На DateRange остаются раскладка, согласование границ диапазона (дата «от» не может быть больше даты «до») и арифметика сдвига.

Используй когда: пользователю нужно ввести период двумя полями дат и быстро перелистывать его целиком (предыдущий месяц, следующий квартал).

Не используй когда: нужен диапазон месяцев, а не дней — `MonthYearRange`; нужна одна дата — `DateField`; нужен собственный триггер с выпадающим календарём — `DatePickerExtended`; нужна календарная сетка без полей — `Calendar`.

---

## Варианты и props

`IDateRangeProps` наследует `React.HTMLAttributes<HTMLDivElement>` без `defaultValue` и `onChange`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `value` | `TDateRangeValue` | Кортеж `[start, end]`. Компонент управляемый — состояние держит потребитель. |
| `onChange` | `(value: TDateRangeValue) => void` | Вызывается при изменении любой из границ и при сдвиге диапазона. Всегда получает обе даты. |
| `renderPickerFrom` | `(props: IDateRangePickerProvideProps) => ReactNode` | Рендер поля даты «от». |
| `renderPickerTo` | `(props: IDateRangePickerProvideProps) => ReactNode` | Рендер поля даты «до». |
| `renderButtonBack` | `(props: IDateRangeButtonProvideProps) => ReactNode` | Рендер кнопки сдвига назад. Вызывается только при `hideNavigation !== true`. |
| `renderButtonForward` | `(props: IDateRangeButtonProvideProps) => ReactNode` | Рендер кнопки сдвига вперёд. Вызывается только при `hideNavigation !== true`. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `shiftAmount` | `number` | `1` | На сколько единиц `shiftUnit` сдвигаются обе границы за одно нажатие. |
| `shiftUnit` | `EDateRangeShiftUnit` | `MONTH` | Единица сдвига: `DAY`, `WEEK`, `MONTH`, `QUARTER`, `YEAR`. Значения enum — строки, которые напрямую уходят в `moment`. |
| `hideNavigation` | `boolean` | `false` | Скрывает обе кнопки сдвига: render-props кнопок не вызываются вовсе. |

### Формат значения

`TDateRangeValue` — `[start, end]`, обе даты строками в формате `YYYYMMDD` (`dateFormatYYYYMMDD` из `src/consts/DateConst`). Пустая строка означает «дата не выбрана»; допустимо состояние, когда заполнена только одна граница.

### Что получают render-props

| Поле | Кому | Значение |
|---|---|---|
| `value` | пикеры | Соответствующая граница диапазона (`start` или `end`). |
| `onChange` | пикеры | Принимает строку `YYYYMMDD`; внутри применяется согласование границ (ниже). |
| `children` | кнопки | Иконка направления (`CaretleftStrokeSrvIcon20` / `CaretrightStrokeSrvIcon20`). |
| `className` | кнопки | Класс кнопки из LESS-модуля; при неполном диапазоне к нему добавляется литерал `disabled` (см. «Инварианты»). |
| `disabled` | кнопки | `true`, пока заполнены не обе границы. Применить его к DOM-элементу — задача потребителя. |
| `onClick` | кнопки | Сдвиг диапазона. На неполном диапазоне обработчик выходит, не вызывая `onChange`. |

Объекты сформированы так, чтобы их можно было целиком спредить в `DateField` (пикеры) и `ButtonIcon` (кнопки) — именно так устроены все примеры в stories.

### Что уходит на корневой элемент

`className` объединяется с внутренним классом; остальные HTML-атрибуты (`id`, `style`, `data-*`, `aria-*`, обработчики) спредятся на корневой `div`. `children` компонент принимает по типу (от `HTMLAttributes`), но игнорирует: содержимое корневого `div` полностью определяется render-props.

### Согласование границ

- Новая дата «от» больше текущей «до» → `onChange([date, ""])`: дата «до» сбрасывается.
- Новая дата «до» меньше текущей «от» → `onChange(["", date])`: дата «от» сбрасывается.
- Если новая дата пустая или противоположная граница пустая, проверка порядка не выполняется — значение записывается как есть.
- Сравнение строковое, без `moment`: формат `YYYYMMDD` лексикографически совпадает с хронологическим порядком. Поэтому формат дат менять нельзя (см. «Инварианты»).

### Сдвиг диапазона

- Обе границы сдвигаются на одну и ту же величину (`shiftDateRange` в `utils.ts`, под капотом `moment().add()`). При сдвиге на месяцы, кварталы и годы число месяца клампится по длине целевого месяца, поэтому длина диапазона в днях может измениться: `20240331` минус месяц → `20240229`.
- Сдвиг доступен только при обеих заполненных границах: иначе кнопкам приходит `disabled: true`, а обработчик дополнительно выходит без `onChange`.
- Валидность дат перед сдвигом не проверяется: строка не в формате `YYYYMMDD` даст `"Invalid date"` в результате. Близнец `MonthYearRange` в том же месте делает строгий `moment(..., true).isValid()` и выходит без `onChange` — эталон, если поведение решат выровнять.

---

## Дизайн-токены

Собственных дизайн-токенов у компонента нет — LESS-модуль описывает только раскладку (`display: flex`, отступы разделителя и кнопок, `z-index` кнопки). Внешний вид задают компоненты, которые потребитель вернул из render-props, и цвета иконок (`paletteIndex={5}`).

Вертикальный отступ разделителя и кнопок подбирается под размер поля селекторами `:has([class*="sm"])`, `:has([class*="md"])`, `:has([class*="lg"])` — по подстроке в классе вложенного поля, а не по prop компонента.

---

## Инварианты

- **`forwardRef` обязателен.** `ref` уходит на корневой `<div>` — туда же, куда `className` и остальные html-атрибуты. Убирать `forwardRef` нельзя.
- **К `className` кнопок при неполном диапазоне подмешивается литерал `disabled`**, а не класс LESS-модуля (класса `.disabled` в модуле нет). Строка уходит наружу, в `className` компонента потребителя, и на неё опираются тесты, поэтому «починка» на `styles.disabled` — изменение наблюдаемого поведения. `MonthYearRange` в том же месте ничего не подмешивает.
- **Формат дат `YYYYMMDD` зашит в контракт**: на нём держится строковое сравнение границ и парсинг в `moment`. Ни `value`, ни аргумент `onChange` пикера в другом формате работать не будут.
- Значения `EDateRangeShiftUnit` — это строковые единицы `moment` (`day`, `week`, `month`, `quarter`, `year`); переименование значений ломает и публичный API, и сдвиг.
- Публичный API (`DateRange`, `IDateRangeProps`, `IDateRangeButtonProvideProps`, `IDateRangePickerProvideProps`, `TDateRangeValue`, `EDateRangeShiftUnit`) экспортируется через `src/components/DateRange/index.ts`; `TDateRangeValue` живёт в `types.ts`, остальное — в `DateRange.tsx` и `enums.ts`. `utils.ts` внутренний и в barrel не экспортируется.
- Отступы завязаны на подстроки `sm` / `md` / `lg` в классе вложенного поля — переименование классов размеров в `FormField`-полях тихо сломает выравнивание.
- Компонент не хардкодит текст: доступные имена полей и кнопок задаёт потребитель — библиотека мультиязычная.
- React 17-совместимость (ветка `release-0`): не переводить на `useId` и другие React 18-only API.

---

## Accessibility

- Собственной роли и aria-атрибутов у компонента нет: корневой `div` — только контейнер раскладки. Всё, что передано в `aria-*`, уходит на него.
- Кнопки сдвига содержат только иконку, поэтому доступное имя (`aria-label` или `title`) обязан задать потребитель в своём `renderButtonBack` / `renderButtonForward`. Компонент передаёт в них лишь иконку, класс, `disabled` и `onClick`.
- `disabled` приходит в render-prop значением — если потребитель не применит его к DOM-кнопке, она останется фокусируемой и кликабельной (клик при этом ничего не изменит).
- Связь «от» / «до», подписи и сообщения об ошибке — на стороне полей (`DateField`), собственной валидации и `aria-live` у DateRange нет.
- Клавиатурной навигации компонент не добавляет: порядок табуляции определяется DOM-порядком (кнопка назад → поле «от» → поле «до» → кнопка вперёд).

---

## Связанные компоненты

- `MonthYearRange` — тот же сценарий для диапазона месяцев: одинаковый набор props и render-props, отличается единицами сдвига (`EMonthYearRangeShiftUnit`).
- `DateField` — поле, ради которого сделан контракт `IDateRangePickerProvideProps`: объект пикера спредится в `DateField` целиком (`value` + `onChange`).
- `ButtonIcon` — кнопка, ради которой сделан контракт `IDateRangeButtonProvideProps`: объект кнопки спредится в `ButtonIcon` целиком (`children` + `className` + `disabled` + `onClick`).

`DatePickerExtended` и `Calendar` в DateRange не используются напрямую — они находятся внутри `DateField`.

---

## Stories

Основные истории: `stories/DateRange/DateRange.stories.tsx`
Файлы примеров: `stories/DateRange/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `shiftAmount` / `shiftUnit` / `hideNavigation` |
| `Default` | `DefaultExample.tsx` | Минимальный пример: два `DateField` и два `ButtonIcon`, сдвиг на месяц |
| `Sizes` | `SizesExample.tsx` | Размеры полей SM / MD / LG и выравнивание разделителя с кнопками |
| `WithoutNavigation` | `WithoutNavigationExample.tsx` | `hideNavigation`: только поля, кнопки не рендерятся |
| `Example` | `ProductionExample.tsx` | Production-композиция (`Example: production`): поля с описанием и ссылкой под ними |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-18 | Создан документ. Компонент переведён с `React.FC` на `forwardRef`: `ref` уходит на корневой `<div>`, тип стал `React.ForwardRefExoticComponent`. AI-рефакторинг: логика сдвига вынесена в `utils.ts` (`shiftDateRange`), добавлены JSDoc и unit-тесты на хелпер. Остальной публичный API и поведение не изменились |
| 2026-09-18 | По итогам ревью: обработчики сдвига сведены в один `shiftRange(amount)`; `TDateRangeValue` вынесен в `types.ts` и реэкспортируется из `index.ts` (набор публичных имён не изменился) |
