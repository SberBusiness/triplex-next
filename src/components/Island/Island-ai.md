---
component: Island
category: Layout
related: [IslandAccordion, IslandWidget, LoaderScreen, ModalWindow]
tokens:
  - Island.Type1_Background
  - Island.Type1_Shadow
  - Island.Type2_Background
  - Island.Type2_Shadow
  - Island.Type3_Background
  - Island.Type3_Shadow
stories: stories/Island/Island.stories.tsx
version: "1.0"
---

# Island

## Назначение

Базовый контейнер-карточка библиотеки: `<div>` с фоном, тенью, скруглением и внутренними
отступами. Собственной логики не имеет — задаёт поверхность, на которой лежит контент,
вертикальные отступы между своими частями `Island.Header`, `Island.Body`, `Island.Footer` и
состояние загрузки (`loading`), в котором поверх контента показывается `LoaderScreen`.

Используй когда: контент нужно визуально выделить карточкой на фоне страницы — блок страницы
(`BodyPage`, `HeaderPage`, `FooterPage`), диалог подтверждения (`Confirm`), элемент аккордеона
(`IslandAccordion`), виджет (`IslandWidget`).

Не используй когда:
- Нужна интерактивность (клик по карточке, раскрытие, удаление) — Island не кнопка и не
  управляет состоянием. Возьми `IslandAccordion` (раскрывающиеся элементы) или `IslandWidget`
  (виджет со сворачиванием в адаптиве), либо положи интерактивный элемент внутрь Island.
- Нужен только отступ или сетка без визуальной карточки — возьми `Gap`, `Row`/`Col`.
- Нужен overlay/модальное окно — возьми `ModalWindow`, `LightBox`, `LightBoxSideOverlay`.

---

## Варианты и props

### Обязательные props

Обязательных props нет — `<Island>` рендерится с типом `TYPE_1` и размером `MD`.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `type` | `EIslandType` | `EIslandType.TYPE_1` | Визуальный тип. Влияет только на фон и тень, на размеры — нет |
| `size` | `EComponentSize` | `EComponentSize.MD` | Скругление, внутренние отступы карточки и отступы между Header / Body / Footer |
| `loading` | `boolean` | `false` | Показывает `LoaderScreen` поверх контента карточки |
| `loaderScreenProps` | `ILoaderScreenMiddleProps` | `undefined` | Props лоадера: `description`, `controls`, `className` и остальные атрибуты `<div>`. `type` задаёт Island (`middle`) |
| `withoutPaddings` | `boolean` | `false` | Убирает внутренние отступы карточки. Скругление и отступы между Header / Body / Footer от `size` сохраняются |

Компонент расширяет `React.HTMLAttributes<HTMLDivElement>` — все стандартные атрибуты `<div>`
(`className`, `style`, `role`, `aria-*`, `data-*`, обработчики событий) попадают на корневой элемент.

### Состояние загрузки

При `loading` последним потомком карточки рендерится `<LoaderScreen type="middle">` — абсолютно
спозиционированный по всей карточке (`inset: 0` от padding-box, то есть включая внутренние отступы)
блок с полупрозрачной подложкой и спиннером по центру.

- **Контент остаётся в DOM** — он не размонтируется, только перекрывается подложкой. Форма под
  лоадером остаётся заполненной и фокусируемой: лоадер не блокирует клавиатуру и не ставит
  `inert`/`aria-hidden`. Если ввод нужно запретить, потребитель сам дизейблит контролы.
- **Скругление подложки — `border-radius: inherit`**, поэтому лоадер повторяет скругление карточки
  при любом `size` и в адаптиве. Дублировать значения по размерам не нужно.
- **`z-index` лоадера внутри Island — `@z-index-step` (100), а не `@z-index-loader-screen` (10100)**
  из его собственных стилей: правило `.island .islandLoaderScreen` перебивает базовое по
  специфичности. Подложка перекрывает контент карточки, но не глобальные оверлеи (`Dropdown`,
  `ModalWindow`, `Tooltip`), лежащие над ней. Тот же приём — у `List` и `TableBasic`.
- **Лоадер идёт после `Island.Footer`**, поэтому селекторы отступов между частями
  (`.islandBody + .islandFooter` и т.п.) он не ломает.
