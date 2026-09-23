---
component: StepperExtended
category: Stepper
related: [Stepper, IconWrapper]
tokens:
  - Stepper.Step_Background_Default
  - Stepper.Step_Background_Hover
  - Stepper.Step_Background_Disabled
  - Stepper.Step_Background_Error
  - Stepper.Step_Background_Error_Hover
  - Stepper.Step_Background_Warning
  - Stepper.Step_Background_Warning_Hover
  - Stepper.Step_BorderColor_Success
  - Stepper.Step_BorderColor_Error
  - Stepper.Step_BorderColor_Warning
  - Stepper.Step_BorderColor_Focus
  - Stepper.Step_Color_Default
  - Stepper.Step_Color_Hover
  - Stepper.Step_Color_Disabled
stories: stories/Stepper/StepperExtended.stories.tsx
version: "1.0"
---

# StepperExtended

## Назначение

Базовый степпер — горизонтальная лента шагов-«стрелок», показывающая, где пользователь
находится в многошаговом сценарии. Сам компонент рендерит только `<ol role="tablist">` и
контекст (размер, выбранный шаг, обработчик выбора); состав ленты собирает потребитель из
`StepperExtended.Step`. Ни прокрутки, ни кнопок «назад/вперёд», ни автоматического
вычисления пройденных шагов здесь нет.

Используй когда: нужен полный контроль над списком шагов — разное содержимое шагов,
собственная прокрутка, шаги вперемешку с другой разметкой, нестандартная логика
«пройден / не пройден».

Не используй когда:

- достаточно массива шагов «лейбл + иконка» — возьми `Stepper`: он собран поверх
  `StepperExtended`, добавляет карусель с кнопками прокрутки и сам доводит выбранный шаг
  до видимой области;
- нужен вертикальный индикатор прогресса со статусами — это `StatusTracker`, не степпер;
- нужны табы-переключатели контента — возьми `Tabs` / `TabsExtended`.

---

## Состав (compound-компонент)

| Субкомпонент | Обязателен | Что делает |
|---|---|---|
| `StepperExtended.Step` (`StepperStep`) | Да | Один шаг: `<li role="button">` с содержимым, иконкой и декоративной стрелкой-границей справа. Обрабатывает клик, `Enter` / `Space` и подсветку фокуса |
| `StepperExtended.Step.Icon` (`StepperStepIcon`) | Нет | Готовая иконка статуса по `EStepperStepIconType`. Кладётся в prop `icon` шага. Экспортируется из пакета и отдельно — как `StepperStepIcon` |

Собственного AI.md у `StepperStep` и `StepperStepIcon` нет: из barrel
`src/components/Stepper/index.ts` `StepperStep` не экспортируется (он доступен только как
`StepperExtended.Step` / `Stepper.Step`), поэтому оба описаны здесь.

---

## Варианты и props

