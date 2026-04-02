# Triplex-Next — Инструкции для Claude Code

Этот файл — entry point. Канонические обязательные правила находятся в
`docs/ai/CODING_GUIDELINES.md` и в связанных подробных гайдах.

## Обязательно прочитай перед работой с компонентами

**Главный контекстный файл:** `docs/ai/CONTEXT.md`
Содержит: стек, структуру компонентов, naming conventions, дизайн-токены,
воркфлоу добавления props, инварианты.

**Документация конкретного компонента:** `src/components/{ComponentName}/{ComponentName}-AI.md`
Пример: `src/components/Button/Button-AI.md`

Всегда используй `docs/ai/CONTEXT.md` + `docs/ai/CODING_GUIDELINES.md`.

Если `{ComponentName}-AI.md` ещё нет:
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

Если у компонента есть `{ComponentName}-AI.md` и в frontmatter заполнены `figma-file`
и `figma-node`, используй их для получения дизайн-спецификации.

`figma-node` хранит значение параметра `node-id` из URL Figma (например, `1-328`).
`figma-file` хранит URL файла или design-ссылку.

## Проверка перед завершением задачи

- Не завершай задачу после кодовых изменений без хотя бы одного шага проверки.
- Для правок документации и конфигов: проверь ссылки, команды, примеры и согласованность между файлами.
- Для изменений компонентов и логики: проверь диагностику/линтер для затронутых файлов и по возможности запусти focused unit test, если меняется публичное поведение.
- Для story-изменений с визуальным эффектом: проверь, что состояние покрыто существующей story или добавь новую story / `Visual tests`.
- Для правок accessibility, focus management, keyboard navigation и overlay-поведения предпочитай добавить или обновить точечный автотест.
- Если релевантную проверку не удалось запустить, явно сообщи об этом в финальном ответе.

## Стек

React 18 + TypeScript strict + LESS Modules + Vite + Storybook 9
