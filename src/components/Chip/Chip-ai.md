---
component: Chip
category: Chips
related: [ChipGroup, ChipIcon, ChipOptions, ChipSelect, ChipMultiselect, ChipSort, ChipSuggest, ChipDatePicker, ChipClearButton, ChipDropdownArrow, Badge, IconWrapper]
tokens:
  - --triplex-next-Chip-Background_Type1_Default
  - --triplex-next-Chip-Background_Type1_Hover
  - --triplex-next-Chip-Background_Type2_Default
  - --triplex-next-Chip-Background_Type2_Hover
  - --triplex-next-Chip-Background_Active
  - --triplex-next-Chip-Background_Disabled
  - --triplex-next-Chip-Background_Selected_Default
  - --triplex-next-Chip-Background_Selected_Hover
  - --triplex-next-Chip-Background_Selected_Active
  - --triplex-next-Chip-Background_Selected_Disabled
  - --triplex-next-Chip-Color_Default
  - --triplex-next-Chip-Color_Hover
  - --triplex-next-Chip-Color_Active
  - --triplex-next-Chip-Color_Disabled
  - --triplex-next-Chip-Color_Selected_Default
  - --triplex-next-Chip-Color_Selected_Hover
  - --triplex-next-Chip-Color_Selected_Active
  - --triplex-next-Chip-Color_Selected_Disabled
  - --triplex-next-Chip-Shadow_Focus
stories: stories/Chips/Chip.stories.tsx
version: "1.0"
---

# Chip

## Назначение

Компактный интерактивный элемент-«чипс»: выполняет действие по нажатию и отображает
выбранное (`selected`) состояние. Одновременно служит базой для всего семейства Chip*
— поверх него построены `ChipIcon`, `ChipOptions`, а также target-элементы
`ChipSelect`, `ChipMultiselect`, `ChipSuggest`, `ChipDatePicker`.

Используй когда: нужен переключаемый фильтр, тег или компактная кнопка-действие
в ряду однотипных элементов.
Не используй когда: нужна обычная кнопка формы (возьми `Button` — у него нативная
клавиатурная активация и семантика `<button>`) или нужен выбор значения из списка
(возьми `ChipSelect` / `ChipMultiselect`).

Рекомендуется всегда располагать `Chip` внутри `ChipGroup` — он задаёт отступы,
перенос строк и однострочный режим со скроллом.

---

## Варианты и props

### Типы (`EChipType`)

| Значение | Описание |
|---|---|
| `TYPE_1` | Основной фон (по умолчанию) |
| `TYPE_2` | Альтернативный фон — для случаев, когда `TYPE_1` сливается с подложкой |

Тип влияет **только** на фон в обычном состоянии и на hover. В состояниях `selected`,
`active` и `disabled` фон задаётся общими токенами и от типа не зависит.

### Размеры (`EComponentSize`)

| Значение | Высота | Padding | Border-radius | Font-size |
|---|---|---|---|---|
| `SM` | 28px | 0 12px | 6px | 12px |
| `MD` | 40px | 0 12px | 8px | 14px |
| `LG` | 56px | 0 16px | 10px | 16px |

`size` пробрасывается в `Badge.Dot` при `showNotificationIcon` — размер значка
уведомлений всегда согласован с размером чипса.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `type` | `EChipType` | `TYPE_1` | Визуальный тип |
| `size` | `EComponentSize` | `MD` | Размер |
| `selected` | `boolean` | `false` | Выбранное состояние (визуальное; компонент неуправляемый — состояние держит потребитель) |
| `disabled` | `boolean` | `false` | Визуально блокирует и убирает из tab-порядка (см. ограничения ниже) |
| `prefix` | `React.ReactNode` | — | Контент перед основным, обычно иконка слева; оборачивается в `IconWrapper` |
| `postfix` | `React.ReactNode` | — | Контент после основного, обычно иконка справа; оборачивается в `IconWrapper` |
| `showNotificationIcon` | `boolean` | `false` | Значок новых уведомлений (`Badge.Dot`) в правом верхнем углу |
| `children` | `React.ReactNode` | — | Основной контент; обрезается по `max-width` с многоточием |
| `...HTMLSpanAttributes` | — | — | Все атрибуты `<span>` кроме `prefix`, включая `onClick`, `aria-expanded`, `data-*` |

### Ограничения

- **`prefix` / `postfix`: отсутствие значения передавай как `undefined`, не как `null` или `false`.**
  Классы `.withPrefix` / `.withPostfix` (обнуляют боковой `padding`) выставляются по
  `!== undefined`, а сама иконка рендерится по truthiness. Поэтому
  `postfix={condition && <Icon/>}` при `condition === false` даст чипс с нулевым
  правым паддингом и без иконки. Пиши `postfix={condition ? <Icon/> : undefined}`.
  Внутри библиотеки все обёртки передают либо JSX, либо `<span />`-заглушку —
  проблема проявляется только у внешнего потребителя.
