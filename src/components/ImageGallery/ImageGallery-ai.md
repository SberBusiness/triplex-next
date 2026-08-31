---
component: ImageGallery
category: ImageGallery
related: [ImageGalleryExtended, MobileView, LightBox]
tokens:
  - ImageGallery.Accent_Color
  - ImageGallery.Arrow_Background_Default
  - ImageGallery.Arrow_Background_Hover
  - ImageGallery.Arrow_Background_Active
  - ImageGallery.Arrow_BorderColor_Default
  - ImageGallery.Arrow_BorderColor_Hover
  - ImageGallery.Arrow_BorderColor_Active
  - ImageGallery.Dot_Background_Default
  - ImageGallery.Dot_Background_Hover
  - ImageGallery.Dot_Background_Active
  - ImageGallery.Thumb_Mask_Background
stories: stories/ImageGallery/ImageGallery.stories.tsx
version: "1.0"
---

# ImageGallery

## Назначение

Готовый пресет галереи изображений поверх `ImageGalleryExtended`. Тонкая
обёртка: фиксирует стандартную раскладку (крупная картинка `.Main` со стрелками
навигации + лента миниатюр на десктопе / ряд тиков-индикаторов на мобильном
через `MobileView`) и добавляет uncontrolled-режим (`defaultId`), которого нет у
controlled-only контейнера `ImageGalleryExtended`. Изображения задаются массивом
`items`.

Используй когда: нужна типовая галерея «крупная картинка + миниатюры/тики» без
кастомизации раскладки — достаточно передать `items` и подписать стрелки.
Поддерживает и controlled (`selectedId` + `onChange`), и uncontrolled
(`defaultId`) режимы.

Не используй когда: нужен нестандартный порядок частей, кастомные стрелки или
миниатюры через render-функции, либо полный контроль над составом галереи — для
этого предназначен базовый `ImageGalleryExtended`.

---

## Варианты и props

Компонент пробрасывает большинство props в соответствующие части
`ImageGalleryExtended` и не имеет собственного UI сверх его композиции.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `items` | `ReadonlyArray<IImageGalleryItemProps>` | Изображения: `{ id, src, alt?, thumbSrc? }`. `id` — ключ активного изображения, `thumbSrc` падает на `src`, если не задан |
| `prevArrowProps` | `TImageGalleryArrowProps` | Свойства кнопки «предыдущее». Обязателен ради `aria-label` (мультиязычность) — см. Инварианты. Допускает `data-*` |
| `nextArrowProps` | `TImageGalleryArrowProps` | Свойства кнопки «следующее». Обязателен ради `aria-label`. Допускает `data-*` |

`prevArrowProps`/`nextArrowProps` пробрасываются в `ImageGalleryExtended.Arrow`,
из них исключены управляемые обёрткой поля (`direction`, `onClick`, `disabled`,
`hidden`, `type`).

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `selectedId` | `string` | — | Id активного изображения (controlled-режим). Если задан — компонент не держит внутренний state |
| `defaultId` | `string` | — | Id активного изображения по умолчанию (uncontrolled-режим). Если не задан — активен первый элемент |
| `onChange` | `(id: string) => void` | — | Смена активного изображения. Вызывается только при реальной смене id (см. Инварианты) |
| `onImageClick` | `(index: number) => void` | — | Клик по крупному изображению; получает индекс активного. Типовая точка интеграции с `LightBox` |
| `height` | `'auto' \| number \| string` | `'auto'` | Высота крупной картинки. `'auto'` — фиксированные значения по breakpoint (504px / 264px); число → `px` |
| `withBlur` | `boolean` | `true` | Блюр-слой копии изображения по краям (для картинок уже вьюпорта) |
| `showThumbnails` | `boolean` | `true` | Показывать ленту миниатюр (десктоп) |
| `showDots` | `boolean` | `true` | Показывать ряд тиков-индикаторов (мобильный) |
| `thumbnailsProps` | `TImageGalleryThumbnailsProps` | — | Свойства ленты миниатюр (пробрасываются в `.Thumbnails`). Допускают `data-*` |
| `dotsProps` | `TImageGalleryDotsProps` | — | Свойства ряда тиков (пробрасываются в `.Dots`). Допускают `data-*` |
| `...HTMLDivAttributes` | — | — | Пробрасываются на корневой контейнер. Кроме `onChange` (переопределён под смену изображения) |

### Controlled vs uncontrolled

- Режим определяется по `selectedId`: задан → controlled (внутренний state не
  используется, активным управляет потребитель через `selectedId` + `onChange`);
  не задан → uncontrolled (state живёт в обёртке, инициализируется `defaultId`).
- В uncontrolled-режиме `onChange` всё равно вызывается — как уведомление, в
  дополнение к внутреннему обновлению state.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/ImageGallery.ts`.

Собственных стилей и `.less`-файлов у `ImageGallery` нет — вся отрисовка
делегируется частям `ImageGalleryExtended`. Перечисленные токены принадлежат
семейству и используются через эти части — группа `ImageGallery` намеренно
делится обоими семействами.

```text
ImageGallery.Accent_Color

