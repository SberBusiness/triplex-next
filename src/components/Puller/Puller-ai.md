---
component: Puller
category: Puller
related: [Overlay, Portal, ButtonIcon, LoaderSmall, Badge, FormField]
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

Нижняя шторка (bottom sheet) на базе `OverlayBase` для экранов любой ширины: выезжает снизу на всю ширину поверх подложки.

Используй когда: нужна шторка, которая открывается не от выпадающего меню.
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

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `renderContainer` | `Element \| DocumentFragment` | `document.body` | DOM-узел, в который рендерится шторка |
| `focusTrapProps` | `IFocusTrapExtendedProps` | — | Свойства ловушки фокуса (`FocusTrapExtended`). Ловушка включена по умолчанию; отключается через `{ active: false }` |

Остальные — HTML-атрибуты `<div>`.

### Субкомпоненты

| Компонент | Собственные props | Описание |
|---|---|---|
| `PullerHeader` | `controlButtons?: ReactNode` | Шапка. `children` — слева (сжимается, `min-width: 0`), `controlButtons` — справа: обычно `PullerLoader` и `PullerClose` |
| `PullerBody` | — | Скроллируемое тело (`overflow: auto`, `flex-grow: 1`) |
| `PullerFooter` | — | Футер для кнопок, с верхней границей |
| `PullerClose` | `IButtonIconProps` без `children` | Кнопка закрытия: `ButtonIcon` с иконкой-крестиком. Сама шторку не закрывает: `onClick` и `aria-label` передаёт потребитель |
| `PullerList` | `loading?: boolean` | Контейнер списка с `role="listbox"`. При `loading` в конец добавляется `LoaderSmall` MD, скрытый от скринридеров (`aria-hidden`): загрузку передаёт `aria-busy` на `listbox` |
| `PullerListItem` | `id: string`, `onSelect?`, `selected?`, `showNotificationIcon?`, `keyCodesForSelection?` | Элемент списка с `role="option"`. `onSelect` вызывается по клику до `onClick`, с клавиатуры — через `PullerList` по `keyCodesForSelection`. Строковый `children` дублируется в `title` |
| `PullerLoader` | `ILoaderSmallProps` без `theme` / `size` | Лоадер для шапки: `LoaderSmall`, тема `BRAND`, размер SM |
| `PullerInput` | `InputHTMLAttributes` | Нативный `<input>` для шапки, без рамки и фона |
| `PullerMaskedInput` | `IFormFieldMaskedInputProps` | Маскированное поле для шапки: обёртка над `FormFieldMaskedInput` со статическим `presets` (тот же объект, что у `FormFieldMaskedInput`) |

### Ограничения

- `.pullerWrapper` — `position: fixed`: `transform`, `filter`, `perspective`, `contain` или собственный stacking context у `renderContainer` и его родителей сдвинут, обрежут или перекроют шторку.
- Пока шторка открыта, скролл блокируется на `body`, а не на `renderContainer`.
- Шторка удерживает фокус внутри (как `LightBox`) — см. «Accessibility». Если внутри своя ловушка (`MultiselectField.Dropdown`), передай `focusTrapProps={{ active: false }}`: вложенные ловушки конфликтуют.
- Высота ограничена `50vh`: длинное содержимое кладётся в прокручиваемый `PullerBody`.

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
- `Puller` рендерится через `Portal`, по умолчанию в `document.body`. Смена контейнера по умолчанию — breaking change для потребителей, которые ищут шторку в DOM.
- В закрытом состоянии (`opened`, `opening` и `closing` равны `false`) `PullerInner` возвращает `null`. Анимация закрытия доигрывает до `transitionend` на подложке и только потом снимает разметку.
- Непрозрачность подложки задаётся альфа-каналом токена `Puller.Backdrop`; `opacity` подложки только анимирует появление (0 → 1).
- Анимация открытия требует сначала отрендерить шторку закрытой: `openingState` / `openedState` выставляются через `setTimeout`. Не заменять на синхронную установку, иначе переход не проиграется.
- Пока `opened === true`, на `document.body` висит класс `pullerScrollLock` (`overflow: hidden`). Класс вешается только через `lockBodyScroll` (`src/utils/scroll/bodyScrollLock.ts`): прямой `classList.remove` снял бы блокировку при другой открытой шторке.
- Компонент управляемый: не добавлять внутренний state открытости.
- На корневые классы `.puller`, `.pullerWrapper`, `.pullerBackdrop` опираются тесты `MultiselectFieldDropdown.test.tsx` и `SuggestFieldMobile.test.tsx`. Переименование — breaking change.
- Клавиатурную навигацию `PullerList` берёт из `src/components/Dropdown/listUtils.ts` (`createListKeyDownHandler` и хелперы активного элемента) — это тот же код, что у `DropdownList`: правки там меняют поведение обоих списков.
- `IPullerHeaderProps` объявлен в `PullerHeader.tsx`, его расширяет `ITooltipMobileHeaderProps` (`src/components/Tooltip/types.ts`). Перенос типа ломает deep-импорты.
- Публичный barrel `src/components/Puller/index.ts` (включая `PullerMaskedInput`) должен сохраняться. `PullerInner` — внутренняя разметка, в barrel не входит.

