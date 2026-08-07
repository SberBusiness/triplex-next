---
component: SelectExtendedField
category: SelectExtendedField
related: [SelectField, MultiselectField, SuggestField, Chip, Dropdown, FormField, KeyDownListener, IconWrapper, LoaderSmall]
tokens: []
stories: stories/SelectExtendedField/SelectExtendedField.stories.tsx
version: "1.0"
---

# SelectExtendedField

## Назначение

Базовый компонент Select. Владеет **только** состоянием открытости выпадающего блока и
правилами его закрытия. Разметку поля выбора компонент отдаёт в рендер-функцию
`renderTarget`, разметку выпадающего блока — в рендер-функцию `children`. Собственной
разметки, кроме позиционирующего `<div>`-обёртки, у него нет.

Используй когда: нужно поле выбора с **нестандартным** содержимым выпадающего блока
(форма фильтра, чекбоксы с подтверждением, дерево, произвольный контент) или
нестандартным полем выбора — и при этом нужна готовая логика открытия/закрытия.

Не используй когда:

- нужен обычный select со списком опций — используй `SelectField`;
- нужен множественный выбор с тегами — используй `MultiselectField`;
- нужен поиск по вводу — используй `SuggestField`;
- нужен фильтр-чип со списком — используй `Chip.Select` / `Chip.Sort`;
- выпадающий блок не привязан к полю ввода — используй `Dropdown` или `ButtonDropdownExtended`.

---

## Варианты и props

### `SelectExtendedField`

`ISelectExtendedFieldProps` расширяет `React.HTMLAttributes<HTMLDivElement>` c
переопределённым `children`. Неизвестные компоненту атрибуты попадают на корневой `<div>`.

#### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `renderTarget` | `(props: ISelectExtendedFieldTargetProvideProps) => React.ReactNode` | Рендер-функция поля выбора. Получает `opened` и `setOpened` |
| `children` | `(props: ISelectExtendedFieldDropdownProvideProps) => React.ReactNode` | Рендер-функция выпадающего блока. Получает `opened`, `setOpened`, `targetRef`, `dropdownRef` |

#### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `closeOnTab` | `boolean` | `false` | Закрывать выпадающий блок по нажатию Tab внутри компонента |
| `onOpen` | `() => void` | — | Вызывается при переходе `opened` в `true`. На первом рендере не вызывается |
| `onClose` | `() => void` | — | Вызывается при переходе `opened` в `false`. На первом рендере не вызывается |
| `className` | `string` | — | Дополнительный класс корневого `<div>` |

#### Что получают рендер-функции

| Поле | Кому | Описание |
|---|---|---|
| `opened` | обеим | Текущее состояние открытости |
| `setOpened` | обеим | Сеттер состояния открытости. Стабилен между рендерами (сеттер `useState`) |
| `targetRef` | `children` | Ссылка на **корневой `<div>` компонента**, а не на поле ввода. По ней `Dropdown` считает своё положение |
| `dropdownRef` | `children` | Ссылка, которую нужно повесить на контейнер выпадающего блока. По ней компонент отличает нажатие внутри блока от нажатия вне его |

### `SelectExtendedField.Target` (`SelectExtendedFieldTarget`)

Готовое поле выбора поверх `FormField`. `ISelectExtendedFieldTargetProps` расширяет
`IFormFieldProps` без `prefix` / `postfix` (они переопределены своими типами).

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `fieldLabel` | `React.ReactNode` | — | Обязательный. Заголовок поля (плавающий label) |
| `opened` | `boolean` | — | Обязательный. Состояние открытости: поворот каретки, `aria-expanded`, активное состояние `FormField` |
| `setOpened` | `(opened: boolean) => void` | — | Обязательный. Вызывается по клику и по клавишам открытия |
| `label` | `React.ReactNode` | — | Выбранное значение |
| `placeholder` | `React.ReactNode` | — | Отображается, пока нет `label` |
| `loading` | `boolean` | `false` | Вместо каретки — лоадер; клик и клавиатура не открывают блок |
| `onClear` | `() => void` | — | Если передан, в постфиксе появляется кнопка очистки |
| `prefix` / `postfix` | `React.ReactNode` | — | Слоты `FormFieldPrefix` / `FormFieldPostfix`. Постфикс идёт **после** каретки |
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер поля. Определяет размер каретки и лоадера |
| `status` | `EFormFieldStatus` | `EFormFieldStatus.DEFAULT` | Визуальное состояние. `DISABLED` блокирует открытие |

### `SelectExtendedField.Dropdown` (`SelectExtendedFieldDropdown`)

Обёртка над `Dropdown`. Отличается только тем, что ссылку принимает не через `ref`,
а через prop `forwardedRef` — рендер-функция `children` отдаёт готовый `dropdownRef`,
и передать его через `ref` в JSX было бы невозможно без промежуточной обёртки.
Остальные props — как у `Dropdown` (`size`, `width`, `direction`, `alignment`,
`mobileViewProps`, ...). Статическое свойство `List` — это `DropdownList`.

