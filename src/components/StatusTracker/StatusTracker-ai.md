---
component: StatusTracker
category: Feedback
related: [MarkerStatus, AlertProcess, Amount, Button]
tokens:
  - StatusTracker.Background
  - StatusTracker.Border_Color
  - StatusTracker.Draft_Background
  - StatusTracker.Draft_Color
  - StatusTracker.Waiting_Background
  - StatusTracker.Waiting_Color
  - StatusTracker.Warning_Background
  - StatusTracker.Rejected_Background
  - StatusTracker.Rejected_Color
  - StatusTracker.Approved_Background
  - StatusTracker.Approved_Color
stories: stories/StatusTracker/StatusTracker.stories.tsx
version: "1.0"
---

# StatusTracker

## Назначение

Карточка статуса документа: на фоне — декоративное цветное пятно, кодирующее `type`,
поверх него — композиция из блоков `Media`, `Header`, `Body` и `Footer`. Типичное место —
экран одного документа (платёжное поручение, заявка) после отправки в банк: иконка статуса,
сумма, текущее состояние обработки и действия над документом.

Используй когда: нужен крупный итоговый экран состояния одного объекта — «документ в обработке»,
«отклонён банком», «исполнен» — с суммой, пояснением и действиями.

Не используй когда:

- Статус показывается в строке списка или таблицы — там нужен компактный `MarkerStatus`,
  `Marker` или `TagColor`, а не карточка на всю высоту контейнера.
- Нужно сообщение внутри формы или страницы — возьми `AlertProcess` / `AlertContext`.
  `StatusTracker` — самостоятельный экран, а не врезка.
- Нужен контейнер общего назначения с заголовком и контентом — это `Island` или `CardStatic`.
- Нужно показать прогресс из нескольких шагов — это `Stepper` / `Step`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `type` | `EStatusTrackerType` | Тип статуса документа: `DRAFT` / `WAITING` / `WARNING` / `REJECTED` / `APPROVED`. Влияет **только** на цвет декоративного фона — ни иконку, ни текст, ни набор блоков компонент по нему не подставляет |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `verticalAlign` | `EStatusTrackerVerticalAlign` | `EStatusTrackerVerticalAlign.TOP` | Выравнивание контента внутри карточки: `TOP` / `MIDDLE` / `BOTTOM`. Заметно, только когда контейнер выше содержимого |
| `children` | `React.ReactNode` | — | Блоки `StatusTracker.Media`, `.Header`, `.Body`, `.Footer` в любом сочетании и порядке |

Остальные props — стандартные атрибуты `div`
(`IStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement>`), уходят на корневой
элемент через `...rest`.

### Состав компонента

Публичный API — составной: субкомпоненты доступны и статическими свойствами, и отдельными
экспортами — кроме `StatusTrackerAlert`, `StatusTrackerStatus` и `StatusTrackerStatusGroup`:
они доступны только статическими свойствами, из barrel `index.ts` их нет (см. «Инварианты»).

| Составной путь | Компонент | Корневой DOM | Своё, сверх `className` + `...rest` |
|---|---|---|---|
| `StatusTracker.Media` | `StatusTrackerMedia` | `div` | — контейнер под статусную иконку размера 84 |
| `StatusTracker.Header` | `StatusTrackerHeader` | `div` | — |
| `StatusTracker.Header.Title` | `StatusTrackerTitle` | `h3` (`Title` size H3, BOLD) | — |
| `StatusTracker.Header.Sum` | `StatusTrackerSum` | `h1` (`Title` size H1, SEMIBOLD) | `amountProps: IAmountProps` — обязательный, уходит в `Amount` как есть |
| `StatusTracker.Header.Description` | `StatusTrackerDescription` | `span` (`Text` B3, SECONDARY) | — |
| `StatusTracker.Body` | `StatusTrackerBody` | `div` | — |
| `StatusTracker.Body.Status` | `StatusTrackerStatus` | `div` (`MarkerStatus`) | принимает `IMarkerStatusProps` целиком (`status` обязателен) |
| `StatusTracker.Body.StatusGroup` | `StatusTrackerStatusGroup` | `div` | — колонка из нескольких `Status`, центрируется целиком |
| `StatusTracker.Body.Alert` | `StatusTrackerAlert` | `div` (`AlertProcess`) | принимает `IAlertProcessProps` целиком (`type` обязателен); оборачивает `children` в `Text` B3 |
| `StatusTracker.Footer` | `StatusTrackerFooter` | `div` | — |
| `StatusTracker.Footer.Button` | `StatusTrackerButton` | `button` (`Button`) | `Exclude<TButtonProps, IButtonLinkProps>`; `block` проставляется принудительно |
| `StatusTracker.Footer.Description` | `StatusTrackerDescription` | `span` | тот же компонент, что и в `Header` |

