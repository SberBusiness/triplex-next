---
component: FormField
category: FormField
related: [FormFieldLabel, FormFieldInput, FormFieldTextarea, FormFieldTarget, FormFieldMaskedInput, FormFieldPrefix, FormFieldPostfix, FormFieldClear, FormFieldDescription, FormFieldCounter, FormGroup, TextField, TextareaField, MaskedField, SelectField, SuggestField, DateField]
tokens:
  - FormField.Background_Default
  - FormField.Background_Hover
  - FormField.Background_Active
  - FormField.Background_Disabled
  - FormField.Background_Error
  - FormField.Background_Error_Hover
  - FormField.Background_Warning
  - FormField.Background_Warning_Hover
  - FormField.Shadow_Default
  - FormField.Shadow_Active
  - FormField.Shadow_Error_Active
  - FormField.Shadow_Warning_Active
  - FormField.Input_Color_Default
  - FormField.Input_Color_Disabled
  - FormField.Label_Color_Default
  - FormField.Label_Color_Disabled
  - FormField.Placeholder_Color
  - FormField.Target_Color_Default
  - FormField.Target_Color_Disabled
  - FormField.Target_PlaceholderColor_Default
stories: stories/FormField/FormField.stories.tsx
version: "1.0"
---

# FormField

## Назначение

Низкоуровневый контейнер поля ввода: рисует фон, скругление, обводку и состояния (default / error / warning / disabled, активное и заполненное), а также раздаёт вложенным субкомпонентам общий контекст (`FormFieldContext`) — размер, статус, фокус, заполненность, идентификаторы элемента ввода и лейбла, ширины префикса и постфикса.

Используй когда: собираешь поле из частей вручную — `FormFieldLabel` + один из элементов ввода (`FormFieldInput` / `FormFieldTextarea` / `FormFieldMaskedInput` / `FormFieldTarget`) + опционально `FormFieldPrefix` / `FormFieldPostfix` / `FormFieldDescription` / `FormFieldCounter`, либо строишь на его основе собственный field-компонент.

Не используй когда: достаточно готовой обёртки — `TextField` (однострочный ввод), `TextareaField` (многострочный), `MaskedField` (маска), `SelectField` / `SuggestField` / `DateField` (выбор значения). `FormGroup` альтернативой не является: это контейнер, внутрь которого кладут само поле вместе с сообщением об ошибке.

---

## Варианты и props

`FormField` — контейнер и провайдер контекста. Собственного «значения» у него нет: состояния `filled` и `focused` вычисляются вложенными элементами ввода и поднимаются в контекст через сеттеры.

### Обязательные props

