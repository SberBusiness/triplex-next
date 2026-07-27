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
    ├── commit-component/SKILL.md
    ├── prepare-release/SKILL.md
    ├── update-visual-baselines/SKILL.md   # baseline-скриншоты через CI + чистка orphan
    ├── take-task/SKILL.md               # Linear: взять задачу в работу
    ├── finish-task/SKILL.md             # Linear: финализация после коммита
    ├── create-task/SKILL.md             # Linear: завести оформленную задачу
    └── sync-roadmap/SKILL.md            # Linear: сверка с docs/ai/ROADMAP.md

.claude/
├── agents/
│   ├── ai-ready-builder.md              # оркестратор Phase 1 ROADMAP
│   ├── component-refactorer.md          # AI-рефакторинг + unit-тесты
│   ├── story-writer.md                  # Storybook stories (modern pattern)
│   └── change-reviewer.md               # ревью diff'а перед коммитом (read-only)
├── skills/                              # симлинки на .agents/skills/* (по одному на каждый skill)
└── README.md                            # этот файл

.mcp.json                                # Linear MCP (project-scoped, общий для команды)
```

---

## Агенты

### `ai-ready-builder` — оркестратор Phase 1

Приводит **один компонент** к статусу AI-Ready по `docs/ai/ROADMAP.md`
(Фаза 1): план → AI refactoring → stories → AI.md → ревью → отметки в
ROADMAP. По задаче Linear (`TRI-XXX`) после зелёного ревью сам коммитит,
пушит и создаёт PR; вне задачи Linear — не коммитит.

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

Запускается **по явной просьбе пользователя** либо **автоматически в финале
работы по задаче Linear** (ветка `TRI-XXX` через `take-task`, после зелёного
ревью) — в этом сценарии после коммита сразу пушит и создаёт PR. Вне задачи
Linear не пушит.

---

### `/prepare-release`

Готовит релизную ветку и PR для новой версии. Запускается по фразе
«Подготовь релиз X.Y.Z» (номер версии обязателен):

- Проверяет чистоту рабочего дерева и отсутствие ветки `TRIPLEX-0` на origin.
- От актуального `main` создаёт ветку `TRIPLEX-0`.
- `npm version X.Y.Z --no-git-tag-version` — обновляет `package.json`
  и `package-lock.json`.
- Создаёт заготовку release notes на **следующую** версию —
  `stories/release-notes/v1/X.(Y+1).0.mdx` (notes самой X.Y.Z уже
  заполнены по ходу разработки).
- Коммитит (`TRIPLEX-0 Подготовка релиза X.Y.Z`), пушит, создаёт PR
  `New release` через `gh` (или даёт compare-ссылку, если `gh` недоступен).

Тег и GitHub Release **не** создаёт — это отдельный шаг после мержа PR.

---

### `/update-visual-baselines`

Приводит `__screenshots__/` в соответствие со stories текущей ветки:

- Запускает GitHub Actions «Update Visual Snapshots» (`gh workflow run`)
  на запушенной ветке и ждёт завершения (`gh run watch`).
- Подтягивает коммит со свежими baseline (`git pull`).
- Находит orphan-скриншоты (story ID отсутствует в
  `storybook-static/index.json`), удаляет их отдельным коммитом и пушит —
  pre-commit hook пропускает удаления в `__screenshots__/` без вопросов.

Запускается по явной просьбе либо **автоматически в финале задачи Linear**,
если менялись stories или визуал компонентов. Локально скриншоты не
генерирует никогда (только CI/Linux).

---

## Linear (таск-трекер)

Задачи ведутся в Linear: workspace `triplex-next`, команда **TRI**
(https://linear.app/triplex-next). Номер задачи `TRI-XXX` — префикс веток и
коммитов (см. `docs/ai/commits.md`; `TRIPLEX-XXX` — legacy). GitHub-интеграция
Linear линкует PR по номеру в имени ветки и двигает статусы автоматически:
ветка → In Progress, PR → In Review, merge → Done.

Доступ агентов к Linear — через Linear MCP, настроен в `.mcp.json` в корне
репозитория. При первом использовании нужна авторизация (`/mcp` в Claude Code).

Человекочитаемый гайд по всему процессу (от постановки задачи до мержа,
с точками участия разработчика) — `docs/human/linear-ai-ready-workflow.md`.

### `/take-task TRI-123`

Начало работы: читает задачу, показывает план, после подтверждения — переводит
в In Progress, назначает исполнителя, создаёт ветку `TRI-XXX-...` от `main`
и запускает подходящего агента (по labels `type:*`). Финал автоматический:
после зелёного ревью — коммит, пуш и PR без подтверждения
(см. `docs/ai/commits.md`).

### `/finish-task`

Определяет задачу из имени ветки, публикует комментарий-резюме
(что сделано, проверки, release notes, PR), проверяет линковку PR. Статусы
двигает GitHub-интеграция; Done вручную не ставит. В автофинале задачи
Linear запускается автоматически и публикует резюме без подтверждения;
при явном запуске вне автофинала — показывает черновик.

### `/create-task`

Превращает короткое описание в оформленную задачу: сверяется с кодом и
ROADMAP, проверяет дубликаты, показывает черновик (title, acceptance criteria,
labels `component:*` / `type:*`), создаёт только после подтверждения.

### `/sync-roadmap`

Сверка `docs/ai/ROADMAP.md` ↔ проект «AI-Ready Phase 1» в Linear: предлагает
создать недостающие задачи на компоненты, репортит расхождения статусов.
Ничего не создаёт без подтверждения.

---

## Типичные сценарии

### Полный цикл с Linear

```
> /create-task добавить Badge тему DANGER     # если задачи ещё нет
> /take-task TRI-12                           # план → In Progress → ветка → агент
> ... работа агента ...
> ... автоматически: коммит → push → PR ...   # после зелёного ревью, без подтверждения
> ... автоматически: /update-visual-baselines # если менялись stories/визуал
> ... автоматически: /finish-task ...         # резюме в задачу, линковка PR
```

Человеку остаётся только code review PR и мерж.

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
