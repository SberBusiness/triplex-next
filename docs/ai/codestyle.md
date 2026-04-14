# Codestyle — Triplex-Next

Правила написания кода для AI-агентов и разработчиков.
Линтер и форматтер применяются автоматически при коммите через `lint-staged`.

---

## Форматирование

Не нужно форматировать вручную — `lint-staged` запустит `prettier --write` при `git commit`.

---

## TypeScript

### Основные правила

- `strict: true` включён — никаких лазеек.
- **Запрещено:** `any`. Использовать `unknown` + type guard или точный тип.
- **Запрещено:** non-null assertion (`!`) без объясняющего комментария.
- **Запрещено:** `as Type` без крайней необходимости. Предпочитать `satisfies`.

В компонентной библиотеке нельзя бросать исключения в рантайме — они упадут у конечного пользователя приложения. Всегда предпочитай правильную типизацию или fallback-значение.

### Именование

| Сущность | Префикс | Пример |
|---|---|---|
| Interface | `I` | `IButtonProps`, `IButtonGeneralProps` |
| Union type | `T` | `TButtonProps` |
| Enum | `E` | `EButtonTheme`, `EComponentSize` |
| Константа (модульного уровня) | UPPER_SNAKE_CASE | `DEFAULT_TIMEOUT` |
| Компонент | PascalCase | `Button`, `DateField` |
| Хук | camelCase с `use` | `useClickOutside` |
| Утилита | camelCase | `formatDate`, `uniqueId` |

### Интерфейсы компонента

- Экспортируй интерфейс props — он часть публичного API.
- Явно указывай тип children если компонент его принимает (`React.ReactNode`).

### Типизация пропов с вариантами (discriminated union)

Если компонент имеет несколько несовместимых тем/режимов — используй discriminated union:

```typescript
export interface IButtonGeneralProps extends IButtonBaseProps {
    theme: EButtonTheme.GENERAL | EButtonTheme.SECONDARY;
    size: EComponentSize;
}

export interface IButtonLinkProps extends IButtonBaseProps {
    theme: EButtonTheme.LINK;
    type?: never; // LINK-кнопка не имеет type
}

export type TButtonProps = IButtonGeneralProps | IButtonLinkProps;
```

---

## React

### Обязательные паттерны

- **`forwardRef`** — обязателен на всех UI-компонентах.
- **Функциональные компоненты** — только. Классовые компоненты не используются.
- **`clsx`** — для объединения className. Никогда не конкатенировать строки.

```typescript
// ❌
className={`${styles.button} ${size === 'sm' ? styles.sm : ''}`}

// ✅
className={clsx(styles.button, styles[size], { [styles.loading]: loading }, className)}
```

- Всегда принимай `className` в пропах и прокидывай его в корневой элемент (через spread или явно).
- Всегда прокидывай `...rest` на семантический элемент.

### Составные компоненты (Compound Components)

Для сложных компонентов с несколькими взаимосвязанными частями (Select + Option, Tabs + Tab + TabPanel) используй паттерн составных компонентов:

```typescript
// Статические субкомпоненты через Object.assign
export const Select = Object.assign(
    React.forwardRef<HTMLDivElement, ISelectProps>((props, ref) => {
        // ...
    }),
    { Option: SelectOption, Group: SelectGroup }
);

// Использование:
<Select value={value} onChange={onChange}>
    <Select.Option value="a">Option A</Select.Option>
</Select>
```

### Импорты

В stories/examples и тестах правила разные:

```typescript
// ✅ В stories/examples, предназначенных для копирования
import { Button, EButtonTheme } from "@sberbusiness/triplex-next";

// ✅ Внутри src/components
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

// ✅ В unit-тестах можно импортировать локально, следуя паттерну файла
import { Button } from "../Button";
```

Правила:
- В новых stories/examples, которые показывают копируемый код, импортируй публичный API из `@sberbusiness/triplex-next` или публичных subentry.
- В unit-тестах и внутреннем коде следуй локальному паттерну файла и предпочитай ближайшие импорты для тестируемого модуля и внутренних зависимостей.

Порядок импортов (prettier-plugin-organize-imports не используется, но придерживайся):
1. React
2. Сторонние библиотеки
3. Внутренние (`@sberbusiness/triplex-next/...`)
4. Относительные импорты
5. Стили

---

## LESS (CSS Modules)

### Правила

- Только `.module.less` файлы — никаких глобальных стилей.
- Имена классов — **camelCase**: `styles.secondaryLight`, `styles.iconOnly`.
- Никаких **inline styles** в компонентах (в stories допустимо для лейаута примеров).
- **Цвета** — только через CSS-переменные токенов (`var(--triplex-next-...)`). Никаких hex/rgb.
- **Переиспользуемые размерные константы** (z-index, отступы страницы, ширины оверлеев) — через LESS-переменные из `src/styles/components/` (`@page-padding-desktop-x`, `@sideOverlayLGWidth` и т.д.). Компонент-специфичные значения (высота кнопки, радиус скругления) можно задавать литералом.
- `!important` — только в крайнем случае, с комментарием почему.


### Применение LESS-переменных (общие размерные константы)

```less
// ❌ дублируем магическую константу
.panel {
    max-width: 864px;
}

// ✅ берём из src/styles/components/lightbox.less
@import (reference) "../../styles/components/lightbox";

.panel {
    max-width: @lightBox-content-max-width-md;
}
```

Если нужной константы в `src/styles/components/` нет, а значение используется более чем в одном компоненте — добавь переменную в подходящий файл.

---

## Accessibility

### Мультиязычность: не хардкодь aria-текст

Дизайн-система используется в мультиязычных продуктах. **Никогда не пиши строки на конкретном языке внутри компонента** — ни в `aria-label`, ни в `title`, ни в любом другом атрибуте.

В stories добавляй пример значения для демонстрации — это не хардкод, а иллюстрация:

```typescript
// В stories/examples/DefaultExample.tsx — пример для документации
<ModalCloseButton aria-label="Закрыть" />
```

Если компоненту нужен внутренний текст для связи элементов (например, `aria-labelledby` на диалоге, ссылающийся на заголовок), используй ID-связку, а не текстовый литерал:

### :focus-visible вместо :focus

```less
// ❌ Показывает outline и при клике мышью
.button:focus {
    outline: 2px solid var(--triplex-next-Button-General_Shadow_Focus);
}

// ✅ Только при клавиатурной навигации
.button:focus-visible {
    outline: 2px solid var(--triplex-next-Button-General_Shadow_Focus);
}
```

---

## Принципы написания кода

### DRY (Don't Repeat Yourself)
### KISS (Keep It Simple, Stupid)
### YAGNI (You Aren't Gonna Need It)
### Single Responsibility

### Не добавляй без задачи

- Не добавляй docstring/комментарии к коду, который не изменял.
- Не рефакторь окружающий код без задачи.
- Не добавляй обработку ошибок для сценариев, которые не могут произойти.
- Не мигрируй legacy stories/tests на новый шаблон "по пути", если это не часть текущей задачи.

---