Блоки необязательны: карточка валидна и с одним `Media`. Порядок блоков в DOM = порядок
в JSX — компонент не сортирует `children` и не проверяет их тип.

### Что компонент не делает сам

- Не выбирает иконку по `type` — `Media` заполняет потребитель (`WaitStsIcon84`,
  `WarningStsIcon84`, `ErrorStsIcon84`, `SuccessStsIcon84` из `@sberbusiness/icons-next`).
- Не связывает `type` со `status` у `Body.Status` и с `type` у `Body.Alert` — это три
  независимых значения, согласованность на стороне потребителя.
- Не задаёт себе размеры: `width: 100%`, `height: 100%`, `min-height` 318px (258px на `≤ sm`).
  Ширину и высоту определяет контейнер.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/StatusTracker.ts`.

```text
StatusTracker.Background
StatusTracker.Border_Color
StatusTracker.Draft_Background
StatusTracker.Draft_Color
StatusTracker.Waiting_Background
StatusTracker.Waiting_Color
StatusTracker.Warning_Background
StatusTracker.Rejected_Background
StatusTracker.Rejected_Color
StatusTracker.Approved_Background
StatusTracker.Approved_Color
```

Декоративный фон собран из двух слоёв-эллипсов: `statusTrackerBackground` (размытие
`blur(50px)`) берёт токен `*_Background`, `statusTrackerColor` поверх него — токен `*_Color`.

Набор токенов асимметричен: у `WARNING` собственного `Warning_Color` нет — оба слоя
используют `Warning_Background`. Это не опечатка в стилях, а текущее состояние палитры;
если понадобится развести слои, токен придётся добавить и в
`DesignTokens/components/StatusTracker.ts`, и в LESS.

Токены `Draft_*` и `Waiting_*` по умолчанию ссылаются на одну и ту же палитру, поэтому
`DRAFT` и `WAITING` выглядят одинаково. Токены при этом раздельные — потребитель может
развести их темой, и схлопывать их в один нельзя.

---

## Инварианты

- `forwardRef<HTMLDivElement>` на `StatusTracker` — не убирать. Ref указывает на корневой
  `statusTrackerWrapper`, а не на внутренний контейнер контента.
- Трёхслойная разметка обязательна: `statusTrackerWrapper` (рамка, фон, `overflow: hidden`)
  → `statusTrackerBackground` + вложенный `statusTrackerColor` (декоративные эллипсы,
  `position: absolute`) → `statusTracker` (контент, `z-index: 1`). Схлопывание слоёв ломает
  и градиент, и обрезку эллипсов по скруглению карточки.
- Класс типа (`draft` / `waiting` / …) ставится **на оба** декоративных слоя. Если поставить
  только на один, половина фона останется без цвета.
- `key={type}` на `statusTrackerBackground` заставляет React пересоздавать узел при смене
  типа. Поведение наблюдаемое (сброс состояния DOM-узла), поэтому снимать его без
  обсуждения не нужно.
- Значения `EStatusTrackerType` (`"draft"` / `"waiting"` / `"warning"` / `"rejected"` /
  `"approved"`) совпадают с именами CSS-классов в `StatusTracker.module.less` и с префиксами
  токенов `StatusTracker.*`. Переименование значения enum ломает три места сразу.
- `EStatusTrackerVerticalAlign.TOP` намеренно отсутствует в `VERTICAL_ALIGN_TO_CLASS_NAME_MAP`:
  это выравнивание по умолчанию и своего класса не имеет. Мапа объявлена как `Partial<Record<…>>`
  именно поэтому.
- `StatusTracker.Footer.Button` всегда рендерится с `block` — кнопки футера занимают всю
  ширину карточки. Тема `LINK` исключена из типа props (`Exclude<TButtonProps, IButtonLinkProps>`),
  потому что блочный режим для неё недоступен.
- `StatusTrackerAlert` оборачивает `children` в `Text` размера B3. Передавать внутрь
  собственный `Text`/`Title` не нужно — получится вложенная типографика.
- Селектор `.statusTrackerChild:empty { padding: 0 }` схлопывает отступы у пустых блоков —
  пустой `Header` не оставляет дыру в макете.
- Barrel `src/components/StatusTracker/index.ts` экспортирует `StatusTracker`, оба enum'а и
  субкомпоненты `Header`, `Footer`, `Title`, `Description`, `Media`, `Sum`, `Body`, `Button` —
  сохранять. `StatusTrackerAlert`, `StatusTrackerStatus` и `StatusTrackerStatusGroup` в barrel
  **не входят** и доступны только как статические свойства (`StatusTracker.Body.Alert` и т. д.).
- Имена интерфейсов `StatusTrackerMediaProps` (без префикса `I`) и `IStatusTrackerStatusGroup`
  (без суффикса `Props`) расходятся с конвенцией `codestyle.md`. Это публичные имена —
  переименование возможно только как согласованный breaking change.
- `displayName` проставлены у всех субкомпонентов и совпадают с именами компонентов —
  проверяются unit-тестом.

---

## Accessibility

- Собственной ARIA-роли и обработчиков клавиатуры у компонента нет: `StatusTracker` и все
  блоки-контейнеры — неинтерактивные `div`, в порядок фокуса не попадают.
- Интерактивен только `StatusTracker.Footer.Button` — это обычный `Button` со своей
  семантикой и фокусом.
- Цвет фона — декоративный и **не должен быть единственным носителем смысла**: статус
  обязан читаться текстом (`Body.Status`, `Header.Title`). Скринридер градиент не озвучит.
- Иконка в `Media` — тоже декоративная. Если она несёт смысл, потребитель сам задаёт
  `aria-label` / `role="img"` на иконке.
- Заголовки рендерятся как `h3` (`Header.Title`) и `h1` (`Header.Sum`) — порядок уровней
  в разметке страницы обратный. Изменить уровень заголовка через публичный API нельзя:
  `IStatusTrackerTitleProps` и `IStatusTrackerSumProps` — это `React.HTMLAttributes`,
  prop'а `tag` в них нет, хотя внутренняя типографика (`Title`) его поддерживает.
- Компонент не хардкодит текстовые строки: содержимое и любые `aria-*` задаёт потребитель,
  библиотека мультиязычная. Любые `aria-*` проходят через `...rest` на корневой `div`.

---

## Связанные компоненты

- `MarkerStatus` — рендерится внутри `StatusTracker.Body.Status`, принимает его props целиком.
  Он же — замена всему `StatusTracker`, когда статус нужен компактной строкой в списке.
- `AlertProcess` — рендерится внутри `StatusTracker.Body.Alert`, принимает его props целиком
  (включая `closable` / `onClose`).
- `Amount` — рендерится внутри `StatusTracker.Header.Sum`, настраивается через `amountProps`.
- `Button` — рендерится внутри `StatusTracker.Footer.Button` с принудительным `block`.
- `Title` и `Text` (`Typography`) — типографика `Title`, `Sum` и `Description`; размеры
  и начертания зашиты в субкомпонентах и через props не настраиваются.

---

## Stories

Основные истории: `stories/StatusTracker/StatusTracker.stories.tsx`
Файлы примеров: `stories/StatusTracker/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `type` и `verticalAlign` на полной композиции |
| `Default` | `Default.tsx` | Минимальная карточка: `type` + `Media` + `Header` |
| `Types` | `Types.tsx` | Все пять значений `EStatusTrackerType` |
| `VerticalAlign` | `VerticalAlign.tsx` | `TOP` / `MIDDLE` / `BOTTOM` в контейнере выше содержимого |
| `WithMediaOnly` | `WithMediaOnly.tsx` | Краевой случай: карточка из одного блока `Media` |
| `Example` | `Example.tsx` | Production-like композиция: медиа, сумма, группа статусов, предупреждение, футер |
| `VisualTests` | `VisualTests.tsx` | Широкий родитель, выравнивание `BOTTOM` и `StatusGroup` с закрываемым `Alert` — для скриншот-тестов |

Story ID участвуют в именах baseline-скриншотов (`statustracker--types--xs.png` и т. п.),
поэтому переименование story требует перегенерации baseline и удаления осиротевших файлов.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-25 | Создан документ. AI-рефакторинг: JSDoc на всех публичных props, `forwardRef` у субкомпонентов `Media`, `Title`, `Description`, `Sum`, `Alert`, `Status`, `Button` и `displayName` у них же, кроме `Button` (у него он уже был), исправлен JSDoc `StatusTrackerTitle`, импорты приведены к одному виду. Unit-тесты расширены (`StatusTrackerStatusGroup`, проброс ref, `displayName`). Stories переведены на modern pattern с `examples/` и дополнены `Types`, `Example`, `VisualTests`. |
