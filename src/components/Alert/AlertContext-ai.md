---
component: AlertContext
category: Alert
related: [AlertProcess]
tokens:
    - --triplex-next-AlertContext-Info_Color
    - --triplex-next-AlertContext-Warning_Color
    - --triplex-next-AlertContext-Error_Color
    - --triplex-next-AlertContext-System_Color
stories: stories/Alerts/AlertContext.stories.tsx
version: "1.0"
---

# AlertContext

## Назначение

Инлайновое контекстное предупреждение: строка «иконка + короткий текст», которая
поясняет или уточняет соседний элемент интерфейса. Рендерится в `<span>` с
`role="alert"`, иконка выбирается автоматически по `type`, текст оборачивается в
`Text` с размером `ETextSize.B4`.

Используй когда: нужно дать пояснение, предупреждение или сообщение об ошибке
рядом с полем, кнопкой или блоком контента — без рамки, фона и кнопки закрытия.

Не используй когда: нужен полноценный блок-уведомление с фоном, скруглением,
ссылками, спойлером и кнопкой закрытия — это `AlertProcess`. Для всплывающих
уведомлений поверх интерфейса — `Notification`.

---

## Варианты и props

### Обязательные props

| Prop   | Тип                                       | Описание                                                                                                     |
| ------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `type` | `Exclude<EAlertType, EAlertType.FEATURE>` | Тип предупреждения: `INFO` / `WARNING` / `ERROR` / `SYSTEM`. Определяет и иконку по умолчанию, и цвет текста |

### Опциональные props

| Prop                           | Тип               | По умолчанию     | Описание                                                                   |
| ------------------------------ | ----------------- | ---------------- | -------------------------------------------------------------------------- |
| `renderIcon`                   | `React.ReactNode` | иконка по `type` | Полностью заменяет иконку по умолчанию                                     |
| `children`                     | `React.ReactNode` | —                | Текст предупреждения. Всегда оборачивается в `Text`, наружу не «протекает» |
| `...HTMLSpanElementAttributes` | —                 | —                | Все стандартные атрибуты `<span>`                                          |

### Ограничения по типам

- `EAlertType.FEATURE` **не поддерживается** и исключён на уровне типа
  (`Exclude<EAlertType, EAlertType.FEATURE>`). Класса `.alertTypeFeature` в
  `AlertContext.module.less` нет — общий `ALERT_TYPE_TO_CLASS_NAME_MAP` содержит
  ветку `FEATURE` только ради `AlertProcess`. Если обойти типизацию (`as`) и
  передать `FEATURE`, компонент отрендерится без иконки и без цветового класса.
- Иконки по умолчанию фиксированы: `InfoStrokeStsIcon16` (`paletteIndex={3}`),
  `WarningStrokeStsIcon16` (`2`), `ErrorStrokeStsIcon16` (`1`),
  `SystemStrokeStsIcon16` (`4`). Менять `paletteIndex` нельзя — они согласованы
  с цветовыми токенами.

---

## Дизайн-токены

```text
--triplex-next-AlertContext-Info_Color     // цвет текста для type=INFO
--triplex-next-AlertContext-Warning_Color  // цвет текста для type=WARNING
--triplex-next-AlertContext-Error_Color    // цвет текста для type=ERROR
--triplex-next-AlertContext-System_Color   // цвет текста для type=SYSTEM
```

Значения — в `src/components/DesignTokens/components/AlertContext.ts`. Обрати
внимание: `Info_Color`, `Warning_Color` и `System_Color` ссылаются на один и тот
же нейтральный цвет (`ColorDarkNeutralAlpha.0` / `ColorNeutralAlpha.0`),
выделен цветом только `Error_Color`. Типы различаются прежде всего иконкой, а не
цветом текста.

Размеры шрифта токенами не задаются — типографику целиком определяет `Text`
с `ETextSize.B4` (класс `.b4` в `Typography/styles/Text.module.less`).

---

## Инварианты

