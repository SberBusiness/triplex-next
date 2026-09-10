---
component: IslandWidget
category: Layout
related: [IslandAccordion, Island, ExpandAnimation, Text, Title]
tokens:
  - IslandWidget.ExtraFooter_Background
  - IslandWidget.ExtraFooter_Shadow
stories: stories/IslandWidget/IslandWidget.stories.tsx
version: "1.0"
---

# IslandWidget

## Назначение

Виджет — карточка на `Island`, собранная из шапки, тела и подвала, которые задаются
render-функциями. Отличие от голого `Island` — своя схема отступов по размеру и сворачивание
контента в адаптиве: на узком экране виден только заголовок, остальное раскрывается по клику
по шапке.

Используй когда: блок дашборда со сгруппированной информацией, набором связанных действий
или отдельной функциональностью, который на мобильном должен схлопываться в одну строку.

Не используй когда:
- Нужна просто карточка без сворачивания и без готовой схемы отступов — возьми `Island`.
- Нужен список раскрывающихся секций, где раскрытием управляет потребитель и оно работает на
  всех ширинах — возьми `IslandAccordion`. У `IslandWidget` сворачивание есть только в адаптиве
  и состоянием изнутри не управляется.
- Нужен overlay или модальное окно — возьми `ModalWindow`, `LightBox`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `renderHeader` | `(props: IIslandWidgetHeaderProps) => React.ReactNode` | Рендер-функция шапки |
| `renderBody` | `(props: IIslandWidgetBodyProps) => React.ReactNode` | Рендер-функция тела |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.MD` | Скругление карточки и отступы всех частей виджета |
| `renderFooter` | `(props: IIslandWidgetFooterProps) => React.ReactNode` | `undefined` | Рендер-функция подвала. Без неё подвал не рендерится |
| `disableAdaptiveCollapsing` | `boolean` | `false` | Отключает сворачивание контента в адаптиве — контент всегда виден, индикатор раскрытия не рисуется |

Компонент расширяет `React.HTMLAttributes<HTMLDivElement>` — стандартные атрибуты `<div>`
(`className`, `style`, `role`, `aria-*`, `data-*`, обработчики) попадают на корневой элемент.

### Render-функции, а не children

Части виджета передаются тремя render-функциями. Каждая получает объект props (сейчас пустой)
и обязана раскрыть его в соответствующую часть — так у частей остаётся канал для props,
которые виджет может начать прокидывать позже:

```tsx
<IslandWidget
    renderHeader={(props) => (
        <IslandWidget.Header {...props}>
            <IslandWidget.Header.Title>Заголовок</IslandWidget.Header.Title>
        </IslandWidget.Header>
    )}
    renderBody={(props) => <IslandWidget.Body {...props}>Контент</IslandWidget.Body>}
