# AI-Ready Design System — Roadmap

Документ отслеживает прогресс перехода Triplex-Next к AI-Ready дизайн-системе.
Обновляй этот файл при завершении каждого этапа.

**Старт:** 2026-03-31

---

## Этапы

### Фаза 0: Фундамент
- [x] Анализ репозитория и выбор архитектуры
- [x] Создать `docs/ai/CONTEXT.md` — главный контекстный файл
- [x] Создать `docs/ai/template-AI.md` — шаблон документации компонента
- [x] Создать `CLAUDE.md` — entry point для Claude Code
- [x] Создать `AGENTS.md` — entry point для OpenAI Codex
- [x] Создать `.cursor/rules/design-system.mdc` — entry point для Cursor

### Фаза 1: Figma MCP
- [x] Настроить Figma MCP для Claude Code — плагин `figma@claude-plugins-official`
- [x] Задокументировать настройку для команды (ROADMAP.md + `.mcp.json.example`)
- [ ] Проверить, что агент получает дизайн-спецификацию ноды (проверить в пилоте)

#### Формат Figma metadata в `{ComponentName}-AI.md`

- `figma-node` хранит raw-значение параметра `node-id` из URL Figma, например `1-328`
- `figma-file` хранит URL файла / design-ссылку
- Если инструменту нужен `file key`, агент получает его из `figma-file`

#### Figma MCP Setup

Установи Figma MCP самостоятельно согласно официальной документации: https://developers.figma.com/docs/figma-mcp-server/

Пример `.mcp.json` для подключения: `.mcp.json.example` в корне репозитория.

### Фаза 2: Пилот — Button
- [x] Создать `src/components/Button/Button-AI.md` (Figma node: `1-328`)
- [ ] Тестовый прогон: дать агенту Figma-ссылку на конкретный вариант Button → агент вносит изменение в компонент
- [ ] Оценить качество результата (код, тесты, story)
- [ ] Скорректировать `template-AI.md` и `CONTEXT.md` по итогам

**Как запустить пилот в новой сессии:**
```
Прочитай docs/ai/CONTEXT.md и src/components/Button/Button-AI.md.
Затем по этой Figma-ссылке: [вставить ссылку на конкретный вариант]
добавь [описание изменения] к компоненту Button.
```

### Фаза 3: Rollout
- [ ] Документировать оставшиеся компоненты (96 total)
- [ ] Приоритет: часто изменяемые компоненты в первую очередь

#### Статус покрытия компонентов

| Компонент | AI.md | Figma Node | Статус |
|---|---|---|---|
| Button | ✅ | ✅ | Пилот |
| HelpBox | ✅ | ⬜ | AI-Ready |
| Checkbox | ✅ | ⬜ | AI-Ready |
| CheckboxXGroup | ✅ | ⬜ | AI-Ready |
| CheckboxYGroup | ✅ | ⬜ | AI-Ready |
| Alert | ⬜ | ⬜ | — |
| Badge | ⬜ | ⬜ | — |
| Card | ⬜ | ⬜ | — |
| ... (96 total) | | | |

### Фаза 4: MCP-сервер для потребителей (в разработке)
Цель: AI-агенты, использующие дизайн-систему в своих проектах, смогут получать
документацию компонентов через MCP без чтения файлов репозитория.

Репозиторий: [`@sberbusiness/triplex-next-mcp-server`](https://github.com/SberBusiness/triplex-next-mcp-server)
(собственный ROADMAP в корне того репо).

- [x] Разработать MCP-сервер на основе `{Component}-AI.md` файлов (каркас + базовые tools)
- [x] Инструменты: `list_components()`, `get_component(name)`, `get_tokens(component)`
- [x] Скрипт генерации `mcp-data.json` в triplex-next (`scripts/generateMcpData.ts`, npm: `generateMcpData`)
- [x] Публикация bundle как GitHub Release asset (`.github/workflows/release.yml`)
- [ ] Расширенные tools (Фаза 2–5 в ROADMAP mcp-server): `search_components`, `get_props`,
      `get_invariants`, `get_release_notes`, MCP Prompts/Resources и др.
- [ ] Публикация npm-пакета `@sberbusiness/triplex-next-mcp-server`

**Как это работает:**
1. На релиз triplex-next workflow генерирует `mcp-data.json` (плоский JSON со всеми `*-AI.md`,
   `docs/ai/*.md`, release notes в поле `raw`) и прикладывает к GitHub Release.
2. `fetch-bundle.ts` в mcp-server скачивает asset и раскладывает в дерево
   `bundle/{components,guides,release-notes}/` + `bundle/manifest.json`.
3. MCP-сервер на старте читает manifest и парсит нужные файлы через gray-matter.

**Заметка:** Все `{Component}-AI.md` файлы содержат YAML frontmatter с machine-readable метаданными —
mcp-server не требует изменений в формате, достаточно держать `docs/ai/template-AI.md` консистентным.

---

## Как использовать AI-документацию

### Сценарий: добавить prop к компоненту по дизайну из Figma

1. Открой `src/components/{ComponentName}/{ComponentName}-AI.md`
2. Дай агенту контекст: `CONTEXT.md` + `{ComponentName}-AI.md` + скриншот/нода Figma
3. Опиши задачу: "добавь prop X согласно дизайну"
4. Агент вносит изменения в TSX, LESS, story, тесты
5. После успешного изменения: попроси агента обновить `{ComponentName}-AI.md`

### Минимальный контекст для агента

```
Прочитай docs/ai/CONTEXT.md и src/components/Button/Button-AI.md.
Затем добавь prop [описание] к компоненту Button согласно [макету/скриншоту].
```
