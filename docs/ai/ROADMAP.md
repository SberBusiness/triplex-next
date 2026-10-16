# AI-Ready Design System — Roadmap

Документ отслеживает прогресс перехода Triplex-Next к AI-Ready дизайн-системе.
Обновляй этот файл при завершении каждого этапа.

**Старт:** 2026-03-31

---

## Что значит «AI-Ready»

Triplex-Next считается AI-Ready, когда AI-агент (Claude Code, Cursor, Codex),
работая В ЭТОМ репозитории, может:

1. **Понять компонент по документации** без чтения исходников — `{ComponentName}-ai.md` содержит назначение, props, инварианты, токены, accessibility и stories.
2. **Внести изменение** (добавить prop, исправить баг, провести рефакторинг) согласно `codestyle.md` и инвариантам, не ломая публичный API.
3. **Написать тесты** на новое поведение по правилам `tests.md`.

Готовность измеряется таблицами покрытия ниже: компоненты с нетривиальным
публичным API имеют `AI.md` и прошли AI-рефакторинг. Storybook-примеры
отслеживаются в основной таблице; части составных компонентов проверяются
в существующих stories своего семейства.

→ Достигается выполнением **Фаз 0–1**.

---

## Что значит «Agent-native»

Следующий уровень зрелости — AI-агенты в **сторонних продуктовых проектах**
используют дизайн-систему через MCP-сервер
`@sberbusiness/triplex-next-mcp-server`, не клонируя репозиторий и не читая
файлы напрямую.

Agent-native требует AI-Ready как предусловие: MCP-сервер бесполезен, если
`AI.md` не заполнены или несогласованы между собой. Метрика одна: пакет
опубликован как stable npm-пакет, расширенные tools (`search_components`,
`get_props`, `get_release_notes` и др.) реализованы.

→ Достигается выполнением **Фазы 2**.

---

## Этапы

### Фаза 0: Фундамент
- [x] Анализ репозитория и выбор архитектуры
- [x] Создать `docs/ai/CONTEXT.md` — главный контекстный файл
- [x] Создать `docs/ai/codestyle.md` — обязательные правила TS / React / LESS
- [x] Создать `docs/ai/tests.md` — правила unit / visual / e2e тестирования
- [x] Создать `docs/ai/stories-guide.md` — правила Storybook stories
- [x] Создать `docs/ai/commits.md` — конвенции коммитов и PR-воркфлоу
- [x] Создать `docs/ai/ai-refactoring.md` — правила AI-рефакторинга компонентов
- [x] Создать `docs/ai/template-ai.md` — шаблон документации компонента
- [x] Создать `CLAUDE.md` — entry point для Claude Code
- [x] Создать `AGENTS.md` — entry point для OpenAI Codex
- [x] Создать `.cursor/rules/design-system.mdc` — entry point для Cursor

### Фаза 1: Rollout

> **Как закрывать колонки.** Для прогона компонента через критерии
> соответствующей таблицы используй
> Claude Code агента `ai-ready-builder` — он спланирует объём, запустит
> специализированных субагентов и обновит ROADMAP. Подробности и остальные
> кастомные агенты — в [`.claude/README.md`](../../.claude/README.md).

- [ ] Документировать оставшиеся компоненты (см. таблицы ниже)
- [ ] Приоритет: часто изменяемые компоненты в первую очередь

#### Статус покрытия компонентов

**Что значат колонки (definition of done):**

- **AI.md** — у компонента есть `{ComponentName}-ai.md`, заполненный по `docs/ai/template-ai.md`: frontmatter (component, category, related, tokens, stories, version), Назначение, Варианты и props, Инварианты, Связанные компоненты, Stories с колонкой `Example file`, История изменений. Accessibility — обязательно для интерактивных компонентов.
- **Storybook examples** (для основной таблицы) — есть `.stories.tsx` в modern pattern (`docs/ai/stories-guide.md`): примеры вынесены в подпапку `examples/` рядом со stories-файлом, по отдельному файлу на каждую story (кроме `Playground` / `VisualTests`), и реэкспортированы через `examples/index.ts`. Папка со stories-файлом лежит либо в корне (`stories/{Component}/examples/`), либо внутри категории (`stories/{Category}/{Component}/examples/`). Если в одной папке лежит несколько `.stories.tsx`, примеры дополнительно разложены по подпапкам компонентов: `stories/{Category}/examples/{Component}/`.
- **AI refactoring** — компонент проведён через `docs/ai/ai-refactoring.md`: codestyle-чистка, structural-упрощение, AI-friendliness (JSDoc на всех props), unit-тесты на ключевую логику.

