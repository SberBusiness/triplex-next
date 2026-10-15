---
component: ImageGalleryExtended
category: ImageGalleryExtended
related: [ImageGallery, MobileView, PageIndicators]
tokens:
  - ImageGallery.Accent_Color
  - ImageGallery.Arrow_Background_Default
  - ImageGallery.Arrow_Background_Hover
  - ImageGallery.Arrow_Background_Active
  - ImageGallery.Arrow_BorderColor_Default
  - ImageGallery.Arrow_BorderColor_Hover
  - ImageGallery.Arrow_BorderColor_Active
  - ImageGallery.Thumb_Mask_Background
stories: stories/ImageGalleryExtended/ImageGalleryExtended.stories.tsx
version: "1.0"
---

# ImageGalleryExtended

## Назначение

Базовый (controlled) compound-компонент галереи изображений. Изображения задаются
массивом `items`, контейнер хранит активный индекс, обрабатывает стрелочную
навигацию с клавиатуры и раздаёт данные составным частям через React-контекст.
Раскладка задаётся декларативно — потребитель сам собирает нужные части
(`.Main`, `.Thumbnails`, `.PageIndicators`, `.Nav`, `.Arrow`, `.Thumb`) в любом порядке.

Используй `ImageGalleryExtended` когда: нужен полный контроль над раскладкой и
поведением галереи (нестандартный порядок частей, кастомные стрелки или
миниатюры через render-функции, собственное управление активным изображением).

Не используй когда: достаточно стандартного пресета «крупная картинка + лента
миниатюр (десктоп) / индикаторы страниц (мобильный)» с uncontrolled-режимом — для этого есть
готовая обёртка `ImageGallery`.

---

## Варианты и props

Компонент — `Object.assign`-композиция: корневой контейнер + статические
субкомпоненты-части (`ImageGalleryExtended.Main` и др.).

### Корневой контейнер `ImageGalleryExtended`

| Prop | Тип | Обязательный | Описание |
|---|---|---|---|
| `items` | `ReadonlyArray<IImageGalleryItemProps>` | да | Изображения: `{ id, src, alt?, thumbSrc? }`. `id` — ключ для controlled-режима, `thumbSrc` падает на `src`, если не задан |
| `selectedId` | `string` | да | Id активного изображения. Неизвестный/отсутствующий id резолвится в первый элемент |
| `onChange` | `(id: string) => void` | да | Вызывается только при реальной смене активного id (клик по уже активному не триггерит) |
| `children` | `React.ReactNode` | да | Составные части галереи |
| `...HTMLDivAttributes` | — | — | Кроме `onChange` (переопределён под смену изображения) |

Контейнер controlled-only: своего состояния активного изображения не держит.
Uncontrolled-режим (`defaultId`) добавляет обёртка `ImageGallery`.

Части идут колонкой без `gap`: `.Thumbnails` отделяется `margin-top: 16px`,
`.PageIndicators` прилегает вплотную (отступ до полоски даёт кнопка-индикатор).
Отступ своей разметке задаёт потребитель.

### `ImageGalleryExtended.Main`

Крупное изображение: вьюпорт + накладываемый поверх `children` (обычно `.Nav` со
стрелками). На десктопе — статичный слайд; на мобильном (ширина < SM) при
`items.length > 1` — лента со свайпом prev/next.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `height` | `'auto' \| number \| string` | `'auto'` | `'auto'` — фиксированные значения по breakpoint (504px / 264px); число → `px` |
| `withBlur` | `boolean` | `false` | Блюр-слой копии изображения по краям (для картинок уже вьюпорта) |
| `onImageClick` | `(index: number) => void` | — | Клик по картинке; получает индекс активного изображения. Точка интеграции с родительским LightBox |

### `ImageGalleryExtended.Nav`

Провайдер состояния навигации через **render-функцию** (`children`). Своей
разметки не добавляет — рендерит только результат `children`. Размещается как
child `.Main`, чтобы стрелки позиционировались поверх картинки.

Состояние render-функции: `{ onPrev, onNext, isFirst, isLast, selectedIndex, itemsCount }`.

### `ImageGalleryExtended.Arrow`

Презентационная кнопка-стрелка. Состояние (`disabled`/`hidden`/`onClick`)
передаётся через props, обычно из render-функции `.Nav`.

Видимость: стрелки скрыты по умолчанию и проявляются при ховере на `.Main`
(а также при фокусе с клавиатуры). Стрелка в состоянии `disabled` (например,
`PREV` на первом слайде или `NEXT` на последнем) не показывается вовсе.

