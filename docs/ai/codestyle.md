# Codestyle — Triplex-Next

Правила написания кода для AI-агентов и разработчиков.
Линтер и форматтер применяются автоматически при коммите через `lint-staged`.

---

## Форматирование

**Prettier** (`.prettierrc`):
- `printWidth: 120`
- `tabWidth: 4`
- Остальное — prettier defaults (двойные кавычки в JSX, trailing comma es5)

Не нужно форматировать вручную — `lint-staged` запустит `prettier --write` при `git commit`.

---

## TypeScript

### Основные правила

- `strict: true` включён — никаких лазеек.
- **Запрещено:** `any`. Использовать `unknown` + type guard или точный тип.
- **Запрещено:** non-null assertion (`!`) без объясняющего комментария.
- **Запрещено:** `as Type` без крайней необходимости. Предпочитать `satisfies`.

```typescript
// ❌ as без проверки — скрывает потенциальную проблему
const value = someMap[key] as string;

// ✅ Типизируй map правильно, чтобы проблемы не было в принципе
const someMap: Record<string, string> = { ... };
const value = someMap[key]; // string | undefined — TypeScript укажет на неиспользованный undefined

// ✅ Если неопределённость неизбежна — используй fallback
const value = typeof someMap[key] === "string" ? someMap[key] : "";
```

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
- Не меняй корневой DOM-элемент и `ref` target без явной необходимости: для дизайн-системы это часть публичного контракта.

### Проектирование публичного API

- Для взаимоисключающих вариантов предпочитай discriminated union, а не несколько boolean-props.
- Не добавляй prop "на всякий случай". Новый prop должен отражать реальное требование из дизайна или API-задачи.
- Если prop имеет смысл только для одной темы или режима, описывай его только в соответствующей ветке union type.
- Controlled/uncontrolled API добавляй только если компонент действительно владеет состоянием. Если поддерживаются оба режима, поведение должно быть явно задокументировано и протестировано.
- Deprecated API помечай через JSDoc `@deprecated` и указывай альтернативу.

### `React.memo`

Использовать только если профилирование показало конкретную проблему производительности. Не добавлять "на всякий случай".

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

- Контекст между частями пробрасывается через `React.createContext` + хук `useSelectContext`.
- Субкомпоненты экспортируются и как самостоятельные именованные экспорты (`SelectOption`), и через составной API (`Select.Option`).
- Контекст — внутренний (`not exported`), если он не нужен потребителям.

### Полиморфный `as` prop

В дизайн-системе **не используем** полиморфный `as` prop — он усложняет типизацию и нарушает контракт `forwardRef`. Вместо этого:

- Для кнопки-ссылки — отдельный компонент (`ButtonLink`) или discriminated union через `href` prop.
- Для элемента списка — компонент принимает `children` и не диктует семантику снаружи.

Если задача требует `as` prop, согласуй с командой перед реализацией.

### Хуки

- Не используй `useEffect` для синхронной логики — только для side-effects.
- Зависимости `useEffect` должны быть исчерпывающими (ESLint-правило `exhaustive-deps` включено).
- `useLayoutEffect` — только для синхронных DOM-измерений (размеры, позиция). Во всех остальных случаях — `useEffect`.
- Предпочитай `useCallback` / `useMemo` только там, где это действительно нужно.

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
- Не делай отдельный рефакторинг import-style в legacy stories/tests без задачи на миграцию.

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

### Применение токенов (цвета)

```less
// ❌ hardcoded цвет
.button {
    background: #1a73e8;
    color: white;
}

// ✅ CSS-переменная из токенов
.button {
    background: var(--triplex-next-Button-General_Background_Default);
    color: var(--triplex-next-Button-General_Color_Default);

    &:hover {
        background: var(--triplex-next-Button-General_Background_Hover);
    }
}
```

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

### Структура

```less
.button {
    // базовые стили

    // модификаторы через &.
    &.sm { height: 28px; }
    &.md { height: 40px; }

    // состояния
    &:hover { ... }
    &:focus-visible { ... }  // не :focus — виден только при клавиатурной навигации
    &:disabled, &.disabled { ... }

    // вложенные элементы
    .icon { ... }
    .loader { ... }
}
```

---

## Accessibility

### Мультиязычность: не хардкодь aria-текст

Дизайн-система используется в мультиязычных продуктах. **Никогда не пиши строки на конкретном языке внутри компонента** — ни в `aria-label`, ни в `title`, ни в любом другом атрибуте.

```typescript
// ❌ Хардкод языка внутри компонента
<button aria-label="Закрыть" onClick={onClose}>
    <CloseIcon />
</button>

// ✅ Текст передаётся снаружи через ...rest или явный prop
export interface IModalCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // aria-label пробрасывается через ...rest — потребитель передаёт его на своём языке
}

export const ModalCloseButton = React.forwardRef<HTMLButtonElement, IModalCloseButtonProps>(
    (props, ref) => {
        const { className, ...rest } = props;
        return (
            <button ref={ref} className={clsx(styles.closeButton, className)} {...rest} />
        );
    }
);
```

В stories добавляй пример значения для демонстрации — это не хардкод, а иллюстрация:

```typescript
// В stories/examples/DefaultExample.tsx — пример для документации
<ModalCloseButton aria-label="Закрыть" />
```

Если компоненту нужен внутренний текст для связи элементов (например, `aria-labelledby` на диалоге, ссылающийся на заголовок), используй ID-связку, а не текстовый литерал:

```typescript
// ✅ Связь через ID — не зависит от языка
const titleId = useId();

<dialog aria-labelledby={titleId} {...rest}>
    <h2 id={titleId}>{title}</h2>
    {children}
</dialog>
```

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
- Не мигрируй legacy stories/tests на новый шаблон "по пути", если это не часть текущей задачи.

---

## MCP-серверы для актуальных best practices

Для получения актуальной документации React, TypeScript, Testing Library — можно использовать [Context7 MCP](https://github.com/upstash/context7).

**Установка для Claude Code:**
```bash
npx ctx7 setup --claude
```

После установки агент сможет делать `use context7` для получения актуальной документации библиотек.
