---
component: Puller
category: Puller
related: [Overlay, ButtonIcon, LoaderSmall, Badge, FormField]
tokens:
  - Puller.Backdrop
  - Puller.Body_Background
  - Puller.Border_Color
  - Puller.Footer_Background
  - Puller.Header_Background
  - PullerList.Active_Background
  - PullerList.Selected_Background
  - FormField.Input_Color_Default
  - FormField.Placeholder_Color
stories: stories/Puller/Puller.stories.tsx
version: "1.0"
---

# Puller

## Назначение

Нижняя всплывающая шторка (bottom sheet) для мобильных сценариев. Выезжает снизу на всю ширину экрана поверх затемняющей подложки, высота ограничена половиной экрана (`max-height: 50vh`). Закрывается по тапу или клику на подложку. Пока шторка открыта, скролл страницы заблокирован. Построена на `OverlayBase`. Разметка собирается из шапки, тела и футера. Остальные субкомпоненты — их части: список кладётся в тело, поле ввода, лоадер и кнопка закрытия — в шапку.

Это бывший `DropdownMobile`. Его рендерят мобильные версии `Dropdown` (через `pullerProps`) и `Tooltip`. Через `Dropdown` его используют `SuggestField`, `SelectExtendedField` / `SelectField` / `MultiselectField`, `DatePickerExtended` / `DateField`, `ButtonDropdown`, `ChipSuggest`, `ChipDatePicker` и `ListItemControlsButtonDropdown`.

Используй когда: нужна нижняя шторка с произвольным содержимым на мобильном экране, а адаптивное переключение `Dropdown` не подходит. Например, шторка открывается не от выпадающего меню.
Не используй когда:

- нужен выпадающий блок, который на десктопе — меню, а на мобильном — шторка. Используй `Dropdown` с `pullerProps`: он сам переключает версии через `MobileView`;
- нужна подсказка — используй `Tooltip`, его мобильная версия уже построена на `Puller`;
- нужно модальное окно или боковая панель — используй `ModalWindow` или `Overlay`.

---

## Варианты и props

### `Puller`

`IPullerProps` расширяет `React.HTMLAttributes<HTMLDivElement>`. Атрибуты распределяются так: `className` попадает на фиксированный wrapper (`.pullerWrapper`), всё остальное (`id`, `role`, `aria-*`, `style`, обработчики) — на контентный `<div>` (`.puller`), туда же ведёт `ref`.

#### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `opened` | `boolean` | Состояние открытости: компонент полностью управляемый, собственного state открытости нет |
| `setOpened` | `(opened: boolean) => void` | Вызывается с `false` по `touchstart` / `mousedown` на подложке (только когда `opened === true`) |

#### Опциональные props

Собственных опциональных props нет. Остальное — стандартные HTML-атрибуты `<div>`, распределение которых описано выше.

### Субкомпоненты

| Компонент | Собственные props | Описание |
|---|---|---|
| `PullerHeader` | `controlButtons?: ReactNode` | Шапка. `children` — слева (сжимается, `min-width: 0`), `controlButtons` — справа: обычно `PullerLoader` и `PullerClose` |
| `PullerBody` | — | Скроллируемое тело (`overflow: auto`, `flex-grow: 1`) |
| `PullerFooter` | — | Футер для кнопок, с верхней границей |
| `PullerClose` | `IButtonIconProps` без `children` | Кнопка закрытия: `ButtonIcon` с иконкой-крестиком. Сама шторку не закрывает: `onClick` и `aria-label` передаёт потребитель |
| `PullerList` | `loading?: boolean` | Контейнер списка с `role="listbox"`. При `loading` в конец добавляется элемент-лоадер (`PullerListItem` с `LoaderSmall` MD) |
| `PullerListItem` | `id: string`, `onSelect?`, `selected?`, `showNotificationIcon?` | Элемент списка с `role="option"`. `onSelect` вызывается по клику до `onClick`. Строковый `children` дублируется в `title` |
| `PullerLoader` | `ILoaderSmallProps` без `theme` / `size` | Лоадер для шапки: `LoaderSmall`, тема `BRAND`, размер SM |
| `PullerInput` | `InputHTMLAttributes` | Нативный `<input>` для шапки, без рамки и фона |
| `PullerMaskedInput` | `IFormFieldMaskedInputProps` | Маскированное поле для шапки: обёртка над `FormFieldMaskedInput` со статическим `presets` (тот же объект, что у `FormFieldMaskedInput`). Используется в `DateField` и `ChipDatePicker` |
| `PullerInner` | `IOverlayChildrenProvideProps` | Внутренняя разметка: подложка и контент с анимацией. Его рендерит `Puller` в render-prop `OverlayBase`, напрямую не используется |