### Ограничения

- Компонент **не управляемый снаружи**: состояние открытости внутреннее, prop'а `opened` у него нет. Открыть блок программно можно только через `setOpened`, полученный в рендер-функции.
- `SelectExtendedFieldDropdown` — не `forwardRef`-компонент. Ссылка передаётся через `forwardedRef`.
- Выпадающий блок компонент не рендерит сам и не знает, открыт ли он визуально: `opened` нужно передать в `SelectExtendedFieldDropdown` (или в свою разметку) самостоятельно.
- Компонент не хранит выбранное значение и не знает про опции. Значение — целиком забота потребителя.

---

## Дизайн-токены

Собственных токенов у компонента нет: `SelectExtendedField.module.less` задаёт только
`position: relative`, а `SelectExtendedFieldTarget.module.less` — раскладку, поворот
каретки и блокировку указателя в `disabled`. Цвета, фон, границы и тени приходят из
компонентов, на которых построено поле:

- `FormField` и его части (`FormFieldLabel`, `FormFieldTarget`, `FormFieldPrefix`, `FormFieldPostfix`, `FormFieldClear`) — `--triplex-next-FormField-*`;
- `Dropdown` и `DropdownList` — `--triplex-next-Dropdown-*`, `--triplex-next-DropdownList-*`;
- `IconWrapper` вокруг каретки — `--triplex-next-IconWrapper-*`;
- `LoaderSmall` в состоянии загрузки — токены лоадера.

Если понадобится собственное визуальное состояние поля выбора — токен заводится
в `SelectExtendedFieldTarget`, а не в `FormField`.

---

## Инварианты

- `forwardRef` на `SelectExtendedField` и `SelectExtendedFieldTarget` — не убирать. Ref `SelectExtendedField` указывает на корневой `<div>` (тот же элемент, что и `targetRef`), ref `SelectExtendedFieldTarget` — на `FormFieldTarget`, то есть на элемент со значением, а не на корень поля.
- Barrel `src/components/SelectExtendedField/index.ts` должен сохраняться: компонент используется внутри `SelectField`, `MultiselectField`, `Chip.Select`, `Chip.Sort`, `Chip.Multiselect`.
- `SelectExtendedFieldDropdownDefault` — **внутренний** компонент, из barrel не экспортируется. Его импортируют по прямому пути `components/SelectExtendedFieldDropdownDefault` внутри библиотеки. Не выносить в публичный API без отдельного решения.
- Статические свойства `SelectExtendedField.Target` и `SelectExtendedField.Dropdown`, а также `SelectExtendedFieldDropdown.List` — часть публичного API.
- `setOpened`, отдаваемый рендер-функциям, — это сеттер `useState`. Он обязан оставаться стабильным между рендерами: рендер-функции и построенные на них компоненты (`SelectField`, `Chip.Select`) кладут его в зависимости эффектов и колбэков.
- `onOpen` / `onClose` вызываются **только на смену состояния** и не срабатывают на первом рендере и на повторном маунте в React 18 StrictMode. Реализовано сравнением предыдущего значения `opened` (`prevOpenedRef`), а не флагом «смонтирован» — флаг ломается на двойном маунте.
- Актуальные `onOpen` / `onClose` хранятся в ref: эффект зависит только от `opened`, поэтому смена идентичности колбэков между рендерами их не вызывает.
- Закрытие по нажатию мышью вне блока опирается на `dropdownRef`, а не на DOM-вложенность: `Dropdown` рендерится через `Portal` в `document.body`. Если потребитель не повесит `dropdownRef` на свой контейнер, любое нажатие внутри выпадающего блока закроет его.
- Слушатель `mousedown` на `document` навешивается только пока блок открыт и снимается в cleanup эффекта.
- Компонент React 17-совместим (ветка `release-0`): не использовать `useId`, `useSyncExternalStore`, `useInsertionEffect` и поведение, зависящее от automatic batching.
- В `SelectExtendedFieldTarget.module.less` нет классов `loading`, `placeholder`, `label`. Не добавлять ссылки на них в `clsx`: у CSS-модуля такого свойства нет, и в атрибут `class` попадёт литерал `undefined` (баг был исправлен в 1.41.0). Если состоянию нужен стиль — сначала заведи класс в LESS.

---

## Accessibility

