---
component: SMSField
category: TextFields
related: []
tokens:
  - FormField.Input_Color_Disabled
  - SMSField.Refresh_Disabled
  - SMSField.Refresh_Fill_Empty
  - SMSField.Refresh_Fill_Full
  - SMSField.Submit_Background_Active
  - SMSField.Submit_Background_Default
  - SMSField.Submit_Background_Hover
  - Typography.Error_Color
stories: stories/SMSField/SMSField.stories.tsx
version: "1.0"
---

# SMSField

## Назначение

Управляемое поле ввода СМС-кода с кнопками повторного запроса и отправки. Корневой компонент хранит контекст для составных частей `SMSField.Input`, `SMSField.Refresh`, `SMSField.Submit` и `SMSField.Tooltip`; значение кода и обратный отсчёт хранит потребитель.

Используй когда: нужен ввод цифрового кода подтверждения с повторным запросом и отправкой кнопкой или клавишей Enter.

Не используй когда: нужен произвольный текст (`TextField`), форматирование по маске (`MaskedField`) или выбор значения из подсказок (`SuggestField`). SMSField не выполняет запрос к серверу и не проверяет правильность кода.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `code` | `string` | Текущее значение кода. Для пустого поля передавай `""`; обновляй значение в ответ на `onChangeCode`. |
| `onChangeCode` | callback | Получает новое значение при допустимом вводе в `SMSField.Input`: строку из цифр `0–9` или пустую строку. |
| `onSubmitCode` | callback | Получает текущий `code` при нажатии доступной `SMSField.Submit` или Enter в `SMSField.Input`. |
| `size` | `EComponentSize` | Общий размер поля и кнопок: SM / MD / LG. Дефолта у корневого компонента нет. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `status` | `EFormFieldStatus` без `WARNING` | `DEFAULT` | `DEFAULT`, `ERROR` или `DISABLED`. Ошибка сохраняет возможность ввода, disabled блокирует поле и обе кнопки. |
| `children` | `ReactNode` | — | Составные части поля; корень не добавляет Input, Refresh, Submit или Tooltip автоматически. |
| `className` | `string` | — | Добавляется на корневой `div`. |

Остальные HTML-атрибуты `div`, обработчики и `data-test-id` передаются корневому контейнеру. Атрибуты поля ввода (`id`, `aria-label`, `placeholder`, `maxLength` и другие) задаются на `SMSField.Input`.

### Составные части

- `SMSField.Input` (`SMSFieldInput`) — ввод на базе `FormFieldInput`. Значение задавай через корневой `code`. По умолчанию `maxLength={8}`, `autoComplete="off"`; при попытке ввода нецифровой строки не вызывает ни `onChangeCode`, ни собственный `onChange`. `description` и `counter` выводятся в общем блоке под полем, счётчик вычисляет потребитель.
- `errorText` у Input заменяет placeholder в статусе `ERROR`, пока поле не в фокусе. В фокусе возвращается обычный placeholder. Текущее значение кода сохраняется; текст ошибки виден как placeholder только у пустого поля. Без `errorText` остаются рамка ошибки и `aria-invalid`.
- `SMSField.Submit` (`SMSFieldSubmit`) — кнопка отправки. Недоступна при пустом `code`, корневом `DISABLED` или собственном `disabled`; при доступном клике вызывает `onSubmitCode(code)`, затем свой `onClick`. Наличие кода включает активный вид кнопки. Полноту и правильность кода компонент не проверяет: непустое значение можно отправить до достижения `maxLength`.
- `SMSField.Refresh` (`SMSFieldRefresh`) — кнопка повторного запроса. Требует `countdownTime`, `countdownTimeLeft` и `onRefresh`; недоступна при корневом `DISABLED`, собственном `disabled` или `countdownTimeLeft > 0`. При доступном клике вызывает `onRefresh()`, затем свой `onClick`. Таймер, очистку кода и сетевой запрос реализует потребитель. Радиальное заполнение иконки отображает долю прошедшего времени.
- `SMSField.Tooltip` (`SMSFieldTooltip`) — обёртка над одним React-элементом с обязательными `message` и `targetRef`. Для обычной композиции используй тот же ref на `SMSField.Refresh` и в `targetRef`. Размер SM, выравнивание START, hover-переключение и отключение адаптивного режима заданы как настройки по умолчанию и могут переопределяться props Tooltip.

