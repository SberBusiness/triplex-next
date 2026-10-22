---
component: CarouselNextButton
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

# CarouselNextButton

## Назначение

Кнопка перехода вперёд в составном `Carousel`. Рендерит `ButtonIcon`;
направление, край и переход берёт из контекста карусели.

Используй внутри `Carousel.Viewport` для навигации мышью и клавиатурой.
Для отдельного действия с иконкой используй `ButtonIcon`; для прямого выбора
страницы карусели — `Carousel.Indicators` в режиме `PAGE`.
На устройствах с `(pointer: coarse)` компонент возвращает `null`, навигацию
жестами обеспечивает `Carousel.Viewport`.

Публичное обращение — `Carousel.NextButton`. Именованного экспорта
`CarouselNextButton` и отдельного интерфейса его props в barrel пакета нет.

```tsx
import { Carousel } from "@sberbusiness/triplex-next";

<Carousel>
    <Carousel.Viewport style={{ width: 320, height: 160 }}>
        <Carousel.Track>
            <Carousel.Item index={0} style={{ width: 240 }}>Первый слайд</Carousel.Item>
            <Carousel.Item index={1} style={{ width: 240 }}>Второй слайд</Carousel.Item>
        </Carousel.Track>
        <Carousel.NextButton aria-label="Next slide" />
    </Carousel.Viewport>
</Carousel>
```

---

## Варианты и props

Обязательных custom-props нет. Компонент принимает `IButtonIconProps`:

| Prop | Назначение и ограничения |
|---|---|
| `children` | Заменяет стандартную иконку: стрелку вправо в горизонтальной карусели и вниз в вертикальной. `0`, `false` и пустая строка тоже дают стандартную иконку |
| `shape` | Форма `ButtonIcon`: `EButtonIconShape.SQUIRCLE` по умолчанию либо `CIRCLE` |
| `active` | Активное оформление иконки из `ButtonIcon`; с текущим слайдом не связано |
| `disabled` | Нативно отключает кнопку и исключает её из табуляции; от края карусели не зависит (см. «Граница и клик») |
| `onClick` | Вызывается после внутреннего перехода, на краю — без него (см. «Граница и клик») |
| `className`, `style`, `aria-*`, `data-*`, остальные атрибуты `<button>` | Передаются через `ButtonIcon` на нативную кнопку; `className` объединяется с классами навигации |
| `ref` | Указывает на `HTMLButtonElement`; на coarse-устройстве — `null` |

`type` по умолчанию `"button"`, переопределяется нативным prop. Размер
задаёт иконка.

### Граница и клик

- `aria-disabled` всегда равен `atEnd`, пользовательское значение
  перезаписывается. На краю кнопка остаётся enabled и фокусируемой.
- Без нативного `disabled` (он блокирует оба обработчика):
  - при `atEnd=false` сначала вызывается `nextSlide`, затем `onClick(event)`;
    `preventDefault()` в `onClick` переход не отменяет;
  - при `atEnd=true` вызывается только `onClick`.
- Шаг перехода в режимах `ITEM` / `PAGE` — см. `Carousel-ai.md`.

---

## Дизайн-токены

Фон и граница определяются стилями карусели:

```text
Carousel.Button_BackgroundColor_Default
Carousel.Button_BackgroundColor_Hover
Carousel.Button_BackgroundColor_Active
Carousel.Button_BackgroundColor_Disabled
Carousel.Button_BorderColor
```

Контур фокуса приходит из `ButtonIcon`:

```text
Button.Icon_Shadow_Focus
```

Переопределяются через `ThemeProvider` (prop `tokens`) — см.
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md), раздел
«Как переопределять токены». Источники значений —
`src/components/DesignTokens/components/Carousel.ts` и `Button.ts`.
Цвет стандартной иконки задаёт палитра `@sberbusiness/icons-next` с индексом 7.

---

## Инварианты

- Сохраняются `forwardRef`, `displayName="Carousel.NextButton"`, публичное
  статическое поле `Carousel.NextButton`, `IButtonIconProps` и barrel-экспорты.
- Внешний DOM-узел — `<span>` `IconWrapper` с `display: contents`. На него
  уходит `active`; нативный `disabled` получают и `<span>`, и `<button>`.
- Кнопка работает только внутри `Carousel`.
- При `(pointer: coarse)` не рендерится и `<span>`; нужен `window.matchMedia`.
- Классы `navButton`, `next` и классы ориентации на предке сохраняются:
  кнопка находится справа по центру горизонтального `Viewport` и снизу
  по центру вертикального, с отступом 16 px.
- По умолчанию кнопка прозрачна (`opacity: 0`); появляется при hover
  `Viewport` либо собственном `:focus-visible`.

---

## Accessibility

- Стрелки клавиатуры не обрабатываются, только нативные Enter/Space.
- Доступное имя задаёт потребитель через `aria-label` или `aria-labelledby`.
- Край ленты объявляется через `aria-disabled` (см. «Граница и клик»).
- `:focus-visible` одновременно показывает кнопку и фокусное оформление
  `Button.Icon_Shadow_Focus`. Прокрутка не переносит фокус на слайд.
- Известное ограничение: `prefers-reduced-motion` отключает только переход
  ленты, плавное появление стрелки остаётся.
- Связь `aria-controls` с областью слайдов и доступное имя карусели задаёт
  потребитель при необходимости; автоматически они не создаются.

---

## Связанные компоненты

- `Carousel` — родитель, источник направления, края и перехода.
- `ButtonIcon` — рендерится внутри; даёт props, ref, форму и контур фокуса.
- `CarouselViewport` — область позиционирования и hover; обрабатывает touch-жесты.
- `CarouselPrevButton` — парная кнопка обратного направления, доступная как
  `Carousel.PrevButton`.

---

## Stories

Основные истории: `stories/Carousel/Carousel.stories.tsx`
Файлы примеров: `stories/Carousel/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Направление и режим карусели; кнопки следуют контексту |
| `Default` | `Default.tsx` | Горизонтальная лента с кнопкой вперёд |
| `ScrollModes` | `ScrollModes.tsx` | Переключение элементов/страниц с тем же составным API |
| `Orientations` | `Orientations.tsx` | Горизонтальное/вертикальное положение и направление иконки |
| `Production` | `Production.tsx` | Карусель карточек действий |
| `DynamicIndicators` | `DynamicIndicators.tsx` | Кнопка вперёд вместе с постраничными индикаторами |
| `VisualTests` | `VisualTests.tsx` | Реальные keyboard focus и hover; конец ленты; нативный disabled и circle в вертикальной карусели |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-20 | Создан документ. |
