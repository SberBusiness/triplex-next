# Учёт покрытия компонентов

Текущие статусы и план AI-Ready находятся в [ROADMAP.md](ROADMAP.md).
Этот документ поясняет, какие части требуют отдельного AI.md, а какие
учитываются в документации родителя.

## Самостоятельные компоненты и внутренние зависимости

Критерии отдельного AI.md заданы в [CONTEXT.md](CONTEXT.md), раздел
«Когда создавать `{ComponentName}-ai.md`». При учёте публичного API проверяются
как именованные экспорты, так и статические части составных компонентов,
включая вложенные пути вроде `MasterTable.TableFooter.Summary.Amount`.

`AdvancedMouseSensor` и `AdvancedTouchSensor` — служебные DnD-классы, а не
React-компоненты; их контракт относится к `ListSortable`. `DesignTokens` —
инфраструктура токенов. `FocusTrapExtended`, `AbstractTree`, `AccordionBase`
и прочие части, не доступные через публичный barrel/составной API, относятся
к внутренним зависимостям.

Переэкспорты уже учтённых частей (например, `Page.Header.Subhead`) не создают
новые строки. `TreeViewNodeWithContext` — реализация того же `TreeView.Node`,
который описан в `TreeViewNode-ai.md`; для них учитывается одна строка
`TreeViewNode`.

## Части, учитываемые в документации родителя

Размер, отступ, выбор иконки, типографика и передача props сами по себе
не считаются самостоятельной логикой. Перечисленные ниже обёртки делегируют
описанный API/стили родителю, не вводя самостоятельный контракт;
отдельный AI.md для них не требуется.

Для семейства List действует явное исключение из `CONTEXT.md`, включая
`ListItemContent` и `ListSortableItemTarget`. Уже существующие AI.md
не удаляются только из-за более подробного прежнего учёта.

