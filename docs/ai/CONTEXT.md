# Triplex-Next: Контекст для AI-агентов

Этот файл — главная точка входа в контекст дизайн-системы для любого AI-агента.
Читай его полностью перед тем, как вносить изменения в компоненты.

---

## Что такое Triplex-Next

React-библиотека компонентов дизайн-системы.
Пакет: `@sberbusiness/triplex-next`.
Основная линия разработки: `main` → v1.x на React 18 + TypeScript strict.
Поддерживаемая legacy-линия: `release-0` → v0.x на React 17, синхронизируется мейнтейнерами.

**Основной сценарий работы агента:** добавить новый prop или вариант к существующему компоненту по описанию и/или макету из Figma.

---

## Стек

| Слой | Технология |
|---|---|
| Компоненты | React 18/17, TypeScript 5 (strict) |
| Стили | LESS CSS Modules (`.module.less`) |
| Дизайн-токены | CSS-переменные, генерируются в `src/generated/` |
| Сборка | Vite, ES-модули only |
| Документация | Storybook 9 |
| Unit-тесты | Vitest + Testing Library |
| E2E / visual | Playwright + jest-image-snapshot |

---

## Структура компонента

Каждый компонент живёт в `src/components/{ComponentName}/` и обычно содержит:

```
src/components/Button/
├── Button.tsx                 # Основной компонент
├── ButtonBase.tsx             # Базовый элемент (опционально)
├── ButtonIcon.tsx             # Субкомпонент (опционально)
├── enums.ts                   # Enum'ы, специфичные для компонента
├── index.ts                   # Barrel export — ОБЯЗАТЕЛЕН
├── types.ts                   # Часто есть, если типы вынесены отдельно
├── styles/
│   ├── Button.module.less     # Базовые стили
│   └── ButtonGeneral.module.less  # Стили по теме/варианту
├── __tests__/
│   └── Button.test.tsx        # Unit-тесты
└── Button-AI.md               # Документация для AI-агентов (если компонент уже задокументирован)
```

Истории (stories) хранятся отдельно. В репозитории встречаются как flat-path файлы
(`stories/Badge.stories.tsx`), так и сгруппированные (`stories/Buttons/Button.stories.tsx`).
Для новых или существенно переписанных stories используй modern pattern из
`docs/ai/stories-guide.md`.

---

## Соглашения по именованию

| Сущность | Префикс | Пример |
|---|---|---|
| Интерфейс | `I` | `IButtonGeneralProps` |
| Union type | `T` | `TButtonProps` |
| Enum | `E` | `EButtonTheme` |
| Enum в файле | `enums.ts` в папке компонента | `Button/enums.ts` |
| LESS класс | camelCase | `styles.secondaryLight` |

---

## Дизайн-токены (CSS-переменные)

Паттерн именования:
```
--triplex-next-{Component}-{Variant}_{Property}_{State}
```

Примеры:
```
--triplex-next-Button-General_Background_Default
--triplex-next-Button-General_Color_Hover
--triplex-next-Button-Secondary_Shadow_Focus
--triplex-next-Button-Danger_Background_Disabled
```

**Состояния:** `Default`, `Hover`, `Active`, `Focus`, `Disabled`
**Свойства:** `Background`, `Color`, `Shadow`, `Border`

Токены генерируются в `src/generated/themesCssVariables.css`. Не редактируй этот файл вручную.

Если добавляешь новое визуальное состояние — нужен новый токен. Имя токена согласуй с дизайнером в Figma.

---

## Документация конвенций

Детальные правила вынесены в отдельные файлы:

| Тема | Файл |
|---|---|
| Codestyle (TypeScript, React, LESS, принципы) | `docs/ai/codestyle.md` |
| Тестирование (unit, visual, e2e) | `docs/ai/tests.md` |
| Stories (структура, примеры, чек-лист) | `docs/ai/stories-guide.md` |
| Коммиты, ветки, PR-воркфлоу | `docs/ai/commits.md` |

`docs/ai/CODING_GUIDELINES.md` — краткий канонический список обязательных правил.
Если формулировки в entrypoint-файлах расходятся, ориентируйся на него и на
профильный подробный гайд.

---

## Как добавить новый prop к существующему компоненту

### 1. Определи, в каком интерфейсе добавлять

- Если prop нужен только для одной темы — добавь в соответствующий интерфейс (`IButtonGeneralProps`)
- Если для всех тем — добавь в каждый интерфейс темы и в базовый интерфейс
- Обнови union type (`TButtonProps`) при необходимости

