---
component: ChipDatePickerTarget
category: Chips
related: [ChipDatePicker, Chip, DatePickerExtended]
tokens: []
stories: stories/Chips/ChipDatePicker.stories.tsx
version: "1.0"
---

# ChipDatePickerTarget

## Назначение

Публичный target для выбора даты в виде `Chip`: переключает выпадающий календарь
через `DatePickerExtendedContext`, показывает стрелку либо кнопку очистки.
Сам не хранит дату и не форматирует `children`.

Используй когда: нужна своя композиция `DatePickerExtended.renderTarget`
с чипсом, собственным контентом, `prefix` или `postfix`.
Не используй когда: достаточно готового управляемого фильтра `ChipDatePicker`
с `value`, `onChange` и мобильным вводом даты.

Публичное подключение:

```tsx
import { ChipDatePickerTarget, type IChipDatePickerTargetProps } from "@sberbusiness/triplex-next";
```

Возвращай target из `DatePickerExtended.renderTarget`: там он получает рабочий
контекст. Вне provider используется значение контекста по умолчанию
(`dropdownOpen: false`, пустой setter), поэтому самостоятельный target не открывает
календарь. Создавать свой `Context.Provider` для обычной композиции не требуется.

Минимальная управляемая композиция:

```tsx
const [pickedDate, setPickedDate] = useState<string | null>(null);

<DatePickerExtended
    pickedDate={pickedDate}
    onDateChange={(date) => setPickedDate(date.format("YYYYMMDD"))}
    renderTarget={() => (
        <ChipDatePickerTarget selected={pickedDate !== null} onClear={() => setPickedDate(null)}>
            {pickedDate ? moment(pickedDate, "YYYYMMDD").format("DD.MM.YYYY") : "Выберите дату"}
        </ChipDatePickerTarget>
    )}
    renderDropdownHeaderTarget={() => <span>Выберите дату</span>}
/>;
```

---

## Варианты и props

`IChipDatePickerTargetProps` наследует `IChipProps` целиком и добавляет обязательный
`onClear`. Точные типы унаследованных атрибутов находятся в исходниках `Chip`.

### Значение и callbacks

| Prop | По умолчанию | Назначение и ограничения |
|---|---|---|
| `onClear` | Обязателен | Вызывается без аргументов по клику встроенной кнопки очистки; потребитель сбрасывает свою дату и `selected` |
| `selected` | `false` | Управляемое визуальное состояние; при `true` вместо стрелки рендерится `ChipClearButton` |
| `children` | — | Подпись фильтра или выбранная дата; форматирует потребитель |
| `onClick` | — | Получает исходное событие после вызова `setDropdownOpen(!dropdownOpen)` |
| `onKeyDown` | — | Получает событие только для `event.code` Enter / Space, после `preventDefault()` и переключения контекста; для остальных клавиш не вызывается |

`onClear` не закрывает открытый календарь и не меняет `selected` автоматически.
Клик встроенной кнопки вызывает `stopPropagation()`, поэтому не переключает
календарь и не вызывает `onClick` target.

### Внешний вид и унаследованные атрибуты

| Prop или группа | По умолчанию | Назначение и ограничения |
|---|---|---|
| `size` | `EComponentSize.MD` | SM / MD / LG; передаётся в `Chip`, стрелку и встроенную кнопку очистки |
| `type` | `EChipType.TYPE_1` | TYPE_1 / TYPE_2; визуальная тема `Chip` |
| `disabled` | `false` | CSS-блокировка указателя и `tabIndex={-1}` у `Chip`; ограничения ниже |
| `prefix` | — | Контент перед подписью через слот `Chip` |
| `postfix` | Автоматическая стрелка или очистка | Переданное значение переопределяет автоматический postfix, включая явно переданный `undefined`; обработчики пользовательского слота задаёт потребитель |
| `showNotificationIcon` | `false` | Значок `Badge.Dot` через `Chip` |
| `className`, `style`, `id`, `data-*`, `aria-*`, прочие span-атрибуты | — | Передаются в корневой `<span>` `Chip`; `className` объединяется с его классами |

`...restProps` расположен после `postfix` и `aria-expanded`, поэтому потребитель
может переопределить их, а также унаследованные `role` и `tabIndex`. Сохраняй
согласованность ARIA с реальной открытостью календаря. Для необязательных слотов
учитывай правила `Chip`: явный `null` / `false` оставляет класс отступов без контента.

---

## Дизайн-токены

Собственных стилей и токенов нет: frontmatter содержит `tokens: []`.
Внешний вид задают зависимости: `Chip` (например, `Chip.Background_Type1_Default`,
`Chip.Background_Selected_Default`, `Chip.Color_Disabled`, `Chip.Shadow_Focus`)
и `ChipClearButton` (фокус использует `Chip.Shadow_Focus`). Стрелка использует
палитру иконок, отдельных токенов target не добавляет.