- `SelectExtendedFieldTarget` выставляет на корневом элементе `aria-haspopup="listbox"` и `aria-expanded`, отражающий `opened`.
- Роли `listbox` / `option` и клавиатурную навигацию по опциям (`ArrowUp` / `ArrowDown`, выбор по `Enter` / `Space`) даёт `DropdownList` — то есть `SelectExtendedField.Dropdown.List`. Если выпадающий блок не список, эти роли не появляются и навигацию организует потребитель.
- Клавиши открытия на поле выбора: `Space`, `Enter`, `ArrowDown`, `ArrowUp`. Обработчик вызывает `preventDefault` (чтобы страница не прокручивалась) и `stopPropagation` — иначе то же нажатие поймает документный обработчик `DropdownListItem` и список сразу выберет опцию.
- В состояниях `loading` и `status={EFormFieldStatus.DISABLED}` поле не реагирует ни на клик, ни на клавиатуру; `onClick` / `onKeyDown` потребителя в этих состояниях тоже не вызываются.
- `Escape` закрывает блок из любого места страницы — слушатель `KeyDownListener` висит на `window`.
- `Tab` закрывает блок только при `closeOnTab`. Фокус компонент не перехватывает и не возвращает: focus trap, если нужен, добавляет потребитель.
- Связь поля со списком (`aria-controls`, `aria-activedescendant`) компонент **не выставляет** — это делает потребитель. `SelectField` передаёт `listId` в `SelectExtendedFieldDropdownDefault` именно для этого.
- Компонент не хардкодит текстовые строки: `fieldLabel`, `placeholder`, `aria-label` для кнопки очистки и заголовок мобильной версии передаёт потребитель — библиотека мультиязычная.

---

## Связанные компоненты

Отдельного AI.md пока нет ни у `SelectExtendedFieldTarget`, ни у
`SelectExtendedFieldDropdown` — они описаны здесь. Это область задачи TRI-74
(«Scope: только SelectExtendedField; соседние экспортируемые компоненты из
`src/components/SelectExtendedField/` — отдельные задачи»), а не вывод по критериям
`docs/ai/CONTEXT.md` → «Когда создавать `{ComponentName}-ai.md`». По этим критериям
оба заслуживают собственных AI.md и отдельных строк в `docs/ai/ROADMAP.md`.
Решение о том, заводить ли их, за владельцем репозитория.

**Внутри папки компонента:**

- `SelectExtendedFieldTarget` (`SelectExtendedField.Target`) — готовое поле выбора поверх `FormField`.
- `SelectExtendedFieldDropdown` (`SelectExtendedField.Dropdown`) — обёртка над `Dropdown` со ссылкой через `forwardedRef`. Статическое свойство `List` — `DropdownList`.
- `SelectExtendedFieldDropdownDefault` — внутренний компонент: готовый выпадающий блок со списком опций и мобильной версией. Не экспортируется из barrel, используется в `Chip.Select`, `Chip.Sort` и `SelectField`.

**Построены на SelectExtendedField:**

- `SelectField` — обычный select со списком опций.
- `MultiselectField` — множественный выбор.
- `Chip.Select`, `Chip.Sort`, `Chip.Multiselect` — фильтр-чипы.

`SuggestField` на `SelectExtendedField` **не** построен: он собран на `Dropdown`
напрямую. Правки в этом компоненте его не затрагивают.

**Инфраструктура:**

- `Dropdown` — выпадающее меню через `Portal`, позиционирование, мобильная версия.
- `FormField` — визуальный контейнер поля, контекст размера и статуса.
- `KeyDownListener` — закрытие по `Escape`.
- `IconWrapper`, `LoaderSmall` — каретка и лоадер в постфиксе поля.

---

## Stories

Основные истории: `stories/SelectExtendedField/SelectExtendedField.stories.tsx`
Файлы примеров: `stories/SelectExtendedField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `closeOnTab` и настроек поля выбора: размер, статус, загрузка, кнопка очистки |
| `Default` | `Default.tsx` | Базовый сценарий: поле выбора и список опций |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG |
| `Statuses` | `Statuses.tsx` | Состояния поля: DEFAULT / DISABLED / ERROR / WARNING |
| `Loading` | `Loading.tsx` | Состояние загрузки: лоадер вместо каретки, поле не открывается |
| `WithClearButton` | `WithClearButton.tsx` | Кнопка очистки значения через `onClear` |
| `WithPrefixAndPostfix` | `WithPrefixAndPostfix.tsx` | Слоты `prefix` и `postfix` поля выбора |
| `Example` | `Example.tsx` | Произвольный выпадающий блок: чекбоксы и кнопки вместо списка, значение подтверждается явно |
| `VisualTests` | `VisualTests.tsx` | Раскрытый список (через `play`), длинное значение с кнопкой очистки, загрузка в размере SM |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-07 | Создан документ AI-ready для `SelectExtendedField` (TRI-74). |
| 2026-08-07 | AI-рефакторинг (TRI-74): `onOpen` / `onClose` сравнивают предыдущее значение `opened` вместо флага «смонтирован» — колбэки больше не срабатывают ложно при двойном маунте в React 18 StrictMode. Удалены ссылки на несуществующие CSS-классы в `SelectExtendedFieldTarget` (в `class` попадал литерал `undefined`). Слушатель `mousedown` навешивается только пока блок открыт, callback-ref стабилизирован через `useCallback`, убран мёртвый внутренний `targetRef` в `SelectExtendedFieldTarget`. JSDoc на всех props, unit-тесты разбиты по субкомпонентам и расширены с 42 до 67 кейсов. Stories переведены на modern pattern. Публичный API не изменён. |