Обязательных custom-props нет. Практически всегда передаётся `children` — субкомпоненты семейства.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.LG` | Размер поля: `SM` / `MD` / `LG`. Влияет на скругление корневого элемента и через контекст — на размеры лейбла, элемента ввода и плейсхолдера маски. |
| `status` | `EFormFieldStatus` | `EFormFieldStatus.DEFAULT` | Визуальное состояние: `DEFAULT` / `ERROR` / `WARNING` / `DISABLED`. `DISABLED` дополнительно проставляет `disabled` вложенным `input`/`textarea` и `aria-disabled` + `tabIndex={-1}` у `FormFieldTarget`. |
| `active` | `boolean` | `false` | Принудительно активное состояние (например, когда фокус визуально принадлежит связанному dropdown). Итоговая активность = `active \|\| focused`. |

Остальные props — стандартные атрибуты `div` и `data-*`, они пробрасываются на корневой элемент.

### Особенности поведения

- Горизонтальные внутренние отступы корневого `div` задаются инлайн-стилем из ширин префикса и постфикса (`paddingLeft: prefixWidth`, `paddingRight: postfixWidth`). Значение по умолчанию — `TARGET_PADDING_X_DEFAULT` (12px); `FormFieldPrefix` / `FormFieldPostfix` измеряют себя через `ResizeObserver` и обновляют его. Пользовательский `style` мерджится последним и может переопределить отступы.
- Класс `filled` выставляется, когда вложенный элемент ввода сообщил о наличии значения. Для `FormFieldInput` / `FormFieldTextarea` это включает браузерное автозаполнение (ловится через CSS-анимационные хуки `autofill-applied-hook` / `autofill-cancelled-hook`), для `FormFieldTarget` — наличие `children`.
- Кнопка `FormFieldClear` показывается стилями только при `filled` и hover/активном состоянии непустого и не заблокированного поля, а также при собственном фокусе (`:focus`) — чтобы кнопка оставалась видимой при клавиатурной навигации.
- Идентификаторы генерируются субкомпонентами (`uniqueId` из `lodash-es`, не `React.useId` — код должен оставаться совместимым с React 17) и попадают в контекст как `targetId` / `labelId`; на них опирается связка лейбла и поля. `targetId` публикуют только labelable-элементы (`FormFieldInput`, `FormFieldTextarea`, а также `FormFieldMaskedInput` — он рендерит `FormFieldInput` внутри себя через `render`); `FormFieldTarget` его не публикует — см. Accessibility.
- Вне `FormField` субкомпоненты используют `initialFormFieldContext`, где `filled: true` — это осознанный временный фикс для `DropdownMobileHeader`, а сеттеры являются no-op.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/FormField.ts`.

```text
FormField.Background_Default
FormField.Background_Hover
FormField.Background_Active
FormField.Background_Disabled
FormField.Background_Error
FormField.Background_Error_Hover
FormField.Background_Warning
FormField.Background_Warning_Hover
FormField.Shadow_Default
FormField.Shadow_Active
FormField.Shadow_Error_Active
FormField.Shadow_Warning_Active
FormField.Input_Color_Default
FormField.Input_Color_Disabled
FormField.Label_Color_Default
FormField.Label_Color_Disabled
FormField.Placeholder_Color
FormField.Target_Color_Default
FormField.Target_Color_Disabled
FormField.Target_PlaceholderColor_Default
```

---

## Инварианты

- `forwardRef` обязателен, ref ведёт на корневой `div`; корневой элемент менять нельзя.
- `EFormFieldStatus` и его строковые значения (`default` / `disabled` / `error` / `warning`) — публичный API, как и props `size` / `status` / `active`.
- Barrel `src/components/FormField/index.ts` реэкспортирует `enums`, `types`, `components` и сам `FormField` — состав экспортов не сокращать. Маппинг статуса на класс (`STATUS_TO_CLASS_NAME_MAP`) — внутренняя константа модуля и в barrel не входит.
- `FormFieldContext` и `FormFieldDescriptionContext` в barrel не входят: это внутренний механизм семейства, но на нём завязаны все субкомпоненты — менять форму значения контекста без правки субкомпонентов нельзя.
- Классы `formField`, `filled`, `active`, `error`, `warning`, `disabled`, а также `sm` / `md` / `lg` проверяются unit-тестами и используются в вложенных селекторах стилей семейства.
- `disabled` исключён из props элементов ввода (`IFormFieldInputProps`, `IFormFieldTextareaProps`, `IFormFieldMaskedInputProps` — через `Omit`): блокировка задаётся только `status={EFormFieldStatus.DISABLED}`, иначе переданное значение молча перетиралось бы внутренним.
- Генерация id — через `uniqueId` (`lodash-es`), без `React.useId`: ветка `release-0` собирается на React 17.
- `FormFieldDescription` и `FormFieldCounter` объявлены как `React.FC` без `forwardRef` — осознанное историческое отличие от остальных субкомпонентов. Добавление ref расширяет публичный API; решение владельца — оставить как есть.
- Внутренние утилиты семейства (`components/utils.ts` — `isFilled`; `components/useFormFieldAffixWidth.ts`) намеренно не попадают в barrel `components/index.ts`. Общий `setForwardedRef` вынесен в `src/helpers/setForwardedRef.ts` и импортируется относительным путём.
- Компонент не рендерит собственных подписей и текстов — библиотека мультиязычная.

