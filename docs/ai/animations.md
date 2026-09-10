# Анимации компонентов — Triplex-Next

Инвентаризация анимаций публичных компонентов (barrel `src/index.ts` → `src/components/index.ts`).
Анимацией считаются `transition` / `animation` / `@keyframes` в LESS-модулях и inline-стили в TSX.
Компоненты сгруппированы по одинаковым параметрам анимации.

Общие ресурсы:

- `src/styles/transitions.less` — миксин `.smooth-transition(@duration: 0.2s, @timing-function: ease-in-out)`
  для `background-color`, `border-color`, `box-shadow`, `color`.
- `src/styles/keyframes.less` — миксины `.keyframes-fadeIn()`, `.keyframes-fadeOut()`, `.keyframes-spin360()`
  (`spin360` объявлен, но не используется ни одним компонентом).
- `react-transition-group` — только в `ExpandAnimation` (`Transition`) и `ModalWindow` (`CSSTransition`).

## Таблица

| Группа | Компоненты | Анимируемое свойство | Длительность | Timing | Примечание |
|---|---|---|---|---|---|
| Поворот каретки | Spoiler, IslandWidget (Header), IslandAccordion (Item), ButtonDropdown, ButtonDropdownExtended, TabsLine (Dropdown), AlertProcess (кнопка раскрытия) | `transform` rotate(-180deg) | 0.3s | ease-in-out | |
| Поворот каретки | ChipDropdownArrow (+ ChipSelect, ChipMultiselect, ChipSuggest, ChipSort, ChipDatePicker), SelectExtendedFieldTarget / SelectExtendedField, CheckboxTreeExtended | `transform` rotate(-180deg) | 0.3s | ease | |
| Поворот каретки | CollapsibleTree (NodeHeader), CollapsibleTreeExtended | `transform` rotate(-90deg) | 200ms | ease | |
| Раскрытие по высоте | ExpandAnimation; потребители: IslandWidget, IslandAccordionItem, CollapsibleTreeExtendedNode, TableBasicSettings (ColumnSettingsSortableListItem) | `height` 0 ↔ scrollHeight | 300ms по умолчанию, prop `animationTime` | ease-in-out | `react-transition-group/Transition`, `transitionProps` пробрасываются |
| Раскрытие по высоте | AlertProcess (expandableContent) | `max-height` 0 → 1000px, `opacity` 0 → 1 | 0.3s | ease-in-out | без react-transition-group |
| Выезд панели + маска | Overlay (OverlayPanel, OverlayMask) | панель `transform` translate(±100%) → 0; маска `opacity` 0 → 1 | 0.3s | ease-in-out | стороны top / bottom / left / right |
| Выезд панели + маска | DropdownMobile; через него мобильные режимы Tooltip, SuggestField, SelectExtendedField, SelectField, MultiselectField, DateField, MonthYearField, DatePickerExtended, ButtonDropdown, TabsLine, Chip* | панель `transform` translateY(100%) → 0; backdrop `opacity` 0 → `--triplex-DropdownMobile-Opacity` | 0.3s | ease-in-out | конец по `transitionend` |
| Выезд панели + маска | SwipeableArea | `transform`, `opacity` | .3s | ease-in-out | только на классе завершения свайпа |
| Медленные оверлеи | TopOverlay (в составе LightBox) | панель `transform`; маска `opacity` | панель 0.6s; маска 0.3s | ease (по умолчанию) | |
| Медленные оверлеи | LightBoxSideOverlay (в составе LightBox) | контент `transform` translateY(100%) → 0; маска `opacity` | 0.6s | ease (по умолчанию) | |
| Медленные оверлеи | ModalWindow | вход: обёртка `modalWindowContentAnimationOnEnter` (translate от `-100% - top` к 0) + тело `fadeIn`; выход: `modalWindowContentAnimationOnExit` + `fadeOut` | вход 0.6s + 0.3s; выход 0.3s + 0.3s | ease | `CSSTransition timeout=300`, classNames `global-modalWindowTransition` |
| Появление контролов | Stepper, StepperExtended | кнопки prev/next `opacity` | 0.3s | ease-in-out | |
| Появление контролов | Carousel, CarouselExtended | навигация `opacity`; трек `transform`; индикаторы `background-color` | 0.3s | навигация ease-in-out; трек cubic-bezier(0.5, 0, 0.5, 1); индикатор ease-in, активный ease-out | `prefers-reduced-motion: reduce` → `transition: none` |
| Появление контролов | TableBasic, MasterTable | маска загрузки `fadeIn` (keyframes) | 0.3s | ease (по умолчанию) | keyframe из `src/styles/keyframes.less` |
| Поля ввода (FormField) | FormField, FormFieldLabel, FormFieldInput, FormFieldTextarea, FormFieldTarget, FormFieldClear; потребители: TextField, TextareaField, AmountField, NumberField, MaskedField, DateField, MonthYearField, SMSField, SelectExtendedField, SuggestField, Pagination (PaginationSelect), DropdownMobileInput | лейбл `top`; текст лейбла `font-size, line-height`; плейсхолдер `opacity`; clear `visibility, opacity` | .3s | ease-out (clear — по умолчанию) | контейнер дополнительно `.smooth-transition()` 0.2s ease-in-out; autofill-хак `animation 1ms` + `background-color 5000s` не визуальный |
| Hover/active/focus | Button (+ ButtonDropdown, ButtonDropdownExtended) | `background-color, border-color, box-shadow, color` | 0.2s | ease-in-out | миксин `.smooth-transition()` из `src/styles/transitions.less` |
| Hover/active/focus | CardAction | `background, box-shadow` | 120ms | ease | |
| Hover/active/focus | Page (HeaderPage, FooterPage sticky) | `border-radius, box-shadow` | 0.2s | ease | конец по `transitionend` в `useStickyCornerRadius` |
| Hover/active/focus | TabsLine (TabsLineItem) | подчёркивание `border-color` | 500ms | ease (по умолчанию) | |
| Галочка при выборе | Checkbox, CheckboxXGroup, CheckboxYGroup, Radio, RadioXGroup, RadioYGroup, CheckboxTree, CheckboxTreeExtended | `transform` scale(0) → scale(1) | 200ms | ease-out | только на `:checked` |
| Галерея | ImageGalleryExtended (Main, Arrow, Thumbnails, Dots) | трек `transform`; стрелки `opacity`; миниатюры `border-color`, маска `opacity`; точки `background, width` | трек 0.3s; остальное 0.15s | трек ease-out; стрелки ease; миниатюры и точки ease-in-out | трек анимируется только с классом `animating`, конец по `transitionend`; ImageGallery без анимации |
| Бесконечный цикл | LoaderSmall | точки `opacity` 1 → 0.35 → 0.7 → 1 (`dotCycleSmall`) | 0.9s infinite | ease (по умолчанию) | задержки 0 / 0.15 / 0.3s |
| Бесконечный цикл | LoaderMiddle | точки `opacity` 1 → 0 → 0.15 → 0.7 → 1 (`dotCycleMiddle`); линия `lineCycle` | 3s infinite | ease (по умолчанию) | задержки 0 / 0.74 / 1.5 / 2.25s; встроены в LoaderScreen, Button, DropdownMobileLoader, ListItemLoading, ModalWindow, TableBasic, SuggestField, MultiselectField, SelectExtendedField, Island, LightBox, Chip |
| Бесконечный цикл | Skeleton | `background-color` Start → End → Start (`skeleton-type1/2/3-pulse`) | 2s infinite | ease-in-out | цвета из токенов Skeleton |
| Tooltip | Tooltip (desktop); через него HelpBox, Step, SMSFieldTooltip, Chip, DateField, SuggestField | тултип `opacity, transform` (сдвиг `order * 50px` → 0); хвостик `transform` | тултип 500ms; хвостик 150ms | тултип cubic-bezier(0.230, 1.000, 0.320, 1.000); хвостик ease-in | inline-стили в `TooltipDesktopBase`; закрытие по таймеру 500ms; mobile-версия = DropdownMobile |
| Drag-and-drop | ListSortable, ListSortableItem | `transform` при перестановке | 300ms | по умолчанию dnd-kit | `useSortable({ transition: { duration: 300 } })` |
| Без анимации | Amount, Avatar, Badge, Body, Calendar, CardStatic, Col, Confirm, DateRange, Divider, DocumentNumberEdit, Ellipsis, EmptyView, Footer*, FormGroup, Gap, Header*, IconWrapper, ImageGallery, Island*, KeyDownListener, Link, ListMaster*, Marker, MarkerStatus, MediaWidth, MobileView, Notification, NotificationGrouped, OrderedList, Portal, Row, SegmentedControl, Slider, SliderExtended, SmallInput, StatusTracker*, Tabs, TabsExtended, Tag, TagColor, TagGroup, ThemeProvider, TreeView, TriggerClickOnKeyDownEvent, Typography, UnorderedList, UnorderedListExtended, UploadZone, WindowResizeListener, DesignTokens | — | — | — | Step и HelpBox наследуют Tooltip, Tabs — ButtonDropdown, Island — Loader; миксин `spin360` в keyframes.less не используется |

`*` — включая подкомпоненты (например, `Footer*` = Footer, FooterDescription, FooterDescriptionControls, FooterDescriptionContent).

## Как обновлять

При добавлении или изменении `transition` / `animation` в компоненте:

1. Найди строку группы с такими же параметрами и добавь компонент в неё.
2. Если параметров с таким сочетанием ещё нет — заведи новую строку внутри подходящей группы.
3. Компонент, который получает анимацию только через дочерний (Tooltip, Loader, DropdownMobile, ExpandAnimation), указывай в столбце «Компоненты» или «Примечание» родительской строки, а не отдельной строкой.
