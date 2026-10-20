---
component: Carousel
category: Carousel
related: [CarouselViewport, CarouselItem, CarouselIndicators, CarouselPrevButton, CarouselNextButton, CarouselExtended]
tokens: []
stories: stories/Carousel/Carousel.stories.tsx
version: "1.0"
---

# Carousel

## Назначение

Контейнер составной карусели: хранит положение ленты, измеряет слайды и область
просмотра, вычисляет границы прокрутки и передаёт состояние навигации через
контекст. Разметку слайдов и расположение навигации собирает потребитель.

Используй когда: нужны слайды переменного размера, горизонтальная или вертикальная
прокрутка, переключение по элементам либо по автоматически рассчитанным страницам.

Не используй когда: нужна свободно прокручиваемая горизонтальная лента с заданным
шагом в пикселях — для этого `CarouselExtended`. Для переключения разделов страницы
с подписями используй семейство `Tabs`.

Публичный импорт: `import { Carousel } from "@sberbusiness/triplex-next"`.
`ECarouselScrollMode` и `EOrientation` доступны из того же пакета. Части доступны как статические поля `Carousel`,
самостоятельных именованных экспортов `CarouselViewport` / `CarouselItem` /
`CarouselIndicators` / `CarouselPrevButton` / `CarouselNextButton` в barrel нет.

---

## Варианты и props

Обязательных props нет. `ICarouselProps` расширяет стандартные HTML-атрибуты
`<div>`; `children` задаёт композицию, а `className`, `style`, `aria-*`, `data-*`
и обработчики передаются на корневой элемент.

| Prop | По умолчанию | Назначение и ограничения |
|---|---|---|
| `orientation` | `EOrientation.HORIZONTAL` | `HORIZONTAL` (`"horizontal"`) измеряет ширины и двигает ленту по X; `VERTICAL` (`"vertical"`) — высоты и по Y |
| `scrollMode` | `ECarouselScrollMode.ITEM` | `ITEM` (`"item"`) раскрывает следующий или предыдущий скрытый элемент; `PAGE` (`"page"`) объединяет последовательные элементы в страницы |
| `gap` | `16` | Расстояние между слайдами в px. Участвует и в CSS-раскладке, и в расчётах геометрии; передавай конечное неотрицательное число |
| `viewportPadding` | `0` | Отступы области просмотра в px: число либо readonly-кортеж из 2, 3 или 4 чисел по правилам CSS shorthand. Отрицательные значения, `NaN` и `±Infinity` нормализуются в `0` |
| `children` | — | `Carousel.Viewport` с лентой слайдов и необязательная навигация |

### Сборка композиции

```tsx
import { Carousel, ECarouselScrollMode } from "@sberbusiness/triplex-next";

<Carousel scrollMode={ECarouselScrollMode.PAGE} aria-label="Предложения">
    <Carousel.Viewport style={{ height: 240 }}>
        <Carousel.Track>
            <Carousel.Item index={0} style={{ width: 320 }}>Первый слайд</Carousel.Item>
            <Carousel.Item index={1} style={{ width: 320 }}>Второй слайд</Carousel.Item>
        </Carousel.Track>
        <Carousel.PrevButton aria-label="Предыдущий слайд" />
        <Carousel.NextButton aria-label="Следующий слайд" />
    </Carousel.Viewport>
    <Carousel.Indicators
        aria-label="Страницы предложений"
        indicatorProps={({ page }) => ({ "aria-label": `Страница ${page}` })}
    />
</Carousel>
```

`Carousel.Viewport` ограничивает видимую область, `Carousel.Track` располагает
слайды и применяет смещение. Задай размер области просмотра и слайдов так, чтобы
было что измерять; для вертикальной карусели особенно важна ограниченная высота.
`index` у `Carousel.Item` — последовательный индекс с нуля, соответствующий
DOM-порядку, а `key` — стабильный идентификатор данных. После удаления или
перестановки элементов индексы нужно пересчитать.

### Навигация и пересчёт геометрии