`IStepperExtendedProps` расширяет `React.HTMLAttributes<HTMLOListElement>` — неизвестные
компоненту атрибуты уходят на корневой `<ol>`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `onSelectStep` | `(id: string) => void` | Запрос на смену шага. Вызывается с `id` шага по клику и по `Enter` / `Space`. Вызывается и для уже выбранного шага — фильтровать повтор, если он не нужен, должен потребитель |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.LG` | Размер шагов: SM / MD / LG. Уходит в контекст, каждый шаг берёт его оттуда |
| `selectedStepId` | `string` | — | Id текущего шага. Компонент полностью управляемый, своего состояния выбора у него нет. Без значения ни один шаг не помечен выбранным |
| `forwardedRef` | `React.Ref<HTMLOListElement>` | — | Исторический способ получить ссылку на `<ol>`. Дублирует `ref`, оба заполняются одним и тем же элементом |

### Props шага (`StepperExtended.Step`)

`IStepperStepProps` расширяет `React.LiHTMLAttributes<HTMLLIElement>`.

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `id` | `string` | — | Обязателен. Сопоставляется с `selectedStepId` и приходит в `onSelectStep`. На `<li>` как DOM-атрибут **не попадает** — искать шаг через `document.getElementById` нельзя |
| `type` | `EStepperStepType` | — | Обязателен. `NEUTRAL` / `ERROR` / `WARNING` — цвет заливки шага |
| `disabled` | `boolean` | `false` | Шаг не выбирается ни мышью, ни с клавиатуры |
| `isInActiveStep` | `boolean` | `false` | Шаг ещё не пройден |
| `icon` | `React.ReactNode` | — | Иконка слева от содержимого. Обычно `StepperStepIcon` |
| `forwardedRef` | `React.Ref<HTMLLIElement>` | — | Ссылка на `<li>`. У шага это **единственный** способ получить элемент: `StepperStep` объявлен как `React.FC` и обычный `ref` не принимает |

### Три визуальных состояния шага и как они выводятся

Состояние шага компонент не вычисляет — он выводит его из пары «`id === selectedStepId`»
и prop `isInActiveStep`:

| Условие | Класс | Смысл |
|---|---|---|
| `id === selectedStepId` | `active` | Текущий шаг. Подсвечен рамкой `Step_BorderColor_Success`, курсор `default` |
| `isInActiveStep` | `inactive` | Шаг ещё не пройден: приглушённый текст |
| иначе | `completed` | Шаг пройден |

Отсюда главное ограничение: **`isInActiveStep` проставляет потребитель**. Если его не
передать, все невыбранные шаги окажутся «пройденными». `Stepper` делает это за вас
(`index > selectedIndex`), при ручной сборке на `StepperExtended` это ваша работа.

`type` (`ERROR` / `WARNING`) действует поверх любого из трёх состояний, но игнорируется
у шага с `disabled`.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Stepper.ts`.

У корневого `<ol>` собственного оформления нет: он задаёт только `display: flex` и
сбрасывает маркеры списка. Все перечисленные токены применяет `StepperExtended.Step`;
группа `Stepper` общая со `Stepper`, поэтому переименование токена ломает оба компонента
сразу.

```text
Stepper.Step_Background_Default
Stepper.Step_Background_Hover
Stepper.Step_Background_Disabled
Stepper.Step_Background_Error
Stepper.Step_Background_Error_Hover
Stepper.Step_Background_Warning
Stepper.Step_Background_Warning_Hover
Stepper.Step_BorderColor_Success
Stepper.Step_BorderColor_Error
Stepper.Step_BorderColor_Warning
Stepper.Step_BorderColor_Focus
Stepper.Step_Color_Default
Stepper.Step_Color_Hover
Stepper.Step_Color_Disabled
```

Токены `Stepper.ButtonWrapper_Background_Prev` и `Stepper.ButtonWrapper_Background_Next`
в эту группу входят, но относятся к кнопкам прокрутки `Stepper` — `StepperExtended` их не
использует.

---

## Инварианты

- `forwardRef` на `StepperExtended` — не убирать. Ref указывает на корневой `<ol>`, то есть
  на тот же элемент, который получает `className` и `...rest`.
- Prop `forwardedRef` остаётся в публичном API и заполняется тем же элементом, что и `ref`.
  Удалить его — breaking change: на нём построен проброс ссылки из `Stepper`, который
  передаёт в `StepperExtended` весь свой `...restProps`.
- `StepperExtended` — `forwardRef`-компонент со статическим свойством `Step`. Набор
  статических свойств — часть публичного API; у `Step`, в свою очередь, статическое `Icon`.
- Корневой элемент — `<ol>`. Шаги обязаны быть `<li>`, то есть `StepperExtended.Step`:
  произвольный узел сломает валидность списка.
- `role="tablist"` стоит **до** `...rest` — потребитель может его переопределить.
  Значение по умолчанию сохранено из v0 ради обратной совместимости и не соответствует
  ARIA-контракту табов (`tablist` ожидает детей `role="tab"`, а шаги используют
  `role="button"`). Менять роль по умолчанию — breaking change в accessibility-контракте,
  отдельная задача.
- Значение контекста мемоизировано (`useMemo`). Возврат к пересозданию объекта на каждый
  рендер вернёт перерисовку всех шагов на любое обновление родителя.
- `StepperExtendedContext` через barrel не экспортируется — форма контекста внутренняя
  деталь, на неё нельзя опираться снаружи.
