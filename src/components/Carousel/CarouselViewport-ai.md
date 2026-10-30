---
component: CarouselViewport
category: Carousel
related: [Carousel]
tokens: []
stories: stories/Carousel/Carousel.stories.tsx
version: "1.0"
---

# CarouselViewport

## Назначение

Область просмотра составного `Carousel`: обрезает ленту по своим границам,
применяет отступы родителя и обрабатывает touch-жесты. Передаёт свой DOM-узел
в контекст, чтобы `Carousel` измерял доступный размер и рассчитывал прокрутку.

Используй внутри `Carousel`, оборачивая одну `Carousel.Track` со слайдами.
Самостоятельной прокрутки и геометрии вне родителя нет; для свободно
прокручиваемой ленты рассмотри `CarouselExtended`.

Публичное обращение — `Carousel.Viewport` через
`import { Carousel } from "@sberbusiness/triplex-next"`.
Именованного экспорта `CarouselViewport` из пакета нет;
`ICarouselViewportProps` экспортируется из публичного barrel семейства.

```tsx
import React from "react";
import { Carousel } from "@sberbusiness/triplex-next";

export const CardsCarousel = () => (
    <Carousel viewportPadding={[8, 16]} style={{ width: 400, height: 180 }}>
        <Carousel.Viewport>
            <Carousel.Track>
                {["Первая карточка", "Вторая карточка", "Третья карточка"].map((text, index) => (
                    <Carousel.Item key={text} index={index} style={{ width: 240, height: 164 }}>
                        {text}
                    </Carousel.Item>
                ))}
            </Carousel.Track>
            <Carousel.PrevButton aria-label="Предыдущая карточка" />
            <Carousel.NextButton aria-label="Следующая карточка" />
        </Carousel.Viewport>
    </Carousel>
);
```

Кнопки навигации внутри области появляются при наведении на неё.
Индикаторы страниц размещай рядом с `Viewport`, чтобы они не попадали под
`overflow: hidden`.

---

## Варианты и props

Обязательных props и собственных вариантов оформления нет.
`ICarouselViewportProps` наследует HTML-атрибуты `<div>`.

| Prop | Назначение и ограничения |
|---|---|
| `children` | Лента `Carousel.Track` со слайдами и необязательные кнопки навигации |
| `className` | Дополняет внутренний класс `viewPort` |
| `style` | Передаётся на корневой `<div>`; приоритет runtime-переменной — см. «Дизайн-токены» |
| `onTouchStart` | Вызывается после начала жеста, поэтому `preventDefault` в callback его не отменяет. При пустом `targetTouches` жест не начинается |
| `onTouchMove`, `onTouchEnd`, `onTouchCancel` и остальные HTML-обработчики | Передаются на `<div>`. Встроенные move/end/cancel слушают `window` |
| `aria-*`, `data-*`, `role`, `tabIndex` и остальные HTML-атрибуты | Передаются на корневой элемент; семантику и доступное имя задаёт потребитель |
| `ref` | Внешний callback- или object-ref объединяется с `viewportRef` контекста и указывает на тот же `HTMLDivElement` |

`orientation`, `viewportPadding` и `scrollMode` задаются на родительском
`Carousel`, а не на `Viewport`. Не подменяй `viewportPadding` через CSS:
измерения родителя должны соответствовать оформлению области.

Корневой `<div>` имеет `width: 100%`, `height: 100%`, `box-sizing: border-box`
и `overflow: hidden`. Ограничь размер композиции; для вертикальной карусели
нужна ограниченная высота.

### Touch-жесты

- Учитывается первое касание из `targetTouches`; `touchmove` — с
  `{ passive: false }`, пока жест не отдан прокрутке страницы.
- Ось выбирается, когда смещение по любой оси стало **больше 5 px**
  (`AXIS_LOCK_THRESHOLD`). Если поперечное смещение больше основного, жест
  до конца отдаётся прокрутке страницы: без `preventDefault`, сдвига и
  навигации. При равенстве выигрывает ось карусели. До выбора оси лента
  не сдвигается, а `touchmove` не отменяется, чтобы браузер мог начать
  прокрутку страницы. CSS-переход ленты отключается только после выбора
  оси карусели, поэтому тап или прокрутка страницы не обрывают анимацию
  перехода.
