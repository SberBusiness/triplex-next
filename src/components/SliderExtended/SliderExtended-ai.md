---
component: SliderExtended
category: Slider
related: [Slider, SliderRange, KeyDownListener, Text]
tokens:
    - --triplex-next-Slider-Rail_Background
    - --triplex-next-Slider-Rail_Background_Disabled
    - --triplex-next-Slider-Track_Background_Default
    - --triplex-next-Slider-Track_Background_Hover
    - --triplex-next-Slider-Track_Background_Disabled
    - --triplex-next-Slider-Dot_Background_Default
    - --triplex-next-Slider-Dot_Background_Hover
    - --triplex-next-Slider-Dot_Background_Select
    - --triplex-next-Slider-Dot_Background_Disabled
    - --triplex-next-Slider-Dot_Inner_Background
    - --triplex-next-Slider-Dot_Inner_Background_Disabled
    - --triplex-next-Slider-Dot_Focus
    - --triplex-next-Slider-Mark_Dot_Background_Default
    - --triplex-next-Slider-Mark_Dot_Background_Selected
    - --triplex-next-Slider-Mark_Dot_Background_Selected_Disabled
    - --triplex-next-Slider-Tooltip_Background
    - --triplex-next-Slider-Tooltip_Color
stories: stories/Slider/SliderExtended.stories.tsx
version: "1.0"
---

# SliderExtended

## Назначение

Составной слайдер: потребитель сам собирает разметку из полосы, ползунков, трека, меток и
подсказок и владеет значениями ползунков. Компонент отвечает за расчёт шагов, позиции
элементов, клавиатуру и синхронизацию частей между собой через контекст.

Используй когда: нужен слайдер, которого нет среди готовых сборок — например с
нестандартным составом частей (без меток, без трека, с собственным содержимым ползунка) или
с подсказкой, которую нужно собрать самому.

Не используй когда:

- Нужен обычный слайдер с одним ползунком — возьми `Slider`: это тот же
  `SliderExtended`, уже собранный, с `marks` массивом и `renderTooltipContent`.
- Нужен выбор диапазона двумя ползунками — возьми `SliderRange`: он дополнительно следит
  за порядком значений и отдаёт их отсортированной парой.
- Нужно ввести точное число — слайдер не заменяет `NumberField` / `AmountField`; при
  крупных диапазонах их обычно ставят рядом.
- Нужна вертикальная ориентация или больше двух ползунков — не поддерживаются.

---

## Состав

| Субкомпонент | Элемент | Роль |
|---|---|---|
| `SliderExtended` | `div` | Контейнер и провайдер контекста. Задаёт диапазон, шаг, размер и `disabled` |
| `SliderExtended.Rail` | `div` | Полоса. Клик перемещает ближайший ползунок на ближайший шаг |
| `SliderExtended.Track` | `span` | Заполненная часть полосы. При двух ползунках перетаскивается целиком |
| `SliderExtended.Dot` | `span` | Ползунок. Контролируемый: `value` + `onChange` |
| `SliderExtended.Marks` | `div` | Контейнер меток под полосой |
| `SliderExtended.Mark` | `span` | Метка. Клик перемещает ближайший ползунок на её значение |
| `SliderExtended.Tooltip` | `div` | Подсказка над ползунком, рендерится внутри `SliderExtended.Dot` |

Порядок в разметке: `Rail` → `Dot` → `Track` → (второй `Dot`) → `Marks`. Части находят друг
друга через контекст, а не по вложенности, поэтому `Track` и `Marks` не обязаны быть
соседями `Dot` — но `Tooltip` обязан лежать внутри `Dot`, иначе он не будет показываться и
позиционироваться.

---

## Варианты и props

### SliderExtended — обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `min` | `number` | Минимальное значение диапазона |
| `max` | `number` | Максимальное значение диапазона |
| `step` | `number \| number[]` | Длина шага либо массив значений шагов. В массиве первое значение равно `min`, последнее — `max` |
| `size` | `EComponentSize.MD \| EComponentSize.LG` | Размер. `SM` не поддерживается |

### SliderExtended — опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Слайдер не активен: части не реагируют на курсор и выпадают из табуляции |
| `reverse` | `boolean` | `false` | Значения возрастают справа налево |

`children` и остальные атрибуты `React.HTMLAttributes<HTMLDivElement>` уходят на корневой
элемент.

### Субкомпоненты

