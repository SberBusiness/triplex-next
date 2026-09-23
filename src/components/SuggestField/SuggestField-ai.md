---
component: SuggestField
category: TextFields
related: [Suggest, SelectField, TextField, FormField, Dropdown]
tokens: []
stories: stories/SuggestField/SuggestField.stories.tsx
version: "1.0"
---

# SuggestField

## Назначение

Готовое поле ввода с выпадающим списком и поиском по введённому значению: лейбл, статусы,
префикс/постфикс, лоадер, кнопка очистки и подсказка-Tooltip уже собраны. Компонент
**не фильтрует список сам** — он сообщает введённый текст через `onFilter`, а потребитель
возвращает новый `options`.

Адаптивный: на ширине экрана < 768px вместо десктопного поля с выпадающим списком рендерится
мобильный вариант — поле только для чтения, по фокусу открывающее полноэкранный дропдаун с
собственным полем ввода. Переключение делает `MobileView`, потребителю ничего делать не нужно.

Используй когда: нужно поле с подсказками-опциями — поиск контрагента, счёта, адреса, в том
числе с асинхронной догрузкой (`loading`, `dropdownListLoading`, `onScrollEnd`).

Не используй когда:
- Список фиксированный и вводом не фильтруется — возьми `SelectField`.
- Нужен suggest-фильтр в ряду чипсов — возьми `ChipSuggest`.
- Нужна нестандартная разметка управляющего элемента или списка — собери своё на headless
  `Suggest`; `SuggestField` жёстко задаёт композицию `TextFieldBase` + `Dropdown`.

---

## Варианты и props

