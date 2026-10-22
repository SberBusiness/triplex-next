---
component: CarouselPrevButton
category: Carousel
related: [Carousel, ButtonIcon]
tokens:
  - Carousel.Button_BackgroundColor_Default
  - Carousel.Button_BackgroundColor_Hover
  - Carousel.Button_BackgroundColor_Active
  - Carousel.Button_BackgroundColor_Disabled
  - Carousel.Button_BorderColor
  - Button.Icon_Shadow_Focus
stories: stories/Carousel/Carousel.stories.tsx
version: "1.0"
---

# CarouselPrevButton

## Назначение

Кнопка перехода назад в составном `Carousel`. Берёт ориентацию, границу начала
ленты и действие `prevSlide` из контекста ближайшей карусели, а оформление и
стандартные атрибуты кнопки наследует от `ButtonIcon`.

Используй внутри `Carousel.Viewport` для навигации назад по элементам или
страницам. Вне `Carousel` доступно значение контекста по умолчанию: горизонтальная
стрелка с `aria-disabled=true`, без прокрутки. Для самостоятельного действия
с иконкой используй `ButtonIcon`.

Публичный импорт: `import { Carousel } from "@sberbusiness/triplex-next"`.
Обращение — `Carousel.PrevButton`; самостоятельного именованного экспорта
`CarouselPrevButton` из публичного barrel нет. Props используют публичный
`IButtonIconProps`, отдельного интерфейса кнопки карусели нет.

```tsx
import React from "react";
import { Carousel } from "@sberbusiness/triplex-next";

export const CarouselWithPreviousButton = () => (
    <Carousel style={{ width: 320, height: 160 }}>
        <Carousel.Viewport>
            <Carousel.Track>
                {["Первый слайд", "Второй слайд", "Третий слайд"].map((text, index) => (
                    <Carousel.Item key={text} index={index} style={{ width: 240, height: 160 }}>
                        {text}
                    </Carousel.Item>
                ))}
            </Carousel.Track>
            <Carousel.PrevButton aria-label="Предыдущий слайд" />
            <Carousel.NextButton aria-label="Следующий слайд" />
        </Carousel.Viewport>
    </Carousel>
);
```

---

## Варианты и props

Обязательных props нет. `IButtonIconProps` включает стандартные атрибуты
`<button>` и `data-*`; они передаются в `ButtonIcon` на `HTMLButtonElement`.

| Prop                                                              | По умолчанию                | Назначение и ограничения                                                                                                                                  |
| ----------------------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                                                        | Стрелка по ориентации       | Truthy-содержимое заменяет иконку. `undefined`, `null`, `false`, `0` и пустая строка возвращают стандартную иконку, поскольку используется логическое ИЛИ |
| `shape`                                                           | `EButtonIconShape.SQUIRCLE` | Передаётся в `ButtonIcon`; доступен также `CIRCLE`                                                                                                        |
| `active`                                                          | `false`                     | Передаётся в `ButtonIcon` и задаёт состояние его `IconWrapper`; не управляет положением ленты                                                             |
| `disabled`                                                        | `false`                     | Нативно отключает кнопку, исключает её из Tab-порядка и блокирует оба обработчика клика                                                                   |
| `onClick`                                                         | —                           | Вызывается с событием после запроса перехода назад; на границе начала вызывается без перехода                                                             |
| `className`, `style`, `aria-*`, `data-*`, остальные HTML-атрибуты | —                           | Передаются на `<button>`; `className` объединяется с классами кнопки и навигации                                                                          |
| `ref`                                                             | —                           | Указывает на `HTMLButtonElement`; при отсутствии кнопки — `null`                                                                                          |

### Контекст и обработка клика

- `orientation` не является prop кнопки: `HORIZONTAL` даёт
  `CaretleftStrokeSrvIcon20`, `VERTICAL` — `CaretupStrokeSrvIcon20`, обе 20 px
  с `paletteIndex={7}`. Ориентацию задаёт родительский `Carousel`.
- `atStart` и `prevSlide` принадлежат контексту. В `ITEM` переход раскрывает
  предыдущий скрытый элемент или часть большого слайда; в `PAGE` — предыдущую
  страницу. Кнопка не рассчитывает геометрию и не хранит индекс.
- `aria-disabled` всегда вычисляется из `atStart`, переопределяя одноимённый
  переданный атрибут. Это не нативный `disabled`: на границе кнопка остаётся
  фокусируемой, пропускает `prevSlide`, но вызывает пользовательский `onClick`.
- При `atStart=false` сначала вызывается `prevSlide()`, затем `onClick(event)`.
  `event.preventDefault()` в пользовательском callback не отменяет уже
  запрошенный переход. Нативный `disabled` блокирует весь обработчик независимо
  от `atStart`; эти два состояния не заменяют друг друга.
- `type="button"` приходит из `ButtonIcon`; его можно переопределить через props.
- При `(pointer: coarse)` результат — `null`. Это media query типа указателя,
  а не breakpoint ширины; при смене query кнопка появляется или исчезает.

### Размещение и видимость

Кнопка позиционируется абсолютно внутри `Carousel.Viewport`: слева по центру
в горизонтальной карусели, сверху по центру — в вертикальной, с отступом 16 px.
Ориентационные CSS-классы берутся с предка `Carousel`.