- **`forwardRef`** — обязателен, target — `HTMLSpanElement`. Не убирать.
- **Корневой элемент `<span>` с `role="alert"`** — не менять ни тег, ни роль.
  Тег `<span>` выбран ради валидности вложения в инлайновый контекст, но
  `display: flex` делает элемент **блочным** flex-контейнером: из текстового
  потока он выпадает. Не рассчитывай на инлайновое обтекание.
- **`type` исключает `EAlertType.FEATURE`** — сужение типа публичное, расширять
  без добавления стилей и иконки нельзя.
- **`renderIcon` переопределяет иконку через `||`, а не `??`** — намеренно:
  falsy-значение (`false`, `null`) означает «показать иконку по умолчанию». Замена
  на `??` изменит поведение для `renderIcon={false}`.
- **CSS-классы `alertContext`, `alertContextText`, `alertTypeInfo`,
  `alertTypeWarning`, `alertTypeError`, `alertTypeSystem`** — проверяются в
  unit-тестах, не переименовывать.
- **`Text` получает только `size` и `className`** — никакого `type`. Цвет —
  зона ответственности `AlertContext`, см. «Подводные камни». Тест
  `does not set the mapped Typography font type class on text` охраняет это
  правило. В DOM класс `primary` при этом присутствует: `Text` подставляет
  `EFontType.PRIMARY` по умолчанию — на цвет он не влияет, его перекрывает
  локальное правило.
- **`ALERT_TYPE_TO_CLASS_NAME_MAP`** (`AlertTypeUtils.tsx`) — общий с
  `AlertProcess` и экспортируется из barrel. Его форма (`Record<EAlertType,
(styles) => string>`) — часть публичного API, менять нельзя без breaking change.

---

## Подводные камни

- **Цвет текста задаётся локальным правилом, а `type` у `Text` намеренно не
  передаётся.** Цвет берётся из `.alertContext.alertTypeX .alertContextText`
  (токены `AlertContext-*`). Раньше компонент дополнительно передавал в `Text`
  вычисленный `EFontType`, но это было мёртвым кодом: локальное правило имеет
  специфичность (0,3,0) и всегда перекрывает `.typography.info` (0,2,0) из
  `Typography.module.less`. Хуже того, значения расходились — см. таблицу ниже.
  Не возвращай `type` у `Text`: цвет от этого не изменится, но код начнёт
  документировать неверное намерение. Обратное тоже неверно — не убирай
  LESS-правила «раз цвет и так задаёт `Text`»: тогда текст станет `primary`.

  | `type` | `AlertContext-*` (действует) | `Typography-*` (не действует) |
  |---|---|---|
  | `INFO` | нейтральный `rgba(31,31,34,1)` / `rgba(255,255,255,1)` | синий `#0E57CC` / `#1297FE` |
  | `WARNING` | нейтральный, те же значения | оранжевый `#EF4C01` / `#FF7A17` |
  | `ERROR` | `#D10032` / `#F80C45` | `#D10032` / `#F80C45` — совпадает |
  | `SYSTEM` | нейтральный, альфа `1` | `SECONDARY`: альфа `.65` / `.55` |

- **Из `.alertContext` удалены `font-size: 12px` / `line-height: 16px`**
  (2026-07-27) как мёртвые правила: типографику текста задаёт `Text` через
  класс `.b4` на самом текстовом элементе, а собственное объявление потомка
  всегда бьёт наследуемое от родителя. На иконки влияния не было — они
  рендерятся как `<svg width="16" height="16">` с px-атрибутами.
  **Остаточный риск:** если потребитель передаёт в `renderIcon` не-svg элемент
  с текстом, его типографика после удаления изменится — раньше он наследовал от
  `.alertContext` 12px/16px, теперь наследует размер шрифта родителя страницы.
  Штатный сценарий (`renderIcon` = иконка из `@sberbusiness/icons-next`) не
  затронут.