`ISuggestFieldProps<T>` расширяет `Omit<ITextFieldProps, "onSelect">`, поэтому всё из
`TextField` / `FormField` доступно: `status`, `size`, `active`, `label`, `description`,
`counter`, `prefix`, `postfix`, `className`, `data-*`, `inputProps`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `value` | `T \| undefined` | Выбранная опция. Контролируемое значение: при смене `value.id` поле ввода перезаписывается на `value.label` |
| `options` | `T[]` | Список опций. Фильтрует потребитель в ответ на `onFilter` — компонент список не фильтрует и не сортирует |
| `tooltipHint` | `string` | Текст подсказки («Ничего не найдено», «Введите более 3 символов»). Обязателен, даже если `tooltipOpen` всегда `false` |
| `tooltipOpen` | `boolean` | Показывать подсказку. Управляется снаружи: компонент сам не решает, когда список «пустой по делу» |
| `onSelect` | `(value: T \| undefined) => void` | Опция выбрана. Вызывается с `undefined`, когда значение сбрасывается. На десктопе это blur с пустым полем и кнопка очистки; на мобильном — только закрытие дропдауна с пустым вводом, кнопка очистки там зовёт лишь `onClear` (см. «Инварианты»), так что сброс значения ложится на потребителя |
| `onFilter` | `(value: string) => void` | Текст поля ввода изменился. Ответ — обновлённый `options` |
| `inputProps` | `IFormFieldInputProps & { ref?: React.Ref<HTMLInputElement> }` | Свойства поля ввода. **Не опционально:** передавай хотя бы `{}`. Через `inputProps.ref` потребитель получает ref на `<input>` — собственного `forwardRef` у компонента нет |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.LG` | Размер поля и выпадающего списка |
| `status` | `EFormFieldStatus` | `EFormFieldStatus.DEFAULT` | `DISABLED` блокирует ввод и подавляет Tooltip |
| `label` | `string` | — | Лейбл над полем ввода |
| `placeholder` | `string` | — | Подсказка в пустом поле |
| `loading` | `boolean` | — | Лоадер в постфиксе поля (десктоп) и в шапке дропдауна (мобильный) |
| `dropdownListLoading` | `boolean` | — | Догрузка списка: лоадер под уже загруженными опциями. Пока `true`, `onScrollEnd` не вызывается |
| `clearInputOnFocus` | `boolean` | `false` | Очищать поле ввода при получении фокуса. На десктопе дополнительно вызывает `onFilter("")` |
| `onScrollEnd` | `() => void` | — | Список прокручен до конца — грузи следующую страницу опций |
| `onClear` | `React.MouseEventHandler<HTMLButtonElement>` | — | Обработчик очистки. **Кнопка очистки рендерится, только если он передан** |
| `renderInput` | `(props: IFormFieldInputProps) => JSX.Element` | `FormFieldInput` | Замена поля ввода |

Только десктопный `SuggestFieldDesktop` дополнительно принимает `renderDropdown`,
`renderDropdownList`, `renderDropdownListItem`.

### Опция (`ISuggestFieldOption`)

`id` (уникальный; по нему сравнивается с `value` и строится ключ списка), `label` (текст в
поле ввода и в списке), `content` (кастомная разметка опции в списке вместо `label`),
`showNotificationIcon` (значок новых уведомлений).

Тип опции расширяется дженериком: `<SuggestField<IMyOption> ...>` протаскивает `IMyOption`
в `value`, `options` и `onSelect`.

### `SuggestField.Input`

Статическое поле — это `FormFieldInput`. Нужно, чтобы потребитель собирал собственный
`renderInput` из того же компонента: `renderInput={(props) => <SuggestField.Input {...props} />}`.

### Поведение десктопного варианта

| Действие | Что происходит |
|---|---|
| Фокус / mousedown по полю | Список открывается, если `options` не пуст |
| Появились опции, пока поле в фокусе | Список открывается автоматически |
| `options` стал пустым | Список закрывается |
| Ввод текста | `onFilter(value)`, сброс `aria-activedescendant`, список снова разрешён к автооткрытию |
| `Escape` при открытом списке | Список закрывается, всплытие останавливается, автооткрытие подавлено до следующего ввода или mousedown |
| Выбор опции | `onSelect(option)`, в поле подставляется `label`, автооткрытие подавлено |
| Blur с непустым полем | В поле возвращается `label` текущего `value` |
| Blur с пустым полем и заданным `value` | `onSelect(undefined)` |
| Клик по кнопке очистки | `onSelect(undefined)` (если было значение), `onFilter("")` (если поле не пустое), затем `onClear(event)` |

`inputProps.onFocus` / `onBlur` / `onKeyDown` / `onMouseDown` / `onChange` вызываются
**после** внутренних обработчиков — подменить их через `inputProps` нельзя. С остальными
свойствами наоборот: `value`, `placeholder`, `data-test-id` из `inputProps` спредятся после
внутренних значений и перекрывают их.

### Поведение мобильного варианта

Поле-триггер — `readOnly`, по фокусу открывается полноэкранный `Dropdown` с собственным полем
ввода (автофокус). При `tooltipOpen` вместо списка показывается `SuggestFieldMobileDropdownHint`
с текстом `tooltipHint`. Закрытие дропдауна с пустым полем ввода и заданным `value` вызывает
`onSelect(undefined)`; закрытие сразу после выбора опции значение не сбрасывает. После закрытия
поле-триггер скроллится в центр экрана (в iOS открытие дропдауна уводит страницу вверх).

---

## Дизайн-токены

Собственных токенов нет. Единственный стиль компонента — `styles/SuggestFieldMobile.module.less` —
задаёт высоту тела мобильного дропдауна и отступ подсказки фиксированными значениями. Внешний вид
целиком определяют `FormField` / `TextField`, `Dropdown`, `Tooltip` и `Loader` — их токены
переопределяются через `ThemeProvider` в соответствующих AI.md.

---

## Инварианты

- **`forwardRef` на публичных компонентах семейства нет.** `SuggestField`, `SuggestFieldDesktop`
  и `SuggestFieldMobile` — обычные дженерик-функции: внутренний `ref` занят корневым
  `TextFieldBase`, и он же служит `targetRef` для `Dropdown` и `Tooltip`. `forwardRef` есть
  только у `SuggestFieldMobileDropdown`. Добавление `forwardRef` остальным — изменение
  публичного API, решение мейнтейнера. По той же причине `SuggestFieldMobileDropdown` намеренно
  оставлен без `displayName`: в React DevTools он виден как `ForwardRef(SuggestFieldMobileDropdownBase)`,
  и переименование наблюдаемо для потребителя.
- `SuggestField` — `Object.assign(SuggestFieldBase, { Input: FormFieldInput })`. Дженерик
  сохраняется только у самой функции; `SuggestField.Input` — часть публичного API.
- **Мобильная ветка получает не все props.** `SuggestField.tsx` передаёт в `SuggestFieldMobile`
  явный whitelist, тогда как в `SuggestFieldDesktop` уходит `{...props}`. На мобильной ширине
  до поля не доходят `className`, `id`, `data-test-id`, `active` и `renderInput`. Расширение
  списка меняет наблюдаемое поведение — только по решению мейнтейнера.
- **`onClear` на мобильном варианте работает иначе:** обработчик вешается на `FormFieldClear`
  напрямую, без сброса `value` и фильтра, которые делает десктоп. Выравнивание — изменение
  поведения, а не рефакторинг.
- Видимость десктопного списка синхронизируется **во время рендера** (`if (inputFocused) {...}`),
  а не в `useEffect`. Так требует правило `react-hooks/set-state-in-effect`; возврат к эффекту
  вернёт и ошибку линтера, и лишний кадр рендера.
- **`options` — жёсткий инвариант, рантайм-подстраховки нет.** Оба дропдауна делают `options.map`
  без `?.`: prop обязателен по типу, а родитель ещё до рендера списка читает `options.length`, так
  что `undefined` упал бы всё равно выше. JS-потребитель без типов, передавший `options={undefined}`,
  получит TypeError, а не пустой список — это сознательное решение, а не упущение.
- `id` выпадающего списка генерируется через `uniqueId()` из `lodash-es`, а не `React.useId` —
  ветка `release-0` собирается на React 17.
- Ширина выпадающего списка жёстко `EDropdownWidth.TARGET` — список всегда по ширине поля.
- Выбор клавиатурой — **только `Enter`**: `keyCodesForSelection={[EVENT_KEY_CODES.ENTER]}`
  сужает дефолт `DropdownListItem` (`Space` + `Enter`), иначе пробел в поисковом запросе
  выбирал бы опцию вместо ввода пробела.
- `mousedown` по выпадающему списку отменяется (`preventDefault`) — иначе поле ввода потеряло бы
  фокус до того, как отработает выбор опции.
- Суффиксы `data-test-id` берутся из `DataTestId` и используются в e2e — не менять:
  поле ввода `{dataTestId}__input`, выпадающий список `{dataTestId}__dropdown`, элемент списка
  `{dataTestId}__dropdown__item`, тело подсказки `{dataTestId}__tooltip`. Все они появляются,
  только если потребитель передал `data-test-id`.
- Кастомный `renderDropdownListItem` **не получит ref**: тип рендер-функции — обычная функция,
  а `DropdownList` клонирует детей и вешает на них ref для клавиатурной навигации. React напишет
  предупреждение, стрелочная навигация по такому списку работать не будет.

---

## Accessibility

Поле ввода — `role="combobox"` с `aria-autocomplete="list"`. Компонент сам проставляет:

- `aria-expanded` — открыт ли список. Считается как `dropdownOpen && options.length !== 0`,
  поэтому при пустом `options` остаётся `false`, даже если внутреннее состояние «открыто».
- `aria-controls` — `id` выпадающего списка, общий с `DropdownList`.
- `aria-activedescendant` — `id` опции, выделенной стрелками. Значение приходит из
  `DropdownListContext`, который `SuggestFieldDesktop` предоставляет, а `DropdownList` заполняет.
  Сбрасывается при вводе текста и при закрытии списка.

Клавиатура: `ArrowUp` / `ArrowDown` — перемещение по списку (`DropdownList`), `Enter` — выбор
опции, `Escape` — закрытие списка со `stopPropagation`, чтобы событие не закрыло ещё и модальное
окно вокруг. `Escape` при закрытом списке всплывает наверх.

Подсказка (`tooltipHint`) рендерится в `Tooltip` и на десктопе показывается только пока поле
в фокусе и `status !== EFormFieldStatus.DISABLED`. Текст подсказки, `label` и `placeholder`
передаёт потребитель — библиотека мультиязычная и строк не хардкодит.

Мобильный вариант: поле-триггер `readOnly` с тем же `role="combobox"` и `aria-expanded`;
список внутри дропдауна — `role="listbox"` с опциями `role="option"` и `aria-selected`.

---

## Связанные компоненты

- `Suggest` — headless-основа той же задачи: состояние и контекст без разметки. `SuggestField`
  на него **не переведён** и держит собственную реализацию состояния (в `SuggestField.tsx`
  стоит `TODO: Переписать через useSuggest`).
- `SelectField` — та же задача с другим компромиссом: список фиксированный, ввода и фильтрации
  нет. Сюда же примыкают `MultiselectField` и `SelectExtendedField` — все трое ссылаются на
  `SuggestField` со своей стороны.
- `TextField` — `ISuggestFieldProps` наследует его props (`Omit<ITextFieldProps, "onSelect">`),
  а разметку поля даёт общий `TextFieldBase`.
- `FormField` — источник `FormFieldInput` (поле ввода и `SuggestField.Input`), `FormFieldClear`
  (кнопка очистки) и статусов `EFormFieldStatus`.
- `Dropdown` — выпадающий список: `DropdownDesktop` + `DropdownList` + `DropdownListItem` на
  десктопе, `DropdownMobile*` в полноэкранном мобильном варианте. `ISuggestFieldDesktopDropdownProps`
  наследует `IDropdownDesktopProps`.
- `Tooltip` — подсказка `tooltipHint` у десктопного поля. В `related` не вынесен: односторонний
  контракт по рендеру, а ориентир 2–5 имён уже выбран более полезными адресатами.
- `MobileView` — переключает десктопный и мобильный варианты по ширине экрана. В `related` не
  вынесен по той же причине.
- `SuggestFieldDesktop` / `SuggestFieldMobile` — платформенные варианты, экспортируются из barrel
  и принимают те же props. Отдельных AI.md не имеют: их поведение описано выше. Бери их напрямую,
  только если адаптивное переключение `MobileView` не нужно.
- `SuggestFieldDesktopDropdown`, `SuggestFieldMobileDropdown`, `SuggestFieldMobileDropdownHint` —
  внутренние части композиции. Экспортируются из barrel, чтобы их можно было переиспользовать
  в `renderDropdown`, собственных AI.md не имеют.

---

## Stories

Основные истории: `stories/SuggestField/SuggestField.stories.tsx`
Файлы примеров: `stories/SuggestField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `size`, `status`, `label`, `placeholder`, `tooltipHint`, `loading`, `dropdownListLoading`, `clearInputOnFocus` и наличия префикса / постфикса / описания |
| `Default` | `DefaultExample.tsx` | Базовая связка: фильтрация `options` по вводу и `tooltipOpen` при пустом результате |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `Statuses` | `StatusesExample.tsx` | Все значения `EFormFieldStatus`: default, disabled, error, warning |
| `Loading` | `LoadingExample.tsx` | Лоадер в постфиксе поля при `loading` |
| `Production` | `ProductionExample.tsx` | Боевая композиция: `HelpBox` в постфиксе, подсказка со ссылкой |
| `CustomOptions` | `CustomOptionsExample.tsx` | Опции с `content`: иконка, название и категория в строке списка |
| `Async` | `AsyncExample.tsx` | Асинхронный поиск: debounce, `loading`, постраничная догрузка по `onScrollEnd` и `dropdownListLoading` |
| `VisualTests` | `DefaultExample.tsx` | Скриншот-регрессия: рендерит `DefaultExample`, а `play` открывает выпадающий список кликом по полю |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-23 | Создан документ |