---

## Accessibility

- Корневой элемент — обычный `div` без роли: семантику даёт вложенный нативный `input` / `textarea`.
- Связка лейбла и поля: когда в поле есть labelable-элемент, `FormFieldLabel` рендерит `<label htmlFor={targetId}>`, а элемент ввода — сгенерированный `id`. Поэтому `screen.getByLabelText(...)` находит поле.
- `FormFieldTarget` (нередактируемое значение, например для select-подобных полей) получает `tabIndex={0}`, `aria-labelledby={labelId}` и `aria-disabled`; при `status = DISABLED` — `tabIndex={-1}`.
- `FormFieldTarget` намеренно **не** публикует свой `id` как `targetId`: это `<div>`, а не labelable-элемент, и `label[htmlFor]` на него ссылаться не может. В таких полях `FormFieldLabel` рендерит `<span>`, а не `<label>` — несвязанный `<label>` браузер тоже считает ошибкой разметки. Имя полю даёт `aria-labelledby` на `FormFieldTarget`, поэтому `screen.getByLabelText(...)` продолжает находить поле.
- Следствие выбора тега по контексту: `targetId` публикуется в `useLayoutEffect`, поэтому в полях с labelable-элементом лейбл на первом рендере — `<span>`, а после layout-эффекта DOM-узел заменяется на `<label>`. Замена происходит до отрисовки и визуально незаметна, но ref на `FormFieldLabel` вызывается для обоих узлов.
- При `status = DISABLED` вложенные `input` / `textarea` получают нативный `disabled`, то есть выпадают из таб-порядка. Передать `disabled` мимо статуса нельзя — атрибут исключён из props элементов ввода.
- Плейсхолдер маски в `FormFieldMaskedInput` рендерится с `aria-hidden="true"` — скринридер читает только реальное значение input.
- Текст описания (`FormFieldDescription`) визуально связан с полем, но не связывается автоматически через `aria-describedby` — при необходимости потребитель передаёт `aria-describedby` элементу ввода сам.

---

## Связанные компоненты

- `FormFieldLabel` — плавающий лейбл; поднимается над полем, когда поле заполнено или активно (можно форсировать props `floating`).
- `FormFieldInput` — однострочный ввод; поддерживает render-prop `render` для подмены инпута с сохранением стилизации.
- `FormFieldTextarea` — многострочный ввод. Высота по размеру задана как `min-height`.
- `FormFieldMaskedInput` — маскированный ввод на базе `react-text-mask`; содержит пресеты масок (`FormFieldMaskedInput.presets`).
- `FormFieldTarget` — нередактируемое значение с `placeholder`, используется select-подобными полями.
- `FormFieldPrefix` / `FormFieldPostfix` — контейнеры слева/справа; их измеренная ширина становится внутренним отступом поля. Общая логика измерения и проброса ref вынесена во внутренний хук `components/useFormFieldAffixWidth.ts` (в barrel не экспортируется).
- `FormFieldClear` — кнопка очистки (`ButtonIcon` с иконкой креста), гасит фокус на `mousedown`.
- `FormFieldDescription` — описание под полем; провайдер `FormFieldDescriptionContext`.
- `FormFieldCounter` — счётчик символов внутри описания; сообщает `FormFieldDescription` о своём наличии.
- `TextField`, `TextareaField`, `MaskedField`, `SelectField`, `SuggestField`, `DateField` — компоненты уровнем выше, построенные на этом семействе.
- `FormGroup` — контейнер формы (`div` без собственной логики), объединяющий поле с `HelpBox` / `Alert` / описанием. О `FormField` ничего не знает и на семействе не построен: поле кладут внутрь него.

---

## Stories

