---
component: MultiselectField
category: MultiselectField
related: [SelectField, SuggestField, SelectExtendedField, Dropdown, LoaderScreen]
tokens:
  - MultiselectField.Divider_Color
stories: stories/MultiselectField/MultiselectField.stories.tsx
version: "1.0"
---

# MultiselectField

## Назначение

Поле выбора нескольких значений: поле с тегами выбранного и выпадающий блок с
произвольным содержимым — списком чекбоксов, деревом, фильтром и кнопками
подтверждения.

Собственной разметки у компонента почти нет. Это надстройка над
`SelectExtendedField`, которая добавляет три вещи: раздачу размера частям
выпадающего блока через контекст, перехват фокуса внутри открытого блока
(`FocusTrap`) и правило «после открытия мышью фокус на поле не возвращается».
Состоянием открытости, закрытием по `Escape` и по нажатию вне блока по-прежнему
владеет `SelectExtendedField`.

Используй когда: нужен множественный выбор — чекбоксы со счётчиком, дерево
категорий, фильтр с явным подтверждением — и выбранное показывается тегами в поле.

Не используй когда:

- нужен выбор одного значения из списка — используй `SelectField`;
- нужен поиск по вводу с подсказками — используй `SuggestField`;
- нужен множественный выбор в виде фильтр-чипа над таблицей — используй `ChipMultiselect` (он построен на этом компоненте);
- содержимое выпадающего блока стандартное, а перехват фокуса не нужен — используй `SelectExtendedField` напрямую;
- выпадающий блок не привязан к полю ввода — используй `Dropdown`.

---

## Варианты и props

### `MultiselectField`

`IMultiselectFieldProps` расширяет `ISelectExtendedFieldProps` единственным
собственным prop'ом `size`. Всё остальное — обязательные рендер-функции
`renderTarget` и `children`, колбэки `onOpen` / `onClose`, `closeOnTab` и
html-атрибуты корневого `<div>` — приходит из `SelectExtendedField`, см.
`SelectExtendedField-ai.md`.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер. Раздаётся **только частям выпадающего блока** через контекст. Полю выбора размер нужно передать отдельно |
| `renderTarget` | `(props: ISelectExtendedFieldTargetProvideProps) => React.ReactNode` | — | Обязательный. Рендер-функция поля выбора. Получает `opened` и `setOpened` |
| `children` | `(props: ISelectExtendedFieldDropdownProvideProps) => React.ReactNode` | — | Обязательный. Рендер-функция выпадающего блока. Получает `opened`, `setOpened`, `targetRef`, `dropdownRef` |

### `MultiselectField.Target`

Это `SelectExtendedFieldTarget` — тот же компонент, что и у `SelectField` и
`ChipSelect`. Собственного варианта поля у `MultiselectField` нет. `size` и
`status` он берёт из своих props, а не из контекста мульти-списка, поэтому
`size` передаётся в него явно. Выбранные значения кладутся в `label` —
как правило `TagGroup` с `Tag` на каждое значение.

### `MultiselectField.Dropdown` (`MultiselectFieldDropdown`)

`IMultiselectFieldDropdownProps` расширяет `IDropdownProps` одним prop'ом
`focusTrapProps` (`FocusTrapProps` из `focus-trap-react`).

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `focusTrapProps` | `FocusTrapProps` | — | Прокидывается в `FocusTrap`. `focusTrapOptions` мержатся поверх умолчаний компонента |
| `width` | `EDropdownWidth` | `EDropdownWidth.MIN_TARGET` | Умолчание задаёт компонент; потребитель может переопределить |
| `size` | `EComponentSize` | из контекста | Умолчание — `size` мульти-списка; явный prop имеет приоритет |
| `opened`, `setOpened`, `targetRef` | — | — | Обязательные, приходят из рендер-функции `children` |
| `mobileViewProps` | `Omit<IDropdownMobileProps, "opened" \| "setOpened">` | — | Содержимое мобильной версии. Мобильная версия включена **всегда** — см. «Инварианты» |

Умолчания `focusTrapOptions`: `clickOutsideDeactivates: true`,
`preventScroll: true`, `returnFocusOnDeactivate` — по признаку «блок открыт мышью».
Любое из них переопределяется через `focusTrapProps.focusTrapOptions`.

Ссылку на контейнер блока компонент принимает через обычный `ref` (в отличие от
`SelectExtendedField.Dropdown`, где для этого есть prop `forwardedRef`). В него
передаётся `dropdownRef` из рендер-функции.

### `MultiselectField.Dropdown.Header` / `.Content` / `.Footer`

Три слота выпадающего блока. Своих props, кроме перечисленных ниже, нет —
`className` мержится, остальные атрибуты уходят на корневой `<div>`.

| Часть | Своё | Описание |
|---|---|---|
| `Header` | — | Верхняя фиксированная область: поле фильтра |
| `Content` | `loading?: boolean` | Прокручиваемая область со списком. Максимальную высоту задаёт `size` из контекста (SM 208px / MD 266px / LG 296px). `loading` показывает `LoaderScreen` поверх содержимого |
| `Footer` | — | Нижняя фиксированная область: кнопки. Отделена разделителем |

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию —
`src/components/DesignTokens/components/MultiselectField.ts`.