/>
```

`children` виджет **молча отбрасывает**: они попадают в `...rest`, но корневой `<div>` уже имеет
собственных JSX-детей (`Island`), и они перекрывают `children` из спреда. Ни ошибки, ни
предупреждения не будет — контент просто не отрисуется. Всё содержимое кладётся через
render-функции.

### Составные части

| Часть | Barrel-экспорт | Назначение |
|---|---|---|
| `IslandWidget.Header` | `IslandWidgetHeader` | Шапка. В адаптиве получает индикатор раскрытия |
| `IslandWidget.Header.Title` | — | Заголовок (`Title` H3 medium). На десктопе однострочный с многоточием, в адаптиве переносится |
| `IslandWidget.Header.Description` | `IslandWidgetHeaderDescription` | Описание (`Text`, вторичный цвет). На десктопе прижато вправо, в адаптиве уходит на свою строку |
| `IslandWidget.Header.Controls` | — | Контролы шапки. Гасит всплытие клика |
| `IslandWidget.Body` | `IslandWidgetBody` | Основное содержимое |
| `IslandWidget.Footer` | `IslandWidgetFooter` | Подвал |
| `IslandWidget.Footer.Content` | — | Левая часть подвала, занимает свободное место |
| `IslandWidget.Footer.Controls` | — | Правая часть подвала. В адаптиве переносится на новую строку и выравнивается влево |
| `IslandWidget.ExtraFooter` | — | Дополнительный подвал **под** карточкой |
| — | `IslandWidgetWrapper` | Обёртка виджета и `ExtraFooter` |
| — | `IslandWidgetHeaderContent` | Обёртка содержимого шапки. К `IslandWidget.Header` не привязана |

Отступы частей берутся из `size` виджета через внутренний контекст — отрендеренная отдельно
`IslandWidgetBody` получит только `className` без размерного класса.

### Сворачивание в адаптиве

- Адаптив определяется хуком `useMobileView()` — медиа-запрос `max-width: 767px`
  (`EScreenWidth.SM_MAX`), тот же порог, что у компонента `MobileView`.
- В адаптиве обработчик клика вешается на обёртку вокруг шапки, а тело и подвал заворачиваются
  в `ExpandAnimation`. На десктопе обработчика нет и `ExpandAnimation` не используется —
  контент рендерится напрямую.
- Начальное состояние раскрытия равно `disableAdaptiveCollapsing`: по умолчанию виджет
  смонтирован свёрнутым, а с `disableAdaptiveCollapsing={true}` — раскрытым. Значение уходит
  во внутренний контекст и доходит до разметки: `IslandWidgetHeader` вешает класс `open`
  безусловно, без оглядки на `adaptive`, поэтому при `disableAdaptiveCollapsing={true}` шапка
  получает этот класс сразу и на десктопе тоже. Видимого эффекта нет — единственное правило на
  `.open` живёт внутри `@media (max-width: @screen-sm-max)` и вращает каретку, которой в этом
  режиме не существует. При рефакторинге шапки на это рассчитывать нельзя.
- Обработчик клика по шапке навешивается по `adaptive`, а не по `expandableContent`, поэтому
  при `disableAdaptiveCollapsing={true}` в адаптиве тап по шапке всё равно дёргает `setOpen`
  и переключает класс `open`. Наблюдаемого эффекта это не даёт (см. выше); сузить условие —
  отдельная задача, здесь поведение сохранено как есть.
- `disableAdaptiveCollapsing` читается только как начальное значение `useState`, поэтому смена
  этого prop'а после монтирования не пересчитывает уже накопленное состояние раскрытия —
  она лишь выключает или включает саму обёртку `ExpandAnimation`.
- Состояние раскрытия внутреннее: props, чтобы прочитать или задать его снаружи, нет.
- `IslandWidget.Header.Controls` вызывает `stopPropagation` на клике, поэтому взаимодействие с
  кнопками и полями в шапке не сворачивает виджет. Любой другой интерактивный элемент,
  положенный в шапку мимо `Controls`, будет сворачивать виджет по клику.

### ExtraFooter

`ExtraFooter` — не часть карточки: он рендерится **соседом** виджета, а не внутри него.
Оба должны лежать в общем `IslandWidgetWrapper` — через его контекст `ExtraFooter` сообщает
виджету, что раскрыт, и виджет рисует под собой тень (`::after` с
`IslandWidget.ExtraFooter_Shadow`).

```tsx
<IslandWidgetWrapper>
    <IslandWidget renderHeader={renderHeader} renderBody={renderBody} />
    <IslandWidget.ExtraFooter open={open}>Дополнительный контент</IslandWidget.ExtraFooter>