- **`disabled` — не нативный атрибут.** Корневой элемент — `<span>`, поэтому блокировка
  чисто визуальная: `pointer-events: none` в LESS плюс `tabIndex={-1}`. Реальные
  пользовательские клики и клавиатура до обработчиков не доходят, но программно
  диспатченные события (`fireEvent.click` в тестах, синтетический `dispatchEvent`)
  вызовут `onClick` / `onKeyDown`. Не полагайся на `disabled` как на защиту в логике —
  проверяй флаг в самом обработчике, если это критично.
- **`selected` и `disabled` совместимы** — есть отдельные токены
  `--triplex-next-Chip-*_Selected_Disabled`.
- Ширина ограничена: `min-width: 40px`, `max-width: 264px`. Длинный `children`
  обрезается многоточием, а не переносится.

---

## Дизайн-токены

Паттерн: `--triplex-next-Chip-{Property}_{Modifier}_{State}`

```text
--triplex-next-Chip-Background_Type1_Default
--triplex-next-Chip-Background_Type1_Hover
--triplex-next-Chip-Background_Type2_Default
--triplex-next-Chip-Background_Type2_Hover
--triplex-next-Chip-Background_Active
--triplex-next-Chip-Background_Disabled
--triplex-next-Chip-Background_Selected_Default
--triplex-next-Chip-Background_Selected_Hover
--triplex-next-Chip-Background_Selected_Active
--triplex-next-Chip-Background_Selected_Disabled
--triplex-next-Chip-Color_Default
--triplex-next-Chip-Color_Hover
--triplex-next-Chip-Color_Active
--triplex-next-Chip-Color_Disabled
--triplex-next-Chip-Color_Selected_Default
--triplex-next-Chip-Color_Selected_Hover
--triplex-next-Chip-Color_Selected_Active
--triplex-next-Chip-Color_Selected_Disabled
--triplex-next-Chip-Shadow_Focus
```

Токены `_Type1_` / `_Type2_` существуют только для `Background` в состояниях
Default и Hover. Цвет текста (`Color_*`) от типа не зависит.

---

## Инварианты

- **`forwardRef`** — обязателен, `ref` указывает на корневой `<span>`. Не убирать.
- **Корневой элемент — `<span role="button">`, а не нативный `<button>`.** Это осознанное
  решение: в `postfix` живут вложенные интерактивные элементы (`ChipClearButton`,
  `ChipDropdownArrow`), а `<button>` внутри `<button>` — невалидный HTML. Смена корневого
  тега сломает всё семейство Chip*.
- **`role` и `tabIndex` выставляются до `{...restProps}`**, то есть потребитель может
  их переопределить через props. Это часть текущего контракта — менять порядок осознанно.
  (`ref` при `forwardRef` в `restProps` не попадает, на него порядок не влияет.)
- **Класс `.chipGroupItem`** выставляется всегда, наравне с `.chip`. Объявлен
  в `styles/Chip.module.less` и служит общим маркером «элемент верхнего уровня
  в ряду чипсов»: его проставляют себе все члены семейства — `Chip`, `ChipSort`,
  `ChipMultiselect`, `ChipSelect`, `ChipDatePicker`, `ChipSuggest`. Причём
  `.chipGroupItem` не всегда совпадает с `.chip`: в `ChipSelect` / `ChipMultiselect`
  `.chip` лежит внутри элемента с `.chipGroupItem`. Раскладка `ChipGroup` на этот
  класс не опирается — в её стилях он не встречается. Не удалять и не переименовывать.
- **`EChipType` значения** (`type_1`, `type_2`) — публичное API, не переименовывать.
- **`EComponentSize`** — общий enum из `src/enums/EComponentSize`, локального аналога не заводить.
- **Селектор `[aria-expanded="true"]`** в LESS даёт active-стиль. На него опираются
  chip-триггеры дропдаунов — не убирать вместе с рефакторингом стилей.
- **Barrel-экспорты** `src/components/Chip/index.ts` — `Chip`, `IChipProps`, `EChipType`
  и всё семейство. Сохранять.
- **Story ids** `chips-chip--*` завязаны на baseline-скриншоты в `__screenshots__/` —
  переименование story требует синхронного обновления baseline.

---

## Accessibility

- Роль `role="button"` на `<span>`; в tab-порядке через `tabIndex={0}`, при `disabled` —
  `tabIndex={-1}`.
