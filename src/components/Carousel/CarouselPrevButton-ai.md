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

Кнопка перехода назад в составном `Carousel`. Рендерит `ButtonIcon`;
направление, край и переход берёт из контекста карусели.

Используй внутри `Carousel.Viewport` для навигации мышью и клавиатурой.
Для отдельного действия с иконкой используй `ButtonIcon`; для прямого выбора
страницы карусели — `Carousel.Indicators` в режиме `PAGE`.
На устройствах с `(pointer: coarse)` компонент возвращает `null`, навигацию
жестами обеспечивает `Carousel.Viewport`.

Публичное обращение — `Carousel.PrevButton`. Именованного экспорта
`CarouselPrevButton` и отдельного интерфейса его props в barrel пакета нет.

```tsx
import { Carousel } from "@sberbusiness/triplex-next";

<Carousel>
    <Carousel.Viewport style={{ width: 320, height: 160 }}>
        <Carousel.Track>
            <Carousel.Item index={0} style={{ width: 240 }}>Первый слайд</Carousel.Item>
            <Carousel.Item index={1} style={{ width: 240 }}>Второй слайд</Carousel.Item>
        </Carousel.Track>
        <Carousel.PrevButton aria-label="Previous slide" />
        <Carousel.NextButton aria-label="Next slide" />
    </Carousel.Viewport>
</Carousel>
```

---

## Варианты и props

Обязательных custom-props нет. Компонент принимает `IButtonIconProps`:

| Prop | Назначение и ограничения |
|---|---|
| `children` | Заменяет стандартную иконку: стрелку влево в горизонтальной карусели и вверх в вертикальной. `0`, `false` и пустая строка тоже дают стандартную иконку |
| `shape` | Форма `ButtonIcon`: `EButtonIconShape.SQUIRCLE` по умолчанию либо `CIRCLE` |
| `active` | Активное оформление иконки из `ButtonIcon`; с текущим слайдом не связано |
| `disabled` | Нативно отключает кнопку и исключает её из табуляции; от края карусели не зависит (см. «Граница и клик») |
| `onClick` | Вызывается после внутреннего перехода, в начале ленты — без него (см. «Граница и клик») |
| `className`, `style`, `aria-*`, `data-*`, остальные атрибуты `<button>` | Передаются через `ButtonIcon` на нативную кнопку; `className` объединяется с классами навигации |
| `ref` | Указывает на `HTMLButtonElement`; на coarse-устройстве — `null` |

`type` по умолчанию `"button"`, переопределяется нативным prop. Размер
задаёт иконка.

### Граница и клик

- `aria-disabled` всегда равен `atStart`, пользовательское значение
  перезаписывается. В начале ленты кнопка остаётся enabled и фокусируемой.
- Без нативного `disabled` (он блокирует оба обработчика):
  - при `atStart=false` сначала вызывается `prevSlide`, затем `onClick(event)`;
    `preventDefault()` в `onClick` переход не отменяет;
  - при `atStart=true` вызывается только `onClick`.
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

`Carousel.Button_BackgroundColor_Disabled` применяется по `aria-disabled=true`;
нативный `disabled` этот фон не включает.

Переопределяются через `ThemeProvider` (prop `tokens`) — см.
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md), раздел
«Как переопределять токены». Источники значений —
`src/components/DesignTokens/components/Carousel.ts` и `Button.ts`.
Цвет стандартной иконки задаёт палитра `@sberbusiness/icons-next` с индексом 7.

---

## Инварианты

- Сохраняются `forwardRef`, `displayName="Carousel.PrevButton"`, публичное
  статическое поле `Carousel.PrevButton`, `IButtonIconProps` и barrel-экспорты.
- Внешний DOM-узел — `<span>` `IconWrapper` с `display: contents`. На него
  уходит `active`; нативный `disabled` получают и `<span>`, и `<button>`.
- Кнопка работает только внутри `Carousel`.
- Реализация общая с `Carousel.NextButton` во внутреннем `CarouselNavButton`:
  правка в нём меняет обе кнопки.
- При `(pointer: coarse)` не рендерится и `<span>`; нужен `window.matchMedia`.
- Стандартную иконку дают все falsy `children` (см. «Варианты и props»);
  переход на nullish-проверку меняет контракт.
- Классы `navButton`, `prev` и классы ориентации на предке сохраняются:
  кнопка находится слева по центру горизонтального `Viewport` и сверху
  по центру вертикального, с отступом 16 px.
- По умолчанию кнопка прозрачна (`opacity: 0`); появляется при hover
  `Viewport` либо собственном `:focus-visible`.

---

## Accessibility

- Стрелки клавиатуры не обрабатываются, только нативные Enter/Space.
- На границе кнопка остаётся в порядке Tab и сохраняет фокус. Enter/Space
  вызывают пользовательский `onClick`, но не переход; нативный `disabled`
  исключает кнопку из Tab и блокирует оба обработчика.
- При смене `(pointer: coarse)` кнопка удаляется из DOM, а её ref становится
  `null`; когда запрос снова возвращает `false`, кнопка рендерится заново.
- Доступное имя задаёт потребитель через `aria-label` или `aria-labelledby`.
- Начало ленты объявляется через `aria-disabled` (см. «Граница и клик»).
- `:focus-visible` даёт контур `Button.Icon_Shadow_Focus`. Прокрутка не
  переносит фокус на слайд.
- Известное ограничение: `prefers-reduced-motion` отключает только переход
  ленты, плавное появление стрелки остаётся.
- Связь `aria-controls` с областью слайдов и доступное имя карусели задаёт
  потребитель при необходимости; автоматически они не создаются.

---

## Связанные компоненты

- `Carousel` — родитель, источник направления, края и перехода.
- [ButtonIcon](../Button/ButtonIcon-ai.md) — рендерится внутри; даёт props, ref, форму и контур фокуса.
- `CarouselViewport` — область позиционирования и hover; обрабатывает touch-жесты.
- `CarouselNextButton` — парная кнопка прямого направления, доступная как
  `Carousel.NextButton`.

---

## Stories

Основные истории: `stories/Carousel/Carousel.stories.tsx`
Файлы примеров: `stories/Carousel/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Направление и режим карусели; кнопки следуют контексту |
| `Default` | `Default.tsx` | Горизонтальная лента с кнопками навигации |
| `ScrollModes` | `ScrollModes.tsx` | Переключение элементов/страниц с тем же составным API |
| `Orientations` | `Orientations.tsx` | Горизонтальное/вертикальное положение и направление иконки |
| `Production` | `Production.tsx` | Карусель карточек действий |
| `DynamicIndicators` | `DynamicIndicators.tsx` | Кнопка назад вместе с постраничными индикаторами |
| `VisualTests` | `VisualTests.tsx` | Начало ленты; нативный disabled и circle в вертикальной карусели. Фокус и hover общие для обеих кнопок и снимаются на `NextButton` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-29 | Уточнены Tab, Enter/Space и жизненный цикл ref при смене указателя; контракт проверен в отдельном `CarouselPrevButton.test.tsx`. |
| 2026-10-21 | Создан документ. |
