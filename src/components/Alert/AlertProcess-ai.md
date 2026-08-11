---
component: AlertProcess
category: Alert
related: [AlertContext]
tokens:
    - --triplex-next-AlertProcess-Info_Background
    - --triplex-next-AlertProcess-Warning_Background
    - --triplex-next-AlertProcess-Error_Background
    - --triplex-next-AlertProcess-System_Background
    - --triplex-next-AlertProcess-Feature_Background
stories: stories/Alerts/AlertProcess.stories.tsx
version: "1.0"
---

# AlertProcess

## Назначение

Блочное процессное уведомление: цветной прямоугольник со скруглением, иконкой
по типу, произвольным контентом, опциональной кнопкой закрытия и опциональным
раскрывающимся блоком `AlertProcess.Spoiler`. Рендерится в `<div>`, никакой
ARIA-роли не выставляет.

Используй когда: нужно показать в потоке страницы заметное сообщение о
состоянии процесса — информация, предупреждение, ошибка, системное сообщение
или анонс новой фичи, — с возможностью добавить ссылку, кнопку-ссылку,
свернуть длинный текст в спойлер или дать пользователю закрыть сообщение.

Не используй когда: нужна короткая инлайновая подпись рядом с полем или
кнопкой — это `AlertContext`. Для всплывающих уведомлений поверх интерфейса —
`Notification`.

---

## Варианты и props

### AlertProcess

#### Обязательные props

| Prop   | Тип          | Описание                                                                                                            |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `type` | `EAlertType` | Тип предупреждения: `INFO` / `WARNING` / `ERROR` / `SYSTEM` / `FEATURE`. Определяет фон блока и иконку по умолчанию |

#### Опциональные props

| Prop                          | Тип                         | По умолчанию                   | Описание                                                                                                              |
| ----------------------------- | --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `closable`                    | `boolean`                   | `false`                        | Показывает кнопку закрытия в правом верхнем углу                                                                      |
| `onClose`                     | `() => void`                | —                              | Вызывается **после** того, как компонент скрыл себя. Аргументов не принимает, отменить закрытие нельзя                |
| `renderIcon`                  | `React.ReactNode`           | иконка по `type`               | Полностью заменяет иконку по умолчанию                                                                                |
| `borderRadius`                | `EAlertProcessBorderRadius` | `EAlertProcessBorderRadius.MD` | Скругление углов: `MD` (12px) / `LG` (24px)                                                                           |
| `children`                    | `React.ReactNode`           | —                              | Контент. Типографику задаёт потребитель компонентами `Typography` — сам `AlertProcess` размер и цвет текста не задаёт |
| `...HTMLDivElementAttributes` | —                           | —                              | Все стандартные атрибуты `<div>`                                                                                      |

### AlertProcess.Spoiler

Раскрывающийся блок внутри `AlertProcess`. **Полностью управляемый** — своего
состояния не хранит.

| Prop                          | Тип                       | По умолчанию | Описание                                                             |
| ----------------------------- | ------------------------- | ------------ | -------------------------------------------------------------------- |
| `open`                        | `boolean`                 | `undefined`  | Раскрыт ли блок. `undefined` трактуется как «закрыт»                 |
| `onOpen`                      | `(open: boolean) => void` | —            | Вызывается по клику на каретку со **следующим** значением (`!open`)  |
| `children`                    | `React.ReactNode`         | —            | Раскрываемое содержимое                                              |
| `...HTMLDivElementAttributes` | —                         | —            | Уходят на элемент раскрываемого контента — корневой элемент спойлера |

---

## Дизайн-токены

```text
--triplex-next-AlertProcess-Info_Background     // фон для type=INFO
--triplex-next-AlertProcess-Warning_Background  // фон для type=WARNING
--triplex-next-AlertProcess-Error_Background    // фон для type=ERROR
--triplex-next-AlertProcess-System_Background   // фон для type=SYSTEM
--triplex-next-AlertProcess-Feature_Background  // фон для type=FEATURE
```

