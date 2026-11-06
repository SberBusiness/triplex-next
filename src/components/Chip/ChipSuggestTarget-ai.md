---
component: ChipSuggestTarget
category: Chips
related: [ChipSuggest, ChipSelectTarget, Chip, Suggest]
tokens: []
stories: stories/Chips/ChipSuggest.stories.tsx
version: "1.0"
---

# ChipSuggestTarget

## Назначение

Публичный target для `ChipSuggest`: рендерит `Chip` с подписью и стрелкой либо
очисткой, открывает и закрывает список через `SuggestContext`.
Выбранное значение и открытость берёт из ближайшего `Suggest`.

Используй когда: собираешь свою композицию `Suggest` с чипсом вместо поля.
Для готового поиска со списком используй `ChipSuggest`; для target с открытостью
через props вместо контекста — `ChipSelectTarget`.

Публичные импорты:

```tsx
import { ChipSuggestTarget, type IChipSuggestTargetProps, type ISuggestOption } from "@sberbusiness/triplex-next";
```

Компонент и интерфейс сохраняют generic-параметр `<T extends ISuggestOption>`.
Рендери target внутри `Suggest<T>`: вне provider он получает пустое значение,
закрытый список и setter-заглушку; самостоятельной работы со списком нет.

---

## Варианты и props

`IChipSuggestTargetProps<T>` наследует `IChipProps` без `prefix` / `postfix`
и добавляет опциональный `clearSelected`. Обязательных custom-props нет.

| Prop | По умолчанию | Назначение и ограничения |
|---|---|---|
| `children` | — | Подпись. Target не подставляет `value.label`: это делает `ChipSuggest` либо потребитель своей композиции |
| `clearSelected` | — | Вызывается без аргументов встроенной очисткой. Значение `Suggest.value` обновляет потребитель; без callback кнопка остаётся без действия |
| `onClick` | — | Получает React mouse event после `setDropdownOpen(!dropdownOpen)` |
| `onKeyDown` | — | Получает все дошедшие до target события клавиатуры, кроме Enter / Space на встроенной очистке; Enter / Space — после переключения |
| `size` | `EComponentSize.MD` | SM / MD / LG; передаётся в `Chip`, стрелку и очистку |
| `type` | `EChipType.TYPE_1` | Визуальный тип `Chip`; при использовании через `ChipSuggest` задаётся на родителе |
| `disabled` | `false` | Отключает target и встроенную очистку; ограничения — в Accessibility |
| `showNotificationIcon` | `false` | Значок `Badge.Dot` через `Chip` |
| `className`, `style`, `id`, `data-*`, `aria-*`, прочие span-атрибуты | — | Передаются в корневой `<span>`; `className` объединяется с классами `Chip` |
| `ref` | — | Указывает на `HTMLSpanElement` чипса, а не на корень `Suggest` или dropdown |

### Состояние из контекста

- При `value === undefined` отображается стрелка с `rotated={dropdownOpen}`.
  Любое выбранное значение включает очистку и исходное `selected`-оформление.
- Клик, Enter и Space переключают открытость в обе стороны. В отличие от
  `ChipSelectTarget`, уже открытый список по Enter / Space закрывается.
- Переключение target вызывает именно `setDropdownOpen`, а не `closeDropdown`:
  дополнительный сброс строки фильтрации принадлежит другим частям `Suggest`.

Spread унаследованных props находится после внутренних `selected` и
`aria-expanded`: они могут быть переопределены потребителем. Выбор автоматического
postfix при этом зависит только от `value` в контексте.
`prefix` / `postfix` исключены из TypeScript API target.

---

## Дизайн-токены