```text
MultiselectField.Divider_Color
```

Единственный собственный токен — цвет разделителя над `Footer`. Всё остальное
приходит из компонентов, на которых собран мульти-список: `FormField` (поле
выбора), `Dropdown` и `DropdownList` (выпадающий блок), `LoaderScreen` (загрузка
содержимого), `Tag` / `TagGroup` (выбранные значения), `Checkbox` /
`CheckboxTree` (опции).

---

## Инварианты

- `forwardRef` на `MultiselectField` и `MultiselectFieldDropdown` — не убирать. Ref `MultiselectField` указывает на корневой `<div>` `SelectExtendedField`, ref `MultiselectFieldDropdown` — на контейнер выпадающего блока (в него передаётся `dropdownRef`).
- Barrel `src/components/MultiselectField/index.ts` экспортирует только `MultiselectField` и `IMultiselectFieldProps`. Части выпадающего блока публичны **через статические свойства** (`MultiselectField.Dropdown.Header` и т.д.), а не через barrel. Их типы (`IMultiselectFieldDropdownProps`, `IMultiselectFieldDropdownContentProps`, ...) в публичный API не входят — выносить их туда без отдельного решения не нужно.
- Статические свойства `MultiselectField.Target`, `MultiselectField.Dropdown` и `MultiselectFieldDropdown.Header` / `.Content` / `.Footer` — часть публичного API.
- `MultiselectField.Target` — это `SelectExtendedFieldTarget` по ссылке (`MultiselectField.Target === SelectExtendedFieldTarget`). Правки в нём затрагивают также `SelectField` и `ChipSelect`.
- **Мобильная версия выпадающего блока включена всегда.** `MultiselectFieldDropdown` передаёт в `Dropdown` объект `mobileViewProps` даже когда потребитель ничего не передал — для этого есть константа-заглушка `ALWAYS_MOBILE_VIEW_PROPS`: `Dropdown` выбирает мобильную версию по truthiness этого prop'а. Убрать объект — значит на мобильной ширине отрендерить десктопный блок вместо полноэкранного. Наблюдаемое поведение, покрыто unit-тестом «Should render the mobile version on mobile width even without mobileViewProps». Visual-стори этот инвариант не держат: `PlaygroundExample` передаёт `mobileViewProps` сам, поэтому скриншоты не упадут, даже если убрать объект из компонента.
- Признак «открыт мышью» живёт в `mouseUsedRef` в контексте: `MultiselectField` ставит его в `true` на `mousedown`, `MultiselectFieldDropdown` сбрасывает в `false`, когда блок закрылся. Он не state — переключение не должно вызывать перерисовку.
- `size` из props раздаётся **только через контекст** и до поля выбора не доходит. Потребитель передаёт размер в `MultiselectField.Target` сам. Не «чинить» это без согласования: у поля и у выпадающего блока размеры могут различаться намеренно (в примерах фильтр внутри `Header` — размера SM при MD-поле).
- `Header` / `Content` / `Footer` объявлены как `React.FC` и `ref` **не пробрасывают** — в отличие от `MultiselectField` и `MultiselectField.Dropdown`. Перевод их на `forwardRef` обратно совместим по props, но меняет тип компонента, поэтому делается отдельной задачей, а не попутно.
- `Content` имеет `tabIndex={-1}`: он фокусируется программно (в том числе `FocusTrap`), но не попадает в обход по `Tab`. Не убирать.
- Классы `sm` / `md` / `lg` в `MultiselectFieldDropdownContent.module.less` читаются через `createSizeToClassNameMap` — переименование класса ломает соответствие размеру.
- Компонент React 17-совместим (ветка `release-0`): не использовать `useId`, `useSyncExternalStore`, `useInsertionEffect` и поведение, зависящее от automatic batching.

---

## Accessibility

- Пока выпадающий блок открыт, фокус заперт внутри него (`FocusTrap` из `focus-trap-react`). Содержимое обёрнуто в `<div role="presentation">` — обёртка нужна `FocusTrap` как единственный контейнер и не должна попадать в дерево доступности.
- `clickOutsideDeactivates: true` — нажатие вне блока снимает перехват фокуса, после чего блок закрывает уже `SelectExtendedField` по своему `mousedown`-слушателю.
- Возврат фокуса на поле при закрытии зависит от того, как блок открыли: после клавиатуры фокус возвращается, после мыши — нет (иначе клик вне блока повторно подсвечивал бы поле). Признак сбрасывается на каждое закрытие, поэтому следующее открытие оценивается заново.
- `aria-haspopup="listbox"` и `aria-expanded` выставляет `MultiselectField.Target` (то есть `SelectExtendedFieldTarget`). Клавиши открытия поля — `Space`, `Enter`, `ArrowDown`, `ArrowUp`.
- `Escape` закрывает блок из любого места страницы — слушатель `SelectExtendedField` висит на `window`.
- Роли и клавиатурную навигацию **внутри** блока компонент не задаёт: содержимое произвольное (чекбоксы, дерево, кнопки), связь поля со списком (`aria-controls`, `aria-activedescendant`) и `aria-label` на элементах — забота потребителя.
- Компонент не хардкодит текстовые строки: `fieldLabel`, `placeholder`, подписи кнопок и заголовок мобильной версии передаёт потребитель — библиотека мультиязычная.
- В состоянии `loading` у `Content` `LoaderScreen` перекрывает содержимое подложкой, но элементы под ней остаются в DOM и в порядке обхода — если содержимое нужно отключить, потребитель делает это сам.

