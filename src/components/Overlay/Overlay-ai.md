---
component: Overlay
category: Overlay
related: [OverlayBase, OverlayMask, OverlayPanel, LightBox, TopOverlay, ModalWindow, DropdownMobile]
tokens: [--triplex-next-Overlay-Background, --triplex-next-Overlay-Panel_Background]
stories: stories/Overlay/Overlay.stories.tsx
version: "1.34.0"
---

# Overlay

## Назначение

Затемняющий слой с выезжающей из выбранной стороны панелью контента. Применяется
для отображения дополнительного контента поверх элемента (`absolute`, по
умолчанию) или поверх всей страницы (`fixed`). Анимация открытия/закрытия —
CSS-transition панели (`transform`) и маски (`opacity`).

Компонент построен как семейство: корневой `Overlay` (контейнер + управление
жизненным циклом через `OverlayBase`) со статическими `Overlay.Mask`
(кликабельный фон) и `Overlay.Panel` (выезжающая панель). Контент задаётся
render-функцией `children`, которая получает состояние оверлея.

Используй когда: нужна выезжающая боковая/верхняя/нижняя панель (drawer,
off-canvas) над контейнером или страницей.
Не используй когда: нужно модальное окно по центру — используй `ModalWindow`;
нужен полноэкранный слой просмотра — `LightBox`.

---

## Варианты и props

### `Overlay` — обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `direction` | `EOverlayDirection` | Сторона, из которой выезжает панель: `RIGHT` / `LEFT` / `TOP` / `BOTTOM`. По умолчанию в `OverlayBase` — `RIGHT` |
| `opened` | `boolean` | Управляемое состояние открытости. Изменение запускает анимацию открытия/закрытия |
| `setOpened` | `(opened: boolean) => void` | Сеттер `opened`, прокидывается в `provideProps` для управления изнутри панели |
| `children` | `(provideProps) => React.ReactElement` | Render-функция контента. См. «provideProps» ниже |

### `Overlay` — опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `fixed` | `boolean` | `false` | `position: fixed` (на всю страницу) вместо `absolute` (поверх родителя) |
| `onOpening` | `() => void` | — | Вызывается в начале открытия |
| `onOpen` | `() => void` | — | Вызывается по завершении анимации открытия |
| `onClosing` | `() => void` | — | Вызывается в начале закрытия |
| `onClose` | `() => void` | — | Вызывается по завершении анимации закрытия |
| `...HTMLDivAttributes` | — | — | Стандартные атрибуты корневого `<div>` (кроме `children`) |

### provideProps (аргумент render-функции `children`)

Передаются из `OverlayBase` в `children` и далее пробрасываются в `Overlay.Panel`
через `{...provideProps}`:

| Поле | Тип | Описание |
|---|---|---|
| `direction` | `EOverlayDirection` | Текущее направление |
| `opened` | `boolean` | Текущее состояние открытости |
| `opening` | `boolean` | Идёт анимация открытия |
| `closing` | `boolean` | Идёт анимация закрытия |
| `setOpened` | `(boolean) => void` | Сеттер `opened` |
| `setOpening` | `(boolean) => void` | Сеттер флага `opening` |
| `setClosing` | `(boolean) => void` | Сеттер флага `closing` |

### `Overlay.Mask` (`OverlayMask`)

Кликабельный полупрозрачный фон между контейнером и панелью. Props: `opened`
(управляет классом `overlayOpened` → `opacity`), плюс `...HTMLDivAttributes`
(обычно `onClick` для закрытия). `forwardRef` → `HTMLDivElement`.

### `Overlay.Panel` (`OverlayPanel`)

Выезжающая панель с контентом. Принимает весь `provideProps` (через спред) плюс
`direction`, `children` и `...HTMLDivAttributes`. По `onTransitionEnd` своего
корневого элемента сбрасывает `closing`/`opening` (отсекая bubbling от потомков
через сравнение `target === currentTarget`). `forwardRef` → `HTMLDivElement`.

### `OverlayBase`

Низкоуровневый headless-компонент (render-prop, **без** `forwardRef` — ничего не
рендерит сам, возвращает `children(provideProps)`). Единый источник истины по
флагам `opened`/`opening`/`closing` и оркестратор колбэков жизненного цикла.
Использует `useLayoutEffect` (не `useEffect`) при смене `opened`, чтобы избежать
мерцания при закрытии.

---

## Дизайн-токены

```
--triplex-next-Overlay-Background        // фон маски (OverlayMask)
--triplex-next-Overlay-Panel_Background  // фон панели (OverlayPanel)
```