| Prop | Тип | Обязательный | Описание |
|---|---|---|---|
| `direction` | `EImageGalleryArrowDirection` | да | `PREV` (`'prev'`) / `NEXT` (`'next'`) — иконка и позиция |
| `aria-label` | `string` | да | Доступное имя; передаёт потребитель (мультиязычность) |
| `...ButtonHTMLAttributes` | — | — | Кроме переопределённого `aria-label` |

### `ImageGalleryExtended.Thumbnails`

Горизонтальная лента миниатюр с нативным скроллом и автоцентровкой активной.
`children` — опциональная **render-функция** миниатюры; по умолчанию рисует
`.Thumb`. Состояние render-функции: `{ item, index, isActive, ariaLabel, onSelect, ref }`.

По дизайну на узком экране (< MD) лента миниатюр заменяется индикаторами
страниц. Сама часть не переключается — оберни её в `MobileView` с
`.PageIndicators` в мобильной ветке, как в пресете `ImageGallery` и stories.
Чтобы автоцентровка работала, проброс `ref` на корневой `<button>` обязателен.

### `ImageGalleryExtended.Thumb`

Кнопка-миниатюра. `ref` пробрасывается на `<button>` (родитель собирает refs для
центровки). Поверх изображения лежит полупрозрачная маска
(`Thumb_Mask_Background`), которая скрывается на hover и для активной миниатюры
(`isActive`).

| Prop | Тип | Обязательный | Описание |
|---|---|---|---|
| `item` | `IImageGalleryItemProps` | да | Изображение миниатюры (использует `thumbSrc ?? src`) |
| `isActive` | `boolean` | да | Активна ли миниатюра (рамка + `aria-current`) |

### `ImageGalleryExtended.PageIndicators`

Индикаторы страниц (мобильный preset) — обёртка над `PageIndicators`: индикатор
на каждое изображение, видимо окно из 5. `count`/`activeIndex`/`onChange` берутся
из контекста, ориентация всегда горизонтальная. При `items.length <= 1` ничего не
рендерит.

| Prop | Тип | Обязательный | Описание |
|---|---|---|---|
| `indicatorProps` | `TPageIndicatorProps \| TPageIndicatorPropsFactory` | нет | Свойства кнопок-индикаторов. По умолчанию `aria-label` = `item.alt`; значения из `indicatorProps` имеют приоритет |
| `...HTMLDivAttributes` | — | — | Пробрасываются на корневой `<div role="tablist">` |

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/ImageGallery.ts`.

Токены живут в общей с `ImageGallery` группе `ImageGallery`
(семейства делят визуальный язык). `.PageIndicators` красится токенами группы
`PageIndicators` (см. `PageIndicators-ai.md`).

```text
ImageGallery.Accent_Color

ImageGallery.Arrow_Background_Default
ImageGallery.Arrow_Background_Hover
ImageGallery.Arrow_Background_Active
ImageGallery.Arrow_BorderColor_Default
ImageGallery.Arrow_BorderColor_Hover
ImageGallery.Arrow_BorderColor_Active

