---
component: ChipSelectTarget
category: Chips
related: [ChipSelect, ChipSuggestTarget, Chip, SelectExtendedField]
tokens: []
stories: stories/Chips/ChipSelect.stories.tsx
version: "1.0"
---

# ChipSelectTarget

## Назначение

Публичный управляющий элемент `ChipSelect`: показывает подпись фильтра,
стрелку списка либо кнопку очистки и запрашивает изменение открытости.
Собственного состояния, списка опций и логики выбора у target нет.

Используй когда: нужна своя композиция с чипсом и управляемыми `opened` /
`setOpened`, например через `SelectExtendedField.renderTarget`.
Для готового фильтра с опциями и мобильным списком используй `ChipSelect`.
Для target, связанного с контекстом поиска `Suggest`, нужен `ChipSuggestTarget`.

Публичные импорты:

```tsx
import { ChipSelectTarget, type IChipSelectTargetProps } from "@sberbusiness/triplex-next";
```

В отличие от `ChipSuggestTarget`, компонент не требует provider: открытость,
выбранное состояние и подпись полностью задаёт потребитель.

---

## Варианты и props

`IChipSelectTargetProps` расширяет `IChipProps` и добавляет три обязательных prop.
Точные типы унаследованных атрибутов описаны в исходнике `Chip`.

### Управление

| Prop | Обязательность / по умолчанию | Назначение и ограничения |
|---|---|---|
| `opened` | Обязателен | Текущая открытость списка. Управляет стрелкой и исходным `aria-expanded` |
| `setOpened` | Обязателен | Получает новое логическое значение: клик переключает его, Enter / Space открывают закрытый список, Tab закрывает открытый |
| `onClear` | Обязателен | Вызывается без аргументов встроенной кнопкой очистки. Потребитель сбрасывает своё значение, `selected` и подпись |
| `selected` | `false` | Управляемое оформление выбора. При `true` вместо стрелки появляется очистка |
| `children` | — | Подпись фильтра или выбранной опции; target не вычисляет и не форматирует её |
| `onClick` | — | Получает React mouse event после `setOpened(!opened)` |
| `onKeyDown` | — | Получает все дошедшие до target события клавиатуры после встроенной обработки, кроме Enter / Space на встроенной очистке |

`setOpened` — запрос к потребителю, а не локальный setter компонента. Пока
потребитель не передаст новый `opened`, ARIA и стрелка сохранят прежнее состояние.
`onClear` не меняет `selected` и не закрывает список автоматически.
`preventDefault()` в пользовательском обработчике не отменяет уже сделанный
запрос изменения открытости.

### Внешний вид и атрибуты

| Prop или группа | По умолчанию | Назначение и ограничения |
|---|---|---|
| `size` | `EComponentSize.MD` | SM / MD / LG; передаётся в `Chip`, стрелку и кнопку очистки |
| `type` | `EChipType.TYPE_1` | Визуальный тип `Chip`: TYPE_1 / TYPE_2 |
| `disabled` | `false` | Отключает target и встроенную очистку; ограничения — в Accessibility |
| `prefix` | — | Унаследованный слот перед подписью |
| `postfix` | Стрелка либо очистка | Переданное значение заменяет автоматический postfix; явно переданный `undefined` тоже заменяет его |
| `showNotificationIcon` | `false` | Значок `Badge.Dot` через `Chip` |
| `className`, `style`, `id`, `data-*`, `aria-*`, остальные span-атрибуты | — | Передаются в корневой `<span>`; `className` объединяется с классами `Chip` |
| `ref` | — | Указывает на корневой `HTMLSpanElement`, не на кнопку очистки или корень селекта |

Spread расположен после `postfix` и `aria-expanded`: потребитель может заменить
слот или ARIA-атрибут, а также унаследованные `role` / `tabIndex`. Сохраняй их
согласованность с настоящим состоянием списка. Для слотов действуют правила
`Chip`: `null` / `false` могут оставить класс отступов без содержимого.

---

## Дизайн-токены