### 2. Добавь prop в TypeScript-интерфейс

```typescript
export interface IButtonGeneralProps extends IButtonBaseProps {
    theme: EButtonTheme.GENERAL;
    size: EComponentSize;
    // ... existing props
    newProp?: string; // добавь JSDoc если поведение нетривиально
}
```

### 3. Используй prop в компоненте

```typescript
// Деструктурируй из пропсов:
const { theme, size, newProp, className, ...rest } = props;

// Применяй через clsx:
<button
    className={clsx(styles.button, styles[size], { [styles.newVariant]: newProp === 'variant' }, className)}
    {...rest}
>
```

### 4. Добавь стили в LESS-модуль

```less
// В Button.module.less или в новый файл для варианта:
.button {
    &.newVariant {
        // используй существующие CSS-переменные или новые токены
        background: var(--triplex-next-Button-General_Background_NewVariant);
    }
}
```

### 5. Обнови Storybook story

В существующем story-файле компонента:
- Добавь prop в `args` и `argTypes` Playground-стори
- Если prop имеет визуальные варианты — добавь named story (`Sizes`, `Themes` и т.д.)
- Если story уже использует `examples/` + `?raw`, сохрани этот modern pattern
- Если story legacy, не рефакторь весь файл только ради миграции структуры без отдельной задачи
- Подробно: `docs/ai/stories-guide.md` → раздел "Что обновлять при добавлении нового prop"

### 6. Обнови тесты

В `src/components/{ComponentName}/__tests__/{ComponentName}.test.tsx`:
- Добавь тест-кейс на рендеринг нового prop
- Проверь CSS-класс, атрибут или текст
- Следуй существующему паттерну тестов в файле

---

## Инварианты — что НЕЛЬЗЯ менять без обсуждения

1. **`forwardRef`** — обязателен на всех компонентах. Не убирай.
2. **Публичный API** — имена props, их типы, enum-значения. Это breaking change → мажорная версия.
3. **`index.ts` barrel exports** — всё, что было экспортировано, должно остаться экспортированным.
4. **CSS-переменные токенов** — переименование ломает темизацию у потребителей библиотеки.
5. **Имена LESS-классов**, которые могут использоваться снаружи — согласуй перед изменением.
6. **Корневой DOM-элемент, ref-target и accessibility-контракт** публичного компонента — не менять без причины и проверки.
7. **Story ids**, на которые опираются e2e/visual тесты, не переименовывать без синхронного обновления тестов.

---

## Как читать существующий код

**Стили:** LESS-классы импортируются как объект `styles`:
```typescript
import styles from './styles/Button.module.less';
// Использование:
className={styles.button}
className={clsx(styles.button, styles.general, { [styles.loading]: loading })}
```

**Утилиты:**
- `clsx` — объединение className с условиями
- `lodash-es/uniqueId` — уникальные ID для aria-атрибутов

**Паттерн миграции:**
- В репозитории сосуществуют legacy и modern stories/tests.
- Для небольших правок следуй локальному паттерну файла.
- Для новых компонентов и больших переписок используй modern conventions из `stories-guide.md` и `tests.md`.

**Стандартные зависимости компонентов:**
- `src/enums/EComponentSize` — размеры SM | MD | LG (общий для всех компонентов)
- `src/components/Loader` — спиннер загрузки

---

## Figma и MCP

Каждый компонент имеет Figma Node ID в своём `{ComponentName}-AI.md`.

Если в вашем окружении настроен Figma MCP (`@figma/mcp-server`):
1. Возьми `figma-node` из frontmatter компонента
2. Используй инструмент MCP для получения дизайн-спецификации ноды
3. Сравни с текущим кодом и внеси нужные изменения

Настройка MCP: см. `docs/ai/ROADMAP.md` → секция "Figma MCP Setup".

---

## Навигация по документации компонентов

Если компонент уже задокументирован, его AI-документация лежит в:
`src/components/{ComponentName}/{ComponentName}-AI.md`

Пример: `src/components/Button/Button-AI.md`

Шаблон для новых компонентов: `docs/ai/template-AI.md`

---

## Внешние ресурсы

- Документация для разработчиков и дизайнеров: https://triplex-design.ru/next/ru/Web/Components
- Storybook (локально): `npm run storybook` → http://localhost:6006
- Истории: `stories/` в корне репозитория
