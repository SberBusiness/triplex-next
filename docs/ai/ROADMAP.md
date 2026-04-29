# AI-Ready Design System — Roadmap

Документ отслеживает прогресс перехода Triplex-Next к AI-Ready дизайн-системе.
Обновляй этот файл при завершении каждого этапа.

**Старт:** 2026-03-31

---

## Этапы

### Фаза 0: Фундамент
- [x] Анализ репозитория и выбор архитектуры
- [x] Создать `docs/ai/CONTEXT.md` — главный контекстный файл
- [x] Создать `docs/ai/template-ai.md` — шаблон документации компонента
- [x] Создать `CLAUDE.md` — entry point для Claude Code
- [x] Создать `AGENTS.md` — entry point для OpenAI Codex
- [x] Создать `.cursor/rules/design-system.mdc` — entry point для Cursor

### Фаза 1: Rollout
- [ ] Документировать оставшиеся компоненты (96 total)
- [ ] Приоритет: часто изменяемые компоненты в первую очередь

Правила для колонки **AI refactoring** — `docs/ai/ai-refactoring.md`.

#### Статус покрытия компонентов

| Компонент | AI.md | Storybook examples | AI refactoring |
|---|---|---|---|
| AbstractTree | ⬜ | ⬜ | ⬜ |
| AccordionBase | ⬜ | ⬜ | ⬜ |
| Alert | ⬜ | ⬜ | ⬜ |
| Amount | ⬜ | ✅ | ⬜ |
| AmountField | ⬜ | ⬜ | ⬜ |
| Avatar | ⬜ | ✅ | ⬜ |
| Badge | ⬜ | ✅ | ⬜ |
| Body | ⬜ | ⬜ | ⬜ |
| Button | ✅ | ✅ | ⬜ |
| ButtonDropdown | ✅ | ✅ | ⬜ |
| ButtonIcon | ✅ | ✅ | ⬜ |
| Calendar | ⬜ | ✅ | ⬜ |
| Card | ⬜ | ⬜ | ⬜ |
| CarouselExtended | ⬜ | ⬜ | ⬜ |
| Checkbox | ✅ | ✅ | ⬜ |
| CheckboxTree | ⬜ | ✅ | ⬜ |
| CheckboxTreeExtended | ⬜ | ✅ | ⬜ |
| CheckboxXGroup | ✅ | ✅ | ⬜ |
| CheckboxYGroup | ✅ | ✅ | ⬜ |
| Chip | ⬜ | ✅ | ⬜ |
| ChipGroup | ⬜ | ✅ | ⬜ |
| Col | ⬜ | ✅ | ⬜ |
| CollapsableTree | ⬜ | ⬜ | ⬜ |
| Confirm | ⬜ | ⬜ | ⬜ |
| DateField | ⬜ | ✅ | ⬜ |
| DatePickerExtended | ⬜ | ⬜ | ⬜ |
| DateRange | ⬜ | ✅ | ⬜ |
| DesignTokens | ⬜ | ⬜ | ⬜ |
| Divider | ⬜ | ✅ | ⬜ |
| DocumentNumberEdit | ⬜ | ✅ | ⬜ |
| Dropdown | ⬜ | ⬜ | ⬜ |
| Ellipsis | ⬜ | ✅ | ⬜ |
| EmptyView | ✅ | ✅ | ⬜ |
| ExpandAnimation | ⬜ | ⬜ | ⬜ |
| Footer | ⬜ | ⬜ | ⬜ |
| FormField | ⬜ | ✅ | ⬜ |
| FormGroup | ⬜ | ⬜ | ⬜ |
| Gap | ⬜ | ✅ | ⬜ |
| Header | ⬜ | ⬜ | ⬜ |
| HelpBox | ✅ | ✅ | ⬜ |
| IconWrapper | ⬜ | ✅ | ⬜ |
| Island | ⬜ | ✅ | ⬜ |
| IslandAccordion | ⬜ | ✅ | ⬜ |
| IslandWidget | ⬜ | ✅ | ⬜ |
| KeyDownListener | ⬜ | ⬜ | ⬜ |
| LightBox | ⬜ | ✅ | ⬜ |
| Link | ⬜ | ✅ | ⬜ |
| List | ✅ | ✅ | ✅ |
| ListItem | ✅ | ✅ | ✅ |
| ListItemControlsButton | ✅ | ✅ | ✅ |
| ListItemControlsButtonDropdown | ✅ | ✅ | ✅ |
| ListItemSelectable | ✅ | ✅ | ✅ |
| ListItemTable | ✅ | ✅ | ✅ |
| ListMaster | ⬜ | ✅ | ⬜ |
| ListSortable | ✅ | ✅ | ✅ |
| ListSortableItem | ✅ | ✅ | ✅ |
| Loader | ⬜ | ⬜ | ⬜ |
| LoaderScreen | ⬜ | ✅ | ⬜ |
| Marker | ⬜ | ⬜ | ⬜ |
| MarkerStatus | ⬜ | ✅ | ⬜ |
| MediaWidth | ⬜ | ✅ | ⬜ |
| MobileView | ⬜ | ⬜ | ⬜ |
| ModalWindow | ⬜ | ⬜ | ⬜ |
| MonthYearField | ⬜ | ⬜ | ⬜ |
| MonthYearRange | ⬜ | ✅ | ⬜ |
| MultiselectField | ⬜ | ✅ | ⬜ |
| Notification | ⬜ | ⬜ | ⬜ |
| NumberField | ⬜ | ✅ | ⬜ |
| OrderedList | ⬜ | ✅ | ⬜ |
| Overlay | ⬜ | ⬜ | ⬜ |
| Page | ⬜ | ⬜ | ⬜ |
| Pagination | ⬜ | ⬜ | ⬜ |
| Portal | ⬜ | ⬜ | ⬜ |
| Radio | ⬜ | ⬜ | ⬜ |
| Row | ⬜ | ⬜ | ⬜ |
| SMSField | ⬜ | ⬜ | ⬜ |
| SegmentedControl | ⬜ | ⬜ | ⬜ |
| SelectExtendedField | ⬜ | ⬜ | ⬜ |
| SelectField | ⬜ | ⬜ | ⬜ |
| Skeleton | ⬜ | ✅ | ⬜ |
| Slider | ⬜ | ⬜ | ⬜ |
| SliderExtended | ⬜ | ⬜ | ⬜ |
| SliderRange | ⬜ | ⬜ | ⬜ |
| SmallInput | ⬜ | ⬜ | ⬜ |
| Spoiler | ⬜ | ⬜ | ⬜ |
| StatusTracker | ⬜ | ⬜ | ⬜ |
| Step | ⬜ | ⬜ | ⬜ |
| Stepper | ⬜ | ⬜ | ⬜ |
| Suggest | ⬜ | ⬜ | ⬜ |
| SuggestField | ⬜ | ✅ | ⬜ |
| SwipeableArea | ⬜ | ⬜ | ⬜ |
| Table | ⬜ | ⬜ | ⬜ |
| Tabs | ⬜ | ⬜ | ⬜ |
| TabsExtended | ⬜ | ⬜ | ⬜ |
| TabsLine | ⬜ | ⬜ | ⬜ |
| Tag | ⬜ | ⬜ | ⬜ |
| TagColor | ⬜ | ⬜ | ⬜ |
| TagGroup | ⬜ | ⬜ | ⬜ |
| TextField | ⬜ | ⬜ | ⬜ |
| TextareaField | ⬜ | ✅ | ⬜ |
| ThemeProvider | ⬜ | ⬜ | ⬜ |
| Tooltip | ⬜ | ⬜ | ⬜ |
| TopOverlay | ⬜ | ⬜ | ⬜ |
| TreeView | ⬜ | ⬜ | ⬜ |
| Triggers | ⬜ | ⬜ | ⬜ |
| Typography | ⬜ | ⬜ | ⬜ |
| UnorderedList | ⬜ | ⬜ | ⬜ |
| UploadZone | ⬜ | ⬜ | ⬜ |
| WindowResizeListener | ⬜ | ⬜ | ⬜ |

