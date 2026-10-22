---
component: ChipMonthYearPickerTarget
category: Chips
related: [ChipMonthYearPicker, Chip, DatePickerExtended]
tokens: []
stories: stories/Chips/ChipMonthYearPickerTarget.stories.tsx
version: "1.0"
---

# ChipMonthYearPickerTarget

## Назначение

Публичный чипс-таргет выбора месяца: показывает переданный контент, переключает
открытость календаря через `DatePickerExtendedContext` и заменяет стрелку кнопкой
очистки при `selected`.

Используй когда: нужен собственный target в `renderTarget` компонента
`DatePickerExtended`, например с иконкой, уведомлением или обработчиками самого
чипса. Для готового управляемого выбора месяца используй `ChipMonthYearPicker`.
Не используй когда: нужен самостоятельный календарь или форматирование значения —
таргет не хранит дату, не парсит её и не выбирает режим календаря.

Публичные named imports: `ChipMonthYearPickerTarget` и
`IChipMonthYearPickerTargetProps` из `@sberbusiness/triplex-next`.

---

## Варианты и props

Наследует `IChipProps`. Собственные props — обязательный `onClear` и опциональный
`clearButtonProps`. Дату, отображаемый текст и `selected` синхронизирует потребитель;
сам `selected` не вычисляется из контекста.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `onClear` | `() => void` | Вызывается без аргументов при активации кнопки очистки. Потребитель сам сбрасывает дату, текст и `selected` |

### Опциональные props

| Prop | По умолчанию | Описание |
|---|---|---|
| `children` | — | Содержимое чипса: название фильтра либо уже отформатированный месяц |
| `selected` | `false` | Выбранный стиль и кнопка очистки вместо стрелки; не меняет `children` |
| `disabled` | `false` | Блокирует переключение календаря и нативную кнопку очистки |
| `clearButtonProps` | — | Атрибуты `ChipClearButton`, включая доступное имя, `title`, `shape`, `active`. `size`, `disabled`, `onClick`, `onKeyDown` исключены из типа и задаются таргетом после spread |
| `size` | `EComponentSize.MD` | Размер чипса и его правой иконки: SM / MD / LG |
| `type` | `EChipType.TYPE_1` | Визуальный тип из `Chip`: TYPE_1 / TYPE_2 |
| `prefix`, `showNotificationIcon` | — / `false` | Левый слот и индикатор уведомления из `Chip` |
| `postfix` | Стрелка либо очистка | Явное значение заменяет внутренний правый слот, в том числе кнопку очистки |
| `onClick` | — | Получает событие после переключения открытости. При `disabled` не вызывается |
| `onKeyDown` | — | Получает все всплывшие до таргета клавиши после внутренней обработки, включая события на `disabled`-таргете |
| `className`, HTML-/`data-*`-/`aria-*`-атрибуты | — | Передаются в корневой `span` через `Chip`; `className` мержится с базовыми классами |

### Контекст и приоритет props

`DatePickerExtended` предоставляет `dropdownOpen` и `setDropdownOpen`.
Клик и Enter/Space вызывают `setDropdownOpen(!dropdownOpen)`, если таргет не
`disabled`. `mouseUsedRef` таргет не меняет: различие мыши и клавиатуры определяет
контейнер `DatePickerExtended`.

Вне provider используется значение контекста по умолчанию: `dropdownOpen=false`,
setter ничего не делает. Самостоятельный target поэтому не открывает календарь.
В копируемых примерах используется публичная композиция через `renderTarget`,
а не внутренний `Context.Provider`.

`aria-expanded` по умолчанию отражает контекст. Внешние `aria-expanded` и `postfix`
идут в `restProps` после внутренних значений и имеют приоритет. При их подмене
потребитель отвечает за соответствие атрибута реальной открытости и доступность
очистки. `onClick`/`onKeyDown` деструктурируются отдельно и внутренние обработчики
не заменяют.

---

## Дизайн-токены

Собственного LESS-модуля и собственных токенов нет, поэтому `tokens: []`.
Внешний вид наследуется от `Chip`: фон, цвет, selected/disabled и тень фокуса —
группа `Chip`. `ChipClearButton` также использует `Chip.Shadow_Focus`;
`ChipDropdownArrow` задаёт только поворот, а цвета иконок определяет `paletteIndex`.