| Семейство | Части без отдельного AI.md | Где описываются |
|---|---|---|
| Badge | `BadgeDot` | [Документация родителя](../../src/components/Badge/Badge-ai.md) |
| Card | `CardContentBody`, `CardContentHeader`, `CardContentFooter`, `CardMedia`, `CardContent` | [Документация родителя](../../src/components/Card/CardStatic-ai.md) |
| Carousel | `CarouselTrack` | Документация семейства |
| Confirm | `ConfirmContent`, `ConfirmContentTitle`, `ConfirmContentSubTitle`, `ConfirmControls` | [Документация родителя](../../src/components/Confirm/Confirm-ai.md) |
| Chip | `ChipIcon`, `ChipClearButton`, `ChipDropdownArrow` | [Документация родителя](../../src/components/Chip/Chip-ai.md) |
| Dropdown | `DropdownMobileBody`, `DropdownMobileClose`, `DropdownMobileFooter`, `DropdownMobileInput`, `DropdownMobileLoader`, `DropdownMobileHeader` | [Документация родителя](../../src/components/Dropdown/Dropdown-ai.md) |
| Footer | `FooterDescription`, `FooterDescriptionControls`, `FooterDescriptionContent` | [Документация родителя](../../src/components/Footer/Footer-ai.md) |
| Header | `HeaderLayoutSidebar`, `HeaderLayoutSidebarContent`, `HeaderLayoutSidebarSidebar`, `HeaderTabs`, `HeaderTabsContent`, `HeaderTabsControls`, `HeaderTitle`, `HeaderTitleContent`, `HeaderTitleControls`, `HeaderSubheader` | [Документация родителя](../../src/components/Header/Header-ai.md) |
| Island | `IslandBody`, `IslandHeader`, `IslandFooter` | [Документация родителя](../../src/components/Island/Island-ai.md) |
| IslandAccordion | `IslandAccordionContent`, `IslandAccordionFooter` | [Документация родителя](../../src/components/IslandAccordion/IslandAccordion-ai.md) |
| IslandWidget | `IslandWidgetHeaderContent`, `IslandWidgetHeaderTitle`, `IslandWidgetHeaderControls`, `IslandWidgetFooterContent`, `IslandWidgetFooterControls`, `IslandWidgetHeader`, `IslandWidgetHeaderDescription`, `IslandWidgetBody`, `IslandWidgetFooter` | [Документация родителя](../../src/components/IslandWidget/IslandWidget-ai.md) |
| LightBox | `LightBoxControls`, `LightBoxSideOverlayCloseMobile` | [Документация родителя](../../src/components/LightBox/LightBox-ai.md) |
| List | `ListItemControls`, `ListItemContent`, `ListEmptyState`, `ListItemLoading`, `ListItemTailLeft`, `ListItemTailRight`, `ListSortableItemTarget`, `ListSortableItemControls` | [Документация родителя](../../src/components/List/List-ai.md) |
| ListMaster | `ListMasterBody`, `ListMasterChipGroup`, `ListMasterFooterControls`, `ListMasterFooterDescription`, `SelectionControls` | [Документация родителя](../../src/components/ListMaster/ListMaster-ai.md) |
| ModalWindow | `ModalWindowBody`, `ModalWindowFooter`, `ModalWindowHeader`, `ModalWindowContent` | [Документация родителя](../../src/components/ModalWindow/ModalWindow-ai.md) |
| MultiselectField | `MultiselectFieldDropdownHeader`, `MultiselectFieldDropdownFooter` | [Документация родителя](../../src/components/MultiselectField/MultiselectField-ai.md) |
| Notification | `NotificationIcon`, `NotificationBody`, `NotificationHeader`, `NotificationBodyContent`, `NotificationFooter`, `NotificationBodyList`, `NotificationClose`, `NotificationTime` | [Документация родителя](../../src/components/Notification/Notification-ai.md) |
| OrderedList | `OrderedListItem` | [Документация родителя](../../src/components/OrderedList/OrderedList-ai.md) |
| Pagination | `PaginationNavigationExtended`, `PaginationNavigationExtendedItem`, `PaginationPageEllipsis` | [Документация родителя](../../src/components/Pagination/Pagination-ai.md) |
| SliderExtended | `SliderExtendedMarks` | [Документация родителя](../../src/components/SliderExtended/SliderExtended-ai.md) |
| StatusTracker | `StatusTrackerHeader`, `StatusTrackerFooter`, `StatusTrackerTitle`, `StatusTrackerDescription`, `StatusTrackerMedia`, `StatusTrackerBody`, `StatusTrackerButton`, `StatusTrackerAlert`, `StatusTrackerStatusGroup`, `StatusTrackerSum`, `StatusTrackerStatus` | [Документация родителя](../../src/components/StatusTracker/StatusTracker-ai.md) |
| SuggestField | `SuggestFieldMobileDropdownHint` | [Документация родителя](../../src/components/SuggestField/SuggestField-ai.md) |
| Table | `TableFooter`, `NoColumns`, `FilterPanel`, `ChipPanel`, `PaginationPanel`, `TableFooterSummarySelectedCount`, `ChipPanelLinks`, `TableBasicSettingsBody`, `ColumnSettingsStaticListItem`, `TableBasicSettingsFooter`, `TableBasicSettingsHeader`, `TableFooterSummary`, `TableFooterSummaryAmount`, `ColumnSettingsStaticList` | [Документация родителя](../../src/components/Table/MasterTable-ai.md) |
| TreeView | `TreeViewGroup` | [Документация родителя](../../src/components/TreeView/TreeView-ai.md) |
| UnorderedListExtended | `UnorderedListExtendedItem`, `UnorderedListExtendedItemMarker` | [Документация родителя](../../src/components/UnorderedListExtended/UnorderedListExtended-ai.md) |
| CollapsibleTree | `CollapsibleTreeNodeLabel` | [Документация родителя](../../src/components/CollapsibleTree/CollapsibleTree-ai.md) |
| ImageGalleryExtended | `ImageGalleryExtendedArrow`, `ImageGalleryExtendedThumb` | [Документация родителя](../../src/components/ImageGalleryExtended/ImageGalleryExtended-ai.md) |
| Overlay | `OverlayMask` | [Документация родителя](../../src/components/Overlay/Overlay-ai.md) |
| SelectExtendedField | `SelectExtendedFieldDropdown` | [Документация родителя](../../src/components/SelectExtendedField/SelectExtendedField-ai.md) |
| Stepper | `StepperStepIcon` | [Документация родителя](../../src/components/Stepper/Stepper-ai.md) |
| TabsExtended | `TabsExtendedContent` | [Документация родителя](../../src/components/TabsExtended/TabsExtended-ai.md) |
| Tooltip | `TooltipBody`, `TooltipMobileHeader` | [Документация родителя](../../src/components/Tooltip/Tooltip-ai.md) |

## Основные Storybook-примеры и визуальная регрессия

Колонка **Storybook examples** оценивает основные документационные stories:
отдельные файлы примеров, реэкспорт через `index.ts`, исходный код в
`docs.source.code` через `?raw` и публичные импорты пакета.
Структура и правила миграции описаны в [stories-guide.md](stories-guide.md).
Существующие имена `*Example.tsx` допустимы согласно разделу «Именование
файлов примеров» этого руководства.

Дополнительный legacy-файл для визуальной регрессии допустим, если основные
копируемые примеры компонента соответствуют modern pattern. Для `LightBox`
основной файл — `stories/LightBox/LightBox.stories.tsx`, примеры находятся в
`stories/LightBox/examples/`. Дополнительный
`stories/LightBox/LightBoxInitialOpened.stories.tsx` используется для
скриншот-тестов и сохраняет legacy pattern.

Разрешение сохранять legacy pattern при мелкой правке само по себе
не подтверждает колонку **Storybook examples**.
