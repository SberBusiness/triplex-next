---
component: TextareaField
category: TextFields
related: [TextField, MaskedField, FormField, FormGroup, DateField, MonthYearField]
tokens: []
stories: stories/TextareaField/TextareaField.stories.tsx
version: "1.0"
---

# TextareaField

## Назначение

Компонент многострочного текстового ввода — то же поле, что `TextField`, но вместо `<input>` внутри используется `FormFieldTextarea` (`<textarea>`): плавающий лейбл, префикс/постфикс, описание и счётчик символов в одном компоненте. Композиция над семейством `FormField` (`FormGroup` → `FormField` → `FormFieldTextarea` + `FormFieldLabel`/`FormFieldPrefix`/`FormFieldPostfix`/`FormFieldDescription`/`FormFieldCounter`).

Используй когда: значение — свободный текст, который может занимать несколько строк: комментарий, назначение платежа, описание, обращение в поддержку. Обычно вместе с лимитом длины (`textareaProps.maxLength`) и счётчиком в `counter`.

Не используй когда: значение однострочное (`TextField`), имеет фиксированный формат (`MaskedField`), это денежная сумма (`AmountField`), дата (`DateField`) или месяц (`MonthYearField`), нужен выбор из подсказок (`SuggestField`).

---

## Варианты и props

`TextareaField` — тонкая обёртка без собственного state: `textareaProps` уходит в `FormFieldTextarea`, остальные props — в `TextFieldBase` (и далее в `FormField`). Логика поля (генерация `id`, отслеживание фокуса и заполненности, реакция на автозаполнение) живёт в `FormFieldTextarea`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `textareaProps` | `IFormFieldTextareaProps & DataAttributes & React.RefAttributes<HTMLTextAreaElement>` | Свойства `<textarea>`: стандартные атрибуты, **кроме `disabled`** (`value`, `onChange`, `placeholder`, `maxLength`, `rows`, `name`, `required`…), data-атрибуты и `ref` на сам элемент `<textarea>`. Блокировка задаётся через `status={EFormFieldStatus.DISABLED}`, см. «Особенности поведения». Может быть пустым объектом. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `LG` | Размер поля: SM / MD / LG. Задаёт шрифт, отступы и `min-height` области ввода. |
| `status` | `EFormFieldStatus` | `DEFAULT` | Статус: default / error / warning / disabled. `DISABLED` автоматически ставит `disabled` на `<textarea>`. |
| `active` | `boolean` | `false` | Принудительно активное (focused) визуальное состояние рамки. |
| `label` | `ReactNode` | — | Плавающий лейбл; связывается с `<textarea>` через `htmlFor`. |
| `prefix` | `ReactNode` | — | Контент слева от поля, рендерится в `FormFieldPrefix`. |
| `postfix` | `ReactNode` | — | Контент справа от поля (`FormFieldClear`, `HelpBox`, иконка), рендерится в `FormFieldPostfix`. |
| `description` | `ReactNode` | — | Описание под полем (`FormFieldDescription`). |
| `counter` | `ReactNode` | — | Счётчик символов справа под полем (`FormFieldCounter`). Блок описания рендерится, если задан `description` ИЛИ `counter`. |

Остальные неперечисленные props (`className`, data-атрибуты, div-атрибуты) пробрасываются на корневой `FormField` (div).

### Особенности поведения

- **Поле не растёт по содержимому.** У `<textarea>` выставлен `resize: none`, автоувеличения высоты нет — размер области ввода задаёт только `size` (`min-height` 64px для SM, 60px для MD и LG). Увеличить высоту можно через `textareaProps.rows`; уменьшить — только своим классом на `textareaProps.className`, переопределив `min-height` с достаточной специфичностью (правило задано селектором `.formFieldTextarea.lg`).
- **`disabled` задаётся только через `status`.** `FormFieldTextarea` выставляет `disabled={status === EFormFieldStatus.DISABLED}` после спреда остальных props, поэтому передать `disabled` в `textareaProps` нельзя — атрибут исключён из `IFormFieldTextareaProps` через `Omit`, и попытка его передать будет ошибкой компиляции. Для блокировки поля используй `status={EFormFieldStatus.DISABLED}`.
- **`placeholder` виден только в активном состоянии.** Пока поле не активно (нет фокуса и не передан `active`), плейсхолдер скрыт (`opacity: 0`) — его место занимает опущенный `label`. Когда поле становится активным, лейбл уезжает наверх и плейсхолдер проявляется. Поэтому плейсхолдер не заменяет лейбл: если `label` не задан, у пустого неактивного поля не будет видимой подписи.
- **Поле работает и контролируемым, и неконтролируемым.** Состояние «заполнено» (от него зависит положение лейбла) синхронизируется на маунте из `value ?? defaultValue`, далее — из `value` для контролируемого поля и из событий `change`/`focus`/`blur` для неконтролируемого.
- **Автозаполнение браузером отслеживается** через CSS-хуки `animationstart` (`autofill-applied-hook` / `autofill-cancelled-hook`), поэтому лейбл поднимается и при подстановке значения браузером. Свой `textareaProps.onAnimationStart` при этом вызывается.
- **Счётчик не встроен**: `maxLength` передаётся в `textareaProps`, а текст счётчика (`{value.length}/{maxLength}`) считает и рендерит потребитель в `counter`.
- Кнопка очистки не встроена — передаётся потребителем как `postfix={<FormFieldClear onClick={...} />}`. Блок постфикса позиционируется по центру поля по вертикали (`top: 50%` + `translateY(-50%)` в `FormFieldPostfix`), что для многострочного поля обычно не то, что нужно: чтобы прижать содержимое к верху, оберни его в div с `alignSelf: "flex-start"` и отрицательным `marginTop`, зависящим от `size` (см. `ProductionExample.tsx` и `PlaygroundExample.tsx`).

