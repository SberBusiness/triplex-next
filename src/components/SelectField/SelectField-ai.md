---
component: SelectField
category: SelectField
related: [SelectExtendedField, MultiselectField, SuggestField, Chip, Dropdown]
tokens: []
stories: stories/SelectField/SelectField.stories.tsx
version: "1.0"
---

# SelectField

## Назначение

Готовый Select со списком опций: поле выбора и выпадающий блок собраны заранее. Тонкий слой над
`SelectExtendedField` — состоянием открытости владеет он, а `SelectField` отвечает за подстановку
готового поля выбора (`SelectExtendedField.Target`), готового списка
(`SelectExtendedFieldDropdownDefault`) и за aria-связку между ними.

Используй когда: нужен обычный выбор одного значения из плоского списка опций с текстовыми
подписями — вместе с мобильной версией списка и клавиатурной навигацией «из коробки».

Не используй когда:

- нужен множественный выбор с тегами — `MultiselectField`;
- нужен поиск/фильтрация по вводу — `SuggestField`;
- содержимое выпадающего блока нестандартное (форма, чекбоксы с подтверждением, дерево)
  или нужно нестандартное поле выбора — `SelectExtendedField`, он для этого и существует;
- выбор оформляется фильтр-чипом, а не полем формы — `Chip.Select` / `Chip.Sort`;
- выпадающий блок не привязан к полю ввода — `Dropdown` или `ButtonDropdownExtended`.

---

## Варианты и props

`ISelectFieldProps` собирается из трёх источников:

1. `Omit<ISelectExtendedFieldProps, "children" | "onChange" | "renderTarget">` — то есть
   `onOpen`, `onClose`, `closeOnTab` и все атрибуты `React.HTMLAttributes<HTMLDivElement>`,
   попадающие на корневой `<div>`;
2. `Pick<ISelectExtendedFieldTargetProps, "loading" | "status" | "placeholder">` — состояния
   поля выбора;
3. собственные props списка.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `EComponentSize` | Размер. Задаётся один раз и применяется и к полю выбора, и к выпадающему блоку со списком |
| `options` | `ISelectFieldOption[]` | Список опций. `ISelectFieldOption` — это `ISelectExtendedFieldDefaultOption`: `id`, `value`, `label` плюс props `DropdownListItem` |
| `onChange` | `(option: ISelectFieldOption) => void` | Вызывается с **объектом опции** (не с `id` и не с `value`). Список после выбора закрывается сам |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `value` | `ISelectFieldOption` | — | Выбранное значение. С опциями списка сопоставляется по полю `id` — подсветка выбранной опции считается как `option.id === value.id` |
| `placeholder` | `React.ReactNode` | — | Отображается, пока `value` не задан |
| `status` | `EFormFieldStatus` | `EFormFieldStatus.DEFAULT` | Визуальное состояние поля. `DISABLED` блокирует открытие списка |
| `loading` | `boolean` | `false` | Вместо каретки — лоадер; список не раскрывается ни мышью, ни с клавиатуры |
| `targetProps` | `Omit<ISelectExtendedFieldTargetProps, "opened" \| "setOpened" \| "size">` | — | Уходит целиком в `SelectExtendedField.Target`. Здесь задаётся **обязательный** заголовок поля `fieldLabel`, а также `prefix`, `postfix`, `onClear` |
| `dropdownProps` | `ISelectExtendedFieldDropdownDefaultProps["dropdownProps"]` | — | Настройки `Dropdown` (`direction`, `alignment`, `className`, ...). `width`, `size`, `opened` и `targetRef` компонент задаёт сам |
| `dropdownListItemClassName` | `string` | — | Класс каждого элемента списка — и десктопного `DropdownListItem`, и мобильного `DropdownMobileListItem` |
| `mobileTitle` | `React.ReactNode` | — | Заголовок выпадающего блока в мобильном режиме. Отдельный prop: на мобильном список раскрывается на весь экран и `fieldLabel` в нём не виден |
| `closeOnTab` | `boolean` | `true` | Компонент передаёт `closeOnTab={true}`, но `{...rest}` идёт после, поэтому переданное потребителем значение выигрывает |
| `children` | `never` | — | Не принимаются: выпадающий блок компонент рендерит сам |

### Что компонент задаёт сам и переопределить нельзя

- **Ширина выпадающего блока** — всегда `EDropdownWidth.TARGET` (по ширине поля).
- **Содержимое выпадающего блока** — `SelectExtendedFieldDropdownDefault` со списком `options`
  и мобильной версией. Другого содержимого не бывает; если нужно другое — это `SelectExtendedField`.
