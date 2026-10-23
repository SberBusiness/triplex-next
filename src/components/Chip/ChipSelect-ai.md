---
component: ChipSelect
category: Chips
related: [Chip, ChipSelectTarget, ChipMultiselect, SelectExtendedField, SelectField]
tokens: []
stories: stories/Chips/ChipSelect.stories.tsx
version: "1.0"
---

# ChipSelect

## Назначение

Компактный фильтр с выбором одной опции из готового списка. Поле выбора выглядит
как `Chip`: до выбора показывает `label` и стрелку, после — выбранное значение
и кнопку сброса. На мобильной ширине список открывается в нижней шторке `Puller`.

Используй когда: в панели фильтров нужен одиночный выбор с коротким текстом результата.
Рекомендуется располагать внутри `ChipGroup`.

Не используй когда: нужен множественный выбор (`ChipMultiselect`), произвольный
выпадающий контент (`SelectExtendedField`) или поле формы с placeholder, loading
и статусом валидации (`SelectField`).

Компонент управляемый по выбору: `value` изменяет потребитель через `onChange` и
`clearSelected`. Состоянием открытости владеет внутренний `SelectExtendedField`.

---

## Варианты и props

### Выбор и отображение

| Prop | Обязательность / по умолчанию | Назначение и ограничения |
|---|---|---|
| `options` | Обязателен | Массив `ISelectFieldOption`. У каждой опции должны быть стабильный уникальный `id`, `value` и отображаемый `label`. Выбранная опция сопоставляется по `id`, а не по ссылке на объект. |
| `onChange` | Обязателен | Получает выбранный объект опции; после выбора список закрывается. Сам `value` компонент не меняет. |
| `clearSelected` | Обязателен | Вызывается без аргументов. Для сброса потребитель устанавливает `value={undefined}`; `onChange` при сбросе не вызывается. |
| `size` | Обязателен | `EComponentSize.SM` / `MD` / `LG`: одинаковый размер поля выбора и списка. |
| `value` | `undefined` | Выбранная опция. При наличии значения чипс получает selected-стиль и кнопку сброса. |
| `label` | — | Контент до выбора; одновременно заголовок списка на мобильном экране, в том числе после выбора. |
| `displayedValue` | `value.label` | Контент вместо подписи выбранной опции. Без `value` игнорируется. `null` / `undefined` дают fallback на `value.label`; `0` и пустая строка сохраняются. |

`ISelectFieldOption` наследует свойства опции `SelectExtendedField`: например,
`showNotificationIcon` включает значок у пункта списка, а не у самого чипса.

### Вид и открытость

| Prop | По умолчанию | Назначение и ограничения |
|---|---|---|
| `type` | `EChipType.TYPE_1` | Визуальный тип `TYPE_1` / `TYPE_2` передаётся в `ChipSelectTarget`. |
| `disabled` | `false` | Убирает target из tab-порядка и блокирует pointer-события стилями `Chip`; ограничения см. в Accessibility. |
| `onOpen`, `onClose` | — | Уведомления о смене открытости без аргументов. На первом рендере не вызываются. |
| `closeOnTab` | `false` | Наследуется от `SelectExtendedField` и закрывает список при всплывающем Tab, в том числе из dropdown. Сам target закрывает список по Tab независимо от этого флага. |
| `className`, HTML-атрибуты | — | Передаются корневому `<div>` `SelectExtendedField`, не вложенному чипсу. |

### Граница наследуемого API

`IChipSelectProps` наследует часть `IChipProps` и `ISelectFieldProps`, но компонент
не рендерит `SelectField`. `children`, `targetProps`, `dropdownListItemClassName`,
`mobileTitle`, `loading`, `status` и `placeholder` исключены из API: target и список
собираются внутри, мобильный заголовок берётся из `label`.

Унаследованный `dropdownProps` присутствует в типе, но текущая реализация не
передаёт его в `SelectExtendedFieldDropdownDefault`. Не используй его для настройки
списка. Не меняй это поведение в рамках документирования без отдельной задачи.

---

## Дизайн-токены

