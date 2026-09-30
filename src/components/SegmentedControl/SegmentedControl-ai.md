---
component: SegmentedControl
category: SegmentedControl
related: [Tabs, TabsLine, CheckboxXGroup, IconWrapper]
tokens:
  - SegmentedControl.General_1_Background
  - SegmentedControl.General_2_Background
  - SegmentedControl.Secondary_1_Background
  - SegmentedControl.Secondary_2_Background
  - SegmentedControlSegment.BorderColor_Default
  - SegmentedControlSegment.BorderColor_Focus
  - SegmentedControlSegment.General_1_Background_Default
  - SegmentedControlSegment.General_1_Background_Disabled
  - SegmentedControlSegment.General_1_Background_Hover
  - SegmentedControlSegment.General_1_Background_Selected_Default
  - SegmentedControlSegment.General_1_Background_Selected_Disabled
  - SegmentedControlSegment.General_1_Background_Selected_Hover
  - SegmentedControlSegment.General_1_Color_Default
  - SegmentedControlSegment.General_1_Color_Disabled
  - SegmentedControlSegment.General_1_Color_Hover
  - SegmentedControlSegment.General_1_Color_Selected_Default
  - SegmentedControlSegment.General_1_Color_Selected_Disabled
  - SegmentedControlSegment.General_1_Color_Selected_Hover
  - SegmentedControlSegment.General_2_Background_Default
  - SegmentedControlSegment.General_2_Background_Disabled
  - SegmentedControlSegment.General_2_Background_Hover
  - SegmentedControlSegment.General_2_Background_Selected_Default
  - SegmentedControlSegment.General_2_Background_Selected_Disabled
  - SegmentedControlSegment.General_2_Background_Selected_Hover
  - SegmentedControlSegment.General_2_Color_Default
  - SegmentedControlSegment.General_2_Color_Disabled
  - SegmentedControlSegment.General_2_Color_Hover
  - SegmentedControlSegment.General_2_Color_Selected_Default
  - SegmentedControlSegment.General_2_Color_Selected_Disabled
  - SegmentedControlSegment.General_2_Color_Selected_Hover
  - SegmentedControlSegment.Secondary_1_Background_Default
  - SegmentedControlSegment.Secondary_1_Background_Disabled
  - SegmentedControlSegment.Secondary_1_Background_Hover
  - SegmentedControlSegment.Secondary_1_Background_Selected_Default
  - SegmentedControlSegment.Secondary_1_Background_Selected_Disabled
  - SegmentedControlSegment.Secondary_1_Color_Default
  - SegmentedControlSegment.Secondary_1_Color_Disabled
  - SegmentedControlSegment.Secondary_1_Color_Hover
  - SegmentedControlSegment.Secondary_1_Color_Selected_Default
  - SegmentedControlSegment.Secondary_1_Color_Selected_Disabled
  - SegmentedControlSegment.Secondary_2_Background_Default
  - SegmentedControlSegment.Secondary_2_Background_Disabled
  - SegmentedControlSegment.Secondary_2_Background_Hover
  - SegmentedControlSegment.Secondary_2_Background_Selected_Default
  - SegmentedControlSegment.Secondary_2_Background_Selected_Disabled
  - SegmentedControlSegment.Secondary_2_Color_Default
  - SegmentedControlSegment.Secondary_2_Color_Disabled
  - SegmentedControlSegment.Secondary_2_Color_Hover
  - SegmentedControlSegment.Secondary_2_Color_Selected_Default
  - SegmentedControlSegment.Secondary_2_Color_Selected_Disabled
stories: stories/SegmentedControl/SegmentedControl.stories.tsx
version: "1.0"
---

# SegmentedControl

## Назначение

Ряд сегментов-кнопок в общей подложке, из которых пользователь выбирает один (`type: SINGLE`)
или несколько (`type: MULTIPLE`) вариантов. Компонент полностью управляемый: выбранное значение
приходит в `value`, запрос на смену — через `onSelect`. Состав сегментов задаёт потребитель
через `children` и составной субкомпонент `SegmentedControl.Segment`; сегменты делят ширину
контрола поровну (`flex: 1 1 0`).

Используй когда: вариантов немного (2–5), все они должны быть видны одновременно, и выбор
переключает режим отображения или фильтр — «день / неделя / месяц», «список / плитка».

Не используй когда:

- Выбор переключает **страницы или панели контента** — нужна семантика табов
  (`role="tablist"`, связка `aria-controls`, навигация стрелками). Возьми `Tabs`
  или `TabsLine`: `SegmentedControl` этой семантики не даёт (см. Accessibility).
- Вариантов много или они не влезают в строку — сегменты не переносятся и не скроллятся,
  а сжимаются, обрезая подписи по `text-overflow: ellipsis`.