По умолчанию `opacity=0`; наведение на `Viewport` и `:focus-visible` показывают
кнопку. При отсутствии фокуса прозрачная кнопка остаётся в DOM и Tab-порядке.
`ButtonIcon` добавляет внешнюю span-обёртку `IconWrapper` с `display: contents`;
ref, HTML-атрибуты и `className` относятся к вложенному `<button>`.

---

## Дизайн-токены

Фон и граница задаются `styles/Carousel.module.less`, тень клавиатурного фокуса —
`ButtonIcon.module.less`:

```text
Carousel.Button_BackgroundColor_Default
Carousel.Button_BackgroundColor_Hover
Carousel.Button_BackgroundColor_Active
Carousel.Button_BackgroundColor_Disabled
Carousel.Button_BorderColor
Button.Icon_Shadow_Focus
```

`Carousel.Button_BackgroundColor_Disabled` применяется по `aria-disabled=true`;
нативный `disabled` сам по себе этот фон не включает. Цвета SVG управляются
палитрой и состояниями `IconWrapper`.

Переопределяются через `ThemeProvider` (prop `tokens`), см.
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md), раздел
«Как переопределять токены». Значения по умолчанию находятся в
`src/components/DesignTokens/components/Carousel.ts` и `Button.ts`.

---

## Инварианты

- `forwardRef` сохраняется; target — `HTMLButtonElement` внутри `ButtonIcon`.
  `displayName` — `"Carousel.PrevButton"`.
- Публичное поле `Carousel.PrevButton`, контракт `IButtonIconProps` и
  существующие barrel-экспорты сохраняются.
- `atStart` управляет `aria-disabled` и только встроенным переходом; порядок
  `prevSlide` → пользовательский `onClick` сохраняется.
- Falsy-значения `children` выбирают стандартную иконку; замена логического ИЛИ
  на nullish-проверку изменит контракт.
- `(pointer: coarse)` исключает кнопку из DOM, а не только скрывает стилями.
- Классы `navButton`, `prev` и классы ориентации родителя обеспечивают
  позиционирование и показ на hover/focus; имена шести токенов сохраняются.
- Совместимость с React 17 при переносе в `release-0` сохраняется.

---

## Accessibility

- Нативный `<button>` поддерживает Tab, Enter и Space. Собственных обработчиков
  стрелок, перемещения фокуса и связи `aria-controls` у обёртки нет.
- Передавай `aria-label` с доступным именем действия, если внутри только иконка.
  Стандартная SVG скрыта от accessibility-дерева; текст и язык выбирает потребитель.
- `aria-disabled=true` сообщает о начале ленты, сохраняя фокусируемость и вызов
  пользовательского callback. Для полной блокировки нужен нативный `disabled`.
- `:focus-visible` показывает кнопку и фокусную тень; клик не переводит фокус
  на слайды. На устройствах с coarse-указателем кнопки нет в DOM, навигацию
  жестом обеспечивает `Carousel.Viewport`.

---

## Связанные компоненты

- `Carousel` — владелец ориентации, границы начала и действия перехода назад;
  предоставляет публичное поле `.PrevButton`.
- [ButtonIcon](../Button/ButtonIcon-ai.md) — рендерится внутри и определяет
  `IButtonIconProps`, нативную кнопку, ref-target и фокусную тень.
- `Carousel.Viewport` — область позиционирования кнопки и показа при наведении.
- `Carousel.NextButton` — симметричная навигация к концу ленты.

---

## Stories

Основные истории: `stories/Carousel/Carousel.stories.tsx`
Файлы примеров: `stories/Carousel/examples/`

| Story               | Example file            | Что демонстрирует                                               |
| ------------------- | ----------------------- | --------------------------------------------------------------- |
| `Playground`        | `Playground.tsx`        | Переключение ориентации, режима и зазора карусели               |
| `Default`           | `Default.tsx`           | PrevButton в горизонтальной ленте со слайдами переменной ширины |
| `ScrollModes`       | `ScrollModes.tsx`       | Навигация в `ITEM` и `PAGE`; снимки `xs` / `xl`                 |
| `Orientations`      | `Orientations.tsx`      | Горизонтальная и вертикальная стрелки; снимки `xs` / `xl`       |
| `Production`        | `Production.tsx`        | PrevButton рядом с карточками действий                          |
| `DynamicIndicators` | `DynamicIndicators.tsx` | PrevButton в постраничной ленте с индикаторами                  |

Дополнительные истории: `stories/CarouselPrevButton/CarouselPrevButton.stories.tsx`
Файлы примеров: `stories/CarouselPrevButton/examples/`

| Story         | Example file      | Что демонстрирует                                                                                |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| `VisualTests` | `VisualTests.tsx` | Клавиатурный фокус, hover, начало ленты и нативный `disabled` в вертикальной карусели с `CIRCLE` |

`VisualTests` скрыта из autodocs и сайдбара и не включается в MCP-примеры.
Состояния кнопок проверяются в `play`, реальный CSS-hover включается
`testRunner.hoverSelector`. Визуальные baselines создаются только в Linux/CI.
Контракт обёртки проверяется в
`src/components/Carousel/__tests__/CarouselPrevButton.test.tsx`.

---

## История изменений

| Дата       | Изменение       |
| ---------- | --------------- |
| 2026-10-21 | Создан документ |