- В режиме `ITEM` выбор следующего элемента может перескочить через уже видимые
  элементы. Если слайд больше области просмотра, он сначала прокручивается
  внутри себя на размер области, без смены текущего индекса. Это не фиксированный
  шаг в px и не обязательная смена индекса на единицу.
- В режиме `PAGE` элементы группируются по размеру области просмотра с учётом
  `gap`; группа центрируется и итоговое смещение ограничивается краями контента.
  Количество страниц зависит от размеров, а не равно количеству слайдов.
- Смена `gap`, `scrollMode` или `orientation` сбрасывает текущий индекс на `0`.
  Изменение `viewportPadding` пересчитывает смещение без такого сброса.
- `viewportPadding` задаёт padding именно `Viewport`, участвует в расчёте границ
  прокрутки и видимости слайдов. Списки чисел мемоизируются по значению: новый
  массив с теми же числами не требует нового расчёта нормализованных отступов.
- `ResizeObserver` следит за `Viewport` и `Track`, очищает кэш размеров и
  пересчитывает положение текущего элемента/страницы. Если после пересчёта
  страниц стало меньше, индекс ограничивается в `requestAnimationFrame`.
- `offset`, текущий индекс и количество страниц — внутреннее состояние.
  Управляемого индекса, callback смены страницы, зацикливания и автопрокрутки
  в API корневого `Carousel` нет.

---

## Дизайн-токены

У корневого `.carousel` собственных дизайн-токенов нет: он задаёт flex-раскладку
и ориентацию. Поэтому `tokens` в frontmatter пуст.

В общем `styles/Carousel.module.less` токены `Carousel.Button_*` относятся к
`Carousel.PrevButton` / `Carousel.NextButton`; оформление индикаторов приходит
из `PageIndicators`. Эти контракты принадлежат соответствующим частям композиции.
Переопределение токенов описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md).

`--triplex-next-runtime-carousel-gap`, `--triplex-next-runtime-carousel-transform`
и `--triplex-next-runtime-carousel-viewport-padding` — внутренние runtime-переменные
`Track` / `Viewport`, вычисленные из props и состояния. Это не дизайн-токены,
не добавляй их в `ThemeProvider` или сгенерированные файлы тем.

---

## Инварианты

- `forwardRef` сохраняется. Ref корневого `Carousel` указывает на его внешний
  `HTMLDivElement`, а не на `Viewport` или `Track`. `className`, `style` и
  остальные HTML-атрибуты остаются на этом же узле.
- Публичные `Carousel`, `ICarouselProps`, `ECarouselScrollMode` и статические поля
  `Viewport`, `Track`, `Item`, `PrevButton`, `NextButton`, `Indicators` сохраняют
  имена и сигнатуры. Сохраняются все существующие экспорты `index.ts`.
- `displayName` корня — `"Carousel"`; CSS-классы `carousel`, `horizontal`,
  `vertical` и существующие story IDs сохраняются.
- Части композиции используют контекст ближайшего `Carousel`. Для одной карусели
  предусмотрены одна область просмотра и одна лента: refs не регистрируют
  несколько `Viewport` / `Track`.
- Слайды регистрируются по `index` в `Map`. Геометрия обходит диапазон
  `0..count-1`, поэтому индексы должны быть уникальными, непрерывными и
  соответствовать порядку слайдов.
- `orientationRef`, `offsetRef` и `currentIndexRef` стабильны: они позволяют
  обработчикам жестов и `ResizeObserver` читать актуальные значения. Кэш
  геометрии инвалидируется при изменении конфигурации и ресайзе.
- `ResizeObserver` отключается при cleanup, отложенный пересчёт индекса через
  `requestAnimationFrame` отменяется при размонтировании.
- Код остаётся совместимым с React 17 при синхронизации в `release-0`.

---

## Accessibility

- Корень — обычный `<div>` без встроенной роли или локализованных ARIA-текстов.
  Название карусели и при необходимости `role="region"` задаёт потребитель.