| Субкомпонент | Свои props |
|---|---|
| `SliderExtended.Dot` | `value: number` (обязателен), `onChange: (value: number) => void` (обязателен) |
| `SliderExtended.Mark` | `value: number` (обязателен) — значение, на котором стоит метка |
| `SliderExtended.Track` | `draggable?: boolean` (по умолчанию `true`) — разрешает перетаскивание трека; работает только при двух ползунках |
| `SliderExtended.Tooltip` | `value?: number` — значение ползунка; нужно только для сдвига подсказки у краёв полосы |
| `SliderExtended.Rail`, `SliderExtended.Marks` | своих props нет |

`Rail` и `Track` не принимают `children` (`children?: never`).

### Особенности поведения

- **Значения контролируемые.** `SliderExtended.Dot` не хранит значение: он рисует позицию
  по `value` и сообщает новое значение через `onChange`. Без обновления `value` снаружи
  ползунок не двигается.
- **`step` числом строит шаги как `[...range(min, max, step), max]`.** Последний шаг всегда
  равен `max`, даже если он не кратен шагу: при `min: 0, max: 10, step: 3` шаги равны
  `0, 3, 6, 9, 10`.
- **`step` массивом задаёт произвольную шкалу.** Шаги равны визуально, а не по значению —
  так делается шкала сумм с укрупняющимся шагом. Массив, собранный инлайн в JSX,
  пересчитывает шаги на каждом рендере потребителя; вынеси его в константу, если это важно.
- **Пустой массив шагов (`step: []`) не рендерит ничего** — компонент возвращает `null`.
- **Значение вне диапазона не отбрасывается, а зажимается** при расчёте позиции: ползунок
  встаёт на край. В `onChange` при этом уходят значения только из массива шагов.
- **Два ползунка не ограничивают друг друга.** Их значения могут пересечься, и «левый» и
  «правый» определяются по текущим значениям, а не по порядку в разметке. Следить за
  порядком — задача потребителя (`SliderRange` это делает).
- **Клик по полосе и по метке двигает ближайший ползунок**, а не тот, что был в фокусе.
  При равном удалении выбирается первый по порядку регистрации.
- **Перетаскивание трека сдвигает оба ползунка**, сохраняя расстояние между ними, и
  останавливается у краёв полосы.
- **`Tooltip` виден только при `:hover` и `:focus` ползунка** — управляется стилями, не
  props. Постоянно видимой подсказки у компонента нет.
- **Ширину и внешние отступы задаёт потребитель.** Своей ширины у слайдера нет; собственные
  вертикальные отступы (`padding-top` под ползунок и `padding-bottom` под метки) он
  добавляет сам.

---

## Дизайн-токены

```
--triplex-next-Slider-Rail_Background
--triplex-next-Slider-Rail_Background_Disabled
--triplex-next-Slider-Track_Background_Default
--triplex-next-Slider-Track_Background_Hover
--triplex-next-Slider-Track_Background_Disabled
--triplex-next-Slider-Dot_Background_Default
--triplex-next-Slider-Dot_Background_Hover
--triplex-next-Slider-Dot_Background_Select
--triplex-next-Slider-Dot_Background_Disabled
--triplex-next-Slider-Dot_Inner_Background
--triplex-next-Slider-Dot_Inner_Background_Disabled
--triplex-next-Slider-Dot_Focus
--triplex-next-Slider-Mark_Dot_Background_Default
--triplex-next-Slider-Mark_Dot_Background_Selected
--triplex-next-Slider-Mark_Dot_Background_Selected_Disabled
--triplex-next-Slider-Tooltip_Background
--triplex-next-Slider-Tooltip_Color
```

Токены общие для всего семейства слайдеров и названы с префиксом `Slider-`, а не
`SliderExtended-`: `Slider` и `SliderRange` — это тот же `SliderExtended` внутри.
Размеры (высота полосы, диаметры ползунка и точек меток) заданы литералами в
`.module.less`, z-index'ы — LESS-переменными `@slider-dot-z-index` и
`@slider-track-z-index` из `src/helpers/less/z-indexes.less`.

---

## Инварианты

- **Мутация объектов в массиве `dots` — намеренная.** `updateDot` меняет объект точки на
  месте и возвращает новый массив. Обработчики перетаскивания подписываются на `document` в
  момент нажатия и до конца перетаскивания видят массив `dots` того рендера — замена
  объектов на новые оставила бы их с устаревшими `stepIndex` и `value`, и трек перестал бы
  двигаться дальше первого шага. Не переводить на иммутабельное обновление, не разобравшись
  с подпиской слушателей.
- **`forwardRef` есть у всех семи публичных компонентов** и указывает на их собственный
  корневой элемент (`SliderExtended.Tooltip` — на обёртку-оверлей, а не на тело подсказки).
  Не убирать.
