---
component: CodeText
category: Typography
related: [Text, Title, Caption]
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
stories: stories/Typography/CodeText.stories.tsx
version: "1.0"
---

# CodeText

## Назначение

Моноширинный текст (типографика). Рендерит инлайновый `<span>` (тег настраивается через `tag`) со шрифтом SBSansTextMono и фиксированной типографикой 14/20px (font-weight 400). Размер и начертание не настраиваются — в отличие от остальных компонентов семейства.

Используй когда: нужно выровнять символы по ширине — фрагменты кода, номера счетов/договоров, ИНН/БИК, суммы в таблицах, технические идентификаторы.

Не используй когда:
- Нужен обычный пропорциональный текст — используй `Text`.
- Нужен другой размер моноширинного текста — в семействе его нет; не задавай `font-size` через `style`/`className`, обсуди расширение API с командой.

---

## Варианты и props

Собственных обязательных props нет. Компонент принимает только общие props типографики (`ITypographyProps`).

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `type` | `EFontType` | `PRIMARY` | Цвет текста из общей палитры типографики (11 базовых + 11 `*_INVERT`). |
| `underline` | `boolean` | — | Подчёркивание. Совместим со `strikethrough` (оба сразу — `underline line-through`). |
| `strikethrough` | `boolean` | — | Зачёркивание. |
| `tag` | `string` | `"span"` | HTML-тег корневого элемента (например, `code` для семантики фрагмента кода). |

Компонент типизирован как `TCodeTextProps<T extends keyof JSX.IntrinsicElements>` и принимает все атрибуты соответствующего HTML-элемента через spread.

### Ограничения

- Props `size`, `weight`, `line` отсутствуют намеренно: типографика фиксирована (SBSansTextMono, 14/20px, 400).
- Внешний тип `forwardRef<HTMLElement, TCodeTextProps<keyof JSX.IntrinsicElements>>` «растворяет» дженерик: TypeScript не сужает атрибуты под конкретный `tag`. Известное ограничение публичного API, не исправлять без обсуждения (breaking).
- `EFontType.BRAND` дополнительно задаёт `user-select: none` (особенность стилей `Typography.module.less`).

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Typography.ts`.

Цвета — общие токены группы `Typography` (см. frontmatter): `Typography.{Type}_Color` и `Typography.{Type}Invert_Color`.

Шрифт и размер — фиксированные значения в `styles/CodeText.module.less` (токенов для них нет).

---

## Инварианты

- **`forwardRef`** — обязателен, `ref` пробрасывается на корневой элемент.
- **`TCodeTextProps`**, **`ITypographyProps`**, значения **`EFontType`** — публичный API из barrel. Изменение — breaking change.
- **`displayName = "CodeText"`** — не убирать.
- Фиксированная типографика (SBSansTextMono, 14/20px) — контракт компонента; добавление `size`/`weight` — расширение публичного API, требует обсуждения.
- Классы собираются только через `clsx`.

---

## Accessibility

- Компонент не интерактивный: focus management и keyboard navigation не применимы.
- По умолчанию рендерится нейтральный `<span>`; для семантики фрагмента кода передай `tag="code"`.
- Цвет (`type`) не передаёт семантику для screen reader'ов.

---

## Связанные компоненты

- `Text` — основной пропорциональный текст интерфейса (B1–B4).
- `Title` — заголовки `h1`–`h3`.
- `Caption` — мелкие подписи и крупный показатель D1.

---

## Stories

Основные истории: `stories/Typography/CodeText.stories.tsx`
Файлы примеров: `stories/Typography/examples/CodeText/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль props `type`, `tag`, `underline`, `strikethrough` |
| `Default` | `Default.tsx` | Минимальное использование |
| `Types` | `Types.tsx` | Все значения `EFontType`: базовые + инвертированные на тёмной подложке |
| `Decorations` | `Decorations.tsx` | `underline`, `strikethrough` и их комбинация |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-20 | Создан документ. AI-рефакторинг: decoration-логика вынесена во внутренний хелпер `getTextDecorationClassName` (`utils.ts`), unit-тесты дополнены (дефолтный `type`, класс `brand`). Stories переведены на modern pattern (`examples/CodeText/`). |
