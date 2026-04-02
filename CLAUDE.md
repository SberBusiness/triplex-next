# Triplex-Next — Инструкции для Claude Code

Этот файл — entry point. Канонические обязательные правила находятся в
`docs/ai/CODING_GUIDELINES.md` и в связанных подробных гайдах.

## Обязательно прочитай перед работой с компонентами

**Главный контекстный файл:** `docs/ai/CONTEXT.md`
Содержит: стек, структуру компонентов, naming conventions, дизайн-токены,
воркфлоу добавления props, инварианты.

**Документация конкретного компонента:** `src/components/{ComponentName}/{ComponentName}-AI.md`
Пример: `src/components/Button/Button-AI.md`

Если `{ComponentName}-AI.md` ещё нет:
- используй `docs/ai/CONTEXT.md` + `docs/ai/CODING_GUIDELINES.md`
- изучи исходники компонента, stories и тесты
- следуй локальному паттерну компонента
- не создавай новый `*-AI.md`, если это не часть задачи

**Шаблон для новых компонентов:** `docs/ai/template-AI.md`

**Прогресс AI-Ready перехода:** `docs/ai/ROADMAP.md`

---

## Конвенции разработки

| Тема | Файл |
|---|---|
| Codestyle (TS, React, LESS, принципы) | `docs/ai/codestyle.md` |
| Тестирование (unit, visual, e2e) | `docs/ai/tests.md` |
| Stories (структура, примеры, чек-лист) | `docs/ai/stories-guide.md` |
| Коммиты, ветки, PR-воркфлоу | `docs/ai/commits.md` |

---

## Типичный запрос

Когда тебя просят изменить компонент:
1. Прочитай `docs/ai/CONTEXT.md`
2. Прочитай `docs/ai/CODING_GUIDELINES.md` и нужный тематический гайд
3. Если файл существует, прочитай `src/components/{ComponentName}/{ComponentName}-AI.md`
4. Изучи исходный код компонента, stories и тесты
5. Внеси изменения: TSX → LESS → story → тесты
6. Если `{ComponentName}-AI.md` существует, обнови раздел "История изменений"

## Figma MCP

Если доступен инструмент `figma_get_file_nodes` — используй Node ID из frontmatter
`{ComponentName}-AI.md` для получения дизайн-спецификации.

## Стек

React 18 + TypeScript strict + LESS Modules + Vite + Storybook 9
