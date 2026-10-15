---
component: PageIndicators
category: Navigation
related: []
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
stories: stories/PageIndicators/PageIndicators.stories.tsx
version: "1.0"
---

# PageIndicators

## Назначение

Controlled-ряд индикаторов страниц: показывает, какая страница из `count` активна,
и позволяет переключиться кликом или с клавиатуры. Одновременно видимо окно из 5
индикаторов: активный — длинный, остальные — короче, а крайние индикаторы окна
уменьшаются, если за ними есть ещё страницы. Смена страницы анимируется.

Используй когда: нужен компактный индикатор положения в наборе слайдов/страниц —
карусель, галерея изображений, онбординг-шаги без подписей.

Не используй когда: страниц много и пользователю нужен переход к конкретному
номеру или выбор размера страницы — для этого `Pagination`. Не используй как
индикатор прогресса процесса с подписями шагов — для этого `Stepper`.

---

## Варианты и props

Своего состояния активной страницы компонент не держит — `activeIndex` и
`onChange` всегда задаёт потребитель.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `count` | `number` | Количество страниц. При `count < 1` компонент ничего не рендерит |
| `activeIndex` | `number` | Индекс активной страницы (с 0). Значение вне диапазона приводится к ближайшей странице, чтобы у ряда всегда был активный индикатор, доступный по Tab |
| `onChange` | `(index: number) => void` | Выбор страницы кликом или с клавиатуры. С клавиатуры вызывается только при реальной смене индекса (на границе диапазона — нет) |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `orientation` | `EOrientation` | `HORIZONTAL` | `HORIZONTAL` (`'horizontal'`) / `VERTICAL` (`'vertical'`): направление ряда и набор клавиш-стрелок |
| `indicatorProps` | `TPageIndicatorProps \| TPageIndicatorPropsFactory` | — | Свойства кнопок-индикаторов: объект для всех или функция от `{ index, page, selected }`. Через неё задают `aria-label`, `disabled`, `data-*` |
| `...HTMLDivAttributes` | — | — | Пробрасываются на корневой `<div>`. Кроме `onChange` (переопределён под выбор страницы) |

В `indicatorProps` компонент переопределяет `role`, `tabIndex`, `aria-selected`
(и `aria-hidden` для индикаторов вне окна); `className` и `style` мерджатся с
собственными. `onClick` из `indicatorProps` вызывается после `onChange`.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/PageIndicators.ts`.

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

Runtime CSS-переменные (задаются компонентом через `style`, **не** дизайн-токены,
не попадают в `DesignTokens`):

```
--triplex-next-runtime-PageIndicators-Root_Size
--triplex-next-runtime-PageIndicators-Indicator_Scale
--triplex-next-runtime-PageIndicators-Indicator_Translate
```

---

## Инварианты

- **`forwardRef`** обязателен; target — корневой `<div role="tablist">`.
- **Controlled-only.** Не добавлять внутреннее состояние активной страницы —
  `Carousel.Indicators` и `ImageGalleryExtended.PageIndicators` управляют им сами.
- **Геометрия окна** (5 видимых, размеры 24 / 16 / 8 px, зазор 8 px) — визуальный
  контракт; изменение ломает скриншот-регрессию `Carousel` и галереи.
- **Кэшированные колбэки индикаторов** (ref и click по индексу) стабильны между
  рендерами; актуальные `onChange` / `indicatorProps` читаются из рефов. Не
  замыкать их напрямую — иначе устаревшее замыкание после ререндера.
- **Отступы** (`padding: 1px` + `margin: -1px`) оставляют место для focus outline
  при `overflow: hidden`. Внешние отступы задаёт потребитель через `className`
  (селектором большей специфичности).
- **Публичный API** (`PageIndicators`, общий `EOrientation` и значения
  `'horizontal'`/`'vertical'`, `IPageIndicatorsProps`, `TPageIndicatorProps`,
  `TPageIndicatorPropsFactory`, форма аргумента фабрики `{ index, page, selected }`)
  — breaking change при изменении.

---

## Accessibility

- **Роли:** корень — `role="tablist"` с `aria-orientation`, индикаторы —
  `<button role="tab">` с `aria-selected`.
- **Roving tabindex:** в последовательности Tab только активный индикатор
  (`tabIndex=0`), остальные — `tabIndex=-1`. Если активный отключён, Tab-stop
  получает ближайший доступный в видимом окне; если там доступных нет, Tab-stop
  у ряда нет (скрытые индикаторы недоступны и мыши).
- **Клавиатура** на ряду: `→` / `←` (горизонтально) или `↓` / `↑` (вертикально) —
  следующая/предыдущая страница без зацикливания; `Home` / `End` — первая/последняя.
  Обработанные клавиши получают `preventDefault`; `onKeyDown` потребителя
  вызывается всегда.
- **Фокус следует за выбором:** если фокус внутри ряда, после смены `activeIndex`
  он переносится на новый активный индикатор (в `requestAnimationFrame`).
- **Индикаторы вне окна** помечены `aria-hidden="true"`.
- **Отключённые индикаторы** (`disabled` через `indicatorProps`) пропускаются
  клавиатурой: стрелки, `Home` и `End` ведут к ближайшему доступному.
- **`aria-label` — обязанность потребителя:** компонент не хардкодит язык.
  Подпись индикаторам задают через `indicatorProps` (например, `Страница N`), ряду —
  `aria-label` на корне.

---

## Связанные компоненты

- `Carousel` — `Carousel.Indicators` рендерит `PageIndicators`, беря `count`,
  `activeIndex`, `onChange` и ориентацию из контекста карусели; в режиме
  `ECarouselScrollMode.ITEM` ничего не рендерит. Карусель добавляет только
  раскладочные отступы и мобильное позиционирование.
- `ImageGalleryExtended` — часть `.PageIndicators` рендерит `PageIndicators` с
  индикатором на каждое изображение; `aria-label` по умолчанию — `item.alt`.
- `Pagination` — альтернатива для длинных списков с номерами страниц.

---

## Stories

Основные истории: `stories/PageIndicators/PageIndicators.stories.tsx`
Файлы примеров: `stories/PageIndicators/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `count` и `orientation` |
| `Default` | `Default.tsx` | Базовый горизонтальный ряд из 5 страниц |
| `Orientations` | `Orientations.tsx` | Горизонтальная и вертикальная ориентация |
| `ManyPages` | `ManyPages.tsx` | 12 страниц: скользящее окно из 5 индикаторов |
| `CustomIndicatorProps` | `CustomIndicatorProps.tsx` | Фабрика `indicatorProps`: `aria-label`, `aria-controls`, `data-*` и связь с `tabpanel` |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: фокус, окно в начале/середине/конце, disabled, вертикальная ориентация |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-07 | Создан документ: компонент вынесен из `Carousel.Indicators` и встроен в `ImageGalleryExtended` |
