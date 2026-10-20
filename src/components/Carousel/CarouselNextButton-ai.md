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

Кнопка перехода вперёд в составном `Carousel`. Получает направление движения,
граничное состояние и действие перехода из контекста карусели; внешний вид
и нативное поведение кнопки делегирует `ButtonIcon`.

Используй внутри `Carousel.Viewport` для навигации мышью и клавиатурой.
Для отдельного действия с иконкой используй `ButtonIcon`; для прямого выбора
страницы карусели — `Carousel.Indicators` в режиме `PAGE`.
На устройствах с `(pointer: coarse)` компонент возвращает `null`, навигацию
жестами обеспечивает `Carousel.Viewport`.

Публичное обращение — `Carousel.NextButton`. Именованного экспорта
`CarouselNextButton` и отдельного интерфейса его props в barrel пакета нет;
используется публичный `IButtonIconProps`.

```tsx
import { Carousel } from "@sberbusiness/triplex-next";

<Carousel>
    <Carousel.Viewport style={{ width: 320, height: 160 }}>
        <Carousel.Track>
            <Carousel.Item index={0} style={{ width: 240 }}>Первый слайд</Carousel.Item>
            <Carousel.Item index={1} style={{ width: 240 }}>Второй слайд</Carousel.Item>
        </Carousel.Track>
        <Carousel.NextButton aria-label="Следующий слайд" />
    </Carousel.Viewport>
</Carousel>
```

---

## Варианты и props

Обязательных custom-props нет. Компонент принимает `IButtonIconProps`:

| Prop | Назначение и ограничения |
|---|---|
| `children` | Заменяет стандартную иконку. Без содержимого используется стрелка вправо в горизонтальной карусели и вниз в вертикальной. Проверка — `children \|\| defaultIcon`, поэтому `0`, `false` и пустая строка также возвращают стандартную иконку |
| `shape` | Унаследованная форма `ButtonIcon`: `EButtonIconShape.SQUIRCLE` по умолчанию либо `CIRCLE` |
| `active` | Передаётся в `IconWrapper` через `ButtonIcon` и управляет активным оформлением иконки. Это не текущая страница и не команда прокрутки |
| `disabled` | Нативно отключает кнопку и её обработчики. Независим от края карусели |
| `onClick` | Вызывается после внутреннего перехода; при достигнутом крае внутренний переход пропускается, пользовательский обработчик всё равно вызывается |
| `className`, `style`, `aria-*`, `data-*`, остальные атрибуты `<button>` | Передаются через `ButtonIcon` на нативную кнопку; `className` объединяется с классами навигации |
| `ref` | Указывает на `HTMLButtonElement`. При скрытии на coarse-устройстве — `null` |

`type` по умолчанию равен `"button"`, но может быть переопределён нативным
prop. Собственных `size`, `orientation`, `atEnd` или `nextSlide` в API нет:
размер зависит от иконки, остальные данные принадлежат `Carousel`.

### Граница и клик

- `aria-disabled={atEnd}` задаётся после spread и не переопределяется
  пользовательским `aria-disabled`. На краю кнопка остаётся нативно enabled
  и фокусируемой, если потребитель отдельно не передал `disabled`.
- При `atEnd=false` сначала вызывается `nextSlide`, затем `onClick(event)`.
  Пользовательский `preventDefault()` в `onClick` не отменяет уже выполненный
  внутренний вызов.
- При `atEnd=true` вызывается только пользовательский `onClick`.
- При `disabled=true` нативная кнопка блокирует оба обработчика. Если край
  ещё не достигнут, `aria-disabled` при этом остаётся `false`.
- В `ITEM` действие раскрывает следующий скрытый элемент, а большой слайд
  может прокручиваться без смены индекса. В `PAGE` переключает страницу.
  Алгоритм принадлежит `Carousel`, обёртка его не дублирует.

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
- Ref, `className` и HTML-атрибуты относятся к `<button>`. Внешний DOM-узел
  `ButtonIcon` — `IconWrapper` (`<span>` с CSS `display: contents`);
  состояние `active`/нативный `disabled` передаётся этой обёртке.
- Управление границей и направлением остаётся в ближайшем `CarouselContext`.
  Для работы навигации кнопку размещают внутри `Carousel`.
- Контракт `aria-disabled` и порядок вызовов обработчиков сохраняются.
  Достижение края не заменяется нативным `disabled`.
- При `(pointer: coarse)` нет ни кнопки, ни её span-обёртки. Изменение media
  query отслеживается `useMatchMedia`, которому требуется `window.matchMedia`.
- Классы `navButton`, `next` и классы ориентации на предке сохраняются:
  кнопка находится справа по центру горизонтального `Viewport` и снизу
  по центру вертикального, с отступом 16 px.
- По умолчанию кнопка прозрачна (`opacity: 0`); появляется при hover
  `Viewport` либо собственном `:focus-visible`. Переход прозрачности — 0.3 s.
  `prefers-reduced-motion` в карусели отключает переход ленты; переход
  прозрачности стрелки этим правилом не меняется.
- Код не использует React 18-only API и остаётся совместимым с React 17.

---

## Accessibility

- Нативный `<button>` поддерживает Enter/Space и табуляцию. Отдельной обработки
  стрелок клавиатуры у `NextButton` нет.
- Для кнопки с иконкой потребитель задаёт доступное имя через `aria-label`
  или `aria-labelledby`; библиотека не выбирает текст и язык.
- Край ленты объявляется через `aria-disabled`, но кнопка остаётся доступной
  по Tab. Нативный `disabled` исключает её из табуляции и блокирует клик.
- `:focus-visible` одновременно показывает кнопку и фокусное оформление
  `Button.Icon_Shadow_Focus`. Прокрутка не переносит фокус на слайд.
- Связь `aria-controls` с областью слайдов и доступное имя карусели задаёт
  потребитель при необходимости; автоматически они не создаются.
- На coarse-устройствах кнопку нельзя сфокусировать: DOM-узел отсутствует.

---

## Связанные компоненты

- `Carousel` — родитель, источник направления, граничного состояния и перехода.
- `ButtonIcon` — непосредственно рендерится; предоставляет props, нативную
  кнопку, ref, форму и контур фокуса.
- `CarouselViewport` — область позиционирования и hover; также реализует touch-жесты.
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

В `VisualTests` конец ленты подготавливается через `play`, фокус — через Tab,
реальный CSS hover — через `testRunner.hoverSelector`. Для одновременного показа
статических end/disabled рядов только в fixture задано `opacity: 1`; строки
focus/hover используют обычное управление видимостью. Переход прозрачности
кнопок в fixture отключён для стабильного кадра. Скриншоты снимаются на `xs`/`xl`.
`Playground` и `VisualTests` не включаются в MCP-примеры.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-20 | Создан документ. |