### Фаза 2: MCP-сервер для потребителей (в разработке)
Цель: AI-агенты, использующие дизайн-систему в своих проектах, смогут получать
документацию компонентов через MCP без чтения файлов репозитория.

Репозиторий: [`@sberbusiness/triplex-next-mcp-server`](https://github.com/SberBusiness/triplex-next-mcp-server)
(собственный ROADMAP в корне того репо).

- [x] Разработать MCP-сервер на основе `{Component}-ai.md` файлов (каркас + базовые tools)
- [x] Инструменты: `list_components()`, `get_component(name)`, `get_tokens(component)`
- [x] Скрипт генерации `mcp-data.json` в triplex-next (`scripts/generateMcpData.ts`, npm: `generateMcpData`)
- [x] Публикация bundle как GitHub Release asset (`.github/workflows/release.yml`)
- [ ] Расширенные tools (Фаза 2–5 в ROADMAP mcp-server): `search_components`, `get_props`,
      `get_invariants`, `get_release_notes`, MCP Prompts/Resources и др.
- [ ] Публикация npm-пакета `@sberbusiness/triplex-next-mcp-server`

**Как это работает:**
1. На релиз triplex-next workflow генерирует `mcp-data.json` (плоский JSON со всеми `*-ai.md`,
   `docs/ai/*.md`, release notes в поле `raw`) и прикладывает к GitHub Release.
2. `fetch-bundle.ts` в mcp-server скачивает asset и раскладывает в дерево
   `bundle/{components,guides,release-notes}/` + `bundle/manifest.json`.
3. MCP-сервер на старте читает manifest и парсит нужные файлы через gray-matter.

**Заметка:** Все `{Component}-ai.md` файлы содержат YAML frontmatter с machine-readable метаданными —
mcp-server не требует изменений в формате, достаточно держать `docs/ai/template-ai.md` консистентным.

---

## Как использовать AI-документацию

### Сценарий: добавить prop к компоненту

1. Открой `src/components/{ComponentName}/{ComponentName}-ai.md`
2. Дай агенту контекст: `CONTEXT.md` + `{ComponentName}-ai.md` + текстовое описание или скриншот
3. Опиши задачу: "добавь prop X согласно описанию"
4. Агент вносит изменения в TSX, LESS, story, тесты
5. После успешного изменения: попроси агента обновить `{ComponentName}-ai.md`

### Минимальный контекст для агента

```
Прочитай docs/ai/CONTEXT.md и src/components/Button/Button-ai.md.
Затем добавь prop [описание] к компоненту Button согласно [описанию/скриншоту].
```
