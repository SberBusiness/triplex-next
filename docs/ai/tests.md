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

```
src/components/{ComponentName}/__tests__/{ComponentName}.test.tsx
```

Один файл на компонент. Если компонент имеет субкомпоненты (ButtonIcon, ButtonDropdown), тесты субкомпонентов — в отдельных файлах того же `__tests__/`.

### Импорты

```typescript
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ComponentName } from "../ComponentName";
// ⚠️ Импортируй из src напрямую (не из @sberbusiness/triplex-next) в unit-тестах
```

### Структура

```typescript
describe("ComponentName", () => {
    // Хелпер для повторяющегося рендера
    const renderComponent = (props = {}) =>
        render(<ComponentName theme={ETheme.DEFAULT} {...props} />);

    it("renders without errors", () => {
        renderComponent();
        expect(screen.getByTestId("component-name")).toBeInTheDocument();
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

```
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

```
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

- **Не используй фиксированные таймауты** (`page.waitForTimeout`). Используй `waitFor`, `toBeVisible`, `toBeEnabled`.
- Исключение: короткий `waitForTimeout(100-300ms)` для ожидания CSS-анимации — допустимо.
- Тесты должны быть **независимы** друг от друга (не полагаться на порядок выполнения).
- URL для теста — iframe Storybook конкретной story.

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
