---
component: CardAction
category: Card
related: [CardStatic]
tokens:
  - Card.Action_General_Background
  - Card.Action_General_Background_Hover
  - Card.Action_General_Background_Selected
  - Card.Action_General_Background_Selected_Hover
  - Card.Action_Secondary_Background
  - Card.Action_Secondary_Background_Hover
  - Card.Action_Secondary_Background_Selected
  - Card.Action_Secondary_Background_Selected_Hover
  - Card.Shadow_Default
  - Card.Shadow_Hover
  - Card.Shadow_Selected
  - Card.Shadow_Selected_Hover
  - Card.Shadow_Focus
  - Card.Static_General_Background
  - Card.Static_Secondary_Background
stories: stories/Cards/CardAction.stories.tsx
version: "1.0"
---

# CardAction

## Назначение

Интерактивная карточка: кликабельный контейнер с состоянием «выбрана / не выбрана»,
клавиатурной активацией и собственной обводкой фокуса. Контент собирается из составных
частей `CardAction.Media` и `CardAction.Content`.

Используй когда: карточка сама является элементом выбора или действия — плитка тарифа,
продукта, способа оплаты, выбираемый вариант в списке карточек.
Не используй когда: карточка только показывает информацию и не реагирует на клик — возьми
`CardStatic` (у него нет `role="button"`, `tabIndex` и состояния выбора). Для одиночного
действия внутри информационной карточки положи `Button` в `CardStatic.Content.Footer`,
а не делай кликабельной всю карточку.

---

## Варианты и props

### Темы (`ECardTheme`)

| Значение | Описание |
|---|---|
| `GENERAL` | Основная карточка (по умолчанию): фон + тень, при выборе — внутренняя обводка |
| `SECONDARY` | Карточка на светлой подложке: в покое без внешней тени, состояния передаются фоном |

### Размеры скругления (`ECardRoundingSize`)

| Значение | Радиус |
|---|---|
| `SM` | 8px |
| `MD` | 16px (по умолчанию) |
| `LG` | 24px |

Скругление задаётся на корневом элементе и наследуется обводкой фокуса/выбора, поэтому
переопределять `border-radius` снаружи не нужно.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `theme` | `ECardTheme` | `GENERAL` | Тема оформления |
| `roundingSize` | `ECardRoundingSize` | `MD` | Размер скругления |
| `selected` | `boolean` | — | Состояние выбора в контролируемом режиме. Контролируемый режим включает значение `!== undefined` при монтировании, а не сам факт передачи prop'а: `selected={undefined}` — это неконтролируемый режим |
| `toggle` | `(selected: boolean) => void` | — | Запрос на смену состояния в контролируемом режиме; вызывается со следующим значением |
| `onToggle` | `(selected: boolean) => void` | — | Уведомление о состоявшейся смене состояния; вызывается с новым значением |
| `...HTMLDivAttributes` | — | — | Любые атрибуты `<div>`, включая `aria-*` и `data-*`. `onClick`, `onMouseDown`, `onKeyDown`, `onFocus`, `onBlur` не заменяют собственные обработчики компонента, а вызываются перед ними |

### Контролируемый и неконтролируемый режимы

Режим определяется **один раз при монтировании** по `selected !== undefined` и дальше не
меняется. Передать `selected` только на части жизненного цикла нельзя — компонент
запомнит режим из первого рендера.

- **Неконтролируемый** (`selected` при монтировании равен `undefined` — не передан вовсе
  либо передан как `selected={undefined}`): состояние выбора хранится внутри. Клик,
  `Enter` и `Space` переключают его, после чего вызывается `onToggle(новоеЗначение)`.
  `toggle` в этом режиме не вызывается никогда. Начальное состояние — «не выбрана»;
  отдельного prop'а вида `defaultSelected` нет.