Значения — в `src/components/DesignTokens/components/AlertProcess.ts`. Компонент
задаёт **только фон**: цвет и размер текста — зона ответственности `Typography`
у потребителя, цвет иконок — `paletteIndex` соответствующей иконки. Скругления
(12px / 24px) и внутренние отступы (16px) заданы литералами в
`styles/AlertProcess.module.less` — токенов для них нет.

---

## Инварианты

- **`forwardRef`** — обязателен и у `AlertProcess` (target — корневой
  `HTMLDivElement`), и у `AlertProcess.Spoiler` (target — корневой элемент
  спойлера, он же элемент раскрываемого контента, он же получатель `...rest`).
  Не убирать.
- **`AlertProcess.Spoiler` — статическое свойство, назначаемое через
  `Object.assign`.** Публичный путь доступа к спойлеру только такой:
  `AlertProcessSpoiler` не реэкспортируется из barrel `src/components/Alert/index.ts`.
- **`renderIcon` переопределяет иконку через `||`, а не `??`** — falsy-значение
  (`null`, `false`) означает «показать иконку по умолчанию». Поведение
  зафиксировано тестом `Should fall back to the default icon when renderIcon is falsy`
  и совпадает с `AlertContext`.
- **Закрытие необратимо и неуправляемо.** Внутренний `useState` `closed` не
  сбрасывается ни одним prop'ом. Не превращай его в контролируемый prop без
  согласования — это изменение публичного API.
- **Связь `AlertProcess` ↔ `AlertProcess.Spoiler` идёт через
  `AlertProcessContext`**, а не через `React.Children`. Поэтому спойлер может
  лежать на любой глубине внутри `AlertProcess`. Контекст не экспортируется.
- **CSS-классы `alertProcess`, `alertTypeInfo`, `alertTypeWarning`,
  `alertTypeError`, `alertTypeSystem`, `alertTypeFeature`, `md`, `lg`,
  `withSpoiler`, `expandableContent`, `expanded`** проверяются в unit-тестах —
  не переименовывать.
- **`ALERT_TYPE_TO_CLASS_NAME_MAP`** (`AlertTypeUtils.tsx`) — общий с
  `AlertContext` и экспортируется из barrel. Его форма
  (`Record<EAlertType, (styles) => string>`) — часть публичного API.
- **`EAlertType.FEATURE` поддерживается только здесь.** В `AlertContext` он
  исключён на уровне типа, но ветка `FEATURE` в общем маппинге существует
  именно ради `AlertProcess`.

---

## Подводные камни

- **Закрытие нельзя отменить и нельзя «переоткрыть» props'ами.** Клик по
  крестику сначала выставляет внутренний `closed`, затем зовёт `onClose`.
  Компонент возвращает `null` навсегда — даже если снять `closable`. Чтобы
  показать уведомление снова, потребитель должен размонтировать компонент и
  смонтировать заново (например, сменить `key`) либо не рендерить его вовсе,
  управляя видимостью у себя.
- **`AlertProcess.Spoiler` не переключается сам.** По клику он только зовёт
  `onOpen(!open)`. Без внешнего состояния каретка будет крутиться вхолостую —
  см. `examples/AlertProcess/WithSpoiler.tsx`.
- **Несколько спойлеров в одном `AlertProcess` не поддержаны.** `hasSpoiler` —
  булев флаг, а не счётчик: при размонтировании любого из спойлеров он
  сбрасывается в `false`, и класс `withSpoiler` (резерв высоты 40px под кнопку)
  пропадает, хотя второй спойлер ещё жив.
- **`AlertProcess.Spoiler` рендерит два соседних элемента без общей обёртки** —
  элемент раскрываемого контента (классы `expandableContent` / `expanded`) и
  блок кнопки раскрытия (`expandButton`). Кнопка не может лежать внутри
  контента: в свёрнутом состоянии тот скрыт (`max-height: 0; overflow: hidden`).
  Корневой элемент компонента — элемент контента, он и получает `className`,
  `ref` и `...rest`. `className` с 1.42.0 **мерджится** к собственным классам
  (раньше `{...rest}` шёл после `className` и полностью затирал их, ломая
  анимацию раскрытия).