- Нужен выбор из списка внутри формы с лейблом и статусом — возьми `SelectField`
  или `RadioYGroup`.
- Нужны сбрасываемые фильтры с крестиком и счётчиком — это `Chip` / `ChipGroup`.

---

## Варианты и props

`TSegmentedControlProps` — discriminated union по `type`: `ISegmentedControlSingleProps`
(`type: SINGLE`) и `ISegmentedControlMultipleProps` (`type: MULTIPLE`). Обе ветки расширяют
`ISegmentedControlCommonProps`, а он — `Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">`:
неизвестные компоненту атрибуты уходят на корневой `<div>` через `...rest`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `type` | `ESegmentedControlType` | Дискриминант союза. `SINGLE` — выбран ровно один сегмент, `MULTIPLE` — любое подмножество. Меняет типы `value` и `onSelect`, а не внешний вид |
| `value` | `string` при `SINGLE`, `string[]` при `MULTIPLE` | Выбранное значение. Сегмент считает себя выбранным, сравнивая свой `value` с этим (`===` при SINGLE, `includes` при MULTIPLE). Собственного состояния у компонента нет |
| `onSelect` | `(value: string) => void` при `SINGLE`, `(value: string[]) => void` при `MULTIPLE` | Запрос на смену значения. При `SINGLE` получает `value` нажатого сегмента, при `MULTIPLE` — **новый массив** выбранных значений (компонент сам добавляет или убирает значение) |
| `theme` | `ESegmentedControlTheme` | Визуальный стиль: пара цветов подложки и сегментов. Выбирается по фону страницы, см. ниже |
| `size` | `ESegmentedControlSize` | Размер: высота сегмента, размер шрифта, радиусы и паддинги |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Выключает **все** сегменты сразу: значение уходит в контекст, и каждый сегмент ставит `disabled` на свой `<button>`. Выбранный сегмент остаётся визуально выбранным |
| `children` | `React.ReactNode` | — | Сегменты. Ожидается `SegmentedControl.Segment`; компонент не проверяет и не фильтрует состав `children` |

### Props сегмента (`SegmentedControl.Segment`)

`ISegmentedControlSegmentProps extends IButtonBaseProps` (то есть
`React.ButtonHTMLAttributes<HTMLButtonElement>`), поэтому сегмент принимает любые атрибуты
кнопки. Собственный prop один:

| Prop | Тип | Описание |
|---|---|---|
| `value` | `string` | Значение сегмента. Сравнивается со `value` контрола, чтобы определить выбранное состояние, и уходит в `onSelect` при нажатии |

Поведение остальных атрибутов кнопки:

- `disabled` — выключает **один** сегмент. Складывается с `disabled` контрола по `||`:
  выключить сегмент можно, включить обратно вопреки контролу — нельзя.
- `onClick` — вызывается **после** запроса на смену значения, с исходным событием. Не
  отменяет выбор: `preventDefault()` на выбор не влияет.
- `title` — если не передан, а `children` сегмента является строкой, эта строка
  подставляется в `title` автоматически (подсказка для обрезанной подписи). Пустая строка
  в `title` считается непереданной. Для нестрокового `children` (иконка) `title` не
  выставляется — передавай его или `aria-label` сам.
- `className` — мерджится через `clsx` с собственными классами, не затирая их.

### Выбор темы

| Тема | Подложка | Когда |
|---|---|---|
| `GENERAL_1` | серая (`ColorNeutral.90`) | базовый вариант на белой странице |
| `GENERAL_2` | белая (`ColorNeutral.100`) | на затенённой странице или внутри серого блока |
| `SECONDARY_1` | серая | вторичный, менее акцентный выбранный сегмент |
| `SECONDARY_2` | белая | вторичный вариант на затенённой странице |

Пара `GENERAL` / `SECONDARY` отличается только цветами выбранного сегмента, геометрия
одинаковая.

### Размер и тема независимы

Оси не пересекаются: в `SegmentedControlSegment.module.less` классы размера (`.sm`, `.md`,
`.lg`) задают только геометрию (высота 20 / 32 / 40px, размер шрифта, радиус), классы темы —
только цвета. Любая комбинация допустима, поэтому stories показывают оси по отдельности,
а матрицу целиком не снимают.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию —
`src/components/DesignTokens/components/SegmentedControl.ts` и
`src/components/DesignTokens/components/SegmentedControlSegment.ts`.

Две группы: `SegmentedControl` — только фон подложки (по одному токену на тему),
`SegmentedControlSegment` — цвет и фон сегмента в разрезе «тема × выбранность × состояние»
плюс два токена рамки:

```text
SegmentedControl.{Theme}_Background
SegmentedControlSegment.{Theme}_Color_[Selected_]{Default|Hover|Disabled}
SegmentedControlSegment.{Theme}_Background_[Selected_]{Default|Hover|Disabled}
SegmentedControlSegment.BorderColor_Default
SegmentedControlSegment.BorderColor_Focus
```