Полный набор — в [Chip-ai.md](./Chip-ai.md#дизайн-токены); значения по умолчанию —
`src/components/DesignTokens/components/Chip.ts`. Переопределение через
`ThemeProvider.tokens` описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- `forwardRef<HTMLSpanElement>` сохраняется: ref указывает на корневой `<span>`
  `Chip`, а не на кнопку очистки, календарь или корень `DatePickerExtended`.
- `ChipDatePickerTarget` и `IChipDatePickerTargetProps` экспортируются именованно
  через `src/components/Chip/ChipDatePicker/index.ts` и `src/components/Chip/index.ts`;
  имена, типы props и barrel-экспорты сохраняются.
- Открытость читается из `DatePickerExtendedContext`; не добавлять локальную копию
  состояния, иначе стрелка и `aria-expanded` разойдутся с календарём.
- `selected` приходит от потребителя, `onClear` получает ноль аргументов. Не
  подменять его DOM-событием или изменением даты внутри target.
- Клик target сначала вызывает setter контекста, затем `onClick`. Enter / Space
  сначала отменяют действие браузера, переключают контекст, затем вызывают
  пользовательский `onKeyDown` внутри той же ветки.
- Порядок spread сохраняет переопределение `postfix` и `aria-expanded` через props.
- Корневой элемент, CSS-контракт `Chip` и ref-target не меняются при AI-рефакторинге.

---

## Accessibility

- По умолчанию это `<span role="button" tabIndex={0}>`; имя задаётся текстом
  `children` или переданным `aria-label`. `selected` сам не добавляет `aria-pressed`.
- `aria-expanded` берётся из контекста. `aria-haspopup` и `aria-controls`
  автоматически не задаются: нужные атрибуты и ID-связи передаёт потребитель.
- Enter / Space распознаются по `event.code`, переключают календарь и вызывают
  `preventDefault()`. Остальные клавиши не передаются в пользовательский
  `onKeyDown` target. Escape, ловушка фокуса и возврат фокуса принадлежат
  `DatePickerExtended`, а навигация по датам — `Calendar`.
- `disabled` у `Chip` означает `pointer-events: none` и `tabIndex={-1}`,
  а не нативное отключение `<span>`; программно отправленные события
  обработчики не блокируют. Встроенная кнопка очистки не получает `disabled`.
- Встроенная очистка останавливает только всплытие клика. Её Enter / Space
  всплывают в target: обработчик target вызывает `preventDefault()`, отменяя
  нативную активацию кнопки, и переключает календарь. Поэтому встроенную
  кнопку нельзя нажать с клавиатуры — `onClear` не вызывается. Доступное имя
  из props target кнопке не передаётся, `clearButtonProps` у компонента нет.
  Это существующие ограничения, а не желаемое поведение.
- Для клавиатурно доступной именованной очистки передай свою кнопку в `postfix`:
  `aria-label`, остановка всплытия клика и Enter / Space; локализованный текст
  остаётся у потребителя.

```tsx
const handleClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPickedDate(null);
};

// Не даём Enter / Space дойти до target: нативная активация кнопки вызовет click.
const handleClearKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.code === "Enter" || event.code === "Space") {
        event.stopPropagation();
    }
};

// postfix передаётся только при выборе: явный postfix={undefined} убрал бы автоматическую стрелку.
const postfixProps =
    pickedDate !== null
        ? {
              postfix: (
                  <ChipClearButton aria-label="Очистить дату" onClick={handleClearClick} onKeyDown={handleClearKeyDown} />
              ),
          }
        : {};

<ChipDatePickerTarget selected={pickedDate !== null} onClear={() => setPickedDate(null)} {...postfixProps}>
    {label}
</ChipDatePickerTarget>;
```

---

## Связанные компоненты

- [ChipDatePicker](./ChipDatePicker-ai.md) — готовый родитель: вычисляет `selected`
  и подпись, передаёт `onClear`, рендерит target внутри `DatePickerExtended`.
- [Chip](./Chip-ai.md) — рендерится внутри target, источник унаследованных props,
  визуальных состояний и span-семантики.
- [DatePickerExtended](../DatePickerExtended/DatePickerExtended-ai.md) — владеет
  календарём и контекстом открытости; публичная точка композиции — `renderTarget`.
- `ChipClearButton` — встроенный postfix для `selected`; отдельная публичная
  кнопка принимает `aria-label` и остальные props `ButtonIcon`.
- `ChipDropdownArrow` — встроенный postfix без выбора; `rotated` повторяет
  открытость контекста.

---

## Stories

Основные истории: `stories/Chips/ChipDatePicker.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipDatePicker/`

Используются существующие истории родителя: `ChipDatePicker` рендерит этот target.
Отдельный stories-файл атому не требуется. Примеры ручной композиции через
`renderTarget` приведены выше в этом документе.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Target с контролами type, size, disabled; выбор даты включает `selected` и кнопку очистки |
| `Types` | `TypesExample.tsx` | TYPE_1 / TYPE_2 target без выбора, со стрелкой |
| `Sizes` | `SizesExample.tsx` | SM / MD / LG target без выбора, со стрелкой |
| `VisualTests` | `VisualTestsExample.tsx` | Selected target трёх размеров с кнопкой очистки; play раскрывает календарь последнего |

Состояния `disabled`, hover, focus и prefix/postfix-слоты отрисовывает `Chip`;
они покрыты stories `stories/Chips/Chip.stories.tsx`.

Контракт target покрывает `src/components/Chip/__tests__/ChipDatePickerTarget.test.tsx`;
календарный выбор и связь с датой — существующие тесты `ChipDatePicker` и
`DatePickerExtended`. Ограничения встроенной очистки и disabled не закрепляются
новыми тестами как желаемое поведение.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-21 | Создан документ; добавлены JSDoc и focused тесты target без изменения API и поведения |