- **Кнопка раскрытия позиционируется относительно корня `AlertProcess`**
  (`position: absolute; right: 16px; bottom: 16px` внутри
  `.alertProcess { position: relative }`), а не относительно самого спойлера.
  Класс `withSpoiler` даёт блоку `min-height: 40px`, чтобы кнопка не наехала на
  контент в свёрнутом состоянии.
- **Анимация раскрытия — `max-height: 0 → 1000px`.** Контент выше 1000px
  обрежется. Это осознанный CSS-компромисс ради transition; при необходимости
  показывать очень длинный текст спойлер не подходит.
- **`data-tx` выставляется после `{...rest}`** — потребитель не может его
  переопределить. Это общий паттерн семейства (так же в `AlertContext`).

---

## Accessibility

Компонент **не** реализует ARIA-контракт уведомления — это осознанное текущее
состояние, а не забытая деталь:

- Корневой элемент — обычный `<div>` без `role`. В отличие от `AlertContext`,
  live-region здесь нет: содержимое `AlertProcess` обычно объёмное, и
  `role="alert"` (assertive) зачитывал бы его целиком, прерывая пользователя.
  Если сообщение появляется динамически и должно быть озвучено — оберни
  `AlertProcess` собственным live-region'ом или продублируй суть в
  `AlertContext`.
- **Кнопка закрытия и кнопка раскрытия спойлера не имеют доступного имени.**
  Обе рендерятся через `ButtonIcon`, который требует `aria-label` от
  потребителя, но `AlertProcess` не даёт props для его проброса, а хардкодить
  русский текст внутри компонента запрещено (`docs/ai/codestyle.md` →
  «Мультиязычность»). Скринридер прочитает их как «кнопка». Закрыть эту дыру
  можно только новым публичным API (например, `closeButtonProps` /
  `spoilerButtonProps`) — это отдельная задача, breaking-изменением не является,
  но требует согласования.
- **`aria-expanded` на кнопке спойлера выставляется** (`Boolean(open)`), а
  **`aria-controls` — нет**: он требует стабильного `id` на элементе контента,
  а генерировать его нечем — `useId` недоступен, библиотека собирается и под
  React 17. Пробросить свой `id` можно через `...rest` спойлера, но связать его
  с кнопкой изнутри компонента сейчас нельзя. Скрытый контент при этом остаётся
  в DOM и доступен скринридеру всегда, независимо от `open`.
- Иконка типа декоративна и текстовой альтернативы не имеет: смысл сообщения
  должен целиком быть в `children`. Не полагайся на цвет фона и иконку как на
  единственный носитель информации о серьёзности.
- Собственных обработчиков клавиатуры у компонента нет — кнопки работают
  штатно (`Enter` / `Space`), фокус нигде не перехватывается и не возвращается.

---

## Связанные компоненты

- `AlertContext` — инлайновый вариант того же семейства: `<span>` с
  `role="alert"`, иконка + короткий текст, без фона и кнопок. Не поддерживает
  `EAlertType.FEATURE`.
- `AlertProcessSpoiler` — субкомпонент, доступный только как
  `AlertProcess.Spoiler`. Собственного AI.md не имеет, описан здесь.
- `EAlertType` — общий enum типов семейства. `AlertProcess` использует его целиком.
- `EAlertProcessBorderRadius` — enum скруглений, экспортируется из barrel.
- `ALERT_TYPE_TO_CLASS_NAME_MAP` (`AlertTypeUtils.tsx`) — общий с `AlertContext`
  маппинг типа в CSS-класс. Собственного AI.md не имеет.
- `ButtonIcon` — рендерит кнопки закрытия и раскрытия. Требует `aria-label`,
  который `AlertProcess` сейчас не пробрасывает (см. «Accessibility»).