Какие компоненты заслуживают отдельного `*-ai.md` (а какие описываются в родителе)
— см. `docs/ai/CONTEXT.md` → «Когда создавать `{ComponentName}-ai.md`».

**Статусы:** ✅ — критерий подтверждён; ⬜ — файла/прямого примера нет либо работа ещё не завершена; ◐ — код и покрытие семейства уже существуют, но отдельный DoD рефакторинга этой части не подтверждён. При учёте готовности ◐ считается незавершённым, как и ⬜. Готовность родителя сама по себе не закрывает строки его подкомпонентов.

##### Основная таблица

Из 140 компонентов 138 отмечены завершёнными. У `ChipSelect` и `ChipDatePicker`
есть Storybook-примеры, но отсутствуют AI.md и не завершён AI-рефакторинг.

| Компонент | AI.md | Storybook examples | AI refactoring |
|---|---|---|---|
| AlertContext | ✅ | ✅ | ✅ |
| AlertProcess | ✅ | ✅ | ✅ |
| Amount | ✅ | ✅ | ✅ |
| AmountField | ✅ | ✅ | ✅ |
| Avatar | ✅ | ✅ | ✅ |
| Badge | ✅ | ✅ | ✅ |
| Body | ✅ | ✅ | ✅ |
| BodyPage | ✅ | ✅ | ✅ |
| Button | ✅ | ✅ | ✅ |
| ButtonDropdown | ✅ | ✅ | ✅ |
| ButtonDropdownExtended | ✅ | ✅ | ✅ |
| ButtonIcon | ✅ | ✅ | ✅ |
| Calendar | ✅ | ✅ | ✅ |
| Caption | ✅ | ✅ | ✅ |
| CardAction | ✅ | ✅ | ✅ |
| CardStatic | ✅ | ✅ | ✅ |
| CarouselExtended | ✅ | ✅ | ✅ |
| Checkbox | ✅ | ✅ | ✅ |
| CheckboxTree | ✅ | ✅ | ✅ |
| CheckboxTreeExtended | ✅ | ✅ | ✅ |
| CheckboxXGroup | ✅ | ✅ | ✅ |
| CheckboxYGroup | ✅ | ✅ | ✅ |
| Chip | ✅ | ✅ | ✅ |
| ChipDatePicker | ⬜ | ✅ | ⬜ |
| ChipGroup | ✅ | ✅ | ✅ |
| ChipMonthYearPicker | ✅ | ✅ | ✅ |
| ChipMultiselect | ✅ | ✅ | ✅ |
| ChipOptions | ✅ | ✅ | ✅ |
| ChipSelect | ⬜ | ✅ | ⬜ |
| ChipSort | ✅ | ✅ | ✅ |
| ChipSuggest | ✅ | ✅ | ✅ |
| CodeText | ✅ | ✅ | ✅ |
| Col | ✅ | ✅ | ✅ |
| CollapsibleTree | ✅ | ✅ | ✅ |
| CollapsibleTreeExtended | ✅ | ✅ | ✅ |
| ComposedKeyDownListener | ✅ | ✅ | ✅ |
| Confirm | ✅ | ✅ | ✅ |
| DateField | ✅ | ✅ | ✅ |
| DatePickerExtended | ✅ | ✅ | ✅ |
| DateRange | ✅ | ✅ | ✅ |
| Divider | ✅ | ✅ | ✅ |
| DocumentNumberEdit | ✅ | ✅ | ✅ |
| Dropdown | ✅ | ✅ | ✅ |
| Ellipsis | ✅ | ✅ | ✅ |
| EmptyView | ✅ | ✅ | ✅ |
| ExpandAnimation | ✅ | ✅ | ✅ |
| Footer | ✅ | ✅ | ✅ |
| FooterPage | ✅ | ✅ | ✅ |
| FormField | ✅ | ✅ | ✅ |
| FormGroup | ✅ | ✅ | ✅ |
| Gap | ✅ | ✅ | ✅ |
| Header | ✅ | ✅ | ✅ |
| HeaderPage | ✅ | ✅ | ✅ |
| HelpBox | ✅ | ✅ | ✅ |
| IconWrapper | ✅ | ✅ | ✅ |
| ImageGallery | ✅ | ✅ | ✅ |
| ImageGalleryExtended | ✅ | ✅ | ✅ |
| Island | ✅ | ✅ | ✅ |
| IslandAccordion | ✅ | ✅ | ✅ |
| IslandWidget | ✅ | ✅ | ✅ |
| KeyDownListener | ✅ | ✅ | ✅ |
| LightBox | ✅ | ✅ | ✅ |
| Link | ✅ | ✅ | ✅ |
| List | ✅ | ✅ | ✅ |
| ListActionItem | ✅ | ✅ | ✅ |
| ListItem | ✅ | ✅ | ✅ |
| ListItemControlsButton | ✅ | ✅ | ✅ |
| ListItemControlsButtonDropdown | ✅ | ✅ | ✅ |
| ListItemSelectable | ✅ | ✅ | ✅ |
| ListMaster | ✅ | ✅ | ✅ |
| ListMasterFooter | ✅ | ✅ | ✅ |
| ListMasterHeader | ✅ | ✅ | ✅ |
| ListSortable | ✅ | ✅ | ✅ |
| ListSortableItem | ✅ | ✅ | ✅ |
| ListTableItem | ✅ | ✅ | ✅ |
| LoaderMiddle | ✅ | ✅ | ✅ |
| LoaderScreen | ✅ | ✅ | ✅ |
| LoaderSmall | ✅ | ✅ | ✅ |
| Marker | ✅ | ✅ | ✅ |
| MarkerStatus | ✅ | ✅ | ✅ |
| MaskedField | ✅ | ✅ | ✅ |
| MasterTable | ✅ | ✅ | ✅ |
| MediaWidth | ✅ | ✅ | ✅ |
| MobileView | ✅ | ✅ | ✅ |
| ModalWindow | ✅ | ✅ | ✅ |
| MonthYearField | ✅ | ✅ | ✅ |
| MonthYearRange | ✅ | ✅ | ✅ |
| MultiselectField | ✅ | ✅ | ✅ |
| Notification | ✅ | ✅ | ✅ |
| NotificationGrouped | ✅ | ✅ | ✅ |
| NumberField | ✅ | ✅ | ✅ |
| OrderedList | ✅ | ✅ | ✅ |
| Overlay | ✅ | ✅ | ✅ |
| Page | ✅ | ✅ | ✅ |
| PageIndicators | ✅ | ✅ | ✅ |
| Pagination | ✅ | ✅ | ✅ |
| PaginationExtended | ✅ | ✅ | ✅ |
| Portal | ✅ | ✅ | ✅ |
| Radio | ✅ | ✅ | ✅ |
| RadioXGroup | ✅ | ✅ | ✅ |
| RadioYGroup | ✅ | ✅ | ✅ |
| Row | ✅ | ✅ | ✅ |
| SegmentedControl | ✅ | ✅ | ✅ |
| SelectExtendedField | ✅ | ✅ | ✅ |
| SelectField | ✅ | ✅ | ✅ |
| Skeleton | ✅ | ✅ | ✅ |
| Slider | ✅ | ✅ | ✅ |
| SliderExtended | ✅ | ✅ | ✅ |
| SliderRange | ✅ | ✅ | ✅ |
| SmallInput | ✅ | ✅ | ✅ |
| SMSField | ✅ | ✅ | ✅ |
| Spoiler | ✅ | ✅ | ✅ |
| StatusTracker | ✅ | ✅ | ✅ |
| Step | ✅ | ✅ | ✅ |
| Stepper | ✅ | ✅ | ✅ |
| StepperExtended | ✅ | ✅ | ✅ |
| Suggest | ✅ | ✅ | ✅ |
| SuggestField | ✅ | ✅ | ✅ |
| SwipeableArea | ✅ | ✅ | ✅ |
| TableBasic | ✅ | ✅ | ✅ |
| Tabs | ✅ | ✅ | ✅ |
| TabsExtended | ✅ | ✅ | ✅ |
| TabsLine | ✅ | ✅ | ✅ |
| Tag | ✅ | ✅ | ✅ |
| TagColor | ✅ | ✅ | ✅ |
| TagGroup | ✅ | ✅ | ✅ |
| Text | ✅ | ✅ | ✅ |
| TextareaField | ✅ | ✅ | ✅ |
| TextField | ✅ | ✅ | ✅ |
| ThemeProvider | ✅ | ✅ | ✅ |
| Title | ✅ | ✅ | ✅ |
| Tooltip | ✅ | ✅ | ✅ |
| TopOverlay | ✅ | ✅ | ✅ |
| TreeView | ✅ | ✅ | ✅ |
| TreeViewNode | ✅ | ✅ | ✅ |
| TriggerClickOnKeyDownEvent | ✅ | ✅ | ✅ |
| UnorderedList | ✅ | ✅ | ✅ |
| UnorderedListExtended | ✅ | ✅ | ✅ |
| UploadZone | ✅ | ✅ | ✅ |
| WindowResizeListener | ✅ | ✅ | ✅ |

