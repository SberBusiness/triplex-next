---
component: IslandAccordion
category: Layout
related: [Island, IslandWidget, ExpandAnimation, Step, ButtonIcon]
tokens:
  - IslandAccordion.Type1_Header_Background_Hover
  - IslandAccordion.Type2_Header_Background_Hover
  - IslandAccordion.Type3_Header_Background_Hover
  - IslandAccordion.Shadow_Focus
stories: stories/IslandAccordion/IslandAccordion.stories.tsx
version: "1.0"
---

# IslandAccordion

## Назначение

Список раскрывающихся карточек: `<ul>`, каждый элемент которого — `<li>` с карточкой `Island`,
кнопкой-заголовком и анимированно раскрываемым содержимым. Элемент дополнительно умеет
показывать номер шага со статусом (`Step`) и кнопку удаления.

Используй когда: набор логически сгруппированных блоков нужно уместить в ограниченном
пространстве и дать пользователю раскрывать их по одному — шаги оформления заявки, разделы
формы, FAQ.

Не используй когда:
- Нужна одна нераскрывающаяся карточка — возьми `Island`.
- Нужен виджет, который сворачивается только в адаптиве, а не по клику пользователя — возьми
  `IslandWidget`.
- Нужны вкладки (виден ровно один раздел, заголовки в ряд) — возьми `Tabs`.
- Нужна анимация раскрытия сама по себе, без карточки и заголовка — возьми `ExpandAnimation`.
- Нужно дерево с раскрывающимися узлами — возьми `CollapsibleTree`.

---

## Состав

```tsx
<IslandAccordion size type>          // <ul>, задаёт size и type через контекст
    <IslandAccordion.Item id title>  // <li> + Island + кнопка-заголовок + ExpandAnimation
        <IslandAccordion.Item.Content>  // Island.Body внутри ExpandAnimation
        <IslandAccordion.Item.Footer>   // Island.Footer внутри ExpandAnimation
```

Из barrel экспортируются и «плоские» имена: `IslandAccordionItem`, `IslandAccordionContent`,
`IslandAccordionFooter` — вместе с точечными псевдонимами это один и тот же компонент.

`Content` и `Footer` необязательны: содержимым `Item` может быть произвольный узел, он попадёт
внутрь `ExpandAnimation` как есть. Но тогда на него не подействуют внутренние отступы аккордеона
(они заданы на `.body` / `.footer`).

---

## Варианты и props

### IslandAccordion

Обязательных props нет.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер всех элементов: паддинги, скругление, отступ между элементами, размер заголовка |
| `type` | `EIslandType` | `EIslandType.TYPE_1` | Визуальный тип карточки `Island` у элементов; влияет и на цвет hover заголовка |

Расширяет `React.HTMLAttributes<HTMLUListElement>` — `className`, `style`, `aria-*`, `data-*`
и обработчики попадают на корневой `<ul>`.

Обе props раздаются элементам **через контекст**, а не через клонирование детей, поэтому между
`IslandAccordion` и его `Item` можно вставлять произвольные обёртки. Обратная сторона: `Item`,
отрендеренный вне `IslandAccordion`, берёт значения по умолчанию из
`initialIslandAccordionContext` (`MD` + `TYPE_1`) и не ломается.

### IslandAccordion.Item

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `title` | `React.ReactNode` | — | **Обязательный.** Содержимое заголовка. Оборачивается в `Title` с `tag="div"` |
| `id` | `string` | — | **Обязательный.** Проставляется на корневой `<li>` и передаётся в `onToggle` / `onRemove` |
| `num` | `number` | `undefined` | Номер в кружке слева от заголовка. Рендерится только вместе с `status` |
| `status` | `EStepStatus` | `undefined` | Статус шага (цвет кружка). Без него кружок не рендерится, даже если задан `num` |
| `stepHint` | `string` | `undefined` | Подсказка (`Tooltip` от `Step`) по наведению на кружок. Игнорируется при `disabled` |
| `opened` | `boolean` | `undefined` | Раскрыт ли элемент. Передан — элемент управляемый, не передан — раскрывается сам |
| `disabled` | `boolean` | `false` | Блокирует раскрытие и удаление, гасит подсказку шага, оставляет содержимое свёрнутым |
| `onToggle` | `(newOpened: boolean, id: string) => void` | `undefined` | Клик по заголовку. Первым аргументом — состояние, в которое элемент переходит |
| `onRemove` | `(id: string) => void` | `undefined` | Клик по кнопке удаления. Сама кнопка рендерится, **только** если колбэк передан |
| `transitionProps` | `IExpandAnimationProps["transitionProps"]` | `undefined` | Props `Transition` (react-transition-group), пробрасываются в `ExpandAnimation` |

