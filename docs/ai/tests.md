# Тестирование — Triplex-Next

---

## Обзор: три уровня тестирования

| Уровень | Инструмент | Расположение | Когда запускать |
|---|---|---|---|
| Unit | Vitest + Testing Library | `src/components/**/__tests__/` | `npm run test-unit` |
| Visual regression | Storybook test-runner + jest-image-snapshot | `__screenshots__/` | CI (PR) |
| E2E | Playwright | `e2e/tests/` | `npm run test-e2e` |

---

## Unit-тесты (Vitest + Testing Library)

### Когда писать

- **При изменении компонента:** добавить тест-кейс на новый функционал.
- **При создании нового компонента:** полное покрытие: все props, состояния, события, forwardRef.
- Баги исправляй с тестом, который воспроизводит баг.

### Расположение

```text
src/components/{ComponentName}/__tests__/{ComponentName}.test.tsx
```

Предпочтительный путь для новых тестов — `__tests__/`.

В текущем репозитории уже встречаются и другие локальные паттерны:
- `__tests__/`
- `__test__/`
- `tests/`

Если у компонента уже используется локальный паттерн, следуй ему и не делай
отдельную миграцию структуры без задачи.

Один файл на компонент. Если компонент имеет субкомпоненты (ButtonIcon, ButtonDropdown), тесты субкомпонентов — в отдельных файлах той же локальной папки тестов.

### Импорты

```typescript
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ComponentName } from "../ComponentName";
// Следуй локальному паттерну файла: для unit-тестов обычно используются локальные импорты
```

**`userEvent` vs `fireEvent`:**
- Предпочитай `userEvent` — он точнее симулирует реальные события браузера (pointer events, keyboard, focus/blur цепочки).
- `fireEvent` допустим для простых случаев (триггер события без цепочки браузерных эффектов) или когда следуешь паттерну существующего файла теста.

```typescript
// ✅ Предпочтительно для пользовательского взаимодействия
const user = userEvent.setup();
await user.click(screen.getByRole("button"));
await user.type(screen.getByRole("textbox"), "hello");
await user.keyboard("{Enter}");

// ✅ Допустимо для простых низкоуровневых событий
fireEvent.change(input, { target: { value: "hello" } });
```

Правило:
- В unit-тестах предпочитай локальные импорты для компонента под тестом и ближайших внутренних типов/утилит.
- В репозитории есть и package-style тесты. Не делай отдельную миграцию import-style без задачи на cleanup.
- Если тест проверяет именно публичный entrypoint библиотеки, импорт через `@sberbusiness/triplex-next` допустим.

### Структура

```typescript
describe("ComponentName", () => {
    // Хелпер для повторяющегося рендера
    const renderComponent = (props = {}) =>
        render(<ComponentName theme={ETheme.DEFAULT} {...props} />);

    it("renders without errors", () => {
        renderComponent();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("applies correct class for size prop", () => {
        renderComponent({ size: EComponentSize.SM });
        expect(screen.getByTestId("component-name")).toHaveClass("sm");
    });

    it("calls onChange on click", () => {
        const onChange = vi.fn();
        renderComponent({ onChange });
        fireEvent.click(screen.getByRole("button"));
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("forwards ref to root element", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<ComponentName theme={ETheme.DEFAULT} ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("is disabled when disabled prop is set", () => {
        renderComponent({ disabled: true });
        expect(screen.getByRole("button")).toBeDisabled();
    });
});
```

### Приоритет запросов (Testing Library)

Используй запросы в этом порядке:
1. `getByRole` — семантические запросы (кнопки, инпуты, чекбоксы)
2. `getByLabelText` — для полей с подписями
3. `getByText` — для текстового содержимого
4. `getByTestId` — только если нет семантической альтернативы

**Async-варианты:** используй `findBy*` или `waitFor` для элементов, которые появляются после асинхронной операции:

```typescript
// ✅ findBy* — сокращение для waitFor + getBy*
const successMessage = await screen.findByRole("alert");

// ✅ waitFor — для проверки условия, которое станет истинным со временем
await waitFor(() => {
    expect(screen.getByRole("button")).toBeEnabled();
});

// ❌ не используй фиксированные таймауты
await new Promise((r) => setTimeout(r, 500));
```

```typescript
// ✅ Предпочтительно
screen.getByRole("button", { name: "Submit" })
screen.getByRole("checkbox")
screen.getByLabelText("Email")

// ✅ Когда нет семантики
screen.getByTestId("loader-spinner")

// ❌ Избегать
container.querySelector(".button--loading")  // тестирует реализацию
```

### Что тестировать

**Обязательно для каждого компонента:**
- [ ] Рендерится без ошибок с обязательными пропами
- [ ] `forwardRef` — ref передаётся в правильный DOM-элемент
- [ ] Все значения enum-props применяют корректный CSS-класс или атрибут
- [ ] `disabled` — компонент отключён и не вызывает обработчики
- [ ] Обработчики событий (onChange, onClick) вызываются корректно
- [ ] `className` пробрасывается в корневой элемент

