---
component: Caption
category: Typography
related: [Text, Title, CodeText]
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
stories: stories/Typography/Caption.stories.tsx
version: "1.0"
---

# Caption

## Назначение

Подпись (типографика). Рендерит инлайновый `<span>` (тег настраивается через `tag`) для крайних значений типографической шкалы: очень мелкие подписи `C1` (10px) и `C2` (8px) либо крупный акцентный показатель `D1` (32px, шрифт SBSansDisplay).

Используй когда: нужна сверхмелкая техническая подпись (сноска, копирайт, метка) или крупная цифра/показатель, не являющаяся заголовком (сумма на дашборде, KPI).

Не используй когда:
- Нужен обычный текст 12–18px — используй `Text` (B1–B4).
- Крупный текст является заголовком секции — используй `Title` (семантические `h1`–`h3`).

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `ECaptionSize` | Размер: `C1` (10/12px), `C2` (8/10px), `D1` (32/40px). В скобках — font-size/line-height. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `weight` | `EFontWeightCaption` | `REGULAR` | Начертание: `REGULAR` или `SEMIBOLD` (600). Для `C1`/`C2` — семейство SBSansText*, для `D1` — SBSansDisplay*. |
| `type` | `EFontType` | `PRIMARY` | Цвет текста из общей палитры типографики (11 базовых + 11 `*_INVERT`). |
| `underline` | `boolean` | — | Подчёркивание. Совместим со `strikethrough` (оба сразу — `underline line-through`). |
| `strikethrough` | `boolean` | — | Зачёркивание. |
| `tag` | `string` | `"span"` | HTML-тег корневого элемента. |

Компонент типизирован как `TCaptionProps<T extends keyof JSX.IntrinsicElements>` и принимает все атрибуты соответствующего HTML-элемента через spread.

### Ограничения

- Внешний тип `forwardRef<HTMLElement, TCaptionProps<keyof JSX.IntrinsicElements>>` «растворяет» дженерик: TypeScript не сужает атрибуты под конкретный `tag`. Известное ограничение публичного API, не исправлять без обсуждения (breaking).
- `EFontWeightCaption` дублирует значения `EFontWeightText` — это два независимых публичных enum, объединять нельзя (breaking).
- `EFontType.BRAND` дополнительно задаёт `user-select: none` (особенность стилей `Typography.module.less`).

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Typography.ts`.

Цвета — общие CSS-переменные семейства Typography (см. frontmatter): `Typography.{Type}_Color` и `Typography.{Type}Invert_Color`.

Размеры шрифта и line-height — фиксированные пиксельные значения в `styles/Caption.module.less` (токенов для них нет).

---

## Инварианты

- **`forwardRef`** — обязателен, `ref` пробрасывается на корневой элемент.
- **Значения enum** `ECaptionSize`, `EFontWeightCaption`, `EFontType` — публичный API из barrel. Изменение — breaking change.
- **`TCaptionProps`**, **`ITypographyProps`** — публичные типы.
- **`displayName = "Caption"`** — не убирать.
- `D1` переключает семейство шрифта на SBSansDisplay* — контракт стилей: крупный показатель визуально согласован с заголовками.
- Классы собираются только через `clsx`.

---

## Accessibility

- Компонент не интерактивный: focus management и keyboard navigation не применимы.
- Семантика определяется через `tag` (по умолчанию нейтральный `<span>`).
- Размеры `C1`/`C2` (10/8px) ниже комфортного порога читаемости — используй только для второстепенной информации, не для основного контента.
- Цвет (`type`) не передаёт семантику для screen reader'ов.

---

## Связанные компоненты

- `Text` — основной текст интерфейса (B1–B4).
- `Title` — заголовки `h1`–`h3`.
- `CodeText` — моноширинный текст.

---

## Stories

Основные истории: `stories/Typography/Caption.stories.tsx`
Файлы примеров: `stories/Typography/examples/Caption/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль props `size`, `weight`, `type`, `tag`, `underline`, `strikethrough` |
| `Default` | `Default.tsx` | Минимальное использование |
| `Sizes` | `Sizes.tsx` | Размеры C1 / C2 / D1 |
| `Weights` | `Weights.tsx` | Начертания REGULAR / SEMIBOLD |
| `Types` | `Types.tsx` | Все значения `EFontType`: базовые + инвертированные на тёмной подложке |
| `Decorations` | `Decorations.tsx` | `underline`, `strikethrough` и их комбинация |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-20 | Создан документ. AI-рефакторинг: decoration-логика вынесена во внутренний хелпер `getTextDecorationClassName` (`utils.ts`), комментарии переведены в JSDoc, unit-тесты расширены (все значения `ECaptionSize`/`EFontWeightCaption`, дефолты). Stories переведены на modern pattern (`examples/Caption/`). |
