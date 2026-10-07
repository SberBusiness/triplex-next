---
component: Radio
category: Inputs
related: [RadioXGroup, RadioYGroup, Text]
tokens:
  - Radio.Background_Default
  - Radio.BorderColor_Default
  - Radio.Dot_Default
  - Radio.Background_Checked_Default
  - Radio.BorderColor_Checked_Default
  - Radio.Background_Hover
  - Radio.Background_Disabled
  - Radio.BorderColor_Disabled
  - Radio.Background_Checked_Disabled
  - Radio.BorderColor_Checked_Disabled
  - Radio.Dot_Disabled
  - Radio.BorderColor_Focused
  - Radio.Background_Checked_Hover
stories: stories/Radio/Radio.stories.tsx
version: "1.0"
---

# Radio

## Назначение

Радио-кнопка с необязательной текстовой подписью в обёртке `<label>`. Выбор,
события и участие в форме обеспечивает нативный `<input type="radio">`;
компонент задаёт размеры и оформление выбранного, недоступного, наведённого
и сфокусированного состояния.

Используй когда: пользователь должен выбрать один вариант из нескольких.
Связывай варианты общим `name` и задавай каждому собственный `value`.

Не используй когда: требуется независимый выбор нескольких значений — нужен
`Checkbox`; для длинного списка вариантов удобнее `SelectField`.

---

## Варианты и props

### Обязательные props

Обязательных custom-props нет. Для доступного имени передавай видимую подпись
через `children` либо `aria-label` / `aria-labelledby` для самого input.

### Опциональные props

| Prop | По умолчанию | Описание |
|---|---|---|
| `size` | `EComponentSize.MD` | `SM` / `MD` / `LG`; диаметр индикатора 16 / 24 / 28px, текст `B4` / `B3` / `B2` соответственно |
| `children` | — | Содержимое подписи, отображаемое через `Text` с `tag="div"` |
| `labelAttributes` | — | HTML-атрибуты корневого `<label>`; его `className` объединяется с внутренними классами label |
| `className` | — | Дополнительный класс внутреннего `<input>`, а не корневого label |
| `checked` | — | Управляемый выбор; обновляй его в ответ на `onChange` либо передавай `readOnly` для фиксированного состояния |
| `defaultChecked` | — | Начальный выбор в неуправляемом режиме |
| `disabled` | `false` | Нативно блокирует выбор, исключает из Tab-навигации и меняет оформление; выбранность сохраняется |
| `name`, `value` | — | Общий `name` связывает варианты в нативную группу, `value` определяет значение в событии и форме |
| `onChange` | — | Нативный React change-event; выбранный вариант доступен через `event.target.value` и `event.target.checked` |
| Остальные input-атрибуты | — | `id`, `required`, `aria-*`, обработчики и другие стандартные атрибуты уходят на input; `type` и HTML `size` исключены из API |

### Ограничения использования

- Собственного состояния выбора нет. Не смешивай `checked` и `defaultChecked`.
  Повторное нажатие на выбранный вариант не снимает выбор и не вызывает новый
  `onChange`.
- `RadioXGroup` и `RadioYGroup` задают компоновку и роль группы, но не управляют
  выбором. Даже внутри них общий `name` необходимо передать самим Radio.
- Класс `nonempty` и обёртка `Text` зависят от truthiness `children`. Без подписи
  дополнительный отступ не применяется. Существующая особенность: числовой `0`
  выводится React как текст без `Text` и класса `nonempty`; для числовой подписи
  передавай строку (`String(value)`).
- Темизация задаётся через `ThemeProvider`, отдельного prop `theme` у Radio нет.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см.
`src/components/ThemeProvider/ThemeProvider-ai.md` → «Как переопределять токены».
Значения по умолчанию — `src/components/DesignTokens/components/Radio.ts`.

```text
Radio.Background_Default
Radio.BorderColor_Default
Radio.Dot_Default
Radio.Background_Checked_Default
Radio.BorderColor_Checked_Default
Radio.Background_Hover
Radio.Background_Disabled
Radio.BorderColor_Disabled
Radio.Background_Checked_Disabled
Radio.BorderColor_Checked_Disabled
Radio.Dot_Disabled
Radio.BorderColor_Focused
Radio.Background_Checked_Hover
```

Несмотря на имя `BorderColor`, соответствующие токены содержат готовое значение
`box-shadow`, а не отдельный цвет. `BorderColor_Focused` оформляет клавиатурный
фокус через `:focus-visible`.

---

## Инварианты

- Сохраняй `forwardRef<HTMLInputElement>` и `displayName = "Radio"`.
  Ref указывает на input, корневой DOM-элемент остаётся label.
