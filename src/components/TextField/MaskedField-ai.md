---
component: MaskedField
category: TextFields
related: [TextField, FormField, FormFieldMaskedInput, FormGroup, DateField, MonthYearField]
tokens: []
stories: stories/MaskedField/MaskedField.stories.tsx
version: "1.0"
---

# MaskedField

## Назначение

Компонент однострочного ввода по маске — то же поле, что `TextField`, но вместо обычного input внутри используется `FormFieldMaskedInput`: ввод форматируется на лету (телефон, дата, номер карты, ИНН, СНИЛС и другие пресеты), а незаполненная часть маски подсказывается пользователю. Композиция над семейством `FormField` (`FormGroup` → `FormField` → `FormFieldMaskedInput` + `FormFieldLabel`/`FormFieldPrefix`/`FormFieldPostfix`/`FormFieldDescription`/`FormFieldCounter`).

Используй когда: значение имеет фиксированный формат, и его нужно форматировать во время ввода — номер телефона, дата, номер счёта/карты, ИНН/КПП/БИК, СНИЛС, паспортные данные, идентификаторы ЖКУ. Готовые маски лежат в `FormFieldMaskedInput.presets.masks`, подсказки формата — в `FormFieldMaskedInput.presets.placeholderMasks`.

Не используй когда: формат произвольный (`TextField`), нужен календарный выбор даты (`DateField`) или месяца (`MonthYearField`), нужна денежная сумма с разрядами (`AmountField`), многострочный ввод (`TextareaField`) или выбор из подсказок (`SuggestField`).

---

## Варианты и props

`MaskedField` — тонкая обёртка без собственного state: `maskedInputProps` уходит в `FormFieldMaskedInput`, остальные props — в `TextFieldBase` (и далее в `FormField`). Вся логика маски живёт в `FormFieldMaskedInput` (на базе `react-text-mask`).

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `maskedInputProps` | `IFormFieldMaskedInputProps & { ref? }` | Свойства поля с маской. Обязательные внутри: `mask` (массив строк и регулярных выражений) и `value` (строка, поле контролируемое). Опционально: `placeholderMask` (текстовая подсказка формата, например `дд.мм.гггг`), `placeholderChar` (символ-заполнитель, по умолчанию `"0"`), `forwardedRef` (ссылка на input), `onChange` и остальные атрибуты `<input>`. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `LG` | Размер поля: SM / MD / LG. |
| `status` | `EFormFieldStatus` | `DEFAULT` | Статус: default / error / warning / disabled. `DISABLED` автоматически ставит `disabled` на input. |
| `active` | `boolean` | `false` | Принудительно активное (focused) визуальное состояние рамки. |
| `label` | `ReactNode` | — | Плавающий лейбл; связывается с input через `htmlFor`. |
| `prefix` | `ReactNode` | — | Контент слева от input, рендерится в `FormFieldPrefix`. |
| `postfix` | `ReactNode` | — | Контент справа от input (`FormFieldClear`, `HelpBox`, иконка), рендерится в `FormFieldPostfix`. |
| `description` | `ReactNode` | — | Описание под полем (`FormFieldDescription`); цвет наследует статус. |
| `counter` | `ReactNode` | — | Счётчик символов справа под полем (`FormFieldCounter`). Блок описания рендерится, если задан `description` ИЛИ `counter`. |

Остальные неперечисленные props (`className`, data-атрибуты, div-атрибуты) пробрасываются на корневой `FormField` (div).

### Особенности поведения

- **Значение всегда контролируемое.** `maskedInputProps.value` пропускается через `conformToMask`, поэтому в `onChange` приходит уже отформатированное значение (`"12.12."` после ввода четырёх цифр даты). Хранить в state можно как форматированное, так и «сырое» значение — маска применяется к обоим.
- **`onChange` вызывается только при реальном изменении** отформатированного значения: повторное событие с тем же значением игнорируется.
- **Подсказка маски** (`placeholderMask` или заполнение символом `placeholderChar`) рисуется отдельным `aria-hidden` слоем поверх поля и показывается, только когда поле в фокусе или заполнено. Если задан обычный `placeholder`, у пустого поля показывается он, а не маска.
- **Пресеты масок для телефона и SWIFT обрабатываются особо:** телефон нормализует вставку номера с `7`/`8`/`+7` в начале, SWIFT-код приводится к верхнему регистру.
- Ограничение длины задаёт сама маска — `maxLength` не нужен; `counter`, если он нужен, считает потребитель.
- Кнопка очистки не встроена — передаётся потребителем как `postfix={<FormFieldClear onClick={...} />}`.

---

## Дизайн-токены

