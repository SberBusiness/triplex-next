---
component: ChipSuggest
category: Chips
related: [Chip, ChipSelect, Suggest, Dropdown, FormField]
tokens: []
stories: stories/Chips/ChipSuggest.stories.tsx
version: "1.0"
---

# ChipSuggest

## Назначение

Чипс-фильтр с выпадающим списком и фильтрацией по вводу: собранная композиция
`Suggest` (состояние и контекст) + `Chip` (target-элемент) + `Dropdown` (список).
Пока значение не выбрано, чипс показывает `label` и стрелку списка; после выбора —
`label` выбранной опции (или `displayedValue`) и кнопку очистки.

Сам список не фильтрует: `options` формирует потребитель в ответ на `onFilter`, как и в
`Suggest`. Выбранное значение контролируемое — компонент его не хранит.

Используй когда: нужен фильтр в ряду чипсов (панель фильтров `MasterTable`, `ChipGroup`),
и список опций достаточно длинный, чтобы искать по нему вводом.

Не используй когда:
- Список короткий и фильтрация не нужна — возьми `ChipSelect`.
- Нужно выбрать несколько значений — возьми `ChipMultiselect`.
- Нужен suggest не чипсом, а обычным полем формы с лейблом и статусами — возьми
  `SuggestField`.
- Нужна нестандартная разметка управляющего элемента или списка — собирай композицию
  сам на headless-`Suggest`.

---

## Варианты и props

`IChipSuggestProps<T extends ISuggestOption = ISuggestOption>` расширяет `ISuggestProps<T>`
(все props `Suggest`, включая `value`, `options`, `size`, `onSelect`, `onFilter`,
`placeholder`, `noOptionsText`, `loading`, `dropdownListLoading`, `tooltipOpen`,
`clearInputOnFocus`, `onScrollEnd`) и `Pick<IChipProps, "type">`. Ниже — только то,
что добавляет или переопределяет `ChipSuggest`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `label` | `React.ReactNode` | Название поля. Показывается на чипсе, пока значение не выбрано, и лейблом над полем фильтрации внутри списка — то есть отображается всегда, даже при выбранном значении |
| `value` | `T \| undefined` | Выбранная опция (из `ISuggestProps`). Контролируемое значение: сброс делает потребитель в `targetProps.clearSelected` |
| `options` | `T[]` | Список опций (из `ISuggestProps`). Фильтрует потребитель в ответ на `onFilter` |
| `size` | `EComponentSize` | Размер (из `ISuggestProps`). Раздаётся target-элементу и выпадающему списку |
| `onSelect` | `(value: T \| undefined) => void` | Выбор опции (из `ISuggestProps`) |
| `onFilter` | `(value: string) => void` | Изменение поля фильтрации (из `ISuggestProps`) |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `type` | `EChipType` | `EChipType.TYPE_1` (дефолт `Chip`) | Тип чипса. Задавать только здесь: `targetProps.type` не работает — см. «Инварианты» |
| `displayedValue` | `React.ReactNode` | — | Что показать на чипсе вместо `value.label`. Учитывается только при выбранном `value` |
| `targetProps` | `IChipSuggestTargetProps<T>` | — | Props target-элемента. Через него передаётся `clearSelected`, а также props `Chip` (`disabled`, `className`, `data-*`, `onClick`, `size`). Два исключения — см. «Инварианты»: `targetProps.type` не применяется никогда, `targetProps.onKeyDown` вызывается только на `Enter`/`Space` |
| `dropdownProps` | `Omit<IChipSuggestDropdownProps<T>, "targetRef">` | — | Props выпадающего списка: props `Dropdown` (`onOpen`, `onClose`, `mobileViewProps`, …) плюс `focusTrapProps`. `targetRef` проставляет сам `ChipSuggest` |

`className` попадает на корневой `<div>` (рядом с внутренним классом `chipGroupItem`),
остальные `React.HTMLAttributes<HTMLDivElement>` уходят в `Suggest`.

### Сброс значения

Кнопка очистки появляется на чипсе автоматически, как только `value !== undefined`, но
сам сброс компонент не делает — он вызывает `targetProps.clearSelected`. Без этого колбэка
кнопка отрисуется и ничего не сделает.

### Тип опции

`ISuggestOption`: `id`, `label`, `content` (кастомная разметка опции в списке вместо
`label`), `showNotificationIcon` (значок новых уведомлений на опции). Расширяется
дженериком: `<ChipSuggest<IMyOption> …>` протаскивает тип в `value`, `options`, `onSelect`
и `targetProps`.

---

## Дизайн-токены

Собственных токенов нет: `styles/ChipSuggest.module.less` задаёт только отступ поля
фильтрации внутри списка. Внешний вид складывается из токенов компонентов, из которых
собран `ChipSuggest`, — переопределяй их через `ThemeProvider` (prop `tokens`), см.
`ThemeProvider-ai.md` → «Как переопределять токены»:

