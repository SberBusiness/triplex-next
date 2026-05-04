# `.claude/` — кастомные агенты и skills для Claude Code

Этот каталог содержит специализированных Claude Code субагентов и skills,
заточенных под конвенции `triplex-next`. Они оборачивают гайды из `docs/ai/`
и автоматизируют типовые задачи: AI-рефакторинг, написание stories,
обновление AI-документации, ревью и коммиты.

> **Агенты** — Claude Code-специфичные (формат субагентов).
> **Skills** — runtime-нейтральные процедуры. Физически живут в `.agents/skills/`
> и подключаются в Claude Code через симлинки в `.claude/skills/`.
> Для Codex / Cursor / других AI можно читать `.agents/skills/*/SKILL.md` напрямую
> как пошаговые инструкции (см. `AGENTS.md`).

---

## Структура

```
.agents/
└── skills/                              # каноничное место для skills (runtime-neutral)
    ├── update-component-ai-md/SKILL.md
    └── commit-component/SKILL.md

.claude/
├── agents/
│   ├── ai-ready-builder.md              # оркестратор Phase 1 ROADMAP
│   ├── component-refactorer.md          # AI-рефакторинг + unit-тесты
│   ├── story-writer.md                  # Storybook stories (modern pattern)
│   └── change-reviewer.md               # ревью diff'а перед коммитом (read-only)
├── skills/                              # симлинки на .agents/skills/*
│   ├── update-component-ai-md → ../../.agents/skills/update-component-ai-md
│   └── commit-component       → ../../.agents/skills/commit-component
└── README.md                            # этот файл
```

---

## Агенты

### `ai-ready-builder` — оркестратор Phase 1

Приводит **один компонент** к статусу AI-Ready по `docs/ai/ROADMAP.md`
(Фаза 1): план → AI refactoring → stories → AI.md → ревью → отметки в
ROADMAP. Не коммитит.

**Когда вызывать:** «сделай AI-Ready для компонента X», «закрой все три
колонки таблицы для X».

**Вызов:**
```
Use the ai-ready-builder agent to bring Alert to AI-Ready
```
или
```
запусти ai-ready-builder для Alert
```

Внутри сам зовёт `component-refactorer`, `story-writer`, skill
`update-component-ai-md`, `change-reviewer` в нужном порядке. Между шагами
просит подтверждения у пользователя.

---

### `component-refactorer` — AI-рефакторинг

Делает рефакторинг компонента строго по `docs/ai/ai-refactoring.md`:
codestyle-чистка, structural simplification, JSDoc на публичные props,
unit-тесты на нетривиальную логику. Не меняет публичный API без
подтверждения. Учитывает совместимость с React 17 (ветка `release-0`).

**Когда вызывать:** точечная задача «отрефактори X», или закрытие колонки
`AI refactoring` в ROADMAP без других изменений.

**Воркфлоу:** аудит → план → согласование с пользователем → правки → tsc +
vitest → отметка в ROADMAP.

---

### `story-writer` — Storybook stories

Пишет/обновляет stories по `docs/ai/stories-guide.md` (modern pattern с
`examples/` + `?raw`). Импорты в examples — из `@sberbusiness/triplex-next`.
Знает разницу `action()` vs `() => {}` для копируемых примеров. Не
переименовывает существующие story IDs.

**Когда вызывать:** новый компонент без stories, переписывание stories на
modern pattern, добавление stories на новый prop.

**Эталон:** `stories/NumberField/NumberField.stories.tsx`.

---

### `change-reviewer` — независимый ревью

**Read-only** ревьюер текущего `git diff` перед коммитом. Проверяет
codestyle, инварианты, публичный API, React 17 совместимость, наличие
тестов, актуальность stories, обновление release notes / `{Component}-ai.md`,
правильное состояние ROADMAP.

**Когда вызывать:** перед коммитом любых нетривиальных изменений компонентов.
Особенно важно после `component-refactorer` или серии правок —
свежий контекст ловит то, что замылилось у автора.

