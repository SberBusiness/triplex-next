---
component: Badge
category: Badge
related: [Marker, Chip, DropdownListItem, DropdownMobileListItem, TabsLineItem, TabsExtendedTabButton, Text, Caption]
tokens:
  - --triplex-next-Badge-Background
stories: stories/Badge/Badge.stories.tsx
version: "1.0"
---

# Badge

## Назначение

Небольшой inline-индикатор статуса или уведомления: подпись на цветной подложке
(`Badge`) либо просто цветная точка (`Badge.Dot`). Собственного состояния и логики нет —
компонент только собирает разметку из трёх необязательных частей (`prefix` → `children` →
`postfix`) и раздаёт классы по размеру.

Используй когда: нужно пометить объект коротким статусом («Новинка», «Нет данных»),
показать счётчик уведомлений или поставить точку-индикатор рядом с элементом списка,
чипсом, пунктом меню.

Не используй когда:
- Нужен интерактивный элемент (клик, фокус, клавиатура) — возьми `Chip` или `Button`;
  `Badge` — неинтерактивный `<span>` без семантики и без обработки клавиатуры.
- Нужен статус со встроенной палитрой (успех / ошибка / предупреждение) — у `Badge`
  один-единственный токен фона, цветовые статусы задаёт потребитель (см. «Цвет и текст»).
- Нужен индикатор состояния процесса в списке — посмотри `MarkerStatus`, он строится
  на своих статусных токенах.

---

## Варианты и props

Оба компонента расширяют `React.HTMLAttributes<HTMLSpanElement>`: любой стандартный
атрибут `<span>` (`id`, `data-*`, `style`, обработчики) уходит на корневой элемент
через `...rest`. `className` объединяется с базовыми классами через `clsx`, а не
заменяет их.

### Badge — обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `EComponentSize` | `SM` — высота 16px, радиус 4px; `MD` — 20px / 6px; `LG` — 24px / 8px. Значения по умолчанию нет |

### Badge — опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Содержимое. Оборачивается во внутренний `<span class="badgeContent">` с горизонтальными отступами 4 / 6 / 8px по размеру |
| `prefix` | `React.ReactNode` | — | Контент перед содержимым, обычно иконка. Обёртка `badgePrefix` имеет `display: contents` |
| `postfix` | `React.ReactNode` | — | Контент после содержимого, обычно иконка. Обёртка `badgePostfix` имеет `display: contents` |

`prefix` перекрывает одноимённый RDFa-атрибут `prefix?: string` из
`React.HTMLAttributes`, поэтому вырезан из базового типа через `Omit`. Атрибута
`postfix` в `React.HTMLAttributes` нет — он попал в `Omit<..., "prefix" | "postfix">`
для симметрии и фактически ничего не убирает.

Отступ содержимого снимается со стороны, где стоит иконка: при `prefix` контент получает
класс `noPaddingLeft`, при `postfix` — `noPaddingRight`. Логика целиком декларативная,
считается от факта наличия props (`Boolean(prefix)` / `Boolean(postfix)`).

### Badge.Dot — props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `EComponentSize` | Диаметр круга: `SM` — 6px, `MD` — 8px, `LG` — 10px. Обязательный |
| `children` | `never` | Точка не имеет содержимого — тип запрещает передачу детей |

### Falsy-значения не рендерят части

Части рендерятся по truthy-проверке (`children ? ... : null`). Поэтому
`children={0}`, `children=""`, `prefix={false}` не выводят ни содержимого, ни обёртки.
Для счётчика с нулём передавай строку (`"0"`) или не рендери `Badge` вовсе. Это
исторически сложившееся поведение; менять его — задача с записью в release notes.

### Цвет и текст

- Фон обоих компонентов — единственный токен `--triplex-next-Badge-Background`
  (`ColorWarning.70` в обеих темах). Вариантов/статусов у компонента нет.
- Цвет и размер текста задаёт потребитель, вкладывая внутрь `Text` / `Caption`
  с нужным `type` (в примерах — `EFontType.PRIMARY_INVERT`). Своей типографики
  `Badge` не задаёт — только высоту, скругление и отступы.
- Нестандартный фон в продуктовых сценариях делают инлайновым `style`
  (`ProductionExample.tsx`). Это осознанный обход: расширять API цветовыми
  вариантами без задачи не нужно.

---

## Дизайн-токены

```text
--triplex-next-Badge-Background
```

Один токен на всё семейство: фон `Badge` (`styles/Badge.module.less`) и цвет точки
`Badge.Dot` (`styles/BadgeDot.module.less`). Объявлен в
`src/components/DesignTokens/components/Badge.ts` (`ColorWarning.70` в светлой и тёмной
темах). Геометрия (высоты, радиусы, диаметры точки, горизонтальные отступы контента)
задана литералами в LESS и снаружи не настраивается.

---

## Инварианты

- **`forwardRef` на `Badge` и `BadgeDot`** — оба пробрасывают ref на корневой
  `<span>`; не убирать.
- **Корневой элемент — `<span>`** у всех частей семейства. Смена тега ломает
  инлайновое размещение внутри текста и чипсов.
- **`BadgeDot` доступен только как `Badge.Dot`.** Barrel (`src/components/Badge/index.ts`)
  экспортирует `Badge` и типы; отдельного именованного экспорта `BadgeDot` нет — так его
  и импортируют внутренние потребители: `Marker`, `Chip`, `DropdownListItem`,
  `DropdownMobileListItem`, `TabsLineItem`, `TabsExtendedTabButton`.
  Добавление именованного экспорта — расширение публичного API.
- **`IBadgeDotProps` — не только props точки.** `Marker` строит из него свой публичный
  интерфейс: `IMarkerProps extends IBadgeDotProps` (`src/components/Marker/Marker.tsx:9`).
  Любое изменение формы `IBadgeDotProps` автоматически меняет публичный API `Marker`.