Рамка у сегмента есть всегда (`1px solid BorderColor_Default`) — она резервирует место,
чтобы фокусная рамка не сдвигала вёрстку. При `:focus-visible` меняется только её цвет
на `BorderColor_Focus`.

**Известное расхождение (не исправлено осознанно).** В группе `SegmentedControlSegment`
объявлены, но не используются в стилях четыре токена: `Secondary_1_Color_Selected_Hover`,
`Secondary_1_Background_Selected_Hover`, `Secondary_2_Color_Selected_Hover`,
`Secondary_2_Background_Selected_Hover`. У тем `SECONDARY_*` в LESS нет правила
`&.selected:hover`, поэтому наведение на выбранный сегмент этих тем ничего не меняет,
хотя значения токенов отличаются от `Selected_Default`. Это pre-existing поведение;
добавление правила — визуальное изменение, его нужно согласовывать с дизайном и
перегенерировать baseline-скриншоты.

---

## Инварианты

- `forwardRef<HTMLDivElement>` на `SegmentedControl` — не убирать. Ref указывает на корневую
  подложку (`<div class="segmentedControl">`).
- `forwardRef<HTMLButtonElement>` на `SegmentedControlSegment` — не убирать. Ref указывает на
  `<button>`, который рендерит `ButtonBase`, а не на обёртку `IconWrapper`.
- Составной API `SegmentedControl.Segment` собирается через `Object.assign(forwardRef(...), { Segment })`.
  `SegmentedControlSegment` при этом остаётся и самостоятельным barrel-экспортом — оба пути
  импорта публичные, сохранять нужно оба.
- Барел `src/components/SegmentedControl/index.ts` экспортирует `enums`, `types`,
  `SegmentedControlSegment` и `SegmentedControl`. `SegmentedControlContext`,
  `ISegmentedControlContextType` и `utils.ts` из барела **не** экспортируются — это
  внутренний слой, менять его можно свободно.
- `displayName` — `"SegmentedControl"` и `"SegmentedControlSegment"`. Не менять.
- Значения `ESegmentedControlTheme` (`general_1` / `general_2` / `secondary_1` / `secondary_2`)
  и `ESegmentedControlType` (`single` / `multiple`) — часть публичного API. Значения темы
  дополнительно связаны с именами CSS-классов (`.general1` и т.д. — через
  `themeToClassNameMap`) и с именами токенов `{Theme}_*`.
- **Значения `ESegmentedControlSize` обязаны совпадать с `EComponentSize`** (`sm` / `md` / `lg`).
  Классы размера берутся из `createSizeToClassNameMap(styles)`, а он типизирован как
  `Record<EComponentSize, string>` — индексация `sizeToClassNameMap[size]` работает только
  потому, что строковые значения обоих enum совпадают. Добавление размера в
  `ESegmentedControlSize`, которого нет в `EComponentSize`, даст `undefined` вместо класса
  без ошибки типов.
- Оба файла стилей лежат в `src/components/SegmentedControl/styles/`, и это важно:
  `generateScopedName` (`scripts/generate-scoped-name.ts`) хеширует класс по **имени папки
  компонента** + имени класса + версии. Поэтому `.general1` и `.sm` из
  `SegmentedControl.module.less` и селекторы `.general1 &` / `.sm &` из
  `SegmentedControlSegment.module.less` получают одинаковый хеш и сцепляются. Перенос
  одного из файлов в другую папку компонента молча сломает стилизацию сегментов.
- При `type: SINGLE` нажатие на уже выбранный сегмент **всё равно вызывает** `onSelect` с его
  значением (сегмент сообщает `selected: true`). Это наблюдаемое поведение, зафиксировано
  тестом; отмена выбора при SINGLE не поддерживается.
- При `type: MULTIPLE` компонент не хранит порядок выбора: новое значение добавляется в
  конец массива (`[...value, newValue]`), удаление сохраняет исходный порядок остальных.
- `[...value]` в обработчике MULTIPLE — не избыточный спред, а сужение для TS: `value`
  внутри деструктурированного союза имеет тип `string | string[]`, и `.filter` у строки нет.
- Класс `content` на внутреннем `<span>` сегмента отвечает за обрезку подписи
  (`overflow: hidden`, `text-overflow: ellipsis`) — не удалять и не переименовывать.

---

## Accessibility

- Каждый сегмент — нативная `<button type="button">` (через `ButtonBase`), поэтому фокус,
  `Enter` / `Space` и `disabled` работают нативно. Собственных обработчиков клавиатуры
  компонент не добавляет.
- Выбранность кодируется `aria-pressed` на каждой кнопке: `true` у выбранных, `false`
  у остальных. Это модель «группа кнопок-переключателей», а не табов и не радиогруппы.