- **Клавиатурная активация не реализована внутри компонента.** `Chip` перехватывает
  `keydown` только чтобы вызвать `preventDefault()` на пробеле (код `Space`) — это гасит
  прокрутку страницы, поскольку чипс фокусируем. Синтетический `click` по Enter/Space
  компонент не генерирует (у `<span role="button">` нет нативного поведения кнопки),
  внешний `onKeyDown` вызывается всегда и после `preventDefault`. Если чипс должен
  срабатывать с клавиатуры, потребитель обрабатывает Enter/Space сам через `onKeyDown`.
  Обёртки семейства (`ChipSelect`, `ChipSuggest`, `ChipDatePicker`) делают это на своём уровне.
- Фокус-стиль через `:focus-visible` (`--triplex-next-Chip-Shadow_Focus`) — виден только
  при клавиатурной навигации. Нативная обводка на корневом элементе намеренно отключена
  (`outline: none` в LESS) в пользу `box-shadow` — убирать правило нельзя, иначе фокус
  отрисуется дважды.
- **Выбранное состояние не объявляется ассистивным технологиям автоматически.** `selected`
  меняет только визуал. Для роли `button` передавай `aria-pressed` через `...rest`;
  в списке-подобных сценариях используй `ChipSelect` / `ChipMultiselect`.
- **`aria-expanded`** потребитель передаёт сам, когда чипс работает триггером дропдауна —
  атрибут дополнительно активирует active-стиль через CSS.
- Чипс без текстового `children` (только `prefix`/`postfix`, как в `ChipIcon`) требует
  `aria-label` от потребителя — библиотека мультиязычная, текст не хардкодится.

---

## Связанные компоненты

- `ChipGroup` (`src/components/ChipGroup`) — контейнер-раскладка для чипсов;
  рекомендуемая обёртка, задаёт `size` и режим `oneLine`
- `ChipIcon` — тонкая обёртка: `children` уходит в `prefix`, `postfix` заполняется
  пустым `<span />` ради симметричных отступов
- `ChipOptions` — чипс с иконкой опций и кнопкой сброса выбора (`clearSelected`)
- `ChipClearButton` — кнопка сброса для `postfix`; `forwardRef` на `HTMLButtonElement`,
  props расширяют `Omit<IButtonIconProps, "children">` (то есть доступен весь API
  `ButtonIcon`, включая `onClick` и `aria-label`) плюс собственный `size?: EComponentSize`,
  выбирающий размер иконки-крестика
- `ChipDropdownArrow` — стрелка дропдауна для `postfix`; объявлена как `React.FC`
  (не `forwardRef`), собственных обработчиков не имеет. Props: **обязательный**
  `rotated: boolean` (даёт класс `.rotated`) и `size?: EComponentSize`
- `ChipSelect`, `ChipMultiselect`, `ChipSuggest`, `ChipDatePicker`, `ChipSort` —
  составные компоненты, использующие `Chip` как target-элемент дропдауна
- `Badge` (`Badge.Dot`) — значок уведомлений при `showNotificationIcon`
- `IconWrapper` — обёртка `prefix` / `postfix`, добавляет классы `hoverable` / `disabled`,
  управляющие цветом иконки при взаимодействии

---

## Stories

Основные истории: `stories/Chips/Chip.stories.tsx`
Файлы примеров: `stories/Chips/examples/Chip/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `type`, `size`, `disabled`, `showNotificationIcon` |
| `Default` | `DefaultExample.tsx` | Базовое использование: переключение `selected` по клику |
| `Types` | `TypesExample.tsx` | `TYPE_1` и `TYPE_2` |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `States` | `StatesExample.tsx` | Состояния `selected` и `disabled` |
| `WithPrefixAndPostfix` | `WithPrefixAndPostfixExample.tsx` | Иконки слева и справа от контента |
| `WithNotificationIcon` | `WithNotificationIconExample.tsx` | Значок уведомлений во всех трёх размерах |
| `VisualTests` | `DefaultExample.tsx` | Скриншот-регрессия, `play` доводит чипс до состояния фокуса |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-29 | Создан документ (TRI-26, AI-Ready Phase 1) |
| 2026-07-29 | AI-рефакторинг (TRI-26): codestyle-чистка `Chip.tsx` (константы-маппинги в UPPER_SNAKE_CASE, эквивалентные упрощения в `clsx`, JSDoc на `children` и `handleKeyDown`), unit-тесты расширены с 5 до 22 кейсов; публичный API, DOM и визуал не изменены |
| 2026-07-29 | Правки по ревью PR #487: уточнена атрибуция класса `.chipGroupItem` (его проставляет семейство Chip*, а не раскладка `ChipGroup`) и описание API `ChipClearButton` / `ChipDropdownArrow` |