### Синхронизация и ограничения

- Корень передаёт `code`, callbacks, `size` и `status` составным частям через `SMSFieldContext`. Собственного состояния кода и таймера у него нет; проверка цифр относится к событиям Input и не нормализует переданный снаружи `code`.
- `disabledSubmit` хранится в корне и изначально равен `true`. `SMSField.Submit` синхронизирует его эффектом со своей доступностью; Input использует это значение для отправки по Enter. Для согласованного поведения Enter размещай Submit внутри того же SMSField.
- `tooltipId` хранится в корневом контексте. Tooltip записывает в него переданный `id`, а при его отсутствии генерирует значение через `lodash-es/uniqueId`; Refresh получает этот идентификатор для `aria-describedby`. Для воспроизводимых визуальных примеров задавай стабильный `id`.
- Статус `WARNING` исключён из публичного типа SMSField. Размер и статус составных частей задаются через корень.

---

## Дизайн-токены

Прямые ссылки общего `styles/SMSField.module.less`:

```text
FormField.Input_Color_Disabled
SMSField.Refresh_Disabled
SMSField.Refresh_Fill_Empty
SMSField.Refresh_Fill_Full
SMSField.Submit_Background_Active
SMSField.Submit_Background_Default
SMSField.Submit_Background_Hover
Typography.Error_Color
```

Токены `SMSField.Refresh_*` управляют заполнением и недоступным видом иконки повторного запроса. `SMSField.Submit_Background_*` управляют заливкой иконки отправки: DEFAULT для неактивного состояния, ACTIVE при наличии кода, HOVER при наведении на доступную активную кнопку. `FormField.Input_Color_Disabled` используется для placeholder недоступного Input, `Typography.Error_Color` — для placeholder с текстом ошибки.

Значения по умолчанию находятся в `src/components/DesignTokens/components/SMSField.ts`, `FormField.ts` и `Typography.ts`. Переопределяй их через `ThemeProvider` (prop `tokens`) — см. [ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md), раздел «Как переопределять токены».

Внешний вид базовых поля, кнопок и подсказки также наследует токены семейств FormField, Button/IconWrapper и Tooltip. Здесь перечислены только прямые ссылки общего LESS SMSField.

---

## Инварианты

- `forwardRef<HTMLDivElement>` на SMSField сохраняется; внешний ref указывает на прежний корневой `div`, а не на input. Ref на поле ввода передаётся в `SMSField.Input`, ref на кнопку повторного запроса — в `SMSField.Refresh`.
- Статические части `SMSField.Input`, `.Refresh`, `.Submit`, `.Tooltip` и отдельные экспорты `SMSFieldInput`, `SMSFieldRefresh`, `SMSFieldSubmit`, `SMSFieldTooltip` из barrel сохраняются. Имена и типы props, значения `EComponentSize` и допустимые значения `EFormFieldStatus` — публичный API.
- Корневой `div` остаётся контейнером с `position: relative` и полной шириной; кнопки позиционируются внутри него. `className`, HTML-атрибуты и `data-tx` относятся к корню.
- Связь через единый `SMSFieldContext`, синхронизация `disabledSubmit` кнопкой Submit и передача `tooltipId` от Tooltip к Refresh определяют поведение композиции; не меняй их независимо друг от друга.
- Сохраняй фильтрацию ввода, порядок callbacks и текущую передачу `code` при отправке. Enter сейчас определяется по `keyCode` через `EVENT_KEY_CODES.ENTER`; замена клавиатурного контракта требует проверки поведения.
- Имена дизайн-токенов, LESS-классы и существующие story IDs `components-smsfield--*` нельзя переименовывать без согласования и синхронизации тестов. Цвета берутся из токенов.
- Генерацию tooltip ID через `uniqueId` не заменяй на React 18-only API: библиотека поддерживает React 17 через ветку `release-0`.

---

## Accessibility