Расширяет `Omit<React.HTMLAttributes<HTMLLIElement>, "title">` — `title` переопределён на
`ReactNode`, поэтому HTML-атрибут `title` на `<li>` через него не задать.

### Управляемый и неуправляемый режим

Один и тот же prop `opened` переключает режим:

- **`opened` не передан** — элемент хранит раскрытие сам. Клик по заголовку меняет его и вызывает
  `onToggle`.
- **`opened` передан** — раскрытие задаёт потребитель. Клик по заголовку **только** вызывает
  `onToggle(!текущее, id)`; собственное состояние элемент не меняет и ждёт нового `opened`. Если
  потребитель не обновит prop, элемент не раскроется.

Синхронизация `opened` → внутреннее состояние идёт **в фазе рендера** (паттерн React «adjusting
state when a prop changes»), а не в `useEffect`, поэтому промежуточный кадр со старым состоянием
не отрисовывается. Если `opened` из заданного становится `undefined`, элемент сохраняет последнее
синхронизированное значение и дальше управляет им сам.

«Открыт ровно один элемент» встроенным поведением **не является**: аккордеон не знает о состоянии
соседей. Потребитель держит id открытого элемента у себя и раздаёт `opened={id === openId}` —
см. story `OnlyOneOpenAtATime`.

### Удаление

`onRemove` только уведомляет — элемент себя не удаляет. Убрать его из списка должен потребитель
(см. story `Removable`).

### Размеры

| `size` | Паддинги заголовка / тела | `border-radius` | Отступ между элементами | Размер `Title` |
|---|---|---|---|---|
| `SM` | 16px | 16px | 16px | `H3` |
| `MD` | 24px | 24px | 16px | `H3` |
| `LG` | 32px | 32px | 24px | `H2` |

В раскрытом состоянии нижний паддинг заголовка уменьшается (12 / 16 / 24px), чтобы заголовок и
тело не расходились.

**Адаптив** (`max-width: @screen-sm-max`) устроен в двух местах и они должны сходиться:
- LESS схлопывает `MD` до метрик `SM`, а `LG` — до метрик `MD`;
- `useMobileView()` в TSX принудительно ставит `Title` размер `H3` при любом `size`.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию —
`src/components/DesignTokens/components/IslandAccordion.ts`.

```text
IslandAccordion.Type1_Header_Background_Hover
IslandAccordion.Type2_Header_Background_Hover
IslandAccordion.Type3_Header_Background_Hover
IslandAccordion.Shadow_Focus
```

Hover-фон заголовка применяется только к **свёрнутому** элементу (`&.type1:not(.opened) .header:hover`).
`Shadow_Focus` — внутренняя рамка на `.header:focus-visible`. Фон и тень самой карточки берутся из
токенов `Island` (`Island.Type1_Background` и т.д.), собственных у аккордеона нет. Скругления и
отступы токенами не описаны — они заданы литералами в `styles/IslandAccordion.module.less`.

---

## Инварианты

- **`forwardRef`** у `IslandAccordion` (→ `<ul>`) и `IslandAccordionItem` (→ `<li>`) — не убирать.
  У `IslandAccordionContent` и `IslandAccordionFooter` его нет: они объявлены как `React.FC`.
  Добавление `forwardRef` этим двум — изменение публичного контракта.
- **Корневые элементы `<ul>` и `<li>`** — на них держатся роли `list` / `listitem` и селекторы
  отступов между элементами (`.item + .item.md`). Смена тега ломает и семантику, и вёрстку.
