---
component: CarouselIndicators
category: Carousel
related: [Carousel, PageIndicators]
tokens:
  - PageIndicators.Indicator_Inactive_BackgroundColor_Default
  - PageIndicators.Indicator_Inactive_BackgroundColor_Hover
  - PageIndicators.Indicator_Inactive_BackgroundColor_Pressed
  - PageIndicators.Indicator_Inactive_BackgroundColor_Disabled
  - PageIndicators.Indicator_Active_BackgroundColor_Default
  - PageIndicators.Indicator_Active_BackgroundColor_Hover
  - PageIndicators.Indicator_Active_BackgroundColor_Pressed
  - PageIndicators.Indicator_Active_BackgroundColor_Disabled
  - PageIndicators.Indicator_OutlineColor
stories: stories/Carousel/Carousel.stories.tsx
version: "1.0"
---

# CarouselIndicators

## Назначение

Индикаторы страниц составного `Carousel`. Связывают `PageIndicators` с контекстом
карусели: получают количество страниц, выбранный индекс, ориентацию и переход к
странице от родителя. Самостоятельного состояния выбора у обёртки нет.

Используй внутри `Carousel` с `scrollMode={ECarouselScrollMode.PAGE}`, когда
нужно показать положение в наборе страниц и дать прямой переход между ними.
В режиме `ITEM` обёртка возвращает `null`; вне `Carousel` действует тот же
пустой результат из-за значения контекста по умолчанию. Для самостоятельного
управления `count`, `activeIndex` и `onChange` используй `PageIndicators`.

Публичный путь — статическое поле `Carousel.Indicators`. Именованного экспорта
`CarouselIndicators` из пакета нет; интерфейс `ICarouselIndicatorsProps` и типы
`TCarouselIndicatorProps` / `TCarouselIndicatorPropsFactory` экспортируются.

```tsx
import React from "react";
import { Carousel, ECarouselScrollMode } from "@sberbusiness/triplex-next";

export const CarouselWithIndicators = () => (
    <Carousel scrollMode={ECarouselScrollMode.PAGE} style={{ width: 400, height: 180 }}>
        <Carousel.Viewport>
            <Carousel.Track>
                {["Первый слайд", "Второй слайд", "Третий слайд"].map((text, index) => (
                    <Carousel.Item key={text} index={index} style={{ width: 400, height: 120 }}>
                        {text}
                    </Carousel.Item>
                ))}
            </Carousel.Track>
        </Carousel.Viewport>
        <Carousel.Indicators
            aria-label="Страницы карусели"
            indicatorProps={({ page }) => ({ "aria-label": `Страница ${page}` })}
        />
    </Carousel>
);
```

Размещай индикаторы рядом с `Carousel.Viewport`, внутри того же `Carousel`:
`Viewport` обрезает содержимое через `overflow: hidden`, а внешний корень
задаёт положение ряда по ориентации.

---

## Варианты и props

Обязательных props нет. Все данные выбора принадлежат родительскому `Carousel`.

| Prop | Назначение и ограничения |
|---|---|
| `indicatorProps` | Общие атрибуты кнопок либо фабрика от `{ index, page, selected }`. `index` начинается с 0, `page` — с 1; `selected` сообщает о выбранной странице. Используй для `aria-label`, `aria-controls`, `disabled`, `data-*` и оформления |
| `className`, `style`, `aria-*`, `data-*` и остальные атрибуты `<div>` | Передаются в `PageIndicators` на корневой ряд; `className` объединяется с классами раскладки карусели и индикаторов |
| `onKeyDown` | Передаётся в `PageIndicators`; вызывается после встроенной обработки клавиатуры |
| `ref` | Указывает на корневой `HTMLDivElement` ряда индикаторов; при отсутствии ряда — `null` |

`count`, `activeIndex`, `onChange` и `orientation` исключены из
`ICarouselIndicatorsProps`: обёртка всегда берёт их из контекста. Количество
индикаторов равно числу рассчитанных **страниц**, а не числу `Carousel.Item`:
на одной странице могут помещаться несколько слайдов. До расчёта страниц и
при пустой карусели `PageIndicators` с `count < 1` ничего не рендерит.

В `indicatorProps` свойства `role`, `tabIndex`, `aria-selected` управляются
`PageIndicators`; скрытым индикаторам он задаёт `aria-hidden`. Пользовательские
`className` и `style` объединяются с внутренними. Пользовательский `onClick`
индикатора вызывается **после** `goToSlide`, поэтому не отменяет запрос перехода.
Отключённые через `disabled` индикаторы пропускаются при клавиатурном выборе
и не обрабатывают клик.

---

## Дизайн-токены

В `Carousel.module.less` класс `indicators` задаёт только расположение ряда.
Цвета и контур фокуса приходят из `PageIndicators.module.less`:

```text
PageIndicators.Indicator_Inactive_BackgroundColor_Default
PageIndicators.Indicator_Inactive_BackgroundColor_Hover
PageIndicators.Indicator_Inactive_BackgroundColor_Pressed
PageIndicators.Indicator_Inactive_BackgroundColor_Disabled
PageIndicators.Indicator_Active_BackgroundColor_Default
PageIndicators.Indicator_Active_BackgroundColor_Hover
PageIndicators.Indicator_Active_BackgroundColor_Pressed
PageIndicators.Indicator_Active_BackgroundColor_Disabled
PageIndicators.Indicator_OutlineColor
```