- **`SliderExtended.Rail` обязателен для расчётов от курсора.** Позиции клика и
  перетаскивания считаются от DOM-узла полосы, который попадает в контекст через
  callback-ref `Rail`. Без `Rail` мышь и касание не работают, остаётся только клавиатура.
- **`SliderExtended.Track` не рендерится, пока не зарегистрирован хотя бы один ползунок**, —
  на первом кадре его в DOM нет.
- **Сдвиг `SliderExtended.Tooltip` отстаёт на один рендер.** Ширина тела подсказки
  (`clientWidth`) читается во время рендера, то есть берётся из уже закоммиченного DOM.
  Когда меняется ширина содержимого (например `value` идёт с `5` на `100000`), рендер с
  новым текстом считает сдвиг по прежней ширине, а следующего рендера не будет — узел тот
  же, состояние не менялось. У краёв полосы подсказку из-за этого может подрезать.
  Расчёт вынесен в чистую функцию, но входные данные приходят из прошлого кадра; чтобы
  убрать отставание, нужен `ResizeObserver` на теле подсказки или запись сдвига в
  runtime-CSS-переменную из layout-эффекта.
- **`disabled` и `draggable={false}` не отключают клавиатуру у `SliderExtended.Track`.**
  Слушатели стрелок монтируются по одному `isFocused`, поэтому программно сфокусированный
  (`.focus()` из кода потребителя) трек двигает оба ползунка даже там, где он выпал из
  табуляции и не реагирует на мышь. Через UI недостижимо: `.staticSlider` и `.disabled`
  дают `pointer-events: none`, а из табуляции такой трек исключён.
- **Порядок tabIndex у слайдера с двумя ползунками (0 / -1 → 1, 2, 3) — часть
  accessibility-контракта**, см. раздел Accessibility. Менять только вместе с ним.
- **Собственные props субкомпонентов (`value`, `onChange`, `draggable`) и состав статических
  свойств** (`Dot`, `Mark`, `Marks`, `Rail`, `Track`, `Tooltip`) — публичный API.
  `ISliderProps` и `ISliderRangeProps` наследуются от `ISliderExtendedProps`, поэтому
  переименование props ломает и `Slider`, и `SliderRange`.
- **Имена LESS-классов не годятся для внешних селекторов**: `generateScopedName` хеширует
  их по имени папки компонента, имени класса и версии библиотеки — при каждом релизе хеш
  меняется. Опираться на них можно только внутри репозитория (unit- и visual-тесты).
  Класс `.sliderExtendedTooltipOverlay` при этом упомянут в модуле `SliderExtendedDot` —
  так подсказка показывается по `:hover`/`:focus` ползунка; это работает, потому что оба
  модуля лежат в папке `SliderExtended` и получают одинаковый хеш.
- Реализация остаётся React 17-совместимой (без `useId`, `useSyncExternalStore` и прочих
  React 18-only API): код синхронизируется в `release-0`.

---

## Accessibility

- **`SliderExtended.Dot` — `role="slider"`** с `aria-valuemin`, `aria-valuenow`,
  `aria-valuemax` из `min` / `value` / `max`. Текстовую подпись (`aria-label` или
  `aria-labelledby`) обязан передать потребитель: библиотека мультиязычная и не хардкодит
  текст. `aria-valuetext` для нелинейных шкал (суммы, диапазоны с единицами) тоже задаёт
  потребитель.
- **`SliderExtended.Track` — `role="button"`**, потому что его можно перетаскивать
  клавиатурой. При одном ползунке или `draggable={false}` он выпадает из табуляции.
- **Клавиатура:** `ArrowLeft` / `ArrowDown` — шаг назад, `ArrowRight` / `ArrowUp` — шаг
  вперёд; для трека — шаг обоими ползунками. Обработчики вызывают `preventDefault`, чтобы
  страница не скроллилась. `Home` / `End` / `PageUp` / `PageDown` не поддерживаются.
  Слушатели вешаются на `window` и живут только пока элемент в фокусе.
- **Порядок табуляции у диапазона динамический.** Пока слайдер не в фокусе, в табуляцию
  попадает только ползунок с меньшим `value` (`tabIndex` 0), второй исключён (`-1`). Как
  только фокус попал внутрь, элементы получают `tabIndex` 1 (левый ползунок), 2 (трек),
  3 (правый ползунок) — так `Tab` идёт по слайдеру слева направо, а не выбрасывает фокус
  наружу. Побочный эффект положительных `tabIndex` — эти элементы встают в начало общего
  порядка табуляции страницы, пока слайдер в фокусе.