- За границей ленты смещение уменьшается втрое (rubber-band,
  `RUBBER_BAND_RESISTANCE`).
- На `touchend` смещение вдоль оси **больше 50 px** (`SWIPE_THRESHOLD`)
  вызывает `prevSlide`, меньше `-50 px` — `nextSlide`; ровно ±50 px не
  переключает. Шаг перехода определяет родитель по своему состоянию на момент
  `touchend`. `touchcancel` навигацию не вызывает.

---

## Дизайн-токены

У `Viewport` нет собственных цветовых дизайн-токенов.

`--triplex-next-runtime-carousel-viewport-padding` — внутренняя runtime-переменная
с нормализованным `viewportPadding` родителя. Это не дизайн-токен, её не нужно
добавлять в `ThemeProvider` или генерируемые файлы тем. Значение из контекста
имеет приоритет над одноимённым свойством в `style` потребителя.

---

## Инварианты

- Сохраняются `forwardRef`, корневой `<div>`, ref-target `HTMLDivElement`,
  `displayName="Carousel.Viewport"`, класс `viewPort` и публичный
  `ICarouselViewportProps`. Объединение внешнего ref с ref контекста обязательно
  для измерений родителя; при размонтировании оба получают `null`.
- Контекст содержит один ref области и один ref ленты; несколько областей
  в одном родителе не поддерживаются.
- Имя runtime-переменной padding и существующие barrel-экспорты сохраняются.
- Код остаётся совместимым с React 17.

---

## Accessibility

- Область — обычный `<div>` без встроенной роли, `tabIndex`, ARIA-текста
  или клавиатурной обработки. Для имени композиции при необходимости задай
  `role="region"` и `aria-label` родителю; язык выбирает потребитель.
- Горизонтальная область использует `touch-action: pan-y`, вертикальная —
  `pan-x`.
- Клавиатурная навигация — через [CarouselPrevButton](CarouselPrevButton-ai.md) /
  [CarouselNextButton](CarouselNextButton-ai.md) и, в `PAGE`,
  [CarouselIndicators](CarouselIndicators-ai.md).
- `overflow: hidden` не исключает невидимые слайды из accessibility-дерева
  и Tab-порядка. `aria-hidden` / `inert`, связи слайдов с индикаторами,
  управление фокусом и объявления смены слайда автоматически не создаются.

---

## Связанные компоненты

- [Carousel](Carousel-ai.md) — родитель, владелец геометрии, состояния и
  навигации; публично предоставляет область как `.Viewport`.
- `Carousel.Track` — вложенный `<div role="presentation">`, располагает
  слайды и применяет постоянное смещение из контекста. Во время жеста
  `Viewport` временно управляет его inline `transform` / `transition`.
- [CarouselItem](CarouselItem-ai.md) — слайд с последовательным `index`,
  регистрируется для измерений родителя.
- [CarouselPrevButton](CarouselPrevButton-ai.md) /
  [CarouselNextButton](CarouselNextButton-ai.md) — кнопки перехода.
- [CarouselIndicators](CarouselIndicators-ai.md) — навигация по страницам `PAGE`.

---

## Stories

Основные истории: `stories/Carousel/Carousel.stories.tsx`
Файлы примеров: `stories/Carousel/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Выбор ориентации и режима прокрутки родителя |
| `Default` | `Default.tsx` | Горизонтальная область с лентой и кнопками внутри |
| `ScrollModes` | `ScrollModes.tsx` | Область в `ITEM` и `PAGE`, индикаторы рядом с ней |
| `Orientations` | `Orientations.tsx` | Горизонтальная и вертикальная области с ограниченной высотой |
| `Production` | `Production.tsx` | Отступы области через `viewportPadding={8}` родителя |
| `DynamicIndicators` | `DynamicIndicators.tsx` | Постраничная лента с большим количеством элементов |
| `VisualTests` | `VisualTests.tsx` | Горизонтальная и вертикальная области с кнопками; снимаются только состояния кнопок |

Скриншот-покрытие stories описано в [Carousel](Carousel-ai.md#stories).

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-21 | Создан документ. |
