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

Готовность измеряется таблицей покрытия ниже: все компоненты с публичным API
имеют `AI.md`, прошли AI-рефакторинг и покрыты Storybook-примерами.

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

> **Как закрывать колонки.** Для прогона одного компонента через все три
> колонки таблицы (AI.md + Storybook examples + AI refactoring) используй
> Claude Code агента `ai-ready-builder` — он спланирует объём, запустит
> специализированных субагентов и обновит ROADMAP. Подробности и остальные
> кастомные агенты — в [`.claude/README.md`](../../.claude/README.md).

- [ ] Документировать оставшиеся компоненты (см. таблицу ниже)
- [ ] Приоритет: часто изменяемые компоненты в первую очередь

#### Статус покрытия компонентов

**Что значат колонки (definition of done):**

- **AI.md** — у компонента есть `{ComponentName}-ai.md`, заполненный по `docs/ai/template-ai.md`: frontmatter (component, category, related, tokens, stories, version), Назначение, Варианты и props, Инварианты, Связанные компоненты, Stories с колонкой `Example file`, История изменений. Accessibility — обязательно для интерактивных компонентов.
- **Storybook examples** — есть `.stories.tsx` в modern pattern (`docs/ai/stories-guide.md`): директория `stories/{Category}/examples/{Component}/` с отдельным файлом примера на каждую story (кроме `Playground` / `VisualTests`).
- **AI refactoring** — компонент проведён через `docs/ai/ai-refactoring.md`: codestyle-чистка, structural-упрощение, AI-friendliness (JSDoc на всех props), unit-тесты на ключевую логику.

Какие компоненты заслуживают отдельного `*-ai.md` (а какие описываются в родителе)
— см. `docs/ai/CONTEXT.md` → «Когда создавать `{ComponentName}-ai.md`».

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
| ListMaster | ✅ | ✅ | ✅ |
| ListMasterFooter | ✅ | ✅ | ✅ |
| ListMasterHeader | ✅ | ✅ | ✅ |
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
- [x] Beta-публикация npm-пакета `@sberbusiness/triplex-next-mcp-server`
- [ ] Stable-релиз npm-пакета (после стабилизации API tools)
- [ ] Расширенные tools: `search_components`, `get_props`, `get_invariants`, `get_release_notes`, MCP Prompts/Resources и др. — отслеживается в собственном ROADMAP репозитория mcp-server

**Как это работает:**
1. На релиз triplex-next workflow генерирует `mcp-data.json` (плоский JSON со всеми `*-ai.md`,
   `docs/ai/*.md`, release notes в поле `raw`) и прикладывает к GitHub Release.
2. `fetch-bundle.ts` в mcp-server скачивает asset и раскладывает в дерево
   `bundle/{components,guides,release-notes}/` + `bundle/manifest.json`.
3. MCP-сервер на старте читает manifest и парсит нужные файлы через gray-matter.

**Заметка:** Все `{Component}-ai.md` файлы содержат YAML frontmatter с machine-readable метаданными —
mcp-server не требует изменений в формате, достаточно держать `docs/ai/template-ai.md` консистентным.

Сценарии работы агента и минимальный контекст — см. `docs/ai/CONTEXT.md` и `CLAUDE.md`.