- **Корневой `<div>` роли не имеет.** Группа для скринридера не объявлена: ни
  `role="group"`, ни `role="tablist"`, ни `aria-label` компонент не выставляет. Если группу
  нужно озвучить, передай атрибуты сам — они уйдут на корневой `<div>` через `...rest`:
  `<SegmentedControl role="group" aria-label="Период" ...>`. Роль обязательна вместе
  с именем: `<div>` без роли получает роль `generic`, которой
  [HTML-AAM](https://www.w3.org/TR/html-aria/) запрещает доступное имя.
- Навигации стрелками между сегментами нет — обход идёт `Tab`'ом, каждый сегмент
  отдельная остановка. Если нужна семантика табов с одной остановкой на группу,
  это `Tabs` / `TabsLine`, а не `SegmentedControl`.
- Фокус виден только с клавиатуры: цвет рамки меняется по `:focus-visible`.
- Сегмент с одной иконкой доступного имени не получает: `title` подставляется из `children`
  только для строкового содержимого. Для иконки передавай `aria-label` (или `title`) сам —
  компонент не хардкодит текст, библиотека мультиязычная.
- `disabled` (и на контроле, и на сегменте) ставится нативным атрибутом, поэтому выключенные
  сегменты выпадают из порядка фокуса и не озвучиваются как активируемые.

---

## Связанные компоненты

- `Tabs` — альтернатива, когда выбор переключает панели контента: даёт `role="tablist"`,
  навигацию стрелками и работу с непоместившимися табами. Их легко спутать, потому что
  `SegmentedControl` часто используют как визуальный переключатель вида.
- `TabsLine` — альтернатива для табов-подчёркиваний в шапке раздела. Тот же критерий
  выбора, что и у `Tabs`: нужна ли семантика табов.
- `CheckboxXGroup` — альтернатива для `type: MULTIPLE`, когда выбор нескольких значений
  должен читаться как набор чекбоксов в форме, а не как компактный переключатель.
- `IconWrapper` — рендерится внутри каждого сегмента (`displayContents`) и по классам
  `active` / `disabled` управляет цветом иконки из `@sberbusiness/icons-next`. Поэтому
  сегмент с иконкой перекрашивается вместе с выбранным состоянием; `paletteIndex` в примерах
  задаёт базовый цвет.
- `ButtonBase` — внутренняя кнопка, на которой построен сегмент (в barrel библиотеки не
  экспортируется). Даёт `type="button"`, `data-tx` и проброс ref.

---

## Stories

Основные истории: `stories/SegmentedControl/SegmentedControl.stories.tsx`
Файлы примеров: `stories/SegmentedControl/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `type`, `theme`, `size`, `disabled` |
| `Default` | `Default.tsx` | Минимальный контрол: `SINGLE`, `GENERAL_1`, `LG`, пять сегментов |
| `Types` | `Types.tsx` | `SINGLE` и `MULTIPLE` рядом; у MULTIPLE выбраны два сегмента |
| `Themes` | `Themes.tsx` | Все четыре значения `ESegmentedControlTheme` |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG |
| `Disabled` | `Disabled.tsx` | `disabled` на всём контроле, выбранный сегмент сохраняет вид |
| `Example` | `Example.tsx` | Production-like: три сегмента только с иконками в контейнере 144px |
| `VisualTests` | `VisualTests.tsx` | Краевые состояния для скриншотов: `:focus-visible` (открывается `play`), выключенные отдельные сегменты (включая выбранный), обрезка длинной подписи, сегменты-иконки, MULTIPLE без выбора и с полным выбором |

Из скриншот-тестов исключены (`testRunner: { skip: true }`) `Playground`, `Default` и
`Example`: `Default` визуально дублирует блок SINGLE в `Types`, а сегменты-иконки из
`Example` снимаются внутри `VisualTests` вместе с остальными краевыми состояниями.

Story ID участвуют в именах baseline-скриншотов (`segmentedcontrol--themes--xs.png` и т.п.),
поэтому переименование story требует перегенерации baseline и удаления осиротевших файлов.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-30 | Создан документ. AI-рефакторинг: `SegmentedControlSegment` переведён с `React.FC` на `forwardRef<HTMLButtonElement>`, чистые хелперы вынесены в `utils.ts` (`isSegmentSelected`, `getSegmentTitle`), JSDoc на props и полях контекста, внутренние импорты приведены к относительным. Добавлены unit-тесты (`__tests__/SegmentedControlSegment.test.tsx`, `__tests__/utils.test.tsx`, классы тем и размеров в `__tests__/SegmentedControl.test.tsx`). Stories перенесены в `stories/SegmentedControl/` по modern pattern, добавлена story `VisualTests`. |