##### Атомы составных компонентов

Для атомов отслеживаются **AI.md** и **AI refactoring**. Примеры использования
и визуальные состояния проверяются в существующих stories компонента или его
родителя. Отдельные stories для каждой части не являются условием завершения.
В разделе Stories AI.md атома можно ссылаться на соответствующие примеры родителя.

| Компонент | AI.md | AI refactoring |
|---|---|---|
| AlertProcessSpoiler | ⬜ | ◐ |
| Carousel | ⬜ | ◐ |
| CarouselIndicators | ⬜ | ◐ |
| CarouselItem | ⬜ | ◐ |
| CarouselNextButton | ⬜ | ◐ |
| CarouselPrevButton | ⬜ | ◐ |
| CarouselViewport | ⬜ | ◐ |
| CheckboxTreeExtendedCheckbox | ⬜ | ◐ |
| CheckboxTreeExtendedNode | ⬜ | ◐ |
| ChipDatePickerTarget | ⬜ | ◐ |
| ChipMonthYearPickerTarget | ⬜ | ◐ |
| ChipSelectTarget | ⬜ | ◐ |
| ChipSuggestTarget | ⬜ | ◐ |
| CollapsibleTreeExtendedNode | ⬜ | ◐ |
| CollapsibleTreeNodeHeader | ⬜ | ◐ |
| ColumnSettings | ⬜ | ◐ |
| ColumnSettingsSortableList | ⬜ | ◐ |
| ColumnSettingsSortableListItem | ⬜ | ◐ |
| ConfirmClose | ⬜ | ◐ |
| DropdownDesktop | ⬜ | ◐ |
| DropdownList | ⬜ | ◐ |
| DropdownListItem | ⬜ | ◐ |
| DropdownMobile | ⬜ | ◐ |
| DropdownMobileInner | ⬜ | ◐ |
| DropdownMobileList | ⬜ | ◐ |
| DropdownMobileListItem | ⬜ | ◐ |
| FormFieldClear | ⬜ | ◐ |
| FormFieldCounter | ⬜ | ◐ |
| FormFieldDescription | ⬜ | ◐ |
| FormFieldInput | ⬜ | ◐ |
| FormFieldLabel | ⬜ | ◐ |
| FormFieldMaskedInput | ⬜ | ◐ |
| FormFieldPostfix | ⬜ | ◐ |
| FormFieldPrefix | ⬜ | ◐ |
| FormFieldTarget | ⬜ | ◐ |
| FormFieldTextarea | ⬜ | ◐ |
| ImageGalleryExtendedMain | ⬜ | ◐ |
| ImageGalleryExtendedNav | ⬜ | ◐ |
| ImageGalleryExtendedPageIndicators | ⬜ | ◐ |
| ImageGalleryExtendedThumbnails | ⬜ | ◐ |
| IslandAccordionItem | ⬜ | ◐ |
| IslandWidgetExtraFooter | ⬜ | ◐ |
| IslandWidgetWrapper | ⬜ | ◐ |
| LightBoxClose | ⬜ | ◐ |
| LightBoxContent | ⬜ | ◐ |
| LightBoxLeftSidebar | ⬜ | ◐ |
| LightBoxNext | ⬜ | ◐ |
| LightBoxPrev | ⬜ | ◐ |
| LightBoxRightSidebar | ⬜ | ◐ |
| LightBoxSideOverlay | ⬜ | ◐ |
| LightBoxSideOverlayCloseDesktop | ⬜ | ◐ |
| MediaBetweenWidth | ⬜ | ◐ |
| MediaMaxWidth | ⬜ | ◐ |
| MediaMinWidth | ⬜ | ◐ |
| ModalWindowClose | ⬜ | ◐ |
| ModalWindowViewManager | ⬜ | ◐ |
| MultiselectFieldDropdown | ⬜ | ◐ |
| MultiselectFieldDropdownContent | ⬜ | ◐ |
| OverlayBase | ⬜ | ◐ |
| OverlayPanel | ⬜ | ◐ |
| PaginationNavigation | ⬜ | ◐ |
| PaginationNavigationButton | ⬜ | ◐ |
| PaginationPageButton | ⬜ | ◐ |
| PaginationSelect | ⬜ | ◐ |
| SegmentedControlSegment | ⬜ | ◐ |
| SelectExtendedFieldTarget | ⬜ | ◐ |
| SliderExtendedDot | ⬜ | ◐ |
| SliderExtendedMark | ⬜ | ◐ |
| SliderExtendedRail | ⬜ | ◐ |
| SliderExtendedTooltip | ⬜ | ◐ |
| SliderExtendedTrack | ⬜ | ◐ |
| SMSFieldInput | ⬜ | ◐ |
| SMSFieldRefresh | ⬜ | ◐ |
| SMSFieldSubmit | ⬜ | ◐ |
| SMSFieldTooltip | ⬜ | ◐ |
| StepperStep | ⬜ | ◐ |
| SuggestFieldDesktop | ⬜ | ◐ |
| SuggestFieldDesktopDropdown | ⬜ | ◐ |
| SuggestFieldMobile | ⬜ | ◐ |
| SuggestFieldMobileDropdown | ⬜ | ◐ |
| TableBasicSettings | ⬜ | ◐ |
| TableFooterSummarySelectAllButton | ⬜ | ◐ |
| TabsExtendedDropdownWrapper | ⬜ | ◐ |
| TabsExtendedTab | ⬜ | ◐ |
| TabsExtendedTabButton | ⬜ | ◐ |
| TabsExtendedTabsWrapper | ⬜ | ◐ |
| TabsLineDesktop | ⬜ | ◐ |
| TabsLineDropdown | ⬜ | ◐ |
| TabsLineItem | ⬜ | ◐ |
| TabsLineMobile | ⬜ | ◐ |
| TooltipLink | ⬜ | ◐ |
| TooltipTarget | ⬜ | ◐ |
| TooltipXButton | ⬜ | ◐ |
| UploadZoneInput | ⬜ | ◐ |