- **`id` у `Item` обязателен и уникален в пределах страницы** — он идёт прямо в DOM-атрибут `id`
  корневого `<li>`, а не только в колбэки. Дубли дадут невалидный DOM.
- **Публичный API:** `IslandAccordion`, `IslandAccordionItem`, `IslandAccordionContent`,
  `IslandAccordionFooter` и их интерфейсы props экспортируются из
  `src/components/IslandAccordion/index.ts`. `IslandAccordionContext`,
  `IIslandAccordionContext` и `initialIslandAccordionContext` в barrel **не** реэкспортируются —
  это внутренний слой, менять его можно свободно.
- **`margin-top: 0 !important` у `.footer`** гасит правило отступов `Island`
  (`.island.{size} .islandBody + .islandFooter`), у которого специфичность в четыре класса.
  Убрать `!important` без переписывания селектора нельзя — подвал разъедется. Подробности —
  в комментарии в LESS и в `Island-ai.md` → «Ограничения».
- **`.body` / `.footer` скрыты через `visibility: hidden`**, пока у элемента нет класса `.opened` —
  «чтобы focus не попадал во внутренние элементы в закрытом состоянии» (комментарий в LESS).
  `ExpandAnimation` независимо ставит `visibility: hidden` инлайном в фазе `exited`; классы
  аккордеона переключаются синхронно с состоянием, инлайн-стиль — по завершении анимации.
  Удаление любого из двух механизмов меняет момент, начиная с которого содержимое перестаёт
  ловить фокус.
- **Глобальный класс `hoverable`** на кнопке-заголовке приходит из `@sberbusiness/icons-next` и
  задаёт цвет каретки при наведении. Он не из `styles` — при чистке «мёртвых» классов не удалять.
- **Кружок шага рендерится только при `status` И `num`.** Условие намеренно записано тернарником
  с явными проверками (`num !== undefined && num !== 0`), а не через `&&`: выражение `status && num`
  при `num === 0` вернуло бы `0`, и React отрисовал бы текст «0». Намеренна здесь только форма записи.
  Сам пропуск кружка при `num === 0` — **унаследованная особенность, а не желаемый контракт**:
  ноль выглядит валидным номером шага, но исторически не рендерится. Поведение зафиксировано тестом
  как есть; менять его — отдельная задача с записью в release notes, потому что это изменение
  наблюдаемого поведения.

---

## Accessibility

- Заголовок — нативный `<button type="button">` внутри `Island.Header`. Клавиатура работает
  штатно (`Enter` / `Space`), собственных обработчиков клавиш компонент не ставит.
- Связка заголовка и содержимого: у кнопки `id` и `aria-controls`, у раскрывающейся области
  `role="region"` и `aria-labelledby`. Оба id генерируются автоматически
  (`IslandAccordionItem-<n>-header` / `-body`) — потребителю их задавать не нужно и нельзя.
- `aria-expanded` на кнопке отражает **запрошенное** состояние. При `disabled` содержимое остаётся
  свёрнутым (`expanded={isOpen && !disabled}`), а `aria-expanded` может показывать `true`, если
  передан `opened` — это известное расхождение.
- Каретка помечена `aria-hidden="true"` — она декоративная.
- Навигации стрелками между элементами нет (в WAI-ARIA Accordion Pattern она опциональна). Между
  заголовками ходят `Tab`.
- Список не получает `aria-label` автоматически. Если на странице несколько списков, передай его
  сам в `IslandAccordion`.
- Фокус при раскрытии никуда не переносится — он остаётся на заголовке.
- **Кнопка удаления имеет захардкоженный `title="Удалить"`** — отступление от правила
  мультиязычности `docs/ai/codestyle.md`. Задать его снаружи сейчас нельзя; починка требует нового
  prop, то есть изменения публичного API.

---

## Связанные компоненты

### Части IslandAccordion (своего AI.md не имеют)

- `IslandAccordionItem` (он же `IslandAccordion.Item`) — раскрывающийся элемент. Вся логика
  состояния, статуса и удаления живёт здесь.
