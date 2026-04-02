# Coding Guidelines — Triplex-Next

Краткая сводка обязательных правил. Детальные конвенции — в отдельных файлах:

- **Стек и архитектура:** `docs/ai/CONTEXT.md`
- **Стили кода:** `docs/ai/codestyle.md`
- **Тестирование:** `docs/ai/tests.md`
- **Stories:** `docs/ai/stories-guide.md`
- **Коммиты и ветки:** `docs/ai/commits.md`

---

## Архитектура и структура

- Каждый компонент — в своей папке `src/components/{ComponentName}/`.
- Обязательные файлы: `{ComponentName}.tsx`, `styles/{ComponentName}.module.less`, `index.ts`, `__tests__/{ComponentName}.test.tsx`.
- `index.ts` — только barrel export, без логики. Всё, что там было — должно оставаться (breaking change удалить экспорт).
- Все компоненты экспортируются через `src/index.ts`.

## TypeScript

- `strict: true` — никаких исключений.
- Запрещено: `any`, `!` (non-null assertion) без комментария, `as Type` без необходимости.
- Именование: `I` (interface), `E` (enum), `T` (union type), `UPPER_SNAKE_CASE` (константы).
- Интерфейсы props — экспортируются (часть публичного API).

## React

- `forwardRef` — обязателен на всех UI-компонентах.
- `clsx` — для className. Никогда не конкатенировать строки.
- `className` и `...rest` — прокидываются в корневой элемент.
- `React.memo` — только по результатам профилирования.

## Стилизация

- Только LESS CSS Modules (`.module.less`). Нет inline styles в компонентах.
- Классы — camelCase. Цвета и размеры — только через CSS-переменные токенов.
- Нет `!important` без комментария.

## Accessibility

- Семантические HTML-элементы (`button` вместо `div` с `onClick`).
- Keyboard navigation: Tab, Enter, Escape, стрелки — где уместно.

## Тестирование

- Unit-тесты: Vitest + Testing Library. Покрывай новый функционал.
- Новый компонент: полное покрытие (все props, forwardRef, события).
- Visual regression: автоматически из stories. Baseline только из CI/Docker.
- E2E: Playwright, только для критичных флоу.

## Stories

- Обязательны: Playground + Default + stories для ключевых props.
- При добавлении нового prop: обновить Playground. Если prop визуальный — добавить named story.
- Примеры — самодостаточные, импорты из `@sberbusiness/triplex-next`.

## Breaking Changes

- Переименование props, enum-значений, публичных CSS-переменных — это breaking change (мажорная версия).
- Breaking changes описываются в PR description.
- Deprecated API — с JSDoc `@deprecated` и указанием альтернативы.

## Принципы

- **DRY**: не дублируй код (исключение: examples в stories).
- **KISS**: простейшее решение, которое работает.
- **YAGNI**: не добавляй то, чего нет в текущем требовании.
- Не добавляй комментарии/docstring к коду, который не изменял.
- Не рефакторь то, что не просили трогать.