#### Сверка с исходниками — 2026-10-16

Проверены все **106 каталогов** `src/components/`, публичные именованные экспорты
`src/components/index.ts` и статические части составных компонентов, доступные
через них (включая вложенные пути вроде `MasterTable.TableFooter.Summary.Amount`).
Основа сверки — `main` на коммите `ac177e3a`.

- На дату сверки в двух таблицах **234 компонента**: **140 в основной таблице** и **94 атома**. Есть **138 AI.md**, **96 файлов ещё нужны**.
- У 94 атомов рефакторинг отмечен ◐: наличие реализации и тестов семейства не доказывает весь DoD именно этой части. Для каждого атома требуется проверить критерии и доработать недостающее. У `ChipSelect` и `ChipDatePicker` сохранён незавершённый статус ⬜.
- Для существующих 138 документов проверены frontmatter, обязательные разделы, колонка `Example file` и существование stories. Ранее принятый статус рефакторинга этих строк сохранён; полный повторный аудит их поведения и тестов в эту сверку не входит.

**Устранённые расхождения прежнего учёта:**

| Строка | Что показали исходники | Решение |
|---|---|---|
| ChipSelect / ChipDatePicker | AI.md отсутствуют; Storybook-примеры есть | Оставить AI.md и AI refactoring незавершёнными |
| AbstractTree / AccordionBase | Внутренние реализации, отсутствуют в публичных barrel-экспортах | Убрать отдельные строки; описывать внутренние зависимости у публичных потребителей |
| PaginationNavigationExtended | Тривиальный `ul` без собственного API и логики; уже описан в [Pagination-ai.md](../../src/components/Pagination/Pagination-ai.md) | Учитывать в документации Pagination без отдельной строки |
| TreeViewNodeWithContext | Экспортируемая реализация того же `TreeView.Node`, который описан в `TreeViewNode-ai.md` | Сохранить одну строку TreeViewNode, без дубликата |

