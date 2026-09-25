---
component: Stepper
category: Stepper
related: [StepperExtended, Step, CarouselExtended, ButtonIcon]
tokens:
  - Stepper.ButtonWrapper_Background_Next
  - Stepper.ButtonWrapper_Background_Prev
  - Stepper.Step_Background_Default
  - Stepper.Step_Background_Disabled
  - Stepper.Step_Background_Error
  - Stepper.Step_Background_Error_Hover
  - Stepper.Step_Background_Hover
  - Stepper.Step_Background_Warning
  - Stepper.Step_Background_Warning_Hover
  - Stepper.Step_BorderColor_Error
  - Stepper.Step_BorderColor_Focus
  - Stepper.Step_BorderColor_Success
  - Stepper.Step_BorderColor_Warning
  - Stepper.Step_Color_Default
  - Stepper.Step_Color_Disabled
  - Stepper.Step_Color_Hover
stories: stories/Stepper/Stepper.stories.tsx
version: "1.0"
---

# Stepper

## Назначение

Лента шагов-стрелок поверх `StepperExtended` и `CarouselExtended`: компонент принимает массив шагов, сам собирает разметку, сам рендерит кнопки прокрутки для не поместившихся шагов и сам подводит выбранный шаг в видимую область.

Используй когда: нужно показать прохождение многошагового сценария и дать переключаться между шагами — это первый выбор для обычной задачи.
Не используй когда:

- содержимое шага нестандартное (своя разметка внутри шага, свои кнопки прокрутки) — бери `StepperExtended`, `Stepper` собран поверх него;
- нужен нумерованный индикатор шагов с подписью и тултипом вместо ленты-стрелок — бери `Step`;
- шаги не переключаются пользователем и нужен только статус процесса — это не задача компонента.

---

## Варианты и props

`IStepperProps` расширяет `Omit<IStepperExtendedProps, "children">` (а тот — `React.HTMLAttributes<HTMLOListElement>`).

**Куда что уходит.** Компонент вынимает из props только `className`, `steps`, `size` и `selectedStepId`. `className` мерджится в корневой `<div>` карусели, а **все остальные props** уходят на `<ol role="tablist">` внутри неё. Это разные элементы: `aria-label`, `data-*`, `style`, `id`, `onClick` и прочее оказываются на списке шагов, а не на корне. В частности, `className` и `style` попадают на **разные** элементы: `<Stepper style={{width: 400}} />` задаёт ширину `<ol>`, а не корня.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `steps` | `Array<IStepperStep>` | Состав ленты. Порядок массива = порядок прохождения: шаги до выбранного считаются пройденными, после — непройденными |
| `onSelectStep` | `(id: string) => void` | Запрос на смену выбранного шага. Вызывается кликом и клавишами `Enter` / `Space`, в том числе на уже выбранном шаге |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `MD` | Один prop на весь компонент: задаёт и высоту шагов, и размер кнопок прокрутки |
| `selectedStepId` | `string` | — | `id` текущего шага. Компонент полностью управляемый: своего состояния выбора у него нет |
| `forwardedRef` | `React.Ref<HTMLOListElement>` | — | Ссылка на `<ol>` со списком шагов. Единственный ref-контракт компонента — см. «Инварианты» |

### Поля элемента `steps` (`IStepperStep`)

`IStepperStep` расширяет `IStepperStepProps`, то есть принимает и HTML-атрибуты `<li>`-элемента шага.

| Поле | Тип | Описание |
|---|---|---|
| `id` | `string` | Обязательное. Сопоставляется с `selectedStepId`, приходит в `onSelectStep`, служит React-ключом |
| `type` | `EStepperStepType` | Обязательное. `NEUTRAL` — обычный шаг, `ERROR` / `WARNING` подсвечивают шаг цветом. У отключённого шага тип не применяется |
| `label` | `React.ReactNode` | Содержимое шага. Единственное поле, которое не уходит в HTML-атрибуты `<li>` |
| `icon` | `React.ReactNode` | Иконка статуса слева от `label`, обычно `StepperStepIcon`. Гасится вместе с шагом при `disabled` |
| `disabled` | `boolean` | Шаг не реагирует на клик и клавиатуру и выпадает из таб-порядка |

### Ограничения

