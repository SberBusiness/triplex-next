---
component: ChipSort
category: Chips
related: [Chip, ChipSelect, ChipGroup, SelectExtendedField, IconWrapper]
tokens: []
stories: stories/Chips/ChipSort.stories.tsx
version: "1.0"
---

# ChipSort

## Назначение

Чипс-переключатель сортировки: компактная иконка сортировки, по нажатию на которую
открывается выпадающий список вариантов. Выбранное значение текстом не показывается —
единственная обратная связь в свёрнутом виде это подсветка иконки, и она включается,
только когда текущее значение отличается от `defaultValue`.

Используй когда: в панели фильтров нужен выбор порядка сортировки, а места под
текстовый лейбл нет — иконка занимает ровно ширину `ChipIcon`.
Не используй когда: выбранное значение должно быть видно текстом (возьми `ChipSelect`),
нужен множественный выбор (`ChipMultiselect`) или нужен обычный select в форме
(`SelectField`).

Компонент управляемый: `value` и `onChange` держит потребитель. Рекомендуется
располагать внутри `ChipGroup` — он задаёт отступы и режим одной строки.

---

## Варианты и props

`IChipSortProps` — это `Omit<IChipSelectProps, "targetProps" | "clearSelected" | "defaultValue">`
плюс собственный `defaultValue`. То есть API совпадает с `ChipSelect`, кроме
обязательного сброса значения (`clearSelected`): у `ChipSort` сбрасывать нечего,
у сортировки всегда есть текущий порядок.

Неизвестные компоненту атрибуты (`data-*`, `aria-*`, `style`, `id`, обработчики `<div>`)
попадают на корневой `<div>` `SelectExtendedField`, а не на чипс-таргет.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `EComponentSize` | Размер чипса и выпадающего списка: `SM` / `MD` / `LG` |
| `options` | `ISelectFieldOption[]` | Список вариантов сортировки. Опция сопоставляется по `id` |
| `onChange` | `(option: ISelectFieldOption) => void` | Вызывается с выбранной опцией; список после выбора закрывается |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `value` | `ISelectFieldOption` | — | Текущее значение. Помечает опцию в списке как выбранную и участвует в подсветке иконки |
| `defaultValue` | `ISelectExtendedFieldDefaultOption` | — | Значение «по умолчанию». Пока `value` **глубоко равен** ему, чипс не подсвечен |
| `type` | `EChipType` | `TYPE_1` | Визуальный тип чипса, прокидывается в `ChipIcon` |
| `disabled` | `boolean` | `false` | Блокирует таргет (визуально + `tabIndex={-1}`, см. ограничения `Chip`) |
| `label` | `React.ReactNode` | — | Используется **только** как заголовок списка в мобильном режиме (`mobileTitle`). В десктопной разметке не отображается |
| `className` | `string` | — | Дополнительный класс корневого `<div>`, рядом с `.chipGroupItem` |
| `onOpen` / `onClose` | `() => void` | — | Колбэки открытия и закрытия списка, приходят из `SelectExtendedField` |
| `closeOnTab` | `boolean` | `false` | Закрывать список по Tab |

### Семантика `defaultValue` и подсветки

Это главное отличие `ChipSort` от остальных чипсов-селектов:

```text
selected = value != null && !isEqual(defaultValue, value)
```

- `value` не задан → иконка не подсвечена;
- `value` задан, `defaultValue` не задан → подсвечена;
- `value` глубоко равен `defaultValue` (`lodash-es/isEqual`, не по ссылке) → **не**
  подсвечена: сортировка по умолчанию — это не изменённый фильтр;
- иначе → подсвечена (класс `.selected` на чипсе плюс акцентный `paletteIndex` иконки).

Сравнение глубокое, поэтому `defaultValue={{...options[0]}}` работает так же, как
`defaultValue={options[0]}`. Но `label` опции — `React.ReactNode`: если в нём лежит
JSX, `isEqual` сравнивает деревья элементов. Держи в `defaultValue` ту же опцию,
что и в `options`, — тогда сравнение остаётся дешёвым и предсказуемым.

### Известные ограничения (унаследованы от `IChipSelectProps`)

- **`displayedValue`** входит в тип props, но компонентом не используется: отображать
  нечего, таргет — иконка. Переданное значение уходит в `...restProps` на корневой
  `<div>` и вызывает React-предупреждение о неизвестном DOM-атрибуте. Не передавай.
- **`dropdownProps`** объявлен в типе (через `ISelectFieldProps`), но до
  `SelectExtendedFieldDropdownDefault` не доходит — попадает в тот же спред на
  корневой `<div>`. Настроить `Dropdown` через него сейчас нельзя. Тот же разрыв
  есть у `ChipSelect`; чинить нужно синхронно по всему семейству, отдельной задачей.
- **Ширина списка** не настраивается: `width` в `SelectExtendedFieldDropdownDefault`
  не передаётся, поэтому работает дефолт `Dropdown` — `EDropdownWidth.CONTENT`,
  ширина по контенту, а не по ширине таргета-иконки (что для иконки и правильно).

---

## Дизайн-токены

Собственных токенов у компонента нет: в `styles/Chip.module.less` ему принадлежит
только `.chipGroupItem` (`display: inline-block`). Весь визуал приходит из компонентов,
на которых он построен:

- таргет — `Chip` / `ChipIcon`, группа `Chip` (фон, цвет, тень фокуса, состояние `selected`);
- иконка сортировки — `IconWrapper` (группа `IconWrapper`) плюс палитра иконки из
  `@sberbusiness/icons-next` (`paletteIndex`, а не токен);