Основные истории: `stories/FormField/FormField.stories.tsx`
Файлы примеров: `stories/FormField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `status`, `size`, лейбла, плейсхолдера и описания |
| `Default` | `DefaultExample.tsx` | Минимальная композиция: лейбл + input |
| `WithPrefixAndPostfix` | `WithPrefixAndPostfixExample.tsx` | Контент слева и справа от поля и влияние на отступы |
| `WithClearButton` | `WithClearButtonExample.tsx` | Кнопка очистки значения в постфиксе |
| `WithCounter` | `WithCounterExample.tsx` | Описание со счётчиком символов |
| `States` | `StatesExample.tsx` | Статусы default / error / warning / disabled |
| `Textarea` | `TextareaExample.tsx` | Многострочный ввод |
| `Sizes` | `SizesExample.tsx` | Размеры `SM` / `MD` / `LG` |
| `MaskedInput` | `MaskedInputExample.tsx` | Маскированный ввод и пресеты масок |
| `VisualTests` | `VisualTestsExample.tsx` | Скриншот-регрессия: состояния и размеры на одной странице |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-31 | Создан документ. AI-рефакторинг FormField: JSDoc на props, enum, контекстах и константах, активное состояние вычисляется одним выражением, контекст типизирован `IFormFieldContext`, unit-тесты расширены с 4 до 23 кейсов. Публичный API не изменён. |
| 2026-07-31 | AI-рефакторинг распространён на субкомпоненты `FormFieldInput`, `FormFieldLabel`, `FormFieldPrefix`, `FormFieldPostfix`, `FormFieldClear`, `FormFieldDescription`, `FormFieldCounter`: JSDoc с указанием значений по умолчанию, дедупликация `FormFieldPrefix` / `FormFieldPostfix` через внутренний хук `useFormFieldAffixWidth`, общий `setForwardedRef` в `components/utils.ts`, unit-тесты. Публичный API не изменён. `FormFieldTextarea`, `FormFieldTarget` и `FormFieldMaskedInput` намеренно не затронуты — их покрывают задачи `TextareaField`, `SelectField` и `MaskedField`. |
| 2026-07-31 | Исправлено: `className` у `FormFieldDescription` и `FormFieldCounter` затирал базовый класс — теперь объединяется через `clsx`. Изменение наблюдаемого поведения, зафиксировано в release notes 1.41.0. |
| 2026-08-03 | Ломающее изменение: `statusToClassNameMap` убран из публичного barrel и переименован во внутреннюю константу `STATUS_TO_CLASS_NAME_MAP`. Зафиксировано в release notes 1.41.0. |
| 2026-09-04 | Исправлено: у `FormFieldTextarea` фиксированная `height` для размеров `sm` / `md` / `lg` заменена на `min-height`. |
| 2026-09-09 | Исправлено: значение с кодом страны раскладывалось по маске телефона со сдвигом и теряло последнюю цифру. Нормализация номера вынесена в `normalizePhoneText` и применяется и к внешнему `value`, и к слою с маской |
| 2026-09-16 | Исправлено: `FormFieldTarget` больше не публикует свой `id` как `targetId`, а `FormFieldLabel` рендерит `<span>` вместо `<label>`, когда в поле нет labelable-элемента. Ref `FormFieldLabel` типизирован как `HTMLElement`, props — как `React.HTMLAttributes<HTMLElement>`. Доступное имя по-прежнему даёт `aria-labelledby`. |
| 2026-09-16 | Исправлено: `FormFieldInput` и `FormFieldTextarea` очищают `targetId` при размонтировании — иначе после замены элемента ввода на `FormFieldTarget` лейбл сохранял `htmlFor` с `id` удалённого элемента. |
| 2026-09-17 | Ломающее изменение: `disabled` убран из `IFormFieldTextareaProps` через `Omit` — так же, как он уже был убран у `FormFieldInput` и `FormFieldMaskedInput`. Поведение не менялось (статус перетирал переданное значение и раньше), но передача `disabled` в props теперь ошибка компиляции. Правка по ревью PR #629, зафиксирована в release notes 1.47.0 |
