# Codestyle — Triplex-Next

Правила написания кода для AI-агентов и разработчиков.
Линтер и форматтер применяются автоматически при коммите через `lint-staged`.

---

## Форматирование

**Prettier** (`.prettierrc`):
- `printWidth: 120`
- `tabWidth: 4`
- Остальное — prettier defaults (одинарные кавычки в JSX, trailing comma es5)

Не нужно форматировать вручную — `lint-staged` запустит `prettier --write` при `git commit`.

---

## TypeScript

### Основные правила

- `strict: true` включён — никаких лазеек.
- **Запрещено:** `any`. Использовать `unknown` + type guard или точный тип.
- **Запрещено:** non-null assertion (`!`) без объясняющего комментария.
- **Запрещено:** `as Type` без крайней необходимости. Предпочитать `satisfies`.

```typescript
// ❌
const value = someMap[key] as string;

// ✅
const value = someMap[key];
if (typeof value !== "string") throw new Error("...");
```

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
- Не используй `React.FC<Props>` — мешает forwardRef и defaultProps.
- Явно указывай тип children если компонент его принимает (`React.ReactNode`).

```typescript
// ✅
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme: EButtonTheme;
    size?: EComponentSize;
    loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
    const { theme, size = EComponentSize.MD, loading, className, children, ...rest } = props;
    // ...
});
```

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

- **`forwardRef`** — обязателен на всех UI-компонентах. Без исключений.
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

### `React.memo`

Использовать только если профилирование показало конкретную проблему производительности. Не добавлять "на всякий случай".

### Хуки

- Не используй `useEffect` для синхронной логики — только для side-effects.
- Зависимости `useEffect` должны быть исчерпывающими (ESLint-правило `exhaustive-deps` включено).
- Предпочитай `useCallback` / `useMemo` только там, где это действительно нужно.

### Импорты

В примерах и тестах импортируй из корня пакета, не по относительным путям:

```typescript
// ✅ В stories/examples и e2e
import { Button, EButtonTheme } from "@sberbusiness/triplex-next";

// ✅ Внутри src/components
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
```

Порядок импортов (prettier-plugin-organize-imports не используется, но придерживайся):
1. React
2. Сторонние библиотеки
3. Внутренние (`@sberbusiness/triplex-next/...`)
4. Относительные импорты

---

## LESS (CSS Modules)

### Правила

- Только `.module.less` файлы — никаких глобальных стилей.
- Имена классов — **camelCase**: `styles.secondaryLight`, `styles.iconOnly`.
- Никаких **inline styles** в компонентах (в stories допустимо для лейаута примеров).
- Никаких **hardcoded** цветов, размеров — только CSS-переменные из токенов.
- `!important` — только в крайнем случае, с комментарием почему.

### Применение токенов

```less
// ❌
.button {
    background: #1a73e8;
    color: white;
}

// ✅
.button {
    background: var(--triplex-next-Button-General_Background_Default);
    color: var(--triplex-next-Button-General_Color_Default);
    
    &:hover {
        background: var(--triplex-next-Button-General_Background_Hover);
    }
}
```

### Структура

```less
.button {
    // базовые стили

    // модификаторы через &.
    &.sm { height: 28px; }
    &.md { height: 40px; }

    // состояния
    &:hover { ... }
    &:focus-visible { ... }
    &:disabled, &.disabled { ... }

    // вложенные элементы
    .icon { ... }
    .loader { ... }
}
```

---

## Принципы написания кода

### DRY (Don't Repeat Yourself)

Если один и тот же паттерн встречается в 3+ местах — вынеси в утилиту.
Исключение: примеры в stories — там дублирование допустимо ради копируемости.

### KISS (Keep It Simple, Stupid)

Простейшее решение, которое решает задачу. Не усложняй ради гибкости, которой не потребуется.

### YAGNI (You Aren't Gonna Need It)

Не добавляй props, варианты или абстракции, которых нет в текущем требовании. Дизайн-система меняется через Figma → код, не через предположения.

### Single Responsibility

Один компонент — одна ответственность. Если компонент делает слишком много — это сигнал к декомпозиции на субкомпоненты.

### Не добавляй без задачи

- Не добавляй docstring/комментарии к коду, который не изменял.
- Не рефакторь окружающий код без задачи.
- Не добавляй обработку ошибок для сценариев, которые не могут произойти.

---

## MCP-серверы для актуальных best practices

Для получения актуальной документации React, TypeScript, Testing Library — можно использовать [Context7 MCP](https://github.com/upstash/context7).

**Установка для Claude Code:**
```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

После установки агент сможет делать `use context7` для получения актуальной документации библиотек.