ImageGallery.Thumb_Mask_Background
```

Runtime CSS-переменные (задаются компонентом через `style`, **не** дизайн-токены,
не попадают в `DesignTokens`):

```
--triplex-next-runtime-ImageGalleryExtended-Main_Height
--triplex-next-runtime-ImageGalleryExtended-Track_Shift
--triplex-next-runtime-ImageGalleryExtended-Track_Drag
```

---

## Инварианты

- **`forwardRef`** обязателен на всех публичных частях (`Root`, `.Main`, `.Arrow`,
  `.Thumbnails`, `.Thumb`, `.PageIndicators`). Target — корневой DOM-элемент части
  (`<div>` для контейнера/Main/Thumbnails/PageIndicators, `<button>` для Arrow/Thumb).
  `.Thumbnails` пробрасывает ref через `useImperativeHandle` на внутренний
  `carouselRef` — это нужно для автоцентровки; не заменять на прямой ref.
- **Контейнер controlled-only.** Не добавлять внутреннее состояние активного
  изображения — uncontrolled живёт в обёртке `ImageGallery`.
- **`onChange` вызывается только при смене id** (клик по активному / неизменный
  id игнорируются) — потребители на это полагаются.
- **Публичный API** (имена частей, props, `EImageGalleryArrowDirection` и его
  значения `'prev'`/`'next'`, render-функции `.Nav`/`.Thumbnails`) — breaking
  change при изменении.
- **Render-функции** `.Nav` и `.Thumbnails` — контракт; форма объекта состояния
  фиксирована.
- Токены лежат в группе `ImageGallery`, а не `ImageGalleryExtended` —
  переименование сломает темизацию у потребителей обоих семейств.

---

## Accessibility

- **Клавиатура (контейнер):** `←` / `→` на корневом `<div>` (`tabIndex={0}` по
  умолчанию) переключают активное изображение. Событие игнорируется, если фокус
  на вложенном интерактивном элементе (`event.target !== event.currentTarget`),
  чтобы не перехватывать навигацию у внутренних кнопок.
- **Клавиатура (лента миниатюр):** `←` / `→` на `.Thumbnails` переключают выбор.
  При навигации стрелками фокус переносится с прежней миниатюры на активную —
  иначе кольцо `:focus-visible` осталось бы на старой одновременно с рамкой
  `.active` новой.
- **`aria-current`:** активная миниатюра (`.Thumb`) получает `aria-current="true"`.
- **Индикаторы страниц (`.PageIndicators`):** WAI-ARIA `tablist`, см.
  `PageIndicators-ai.md`. Корневой обработчик стрелок их клавиатуру не дублирует.
- **`aria-label` — обязанность потребителя.** `.Arrow` требует `aria-label`
  явным props; компонент не хардкодит язык. `.Thumb`/`.PageIndicators` берут доступное имя
  из `item.alt`.
- **Декоративные изображения** (блюр-слой) помечены `aria-hidden="true"` с пустым
  `alt`.
- **Свайп vs скролл (мобильный):** горизонтальный жест перехватывается навигацией
  (`touch-action: pan-y` + non-passive `touchmove` с `preventDefault`),
  вертикальный отдаётся скроллу страницы. Направление фиксируется после порога
  `DIRECTION_LOCK_PX`.

---

## Связанные компоненты

- `ImageGallery` — тонкая обёртка-пресет над `ImageGalleryExtended`: задаёт
  стандартную раскладку (`.Main` + стрелки + миниатюры/индикаторы страниц через `MobileView`) и
  добавляет uncontrolled-режим (`defaultId`). Используй её, если кастомная
  раскладка не нужна.
- `PageIndicators` — рендерится внутри `.PageIndicators`; его props
  (`IPageIndicatorsProps` без `count`/`activeIndex`/`onChange`/`orientation`)
  составляют API части.
- `MobileView` — переключает десктопную/мобильную ветку рендера внутри `.Main`
  (лента свайпа) и в пресете `ImageGallery` (миниатюры ↔ индикаторы страниц).
- `LightBox` — типовой сценарий: `onImageClick` открывает изображение в лайтбоксе
  (см. story `OpenFromAvatar`).

### Внутренние части без отдельного AI.md

Описываются здесь, т.к. это приватные обёртки без самостоятельного публичного
API (экспортируются из barrel ради композиции, но используются внутри частей):

- `ImageGalleryExtendedSlide` — один слайд (опциональный блюр + изображение);
  используется в `.Main` и в ленте свайпа.
- `ImageGalleryExtendedSwipeTrack` — лента крупного изображения со свайпом на
  мобильном: окно из соседних слайдов (prev/current/next), доводка к соседу по
  завершении жеста, эффект «резинки» на краях.

---

## Stories

Основные истории: `stories/ImageGalleryExtended/ImageGalleryExtended.stories.tsx`
Файлы примеров: `stories/ImageGalleryExtended/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `withBlur` / `height` |
| `Default` | `Default.tsx` | Полный состав: крупная картинка со стрелками + лента миниатюр (на мобильном — индикаторы через `MobileView`) |
| `MainOnly` | `MainOnly.tsx` | Только крупная картинка со стрелками (без миниатюр/индикаторов), с блюром |
| `CustomLayout` | `CustomLayout.tsx` | Render-функции: панель навигации через `.Nav` вместо стрелок, миниатюры с собственным `aria-label` через `.Thumbnails` |
| `ManyThumbnails` | `ManyThumbnails.tsx` | Большой набор (20 изображений): горизонтальный скролл и автоцентровка ленты миниатюр |
| `OpenFromAvatar` | `OpenFromAvatar.tsx` | Открытие изображения в `LightBox` по клику (интеграция `onImageClick`) |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: стрелки на границах диапазона (disabled) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-05-28 | Создан документ |
| 2026-08-31 | Удалены неиспользуемые токены `Arrow_Background_Disabled` и `Arrow_BorderColor_Disabled`: неактивная стрелка скрывается (`display: none`), красить нечем |
| 2026-09-29 | Аудит симметрии `related` (TRI-156): из `related` убраны несимметричные имена (`LightBox`). Пояснения к убранным именам сохранены прозой в «Связанные компоненты»; публичный API и поведение не затронуты. |
| 2026-10-07 | **Breaking:** `.Dots` → `.PageIndicators`, удалены токены `Dot_Background_*`, `gap` корня заменён отступом у `.Thumbnails` |