- **Контролируемый** (`selected` при монтировании `!== undefined`): компонент сам состояние
  не меняет. Клик,
  `Enter` и `Space` вызывают `toggle(!selected)` — потребитель обязан обновить `selected`,
  иначе вид карточки не изменится. `onToggle` здесь вызывается **не по клику**, а
  на изменение самого prop'а `selected` — в том числе когда состояние поменяли снаружи, без
  участия карточки.

Оговорка про `onToggle` на смену prop'а: она живёт в `componentDidUpdate` и срабатывает
на любое изменение `selected`, **без проверки режима**. Поэтому у карточки, смонтированной
неконтролируемой, поздний переход `selected` с `undefined` на `true`/`false` тоже вызовет
`onToggle` — хотя режим остаётся неконтролируемым и внутреннее состояние выбора от этого
не меняется. Сценарий редкий (обычно `selected` у неконтролируемой карточки не появляется),
но при `selected={условие ? x : undefined}` он достижим.

### Составные части

| Часть | Назначение |
|---|---|
| `CardAction.Media` | Медийная область вверху карточки. Собственных props нет: изображение задаётся через `style`/`className`, высота — потребителем |
| `CardAction.Content` | Контентная область; prop `paddingSize` (`ECardContentPaddingSize`: `SM` — 16px, `MD` — 24px, по умолчанию `MD`) |
| `CardAction.Content.Header` | Заголовок, отступ 16px снизу |
| `CardAction.Content.Body` | Тело, растягивается на свободную высоту |
| `CardAction.Content.Footer` | Подвал, отступ 16px сверху |

