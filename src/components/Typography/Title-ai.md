---
component: Title
category: Typography
related: [Text, Caption, CodeText]
tokens:
  - Typography.Primary_Color
  - Typography.PrimaryInvert_Color
  - Typography.Complementary_Color
  - Typography.ComplementaryInvert_Color
  - Typography.Secondary_Color
  - Typography.SecondaryInvert_Color
  - Typography.Tertiary_Color
  - Typography.TertiaryInvert_Color
  - Typography.Disabled_Color
  - Typography.DisabledInvert_Color
  - Typography.Brand_Color
  - Typography.BrandInvert_Color
  - Typography.Info_Color
  - Typography.InfoInvert_Color
  - Typography.Success_Color
  - Typography.SuccessInvert_Color
  - Typography.Warning_Color
  - Typography.WarningInvert_Color
  - Typography.Error_Color
  - Typography.ErrorInvert_Color
  - Typography.System_Color
  - Typography.SystemInvert_Color
stories: stories/Typography/Title.stories.tsx
version: "1.0"
---

# Title

## Назначение

Заголовок (типографика). Рендерит семантический heading `<h1>`–`<h3>` (тег по умолчанию совпадает со значением `size`) со шрифтом SBSansDisplay и цветом из палитры `EFontType`. `margin` у заголовков обнулён — отступы задаёт layout потребителя.

Используй когда: нужен заголовок страницы, секции, карточки или модального окна.

Не используй когда:
- Нужен обычный текст интерфейса — используй `Text`.
- Нужна крупная цифра/показатель (32px), не являющаяся заголовком — используй `Caption` с размером `D1`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `ETitleSize` | Размер заголовка: `H1` (28/36px), `H2` (24/32px), `H3` (20/28px). В скобках — font-size/line-height. Значения enum — строки `"h1"`/`"h2"`/`"h3"`. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `weight` | `EFontWeightTitle` | `SEMIBOLD` | Начертание: `REGULAR` / `MEDIUM` (500) / `SEMIBOLD` (600) / `BOLD` (700). Каждому соответствует своё семейство SBSansDisplay*. |
| `type` | `EFontType` | `PRIMARY` | Цвет текста из общей палитры типографики (11 базовых + 11 `*_INVERT`). |
| `underline` | `boolean` | — | Подчёркивание. Совместим со `strikethrough` (оба сразу — `underline line-through`). |
| `strikethrough` | `boolean` | — | Зачёркивание. |
| `tag` | `string` | значение `size` | HTML-тег корневого элемента. По умолчанию равен значению `size` (`"h1"`/`"h2"`/`"h3"`) — визуальный размер и уровень heading связаны. Передай `tag` явно, чтобы развязать их (например, `size={ETitleSize.H1} tag="h2"`). |

Компонент типизирован как `TTitleProps<T extends keyof JSX.IntrinsicElements>` и принимает все атрибуты соответствующего HTML-элемента через spread.

### Ограничения

- Внешний тип `forwardRef<HTMLElement, TTitleProps<keyof JSX.IntrinsicElements>>` «растворяет» дженерик: TypeScript не сужает атрибуты под конкретный `tag`. Известное ограничение публичного API, не исправлять без обсуждения (breaking).
- Дефолт `` tag = `${size}` `` — намеренный трюк (значения `ETitleSize` совпадают с именами тегов); при изменении значений enum сломается и дефолтный тег — ещё одна причина не трогать значения.
- `EFontType.BRAND` дополнительно задаёт `user-select: none` (особенность стилей `Typography.module.less`).

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Typography.ts`.

Цвета — общие токены группы `Typography` (см. frontmatter): `Typography.{Type}_Color` и `Typography.{Type}Invert_Color`.

Размеры шрифта и line-height — фиксированные пиксельные значения в `styles/Title.module.less` (токенов для них нет).

---

## Инварианты

- **`forwardRef`** — обязателен, `ref` пробрасывается на корневой heading-элемент.
- **Значения enum** `ETitleSize` (строки `"h1"`/`"h2"`/`"h3"`), `EFontWeightTitle`, `EFontType` — публичный API из barrel. Изменение — breaking change; значения `ETitleSize` дополнительно используются как дефолтный `tag`.
- **`TTitleProps`**, **`ITypographyProps`** — публичные типы.
- **`displayName = "Title"`** — не убирать.
- `margin: 0` на `h1`–`h3` в `Title.module.less` — контракт: отступы вокруг заголовка задаёт потребитель.
- Классы собираются только через `clsx`.

---

## Accessibility

- По умолчанию рендерится настоящий heading (`<h1>`–`<h3>`) — уровень в accessibility-дереве определяется `size`. Следи за иерархией заголовков страницы; если визуальный размер не совпадает с нужным уровнем — задай `tag` явно.
- Компонент не интерактивный: focus management и keyboard navigation не применимы.
- Цвет (`type`) не передаёт семантику для screen reader'ов.

---

## Связанные компоненты

- `Text` — основной текст интерфейса (B1–B4, SBSansText).
- `Caption` — мелкие подписи и крупный показатель D1.
- `CodeText` — моноширинный текст.

---

## Stories

Основные истории: `stories/Typography/Title.stories.tsx`
Файлы примеров: `stories/Typography/examples/Title/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль props `size`, `weight`, `type`, `tag`, `underline`, `strikethrough` |
| `Default` | `Default.tsx` | Минимальное использование |
| `Sizes` | `Sizes.tsx` | Размеры H1 / H2 / H3 |
| `Weights` | `Weights.tsx` | Начертания REGULAR / MEDIUM / SEMIBOLD / BOLD |
| `Types` | `Types.tsx` | Все значения `EFontType`: базовые + инвертированные на тёмной подложке |
| `Decorations` | `Decorations.tsx` | `underline`, `strikethrough` и их комбинация |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-20 | Создан документ. AI-рефакторинг: decoration-логика вынесена во внутренний хелпер `getTextDecorationClassName` (`utils.ts`), комментарии переведены в JSDoc, unit-тесты расширены (все значения `ETitleSize`/`EFontWeightTitle`, дефолтные heading-теги). Stories переведены на modern pattern (`examples/Title/`). |