- **Карточка не должна скроллиться.** Лоадер позиционируется абсолютно и растягивается по padding-box
  карточки. Если потребитель задал Island `overflow: auto`/`scroll`, подложка окажется в
  scrollable-overflow: она перекроет только область, видимую в начале прокрутки, и уедет вверх
  вместе с контентом. Для скроллируемой области состояние загрузки вешают на нескроллируемого
  родителя.
- **В `ModalWindowBody` этих props нет** — `IModalWindowBodyProps` объявлен как
  `Omit<IIslandProps, "loading" | "loaderScreenProps">` ровно по причине выше: тело модалки
  скроллируется (`overflow: auto`). Состояние загрузки модального окна задаётся одноимёнными props
  `ModalWindowContent` — он не скроллится и перекрывает окно целиком.

### Размеры

| `size` | `border-radius` | `padding` | Отступ между частями | Адаптив (`max-width: @screen-sm-max`) |
|---|---|---|---|---|
| `SM` | 16px | 16px | 8px | без изменений |
| `MD` | 24px | 24px | 12px | схлопывается до 16px / 16px |
| `LG` | 32px | 32px | 16px | схлопывается до 24px / 24px |

Отступ между частями схлопыванию в адаптиве не подвергается — меняются только скругление и padding.

### Составные части

`Island.Header`, `Island.Body`, `Island.Footer` (они же `IslandHeader`, `IslandBody`,
`IslandFooter` из barrel) — тривиальные `<div>`-обёртки: `className + ...rest + forwardRef`,
собственных props нет. Их единственная задача — нести класс, по которому Island расставляет
вертикальные отступы. Использовать их все необязательно: у карточки может быть только Body.

### Ограничения

- **Части должны идти соседними элементами в порядке Header → Body → Footer.**
  Отступы задаются смежными селекторами (`.islandHeader + .islandBody`,
  `.islandHeader + .islandFooter`, `.islandBody + .islandFooter`) внутри классов размера.
  Обёртка вокруг части, чужой элемент между частями или другой порядок ломают отступы.
  Пример из библиотеки: `IslandAccordion` оборачивает `Island.Body` и `Island.Footer` в
  `ExpandAnimation`, поэтому `.islandHeader + .islandBody` там не срабатывает и отступ между
  шапкой и телом задаётся собственными паддингами аккордеона; тело и подвал при этом остаются
  соседями внутри одной обёртки, так что `.islandBody + .islandFooter` сработал бы — аккордеон
  гасит его явно (`margin-top: 0 !important` у `.footer` в `IslandAccordion.module.less`),
  потому что владеет своей схемой отступов.
- **Отступы даёт только родительский Island.** Отрендеренный отдельно `IslandBody` — просто `<div>`.
- **`className`, переданный в часть, дополняет базовый класс, а не заменяет его** (с 1.41.0).
  Часть остаётся под селекторами отступов Island и сохраняет `position: relative` из своего
  LESS-модуля. Потребителю, которому нужна собственная вёрстка внутри карточки, придётся гасить
  `margin-top` с достаточной специфичностью: правило Island — четыре класса
  (`.island.md .islandBody + .islandFooter`), поэтому в самой библиотеке для этого используется
  `!important` (см. `IslandAccordion.module.less`), а не цепочка селекторов.
