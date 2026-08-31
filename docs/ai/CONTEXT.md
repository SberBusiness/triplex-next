# Triplex-Next: Контекст для AI-агентов

Этот файл — главная точка входа в контекст дизайн-системы для любого AI-агента.
Читай его полностью перед тем, как вносить изменения в компоненты.

---

## Что такое Triplex-Next

React-библиотека компонентов дизайн-системы.
Пакет: `@sberbusiness/triplex-next`.
Основная линия разработки: `main` → v1.x на React 18 + TypeScript strict.
Поддерживаемая legacy-линия: `release-0` → v0.x на React 17, синхронизируется мейнтейнерами.

**Основной сценарий работы агента:** добавить новый prop или вариант к существующему компоненту по текстовому описанию или скриншоту.

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
| Visual regression | Storybook test-runner + jest-image-snapshot |
| E2E | Playwright |

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
└── Button-ai.md               # Документация для AI-агентов (если компонент уже задокументирован)
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

## Дизайн-токены

У токенов два слоя. Не путай их: в документации для потребителя описывается
только первый.

### Публичный слой — токены в TypeScript

Источник значений: `src/components/DesignTokens/DesignTokensCore.ts` (палитра,
10 групп) и `src/components/DesignTokens/components/{Group}.ts` (токены
компонентов, 56 групп). Путь токена — `{Группа}.{Токен}`:

```
ColorBrand.50
Button.General_Background_Default
Calendar.View_Item_Background_Selected_Hover
```

Ровно в этом виде токен переопределяется потребителем через `ThemeProvider`:

```tsx
// tokens сравнивается по ссылке — объект выносится из рендера.
const TOKENS = {
    ColorBrand: {50: {value: "blue"}},
    Calendar: {Background: {ref: "ColorNeutral.100"}},
};

<ThemeProvider tokens={TOKENS} scopeRef={scopeRef}>…</ThemeProvider>
```

Правила слоя:

- объект токенов **плоский** — группы лежат на верхнем уровне
  (`TDesignTokens = TDesignTokensCore & TDesignTokensComponents`). Вложенности
  `core` / `components` в API нет, она есть только в раскладке исходников;
- значение токена — либо `{value: "<css>"}`, либо `{ref: "<Группа>.<Токен>"}`;
- `ref` указывает **только на core-токены**: тип `designTokensRefs` генерируется
  из `DesignTokensCore` (`scripts/generateRefTokensTypes.ts`), ссылка на
  компонентный токен не скомпилируется;
- у компонентного токена всегда пара значений — `[светлая, тёмная]` тема;
- имена core-групп и групп компонентов не должны пересекаться: в одном плоском
  неймспейсе они схлопнутся. Проверяется гардом в `scripts/syncAiMdTokens.ts`.

**Состояния:** `Default`, `Hover`, `Active`, `Focus`, `Disabled`
**Свойства:** `Background`, `Color`, `Shadow`, `Border`

Если добавляешь новое визуальное состояние — нужен новый токен. Имя токена
согласуй с дизайнером.

### Внутренний слой — CSS-переменные

В LESS токен читается как css-переменная:

```less
background: var(--triplex-next-Button-General_Background_Default);
```

Это внутренняя реализация, а не публичное имя: на сборке
`scripts/replaceDesignTokenVersion.js` дописывает к переменной версию пакета,
и в опубликованном коде она выглядит как
`--triplex-next-{Группа}-{Токен}-{версия}`. Имя меняется каждый релиз, поэтому
потребитель не может на него опереться.

Отсюда правило: **в стилях библиотеки пиши `var(--triplex-next-...)`, а в
документации (`*-ai.md`, описания в Storybook) указывай путь токена
`{Группа}.{Токен}`.** Переименование css-переменной остаётся breaking change —
её видят потребители, дотянувшиеся до внутреннего слоя.

Полный набор переменных генерируется в `src/generated/themesCssVariables.css`.
Не редактируй этот файл вручную.

### Токены в AI-документации

Frontmatter `{Component}-ai.md` перечисляет пути токенов:

```yaml
tokens:
  - Calendar.Background
  - Calendar.View_Header_Color
```

Этот список читает MCP-сервер (`get_tokens`), поэтому формат обязателен.
Проверяется и нормализуется скриптом:

```bash
npm run syncAiMdTokens            # нормализовать блоки tokens:
npm run syncAiMdTokens -- --check # проверить, ничего не записывая
```

Скрипт не определяет состав токенов за автора (в одной директории живёт
несколько компонентов с разными наборами) — он нормализует и проверяет то, что
перечислено, а расхождения с LESS показывает предупреждениями.

---

## Документация конвенций

Детальные правила вынесены в отдельные файлы:

| Тема | Файл |
|---|---|
| Codestyle (TypeScript, React, LESS, принципы) | `docs/ai/codestyle.md` |
| Тестирование (unit, visual, e2e) | `docs/ai/tests.md` |
| Stories (структура, примеры, чек-лист) | `docs/ai/stories-guide.md` |
| Коммиты, ветки, PR-воркфлоу | `docs/ai/commits.md` |

`docs/ai/codestyle.md` — краткий канонический список обязательных правил.
Если формулировки в entrypoint-файлах расходятся, ориентируйся на него и на
профильный подробный гайд.

---

## Приоритет источников

Если инструкции расходятся, ориентируйся на них в таком порядке:

1. `src/components/{ComponentName}/{ComponentName}-ai.md` для конкретного компонента, если файл существует
2. `docs/ai/codestyle.md`
3. Профильный подробный гайд по зоне изменений (`codestyle.md`, `tests.md`, `stories-guide.md`, `commits.md`)
4. Этот файл (`docs/ai/CONTEXT.md`)
5. Локальный паттерн исходников компонента, stories и тестов

Не предполагай, что у каждого компонента уже есть AI-документация. Если файла
`{ComponentName}-ai.md` нет, ориентируйся на код, stories, тесты и общие правила
репозитория.

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
- `React.useId()` — уникальные ID для aria-атрибутов (предпочтительно в React 18, корректно работает с SSR)
- `lodash-es/uniqueId` — генерация уникальных ID вне компонентного контекста (когда `useId` недоступен)

**Паттерн миграции:**
- В репозитории сосуществуют legacy и modern stories/tests.
- Для небольших правок следуй локальному паттерну файла.
- Для новых компонентов и больших переписок используй modern conventions из `stories-guide.md` и `tests.md`.

**Стандартные зависимости компонентов:**
- `src/enums/EComponentSize` — размеры SM | MD | LG (общий для всех компонентов)
- `src/components/Loader` — спиннер загрузки

---

## Минимальная проверка перед завершением задачи

- Правки документации и конфигов: проверь ссылки, команды, примеры кода и согласованность между файлами.
- Правки компонентов и логики: запусти `npx tsc --noEmit` для проверки типов затронутых файлов и по возможности запусти focused unit test, если затронуто публичное поведение.
- Правки stories с визуальным эффектом: проверь, что состояние покрыто существующей story или новой `Visual tests` story.
- Правки accessibility, focus management, keyboard navigation и overlay-поведения: добавь или обнови точечный автотест, если это уместно.
- Если релевантная проверка не запускалась, явно сообщи об этом в финальном отчёте.

---

## Навигация по документации компонентов

Если компонент уже задокументирован, его AI-документация лежит в:
`src/components/{ComponentName}/{ComponentName}-ai.md`

Пример: `src/components/Button/Button-ai.md`

Шаблон для новых компонентов: `docs/ai/template-ai.md`

### Когда создавать `{ComponentName}-ai.md`

Не для каждого экспорта из barrel `index.ts` нужен отдельный AI.md — это
раздуло бы `mcp-data.json` тривиальными wrapper'ами и снизило сигнал/шум для
AI-агента.

Создавай отдельный AI.md, когда выполняются **оба** условия:

1. Компонент экспортируется из barrel `src/components/{Family}/index.ts`
   (внутренние/приватные — нет).
2. У компонента есть нетривиальный API или поведение: собственные props
   сверх `className + ref + ...rest`, либо state, контекст, клавиатура,
   callback'и, accessibility-контракт, render-prop, discriminated union.

Тривиальные wrapper'ы (`className + spread + forwardRef` без своей логики)
описывай разделом **«Связанные компоненты»** в AI.md родителя.

**Пример из семейства List:**

| Создаём AI.md | Описываем в родителе |
|---|---|
| `List`, `ListItem`, `ListActionItem`, `ListTableItem`, `ListItemSelectable`, `ListItemControlsButton`, `ListItemControlsButtonDropdown`, `ListSortable`, `ListSortableItem` | `ListItemControls`, `ListItemContent`, `ListEmptyState`, `ListItemLoading`, `ListItemTailLeft`, `ListItemTailRight`, `ListSortableItemTarget`, `ListSortableItemControls` |

В ROADMAP-таблице каждый AI.md-достойный компонент идёт отдельной строкой —
так считается прогресс покрытия и видны субкомпоненты с собственным API.

---

## Как заполнять `related` в AI.md

Индекс переходов для агента, а не «похожие компоненты»: только имена, пояснения —
в разделе «Связанные компоненты». Имя обязано быть адресатом: компонентом из
таблицы `docs/ai/ROADMAP.md`, у которого AI.md есть или запланирован. Связь с
обёрткой вне таблицы записывается на её родителя (`IDropdownMobileMaskedInputProps
extends IFormFieldMaskedInputProps` → `FormField`).

Адресат попадает в `related`, только если подходит под одну из четырёх категорий:

| # | Категория | Критерий | Направление |
|---|---|---|---|
| 1 | Семья | Родитель ↔ часть со своим AI.md | обе стороны |
| 2 | Альтернатива | Решает ту же задачу другим компромиссом — реально спутают (`Island` → `IslandAccordion`). Отвод в другой класс задач («нужен отступ — возьми `Gap`») остаётся прозой в «Не используй когда» | обе стороны |
| 3 | Контракт по рендеру | Импортирует и рендерит внутри себя (`Island` → `LoaderScreen`) | к зависимости |
| 4 | Контракт по типам | Наследует чужой интерфейс props, в т.ч. `Pick<>` / `Omit<>` (`IConfirmProps extends IIslandProps` → у `Confirm` пишем `Island`). Наследование от React и от внутренних базовых интерфейсов не считается | от наследника к базе |

Потребители не включаются — ссылка стоит с их стороны; исключение только для
потребителя, который опирается на хрупкую деталь.

Категории 1 и 2 симметричны, 3 и 4 односторонние. Порядок — семья → альтернативы
→ контракты, ориентир 2–5 имён. Каждое имя из `related` должно быть объяснено в
разделе «Связанные компоненты»; обратное не требуется.

---

## Внешние ресурсы

- Документация для разработчиков и дизайнеров: https://triplex-design.ru/next/ru/Web/Components
- Storybook (локально): `npm run storybook` → http://localhost:6006
- Истории: `stories/` в корне репозитория