- чипс — группа `Chip` (`Chip-ai.md`);
- выпадающий список — группы `Dropdown` и `DropdownList` (`Dropdown-ai.md`);
- поле фильтрации внутри списка — группы `FormField` и `Tooltip`.

---

## Инварианты

- `forwardRef` на `ChipSuggest` — не убирать. Ref указывает на корневой `<div>` компонента
  `Suggest` (не на сам чипс), тот же элемент служит `targetRef` для `Dropdown`.
- Generic-сигнатура `<T extends ISuggestOption = ISuggestOption>` — часть публичного API
  у `ChipSuggest`, `ChipSuggestTarget` и у всех трёх интерфейсов props. Параметр `T` в
  `IChipSuggestTargetProps` и `IChipSuggestDropdownProps` в теле интерфейса не используется
  (стоит точечный `eslint-disable`), но убрать его нельзя — сломается код потребителей,
  указывающих тип опции явно.
- Barrel `ChipSuggest/index.ts` экспортирует `ChipSuggest`, `ChipSuggestTarget` и типы.
  `ChipSuggestDropdown` и `ChipSuggestDesktopDropdownField` — внутренние, наружу уходит
  только тип `IChipSuggestDropdownProps`.
- **Известное ограничение, а не проектное решение:** `type` передаётся target-элементу
  **после** спреда `targetProps`, поэтому `targetProps.type` не применяется никогда — даже
  когда сам `type` не задан (тогда `Chip` уходит в свой дефолт). Тип чипса задавай prop'ом
  `type` на самом `ChipSuggest`. Починка меняет наблюдаемое поведение, поэтому делается
  отдельной задачей и с записью в release notes; тестом это поведение намеренно не
  зафиксировано, чтобы падающий тест не выглядел поломкой контракта при починке.
  Обрати внимание на асимметрию: `size` передаётся **до** спреда `targetProps`,
  поэтому `targetProps.size` как раз работает.
- **Известное ограничение, а не проектное решение:** `ChipSuggestTarget.handleKeyDown`
  вызывает `targetProps.onKeyDown` только внутри ветки `Enter`/`Space`, поэтому на всех
  остальных клавишах (стрелки, `Tab`, печатные символы) обработчик потребителя не
  вызывается. Не рассчитывай на `targetProps.onKeyDown` для навигации по стрелкам.
  Починка меняет наблюдаемое поведение → отдельная задача с записью в release notes.
- `prefix` намеренно вырезается из props и не доходит до корневого `<div>`: он приходит
  из `React.HTMLAttributes` как RDFa-атрибут (то есть на `<div>` был бы валиден), но
  `ChipSuggest` его не поддерживает — `ChipSuggestTarget` задаёт только `postfix`.
- `ChipSuggestDesktopDropdownField` — единственный компонент папки, оставленный
  `React.FC` без `forwardRef`: он не экспортируется из barrel, а очевидного ref-таргета
  у него нет (корень — `FormField`). Осознанное исключение из общего правила
  `docs/ai/codestyle.md`, а не недосмотр; менять — отдельной задачей.
- `dropdownProps.targetRef` исключён из типа: ссылку на корневой `<div>` подставляет сам
  `ChipSuggest`, иначе список потеряет привязку к чипсу.
- `ChipSuggestDropdown` обязан класть ссылку на себя в `dropdownRef` из `SuggestContext` —
  по ней `Suggest` отличает клик внутри списка от клика вне компонента.
- `ChipSuggestTarget` и `ChipSuggestDesktopDropdownField` читают `SuggestContext` и вне
  `Suggest` не работают: значения возьмутся из дефолта контекста и компонент «залипнет».
- `ChipSuggest` импортирует внутренний `SuggestMobileDropdownContent` по прямому пути —
  переименование файла в папке `Suggest` ломает мобильный режим `ChipSuggest`.
- Корневой `<div>` всегда получает класс `chipGroupItem` — на нём держатся отступы внутри
  `ChipGroup`.
- `setForwardedRef` из `ChipSuggest/utils.ts` — внутренний хелпер, из barrel не
  экспортируется и в публичные `src/utils` не переносится. Это **не** конечное
  состояние: точно такая же функция уже лежит в `src/components/List/utils.ts`, и та же
  пятистрочка инлайнится ещё в полутора десятках компонентов (включая `Suggest.tsx`).
  Консолидация во внутренний shared-модуль — отдельная задача; не плоди третью копию,
  а при случае сошлись на неё.

---

## Accessibility

Роль и фокус:

- Target — `Chip`, то есть `<span role="button">` с `tabIndex` `0` (или `-1` при
  `disabled`), а не нативная кнопка. `aria-expanded` на нём отражает видимость списка.
- Кнопка очистки — вложенная нативная `<button>` (`ChipClearButton`), поэтому внутри
  чипса два элемента с ролью `button`. В тестах ищи target по `data-testid`, а не по роли.
- При открытии списка фокус уходит в поле фильтрации (`autoFocus`), содержимое обёрнуто в
  `FocusTrap` с `clickOutsideDeactivates` и `returnFocusOnDeactivate` — при закрытии фокус
  возвращается на чипс. Опции `FocusTrap` дополняются через `dropdownProps.focusTrapProps`
  (переданный `focusTrapOptions` мерджится поверх умолчаний).