---

## Accessibility

- Роль диалога шторка сама не ставит: `role="dialog"` и `aria-label` / `aria-labelledby` потребитель передаёт на `Puller` (они попадают на контентный `<div>`).
- Ловушка фокуса включена по умолчанию и активна, пока `opened === true`; `preventScroll: true`, `escapeDeactivates: false`, `initialFocus` и `fallbackFocus` на контентный `<div>` (ему ставится `tabIndex={-1}`, если потребитель не передал свой) заданы по умолчанию и переопределяются через `focusTrapProps.focusTrapOptions`. Отключение — `focusTrapProps={{ active: false }}` (`tabIndex={-1}` тогда не ставится). Клик по подложке закрывает шторку.
- При открытии фокус получает контентный `<div>`, а не первый tabbable: иначе появляется обводка на кнопке закрытия и выделяется текст поля. Элемент, уже сфокусированный внутри шторки (поле с `autoFocus`), фокус сохраняет. Чтобы поле получало фокус при каждом открытии, свой `initialFocus` вызывает у него `focus()` и возвращает его — как в story `WithInput`.
- Во время анимации закрытия обёртка получает `pointer-events: none` (класс `closing`): шторка закрыта с момента `setOpened(false)`, и клики проходят к странице.
- При закрытии ловушка возвращает фокус на элемент, который был в фокусе до открытия (паттерн модального диалога WAI-ARIA APG), в том числе после тапа: иначе курсор VoiceOver / TalkBack теряет контекст. Если триггер открывает шторку по фокусу, возвратный фокус он должен пропускать, а не отключать возврат: флаг между `focusTrapOptions.onDeactivate` и `onPostDeactivate`, как в `SuggestFieldMobile`.
- `Escape` закрывает шторку (`setOpened(false)`), когда фокус внутри неё; от ловушки не зависит. Всплытие события останавливается (`stopPropagation`): внешняя шторка и модальное окно со слушателем на `window` не закрываются. Компонент внутри шторки, который сам обрабатывает `Escape` и останавливает всплытие (например, `Suggest` с открытым списком), шторку не закрывает.
- `PullerList` — `role="listbox"`, `PullerListItem` — `role="option"` с `aria-selected`. Клавиатурная навигация включается оборачиванием в `DropdownListContext.Provider` со значением из `useDropdownListKeyboard`: фокус остаётся на поле ввода (`aria-activedescendant`), `ArrowUp` / `ArrowDown` двигают активный элемент по кругу, `keyCodesForSelection` (по умолчанию пробел и `Enter`) вызывают `onSelect`. Без провайдера и до первого нажатия активного элемента нет. `PullerListItem` должен быть прямым child `PullerList`.
- `PullerClose` — кнопка-иконка без текста: `aria-label` передаёт потребитель. `ButtonDropdown`, `SelectExtendedFieldDropdownDefault`, `DatePickerExtendedDropdown`, `ListItemControlsButtonDropdown`, `SuggestMobileDropdownContent` и `SuggestFieldMobileDropdown` его пока не передают.
- `PullerInput` — нативный `<input>` без видимой подписи: `aria-label` передаёт потребитель.