- `IslandAccordionContent` (он же `IslandAccordion.Item.Content`) — обёртка над `Island.Body`,
  добавляющая класс с отступами аккордеона. Собственных props, кроме `children`, нет:
  `className` и `...rest` она не принимает.
- `IslandAccordionFooter` (он же `IslandAccordion.Item.Footer`) — обёртка над `Island.Footer`.
  `IIslandAccordionFooterProps extends IIslandFooterProps`, `className` мерджится с базовым.

### Альтернативы (в `related`)

- `Island` — та же карточка без раскрытия. `IslandAccordion` строится на нём и опирается на его
  вёрстку: гасит отступ `Island.Footer` через `!important` и обнуляет паддинги `Island` в свою
  пользу, поэтому правки селекторов отступов `Island` ломают аккордеон молча.
- `IslandWidget` — виджет на `Island`, который сворачивается в адаптиве, а не по клику. Свои
  Header / Body / Footer, частями `Island` не пользуется.

### Контракты по рендеру (в `related`)

- `ExpandAnimation` — анимация раскрытия содержимого. Получает `role="region"`, `aria-labelledby`
  и `transitionProps` от элемента. Именно он держит содержимое в DOM в свёрнутом состоянии
  (`height: 0` + `visibility: hidden`), а не размонтирует его.
- `Step` — кружок с номером и статусом слева от заголовка. `position` всегда `XFirst`,
  `size` берётся из контекста аккордеона, `stepHint` уходит в `children` и превращается в `Tooltip`.
- `ButtonIcon` — кнопка удаления справа от карточки (абсолютно спозиционирована **за** её
  границами: `right: -36px` / `-40px`, поэтому у аккордеона с `onRemove` нужен внешний отступ справа).

### Другие направления из «Не используй когда» (в `related` не входят)

- `Tabs` — если виден ровно один раздел, а заголовки стоят в ряд.
- `CollapsibleTree`, `CollapsibleTreeExtended` — если нужна древовидная структура.

---

## Stories

Основные истории: `stories/IslandAccordion/IslandAccordion.stories.tsx`
Файлы примеров: `stories/IslandAccordion/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контроль `size`, `type`, `status`, `removable`, `disabled`, `title` |
| `Default` | `DefaultExample.tsx` | Минимальный элемент: заголовок, `Content`, `Footer` с кнопками |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG: паддинги, скругление, размер заголовка |
| `Disabled` | `DisabledExample.tsx` | `disabled`: заголовок не кликается, содержимое свёрнуто |
| `Removable` | `RemovableExample.tsx` | `onRemove`: кнопка удаления и удаление элемента силами потребителя |
| `WithStatus` | `WithStatusExample.tsx` | Все значения `EStepStatus` в кружке шага |
| `WithStepHint` | `WithStepHintExample.tsx` | `stepHint`: подсказка `Tooltip` по наведению на кружок |
| `OnlyOneOpenAtATime` | `OnlyOneOpenAtATimeExample.tsx` | Управляемый режим: одновременно раскрыт не больше одного элемента |
| `VisualTests` | — | Скриншот-регрессия: раскрытый и свёрнутый элементы рядом |

Скриншот-регрессия снимается со stories `Default`, `Sizes`, `Disabled`, `Removable`,
`WithStatus`, `VisualTests`. `Playground`, `WithStepHint` и `OnlyOneOpenAtATime` помечены
`testRunner: { skip: true }` — они интерактивные и дают нестабильный кадр.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-09 | Создан документ. AI-рефакторинг: JSDoc на props, компонентах и контексте; синхронизация `opened` перенесена из `useEffect` в фазу рендера (промежуточный кадр со старым состоянием больше не отрисовывается); автогенерируемые id заголовка и содержимого получили вид `IslandAccordionItem-<n>-header` / `-body`; при `num={0}` со статусом больше не отрисовывается текст «0»; добавлены unit-тесты на `IslandAccordionItem`, контекст, части и публичный контракт `IslandAccordion`. Публичный API не изменён. |
