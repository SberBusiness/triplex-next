---
component: TextField
category: TextFields
related: [MaskedField, FormField, FormGroup, TextareaField, MonthYearField]
tokens: []
stories: stories/TextField/TextField.stories.tsx
version: "1.0"
---

# TextField

## Назначение

Компонент текстового ввода — компактная альтернатива `FormGroup` для однострочного поля: input с плавающим лейблом, префиксом/постфиксом, описанием и счётчиком символов в одном компоненте. Композиция над семейством `FormField` (`FormGroup` → `FormField` → `FormFieldInput` + `FormFieldLabel`/`FormFieldPrefix`/`FormFieldPostfix`/`FormFieldDescription`/`FormFieldCounter`).

Используй когда: нужно однострочное текстовое поле с лейблом, статусом (error/warning/disabled), префиксом/постфиксом или описанием под полем.

Не используй когда: нужен ввод с маской (`MaskedField`), многострочный ввод (`TextareaField`), денежная сумма (`AmountField`), выбор из подсказок (`SuggestField`) или полноформатная форма с раздельными label/field-блоками (`FormGroup` + `FormField` напрямую).

---

## Варианты и props

`TextField` — тонкая обёртка: `inputProps` уходит в `FormFieldInput`, остальные props — в `TextFieldBase` (и далее в `FormField`). Собственного state нет.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `inputProps` | `IFormFieldInputProps & { ref? }` | Свойства input: все стандартные атрибуты `<input>` (`value`, `onChange`, `placeholder`, `maxLength`…), `ref` на `HTMLInputElement`, а также render-prop `render` для подмены инпута (кастомная валидация, маска) с сохранением стилизации. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `LG` | Размер поля: SM / MD / LG. |
| `status` | `EFormFieldStatus` | `DEFAULT` | Статус: default / error / warning / disabled. `DISABLED` автоматически ставит `disabled` на input. |
| `active` | `boolean` | `false` | Принудительно активное (focused) визуальное состояние рамки. |
| `label` | `ReactNode` | — | Плавающий лейбл; связывается с input через `htmlFor`. |
| `prefix` | `ReactNode` | — | Контент слева от input (иконка и т.п.), рендерится в `FormFieldPrefix`. |
| `postfix` | `ReactNode` | — | Контент справа от input (иконка, `FormFieldClear`, `HelpBox`), рендерится в `FormFieldPostfix`. |
| `description` | `ReactNode` | — | Описание под полем (`FormFieldDescription`); цвет наследует статус. |
| `counter` | `ReactNode` | — | Счётчик символов справа под полем (`FormFieldCounter`). Блок описания рендерится, если задан `description` ИЛИ `counter`. |

Остальные неперечисленные props (`className`, data-атрибуты, div-атрибуты) пробрасываются на корневой `FormField` (div).

### Особенности поведения

- Состояние «заполнено» (floating label) вычисляется внутри `FormFieldInput` из `value`/`defaultValue`/событий, включая браузерное автозаполнение (через CSS-анимационные хуки `autofill-*`). Потребителю управлять им не нужно.
- Ограничение длины ввода (для связки с `counter`) — на стороне потребителя: `inputProps.maxLength` или контролируемый `onChange`.
- Кнопка очистки не встроена — передаётся потребителем как `postfix={<FormFieldClear onClick={...} />}`.

---

## Дизайн-токены

Собственных CSS-токенов и стилей нет. Внешний вид полностью наследуется от семейства `FormField` (токены `--triplex-next-FormField-*` описаны в стилях `src/components/FormField/styles/`).

---

## Инварианты

- `forwardRef` на `TextField` и `TextFieldBase` — не убирать. Внешний `ref` указывает на корневой `<div>` `FormField`; ref на сам input — только через `inputProps.ref`.
- Публичный API (`ITextFieldProps`: `inputProps` + `label`/`prefix`/`postfix`/`description`/`counter` + унаследованные `size`/`status`/`active`) — изменение имён/типов/значений enum — breaking change.
- Barrel `index.ts` экспортирует `TextField` и `MaskedField` — состав экспортов не менять. `TextFieldBase` намеренно НЕ экспортируется — приватная база.
- Известное ограничение контракта: `inputProps.ref` типизирован как `React.RefObject<HTMLInputElement>` (не `React.Ref`), callback-ref формально не проходит по типам. Исправление — breaking change, требует отдельной задачи.
- Уникальный `id` для связки label↔input генерируется через `lodash uniqueId` в `FormFieldInput` — не заменять на `useId` (React 17 совместимость через release-0).
- `description || counter` рендерятся в общем блоке `FormFieldDescription` — не разносить по отдельным блокам (изменит DOM и скриншоты).

---

## Accessibility

- Лейбл — настоящий `<label htmlFor>` связанный с `id` инпута (id генерируется автоматически или берётся из `inputProps.id`).
- `status={EFormFieldStatus.DISABLED}` выставляет нативный атрибут `disabled` на input — поле выпадает из таб-обхода штатно.
- Семантика ошибки (`aria-invalid`, `aria-describedby` на description) не хардкодится — при необходимости потребитель передаёт атрибуты через `inputProps`.
- Специальной клавиатурной логики нет — стандартное поведение `<input>`.

---

## Связанные компоненты

- `TextFieldBase` (внутренний, не в barrel) — базовая раскладка `FormGroup`/`FormField` + слоты `prefix`/`children`/`label`/`postfix` и блок `description`/`counter`. На нём построены `TextField` и `MaskedField`. Описан здесь, отдельного AI.md не имеет.
- `MaskedField` — сосед по папке: то же самое, но с `FormFieldMaskedInput` (ввод по маске) через prop `maskedInputProps`. Документируется отдельно.
- `FormField` / `FormFieldInput` и слоты семейства — низкоуровневые строительные блоки; используются напрямую, когда нужна нестандартная композиция.
- `FormGroup` — контейнер вертикальной раскладки поля и описания.
- `FormFieldClear` — кнопка очистки, передаётся в `postfix`.
- `TextareaField`, `AmountField`, `SuggestField`, `DateField`, `MonthYearField` — специализированные поля той же группы `TextFields`.

---

## Stories

Основные истории: `stories/TextField/TextField.stories.tsx`
Файлы примеров: `stories/TextField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль size / status / label / prefix / postfix / description / counter |
| `Default` | `Default.tsx` | Минимальное контролируемое поле с label и placeholder |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG |
| `Statuses` | `Statuses.tsx` | Статусы default / error / warning / disabled с description соответствующего типа |
| `WithPrefixAndPostfix` | `WithPrefixAndPostfix.tsx` | Иконки в префиксе и постфиксе |
| `WithClearButton` | `WithClearButton.tsx` | Кнопка очистки `FormFieldClear` в постфиксе |
| `WithCounter` | `WithCounter.tsx` | Описание и счётчик символов под полем |
| `PassRefToInput` | `PassRefToInput.tsx` | Проброс ref на input через `inputProps.ref` |
| `Production` | `Production.tsx` | Production-композиция (`Example: production`): `HelpBox` в постфиксе, description со ссылкой, лимит длины со счётчиком, кнопка очистки |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: фокус (через `play`), заполненные размеры, prefix/postfix, description/counter, статусы |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-27 | Создан документ (TRI-5). AI-рефакторинг TextField/TextFieldBase, unit-тесты, миграция stories на modern pattern |