- **Метки кликабельны, но не фокусируются** и не читаются как элементы управления: это
  ускоритель для мыши, дублирующий клавиатурное перемещение по шагам.
- **Подсказка не связана с ползунком через `aria`.** Она показывается по `:hover`/`:focus`
  и для скринридера бесполезна — значение должно быть доступно через `aria-valuenow` или
  `aria-valuetext`.
- **`disabled` только визуальный и мышиный.** Части получают `pointer-events: none` и
  `tabIndex -1`, но нативного `disabled` у `span` нет: программно установленный фокус
  оставляет клавиатурное перемещение работающим. Не полагайся на `disabled` как на
  единственную защиту от изменения значения — источником правды остаётся `value`
  потребителя.

---

## Связанные компоненты

- `Slider` (`src/components/Slider/`) — готовая сборка с одним ползунком: принимает
  `marks` массивом и `renderTooltipContent`, внутри рендерит тот же `SliderExtended`.
  Начинай с него; `SliderExtended` нужен, когда состава `Slider` не хватает.
- `SliderRange` (`src/components/SliderRange/`) — готовая сборка на два ползунка:
  хранит внутренний порядок значений, отдаёт их отсортированной парой в `onChange` и
  прокидывает `draggableTrack` в `SliderExtended.Track`.
- `KeyDownListener` (`src/components/KeyDownListener/`) — `SliderExtended.Dot` и
  `SliderExtended.Track` монтируют по два таких слушателя, пока элемент в фокусе; именно
  через него работают стрелки.
- `Text` (`src/components/Typography/Text.tsx`) — подпись метки; размер выбирается по
  размеру слайдера (`B3` для `LG`, `B4` для `MD`).

---

## Stories

Основные истории: `stories/Slider/SliderExtended.stories.tsx`
Файлы примеров: `stories/Slider/examples/SliderExtended/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный подбор `min`, `max`, `step`, `size`, `disabled`, `reverse` |
| `Default` | `Default.tsx` | Один ползунок, метки и подсказка над ползунком |
| `Sizes` | `Sizes.tsx` | Размеры MD и LG |
| `Range` | `Range.tsx` | Два ползунка задают диапазон, трек между ними перетаскивается |
| `RangeWithTooltip` | `RangeWithTooltip.tsx` | Диапазон с подсказкой над каждым ползунком |
| `WithCustomSteps` | `WithCustomSteps.tsx` | Шаги заданы массивом значений |
| `WithoutTooltip` | `WithoutTooltip.tsx` | Ползунок без содержимого |
| `Disabled` | `Disabled.tsx` | Неактивный слайдер |
| `Reverse` | `Reverse.tsx` | Значения возрастают справа налево |
| `Amounts` | `Amounts.tsx` | Production-like шкала сумм с неравномерным шагом: слайдер работает с индексами шкалы |
| `VisualTests` | `VisualTests.tsx` | Размеры, диапазон, реверс и неактивное состояние; `play` ставит фокус на первый ползунок, чтобы попали в кадр обводка фокуса и подсказка |

`Playground` исключён из скриншот-тестов. `RangeWithTooltip` и `WithoutTooltip` тоже
исключены: подсказка скрыта, пока ползунок не в фокусе, поэтому их кадры повторяют `Range`
и `Default`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-17 | Создан документ. AI-рефакторинг (TRI-78): все семь публичных компонентов переведены с `React.FC` на `forwardRef`; шаги считаются в `useMemo` (раньше — состоянием в layout-эффекте, из-за чего первый кадр был пустым); производные состояния (позиция ползунка, `tabIndex` ползунка и трека, перетаскиваемость трека) считаются при рендере, а не через `setState` в эффектах; троттлинг перемещения перенесён внутрь `SliderExtendedMoveHandler`; `className` больше не затирает собственные классы корня и подсказки, `style` субкомпонентов больше не отбрасывается; расчёт сдвига подсказки вынесен в чистую функцию (отставание измерения на один рендер осталось — см. «Инварианты»); `tabIndex` трека теперь учитывает `disabled` и `draggable`, из-за чего неперетаскиваемый трек выпал из табуляции; импорты переведены с `lodash` на `lodash-es`; хук `useSliderExtendedDotTabIndex` заменён на `SliderExtendedDotActions.getTabIndex`. Публичный API (props, интерфейсы, barrel-экспорты, состав статических свойств) не изменён. Добавлены unit-тесты и stories в modern pattern. |