Части — общие с `CardStatic` (`CardStatic.Content` и `CardAction.Content` — один и тот же
компонент), поэтому их правки затрагивают оба вида карточек.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Card.ts`.

Паттерн: `Card.Action_{Theme}_Background_{State}` для фона и `Card.Shadow_{State}` для теней.

```text
Card.Action_General_Background
Card.Action_General_Background_Hover
Card.Action_General_Background_Selected
Card.Action_General_Background_Selected_Hover
Card.Action_Secondary_Background
Card.Action_Secondary_Background_Hover
Card.Action_Secondary_Background_Selected
Card.Action_Secondary_Background_Selected_Hover
Card.Shadow_Default
Card.Shadow_Hover
Card.Shadow_Selected
Card.Shadow_Selected_Hover
Card.Shadow_Focus
```

Тени выбора и фокуса рисуются не на самом элементе, а на псевдоэлементе `::before` через
внутреннюю CSS-переменную `--card-inner-shadow`. У `::before` стоит `z-index: 10`, чтобы
внутренняя обводка ложилась поверх фона `CardAction.Media`: inset-тень на самом корне была бы
перекрыта фонами дочерних элементов. `pointer-events: none` там же не даёт псевдоэлементу
перехватывать клики. Корневой элемент интерактивной карточки дополнительно несёт общий класс из
`styles/Card.module.less` (лейаут, скругление), а её собственные состояния — выбор, hover и
фокус — задаются токенами `Card.Action_*` и `Card.Shadow_*`.

Базовый фон в покое — единственное место, где правила двух модулей пересекаются: общий класс
темы из `Card.module.less` задаёт `Card.Static_*_Background` с той же специфичностью (0,2,0),
что и `Card.Action_*_Background`, поэтому победитель зависит от порядка инъекции CSS. На
состояния это не влияет — у них специфичность выше. Не опирайся на конкретный источник
базового фона; если нужно поменять его, правь оба модуля согласованно.

---

## Инварианты

- `CardAction` — **классовый компонент без `forwardRef`**. `ref` на нём даёт экземпляр класса,
  а не DOM-элемент. Это часть публичного API: перевод на функциональный компонент
  с `forwardRef` сменит ref-target и является breaking change.
  Все `handle*`-методы (`handleClick`, `handleMouseDown`, `handleKeyDown`, `handleFocus`,
  `handleBlur`, `handleToggle`) объявлены `public` и вместе с ref-экземпляром входят
  в наблюдаемую поверхность API — сужение до `private` тоже breaking change.
- Корневой элемент — `<div>` с `role="button"` и `tabIndex={0}`. И роль, и `tabIndex`
  выставляются до `...attributes`, поэтому потребитель может их переопределить.
- Имена props (`selected`, `toggle`, `onToggle`, `theme`, `roundingSize`), значения
  `ECardTheme` / `ECardRoundingSize` / `ECardContentPaddingSize` и barrel-экспорты
  `src/components/Card/index.ts` — публичный API, не переименовывать.
- Статические свойства `CardAction.Content` и `CardAction.Media` — часть публичного API.
- Составные части (`CardMedia`, `CardContent`, `CardContent.Header/Body/Footer`) объявлены
  как `React.FC` и **`ref` не пробрасывают** — переданный им `ref` молча теряется, DOM-узел
  через него не получить. Не пиши на них тест вида
  `expect(ref.current).toBeInstanceOf(HTMLDivElement)` — он упадёт. Файлы частей общие
  с `CardStatic`, поэтому добавление им `forwardRef` — отдельная задача на семейство Card,
  а не правка в рамках `CardAction`.
- CSS-классы `selected` и `focusVisible` используются unit-тестами — не переименовывать
  без синхронной правки тестов.
- Режим (контролируемый / неконтролируемый) фиксируется при монтировании — не превращать
  в вычисление на каждый рендер без обсуждения: это изменит наблюдаемое поведение.

---

## Accessibility

- Роль `button` и `tabIndex={0}` на корневом `<div>` — карточка попадает в tab-порядок и
  анонсируется как кнопка.
- Клавиатура: `Enter` и `Space` переключают состояние выбора. Для `Space` вызывается
  `preventDefault()`, чтобы страница не прокручивалась; для `Enter` — нет.
- Обводка фокуса показывается **только при клавиатурном фокусе**: компонент отслеживает
  источник фокуса (`EFocusSource`) — после `mousedown` фокус считается мышиным и класс
  `focusVisible` не выставляется. Нативный `outline` погашен, видимый фокус даёт токен
  `Card.Shadow_Focus`.
- Компонент **не выставляет `aria-pressed`** и не хардкодит текстов (библиотека
  мультиязычная). Если карточка работает как переключатель, потребитель передаёт
  `aria-pressed={selected}` (и при необходимости `aria-label`) сам — они попадут на корневой
  элемент через `...attributes`.
- Интерактивные элементы внутри карточки (кнопка в `Footer`, ссылка в `Body`) получают клик
  раньше карточки, но событие всплывает — карточка переключится тоже. Если это не нужно,
  вызывай `event.stopPropagation()` в обработчике вложенного элемента.

---

## Связанные компоненты

- `CardStatic` — статичная карточка: тот же лейаут и те же составные части, но без
  состояния выбора, роли `button` и клавиатурной активации.
- `CardContent` (`CardAction.Content`) — контентная область карточки с `paddingSize`;
  отдельного AI.md нет, описана выше в «Составных частях».
- `CardMedia` (`CardAction.Media`) — медийная область; принимает `className` и `...rest`,
  но **не `ref`** (см. «Инварианты»), отдельного AI.md нет.

---

## Stories

Основные истории: `stories/Cards/CardAction.stories.tsx`
Файлы примеров: `stories/Cards/examples/CardAction/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный подбор `theme`, `roundingSize` и `paddingSize` |
| `Default` | `DefaultExample.tsx` | Минимальная карточка с заголовком и телом в контролируемом режиме |
| `Themes` | `ThemesExample.tsx` | Темы `GENERAL` и `SECONDARY` |
| `PaddingSizes` | `PaddingSizesExample.tsx` | Внутренние отступы контента `SM` и `MD` |
| `RoundingSizes` | `RoundingSizesExample.tsx` | Скругления `SM`, `MD`, `LG` |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: выбранное состояние в обеих темах и клавиатурный фокус (через `play`) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-10 | Создан документ |