- **Вложенный Island:** правила отступов написаны через потомка (`.island.md .islandHeader + .islandBody`),
  поэтому части вложенной карточки попадают и под селекторы внешней. Специфичность у правил всех
  размеров одинаковая, так что при разных `size` побеждает правило, которое ниже в
  `Island.module.less` (порядок в файле — `sm` → `md` → `lg`), а не ближайший родитель.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Island.ts`.

```text
Island.Type1_Background
Island.Type1_Shadow
Island.Type2_Background
Island.Type2_Shadow
Island.Type3_Background
Island.Type3_Shadow
```

Значения задаются в `src/components/DesignTokens/components/Island.ts`. `Type1_Shadow` и
`Type3_Shadow` — `none`, `Type2_Shadow` — внутренняя рамка `0 0 0 1px … inset`. Скругления и
отступы токенами не описываются, они заданы литералами в `styles/Island.module.less`.

---

## Инварианты

- **`forwardRef`** — обязателен у `Island` и всех трёх частей, `ref` идёт на корневой `<div>`.
- **Корневой элемент — `<div>`** у Island и у каждой части. Смена тега меняет дефолтный
  `display` и семантику, то есть ломает вёрстку потребителей (селекторы отступов
  класс-базированные и тег не проверяют).
- **Имена CSS-классов `islandHeader` / `islandBody` / `islandFooter` совпадают в четырёх
  LESS-модулях намеренно.** `scripts/generate-scoped-name.ts` хеширует класс по
  `имя папки компонента + имя класса + версия библиотеки`, поэтому `.islandHeader` в
  `styles/Island.module.less` и в `styles/IslandHeader.module.less` дают один и тот же хеш —
  на этом и держатся селекторы отступов. Следствия:
  - файлы частей и их стили нельзя выносить из `src/components/Island/`;
  - переименовывать класс можно только одновременно во всех модулях, где он встречается.
- **У классов `.islandHeader` / `.islandBody` / `.islandFooter` должно оставаться хотя бы одно
  CSS-свойство** (сейчас `position: relative` / `display: block`), иначе класс не попадёт в сборку
  и отступы перестанут работать. В LESS-файлах об этом есть комментарии — не удаляй.
- **Публичный API:** `Island`, `IslandHeader`, `IslandBody`, `IslandFooter`, `EIslandType`,
  `IIslandProps`, `IIslandHeaderProps`, `IIslandBodyProps`, `IIslandFooterProps` экспортируются из
  `src/components/Island/index.ts`. Значения `EIslandType` — строки `type_1` / `type_2` / `type_3`.
- **Части типизированы через `React.HTMLProps<HTMLDivElement>`** (не `HTMLAttributes`). Сужение
  типа — breaking change для потребителей.
- **`mapTypeToClassName` (`utils.ts`) — внутренняя утилита**, в barrel не экспортируется.

---

## Accessibility

Island — неинтерактивный контейнер: не выставляет роль, не управляет фокусом и не обрабатывает
клавиатуру. Всё это задаёт потребитель через spread — например, `Confirm` передаёт
`role="dialog"` и `aria-modal="true"`, `IslandAccordion` кладёт внутрь `Island.Header` собственную
`<button>` с `aria-expanded` / `aria-controls`.

Состояние `loading` тоже не объявляется автоматически: `LoaderScreen` приносит внутрь только
`role="status"` от `LoaderMiddle`. Если загрузку карточки должен озвучивать скринридер, потребитель
передаёт `aria-busy="true"` в `Island` — как и у `Button` с prop `loading`.

Важно: `Island.Header` — это `<div>`, а не заголовок. Если нужен семантический заголовок карточки,
положи внутрь `Title` с нужным тегом или собственный `<h*>`. Текстовые строки компонент не
хардкодит (библиотека мультиязычная).

---

## Связанные компоненты

### Альтернативы (в `related`)

- `IslandAccordion` — раскрывающиеся элементы. Строит на Island; `IslandAccordionFooter`
  оборачивает `Island.Footer` и передаёт в него свой `className`. Опирается на хрупкую деталь:
  гасит отступ Island через `margin-top: 0 !important`, поэтому правка селекторов отступов ломает
  его молча.
- `IslandWidget` — виджет со сворачиванием в адаптиве; использует Island как контейнер, но своими
  Header / Body / Footer, а не частями Island.

### Контракты (в `related`)

- `LoaderScreen` — экран загрузки, который Island рендерит при `loading` (всегда `type="middle"`).
  Настраивается через `loaderScreenProps` (`ILoaderScreenMiddleProps`).
- `ModalWindow` — `IModalWindowBodyProps` наследует `IIslandProps` через
  `Omit<IIslandProps, "loading" | "loaderScreenProps">`, поэтому `type` и `size` в
  `ModalWindowBody` доступны, а состояние загрузки — нет: тело модалки скроллируется, лоадер
  задаётся на `ModalWindowContent`. Своего AI.md у `ModalWindowBody` нет — он описан в
  `ModalWindow-ai.md`. Он же — направление из «Не используй когда», если нужен overlay, а не
  карточка в потоке.

### Другие направления из «Не используй когда» (в `related` не входят)

Отводы в другой класс задач — промах такого масштаба виден из «Назначения», ссылка не нужна.

- `LightBox`, `LightBoxSideOverlay` — если нужен overlay, а не карточка в потоке. У
  `LightBoxSideOverlay` своего AI.md нет, смотри `LightBox`.
- `Gap`, `Row`, `Col` — если нужен только отступ или сетка без визуальной карточки.

### Части Island (своего AI.md не имеют)

- `IslandHeader` (`components/IslandHeader.tsx`, он же `Island.Header`) — шапка карточки.
  Тривиальная `<div>`-обёртка без собственных props.
- `IslandBody` (`components/IslandBody.tsx`, он же `Island.Body`) — основное содержимое.
  Тривиальная `<div>`-обёртка без собственных props.
- `IslandFooter` (`components/IslandFooter.tsx`, он же `Island.Footer`) — подвал карточки.
  Тривиальная `<div>`-обёртка без собственных props.

### Потребители (в `related` не входят — ссылка стоит с их стороны)

- `BodyPage`, `HeaderPage`, `FooterPage` — оборачивают контент страницы в Island с `TYPE_1`, если
  их тип `FIRST`.
- `Confirm` — диалог подтверждения на Island `TYPE_1` с `Island.Body` внутри. Наследует интерфейс:
  `IConfirmProps extends IIslandProps` (`Confirm/Confirm.tsx:11`), поэтому добавление prop в Island
  меняет публичный API `Confirm` без правок в его коде.

---

## Stories

Основные истории: `stories/Island/Island.stories.tsx`
Файлы примеров: `stories/Island/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контроль `type`, `size`, `loading`, `withoutPaddings` и состава (Header / Body / Footer) |
| `Default` | `DefaultExample.tsx` | Минимальная карточка: Header + Body + Footer |
| `Types` | `TypesExample.tsx` | Все значения `EIslandType` рядом |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG: скругление, паддинги, отступы между частями |
| `Loading` | `Loading.tsx` | `loading`: `LoaderScreen` поверх контента карточки |
| `WithoutPaddings` | `WithoutPaddings.tsx` | `withoutPaddings` во всех размерах: внутренние отступы убраны, скругление и отступы между Header / Body / Footer сохраняются |