- `Text`, `Link`, `Button` (тема `LINK`), `Gap` — типовое наполнение контента,
  см. examples.
- `StatusTrackerAlert` (`src/components/StatusTracker/components/StatusTrackerAlert.tsx`) —
  внутренний потребитель: оборачивает `AlertProcess`, подмешивая свой
  `className` и типизируясь тем же `IAlertProcessProps`. Любое изменение
  props `AlertProcess` затрагивает и его.
- `Notification` — всплывающее уведомление поверх интерфейса, а не блочное.

---

## Stories

Основные истории: `stories/Alerts/AlertProcess.stories.tsx`
Файлы примеров: `stories/Alerts/examples/AlertProcess/`

| Story            | Example file         | Что демонстрирует                                                     |
| ---------------- | -------------------- | --------------------------------------------------------------------- |
| `Playground`     | `Playground.tsx`     | Интерактивный контроль `type`, `closable`, `children`, `borderRadius` |
| `Default`        | `Default.tsx`        | Базовое предупреждение с типом `INFO`                                 |
| `Types`          | `Types.tsx`          | Все пять типов: `INFO` / `WARNING` / `ERROR` / `SYSTEM` / `FEATURE`   |
| `BorderRadius`   | `BorderRadius.tsx`   | Скругления `MD` и `LG`                                                |
| `WithCustomIcon` | `WithCustomIcon.tsx` | Замена иконки через `renderIcon`                                      |
| `Closable`       | `Closable.tsx`       | Кнопка закрытия и обработчик `onClose`                                |
| `WithButtonLink` | `WithButtonLink.tsx` | Композиция с `Button` темы `LINK`                                     |
| `WithLink`       | `WithLink.tsx`       | Композиция с `Link`                                                   |
| `WithSpoiler`    | `WithSpoiler.tsx`    | `AlertProcess.Spoiler` в свёрнутом состоянии с внешним состоянием     |
| `VisualTests`    | `VisualTests.tsx`    | Спойлер в раскрытом состоянии (`open`)                                |

Скриншот-тесты: baseline лежат в `__screenshots__/` как
`alerts-alertprocess--{default,types,border-radius,with-custom-icon,closable,with-spoiler,visual-tests}--{xs,xl}.png`.
Из скриншот-тестов исключены `Playground` (всегда, по `docs/ai/stories-guide.md`)
и `WithButtonLink` / `WithLink` — они визуально почти дублируют `Default`,
отличаясь только вложенной ссылкой.

Непокрытые визуальные кейсы: hover / focus кнопок закрытия и раскрытия,
комбинация `closable` + спойлер, перенос текста на много строк, контент выше
1000px (обрезается `max-height`).

---

## История изменений

| Дата       | Изменение                                                                                                                                                                                                                                                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-10 | Создан документ. AI-рефакторинг: `AlertProcessSpoiler` переведён на `forwardRef` и перестал затирать `className` собственными классами; из него убрана ссылка на несуществующий CSS-класс `styles.spoiler`; в `AlertProcess` убрано дублирующее присваивание `AlertProcess.Spoiler`, `renderIcon` приведён к `                                      |     | `как в`AlertContext`, добавлены JSDoc на props с дефолтами и явный `children`; из LESS удалено мёртвое правило `.alertTypeFeature .themeIcon { padding-top: 0 }`. Unit-тесты разбиты на `AlertProcess.test.tsx`и`AlertProcessSpoiler.test.tsx`и расширены с 11 до 34 кейсов. Stories переведены на modern pattern — файлы примеров без суффикса`Example`. Публичный API не изменён. |
| 2026-08-11 | По ревью PR #520: из `AlertProcessSpoiler` убрана пустая обёртка-`<div>` — контент и кнопка раскрытия стали соседними элементами, корневым элементом компонента стал элемент контента (он и раньше получал `className` / `ref` / `...rest`). На кнопке раскрытия выставлен `aria-expanded`. Тесты дополнены до 37 кейсов. Публичный API не изменён. |