У `ChipSelect` нет собственных токенов: используемый класс `chipGroupItem`
задаёт только раскладку, поэтому frontmatter содержит `tokens: []`. Поле выбора
использует `Chip`: пути `Chip.Background_*`, `Chip.Color_*` и `Chip.Shadow_Focus`
управляют его состояниями. Их значения определены в
`src/components/DesignTokens/components/Chip.ts`; полный перечень и назначение —
в [Chip-ai.md](Chip-ai.md#дизайн-токены).

Список и мобильный overlay используют токены своих компонентов — см.
[Dropdown-ai.md](../Dropdown/Dropdown-ai.md#дизайн-токены).
Переопределение через prop `tokens` описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- Публичные импорты: `ChipSelect`, `IChipSelectProps`, `ISelectFieldOption`,
  `EChipType`, `EComponentSize` доступны из `@sberbusiness/triplex-next`.
- `forwardRef<HTMLDivElement>` обязателен: `ref` указывает на корневой `<div>`
  `SelectExtendedField`. Вложенный `ChipSelectTarget` — отдельный `<span>`.
- Сохранять barrel-экспорты `Chip/index.ts` и `Chip/ChipSelect/index.ts`, включая
  самостоятельный `ChipSelectTarget`.
- Корневой класс `chipGroupItem` добавляется через `clsx` рядом с пользовательским
  `className`. Чипс внутри также имеет свой `chipGroupItem`.
- `selected` вычисляется как `value !== undefined`; текст выбранного значения —
  через `displayedValue ?? value.label`. Не заменять на проверку truthiness:
  `displayedValue={0}` и `displayedValue=""` допустимы.
- Сброс останавливает всплытие клика и не переключает открытость списка;
  `clearSelected` и `onChange` — разные операции.
- Значения `EChipType`, `EComponentSize`, props, ref-target и токены — публичный
  контракт. Story IDs `chips-chipselect--*` связаны с существующими baseline.

---

## Accessibility

- Target — `<span role="button" tabIndex={0}>` с `aria-expanded`, а не combobox.
  Видимый текст из `label` или выбранного значения даёт имя target.
- Клик переключает открытость. Enter и Space открывают закрытый список;
  Tab на target закрывает открытый. Escape и клик вне поля/списка закрывают через
  `SelectExtendedField`. Клавиатурную навигацию и выбор пунктов реализует `Dropdown`.
- В отличие от `SelectField`, `ChipSelect` не связывает target со списком через
  `aria-controls` / `aria-activedescendant`. Переданный `aria-label` или
  `aria-labelledby` попадает на корневой `<div>`, не на target: не считай его
  заменой видимого названия чипса.
- `disabled` задаёт класс и `tabIndex={-1}` на `Chip`. Это не нативный `disabled`:
  программно отправленные события не защищены проверкой флага в обработчиках.
  Не используй такое состояние как защиту бизнес-логики.
- В selected-состоянии вложена нативная `ChipClearButton`; Enter и Space на ней
  не всплывают в обработчик открытия target. Доступное имя кнопки сброса текущая
  композиция не задаёт и отдельного prop для него нет — известное ограничение
  TRI-139.
- Собственного управления фокусом и возврата фокуса `ChipSelect` не добавляет;
  поведение overlay определяется компонентами `Dropdown`.

---

## Связанные компоненты

- `Chip` — базовый компонент семейства, стили размеров, типов и выбранного состояния.
- `ChipSelectTarget` — самостоятельный публичный target с кнопкой сброса, стрелкой
  и обработкой клавиатуры; рендерится внутри `ChipSelect`.
- `ChipMultiselect` — альтернатива для нескольких значений и собственного dropdown-контента.
- `SelectExtendedField` — рендерится внутри, владеет открытостью и корневым ref.
- `SelectField` — источник наследуемого интерфейса props и типа опции;
  полная форма поля с другими возможностями отображения.
- `ChipGroup` — рекомендуемый контейнер раскладки фильтров.

---

## Stories

Основные истории: `stories/Chips/ChipSelect.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipSelect/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Контролы типа, размера, подписей и disabled |
| `Default` | `DefaultExample.tsx` | Управляемый одиночный выбор и сброс |
| `Sizes` | `SizesExample.tsx` | SM / MD / LG |
| `States` | `StatesExample.tsx` | Выбранное и disabled-состояния |
| `WithNotificationIcon` | `WithNotificationIconExample.tsx` | Значок уведомления у опции списка |
| `WithCustomDisplayedValue` | `WithCustomDisplayedValueExample.tsx` | Замена текста выбранной опции |
| `VisualTests` | `VisualTestsExample.tsx` | Размеры и открытый dropdown через play-функцию |

Все не-Playground stories имеют baseline `xs` / `xl` в `__screenshots__/`.
`WithNotificationIcon` дополнительно показан в `VisualTests`, поскольку его
отдельная story пропускается test-runner.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-19 | Создан документ (TRI-131): описаны управляемый выбор, граница наследуемых props, токены и существующие accessibility-ограничения; собственные props оформлены JSDoc, дополнены unit-тесты контракта. |
| 2026-10-19 | Удалена ссылка на задачу об ограничении доступности, сохранён номер TRI-139. |
| 2026-10-21 | Переход на `Puller` (TRIPLEX-961): на мобильной ширине список открывается в нижней шторке `Puller`. |