- Компонент управляемый: он не хранит `selectedStepId` и не меняет его сам. Если
  `onSelectStep` не обновляет состояние потребителя, визуально ничего не произойдёт.
- `StepperStep` пока объявлен как `React.FC` и принимает ссылку только через
  `forwardedRef` — на `forwardRef` он ещё не переведён.

---

## Accessibility

- Корневой элемент — `<ol>` с `role="tablist"` (см. инварианты: роль исторически
  не совпадает с ролями детей).
- Каждый шаг — `<li role="button">` с `tabIndex=0`, то есть попадает в порядок обхода
  клавиатурой. Шаг с `disabled` получает `tabIndex=-1` и `aria-disabled="true"` и
  из обхода выпадает.
- Выбранный шаг помечен `aria-current="true"`; у остальных атрибута нет.
- Клавиатура: `Enter` и `Space` выбирают шаг, `Space` дополнительно гасит прокрутку
  страницы (`preventDefault`). Стрелками шаги не переключаются — roving tabindex у
  компонента нет.
- Подсветка фокуса — только при клавиатурной навигации: шаг запоминает источник фокуса
  (`EFocusSource`) и добавляет рамку `Step_BorderColor_Focus` лишь если фокусу не
  предшествовал `mousedown`.
- Компонент не хардкодит текст. Если содержимое шага не текстовое (только иконка),
  доступное имя (`aria-label`) задаёт потребитель — библиотека мультиязычная.
- Связь шага с панелью контента (`aria-controls`, `id` панели) компонент не выставляет:
  это на стороне потребителя.

---

## Связанные компоненты

**Части составного компонента:**

- `StepperStep` (`StepperExtended.Step`) — шаг ленты: состояния, клик, клавиатура,
  подсветка фокуса, стрелка-граница справа (`StepperStepArrowBorder`, внутренний).
  Из barrel не экспортируется.
- `StepperStepIcon` — набор готовых иконок статуса (`FILLED`, `SUCCESS`, `WARNING`,
  `ERROR`, `WAIT`) для prop `icon`. Экспортируется из пакета, своей логики кроме
  `switch` по типу не имеет.

**Соседние компоненты:**

- `Stepper` — готовый степпер поверх `StepperExtended`: принимает массив `steps`, сам
  считает `isInActiveStep`, оборачивает ленту в `CarouselExtended` с кнопками прокрутки
  и доводит выбранный шаг до видимой области. Первый выбор для типовой задачи.
- `CarouselExtended` — горизонтальная прокручиваемая лента; в `Stepper` и в примере
  `Example` именно она даёт степперу прокрутку. Зависимости от неё у `StepperExtended` нет.
- `IconWrapper` — им шаг оборачивает `icon`, чтобы приглушить иконку в состоянии
  `disabled`.

---

## Stories

Основные истории: `stories/Stepper/StepperExtended.stories.tsx`
Файлы примеров: `stories/Stepper/examples/StepperExtended/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль размера, выбранного шага, иконок и недоступного шага |
| `Default` | `Default.tsx` | Минимальная лента из четырёх шагов с вычислением `isInActiveStep` |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG |
| `Types` | `Types.tsx` | Типы шага `NEUTRAL` / `ERROR` / `WARNING` |
| `States` | `States.tsx` | Четыре состояния шага рядом: пройден, недоступен, выбран, не пройден |
| `WithIcons` | `WithIcons.tsx` | Все типы `StepperStepIcon` в шагах |
| `Example` | `Example.tsx` | Production-like: лента из 12 шагов в `CarouselExtended` с кнопками прокрутки |
| `VisualTests` | `VisualTests.tsx` | Размеры × типы со всеми состояниями шага и `:focus-visible` на первом шаге (через `play`) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-23 | Создан документ AI-ready для `StepperExtended` (TRI-85). |
| 2026-09-23 | AI-рефакторинг: компонент переведён с `React.FC` на `forwardRef` (prop `forwardedRef` сохранён и заполняется тем же элементом), появился `displayName`, статическое `Step` подключается через `Object.assign`. JSDoc проставлен на всех публичных props. Добавлены unit-тесты и stories по modern pattern. Публичный API (имена props, значения enum, barrel-экспорты) не изменён. |
