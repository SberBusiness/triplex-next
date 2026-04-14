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
| Alert | ⬜ | ⬜ | — |
| Badge | ⬜ | ⬜ | — |
| Card | ⬜ | ⬜ | — |
| ... (96 total) | | | |

### Фаза 4: MCP-сервер для потребителей (будущее)
Цель: AI-агенты, использующие дизайн-систему в своих проектах, смогут получать
документацию компонентов через MCP без чтения файлов репозитория.

- [ ] Разработать MCP-сервер на основе `{Component}-AI.md` файлов
- [ ] Инструменты: `list_components()`, `get_component(name)`, `get_tokens(component)`
- [ ] Frontmatter в `.md` файлах уже структурирован под этот сценарий

**Заметка:** Все `{Component}-AI.md` файлы содержат YAML frontmatter с machine-readable метаданными.
MCP-сервер = файловый ридер + Markdown-парсер. Не нужно менять существующие документы.

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