Собственных CSS-токенов и стилей у `MaskedField` нет — поэтому `tokens` во frontmatter пустой. Внешний вид наследуется от семейства `FormField`; слой подсказки маски рисует `FormFieldMaskedInput` своим токеном `--triplex-next-FormField-Placeholder_Color`.

---

## Инварианты

- `forwardRef` на `MaskedField` — не убирать. Внешний `ref` указывает на корневой `<div>` `FormField`.
- Публичный API (`IMaskedFieldProps`: `maskedInputProps` + `label`/`prefix`/`postfix`/`description`/`counter` + унаследованные `size`/`status`/`active`) — изменение имён/типов/значений enum — breaking change.
- Barrel `index.ts` экспортирует `TextField` и `MaskedField` — состав экспортов не менять. `TextFieldBase` намеренно НЕ экспортируется — приватная база.
- Ссылка на элемент input передаётся только через `maskedInputProps.forwardedRef`. Объявленный в типе `maskedInputProps.ref` попадает на корневой `<div>` обёртки `FormFieldMaskedInput`, а не на input (тип проходит по структурной совместимости `HTMLInputElement` с `HTMLDivElement`). Исправление типа — breaking change, требует отдельной задачи.
- `maskedInputProps.value` обязателен: `FormFieldMaskedInput` — контролируемый компонент, `defaultValue` внутри зафиксирован пустой строкой (обход бага `react-text-mask`).
- Маски и подсказки берутся из `FormFieldMaskedInput.presets` — состав пресетов и их значения часть публичного API.
- Уникальный `id` для связки label↔input генерируется через `lodash uniqueId` в `FormFieldInput` — не заменять на `useId` (React 17 совместимость через release-0).

---

## Accessibility

- Лейбл — настоящий `<label htmlFor>`, связанный с `id` инпута (id генерируется автоматически или берётся из `maskedInputProps.id`).
- Слой подсказки маски помечен `aria-hidden="true"` и не читается скринридером — формат ввода дополнительно стоит объяснить в `description` или `placeholder`.
- `status={EFormFieldStatus.DISABLED}` выставляет нативный атрибут `disabled` на input — поле штатно выпадает из таб-обхода.
- Семантика ошибки (`aria-invalid`, `aria-describedby`) не хардкодится — при необходимости потребитель передаёт атрибуты через `maskedInputProps`.
- Собственной клавиатурной логики нет; позицию каретки при вводе и вставке ведёт `react-text-mask`.

---

## Связанные компоненты

- `TextField` — сосед по папке: то же поле, но с обычным `FormFieldInput`. Документируется отдельно.
- `TextFieldBase` (внутренний, не в barrel) — базовая раскладка `FormGroup`/`FormField` + слоты `prefix`/`children`/`label`/`postfix` и блок `description`/`counter`. На нём построены `TextField` и `MaskedField`. Описан в `TextField-ai.md`.
- `FormFieldMaskedInput` — сам элемент ввода с маской и статическим свойством `presets` (`masks`, `placeholderMasks`). Используется напрямую, когда нужна нестандартная композиция поля.
- `FormFieldClear` — кнопка очистки, передаётся в `postfix`.
- `FormGroup` / `FormField` — контейнеры раскладки поля и описания.
- `DateField`, `MonthYearField`, `AmountField`, `SuggestField`, `TextareaField` — специализированные поля той же группы `TextFields`.

---

## Stories

Основные истории: `stories/MaskedField/MaskedField.stories.tsx`
Файлы примеров: `stories/MaskedField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль size / status / label / prefix / postfix / description / counter и выбор маски из пресетов |
| `Default` | `Default.tsx` | Минимальное контролируемое поле с маской телефона |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG с заполненным значением |
| `Statuses` | `Statuses.tsx` | Статусы default / error / warning / disabled с description соответствующего типа |
| `WithPlaceholderMask` | `WithPlaceholderMask.tsx` | Подсказка формата: поле с `placeholderMask` против поля без него |
| `PassRefToInput` | `PassRefToInput.tsx` | Проброс ref на input через `maskedInputProps.forwardedRef` |
| `AllMasks` | `AllMasks.tsx` | Все пресеты масок `FormFieldMaskedInput.presets.masks` с подписями |
| `Production` | `Production.tsx` | Production-композиция (`Example: production`): телефон, кнопка очистки и `HelpBox` в постфиксе, description со ссылкой |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: фокус с подсказкой маски (через `play`), частично заполненная маска, заполненные размеры, prefix/postfix, description/counter, статусы |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-07 | Создан документ (TRI-56). AI-рефакторинг MaskedField, unit-тесты, миграция stories на modern pattern |