Собственных стилей и токенов у target нет, поэтому `tokens: []`.
Внешний вид наследуется от `Chip`: см. [Chip-ai.md](Chip-ai.md#дизайн-токены).

---

## Инварианты

- Сохраняются именованные экспорты `ChipSelectTarget` и `IChipSelectTargetProps`
  через `Chip/ChipSelect/index.ts` и `Chip/index.ts`, имена и типы props.
- `forwardRef<HTMLSpanElement>` обязателен; корень и ref-target остаются
  `<span>` `Chip`. `displayName` — `"ChipSelectTarget"`.
- Открытость управляется только `opened` / `setOpened`; не добавлять локальный
  state или зависимость от контекста другого селекта.
- Enter / Space открывают только закрытый список, а не переключают его.
  Tab закрывает открытый список без отмены стандартного перемещения фокуса.
- `onClick` вызывается после setter, `onKeyDown` — после встроенной обработки событий, дошедших до target.
  Очистка вызывает только `onClear()` и останавливает всплытие клика и Enter / Space.
- `selected` влияет на автоматический postfix, `onClear` не получает DOM-событие.
- Порядок spread, размеры и типы `Chip`, токены и story IDs сохраняются.
  Код остаётся совместимым с React 17.

---

## Accessibility

- По умолчанию корень — `<span role="button" tabIndex={0}>`, не combobox.
  Имя задают `children`, `aria-label` или `aria-labelledby` потребителя.
- `aria-expanded` отражает `opened`, если не переопределён явно.
  `aria-controls` и `aria-haspopup` автоматически не создаются.
- Enter / Space на закрытом target вызывают `preventDefault()` и открывают список.
  На открытом target они не закрывают список. `Chip` дополнительно отменяет
  прокрутку страницы на Space. Tab закрывает открытый список, не отменяя Tab.
- Escape, клики вне списка, навигация по опциям и перенос фокуса принадлежат
  композиции селекта, а не target. Сам target фокусом не управляет.
- Встроенная очистка — нативная кнопка: Enter / Space активируют её нативный
  click и вызывают `onClear`.
- У встроенной очистки нет доступного имени, отдельного prop для его
  передачи тоже нет (TRI-139). Для своей именованной очистки доступен `postfix`.
  Такая кнопка, как и встроенная, должна останавливать всплытие click и keydown
  Enter / Space: иначе их обработает target, а `preventDefault()` может отменить
  нативный click кнопки.
- `disabled` ставит `tabIndex=-1` и CSS `pointer-events: none` на `Chip`
  и нативный `disabled` на встроенную кнопку очистки. В обработчиках target
  флаг не проверяется: программно отправленные события не защищены.
  Не передавай `tabIndex`: он перекрывает `-1`, target снова получит фокус,
  и Enter / Space откроют список.
  Пользовательский `postfix` потребитель отключает сам.
- `selected` сам не задаёт `aria-pressed`. Фокус оформляется через `Chip.Shadow_Focus`.

---

## Связанные компоненты

- [ChipSelect](ChipSelect-ai.md) — готовый родитель: владеет значением через props
  потребителя, получает открытость от `SelectExtendedField` и рендерит target.
- [ChipSuggestTarget](ChipSuggestTarget-ai.md) — альтернатива для композиции
  с `SuggestContext`: читает выбор и открытость из контекста и иначе обрабатывает клавиши.
- [Chip](Chip-ai.md) — непосредственно рендерится внутри; источник `IChipProps`,
  span-семантики и всех визуальных состояний.
- [SelectExtendedField](../SelectExtendedField/SelectExtendedField-ai.md) — предоставляет
  `opened` / `setOpened` в `renderTarget`.
- `ChipClearButton` и `ChipDropdownArrow` — автоматические варианты postfix;
  отдельная кнопка очистки принимает атрибуты `ButtonIcon`, включая `aria-label`.

---

## Stories

Основные истории: `stories/Chips/ChipSelect.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipSelect/`

Используются истории родителя: он рендерит этот target.
Отдельный stories-файл атому не требуется.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Тип, размер, подписи и disabled |
| `Default` | `DefaultExample.tsx` | Подпись, стрелка, выбор и очистка |
| `Sizes` | `SizesExample.tsx` | SM / MD / LG target |
| `States` | `StatesExample.tsx` | Selected и disabled |
| `WithNotificationIcon` | `WithNotificationIconExample.tsx` | Значок у опции списка, не у target; отдельный скриншот-прогон пропущен |
| `WithCustomDisplayedValue` | `WithCustomDisplayedValueExample.tsx` | Подпись выбранного значения задаёт родитель |
| `VisualTests` | `VisualTestsExample.tsx` | Выбранные target трёх размеров; play открывает список у unselected target |

У семейства есть Linux/CI baseline на `xs` / `xl` в `__screenshots__/`;
фокус базового чипса проверяет `VisualTests` в stories `Chip`.
Контракт target проверяет `src/components/Chip/__tests__/ChipSelectTarget.test.tsx`,
интеграцию выбора — `ChipSelect.test.tsx`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-29 | Создан документ. |