- **`IBadgeContentProps` экспортируется из barrel, хотя `BadgeContent` — нет.**
  Тип уже в публичном API (`export * from "./types"`), удалять или переименовывать
  нельзя без release notes.
- **Класс `.badgeDot` проверяется в тестах соседнего компонента** —
  `src/components/Chip/__tests__/Chip.test.tsx` ищет точку через
  `container.querySelector(".badgeDot")`. Переименование класса ломает чужой тест.
- **Порядок частей в разметке — `prefix` → `children` → `postfix`**, ровно три
  необязательных узла, без дополнительных обёрток. На порядок и на классы
  `badgePrefix` / `badgeContent` / `badgePostfix` опираются unit-тесты.
- **`display: contents` у `badgePrefix` / `badgePostfix`** — обёртки намеренно не
  создают бокса, иначе иконка получит лишний уровень выравнивания внутри inline-flex.
- **`displayName`** — `Badge`, `BadgeDot`, `BadgeContent`, `BadgePrefix`, `BadgePostfix`;
  видны в React DevTools.
- **`size` обязателен у обоих компонентов** — дефолта нет, `<Badge />` не типизируется.

---

## Accessibility

- Компонент неинтерактивен: не получает фокус, не обрабатывает клавиатуру, ARIA-ролей
  и атрибутов не выставляет. Корневой `<span>` для скринридера — обычный текст.
- Текстовый `Badge` доступен как есть: содержимое читается в потоке. Отдельная
  подпись не нужна.
- **`Badge.Dot` не имеет доступного имени** — это чисто визуальный индикатор. Если
  точка несёт смысл («есть непрочитанное»), потребитель обязан сам передать
  `aria-label` (уйдёт в `...rest`) либо продублировать смысл текстом рядом. Если
  точка декоративна и дублирует видимый текст — передай `aria-hidden`.
  Внутри библиотеки так и сделано: `Chip`, `DropdownListItem`,
  `DropdownMobileListItem`, `TabsLineItem` и `TabsExtendedTabButton` показывают
  точку рядом с собственной подписью.
- Строки на конкретном языке компонент не хардкодит — весь текст приходит от
  потребителя.

---

## Связанные компоненты

- `Marker` (`src/components/Marker/Marker.tsx`) — обёртка над `Badge.Dot` со статусными
  цветами; наследует `IBadgeDotProps`.
- `Chip` (`src/components/Chip/Chip.tsx:108`) — рендерит `Badge.Dot` как значок
  уведомления при `showNotificationIcon`.
- `DropdownListItem`, `DropdownMobileListItem` — то же самое для пунктов выпадающего
  списка.
- `TabsLineItem` (`src/components/TabsLine/components/TabsLineItem.tsx:78`),
  `TabsExtendedTabButton` (`src/components/TabsExtended/components/TabsExtendedTabButton.tsx:51`)
  — то же самое для вкладок.
- `Text`, `Caption` — типографика содержимого: `B4`/`C1` для SM–MD, `B3` для LG,
  `type={EFontType.PRIMARY_INVERT}` для читаемости на цветной подложке.
- `MarkerStatus`, `TagColor` — альтернативы, когда нужен статус с собственной палитрой.

### Внутренние субкомпоненты (собственного AI.md не имеют)

- `BadgeContent` (`components/BadgeContent.tsx`) — обёртка содержимого; единственная
  нетривиальная часть: горизонтальные отступы по размеру и их снятие флагами
  `noPaddingLeft` / `noPaddingRight`.
- `BadgePrefix`, `BadgePostfix` (`components/`) — обёртки иконок, `display: contents`,
  логики нет.

Все трое объявлены как `React.FC` без `forwardRef` — это допустимо, потому что наружу
они не экспортируются и ref в них не приходит.

---

## Stories

Основные истории: `stories/Badge/Badge.stories.tsx`
Файлы примеров: `stories/Badge/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный подбор `size` |
| `Default` | `DefaultExample.tsx` | Минимальный вызов: размер `MD` и `Text` внутри |
| `Sizes` | `SizesExample.tsx` | Размеры `SM` / `MD` / `LG` с подходящей типографикой |
| `WithPrefixAndPostfix` | `WithPrefixAndPostfixExample.tsx` | Иконки слева и справа во всех трёх размерах |
| `DotSizes` | `DotSizesExample.tsx` | Размеры `Badge.Dot` |
| `Example` | `ProductionExample.tsx` | Продуктовые сценарии: только иконка, счётчик, цветные статусы через инлайновый `style` |

Скриншот-регрессия снимается со стори `Default`, `Sizes`, `WithPrefixAndPostfix`,
`DotSizes` (`__screenshots__/badge--*--xs|xl.png`). `Playground` и `Example` исключены
через `testRunner: { skip: true }`: первый — интерактивная песочница, второй содержит
подобранные вручную цвета и дублирует остальные состояния.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-12 | Создан документ. AI-рефакторинг: JSDoc на всех props `IBadgeProps` / `IBadgeDotProps` / `IBadgeContentProps` с указанием размеров в px, в `IBadgeProps` добавлен явный `children` (тип совпадает с унаследованным из `React.HTMLAttributes`), расширены JSDoc компонентов и внутренних обёрток. Unit-тесты расширены с 12 до 37 кейсов: `Badge.test.tsx` вырос с 12 до 21 кейса, рядом добавлены `BadgeDot.test.tsx` (7) и `BadgeContent.test.tsx` (9) — покрыты логика снятия отступов контента, порядок частей разметки, проброс `...rest` и `ref`. Публичный API, DOM-разметка и визуальное поведение не изменены. |