- DOM-порядок `label` → `input` + соседний `span.radioIcon` + необязательный
  `Text` важен: выбранность, недоступность и фокус индикатора стилизуются
  соседними CSS-селекторами.
- `className` относится к input, `labelAttributes.className` — к label.
  Не меняй распределение атрибутов между ними.
- Сохраняй публичные `IRadioProps`, значения `EComponentSize`, barrel-экспорты
  и существующие имена классов / дизайн-токенов.
- Классы размеров стоят на input и label. Не удаляй их при рефакторинге:
  вложенные элементы и подпись зависят от размера.
- Сохраняй нативную семантику `name`, `checked`, `defaultChecked`, `disabled`
  и событий; дополнительных обработчиков клавиатуры в компоненте нет.

---

## Accessibility

- Роль `radio` и состояние выбранности обеспечивает нативный input. Вложенный
  label связывает видимую подпись с input и делает её кликабельной.
- Без видимой подписи передавай `aria-label` либо корректную ссылку
  `aria-labelledby` на input; атрибуты label его доступное имя не заменяют.
- Tab, Space и навигацию внутри нативной группы обеспечивает браузер.
  Фокус индикатора показывается через `:focus-visible`.
- Для названия группы используй `fieldset` с `legend` либо именованный
  контейнер `role="radiogroup"`. Групповая роль сама по себе не заменяет
  общий `name` у Radio.
- `disabled` применяется к самому input. Компонент не хардкодит текст
  `aria-label` / `title`: локализацию задаёт потребитель.

---

## Связанные компоненты

- `RadioXGroup` — публичная горизонтальная компоновка Radio, с настраиваемым
  отступом и ролью `radiogroup`; отдельная задача AI-Ready.
- `RadioYGroup` — публичная вертикальная компоновка Radio с ролью
  `radiogroup`; отдельная задача AI-Ready.
- `Text` — рендерится внутри Radio для подписи. Его размер зависит от `size`
  Radio: `SM` → `B4`, `MD` → `B3`, `LG` → `B2`.

---

## Stories

Основные истории: `stories/Radio/Radio.stories.tsx`
Файлы примеров: `stories/Radio/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Controls для подписи, размера, выбранности и disabled; выбор синхронизируется с Controls |
| `Default` | `Default.tsx` | Минимальная радио-кнопка с размером MD |
| `DifferentSizes` | `DifferentSizes.tsx` | Подписанные размеры SM / MD / LG; в документации называется Sizes |
| `XGroup` | `XGroup.tsx` | Использование Radio в горизонтальных группах разных размеров |
| `YGroup` | `YGroup.tsx` | Использование Radio в вертикальных группах разных размеров |
| `Selected` | `Selected.tsx` | Начальный выбор через defaultChecked в горизонтальной и вертикальной группах |
| `Disabled` | `Disabled.tsx` | Выбранные и невыбранные disabled Radio всех размеров |
| `WithoutLabel` | `WithoutLabel.tsx` | Все размеры и комбинации checked / disabled без видимой подписи, с aria-label |
| `Controlled` | `Controlled.tsx` | Выбор одного способа уведомления, управляемый через checked / onChange |
| `VisualTests` | `VisualTests.tsx` | Клавиатурный фокус через play, выбранные / disabled состояния всех размеров и длинная подпись |
| `VisualTestsHover` | — | Реальный CSS hover невыбранного Radio, включаемый Playwright в test-runner |
| `VisualTestsCheckedHover` | — | Реальный CSS hover выбранного Radio, включаемый Playwright в test-runner |

Для двух hover-историй существуют служебные render-файлы
`VisualTestsHover.tsx` и `VisualTestsCheckedHover.tsx`. В колонке `Example file`
намеренно стоит «—», чтобы MCP не выдавал их как копируемые примеры:
их поведение зависит от параметров test-runner.

Скриншоты снимаются для `DifferentSizes`, `WithoutLabel`, `VisualTests`,
`VisualTestsHover` и `VisualTestsCheckedHover` на viewport xs / xl.
Остальные истории исключены через `testRunner.skip`: Playground интерактивный,
Default / Selected / Disabled / Controlled покрыты визуальной матрицей,
а RadioXGroup / RadioYGroup остаются отдельными задачами.

Для hover-историй задан opt-in параметр `testRunner.hoverSelector`: synthetic
`userEvent.hover` из play не включает CSS `:hover`, поэтому test-runner
перемещает реальный указатель после каждого remount. Baseline-файлы
генерируются только CI / Docker; локальные macOS-скриншоты не публикуются.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-07 | Создан документ. Проведён AI-рефакторинг Radio, уточнён JSDoc, расширены тесты публичных контрактов; stories переведены на modern pattern с визуальным покрытием размеров, checked / disabled, пустой и длинной подписи, клавиатурного фокуса и настоящего hover. |