#### Части, учитываемые в документации родителя

При сверке из самостоятельного учёта исключены ещё 28 презентационных частей. Размер, отступ, выбор иконки, типографика и передача props сами по себе не считаются самостоятельной логикой.

Отдельный AI.md не планируется для перечисленных ниже обёрток: они делегируют
описанный API/стили родителю, не вводя самостоятельный контракт. Для семейства
List сохранено явное исключение из `CONTEXT.md`, включая `ListItemContent` и
`ListSortableItemTarget`. Уже существующие AI.md не удаляются из-за гранулярности
старого учёта.

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

`AdvancedMouseSensor` и `AdvancedTouchSensor` — служебные DnD-классы, а не React-компоненты;
их контракт относится к `ListSortable`. `DesignTokens` — инфраструктура токенов.
`FocusTrapExtended`, `AbstractTree`, `AccordionBase` и прочие части, не доступные
через публичный barrel/составной API, остаются внутренними зависимостями.
Переэкспорты уже учтённых частей (например, `Page.Header.Subhead`) не создают новые строки.

### Фаза 2: MCP-сервер для потребителей (в разработке)
Цель: AI-агенты, использующие дизайн-систему в своих проектах, смогут получать
документацию компонентов через MCP без чтения файлов репозитория.

Репозиторий: [`@sberbusiness/triplex-next-mcp-server`](https://github.com/SberBusiness/triplex-next-mcp-server)
(собственный ROADMAP в корне того репо).

- [x] Разработать MCP-сервер на основе `{Component}-ai.md` файлов (каркас + базовые tools)
- [x] Инструменты: `list_components()`, `get_component(name)`, `get_tokens(component)`
- [x] Скрипт генерации `mcp-data.json` в triplex-next (`scripts/generateMcpData.ts`, npm: `generateMcpData`)
- [x] Публикация bundle как GitHub Release asset (`.github/workflows/release.yml`)
- [x] Beta-публикация npm-пакета `@sberbusiness/triplex-next-mcp-server`
- [x] Автоматизация обновления bundle на релиз библиотеки (workflow `sync-bundle.yml` в репозитории mcp-server)
- [x] Дизайн-токены в bundle: секция `tokens` из TS-дерева (`schemaVersion: 2`) — пути
      `{Группа}.{Токен}`, значения светлой и тёмной темы, ссылки на палитру
- [ ] Stable-релиз npm-пакета (после стабилизации API tools)
- [ ] Расширенные tools: `search_components`, `get_props`, `get_invariants`, `get_release_notes`, MCP Prompts/Resources и др. — отслеживается в собственном ROADMAP репозитория mcp-server

**Как это работает:**
1. На релиз triplex-next workflow генерирует `mcp-data-<версия>.json` (плоский JSON
   со всеми `*-ai.md`, `docs/ai/*.md`, release notes в поле `raw` и секцией
   `tokens` с деревом дизайн-токенов) и прикладывает
   к GitHub Release. Только для `1.*`: документация в `0.*` идентична, а два
   одинаковых бандла сделали бы неоднозначным выбор источника.
2. `fetch-bundle.ts` в mcp-server скачивает asset и раскладывает в дерево
   `bundle/{components,guides,release-notes}/` + `bundle/manifest.json`.
3. MCP-сервер на старте читает manifest и парсит нужные файлы через gray-matter.

Шаг 2 автоматизирован **на стороне mcp-server**: workflow `sync-bundle.yml`
по расписанию сверяет `bundle/manifest.json.triplexVersion` с последним
релизом triplex-next и при расхождении открывает PR с обновлённым bundle.
Pull-модель выбрана намеренно — triplex-next публичный, его релизы читаются
без авторизации, тогда как push-триггер потребовал бы хранить в публичном
репозитории токен к приватному mcp-server.

Bundle всегда разворачивается с флагом `--merge`: пока Phase 1 не закрыта,
компоненты без `*-ai.md` приходят с `raw: null`, и прогон без флага стёр бы
уже накопленную документацию (в том числе унаследованную от старого формата
`*-AI.md`). Отказ от флага требует проверки полноты публичной документации вместе с
выборкой компонентов в bundle: сборщик сейчас создаёт fallback и для служебных
каталогов. Наличие такого fallback само по себе не означает, что внутреннему
компоненту нужен отдельный `*-ai.md`.

**Заметка:** Все `{Component}-ai.md` файлы содержат YAML frontmatter с machine-readable метаданными —
mcp-server не требует изменений в формате, достаточно держать `docs/ai/template-ai.md` консистентным.

Сценарии работы агента и минимальный контекст — см. `docs/ai/CONTEXT.md` и `CLAUDE.md`.