Полный список токенов — [Chip-ai.md](./Chip-ai.md#дизайн-токены).
Переопределение через `ThemeProvider` описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- Сохранять `forwardRef<HTMLSpanElement>`: ref указывает на корневой `span` из
  `Chip`, а не на контейнер `DatePickerExtended` и не на кнопку очистки.
- Сохранять публичные named exports компонента и интерфейса в barrel семейства
  `Chip`, имена props и их типы.
- Таргет не владеет выбранной датой и не меняет `selected` или `children` после
  `onClear`; это ответственность потребителя.
- Открытость берётся из `DatePickerExtendedContext`, выбранность — из props.
  Не объединять эти независимые состояния.
- Клик на очистке останавливает всплытие и вызывает только `onClear()` без события;
  Enter/Space на ней не должны переключать календарь.
- Служебные props кнопки очистки задаются после `clearButtonProps`: её размер,
  disabled и обработчики не переопределяются этой настройкой.
- Приоритет внешних `postfix` и `aria-expanded` сохранять.

---

## Accessibility

- Корень — `span` с `role="button"`, `tabIndex=0` либо `-1` при `disabled` по
  умолчанию. Это не нативная кнопка: атрибут `disabled` на `span` не ставится.
  Остальные HTML-/ARIA-атрибуты наследуются от `Chip` и могут быть переопределены
  потребителем. `aria-haspopup` автоматически не добавляется.
- Доступное имя таргета задаётся содержимым либо внешним `aria-label`.
  Иконке очистки обязательно передать доступное имя через
  `clearButtonProps={{ "aria-label": "Очистить месяц" }}`.
- Enter/Space на активном таргете переключают открытость с `preventDefault()`.
  Другие клавиши только передаются в `onKeyDown`. При `disabled` переключения нет,
  но пользовательский `onKeyDown` всё равно вызывается; базовый `Chip` дополнительно
  предотвращает стандартное действие Space даже в disabled-состоянии.
- Enter/Space на кнопке очистки останавливают всплытие `keydown`; нативная активация
  кнопки создаёт клик, который также не всплывает. У `disabled`-таргета эта кнопка
  получает нативный `disabled`.
- Escape, ловушка фокуса календаря и возврат фокуса принадлежат `DatePickerExtended`,
  сам таргет ими не управляет.

---

## Связанные компоненты

- `ChipMonthYearPicker` — готовый родитель: вычисляет `selected`, форматирует месяц
  и превращает `onClear()` в `onChange("")`; см.
  [ChipMonthYearPicker-ai.md](./ChipMonthYearPicker-ai.md).
- `Chip` — база props и разметки, размеров, типов, слотов, индикатора и состояний;
  см. [Chip-ai.md](./Chip-ai.md).
- `DatePickerExtended` — provider открытости, календарь и управление фокусом;
  для month/year-композиции ему задают `pickType=ECalendarPickType.MONTH_YEAR`;
  см. [DatePickerExtended-ai.md](../DatePickerExtended/DatePickerExtended-ai.md).
- `ChipClearButton` и `ChipDropdownArrow` — внутреннее наполнение правого слота:
  очистка при `selected`, иначе стрелка с поворотом по открытости контекста.

---

## Stories

Основные истории: `stories/Chips/ChipMonthYearPickerTarget.stories.tsx`
Файлы примеров: `stories/Chips/examples/ChipMonthYearPickerTarget/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Прямые props таргета внутри публичного `DatePickerExtended` |
| `Default` | `Default.tsx` | Управляемая дата, содержимое, `selected`, очистка и публичный `renderTarget` |
| `WithPrefixAndPostfix` | `WithPrefixAndPostfix.tsx` | Левый слот, уведомление и замена внутреннего postfix |
| `VisualTests` | `VisualTests.tsx` | Фокус, реальный hover, disabled с выбранным/пустым значением и настройки clearButtonProps |

Размеры, типы и открытый календарь дополнительно покрыты существующими stories
`ChipMonthYearPicker`; новая VisualTests проверяет недостающие состояния таргета.
`Default`, `WithPrefixAndPostfix` и `VisualTests` участвуют в visual regression
на xs (575px) и xl (1200px); только `Playground` исключён из скриншот-тестов.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-21 | Создан документ; подтверждены прямой публичный API, контекст, приоритет props и клавиатурный контракт. Добавлены отдельные примеры и тесты таргета без изменения production-кода. |
| 2026-10-22 | `Default` включён в visual regression на xs/xl по замечанию ревью. |