---

## Связанные компоненты

Отдельного AI.md нет ни у `MultiselectFieldDropdown`, ни у его частей — они
описаны здесь. По критериям `docs/ai/CONTEXT.md` → «Когда создавать
`{ComponentName}-ai.md`» отдельные документы им и не нужны: из barrel
`src/components/MultiselectField/index.ts` они не экспортируются и доступны
только как статические свойства.

**Внутри папки компонента:**

- `MultiselectFieldDropdown` (`MultiselectField.Dropdown`) — выпадающий блок: `Dropdown` внутри `FocusTrap`.
- `MultiselectFieldDropdownHeader` / `Content` / `Footer` — слоты блока; своя логика есть только у `Content` (размер из контекста, `loading`).
- `MultiselectFieldContext` — внутренний контекст (`size`, `mouseUsedRef`). Из barrel не экспортируется, в публичный API не выносить.

**Основа и альтернативы:**

- `SelectExtendedField` — база: состояние открытости, закрытие по `Escape` / нажатию вне блока / `Tab`. `IMultiselectFieldProps` наследует его props.
- `SelectField` — выбор одного значения из готового списка опций.
- `SuggestField` — поиск по вводу с подсказками; на `SelectExtendedField` не построен.
- `ChipMultiselect` — тот же множественный выбор, но в виде фильтр-чипа. Построен на `MultiselectField`: правки здесь затрагивают его.

**Инфраструктура:**

- `Dropdown` — выпадающее меню через `Portal`, позиционирование и полноэкранная мобильная версия.
- `LoaderScreen` — лоадер поверх содержимого при `Content loading`.
- `FormField` — визуальный контейнер поля выбора и поля фильтра в `Header`.
- `Tag` / `TagGroup`, `Checkbox`, `CheckboxTree` — типовое наполнение поля и выпадающего блока в примерах; частью компонента не являются.

---

## Stories

Основные истории: `stories/MultiselectField/MultiselectField.stories.tsx`
Файлы примеров: `stories/MultiselectField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль: размер, статус, загрузка, префикс/постфикс, поле фильтра, кнопка очистки |
| `Default` | `DefaultExample.tsx` | Базовый сценарий: теги в поле, фильтр в `Header`, чекбоксы в `Content`, кнопки в `Footer`, мобильная версия |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `Statuses` | `StatusesExample.tsx` | Состояния поля: DEFAULT / ERROR / WARNING / DISABLED |
| `Loading` | `LoadingExample.tsx` | Загрузка поля (лоадер вместо каретки) и загрузка содержимого (`Content loading`) |
| `DropdownWithoutInput` | `DropdownWithoutInputExample.tsx` | Выпадающий блок без поля фильтра — только список и кнопки |
| `WithClearButton` | `WithClearButtonExample.tsx` | Кнопка очистки значения в поле через `onClear` |
| `WithPrefixAndPostfix` | `WithPrefixAndPostfixExample.tsx` | Слоты `prefix` и `postfix` поля выбора |
| `Example` | `ProductionExample.tsx` | Приближенный к продуктовому сценарий (в Storybook — «Example: production») |
| `WithCheckboxTree` | `WithCheckboxTreeExample.tsx` | Дерево категорий вместо плоского списка чекбоксов (в Storybook — «Example: with CheckboxTree») |
| `VisualTests` | `PlaygroundExample.tsx` | Скриншот-регрессия: поле с выбранным значением и раскрытый блок |
| `VisualTestsNotFound` | `PlaygroundExample.tsx` | Скриншот-регрессия: пустой результат фильтра во всех размерах; на мобильной ширине — полноэкранная версия |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-03 | Создан документ AI-ready для `MultiselectField` (TRI-61). |
| 2026-09-03 | AI-рефакторинг (TRI-61): JSDoc на props, контексте и всех частях выпадающего блока; значение контекста обёрнуто в `useMemo`, обработчик `onMouseDown` — в `useCallback` (выигрыша в текущей связке нет: части приходят из рендер-функции `children` и пересоздаются каждый рендер независимо от контекста, — это страховка на случай `React.memo` у потребителя); объект-заглушка `mobileViewProps` вынесен в константу, чтобы инвариант «мобильная версия включена всегда» читался из самого выражения; unit-тесты разбиты по субкомпонентам и расширены с 1 до 45 кейсов. Публичный API и наблюдаемое поведение не изменены. |