- `Track` имеет `role="presentation"`, слайды — `role="group"`. Имена групп,
  подписи содержимого и связи с соответствующими страницами задаёт потребитель.
- Корневой `Carousel` и `Viewport` не обрабатывают клавиши-стрелки. С клавиатуры
  можно использовать обычные кнопки навигации; в режиме `PAGE` индикаторы
  наследуют клавиатурную навигацию `PageIndicators`.
- `PrevButton` / `NextButton` показывают край через `aria-disabled`, а не через
  нативный `disabled`: они остаются фокусируемыми, собственный переход на краю
  блокируется, пользовательский `onClick` по-прежнему вызывается. Дай кнопкам
  доступные имена через `aria-label`.
- На устройствах с `(pointer: coarse)` стрелки не рендерятся. `Viewport`
  поддерживает touch-жесты вдоль своей оси и сохраняет прокрутку страницы по
  поперечной оси. Переход происходит после жеста больше `50px`.
- В `ITEM` индикаторы отсутствуют; в `PAGE` они используют `role="tablist"` и
  кнопки `role="tab"`. Подписи ряда и индикаторов задаёт потребитель.
- Слайды, вышедшие за видимую область, не получают `aria-hidden` или `inert`
  автоматически. Фокус не переносится при прокрутке; интерактивность содержимого
  и доступность скрытых элементов требуют решения на стороне продукта.
- При `prefers-reduced-motion: reduce` CSS-переход ленты отключается.

---

## Связанные компоненты

- `CarouselViewport` (`Carousel.Viewport`) — область просмотра с padding,
  touch-жестами и ref на измеряемый контейнер; самостоятельный контракт семейства.
- `CarouselItem` (`Carousel.Item`) — слайд с обязательным `index`, регистрирует
  DOM-узел для измерений и убирает его при размонтировании.
- `CarouselIndicators` (`Carousel.Indicators`) — связывает `PageIndicators` с
  текущей страницей и количеством страниц контекста, работает только в `PAGE`.
- `CarouselPrevButton` / `CarouselNextButton` (`Carousel.PrevButton` /
  `Carousel.NextButton`) — стрелки навигации с граничным `aria-disabled` и
  адаптацией к `(pointer: coarse)`.
- `Carousel.Track` — часть без отдельного AI.md: `<div role="presentation">`,
  объединяет внешний ref с ref контекста, применяет `gap` и смещение через
  runtime-переменные. Принимает стандартные HTML-атрибуты, объединяет `className`,
  передаёт `children`; отдельного API управления прокруткой не имеет.
- [CarouselExtended](../CarouselExtended/CarouselExtended-ai.md) — альтернатива
  для свободно прокручиваемой горизонтальной ленты со своим шагом в px и
  render-функциями кнопок.

---

## Stories

Основные истории: `stories/Carousel/Carousel.stories.tsx`.
Файлы примеров: `stories/Carousel/examples/`.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Выбор ориентации, режима прокрутки и зазора |
| `Default` | `Default.tsx` | Горизонтальная карусель со слайдами переменной ширины |
| `ScrollModes` | `ScrollModes.tsx` | Сравнение `ITEM` и `PAGE`, индикаторы в постраничном режиме |
| `Orientations` | `Orientations.tsx` | Горизонтальная и вертикальная раскладка, отдельный `gap` для каждой |
| `Production` | `Production.tsx` | Карточки действий со вложенными кнопками, `viewportPadding={8}` |
| `DynamicIndicators` | `DynamicIndicators.tsx` | Автоматический расчёт страниц и окно индикаторов для длинной ленты |

У `ScrollModes` и `Orientations` есть Linux/CI baseline-скриншоты на `xs` / `xl`
в `__screenshots__/`. Остальные текущие stories исключены из скриншот-прогона
через `testRunner.skip`; `Playground` также не попадает в MCP-примеры.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-20 | Создан документ. Завершён аудит Carousel в TRI-163: уточнены JSDoc и стабильные зависимости hooks, проверены существующие stories и дополнены тесты корневого контракта. |
