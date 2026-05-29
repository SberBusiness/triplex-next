---
component: ImageGalleryExtended
category: ImageGalleryExtended
related: [ImageGallery, MobileView, LightBox]
tokens: [
  "--triplex-next-ImageGallery-Accent_Color",
  "--triplex-next-ImageGallery-Arrow_Background_Default",
  "--triplex-next-ImageGallery-Arrow_Background_Hover",
  "--triplex-next-ImageGallery-Arrow_Background_Active",
  "--triplex-next-ImageGallery-Arrow_Background_Disabled",
  "--triplex-next-ImageGallery-Arrow_BorderColor_Default",
  "--triplex-next-ImageGallery-Arrow_BorderColor_Hover",
  "--triplex-next-ImageGallery-Arrow_BorderColor_Active",
  "--triplex-next-ImageGallery-Arrow_BorderColor_Disabled",
  "--triplex-next-ImageGallery-Dot_Background_Default",
  "--triplex-next-ImageGallery-Dot_Background_Hover",
  "--triplex-next-ImageGallery-Dot_Background_Active",
  "--triplex-next-ImageGallery-Thumb_Mask_Background"
]
stories: stories/ImageGalleryExtended/ImageGalleryExtended.stories.tsx
version: "1.0"
---

# ImageGalleryExtended

## Назначение

Базовый (controlled) compound-компонент галереи изображений. Изображения задаются
массивом `items`, контейнер хранит активный индекс, обрабатывает стрелочную
навигацию с клавиатуры и раздаёт данные составным частям через React-контекст.
Раскладка задаётся декларативно — потребитель сам собирает нужные части
(`.Main`, `.Thumbnails`, `.Dots`, `.Nav`, `.Arrow`, `.Thumb`) в любом порядке.

Используй `ImageGalleryExtended` когда: нужен полный контроль над раскладкой и
поведением галереи (нестандартный порядок частей, кастомные стрелки или
миниатюры через render-функции, собственное управление активным изображением).

Не используй когда: достаточно стандартного пресета «крупная картинка + лента
миниатюр (десктоп) / тики (мобильный)» с uncontrolled-режимом — для этого есть
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

### `ImageGalleryExtended.Dots`

Ряд кликабельных тиков-индикаторов (мобильный preset). Изображения распределяются
по тикам бакетами равного размера (макс. 4 тика); при `items.length <= 1` ничего
не рендерит. Собственных публичных props нет (`className + ...HTMLDivAttributes`).

---

## Дизайн-токены

Токены используют общий с `ImageGallery` префикс `--triplex-next-ImageGallery-`
(семейства делят визуальный язык).

```
--triplex-next-ImageGallery-Accent_Color

--triplex-next-ImageGallery-Arrow_Background_Default
--triplex-next-ImageGallery-Arrow_Background_Hover
--triplex-next-ImageGallery-Arrow_Background_Active
--triplex-next-ImageGallery-Arrow_Background_Disabled
--triplex-next-ImageGallery-Arrow_BorderColor_Default
--triplex-next-ImageGallery-Arrow_BorderColor_Hover
--triplex-next-ImageGallery-Arrow_BorderColor_Active
--triplex-next-ImageGallery-Arrow_BorderColor_Disabled

--triplex-next-ImageGallery-Dot_Background_Default
--triplex-next-ImageGallery-Dot_Background_Hover
--triplex-next-ImageGallery-Dot_Background_Active

--triplex-next-ImageGallery-Thumb_Mask_Background
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
  `.Thumbnails`, `.Thumb`, `.Dots`). Target — корневой DOM-элемент части
  (`<div>` для контейнера/Main/Thumbnails/Dots, `<button>` для Arrow/Thumb).
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
- Токены используют префикс `ImageGallery-`, а не `ImageGalleryExtended-` —
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
- **`aria-current`:** активная миниатюра (`.Thumb`), активный тик (`.Dots`) и
  активная кнопка получают `aria-current="true"`.
- **`aria-label` — обязанность потребителя.** `.Arrow` требует `aria-label`
  явным props; компонент не хардкодит язык. `.Thumb`/`.Dots` берут доступное имя
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
  стандартную раскладку (`.Main` + стрелки + миниатюры/тики через `MobileView`) и
  добавляет uncontrolled-режим (`defaultId`). Используй её, если кастомная
  раскладка не нужна.
- `MobileView` — переключает десктопную/мобильную ветку рендера внутри `.Main`
  (лента свайпа) и в пресете `ImageGallery` (миниатюры ↔ тики).
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
| `Default` | `Default.tsx` | Полный десктопный состав: крупная картинка со стрелками + лента миниатюр |
| `MainOnly` | `MainOnly.tsx` | Только крупная картинка со стрелками (без миниатюр/тиков), с блюром |
| `WithDots` | `WithDots.tsx` | Мобильный preset: крупная картинка + тики-индикаторы |
| `CustomLayout` | `CustomLayout.tsx` | Произвольный порядок частей + кастомные стрелки и миниатюры через render-функции |
| `ManyThumbnails` | `ManyThumbnails.tsx` | Большой набор (20 изображений): горизонтальный скролл и автоцентровка ленты миниатюр |
| `OpenFromAvatar` | `OpenFromAvatar.tsx` | Открытие изображения в `LightBox` по клику (интеграция `onImageClick`) |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: стрелки на границах диапазона (disabled) и тики-индикаторы |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-05-28 | Создан документ |