</IslandWidgetWrapper>
```

- `open` — контролируемый prop (по умолчанию `false`), раскрытием управляет потребитель.
  Раскрытие идёт через `ExpandAnimation`, как и сворачивание виджета в адаптиве.
- Без `IslandWidgetWrapper` `ExtraFooter` работает, но виджет о нём не узнает: контекст по
  умолчанию содержит no-op сеттер, тень не появится.
- `ExtraFooter` подтягивается под карточку отрицательным `margin-top: -24px` и компенсирующим
  `padding-top`, поэтому визуально выглядит продолжением карточки.
- Флаг `hasExtraFooter` сбрасывается и сменой `open` на `false`, и размонтированием
  `ExtraFooter`: эффект возвращает cleanup, поэтому условный рендеринг подвала так же
  корректен, как управление через `open` — тень на виджете не залипает.
- Если виджету нужна фиксированная высота, задавай её на `IslandWidgetWrapper`, а не на
  `IslandWidget` (story `Example: ExtraFooter with wrapper height`).

### Размеры

`size` задаёт отступы частей; скругление карточки приходит из `Island` того же размера.

| `size` | Header | Body (горизонтально) | Footer | Адаптив (`max-width: 767px`) |
|---|---|---|---|---|
| `SM` | 16px 16px 12px | 16px | 16px | Header 16px, место под индикатор справа |
| `MD` | 24px 24px 16px | 24px | 24px | Схлопывается до 16px |
| `LG` | 32px 32px 24px | 32px | 32px | Схлопывается до 24px |

`Island` рендерится с `withoutPaddings={true}` — все внутренние отступы принадлежат частям
виджета, а не карточке.

Размер описания в шапке зависит и от `size`, и от ширины экрана: на десктопе всегда `B4`,
в адаптиве — `B4` для `SM` и `B3` для `MD` и `LG`.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию —
`src/components/DesignTokens/components/IslandWidget.ts`.

```text
IslandWidget.ExtraFooter_Background
IslandWidget.ExtraFooter_Shadow
```

Оба токена относятся к дополнительному подвалу: фон самого `ExtraFooter` и тень, которую
виджет рисует над ним, когда тот раскрыт. Фон и тень самой карточки — токены `Island`
(`Island.Type1_Background`, `Island.Type1_Shadow`), виджет их не переопределяет. Скругления
и отступы токенами не описываются — они заданы литералами в `styles/*.module.less`.

---

## Инварианты

- **`forwardRef`** — обязателен у `IslandWidget` и `IslandWidgetWrapper`, `ref` идёт на корневой
  `<div>`. Части виджета (`Header`, `Body`, `Footer`, `ExtraFooter` и их подчасти) — `React.FC`
  без `ref`; добавление `forwardRef` частям расширяет API и требует отдельного решения.
- **Публичный API:** из `src/components/IslandWidget/index.ts` экспортируются `IslandWidget`,
  `IslandWidgetHeader`, `IslandWidgetHeaderContent`, `IslandWidgetHeaderDescription`,
  `IslandWidgetBody`, `IslandWidgetFooter`, `IslandWidgetWrapper` и их интерфейсы props
  (`IIslandWidgetProps`, `IIslandWidgetHeaderProps`, `IIslandWidgetBodyProps`,
  `IIslandWidgetFooterProps`, `IIslandWidgetWrapperProps`), а также типы
  `TIslandWidgetHeader` и `TIslandWidgetFooter`.
- **`IslandWidgetExtraFooter`, `IslandWidgetHeaderTitle`, `IslandWidgetHeaderControls`,
  `IslandWidgetFooterContent`, `IslandWidgetFooterControls` в barrel не экспортируются** — они
  доступны только как `IslandWidget.ExtraFooter`, `IslandWidget.Header.Title` и т.д. Это
  сознательная асимметрия: добавление их в barrel расширит публичный API.
- **`IslandWidgetContext` и `IslandWidgetLayoutContext` — внутренние**, в barrel не выходят.
  Их интерфейсы можно менять без breaking change.
- **Корневой элемент — `<div>`** у виджета, обёртки и всех частей. Смена тега ломает вёрстку
  потребителей: селекторы отступов класс-базированные, но `display` по умолчанию завязан на тег.
- **`data-tx` потребитель переопределить не может** — атрибут ставится после `...rest`, как у
  `Header` и `UnorderedListExtended`.
- **`renderHeader` / `renderBody` / `renderFooter` вызываются с пустым объектом.** Не удаляй
  параметр из сигнатуры и не заменяй render-функции на `children` — это breaking change.
- **`IslandWidgetHeaderContent` не имеет своих стилей:** на элемент попадает только `className`
  потребителя, раскладку задаёт родительская шапка. Компонент экспортируется из barrel и
  к `IslandWidget.Header` не привязан. Если понадобится собственное оформление — объявляй
  класс в `styles/IslandWidgetHeader.module.less` и подключай его явно, а не рассчитывай
  на ранее ссылавшийся здесь несуществующий `styles.islandWidgetHeaderContent`.
- **`box-shadow` тени `ExtraFooter` помечен `!important`** в `styles/IslandWidget.module.less`.
  Конкурирующего правила в библиотеке нет — вероятно, это защита от переопределения снаружи.
  Снимать помету без визуальной регрессии не стоит.

---

## Accessibility

Сворачивание в адаптиве **не озвучено и не доступно с клавиатуры**: обработчик клика висит на
обычном `<div>`-обёртке вокруг шапки, у которой нет ни `role="button"`, ни `tabIndex`, ни
`aria-expanded` / `aria-controls`. Индикатор раскрытия — декоративная иконка с
`aria-hidden="true"`. Пользователь клавиатуры и скринридера на мобильной ширине не может
раскрыть контент.

Обходные пути до исправления:
- Передать `disableAdaptiveCollapsing`, если содержимое обязано быть доступным на всех ширинах.
- Положить собственную кнопку раскрытия в `IslandWidget.Header.Controls` нельзя — состояние
  раскрытия внутреннее и снаружи не управляется.

Остальное — на потребителе:
- `IslandWidget.Header.Title` рендерит `Title` тегом по умолчанию; если карточке нужен
  семантический заголовок уровня страницы, задай тег через props `Title` или положи свой `<h*>`.
- Кнопки-иконки в `Header.Controls` требуют собственного `aria-label` — библиотека
  мультиязычная и текст не хардкодит.
- Роль и `aria-*` для карточки целиком передаются в `IslandWidget` через `...rest`.

---

## Связанные компоненты

### Альтернативы (в `related`)

- `IslandAccordion` — раскрывающиеся секции на `Island`. Путать легко: оба сворачивают контент
  внутри карточки. Разница — у аккордеона раскрытие работает на всех ширинах и им управляет
  потребитель, у виджета оно только в адаптиве и состояние внутреннее.

### Контракты по рендеру (в `related`)

- `Island` — контейнер, который виджет рендерит внутри себя с `type={EIslandType.TYPE_1}`,
  `withoutPaddings={true}` и своим `size`. Отсюда берутся фон, тень и скругление карточки.
  Части `Island` (`Island.Header` / `Body` / `Footer`) виджет **не** использует — у него свои.
- `ExpandAnimation` — анимация сворачивания. Используется дважды: для контента виджета в
  адаптиве и внутри `IslandWidget.ExtraFooter`. В свёрнутом состоянии выставляет
  `visibility: hidden`, поэтому контент не получает фокус по Tab.
- `Text` — `IslandWidget.Header.Description` рендерится через него (`EFontType.SECONDARY`,
  размер по `size` и ширине экрана).
- `Title` — `IslandWidget.Header.Title` рендерится через него (`ETitleSize.H3`,
  `EFontWeightTitle.MEDIUM`).

### Зависимости без отдельной связи (в `related` не входят)

- `MobileView` — виджет использует его хук `useMobileView()`, но сам компонент не рендерит.
  Порог адаптива у них общий, менять его нужно синхронно.

### Части виджета (своего AI.md не имеют)

Все части описаны выше в разделе «Составные части»: `IslandWidgetHeader` с
`Title` / `Description` / `Controls`, `IslandWidgetBody`, `IslandWidgetFooter` с
`Content` / `Controls`, `IslandWidgetExtraFooter`, `IslandWidgetWrapper` и
`IslandWidgetHeaderContent`. Собственных props сверх `className + ...rest` у них нет,
кроме `open` у `ExtraFooter`.

---

## Stories

Основные истории: `stories/IslandWidget/IslandWidget.stories.tsx`
Файлы примеров: `stories/IslandWidget/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контроль `disableAdaptiveCollapsing` на виджете с шапкой, телом и подвалом |
| `Default` | `DefaultExample.tsx` | Полный состав: Header с Title / Controls / Description, Body, Footer |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG: отступы частей и скругление карточки |
| `WithoutFooter` | `WithoutFooterExample.tsx` | Виджет без `renderFooter` — нижний отступ берёт на себя Body |
| `WithFooterAndExtraFooter` | `WithFooterAndExtraFooterExample.tsx` | `ExtraFooter` рядом с подвалом внутри `IslandWidgetWrapper`, тень под карточкой |
| `WithoutFooterAndWithExtraFooter` | `WithoutFooterAndWithExtraFooterExample.tsx` | `ExtraFooter` без подвала |
| `WithExtraFooterAndIslandWidgetHeight` | `WithExtraFooterAndIslandWidgetHeightExample.tsx` | Фиксированная высота задаётся на `IslandWidgetWrapper` |

Файлы примеров с постфиксом `Example` — локальный legacy-паттерн папки.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-09 | Создан документ. AI-рефакторинг: JSDoc на props, частях виджета и внутренних контекстах, unit-тесты на все части, сворачивание в адаптиве, `forwardRef`, `className` и размеры. Исправлено: `className` в `IslandWidget.Footer.Content` и `IslandWidget.Footer.Controls` больше не затирает базовый класс; `data-tx` перенесён после `...rest` и больше не переопределяется потребителем. Публичный API не изменён. |