Файлы примеров с постфиксом `Example` — локальный legacy-паттерн папки; новые примеры называются
по имени story (`Loading.tsx`).

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-24 | Добавлено свойство `withoutPaddings` — отключает внутренние отступы карточки. Добавлена story `WithoutPaddings`. |
| 2026-08-11 | Prop состояния загрузки переименован `isLoading` → `loading` — по преобладающей в библиотеке конвенции boolean-props без префикса `is` (`loading` у `Button`, `List`, `Dropdown`, `Suggest`, `Table`). Prop ещё не выпускался, поэтому breaking change нет; `Omit` в `IModalWindowBodyProps` обновлён на `"loading"`. Поведение не изменилось. |
| 2026-08-06 | `related` приведён к правилу `docs/ai/CONTEXT.md` → «Как заполнять `related` в AI.md»: убраны потребители (`BodyPage`, `HeaderPage`, `FooterPage`, `Confirm`), `ModalWindowBody` заменён родителем `ModalWindow`, добавлен `LoaderScreen`. Раздел «Связанные компоненты» разбит по типам связи. Добавлено состояние загрузки: props `isLoading` и `loaderScreenProps` — при `isLoading` поверх контента карточки рендерится `LoaderScreen` типа `middle`. Подложка наследует скругление карточки, `z-index` понижен до локального. `ModalWindowBody` эти props не наследует (`Omit`) — его тело скроллируется, лоадер там задаётся на `ModalWindowContent`. Добавлены story `Loading` и unit-тесты. Остальной публичный API не изменён. |
| 2026-08-04 | Создан документ. AI-рефакторинг: JSDoc на props, значениях `EIslandType` и субкомпонентах, `displayName` у `IslandHeader` / `IslandBody` / `IslandFooter`, unit-тесты на все типы и размеры, части острова и `mapTypeToClassName`. Исправлено: `className` в `IslandHeader` и `IslandFooter` больше не затирает базовый класс компонента; побочный отступ в `IslandAccordion` погашен в стилях аккордеона, вид библиотечных компонентов не изменился. Публичный API не изменён. |