Box-shadow панели и тайминги transition (`0.3s ease-in-out`) заданы константами в
`styles/Overlay.module.less` — токенов не имеют.

---

## Инварианты

- **`forwardRef`** обязателен на `Overlay` (target — корневой `HTMLDivElement`),
  `Overlay.Mask` и `Overlay.Panel`. Не убирать. `OverlayBase` — render-prop,
  `forwardRef` к нему неприменим.
- **Статические `Overlay.Mask` / `Overlay.Panel`** — часть публичного API
  (составной компонент). Навешиваются на `forwardRef`-объект через `Object.assign`
  (как `Badge.Dot`), тип компонента выводится автоматически — отдельный `*FC`-тип
  не нужен.
- **Значения `EOverlayDirection`** (`"right"`/`"left"`/`"top"`/`"bottom"`) —
  публичный API, не переименовывать.
- **Единый источник истины по `closing`/`opening`/`opened`** — `OverlayBase`.
  Корневой `div` `Overlay` рендерится внутри render-prop и читает `closing` из
  `provideProps` — не дублировать локальным `useState` в `Overlay`.
- **`provideProps` нужно пробрасывать в `Overlay.Panel`** — без них панель не
  получит direction/флаги и не сбросит `closing`/`opening` по `transitionEnd`.
- **CSS-классы `bottom`/`left`/`right`/`top`/`opened`/`closing`/`fixed`/
  `overlayOpened`** управляют анимацией — переименование ломает визуальные
  переходы и покрыто unit-тестами.
- **React 17-совместимость** (ветка `release-0`): без `useId` и других React
  18-only API.

### Гарантия однократного вызова lifecycle-колбэков

`OverlayBase` вызывает каждый из `onOpening` / `onClosing` / `onOpen` / `onClose`
**ровно один раз** за переход. `useLayoutEffect([opened])` только выставляет
флаги `opening` / `closing`, а сами колбэки вызываются исключительно в
`useEffect([opening])` / `useEffect([closing])`. Однократность закреплена
unit-тестами (`toHaveBeenCalledTimes(1)`).

> Ранее (до 2026-06-17) колбэки `onOpening` / `onClosing` вызывались дважды
> за переход — прямой вызов из `useLayoutEffect` дублировал эффект-driven вызов.
> Исправлено: прямые вызовы из layout-эффекта удалены.

---

## Accessibility

- `Overlay.Mask` кликабелен для закрытия — потребитель навешивает `onClick`
  (`setOpened(false)`); компонент текст/aria не хардкодит (библиотека
  мультиязычная). При необходимости потребитель сам задаёт `aria-label`.
- Скрытый оверлей выведен за пределы экрана (`left: -10000px`) и `visibility:
  hidden`, чтобы его содержимое не получало фокус, пока он закрыт.
- Роль диалога (`role="dialog"`/`aria-modal`), захват и возврат фокуса, обработка
  `Escape` — **не реализованы** в самом `Overlay`; при необходимости их
  обеспечивает потребитель или обёртка (`LightBox`, `ModalWindow`).

---

## Связанные компоненты

- `OverlayBase` — headless-ядро (render-prop), управляет флагами и колбэками
  жизненного цикла. Экспортируется из barrel, отдельного AI.md не имеет (описан
  здесь).
- `OverlayMask` (`Overlay.Mask`) — кликабельный фон.
- `OverlayPanel` (`Overlay.Panel`) — выезжающая панель.
- `LightBox`, `TopOverlay` — построены поверх механики оверлея.
- `ModalWindow` — альтернатива для центрированных модальных окон.

---

## Stories

Основные истории: `stories/Overlay/Overlay.stories.tsx`
Файлы примеров: `stories/Overlay/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `direction` / `fixed` / `opened`, маска и кнопки открытия/закрытия |
| `Default` | `Default.tsx` | Минимальный оверлей (RIGHT, не fixed) |
| `Directions` | `Directions.tsx` | Все 4 направления выезда панели |
| `Fixed` | `Fixed.tsx` | Fixed-оверлей на всю страницу |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: `play` открывает панели всех направлений |

Visual baseline для `components-overlay--visual-tests` генерируется только в CI
(Linux) через `GitHub Actions → Update Visual Snapshots`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-06-17 | Создан документ. `Overlay` переведён на `forwardRef` (ref → корневой `div`, аддитивно, release notes 1.34.0). Дедуплицирован флаг `closing` (единый источник — `OverlayBase`). Codestyle/JSDoc cleanup в 4 файлах. Добавлены 4 unit-тест-файла. Исправлен двойной вызов `onClosing`/`onOpening` за переход — теперь ровно один раз (закреплено `toHaveBeenCalledTimes(1)`). |