Клавиатура:

| Клавиша | Где | Что делает |
|---|---|---|
| `Enter`, `Space` | на чипсе | Открывает и закрывает список. `Space` не прокручивает страницу (`preventDefault` в `Chip`) |
| `Enter`, `Space` | на кнопке очистки | Сбрасывает значение нативным click'ом кнопки. Всплытие останавливается, чтобы список не переключился заодно |
| `Enter` | на опции списка | Выбор опции (`keyCodesForSelection` у `DropdownListItem`) |
| `Escape` | внутри компонента | Закрывает список и возвращает в поле фильтрации `label` текущего значения (обработка в `Suggest`). Закрытым списком событие всплывает выше — так `ChipSuggest` уживается внутри модальных окон |

Связь списка и поля: `id` списка (`dropdownListId` из `SuggestContext`) проставляется на
`DropdownList` и в `aria-controls` поля фильтрации. `aria-activedescendant` поле принимает,
но библиотека `activeDescendant` не выставляет — клавиатурная навигация по опциям остаётся
на `DropdownList`.

Текстов компонент не хардкодит: `label`, `placeholder` и `noOptionsText` задаёт потребитель.
`noOptionsText` показывается в `Tooltip` у поля фильтрации, пока поле в фокусе и потребитель
держит `tooltipOpen`.

---

## Связанные компоненты

- `Chip` — target-элемент `ChipSuggest`; отсюда `type`, `size`, `disabled`, `selected`,
  фокус и клавиатура чипса. `IChipSuggestTargetProps` наследует `IChipProps` без `prefix`
  и `postfix`: `postfix` занят внутренней разметкой (стрелка или кнопка очистки),
  `prefix` в этой композиции просто не используется.
- `ChipSelect` — тот же выбор одного значения чипсом, но без фильтрации ввода (построен на
  `SelectExtendedField`). Основная альтернатива при коротком списке.
- `ChipMultiselect` — выбор нескольких значений чипсом.
- `Suggest` — headless-основа: состояние поля ввода, видимость списка, `SuggestContext`,
  обработка `Escape` и закрытие по клику вне. `IChipSuggestProps` наследует `ISuggestProps`.
- `Dropdown` — выпадающий список; `IChipSuggestDropdownProps` наследует `IDropdownProps`
  без `opened` / `setOpened` (ими управляет `SuggestContext`). Списком опций служат
  `DropdownList` и `DropdownListItem`.
- `FormField` — из его частей (`FormFieldLabel`, `FormFieldInput`, `FormFieldPostfix`,
  `FormFieldClear`) собрано поле фильтрации внутри десктопного списка.
- `ChipSuggestTarget` — сам чипс-триггер. Экспортируется из barrel, но самостоятельного
  применения не имеет: `value` и `dropdownOpen` берёт из `SuggestContext`, поэтому работает
  только внутри `Suggest`. Отдельного AI.md не имеет.
- `ChipSuggestDropdown` — выпадающий список компонента: `FocusTrap` + поле фильтрации +
  `DropdownList` на десктопе, `SuggestMobileDropdownContent` на мобильной ширине. Из barrel
  не экспортируется (наружу уходит только тип props), отдельного AI.md не имеет.
- `ChipSuggestDesktopDropdownField` — поле фильтрации внутри десктопного списка: лейбл,
  инпут, кнопка очистки ввода, лоадер и `Tooltip` с `noOptionsText`. Всё берёт из
  `SuggestContext`; из barrel не экспортируется, отдельного AI.md не имеет.
- `ChipGroup` — контейнер, в котором чипсы выстраиваются в ряд; корневой элемент
  `ChipSuggest` заранее помечен классом `chipGroupItem`.

---

## Stories

Основные истории: `stories/Chips/ChipSuggest.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipSuggest/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `type`, `size`, `label`, `displayedValue`, `placeholder`, `noOptionsText`, `loading`, `clearInputOnFocus`, `targetProps` |
| `Default` | `DefaultExample.tsx` | Базовая связка: локальный `value`, фильтрация опций в `onFilter`, `clearSelected`, подсказка при пустом списке |
| `Types` | `TypesExample.tsx` | Типы чипса `EChipType.TYPE_1` / `TYPE_2` |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `States` | `StatesExample.tsx` | Состояния `selected` и `disabled` |
| `WithNotificationIcon` | `WithNotificationIconExample.tsx` | Опции с `showNotificationIcon`. Исключена из скриншотов (`testRunner: { skip: true }`) |
| `VisualTests` | `VisualTestsExample.tsx` | Скриншот-регрессия: три размера с открытыми списками (списки раскрывает `useLayoutEffect` в примере) |

Скриншотами покрыты `Default`, `Types`, `Sizes`, `States` и `VisualTests`;
`Playground` и `WithNotificationIcon` из прогона исключены.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-07 | Создан документ (AI-рефакторинг ChipSuggest, TRI-134) |