Возвращает структурированный отчёт: блокеры / замечания / зелёный свет.

---

## Skills

### `/update-component-ai-md`

Создаёт или обновляет `src/components/{Name}/{Name}-ai.md` по шаблону
`docs/ai/template-ai.md`. Парсит CSS-переменные grep'ом, читает
интерфейсы props, формирует таблицу stories с обязательной колонкой
`Example file` (её парсит `scripts/generateMcpData.ts` для MCP bundle).

При обновлении существующего AI.md — сохраняет написанные человеком
разделы (Назначение, Когда использовать), обновляет машинные (токены,
props, stories), дописывает строку в «Историю изменений».

Перед запуском проверяет `docs/ai/CONTEXT.md` → раздел «Когда создавать
`{ComponentName}-ai.md`», чтобы не плодить AI.md для тривиальных
обёрток.

---

### `/commit-component`

Делает коммит текущих изменений по `docs/ai/commits.md`:

- Извлекает `TRIPLEX-XXX` из имени ветки.
- Формирует сообщение в формате `TRIPLEX-XXX Краткое описание` (≤72 символов).
- Точечный `git add <files>`, никаких `-A` / `.`.
- Не использует `--no-verify` — даёт `husky` + `lint-staged` отработать.
- Не пушит автоматически.

Запускается **только по явной просьбе пользователя**.

---

## Типичные сценарии

### Полный цикл AI-Ready для одного компонента

```
> запусти ai-ready-builder для Alert
```

Агент:
1. Прочитает строку Alert в `docs/ai/ROADMAP.md`.
2. Покажет план (что нужно сделать в трёх колонках) и дождётся OK.
3. Запустит `component-refactorer` (рефакторинг + тесты).
4. После одобрения правок — `story-writer` (stories).
5. Запустит skill `update-component-ai-md` для `Alert-ai.md`.
6. Запустит `change-reviewer` для финального ревью.
7. Поставит ✅ в ROADMAP.
8. Предложит `/commit-component`.

### Только stories (компонент уже отрефакторен)

```
> Use the story-writer agent to add stories for Calendar
```

### Только AI.md (без правок кода)

```
> /update-component-ai-md for Avatar
```

### Ручная правка → ревью → коммит

```
> /change-reviewer
> /commit-component
```

---

## Permissions и tools

Агенты используют `Read`, `Edit`, `Write`, `Glob`, `Grep`, `Bash`. Если при
работе появляются permission-prompts на типовые команды (`npx tsc`,
`npx vitest`, `git diff`, `git status`), это можно вылечить добавлением
allowlist в `.claude/settings.json` через skill `fewer-permission-prompts`.

`change-reviewer` — read-only по дизайну (только `Read`, `Glob`, `Grep`,
`Bash`). Это специально, чтобы не было соблазна «поправить и не сказать».

---

## Как добавлять новых агентов / skills

- **Агент** — `.claude/agents/{name}.md` с YAML frontmatter (`name`,
  `description`, опционально `tools`, `model`). Тело — system prompt
  агента. Claude Code-специфичный формат.
- **Skill** — `.agents/skills/{name}/SKILL.md` с frontmatter (`name`,
  `description`). Тело — пошаговая инструкция. После создания добавь
  симлинк в Claude:
  ```bash
  ln -s ../../.agents/skills/{name} .claude/skills/{name}
  ```
  Симлинк нужен, чтобы Claude Code видел skill как `/`-команду. Сами файлы
  остаются в `.agents/skills/` — оттуда их могут читать и другие AI-runtime'ы.

Принцип разделения зашит в существующий набор:

| Сигнал | Куда |
|---|---|
| Тяжёлый контекст / много чтений | Subagent (изоляция) |
| Параллельность нужна | Subagent |
| Независимый взгляд | Subagent |
| Процедура / рецепт, вызывается из других агентов или пользователем по slash-команде | Skill |
| Нужно подтверждение пользователя по ходу | Skill |

После добавления — обнови этот README, чтобы команда увидела.