Переопределяются через `ThemeProvider` (prop `tokens`) — см.
`src/components/ThemeProvider/ThemeProvider-ai.md`, раздел «Как переопределять
токены». Значения по умолчанию —
`src/components/DesignTokens/components/PageIndicators.ts`.

Токены `Carousel.Button_*` относятся к кнопкам навигации и не используются
индикаторами. Runtime-переменные геометрии `PageIndicators` не являются
дизайн-токенами.

---

## Инварианты

- `forwardRef` обязателен. Target — `<div role="tablist">`, а не `Viewport`,
  слайд или отдельная кнопка; `displayName` — `"Carousel.Indicators"`.
- Публичное обращение `Carousel.Indicators`, экспортируемые типы и форма
  аргумента фабрики `{ index, page, selected }` сохраняются.
- Выбором и ориентацией управляет `CarouselContext`; не добавлять параллельное
  состояние и возможность переопределять четыре исключённых prop.
- В `ITEM` результат — `null`. В `PAGE` используется один `PageIndicators`
  с `count={activeIndices.length}`, `activeIndex={currentIndex}` и
  `onChange={goToSlide}`.
- Раскладка зависит от классов ориентации на предке `Carousel`. На экранах
  от `screen-md` ряд получает внешний отступ 15 px (сверху горизонтально,
  слева вертикально). До `screen-sm-max` он позиционируется абсолютно на
  16 px за нижней или правой границей карусели и имеет `pointer-events: none`.
- Геометрию окна из пяти видимых индикаторов и ARIA-контракт обеспечивает
  `PageIndicators`; не дублировать эту логику в обёртке.
- Имена дизайн-токенов и существующие barrel-экспорты сохраняются; код остаётся
  совместимым с React 17.

---

## Accessibility

- Ряд получает `role="tablist"` и `aria-orientation`, отдельные кнопки —
  `role="tab"` и `aria-selected`. Роли и состояние задаёт `PageIndicators`.
- Передавай доступное имя ряду (`aria-label`) и каждой кнопке через
  `indicatorProps`; текст и язык выбирает потребитель.
- По Tab доступен выбранный индикатор. Если он `disabled`, Tab-stop получает
  ближайший доступный в видимом окне; если доступных нет, Tab-stop отсутствует.
- Стрелки `←` / `→` в горизонтальной и `↑` / `↓` в вертикальной ориентации
  выбирают соседнюю доступную страницу без зацикливания. `Home` / `End`
  выбирают первую/последнюю доступную страницу. Обработанным клавишам вызывается
  `preventDefault`; пользовательский `onKeyDown` вызывается после обработки.
- Если фокус уже внутри ряда, при смене выбранной страницы он следует за
  новым Tab-stop через `requestAnimationFrame`. Переключение кнопками карусели
  или жестом не забирает фокус из другого места.
- Индикаторы вне окна получают `aria-hidden="true"` и `tabIndex=-1`.
  `aria-controls` и связи со слайдами автоматически не создаются: при
  необходимости их задаёт потребитель через `indicatorProps` и атрибуты слайдов.
- На мобильной ширине `pointer-events: none` отключает выбор указателем,
  но не скрывает ряд от accessibility-дерева и клавиатуры. Прокрутка жестом
  обрабатывается `Carousel.Viewport`.
- При `prefers-reduced-motion: reduce` анимации индикаторов отключает
  `PageIndicators`.

---

## Связанные компоненты

- `Carousel` — родитель и владелец состояния, расчёта страниц и ориентации;
  индикаторы доступны через его статическое поле `.Indicators`.
- `PageIndicators` — непосредственно рендерится обёрткой;
  `ICarouselIndicatorsProps` наследует его props через `Omit`. Отвечает за
  кнопки, окно индикаторов, ARIA и клавиатуру.
- `CarouselViewport` — область слайдов и жестов. Индикаторы размещаются рядом
  с ней, чтобы не попасть под обрезку содержимого.

---

## Stories

Используются существующие истории семейства; отдельный stories-файл для атома
не нужен.

Основные истории: `stories/Carousel/Carousel.stories.tsx`
Файлы примеров: `stories/Carousel/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивное переключение `scrollMode` и `orientation`; для видимого ряда выбери `PAGE` |
| `Default` | `Default.tsx` | Карусель в режиме `ITEM` без индикаторов в композиции |
| `ScrollModes` | `ScrollModes.tsx` | Ряд в `PAGE` и отсутствие ряда в `ITEM`; снимки `xs` / `xl` |
| `Orientations` | `Orientations.tsx` | Раскладка родителя в двух ориентациях; `ITEM`, поэтому `.Indicators` возвращает `null` |
| `Production` | `Production.tsx` | Карточки в режиме `ITEM` без индикаторов в композиции |
| `DynamicIndicators` | `DynamicIndicators.tsx` | `PAGE` с большим количеством страниц и скользящим окном индикаторов |

Базовые снимки семейства —
`__screenshots__/carousel--scroll-modes--{xs,xl}.png` и
`__screenshots__/carousel--orientations--{xs,xl}.png`.
Состояния окна, фокуса, `disabled` и вертикального ряда покрыты дополнительно
в `stories/PageIndicators/PageIndicators.stories.tsx` (`VisualTests`),
а интеграция с контекстом — в
`src/components/Carousel/__tests__/CarouselIndicators.test.tsx`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-20 | Создан документ по TRI-164; подтверждено завершение AI-рефакторинга обёртки без изменения кода и публичного поведения. |