- Корневой `div` не имеет собственной роли поля, label или автоматического перевода фокуса. Его ref пригоден для работы с контейнером; для фокуса Input используй ref `SMSField.Input`.
- Доступное имя Input и обеих кнопок-иконок задаёт потребитель: например, `aria-label` или связь через `aria-labelledby`. Placeholder и `description` сами по себе не заменяют доступное имя. Компонент не хардкодит язык подписей.
- Input в `ERROR` выставляет `aria-invalid="true"`, в других статусах атрибут отсутствует. Текст `errorText` отображается как placeholder; автоматического `aria-live` или связи input с текстом ошибки нет. При необходимости связь через `aria-describedby` задаёт потребитель на Input.
- Корневой `DISABLED` выставляет нативный `disabled` на Input, Submit и Refresh: они исключаются из обычного таб-обхода. Локальный `disabled` кнопки действует дополнительно.
- Enter в Input отправляет текущий код только при `disabledSubmit === false`; пользовательский `onKeyDown` Input получает событие после этой обработки. SMSField не вызывает `preventDefault` для Enter. Tab, фокус/blur и активация кнопок сохраняют нативное поведение.
- Refresh получает `aria-describedby={tooltipId}` из контекста. Tooltip связывает подсказку с target через `targetRef` и ID; сам базовый Tooltip не добавляет `role="tooltip"`.

---

## Связанные компоненты

- `SMSFieldInput`, `SMSFieldRefresh`, `SMSFieldSubmit`, `SMSFieldTooltip` — отдельно экспортируемые составные части, доступные также через statics. Корень сам рендерит Provider и `div`; перечисленные ниже зависимости рендерятся составными частями.
- `FormField` — через Input передаёт статус и размер базовому полю; `FormFieldInput`, `FormFieldDescription` и `FormFieldCounter` формируют ввод и нижний блок.
- `FormGroup` — через Input объединяет поле с описанием и счётчиком.
- `ButtonIcon` — база Submit и Refresh; даёт нативный `button`, недоступное состояние и обработчики.
- `Tooltip` — база SMSField.Tooltip; её `targetRef` и дополнительные props определяют размещение и открытие подсказки.
- `RefreshIcon` и `SubmitIcon` — внутренние SVG-компоненты общего семейства; не экспортируются из публичного barrel.
- `TextField`, `MaskedField`, `SuggestField` — поля для других задач ввода, описанных в «Не используй когда».

---

## Stories

Основные истории: `stories/SMSField/SMSField.stories.tsx`
Файлы примеров: `stories/SMSField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Управляемый код, size/status, настройки Input, счётчик и внешний обратный отсчёт; Actions для callbacks. |
| `Default` | `Default.tsx` | Минимальная контролируемая композиция с доступными именами поля и кнопок. |
| `Error` | `Error.tsx` | Пустое поле в ERROR, errorText вне фокуса, все размеры. |
| `Disabled` | `Disabled.tsx` | DISABLED с пустым и заполненным кодом во всех размерах. |
| `Sizes` | `Sizes.tsx` | Пустое поле DEFAULT в размерах SM / MD / LG с подписями. |
| `Example` | `Example.tsx` | Внешний таймер повторного запроса, Tooltip, описание, maxLength и счётчик. |
| `VisualTests` | `VisualTests.tsx` | Заполненные DEFAULT/ERROR во всех размерах, начало и середина обратного отсчёта, описание и счётчик. |
| `VisualTestsFocused` | `VisualTestsFocused.tsx` | Фокус пустого поля DEFAULT через play. |
| `VisualTestsErrorFocused` | `VisualTestsErrorFocused.tsx` | Фокус пустого ERROR: обычный placeholder вместо errorText. |
| `VisualTestsSubmitHovered` | `VisualTestsSubmitHovered.tsx` | Hover доступной активной кнопки отправки при заполненном коде. |
| `VisualTestsRefreshHovered` | `VisualTestsRefreshHovered.tsx` | Hover кнопки повторного запроса с открытой подсказкой в портале и стабильным ID. |

Документационные примеры показываются через `?raw`; Playground и VisualTests не показывают исходный код. Playground, Default и Example исключены из скриншот-тестов: Default дублирует MD в Sizes, а Example с внешним таймером служит интерактивным примером. Остальные восемь stories снимаются на xs/xl; hover stories используют `play` и реальное наведение через `parameters.testRunner.hover` после перемонтирования на каждом viewport. Baseline-файлы создаются в CI, не на локальной macOS.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-05 | Создан документ (TRI-72). Описаны контролируемый код, составные части, контекст и accessibility; добавлен ref на корневой div, stories переведены на modern pattern. |