Собственных стилей и токенов у target нет, поэтому `tokens: []`.
Внешний вид наследуется от `Chip`: см. [Chip-ai.md](Chip-ai.md#дизайн-токены).

---

## Инварианты

- Сохраняются именованные экспорты `ChipSuggestTarget` и `IChipSuggestTargetProps`
  через `Chip/ChipSuggest/index.ts` и `Chip/index.ts`, generic-сигнатура и тип ref.
- `forwardRef` обязателен. Ref-target и корневой элемент — `<span>` `Chip`.
  `displayName` — `"ChipSuggestTarget"`.
- `ChipSuggestTargetWithRef` сохраняет React forwardRef-объект, а assertion
  восстанавливает generic-вызов: не убирать параметр `T` из публичной сигнатуры.
- `value`, `dropdownOpen` и setter читаются из `useSuggestContext<T>`;
  не добавлять параллельный локальный state.
- Сначала переключается открытость, затем вызывается пользовательский callback.
  `preventDefault()` в нём не отменяет уже вызванный setter.
- Клик и Enter / Space встроенной очистки не всплывают в target;
  `clearSelected` вызывается без DOM-события.
- Сохраняются порядок spread, внешний вид, размеры, типы, имена токенов и story IDs.
  Код остаётся совместимым с React 17.

---

## Accessibility

- По умолчанию корень — `<span role="button" tabIndex={0}>` с `aria-expanded`,
  не combobox. Имя задают `children` или ARIA-атрибуты потребителя.
- Enter / Space переключают список; Space не прокручивает страницу благодаря
  `preventDefault()` в `Chip`. Синтетический click на самом span не создаётся.
- Escape, клик вне компонента и состояние фильтра обрабатывает `Suggest`.
  Сам target не переносит фокус: поле ввода, `FocusTrap` и возврат фокуса
  принадлежат dropdown-композиции `ChipSuggest`.
- Встроенная очистка — нативная кнопка: Enter / Space активируют её нативный
  click и вызывают `clearSelected`.
- У встроенной очистки нет доступного имени и отдельного prop для него
  (TRI-139). ARIA-имя самого target на вложенную кнопку не передаётся.
- `disabled` означает CSS `pointer-events: none` и `tabIndex=-1` у `Chip`
  и нативный `disabled` у встроенной очистки. В обработчиках target флаг
  не проверяется: программно отправленные события не защищены.
  Не передавай `tabIndex`: он перекрывает `-1`, target снова получит фокус,
  и Enter / Space переключат список.
- `aria-controls`, `aria-haspopup` и `aria-pressed` автоматически не создаются.
  Фокус оформляется через `Chip.Shadow_Focus`.

---

## Связанные компоненты

- [ChipSuggest](ChipSuggest-ai.md) — готовый родитель, формирует подпись,
  передаёт `targetProps` и рендерит target внутри `Suggest`.
- [ChipSelectTarget](ChipSelectTarget-ai.md) — альтернатива с `opened` /
  `setOpened` через props и другими правилами Enter / Space / Tab.
- [Chip](Chip-ai.md) — непосредственно рендерится внутри; источник унаследованных
  props, span-семантики и визуальных состояний.
- [Suggest](../Suggest/Suggest-ai.md) — источник значения, открытости и setter
  через контекст; его provider обязателен для рабочей композиции.
- `ChipClearButton` и `ChipDropdownArrow` — автоматические варианты postfix;
  собственного AI.md для этих обёрток нет.

---

## Stories

Основные истории: `stories/Chips/ChipSuggest.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipSuggest/`

Используются истории родителя: отдельный stories-файл атому не нужен.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Тип, размер, подпись и targetProps |
| `Default` | `DefaultExample.tsx` | Target в готовой композиции поиска и очистки |
| `Types` | `TypesExample.tsx` | TYPE_1 / TYPE_2 target |
| `Sizes` | `SizesExample.tsx` | SM / MD / LG |
| `States` | `StatesExample.tsx` | Выбор с очисткой и disabled target без выбора |
| `WithNotificationIcon` | `WithNotificationIconExample.tsx` | Значок у опции списка, не у target; скриншот-прогон пропущен |
| `VisualTests` | `VisualTestsExample.tsx` | Три размера и открытые списки; раскрытие выполняет useLayoutEffect примера |

`Default`, `Types`, `Sizes`, `States` и `VisualTests` имеют Linux/CI baseline
на `xs` / `xl` в `__screenshots__/`. Фокус базового чипса проверяет
`VisualTests` в stories `Chip`.

Контракт target покрывает `src/components/Chip/__tests__/ChipSuggestTarget.test.tsx`,
интеграцию со списком — `ChipSuggest.test.tsx`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-29 | Создан документ. |
