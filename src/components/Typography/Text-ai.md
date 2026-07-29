---
component: Text
category: Typography
related: [Title, Caption, CodeText]
tokens:
  - --triplex-next-Typography-Primary_Color
  - --triplex-next-Typography-PrimaryInvert_Color
  - --triplex-next-Typography-Complementary_Color
  - --triplex-next-Typography-ComplementaryInvert_Color
  - --triplex-next-Typography-Secondary_Color
  - --triplex-next-Typography-SecondaryInvert_Color
  - --triplex-next-Typography-Tertiary_Color
  - --triplex-next-Typography-TertiaryInvert_Color
  - --triplex-next-Typography-Disabled_Color
  - --triplex-next-Typography-DisabledInvert_Color
  - --triplex-next-Typography-Brand_Color
  - --triplex-next-Typography-BrandInvert_Color
  - --triplex-next-Typography-Info_Color
  - --triplex-next-Typography-InfoInvert_Color
  - --triplex-next-Typography-Success_Color
  - --triplex-next-Typography-SuccessInvert_Color
  - --triplex-next-Typography-Warning_Color
  - --triplex-next-Typography-WarningInvert_Color
  - --triplex-next-Typography-Error_Color
  - --triplex-next-Typography-ErrorInvert_Color
  - --triplex-next-Typography-System_Color
  - --triplex-next-Typography-SystemInvert_Color
stories: stories/Typography/Text.stories.tsx
version: "1.0"
---

# Text

## Назначение

Основной текст интерфейса (типографика). Рендерит инлайновый `<span>` (тег настраивается через `tag`) со шрифтом SBSansText, размером из шкалы B1–B4 и цветом из палитры `EFontType`.

Используй когда: нужен основной или вспомогательный текст интерфейса — абзацы, подписи к контролам, значения в карточках.

Не используй когда:
- Нужен заголовок — используй `Title` (шрифт SBSansDisplay, семантические `h1`–`h3`).
- Нужен мелкий вспомогательный текст меньше 12px или крупная цифра/показатель — используй `Caption` (C1/C2/D1).
- Нужен моноширинный текст (код, ИНН, номера счетов) — используй `CodeText`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `ETextSize` | Размер текста: `B1` (18/24px), `B2` (16/20px), `B3` (14/20px), `B4` (12/16px). В скобках — font-size/line-height. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `weight` | `EFontWeightText` | `REGULAR` | Начертание: `REGULAR` (SBSansText) или `SEMIBOLD` (SBSansTextSemibold, font-weight 600). |
| `line` | `ELineType` | `NORMAL` | Интерлиньяж. `COMPACT` фактически влияет только на размер `B3` (line-height 20px → 16px); для остальных размеров компактного варианта в стилях нет. |
| `type` | `EFontType` | `PRIMARY` | Цвет текста из палитры типографики: 11 базовых значений + 11 `*_INVERT` для тёмных подложек. |
| `underline` | `boolean` | — | Подчёркивание. Совместим со `strikethrough` (оба сразу — `underline line-through`). |
| `strikethrough` | `boolean` | — | Зачёркивание. |
| `tag` | `string` | `"span"` | HTML-тег корневого элемента (`span`, `div`, `p` и т.д.). |

Компонент типизирован как `TTextProps<T extends keyof JSX.IntrinsicElements>` и принимает все атрибуты соответствующего HTML-элемента (включая `className`, `style`, `aria-*`, `data-*`) через spread.

### Ограничения

- Внешний тип `forwardRef<HTMLElement, TTextProps<keyof JSX.IntrinsicElements>>` «растворяет» дженерик: TypeScript не сужает атрибуты под конкретный `tag`. Известное ограничение публичного API, не исправлять без обсуждения (breaking).
- `EFontType.BRAND` дополнительно задаёт `user-select: none` (особенность стилей `Typography.module.less`, унаследованная от дизайна).

---

## Дизайн-токены

Цвета — только через CSS-переменные группы Typography (общие для всего семейства, см. frontmatter):

```text
--triplex-next-Typography-{Type}_Color
--triplex-next-Typography-{Type}Invert_Color
```

где `{Type}` ∈ Primary, Complementary, Secondary, Tertiary, Disabled, Brand, Info, Success, Warning, Error, System.

Размеры шрифта и line-height — фиксированные пиксельные значения в `styles/Text.module.less` (компонент-специфичные литералы, токенов для них нет).

---

## Инварианты

- **`forwardRef`** — обязателен, `ref: React.ForwardedRef<HTMLElement>` пробрасывается на корневой элемент.
- **Значения enum** `ETextSize`, `EFontWeightText`, `ELineType`, `EFontType` — публичный API, экспортируются из barrel `src/components/Typography/index.ts`. Изменение имён/значений — breaking change.
- **`TTextProps`**, **`ITypographyProps`** — публичные типы.
- **`displayName = "Text"`** — не убирать.
- Классы собираются только через `clsx`; порядок: `typography` → `text` → size → weight → line → type → decoration → `className`.
- `getTextDecorationClassName` (`utils.ts`) — внутренний хелпер семейства, через barrel не экспортируется и экспортироваться не должен.

---

## Accessibility

- Компонент не интерактивный: focus management и keyboard navigation не применимы.
- Семантика определяется потребителем через `tag`: по умолчанию нейтральный `<span>`; для абзаца передай `tag="p"`.
- Цвет (`type`) не передаёт семантику для screen reader'ов — статусные состояния (error/success) дублируй текстом или `aria`-атрибутами на уровне потребителя.

---

## Связанные компоненты

- `Title` — заголовки `h1`–`h3` на шрифте SBSansDisplay; общая палитра `EFontType` и decoration-props.
- `Caption` — мелкие подписи (C1/C2) и крупный показатель (D1).
- `CodeText` — моноширинный текст, фиксированный размер 14/20px, без props `size`/`weight`/`line`.

---

## Stories

Основные истории: `stories/Typography/Text.stories.tsx`
Файлы примеров: `stories/Typography/examples/Text/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль props `size`, `weight`, `line`, `type`, `tag`, `underline`, `strikethrough` |
| `Default` | `Default.tsx` | Минимальное использование: `size={ETextSize.B2}` |
| `Sizes` | `Sizes.tsx` | Все размеры B1–B4 |
| `Weights` | `Weights.tsx` | Начертания REGULAR / SEMIBOLD |
| `LineTypes` | `LineTypes.tsx` | Интерлиньяж NORMAL / COMPACT на размере B3 |
| `Types` | `Types.tsx` | Все 22 значения `EFontType`: базовые + инвертированные на тёмной подложке |
| `Decorations` | `Decorations.tsx` | `underline`, `strikethrough` и их комбинация |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-20 | Создан документ. AI-рефакторинг: decoration-логика вынесена во внутренний хелпер `getTextDecorationClassName` (`utils.ts`), комментарии map-констант и членов enum переведены в JSDoc, unit-тесты расширены (все значения `ETextSize`/`EFontWeightText`/`ELineType`, дефолты). Stories переведены на modern pattern (`examples/Text/`). |