- **`opened` / `setOpened`** поля выбора — приходят от `SelectExtendedField` и спредятся
  **после** `targetProps`, поэтому подменить их через `targetProps` нельзя.

### Ограничения

- Компонент **не управляемый снаружи** по открытости: prop'а `opened` нет, открыть список
  программно невозможно.
- Значение не хранится внутри: `value` + `onChange` — контролируемый компонент, состояние ведёт
  потребитель.
- Заголовок поля живёт в `targetProps.fieldLabel`, а не в собственном prop'е. `SelectField`
  подставляет `fieldLabel={undefined}` до спреда `targetProps` — иначе обязательное поле
  `ISelectExtendedFieldTargetProps` осталось бы незаполненным. Потребители, которым заголовок
  не нужен, передают пустую строку (так делает `PaginationSelect`).
- `role="combobox"`, `aria-controls` и прочие атрибуты поля стоят **до** `{...targetProps}`,
  поэтому потребитель может их перекрыть. Делать это без причины не стоит — сломается
  aria-связка со списком.

---

## Дизайн-токены

Собственных токенов и собственных стилей у компонента нет — в папке нет `.module.less`.
Внешний вид целиком приходит из компонентов, на которых он собран:

- `FormField` и его части (`FormFieldLabel`, `FormFieldTarget`, `FormFieldPrefix`,
  `FormFieldPostfix`, `FormFieldClear`) — группа `FormField`;
- `Dropdown` и `DropdownList` — группы `Dropdown` и `DropdownList`;
- `IconWrapper` вокруг каретки и `LoaderSmall` в состоянии загрузки — их собственные группы.

Переопределяются они через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Если понадобится собственное визуальное состояние поля выбора,
токен заводится в `SelectExtendedFieldTarget`, а не здесь.

---

## Инварианты

- **`forwardRef`** — не убирать. `ref` уходит в `SelectExtendedField.Target`, то есть указывает
  на `FormFieldTarget` — элемент со значением, а **не** на корневой `<div>` компонента.
  Корневой `<div>` — это `SelectExtendedField`, и своей ссылки на него `SelectField` наружу не отдаёт.
- **Имена `SelectField`, `ISelectFieldProps`, `ISelectFieldOption`** и `displayName` — публичный API:
  экспортируются из barrel `src/components/SelectField/index.ts` и из `src/components/index.ts`.
  `ISelectFieldProps` наследует `IChipSelectProps` (`Chip.Select`) и `IPaginationSelectProps`
  (`Pagination`), `ISelectFieldOption` используется в тестах и stories `Chip` — переименование
  ломает их.
- **`ISelectFieldOption` — пустой `extends ISelectExtendedFieldDefaultOption`.** Это осознанный
  публичный алиас: потребитель не должен импортировать тип из чужой папки. Не схлопывать в
  `type ... = ...` и не удалять.
- **Accessibility-контракт поля выбора** — `role="combobox"`, `aria-controls`,
  `aria-activedescendant`, проброс `aria-labelledby`. Менять только вместе с `DropdownList`.
- **`aria-labelledby` не уходит в `...rest`**: он адресован полю выбора, а не корневому `<div>`.
  Если вернуть его в `rest`, `PaginationSelect` потеряет связь с подписью пагинации.
- **Идентификатор списка стабилен на всё время жизни компонента** (`useState(() => uniqueId())`).
  На него ссылается `aria-controls`; пересоздание на каждый рендер рвёт связку.
- **`EDropdownWidth.TARGET`** — часть дизайна компонента, а не деталь реализации: список всегда
  по ширине поля.
- **React 17-совместимость** (ветка `release-0`): не использовать `useId`,
  `useSyncExternalStore`, `useInsertionEffect` и поведение, зависящее от automatic batching.
  Уникальный идентификатор берётся из `uniqueId` (`lodash-es`).
- **`SelectExtendedFieldDropdownDefault` импортируется по прямому пути**
  (`components/SelectExtendedFieldDropdownDefault`) — он не экспортируется из barrel
  `SelectExtendedField`. Не выносить его в публичный API «заодно».

---

## Accessibility

- Поле выбора получает `role="combobox"` и `aria-controls` с идентификатором списка опций.
  Идентификатор генерируется компонентом и передаётся в `SelectExtendedFieldDropdownDefault`
  как `listId` — то есть в `id` реального `DropdownList`.
