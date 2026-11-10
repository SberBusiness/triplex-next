---
component: FormFieldClear
category: FormField
related: [FormField, ButtonIcon]
tokens: []
stories: stories/FormField/FormField.stories.tsx
version: "1.0"
---

# FormFieldClear

## Назначение

Кнопка с крестиком для очистки значения поля. При нажатии мышью сохраняет фокус в поле, а очистку выполняет переданный `onClick`.

Используй в `FormFieldPostfix` или в `postfix` готового поля, например `TextField` или `NumberField`. Для других действий с иконкой используй `ButtonIcon`.

Импортируй `FormFieldClear` и тип `IFormFieldClearProps` из `@sberbusiness/triplex-next`.

---

## Варианты и props

### Обязательные props

Тип не требует обязательных props. Для рабочей кнопки передай `onClick` и доступное имя.

### Опциональные props

| Prop | По умолчанию | Описание |
|---|---|---|
| `onClick` | — | Получает событие нажатия. В обработчике обнови значение поля. |
| `onMouseDown` | — | Вызывается с тем же событием после `preventDefault()`. |
| `disabled` | `false` | Блокирует взаимодействие через нативный атрибут кнопки. |
| `type` | `"button"` | Оставь значение по умолчанию для очистки внутри формы. |
| `className` | — | Объединяется с классами кнопки. |
| `...rest` | — | Нативные атрибуты `<button>`, включая `aria-label` и `aria-labelledby`. |

### Видимость

Стили `FormField` показывают кнопку в заполненном поле при наведении или в активном состоянии, если статус поля отличается от `DISABLED`. Активность возникает при фокусе элемента ввода или при `active={true}` у поля. Собственный `:focus` кнопки сохраняет её видимой до потери фокуса. Статус поля управляет этим CSS-условием, а нативную блокировку самой кнопки задаёт её `disabled`.

---

## Дизайн-токены

В `FormFieldClear.module.less` заданы только видимость, переход и обработка указателя. Фокусную обводку задаёт `ButtonIcon` через `Button.Icon_Shadow_Focus`, см. [ButtonIcon](../Button/ButtonIcon-ai.md#дизайн-токены).

---

## Инварианты

- Публичный экспорт из семейства `FormField` и `forwardRef<HTMLButtonElement>` сохраняются. `ref`, `className` и атрибуты относятся к `<button>` внутри обёртки `ButtonIcon`.
- Содержимое кнопки задаёт `CrossStrokeSrvIcon16`. Prop `children` исключён из публичного типа.
- Отмена действия `mousedown` происходит перед вызовом переданного `onMouseDown`. Всплытие событий остаётся нативным, а `onClick` вызывается обычным способом.
- `FormField.module.less` использует класс `formFieldClear` для видимости в заполненном поле.

---

## Accessibility

- Передай локализованное доступное имя, например `aria-label="Очистить поле"`, или свяжи кнопку с подписью через `aria-labelledby`.
- Видимая и доступная кнопка участвует в Tab-навигации. `Enter` и `Space` активируют нативную кнопку. Фокус отображается стилями `ButtonIcon`.
- При работе с клавиатуры обработчик очистки может вернуть фокус к полю через его `ref`, если пользователю нужно сразу продолжить ввод.

---

## Связанные компоненты

- [FormField](FormField-ai.md) определяет видимость кнопки в зависимости от состояния поля. `FormFieldPostfix` отводит под неё место справа.
- [ButtonIcon](../Button/ButtonIcon-ai.md) задаёт разметку, нативное взаимодействие и обводку фокуса.

---

## Stories

Основные истории: `stories/FormField/FormField.stories.tsx`
Файлы примеров: `stories/FormField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `WithClearButton` | `WithClearButtonExample.tsx` | Введи текст, затем нажми крестик в постфиксе. `onClick` сбрасывает значение поля. |

Дополнительный пример: `stories/NumberField/NumberField.stories.tsx`
Файлы примеров: `stories/NumberField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Production` | `Production.tsx` | Кнопка с `aria-label` в постфиксе числового поля. После очистки обработчик возвращает фокус к полю. |

Визуальная проверка: `stories/SelectExtendedField/SelectExtendedField.stories.tsx`
Файлы примеров: `stories/SelectExtendedField/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `VisualTests` | `VisualTests.tsx` | Крестик рядом с кареткой в заполненном поле с длинным значением. `play` фокусирует поле, эталоны `selectextendedfield--visual-tests--xs/xl` фиксируют видимую кнопку. |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-10 | Создан документ (TRI-196). Уточнён контракт `onMouseDown`. |
