# Triplex-Next — Инструкции для Claude Code

## Обязательно прочитай перед работой с компонентами

**Главный контекстный файл:** `docs/ai/CONTEXT.md`
Содержит: стек, структуру компонентов, naming conventions, дизайн-токены,
воркфлоу добавления props, инварианты.

**Документация конкретного компонента:** `src/components/{ComponentName}/{ComponentName}-AI.md`
Пример: `src/components/Button/Button-AI.md`

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
2. Прочитай `src/components/{ComponentName}/{ComponentName}-AI.md`
3. Изучи исходный код компонента
4. Внеси изменения: TSX → LESS → story → тесты
5. Обнови раздел "История изменений" в `{ComponentName}-AI.md`

## Figma MCP

Если доступен инструмент `figma_get_file_nodes` — используй Node ID из frontmatter
`{ComponentName}-AI.md` для получения дизайн-спецификации.

## Стек

React 18 + TypeScript strict + LESS Modules + Vite + Storybook 9