- `aria-activedescendant` отражает опцию, подсвеченную с клавиатуры. Значение поднимается снизу:
  `DropdownList` кладёт `id` активного элемента в `DropdownListContext`, провайдер которого
  `SelectField` рендерит вокруг выпадающего блока. Без этого провайдера связка не работает.
- `aria-expanded` и `aria-haspopup="listbox"` выставляет `SelectExtendedFieldTarget`;
  роли `listbox` / `option` и навигацию `ArrowUp` / `ArrowDown` — `DropdownList`.
- Клавиши открытия списка: `Space`, `Enter`, `ArrowDown`, `ArrowUp`. Закрытие — `Escape`
  (из любого места страницы), `Tab` (`closeOnTab`) и нажатие мышью вне поля и списка.
- В состояниях `loading` и `status={EFormFieldStatus.DISABLED}` поле не реагирует ни на клик,
  ни на клавиатуру.
- **Доступное имя задаёт потребитель.** Компонент не хардкодит текст (библиотека мультиязычная):
  имя приходит либо из `targetProps.fieldLabel`, либо из `aria-labelledby` — так поступает
  `PaginationSelect`, связывая поле с подписью пагинации и передавая пустой `fieldLabel`.
- Фокус компонент не перехватывает и не возвращает: focus trap, если он нужен, добавляет потребитель.

---

## Связанные компоненты

- `SelectExtendedField` — база. `ISelectFieldProps` строится из его props, а сам компонент
  рендерит `SelectExtendedField` с `SelectExtendedField.Target` в `renderTarget` и
  `SelectExtendedFieldDropdownDefault` в `children`. Любая правка в нём отражается на `SelectField`.
- `MultiselectField` — множественный выбор с тегами, тоже на `SelectExtendedField`.
  Альтернатива, когда значений может быть несколько.
- `SuggestField` — поле выбора с поиском по вводу. Собран на `Dropdown` напрямую, не на
  `SelectExtendedField`, поэтому правки в `SelectField` его не затрагивают.
- `Chip` — `Chip.Select` и `Chip.Sort` решают ту же задачу в виде фильтр-чипа;
  `IChipSelectProps` собирается из `ISelectFieldProps`.
- `Dropdown` — выпадающий блок, `DropdownList` / `DropdownListItem` и `DropdownListContext`,
  через который поднимается активная опция для `aria-activedescendant`.
- `Pagination` — потребитель внутри библиотеки: `PaginationSelect` оборачивает `SelectField`
  для выбора количества элементов на странице и опирается на проброс `aria-labelledby`
  и на пустой `targetProps.fieldLabel`.

---

## Stories

Основные истории: `stories/SelectField/SelectField.stories.tsx`
Файлы примеров: `stories/SelectField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `size`, `status`, `loading`, `placeholder`, заголовка поля и описания под ним |
| `Default` | `Default.tsx` | Минимальный сценарий: список опций и выбранное значение в состоянии потребителя |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG |
| `Statuses` | `Statuses.tsx` | Состояния поля: DEFAULT / DISABLED / ERROR / WARNING |
| `Loading` | `Loading.tsx` | Состояние загрузки: лоадер вместо каретки, список не раскрывается |
| `WithDescription` | `WithDescription.tsx` | Композиция с `FormGroup` и `FormFieldDescription`: описание и текст ошибки под полем |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: раскрытый список с подсвеченной опцией (через `play`), длинное значение, загрузка в размере SM, пустое заблокированное поле |

`Playground` исключён из скриншот-тестов, `WithDescription` — тоже: поле в нём повторяет
состояния из `Default` и `Statuses`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-03 | Создан документ (TRI-75). AI-рефакторинг: удалён мёртвый внутренний `targetRef`, внешний `ref` пробрасывается напрямую и больше не пересоздаётся на каждый рендер; идентификатор списка переведён с `useRef(uniqueId())` на `useState(() => uniqueId())`, чтобы счётчик не крутился на каждом рендере; параметры рендер-функций перестали затенять `props` компонента; импорты приведены к алиасу пакета; JSDoc на всех props и на компоненте. Unit-тесты расширены с 15 до 24 кейсов (`onChange` с аргументом, опции и выбранное значение, `aria-activedescendant` через `DropdownListContext`, стабильность `listId`, ref-target). Stories переведены на modern pattern, `States` разделена на `Statuses` и `Loading`. Публичный API не изменён |