### Ограничения

- Шторка не закрывается по `Escape` и не перехватывает фокус. Если нужен focus trap или закрытие с клавиатуры, их добавляет потребитель (так делают `MultiselectField.Dropdown` и `DatePickerExtended`).
- Высота ограничена `50vh`. Длинное содержимое должно лежать в `PullerBody`: он прокручивается, а шапка и футер остаются на месте.
- `PullerLoader` — `React.FC` без `forwardRef`, ref на него не передаётся.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию лежат в файлах групп `Puller` и `PullerList` в `src/components/DesignTokens/components/`.

```text
Puller.Backdrop
Puller.Body_Background
Puller.Border_Color
Puller.Footer_Background
Puller.Header_Background
PullerList.Active_Background
PullerList.Selected_Background
```

`PullerInput` дополнительно использует токены поля ввода: `FormField.Input_Color_Default`, `FormField.Placeholder_Color`.

---

## Инварианты

- `forwardRef` на `Puller` и всех субкомпонентах, кроме `PullerLoader`, — не убирать. Ref `Puller` указывает на контентный `<div>` (`.puller`), а не на wrapper. На это опирается `Dropdown`: его ref в мобильном режиме ведёт сюда.
- В закрытом состоянии (`opened`, `opening` и `closing` равны `false`) `PullerInner` возвращает `null`. Анимация закрытия доигрывает до `transitionend` на подложке и только потом снимает разметку.
- Непрозрачность подложки задаётся токеном `Puller.Backdrop` (альфа-канал), а не `opacity`: у открытой подложки `opacity: 1`. Не возвращать `opacity` через CSS-переменную.
- Анимация открытия требует сначала отрендерить шторку закрытой: `openingState` / `openedState` выставляются через `setTimeout`. Не заменять на синхронную установку, иначе переход не проиграется.
- Пока `opened === true`, на `document.body` висит класс `pullerScrollLock` (`overflow: hidden`). Снимает его только cleanup эффекта — при закрытии и при размонтировании. Закрытый `Puller` класс не трогает: иначе монтирование закрытой шторки снимало бы блокировку, поставленную другой, открытой. Счётчика открытых экземпляров нет: закрытие одной из двух открытых шторок снимает блокировку целиком.
- Компонент управляемый: не добавлять внутренний state открытости.
- Корневые классы `.puller`, `.pullerWrapper`, `.pullerBackdrop` используют unit-тесты потребителей (`MultiselectFieldDropdown.test.tsx`, `SuggestFieldMobile.test.tsx`) и внешние потребители, которые ищут шторку в DOM. Переименование — breaking change.
- У `PullerList` нет собственного класса-зацепки, в отличие от десктопного `.dropdownDesktopList`. Это осознанно: стилизуются только элементы списка и лоадер. Корневой `<div>` получает только внешний `className`. Не добавлять пустое правило в LESS ради зацепки без задачи.
- `IPullerHeaderProps` объявлен в `PullerHeader.tsx`, его расширяет `ITooltipMobileHeaderProps` (`src/components/Tooltip/types.ts`). Перенос типа ломает deep-импорты.
- Публичный barrel `src/components/Puller/index.ts` (включая `PullerMaskedInput`) должен сохраняться.

---

## Accessibility

