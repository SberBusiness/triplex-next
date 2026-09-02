---
component: SmallInput
category: TextFields
related: [DocumentNumberEdit, TextField]
tokens:
  - SmallInput.Background
  - SmallInput.Color
  - SmallInput.PlaceholderColor
  - SmallInput.Shadow
stories: stories/SmallInput/SmallInput.stories.tsx
version: "1.0"
---

# SmallInput

## Назначение

Компактное однострочное текстовое поле ввода высотой 20px. Тонкая обёртка над `<input type="text">`:
свой CSS-модуль и своя группа дизайн-токенов, ничего больше — ни лейбла, ни статусов, ни префиксов,
ни обвязки семейства `FormField`. Ширина всегда 100% контейнера, поэтому размер задаётся снаружи.

Используй когда: нужно инлайн-редактирование короткого значения в плотной вёрстке, где полноценное
поле формы не помещается — например, номер документа в шапке страницы (`DocumentNumberEdit`).

Не используй когда:
- Поле живёт в форме и ему нужны лейбл, статус (error/warning/disabled), описание, счётчик или
  кнопка очистки — возьми `TextField` (или `FormGroup` + `FormField` для нестандартной композиции).
- Нужен нетекстовый ввод (`number`, `password`, `email`, `checkbox`): `type` захардкожен, см. «Инварианты».
- Нужен ввод по маске (`MaskedField`), сумма (`AmountField`), дата (`DateField`).
- Нужно готовое редактирование номера документа целиком, вместе с кнопкой «Изменить» и
  переключением режимов — это уже `DocumentNumberEdit`.

---

## Варианты и props

Собственных props у компонента нет. `ISmallInputProps` расширяет
`React.InputHTMLAttributes<HTMLInputElement>` и ничего к нему не добавляет, поэтому принимаются
все стандартные атрибуты `<input>`: `value` / `defaultValue`, `onChange`, `placeholder`,
`maxLength`, `disabled`, `readOnly`, `autoFocus`, `aria-*`, `data-*` и остальные.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `className` | `string` | — | Мерджится через `clsx` с собственным классом на корневом `<input>` |
| `...InputHTMLAttributes` | — | — | Все стандартные атрибуты `<input>`, попадают на корневой элемент |
| `type` | — | `"text"` | Захардкожен и **не переопределяется**: атрибут выставляется после `{...rest}` |

### Особенности поведения

- Компонент полностью stateless: контролируемость (`value` + `onChange`) или неконтролируемость
  (`defaultValue`) выбирает потребитель, как у нативного `<input>`.
- Ширина `100%`, высота `20px`, `box-sizing: border-box` — габариты задаёт контейнер.
  Собственного `min-width` нет, при узком контейнере поле схлопывается.
- Собственных стилей `:hover`, `:focus`, `:disabled` у компонента нет. `outline` снят
  (`outline: none`), рамка нарисована постоянным `box-shadow`, поэтому визуально disabled,
  readOnly и сфокусированное поле не отличаются от обычного.
- Нативный крестик очистки IE/Edge скрыт (`&::-ms-clear { display: none; }`).
- В Firefox плейсхолдер принудительно непрозрачный (`opacity: 1`), иначе браузер делает его
  полупрозрачным поверх токена цвета.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/SmallInput.ts`.

```text
SmallInput.Background
SmallInput.Color
SmallInput.PlaceholderColor
SmallInput.Shadow
```

`SmallInput.Shadow` — это inset-`box-shadow`, играющий роль рамки поля; он одинаков в светлой
и тёмной теме и не меняется по состояниям.

---

## Инварианты

- **`forwardRef`** — обязателен, не убирать. `ref` указывает на корневой (и единственный) `<input>`.
- **Корневой DOM-элемент — `<input>`**, без обёрток. Потребители (`DocumentNumberEdit`) верстают
  его внутри своих контейнеров и рассчитывают на `width: 100%` без внешних отступов.
- **`type="text"` выставляется после `{...rest}`** и поэтому перекрывает переданный извне `type`.
  Менять порядок или удалять хардкод — изменение наблюдаемого поведения, только отдельной задачей
  с записью в release notes.
- **Имена `SmallInput`, `ISmallInputProps`** и `displayName` — часть публичного API,
  экспортируются из barrel `src/components/SmallInput/index.ts` и из корневого
  `src/components/index.ts`.
- **`ISmallInputProps` не должен обрастать собственными props без необходимости** — ценность
  компонента в том, что это ровно нативный `<input>` с фирменными токенами.
- **Группа токенов `SmallInput.*`** — публичный контракт темизации, переименование ломает
  `ThemeProvider` у потребителей.

---

## Accessibility

- Компонент не задаёт доступное имя: нет лейбла, `aria-label` и `aria-labelledby` не хардкодятся.
  **Доступное имя обязан передать потребитель** — `aria-label`, `aria-labelledby` или внешний
  `<label htmlFor>` со своим `id` (библиотека мультиязычная, тексты в неё не зашиваются).
- Своей клавиатурной логики нет — поведение стандартного `<input type="text">`.
- Видимого индикатора фокуса нет: `outline: none`, а `box-shadow` постоянный. Если поле
  используется как самостоятельный элемент управления, а не как часть компонента со своим
  focus-состоянием, фокус-стиль нужно добавлять снаружи через `className`.
- Состояния `disabled` / `readOnly` работают нативно (таб-обход, ввод), но визуально не
  отличаются — при необходимости различие обеспечивает потребитель.

---

## Связанные компоненты

- `DocumentNumberEdit` (`src/components/DocumentNumberEdit/DocumentNumberEdit.tsx`) — единственный
  потребитель внутри библиотеки и готовое решение для сценария «номер документа»:
  `IDocumentNumberEditProps` наследует `ISmallInputProps`, а сам компонент рендерит `SmallInput`
  в режиме редактирования, добавляя лейбл, ссылку «Изменить», фильтрацию цифр и `maxLength`.
  Изменение props или поведения `SmallInput` отражается на нём напрямую.
- `TextField` (`src/components/TextField/TextField.tsx`) — полноформатное однострочное поле
  на семействе `FormField`: лейбл, статусы, префикс/постфикс, описание, счётчик. Альтернатива
  для всего, что сложнее инлайн-редактирования короткого значения.

---

## Stories

Основные истории: `stories/SmallInput/SmallInput.stories.tsx`
Файлы примеров: `stories/SmallInput/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `placeholder`, `maxLength`, `disabled`, `readOnly` |
| `Default` | `Default.tsx` | Минимальное контролируемое поле с плейсхолдером |
| `Disabled` | `Disabled.tsx` | Отключённое поле с заполненным значением |
| `ReadOnly` | `ReadOnly.tsx` | Поле только для чтения |
| `Production` | `Production.tsx` | Production-композиция (`Example: production`): подпись «Документ №» и инлайн-ввод номера с фильтрацией цифр |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: плейсхолдер, заполненное, disabled, readOnly, переполнение, растягивание по ширине |

Скриншоты снимает только `VisualTests`: состояния самого поля она покрывает целиком,
поэтому документационные стори исключены через `testRunner: { skip: true }`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-02 | Создан документ (TRI-80). AI-рефакторинг: уточнён JSDoc компонента, добавлен комментарий о хардкоде `type`, добавлены unit-тесты, созданы stories по modern pattern. Публичный API не изменён |