**Для новых props (при изменении компонента):**
- [ ] Новый prop применяет ожидаемый класс / атрибут / поведение
- [ ] Пограничные значения (undefined, null, крайние значения enum)

**Не нужно тестировать:**
- Визуальное отображение (это задача visual regression тестов)
- Детали реализации LESS-классов, которые могут меняться
- Внутреннее состояние компонента (тестируй поведение, не state)

**Допустимо, когда это часть публичного состояния:**
- Проверять CSS-класс, если именно он кодирует публичный вариант или состояние (`size`, `theme`, `loading`, `expanded`)
- Проверять `aria-*`, `disabled`, `tabIndex`, текст и callback-контракт как часть публичного поведения

### Минимальная проверка после изменений

- Правки только документации/конфигов тестов: проверь актуальность команд, путей и примеров, отдельный прогон тестов не обязателен.
- Правки компонента с изменением публичного поведения: предпочитай focused unit test на затронутый компонент.
- Правки багфикса: сначала добавь или обнови тест, который воспроизводит сценарий.
- Правки accessibility, focus management, keyboard navigation, dropdown/dialog behavior: тест обязателен, если поведение нетривиальное или уже ломалось раньше.
- Если локально не запускал релевантный тест, явно укажи это в результате.

### Полезные матчеры (jest-dom)

```typescript
expect(el).toBeInTheDocument()
expect(el).toBeVisible()
expect(el).toBeDisabled()
expect(el).toBeChecked()
expect(el).toHaveClass("sm")
expect(el).toHaveAttribute("aria-expanded", "true")
expect(el).toHaveTextContent("Submit")
expect(el).toHaveFocus()
```

### Мокирование

```typescript
// Мок функции
const onChangeMock = vi.fn();

// Мок модуля
vi.mock("../utils", () => ({
    formatDate: vi.fn(() => "01.01.2024"),
}));

// Очистка после теста (если нужно)
afterEach(() => {
    vi.clearAllMocks();
});
```

---

## Visual regression тесты (Storybook test-runner)

### Как работает

- **Каждая story** автоматически снимается на двух viewport'ах: `xs` (575px) и `xl` (1200px).
- Скриншоты сравниваются с baseline в `__screenshots__/`.
- Baseline **только из Docker/CI** (Linux). Никогда не коммить скриншоты с локальной macOS.

### Когда нужны Visual tests

Создавай отдельную `VisualTests` story если:
- Компонент требует взаимодействия перед скриншотом (открыть dropdown, hover, focus).
- Нужно покрыть состояние, которого нет в документационных stories.
- Нужно объединить несколько вариантов в один скриншот.

### Обновление baseline

```text
GitHub → Actions → "Update Visual Snapshots" → Run workflow → выбери ветку
```

Workflow сам закоммитит обновлённые скриншоты в ветку.

### Локальная проверка (опционально)

```bash
npm run test-visual:docker        # прогон через Docker
npm run test-visual:docker:update # обновление baseline через Docker
```

### Что делать при упавших visual тестах

1. Проверить, ожидаемо ли изменение (намеренное изменение дизайна?).
2. Если да — запустить `Update Visual Snapshots` workflow.
3. Если нет — найти и исправить визуальную регрессию в коде.

---

## E2E тесты (Playwright)

### Когда писать

- Критичные пользовательские флоу, затрагивающие несколько компонентов.
- Взаимодействия, которые нельзя протестировать в unit-тестах (например, drag-and-drop, clipboard).
- Не нужен для каждого компонента — только для сложных флоу.

### Расположение

```text
e2e/tests/{componentName}.spec.ts
```

### Структура

```typescript
import { test, expect, Page } from "@playwright/test";

test.describe("ComponentName", () => {
    test("should do something on user action", async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=category--story-name");

        const element = page.getByRole("button", { name: "Submit" });
        await expect(element).toBeVisible();
        await element.click();

        await expect(page.getByText("Success")).toBeVisible();
    });
});
```

### Правила

- **Не используй фиксированные таймауты** (`page.waitForTimeout`) как основной способ синхронизации. Используй `waitFor`, `toBeVisible`, `toBeEnabled`.
- Исключение: короткий `waitForTimeout(100-300ms)` для ожидания CSS-анимации допустим, если иначе состояние надёжно не поймать. Такой таймаут должен быть коротким и обоснованным.
- Тесты должны быть **независимы** друг от друга (не полагаться на порядок выполнения).
- URL для теста — iframe Storybook конкретной story.
- Не переименовывай story export/name без синхронного обновления e2e-URL и visual baseline.

---

## Запуск тестов

```bash
# Unit
npm run test-unit          # одноразовый прогон
npm run test-unit:watch    # watch-режим

# Visual (требует запущенного Storybook на :6006)
npm run test-visual:docker

# E2E (требует запущенного Storybook)
npm run test-e2e
```