- `isInActiveStep` компонент вычисляет сам по индексу шага относительно выбранного и перетирает значение, переданное в элементе `steps`.
- `forwardedRef` в элементе `steps`, наоборот, перетирает внутреннюю ссылку `Stepper` на шаг — после этого лента перестаёт подводить выбранный шаг в видимую область. Ссылки на шаги нужны компоненту для прокрутки; если нужен доступ к узлу шага, бери его через `forwardedRef` самого `Stepper` и DOM-обход.
- `id` шагов должны быть уникальными: по ним идёт сопоставление с `selectedStepId`, React-ключи и внутренняя карта ссылок на узлы.
- Пустой массив `steps` допустим — рендерится пустой `<ol>`.
- Если `selectedStepId` не задан или не найден в `steps`, пройденных шагов нет: вся лента отображается как непройденная.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Stepper.ts`.

Семейство `Stepper.Step_*` общее для `Stepper`, `StepperExtended` и шага `StepperStep` — оформление самих шагов приходит оттуда. Собственные стили `Stepper` — только подложка под кнопками прокрутки (`ButtonWrapper_*`), она растушёвывает край ленты градиентом.

```text
Stepper.ButtonWrapper_Background_Prev
Stepper.ButtonWrapper_Background_Next
Stepper.Step_Background_Default
Stepper.Step_Background_Hover
Stepper.Step_Background_Disabled
Stepper.Step_Background_Error
Stepper.Step_Background_Error_Hover
Stepper.Step_Background_Warning
Stepper.Step_Background_Warning_Hover
Stepper.Step_BorderColor_Focus
Stepper.Step_BorderColor_Error
Stepper.Step_BorderColor_Warning
Stepper.Step_BorderColor_Success
Stepper.Step_Color_Default
Stepper.Step_Color_Hover
Stepper.Step_Color_Disabled
```

---

## Инварианты

- **Ref-контракт — prop `forwardedRef`, а не `ref`.** `Stepper` объявлен как `React.FC`: `React.forwardRef` ему не добавляли осознанно. `CarouselExtended` отдаёт наружу ссылку на прокручиваемую ленту, а не на корневой `<div>`, а сам `Stepper` держит эту ссылку для прокрутки — поэтому `ref` пришлось бы вести на другой DOM-узел, чем уже задокументированный `forwardedRef` (`<ol>`), и получилось бы два ref-контракта на разные элементы. Добавление `forwardRef` требует сначала научить `CarouselExtended` отдавать корневой элемент.
- Публичные имена `Stepper`, `IStepperProps`, `IStepperStep`, `EStepperStepType`, `EStepperStepIconType` и barrel `src/components/Stepper/index.ts` — часть публичного API.
- `Stepper.Step = StepperStep` — статическое свойство, часть публичного API (тот же компонент, что `StepperExtended.Step`).
- Компонент строится на `CarouselExtended` и передаёт ему `stepPrev` / `stepNext` — величину прокрутки одним кликом, равную 30% ширины видимой области ленты. Величина пересчитывается `ResizeObserver` и до первого измерения равна нулю.
- Состояние шага кодируется взаимоисключающими классами `completed` / `active` / `inactive` и вычисляется по индексу относительно выбранного шага. Зафиксировано unit-тестами.
- Класс размера (`sm` / `md` / `lg`) вешается и на корневой `<div>` карусели, и на каждый шаг: от него зависят и высота шага, и размер кнопки прокрутки.
- Кнопки прокрутки исключены из таб-порядка (`tabIndex = -1`) и скрыты на экранах уже 768px — прокрутка всё равно доступна колесом, жестом и обходом шагов по `Tab`.
- Подводка выбранного шага в видимую область (`alignStep`) — функции модульного уровня в `Stepper.tsx` (читают геометрию DOM через `getBoundingClientRect`, проверяют `window.matchMedia` и прокручивают ленту), зафиксированы unit-тестами: на узких экранах шаг центрируется, на широких — прижимается к ближайшему краю вместе с соседним шагом.

---

## Accessibility

- Разметка приходит из `StepperExtended` и `StepperStep`: корневой список — `<ol role="tablist">`, каждый шаг — `<li role="button">`. Выбранный шаг помечается `aria-current="true"`, отключённый — `aria-disabled="true"` и `tabIndex = -1`.
- **Известное расхождение с WAI-ARIA:** дети `role="tablist"` имеют `role="button"`, а не `role="tab"`. Это текущее публичное поведение, зафиксированное тестами; смена ролей — отдельная задача с записью в release notes.
- **Клавиатура:** `Enter` и `Space` на шаге вызывают `onSelectStep`, для `Space` дополнительно вызывается `preventDefault`, чтобы страница не скроллилась. Других клавиш компонент не перехватывает: между шагами ходят обычным `Tab` — каждый доступный шаг находится в таб-порядке.
- `:focus-visible` эмулируется вручную: класс подсветки ставится, только если фокус пришёл не после `mousedown`, — клик по шагу рамку не рисует.
- Кнопки прокрутки компонент рендерит сам и текста не хардкодит: доступного имени у них нет, поэтому они исключены из таб-порядка и не должны быть единственным способом добраться до шага.
- При смене `selectedStepId` лента прокручивается плавно (анимация по кадрам, `prefers-reduced-motion` не учитывается).

---

## Связанные компоненты

- `StepperExtended` — база: `Stepper` рендерит его и наследует его интерфейс (`IStepperProps extends Omit<IStepperExtendedProps, "children">`). Туда же уходят, когда нужен нестандартный состав шага.
- `StepperStep` — шаг ленты, доступен как `Stepper.Step` и `StepperExtended.Step`. Отдельного AI.md нет: через `Stepper` он настраивается полями элемента `steps`, вся его семантика описана выше.
- `StepperStepIcon` — иконка статуса шага: маппинг значения `EStepperStepIconType` (`FILLED`, `SUCCESS`, `WARNING`, `ERROR`, `WAIT`) в иконку из `@sberbusiness/icons-next`. Отдельного AI.md нет — это тривиальная обёртка с единственным prop `type`.
- `Step` — альтернативный визуальный паттерн шагов: нумерованный кружок с подписью и тултипом вместо ленты-стрелок.
- `CarouselExtended` — прокручиваемая лента, которую `Stepper` рендерит сам; ему же передаётся величина прокрутки одним кликом.
- `ButtonIcon` — кнопки прокрутки ленты, которые `Stepper` рендерит через render-props `buttonPrev` / `buttonNext` карусели.

---

## Stories

Основные истории: `stories/Stepper/Stepper.stories.tsx`
Файлы примеров: `stories/Stepper/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль размера, типа текущего шага, количества шагов, иконок и ширины контейнера |
| `Default` | `Default.tsx` | Минимальный набор: три шага, выбран второй |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG |
| `Types` | `Types.tsx` | Типы шага `NEUTRAL`, `ERROR`, `WARNING` |
| `WithIcons` | `WithIcons.tsx` | Все значения `EStepperStepIconType` на шагах |
| `ManySteps` | `ManySteps.tsx` | Шаги не помещаются в контейнер и прокручиваются |
| `VisualTests` | `VisualTests.tsx` | Размеры × состояния, отключённый шаг, типы, иконки, переполнение контейнера, `:focus-visible` на шаге (через `play`) |
| `StepperExtendedType` | — | Стори базового `StepperExtended`; живёт в этом файле до отдельной задачи по `StepperExtended` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-24 | Создан документ AI-ready для `Stepper` (TRI-84). |
| 2026-09-24 | AI-рефакторинг: подводка шага и кнопки прокрутки вынесены в чистые функции и отдельный компонент модульного уровня, величина прокрутки хранится одним числом вместо объекта, ссылки на узлы удалённых шагов больше не удерживаются, JSDoc проставлен на публичных полях `steps` и `size`. Публичный API (имена props, значения enum, barrel-экспорты) и разметка не изменились. Добавлены unit-тесты на состояния шагов, типы, клавиатуру, `forwardedRef`, `...rest` и подводку шага в видимую область; stories переписаны по modern pattern. |
| 2026-09-25 | Размер по умолчанию изменён с `LG` на `MD` по решению ревью — вместе со `StepperExtended`, чтобы компоненты не разъехались. Изменение наблюдаемое: без явного `size` шаги и кнопки прокрутки становятся меньше, описано в release notes 1.48.0. |