ImageGallery.Arrow_Background_Default
ImageGallery.Arrow_Background_Hover
ImageGallery.Arrow_Background_Active
ImageGallery.Arrow_BorderColor_Default
ImageGallery.Arrow_BorderColor_Hover
ImageGallery.Arrow_BorderColor_Active

ImageGallery.Dot_Background_Default
ImageGallery.Dot_Background_Hover
ImageGallery.Dot_Background_Active

ImageGallery.Thumb_Mask_Background
```

Runtime CSS-переменная высоты крупной картинки
(`--triplex-next-runtime-ImageGalleryExtended-Main_Height`) задаётся частью
`.Main`, а не самой обёрткой — см. `ImageGalleryExtended-ai.md`.

Токены `Arrow_Background_Disabled` и `Arrow_BorderColor_Disabled` объявлены в группе
`ImageGallery`, но ни в стилях, ни в коде не используются: disabled-состояние стрелок
не реализовано. Поэтому в списке их нет.

---

## Инварианты

- **`forwardRef`** обязателен — ref пробрасывается на корневой контейнер
  `ImageGalleryExtended` (`<div>`). Не убирать.
- **`prevArrowProps` / `nextArrowProps` — required.** Это сознательное
  accessibility-решение: стрелки навигации зашиты в пресет, и потребитель обязан
  передать им доступное имя (`aria-label`), потому что компонент не хардкодит
  язык. Зеркалит обязательный `aria-label` у `ImageGalleryExtended.Arrow`. Не
  делать опциональными.
- **`onChange` вызывается только при реальной смене id** — наследуется от
  `ImageGalleryExtended` (клик по уже активному изображению не триггерит).
  Потребители на это полагаются.
- **Публичный API** (имена и сигнатуры props, типы `TImageGalleryArrowProps` /
  `TImageGalleryThumbnailsProps` / `TImageGalleryDotsProps`, barrel-экспорты) —
  breaking change при изменении.
- **Раскладка-пресет фиксирована.** Состав (`.Main` + стрелки + миниатюры/тики
  через `MobileView`) — суть компонента. Нужна другая раскладка — это
  `ImageGalleryExtended`, а не новый prop здесь.

---

## Accessibility

- **Стрелки навигации:** доступное имя задаёт потребитель через
  `prevArrowProps['aria-label']` / `nextArrowProps['aria-label']` (required).
  Стрелки скрываются при `items.length <= 1` (`hidden`) и получают `disabled` на
  границах диапазона (первое изображение → «назад», последнее → «вперёд»).
  Видимость: стрелки появляются при ховере на крупной картинке (либо при фокусе
  с клавиатуры); `disabled`-стрелка на границе диапазона не показывается вовсе.
- **Клавиатура:** `←` / `→` на корневом контейнере переключают активное
  изображение (поведение унаследовано от `ImageGalleryExtended`).
- **`aria-current="true"`** — на активной миниатюре и активном тике.
- **Миниатюры и тики** берут доступное имя из `item.alt`.
- **Декоративный блюр-слой** (`withBlur`) помечен `aria-hidden="true"` с пустым
  `alt`.
- **Мобильный свайп** крупного изображения перехватывает горизонтальный жест,
  вертикальный отдаёт скроллу страницы (детали — в `ImageGalleryExtended-ai.md`).

---

## Связанные компоненты

- `ImageGalleryExtended` — базовый controlled compound-компонент, над которым
  построена обёртка. `ImageGallery` собирает из его частей стандартную раскладку
  и добавляет uncontrolled-режим. Используй Extended напрямую, если нужна
  кастомная раскладка или поведение.
- `MobileView` — переключает ветку рендера: на десктопе показывает ленту
  миниатюр (`.Thumbnails`), на мобильном — ряд тиков (`.Dots`).
- `LightBox` — типовой сценарий: `onImageClick` открывает изображение в
  лайтбоксе (см. story `InsideLightBox`).

---

## Stories

Основные истории: `stories/ImageGallery/ImageGallery.stories.tsx`
Файлы примеров: `stories/ImageGallery/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль всех props |
| `Default` | `Default.tsx` | Стандартный пресет: крупная картинка со стрелками + лента миниатюр |
| `FixedHeight` | `FixedHeight.tsx` | Фиксированная высота крупной картинки (`height={number}`) |
| `WithoutThumbnails` | `WithoutThumbnails.tsx` | Скрытая лента миниатюр (`showThumbnails={false}`) |
| `WithDots` | `WithDots.tsx` | Мобильный preset (XS viewport): крупная картинка + тики-индикаторы |
| `PropsForwarding` | `PropsForwarding.tsx` | Проброс свойств (включая `data-*`) в стрелки, миниатюры и тики |
| `WithoutBlur` | `WithoutBlur.tsx` | Отключённый блюр-слой по краям (`withBlur={false}`) |
| `InsideLightBox` | `InsideLightBox.tsx` | Открытие активного изображения в `LightBox` по клику (`onImageClick`) |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: встроенные стрелки на границах (disabled) + блюр; тики-индикаторы |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-05-28 | Создан документ |