- выпадающий список — `Dropdown` и `DropdownList`.

Полный список токенов чипса — в `Chip-ai.md` → «Дизайн-токены».

---

## Инварианты

- **`forwardRef`** — не убирать. `ref` указывает **не** на корневой `<div>`, а на
  чипс-таргет (`<span>` из `ChipIcon`). Тип объявлен как `HTMLDivElement` и не совпадает
  с фактическим `HTMLSpanElement` — проходит только из-за структурной совместимости
  типов. Менять цель `ref` или объявленный тип — breaking change для потребителей.
- **`clearSelected` исключён из props** намеренно (`Omit`). Не возвращать: у сортировки
  нет состояния «ничего не выбрано».
- **`defaultValue` переопределяет DOM-атрибут** `defaultValue` из
  `React.HTMLAttributes<HTMLDivElement>` (для этого он и в `Omit`). Тип
  `ISelectExtendedFieldDefaultOption`, а не строка.
- **Подсветка считается через `isEqual`**, а не по ссылке. Замена на `===` изменит
  поведение у потребителей, передающих новый объект на каждый рендер.
- **`role="combobox"` на таргете** перекрывает `role="button"` из `Chip` — он выставляется
  после дефолтов `Chip` в спреде props. Порядок не менять.
- **`aria-controls` таргета и `listId` списка — один и тот же `uniqueId()`**, живущий
  в `useRef` на всё время жизни экземпляра. Связка target ↔ список держится только на нём.
- **`uniqueId()` из `lodash-es`, а не `React.useId`** — код должен собираться в ветке
  `release-0` под React 17.
- **Класс `.chipGroupItem`** на корневом `<div>` — общий маркер семейства Chip*.
  Не удалять и не переименовывать.
- **Barrel `src/components/Chip/index.ts`** экспортирует `ChipSort` и `IChipSortProps` —
  сохранять.
- **Story ids `chips-chipsort--*`** завязаны на baseline-скриншоты в `__screenshots__/` —
  переименование story требует обновления baseline.

---

## Accessibility

- Таргет — `<span role="combobox">` с `aria-expanded`, отражающим состояние списка,
  и `aria-controls`, указывающим на `id` списка (`role="listbox"`). Список рендерится
  только когда открыт, поэтому в закрытом состоянии `aria-controls` ссылается на
  отсутствующий элемент — это осознанный компромисс текущей реализации дропдауна.
- **Клавиатура:** Enter и Space на закрытом таргете открывают список и вызывают
  `preventDefault()` (гасят прокрутку страницы и «клик» по пробелу). На открытом
  списке обработчик ничего не делает — закрытием занимается `SelectExtendedField`
  (Escape, клик вне компонента, при `closeOnTab` — Tab). Стрелочная навигация по
  опциям — внутри `DropdownList`.
- Компонент **не задаёт себе доступное имя**: у иконки сортировки нет текста.
  Потребитель обязан передать `aria-label` или `aria-labelledby` — они уходят
  на корневой `<div>`, поэтому для озвучивания именно таргета навесь подпись через
  собственный элемент рядом или `aria-labelledby` на видимый заголовок фильтра.
  Библиотека мультиязычная, текст не хардкодится.
- `disabled` у `Chip` не нативный: `pointer-events: none` плюс `tabIndex={-1}`.
  Программно диспатченные события до обработчиков дойдут — см. `Chip-ai.md`.
- В мобильном режиме (`max-width: SM_MAX`) список показывается как мобильный
  `Dropdown` с заголовком из `label` — без `label` шапка мобильного списка пустая.

---

## Связанные компоненты

- `Chip` — база всего семейства; отсюда классы состояний, фокус и ограничения `disabled`
- `ChipIcon` — конкретный таргет `ChipSort`: чипс, у которого `children` уходит в `prefix`,
  а `postfix` — пустой `<span />` ради симметричных отступов
- `ChipSelect` — альтернатива с тем же API (`IChipSortProps` наследует `IChipSelectProps`):
  показывает выбранное значение текстом и требует `clearSelected`
- `ChipGroup` — рекомендуемый контейнер: отступы, перенос строк, режим `oneLine`
- `SelectExtendedField` — база: владеет состоянием открытости, правилами закрытия
  и корневым `<div>`; список рендерится через `SelectExtendedFieldDropdownDefault`
- `IconWrapper` — обёртка иконки сортировки, добавляет состояния `active` / `disabled`

---

## Stories

Основные истории: `stories/Chips/ChipSort.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipSort/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `type`, `size`, `disabled` и индекса `defaultValue` |
| `Default` | `DefaultExample.tsx` | Базовое управляемое использование: `value` + `defaultValue` + `onChange` |
| `Types` | `TypesExample.tsx` | `TYPE_1` и `TYPE_2` |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `VisualTests` | `VisualTestsExample.tsx` | Скриншот-регрессия: три размера с открытым списком |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-04 | Создан документ (TRI-132, AI-Ready Phase 1) |
| 2026-09-04 | AI-рефакторинг (TRI-132): codestyle-чистка `ChipSort.tsx` (объединены дублирующиеся импорты, пути приведены к `../`, magic-числа палитры иконки вынесены в именованные константы, добавлены JSDoc и комментарии к нетривиальной логике), unit-тесты расширены с 1 до 19 кейсов; публичный API, DOM и визуал не изменены |