- **`role="alert"` присутствует в DOM с момента монтирования.** Live-region,
  добавленный в дерево вместе со своим содержимым, скринридеры часто не
  анонсируют. Если нужно гарантированное озвучивание при динамическом появлении
  сообщения — держи `AlertContext` смонтированным и меняй `children`, а не
  монтируй компонент целиком.

---

## Accessibility

- Корневой `<span>` имеет `role="alert"` — это `aria-live="assertive"` region:
  изменение содержимого прерывает текущую речь скринридера.
- Иконка декоративная и не имеет текстовой альтернативы — весь смысл должен
  быть в `children`. Не полагайся на цвет и иконку как на единственный носитель
  информации о серьёзности сообщения.
- Компонент неинтерактивен: не получает фокус, не обрабатывает клавиатуру,
  собственных `aria-*` атрибутов сверх `role` не выставляет. Любые `aria-label`
  / `aria-describedby` пробрасываются через `...rest`.
- При связывании с полем формы передавай `id` и ссылайся на него из поля через
  `aria-describedby`.

---

## Связанные компоненты

- `AlertProcess` — блочное уведомление того же семейства: фон, скругление,
  кнопка закрытия, спойлер, ссылки. Поддерживает `EAlertType.FEATURE`.
- `EAlertType` — общий enum типов для всего семейства. `AlertContext`
  использует его подмножество.
- `ALERT_TYPE_TO_CLASS_NAME_MAP` (`AlertTypeUtils.tsx`) — общий маппинг типа в
  CSS-класс, разделяемый с `AlertProcess`. Собственного AI.md не имеет.
- `Text` — рендерит текст предупреждения (`ETextSize.B4`). Цвет им не
  управляется: prop `type` намеренно не передаётся.
- `Notification` — всплывающее уведомление поверх интерфейса, а не инлайновое.

---

## Stories

Основные истории: `stories/Alerts/AlertContext.stories.tsx`
Файлы примеров: `stories/Alerts/examples/AlertContext/`

| Story            | Example file         | Что демонстрирует                                                |
| ---------------- | -------------------- | ---------------------------------------------------------------- |
| `Playground`     | `Playground.tsx`     | Интерактивный контроль `type` и `children`                       |
| `Default`        | `Default.tsx`        | Базовое предупреждение с типом `INFO`                            |
| `Types`          | `Types.tsx`          | Все поддерживаемые типы: `INFO` / `WARNING` / `ERROR` / `SYSTEM` |
| `WithCustomIcon` | `WithCustomIcon.tsx` | Замена иконки через `renderIcon`                                 |

Скриншот-тесты: baseline лежат в `__screenshots__/` как
`alerts-alertcontext--{default,types,with-custom-icon}--{xs,xl}.png`.
`Playground` исключён из скриншот-тестов через `testRunner: { skip: true }`
(по `docs/ai/stories-guide.md` — всегда), его визуальная регрессия не покрыта.
Устаревшие `alerts-alertcontext--playground--{xs,xl}.png` удалены: скрипт
`scripts/checkOrphanScreenshots.ts` такие файлы не ловит — `parameters` нет в
`storybook-static/index.json`, поэтому skip-стори считаются ожидаемыми.
Отдельная `VisualTests` story не создавалась — у компонента нет состояний,
требующих взаимодействия (hover / focus / disabled / loading отсутствуют).
Непокрытый визуальный кейс — перенос текста на несколько строк.

---

## История изменений

| Дата       | Изменение                                                                                                                                                                                                                                                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-07-27 | Создан документ. AI-рефакторинг: switch иконок заменён на `TYPE_TO_DEFAULT_ICON_MAP`, в `IAlertContextProps` добавлен явный `children`, из `.alertContext` удалены мёртвые `font-size` / `line-height`, из `Text` убран prop `type` вместе с маппингом `EFontType` (перекрывался специфичностью и расходился по значениям с токенами `AlertContext-*`). Unit-тесты расширены с 6 до 25 кейсов. Файлы примеров в `stories/Alerts/examples/AlertContext/` переименованы под modern pattern — без суффикса `Example`. Публичный API не менялся. |