---

## Дизайн-токены

Собственных CSS-токенов и стилей у `TextareaField` нет — поэтому `tokens` во frontmatter пустой. Внешний вид наследуется от семейства `FormField`; сам `<textarea>` красится токенами `FormField.Input_Color_Default`, `FormField.Input_Color_Disabled` и `FormField.Placeholder_Color`.

---

## Инварианты

- `forwardRef` на `TextareaField` — не убирать. Внешний `ref` указывает на корневой `<div>` `FormField`, ref на сам `<textarea>` передаётся через `textareaProps.ref`.
- Публичный API (`ITextareaFieldProps`: `textareaProps` + `label`/`prefix`/`postfix`/`description`/`counter` + унаследованные от `IFormFieldProps` `size`/`status`/`active`) — изменение имён/типов/значений enum — breaking change.
- `textareaProps` обязателен: у поля нет дефолтных атрибутов ввода. Минимально допустимое значение — пустой объект `{}`.
- Уникальный `id` для связки label↔textarea генерируется в `FormFieldTextarea` через `uniqueId("textarea_")` из `lodash-es` — не заменять на `useId` (React 17 совместимость через `release-0`).
- Высота и отступы области ввода завязаны на `size` через классы `sm`/`md`/`lg` в `FormFieldTextarea.module.less` — эти имена читаются unit-тестом и не переименовываются в одиночку.

---

## Accessibility

- Лейбл — настоящий `<label htmlFor>`, связанный с `id` поля (`id` генерируется автоматически или берётся из `textareaProps.id`).
- `status={EFormFieldStatus.DISABLED}` выставляет нативный атрибут `disabled` — поле штатно выпадает из таб-обхода.
- Семантика ошибки (`aria-invalid`, `aria-describedby` на `description`) не хардкодится — при необходимости потребитель передаёт атрибуты через `textareaProps`.
- Плейсхолдер визуально скрыт до фокуса, но остаётся в DOM и читается скринридером. Смысловую подпись поля задавай через `label`, а не через `placeholder`.
- Собственной клавиатурной логики нет: `Enter` вставляет перенос строки нативно, форма по `Enter` из `<textarea>` не отправляется.
- Кнопке очистки в `postfix` доступное имя задаёт потребитель (`aria-label`) — библиотека мультиязычная и строк не хардкодит.

---

## Связанные компоненты

- `TextFieldBase` (внутренний, не в barrel) — базовая раскладка `FormGroup`/`FormField` + слоты `prefix`/`children`/`label`/`postfix` и блок `description`/`counter`. Описан в `TextField-ai.md`.
- `FormFieldTextarea` — сам элемент `<textarea>` со всей логикой поля. Используется напрямую, когда нужна нестандартная композиция.
- `FormGroup` / `FormField` — контейнеры раскладки поля и описания.
- `FormFieldClear` — кнопка очистки, передаётся в `postfix`.
- `HelpBox` — подсказка в `postfix`.
- `TextField`, `MaskedField`, `AmountField`, `SuggestField`, `DateField`, `MonthYearField` — специализированные поля той же группы `TextFields`.

---

## Stories

Основные истории: `stories/TextareaField/TextareaField.stories.tsx`
Файлы примеров: `stories/TextareaField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль size / status / label / active / textareaProps и переключатели постфикса, описания и счётчика |
| `Default` | `DefaultExample.tsx` | Минимальное контролируемое поле с label и placeholder |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG |
| `Statuses` | `StatusesExample.tsx` | Статусы default / error / warning / disabled |
| `Production` | `ProductionExample.tsx` | Production-композиция (`Example: production`): лимит длины со счётчиком, кнопка очистки и `HelpBox` в постфиксе, description со ссылкой |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-17 | Создан документ (TRI-96). AI-рефакторинг `TextareaField`: проброс `ref` на корневой `<div>` через `forwardRef`, `displayName`, unit-тесты вместо mock-заглушек |
| 2026-09-17 | Ломающее изменение: `disabled` убран из `IFormFieldTextareaProps` (`Omit`), поэтому его больше нельзя передать в `textareaProps` — блокировка только через `status`. Правка по ревью PR #629, зафиксирована в release notes 1.47.0 |