---

## Связанные компоненты

- `Overlay` — семейство, к которому относится `OverlayBase`: `Puller` рендерит `OverlayBase` с `direction={EOverlayDirection.BOTTOM}` и получает от него флаги `opening` / `closing` и сеттеры анимации.
- `Portal` — выносит шторку из дерева родителя, см. «Инварианты».
- `ButtonIcon` — база `PullerClose`, `IPullerCloseProps` расширяет `IButtonIconProps`.
- `LoaderSmall` — рендерится в `PullerLoader` (тема `BRAND`, SM) и в элементе-лоадере `PullerList` (MD). `IPullerLoaderProps` расширяет `ILoaderSmallProps`.
- `Badge` — `Badge.Dot` в углу `PullerListItem` при `showNotificationIcon`.
- `FormField` — `PullerMaskedInput` оборачивает `FormFieldMaskedInput` и наследует `IFormFieldMaskedInputProps`. Токены поля ввода использует `PullerInput`.
- `Text` — `PullerListItem` рендерится как `Text` размера `B3`.
- `Dropdown`, `Tooltip` — в адаптивном режиме рендерят `Puller` вместо десктопной версии.
- `MobileView` — переключает версии в `Dropdown` и `Tooltip`; сам `Puller` ширину экрана не проверяет.

---

## Stories

Основные истории: `stories/Puller/Puller.stories.tsx`
Файлы примеров: `stories/Puller/examples/`

Примеры стартуют закрытыми. Шторку открывает `play`; на docs-странице (`viewMode === "docs"`) он ничего не делает.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль: начальное `opened`, заголовок, `listLoading` (`loading` списка), наличие футера |
| `Default` | `Default.tsx` | Кнопка открывает шторку: шапка с заголовком и `PullerClose`, тело, футер с кнопкой |
| `WithList` | `WithList.tsx` | `PullerList` с выбранным элементом, значком уведомления и `loading`; выбор закрывает шторку |
| `WithInput` | `WithInput.tsx` | Шапка с `PullerInput`, `PullerLoader` и `PullerClose` — раскладка мобильного suggest; список фильтруется по вводу (заглушка «Nothing found» при пустом результате), `useDropdownListKeyboard`: стрелки и `Enter` выбирают элемент |
| `RenderContainer` («Render container») | `RenderContainer.tsx` | Рендер шторки в заданный контейнер через `renderContainer` |
| `VisualTests` | `VisualTests.tsx` | Длинный заголовок, лоадер, скролл длинного списка, выбранный элемент, значок, футер с двумя кнопками |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-21 | Создан документ (TRIPLEX-961). |
| 2026-10-31 | **Breaking**: `Puller` сам рендерится через `Portal`: по умолчанию в `document.body`, контейнер задаёт новый prop `renderContainer` (TRIPLEX-961). |
| 2026-11-26 | Добавлен prop `focusTrapProps`: ловушка фокуса включена по умолчанию, отключается через `{ active: false }`. Шторка закрывается по `Escape`, когда фокус внутри неё, и останавливает всплытие события: внешняя шторка и модальное окно не закрываются. `PullerList` поддерживает клавиатурную навигацию внутри `DropdownListContext.Provider` (`useDropdownListKeyboard`); добавлен prop `PullerListItem.keyCodesForSelection`. При открытии фокус ставится на контентный `<div>` (`initialFocus`), а не на первый tabbable; уже сфокусированный внутри элемент сохраняет фокус. Во время анимации закрытия шторка пропускает клики и тапы к странице; содержимое больше не монтируется заново в начале закрытия (исправлено в `OverlayBase`; TRIPLEX-1054). |
