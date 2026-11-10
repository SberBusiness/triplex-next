---
component: FormFieldDescription
category: FormField
related: [FormField, FormFieldCounter]
tokens: []
stories: stories/FormField/FormField.stories.tsx
version: "1.0"
---

# FormFieldDescription

## Назначение

`FormFieldDescription` размещает подсказку, сообщение об ошибке или счётчик под полем ввода. Импортируй компонент из `@sberbusiness/triplex-next`.

При ручной сборке поля размести описание после `FormField`, например внутри общего `FormGroup`. В готовых `TextField` и `TextareaField` передавай содержимое через `description` и `counter`. `TextFieldBase` создаёт общий блок для переданного содержимого.

---

## Варианты и props

Публичный `IFormFieldDescriptionProps` включает HTML-атрибуты `div`. `children` принимает текст или React-узлы. `className` объединяется с базовым классом и модификатором раскладки. `id`, `aria-*` и остальные атрибуты применяются к корневому `div`.

- Для одного сообщения передай узел с текстом в `children`. Размер и цвет текста задай в нём, например через `size` и `type` у `Text`.
- Для горизонтальной раскладки размести один `FormFieldCounter` прямо в описании рядом с текстом. Счётчик также может быть единственным дочерним элементом.

---

## Дизайн-токены

`FormFieldDescription.module.less` задаёт отступы и горизонтальную раскладку. Оформление текста определяют дочерние компоненты.

---

## Инварианты

- Корневой элемент — `div` с классом `formFieldDescription`. Компонент объявлен как `React.FC`. Поддержка `ref` требует отдельного решения о публичном API, см. [инварианты FormField](FormField-ai.md#инварианты).
- `FormFieldDescriptionContext` относится к внутреннему контракту семейства. Каждый экземпляр описания предоставляет собственный контекст. Счётчик регистрируется у ближайшего провайдера.
- Модификатор `withCounter` включает `display: flex`. Его состояние зависит от регистрации счётчика после монтирования и сбрасывается при размонтировании счётчика.
- В одном описании используй один счётчик. Флаг присутствия общий для всего описания, поэтому при нескольких счётчиках снятие любого из них выключит горизонтальную раскладку.

---

## Accessibility

Для связи описания с полем передай ему уникальный `id`, а `FormFieldInput` или `FormFieldTextarea` — `aria-describedby` с тем же значением. Можно указать `id` у вложенного элемента с подсказкой, если нужно связать с полем только текст внутри общего блока.

В готовом `TextField` передай `id` в узле `description`, а `aria-describedby` в `inputProps`. В `TextareaField` атрибут поля передаётся через `textareaProps`. Семантику ошибки, включая `aria-invalid` и объявление динамического сообщения, задаёт потребитель.

---

## Связанные компоненты

- [FormField](FormField-ai.md) — низкоуровневое поле, под которым размещается описание.
- [FormFieldCounter](FormFieldCounter-ai.md) — дочерний контейнер счётчика, который включает горизонтальную раскладку.

---

## Stories

Основные истории: `stories/FormField/FormField.stories.tsx`
Файлы примеров: `stories/FormField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Настраиваемый текст подсказки под полем. |
| `States` | `StatesExample.tsx` | Подсказки и сообщения для разных состояний поля. |
| `MaskedInput` | `MaskedInputExample.tsx` | Подсказка под полем с маской. |
| `WithCounter` | `WithCounterExample.tsx` | Описание слева и счётчик справа. |
| `Textarea` | `TextareaExample.tsx` | Описание и счётчик под многострочным полем. |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-10 | Создан документ (TRI-195). |
