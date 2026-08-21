---
component: ExpandAnimation
category: ExpandAnimation
related: [AccordionBase]
tokens: []
stories: stories/ExpandAnimation/ExpandAnimation.stories.tsx
version: "1.0"
---

# ExpandAnimation

## Назначение

Обёртка, анимирующая раскрытие и сворачивание содержимого по высоте. Своего
состояния не хранит: раскрытость целиком задаётся пропом `expanded` со стороны
потребителя. Внутри — `Transition` из `react-transition-group`, поверх которого
надстроены измерение высоты контента и инлайн-стили фаз анимации.

Собственного оформления у компонента нет — только `transition-property: height`
и `transition-timing-function: ease-in-out`. Это строительный блок, а не
готовый UI.

Используй когда: нужно плавно раскрыть/свернуть произвольный блок, а состояние
раскрытия уже живёт в потребителе (аккордеон, «показать ещё», раскрываемая
строка таблицы).

Не используй когда: нужен готовый аккордеон с внутренним состоянием, id-связкой
заголовка и тела и ARIA-атрибутами — для этого есть `AccordionBase` и
построенные на нём компоненты.

---

## Варианты и props

`IExpandAnimationProps` расширяет `React.HTMLAttributes<HTMLDivElement>` —
`...rest` уходит на корневой `<div>`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `expanded` | `boolean` | Развёрнут ли блок. Управляемое свойство, внутреннего состояния нет |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `animationTime` | `number` | `300` | Длительность анимации в мс. Одновременно уходит в `timeout` у `Transition` и в инлайн-стиль `transition-duration` — задавать их врозь нельзя |
| `onStart` | `() => void` | — | Начало анимации. Вызывается **и при разворачивании, и при сворачивании** (из `onEnter` и `onExit`) |
| `onEnd` | `() => void` | — | Конец анимации. Вызывается **и при разворачивании, и при сворачивании** (из `onEntered` и `onExited`) |
| `transitionProps` | `React.ComponentProps<typeof Transition<HTMLDivElement>>` | — | Сквозные props для внутреннего `Transition` |
| `className` | `string` | — | Мерджится с собственным классом через `clsx` |
| `style` | `React.CSSProperties` | — | Разливается **после** стилей фазы анимации, поэтому переопределяет `height` / `overflow` / `visibility`. Передавать `height` здесь — значит сломать анимацию |

### Как работает анимация

| Фаза `TransitionStatus` | Инлайн-стили корневого `<div>` |
|---|---|
| `entering` | `height: <scrollHeight>`, `overflow: hidden` |
| `entered` | — (высота отпускается в `auto`) |
| `exiting` | `height: 0`, `overflow: hidden` |
| `exited` | `height: 0`, `overflow: hidden`, `visibility: hidden` |
| `unmounted` | — |

- **Разворачивание.** В `onEnter` измеряется `scrollHeight` контента и
  записывается в карту стилей фазы `entering` — до того, как `Transition`
  отрисует эту фазу. Без этого анимировать не от чего.
- **Сворачивание.** В `onExit` текущая высота фиксируется прямой записью в
  `node.style.height` (вместо `auto`), затем принудительно читается
  `scrollHeight` для reflow — иначе браузер схлопнет переход в один кадр.
- **`entered` без высоты** — контент может свободно менять размер, пока блок
  раскрыт.

### `transitionProps` — порядок применения

`transitionProps` разливается в `Transition` **после** `in`, `timeout` и
`nodeRef`, но **до** обработчиков. Практические следствия:

- `in`, `timeout`, `nodeRef` из `transitionProps` **перекроют** внутренние
  значения. Передача своего `nodeRef` ломает измерение высоты — не делать.
- `onEnter` / `onEntered` / `onExit` / `onExited` перекрыть нельзя: компонент
  ставит свои обработчики последними и вызывает пользовательские внутри них,
  после `onStart` / `onEnd`.
- Остальные обработчики (`onEntering`, `onExiting`) проходят насквозь без
  обёртки.

**Известное неудобство типизации:** `transitionProps` типизирован полным
`ComponentProps<typeof Transition<HTMLDivElement>>`, где `children` и `timeout`
обязательны. Передать объект с одними обработчиками без каста нельзя, хотя
`children` / `in` / `timeout` компонент задаёт сам. Сузить тип (например до
`Partial<>` или `Omit<>`) — breaking change публичного API, отдельное решение
мейнтейнера.

---

## Дизайн-токены