- Роль диалога шторка сама не ставит: `role="dialog"` и `aria-label` / `aria-labelledby` потребитель передаёт на `Puller` (они попадают на контентный `<div>`).
- `PullerList` — `role="listbox"`, `PullerListItem` — `role="option"` с `aria-selected`. Клавиатурной навигации по списку нет: в отличие от `DropdownList`, мобильный список рассчитан на касание.
- `PullerClose` — кнопка-иконка без текста: `aria-label` обязан передать потребитель, компонент не хардкодит строки (библиотека мультиязычная). Внутренние потребители `ButtonDropdown`, `SelectExtendedFieldDropdownDefault`, `DatePickerExtendedDropdown`, `ListItemControlsButtonDropdown`, `SuggestMobileDropdownContent` и `SuggestFieldMobileDropdown` сейчас рендерят `PullerClose` без `aria-label`. `TooltipMobileCloseButton` прокидывает props потребителя, в том числе `aria-label`.
- `PullerInput` — нативный `<input>` без видимой подписи: `aria-label` передаёт потребитель.
- Фокус компонент не перехватывает и не возвращает, `Escape` не обрабатывает.

---

## Связанные компоненты

- `Overlay` — семейство, к которому относится `OverlayBase`: `Puller` рендерит `OverlayBase` с `direction={EOverlayDirection.BOTTOM}` и получает от него флаги `opening` / `closing` и сеттеры анимации.
- `ButtonIcon` — база `PullerClose`, `IPullerCloseProps` расширяет `IButtonIconProps`.
- `LoaderSmall` — рендерится в `PullerLoader` (тема `BRAND`, SM) и в элементе-лоадере `PullerList` (MD). `IPullerLoaderProps` расширяет `ILoaderSmallProps`.
- `Badge` — `Badge.Dot` в углу `PullerListItem` при `showNotificationIcon`.
- `FormField` — `PullerMaskedInput` оборачивает `FormFieldMaskedInput` и наследует `IFormFieldMaskedInputProps`. Токены поля ввода использует `PullerInput`.
- `Text` — `PullerListItem` рендерится как `Text` размера `B3`. В `related` не вынесен: связь узкая.
- `Dropdown`, `Tooltip` — главные потребители: в адаптивном режиме рендерят `Puller` вместо десктопной версии. Ссылка на `Puller` стоит с их стороны.
- `MobileView` — переключает десктопную и мобильную версии в `Dropdown` и `Tooltip`. Сам `Puller` ширину экрана не проверяет.

---

## Stories

Основные истории: `stories/Puller/Puller.stories.tsx`
Файлы примеров: `stories/Puller/examples/`

Все stories показываются только на узком экране (меньше 768px): декоратор `withNarrowScreen` на широком экране, в том числе на docs-странице, выводит подсказку вместо примера. Отдельно открытая story сразу показывается во viewport `XS`. Декоратор не попадает в исходный код примеров, поэтому их можно копировать без правок.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль: начальное `opened`, заголовок, `loading` списка, наличие футера |
| `Default` | `Default.tsx` | Кнопка открывает шторку: шапка с заголовком и `PullerClose`, тело, футер с кнопкой |
| `WithList` | `WithList.tsx` | `PullerList` с выбранным элементом, значком уведомления и `loading`; выбор закрывает шторку |
| `WithInput` | `WithInput.tsx` | Шапка с `PullerInput`, `PullerLoader` и `PullerClose` — раскладка мобильного suggest |
| `SMSPuller` («Example: SMSPuller») | `SMSPuller.tsx` | Подтверждение операции СМС-кодом в `PullerBody`: заголовок, описание, `SMSField` с обратным отсчётом на кнопке повторного запроса и подпись под полем. Отправка кода закрывает шторку |
| `VisualTests` | `VisualTests.tsx` | Длинный заголовок, лоадер, скролл длинного списка, выбранный элемент, значок, футер с двумя кнопками |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-21 | Создан документ (TRIPLEX-961). `Puller` выделен из `src/components/Dropdown/mobile/` (бывший `DropdownMobile*`): компоненты, типы, токены (`Content_Background` → `Body_Background`) и CSS-классы переименованы, `PullerMaskedInput` экспортируется из barrel. Исправлено: монтирование закрытой шторки снимало блокировку скролла, поставленную другой, открытой. Удалён модификатор `.closing`, неопределённая `--triplex-DropdownMobile-Opacity` заменена на `opacity: 1`. Проведён AI-рефакторинг, добавлены stories `stories/Puller/`. |