Токенов нет. `ExpandAnimation.module.less` содержит один класс без
CSS-переменных:

```text
.expandAnimation {
    transition-property: height;
    transition-timing-function: ease-in-out;
}
```

Все размеры и цвета — на стороне контента и потребителя.

---

## Инварианты

- **`forwardRef` на компоненте — не убирать.** Ref идёт на корневой `<div>`,
  тот же элемент, что получает `className`, `style` и `...rest`.
- **Внутренний `nodeRef` и пользовательский `ref` совмещаются в `setRef`.**
  `nodeRef` нужен `Transition` (React 18 StrictMode-safe вместо
  `findDOMNode`) и используется для измерения высоты. Убрать совмещение —
  сломать либо анимацию, либо ref потребителя.
- **Карта стилей фаз живёт в `useRef`, а не пересоздаётся на рендере.**
  `onEnter` мутирует `entering.height` до рендера фазы `entering`; на свежем
  объекте мутация потерялась бы, и раскрытие анимировалось бы от нуля к нулю.
- **`animationTime` управляет и `timeout`, и `transition-duration`.**
  Рассинхрон приведёт к тому, что `onEnd` сработает не в конце анимации.
- **`visibility: hidden` в фазе `exited`** — свёрнутое содержимое не попадает
  в порядок обхода по Tab. Убирать нельзя: на это опираются потребители —
  например, `CollapsibleTree-ai.md` фиксирует это как гарантию доступности
  свёрнутой ветки.
- **Публичные экспорты barrel** (`src/components/ExpandAnimation/index.ts`):
  `ExpandAnimation`, `IExpandAnimationProps`. Переименование — breaking change.
- **`displayName = "ExpandAnimation"`.**
- **Корневой DOM — `<div>`.** Тег не настраивается.
- **React 17-совместимость.** Компонент уходит в ветку `release-0`; React
  18-only API (`useId`, `useSyncExternalStore`, `useInsertionEffect`)
  использовать нельзя.

---

## Accessibility

Компонент **не выставляет ARIA-атрибутов сам** — он не знает, что за контент
оборачивает и какой элемент им управляет. Связывание с триггером —
ответственность потребителя:

- `aria-expanded` ставится на кнопку-триггер, не на блок анимации.
- `aria-controls` на триггере указывает на `id` блока анимации; сам `id`
  передаётся в `ExpandAnimation` через `...rest`.
- `role="region"` и `aria-labelledby` при необходимости тоже передаются через
  `...rest` (так делает `IslandAccordion`).

Что компонент обеспечивает сам: в свёрнутом состоянии (`exited`) корневой блок
получает `visibility: hidden`, поэтому скрытое содержимое не фокусируется по
Tab и не читается скринридером. Во время анимации сворачивания
(`exiting`) `visibility` ещё не выставлен — содержимое кратковременно доступно,
это осознанный компромисс ради видимого перехода.

Клавиатурных обработчиков у компонента нет.

---

## Связанные компоненты

- `AccordionBase` (`src/components/AccordionBase`) — слой выше: хранит
  состояние раскрытия (controlled / uncontrolled), генерирует id и
  ARIA-атрибуты для связки header ↔ body, рендерит `ExpandAnimation` внутри.
  Если нужен аккордеон, а не просто анимация высоты — начинай с него.
- Потребители внутри библиотеки, чьё поведение зависит от этого компонента:
  `IslandAccordion` (передаёт `transitionProps`, `role="region"`, `id`),
  `IslandWidget` и `IslandWidgetExtraFooter`, `CollapsibleTreeExtended`
  (через `AccordionBase`), `Table/TableBasicSettings`. Правки в фазах анимации
  и в `onStart` / `onEnd` нужно сверять с ними.

---

## Stories

Основные истории: `stories/ExpandAnimation/ExpandAnimation.stories.tsx`
Файлы примеров: `stories/ExpandAnimation/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `expanded` и `animationTime` |
| `Default` | `Default.tsx` | Управляемое раскрытие кнопкой со связкой `aria-expanded` / `aria-controls` |
| `Animation time` | `AnimationTime.tsx` | Длительности 100 / 300 / 1000 мс |
| `Callbacks` | `Callbacks.tsx` | `onStart` / `onEnd` как индикатор идущей анимации |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-21 | Создан документ. Зафиксированы: карта стилей по фазам анимации, требование хранить её в ref, порядок применения `transitionProps`, контракт `visibility: hidden` в `exited`, отсутствие собственных ARIA-атрибутов и токенов |
