---
component: CardStatic
category: Card
related: [CardAction]
tokens:
  - Card.Static_General_Background
  - Card.Static_Secondary_Background
stories: stories/Cards/CardStatic.stories.tsx
version: "1.0"
---

# CardStatic

## Назначение

Статичная карточка: информационный контейнер со скруглением, фоном темы и
вертикальным лейаутом. Содержимое собирается из составных частей `CardStatic.Media`
и `CardStatic.Content`.

Используй когда: нужно сгруппировать информацию в карточку — сводка по счёту, блок
с иллюстрацией и текстом, плитка с описанием и кнопкой в подвале.
Не используй когда: сама карточка должна быть элементом выбора или действия — возьми
`CardAction` (у него есть `role="button"`, `tabIndex`, клавиатурная активация и
состояние выбора). Для одиночного действия внутри информационной карточки положи
`Button` в `CardStatic.Content.Footer`, а не превращай карточку в кликабельную.

---

## Варианты и props

### Темы (`ECardTheme`)

| Значение | Описание |
|---|---|
| `GENERAL` | Основная карточка (по умолчанию): фон для размещения на подложке страницы |
| `SECONDARY` | Карточка на светлой подложке: более тёмный фон, чтобы отделиться от неё |

Тема задаёт только фон. Тени, hover и состояния выбора у статичной карточки
отсутствуют — это отличие от `CardAction`.

### Размеры скругления (`ECardRoundingSize`)

| Значение | Радиус |
|---|---|
| `SM` | 8px |
| `MD` | 16px (по умолчанию) |
| `LG` | 24px |

Скругление задаётся на корневом элементе, у которого стоит `overflow: hidden`, поэтому
фон `CardStatic.Media` обрезается по тому же радиусу — переопределять `border-radius`
у частей не нужно.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `theme` | `ECardTheme` | `GENERAL` | Тема оформления |
| `roundingSize` | `ECardRoundingSize` | `MD` | Размер скругления |
| `...HTMLDivAttributes` | — | — | Любые атрибуты `<div>`, включая `aria-*`, `data-*` и обработчики. Собственных обработчиков у компонента нет, поэтому переданные не конкурируют ни с чем |

Своего состояния у компонента нет: весь вывод — производная от props.

### Составные части

| Часть | Назначение |
|---|---|
| `CardStatic.Media` | Медийная область вверху карточки. Собственных props нет: изображение задаётся через `style`/`className`, высота — потребителем |
| `CardStatic.Content` | Контентная область; prop `paddingSize` (`ECardContentPaddingSize`: `SM` — 16px, `MD` — 24px, по умолчанию `MD`) |
| `CardStatic.Content.Header` | Заголовок, отступ 16px снизу |
| `CardStatic.Content.Body` | Тело, растягивается на свободную высоту |
| `CardStatic.Content.Footer` | Подвал, отступ 16px сверху |

Части — общие с `CardAction` (`CardStatic.Content` и `CardAction.Content` — один и тот же
компонент), поэтому их правки затрагивают оба вида карточек.

### Размеры карточки

Корневой элемент — `flex`-колонка с `width: 100%`: ширину задаёт родитель, высоту —
содержимое. Собственных props размера у карточки нет; в примерах ширина задаётся
обёрткой (`<div style={{width: "216px"}}>`).

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Card.ts`.

Паттерн: `Card.Static_{Theme}_Background`.

```text
Card.Static_General_Background
Card.Static_Secondary_Background
```

Токены `Card.Action_*` и `Card.Shadow_*` к статичной карточке отношения не имеют —
они описывают состояния `CardAction`. Общий класс темы из `styles/Card.module.less`
применяется и к `CardAction`, где его фон перекрывается токенами `Card.Action_*`
с той же специфичностью; менять `Card.Static_*` в расчёте на интерактивную карточку
не стоит — правь оба модуля согласованно.

---

## Инварианты

- `forwardRef` на компоненте — не убирать: `ref` указывает на корневой `<div>`, тот же
  элемент, который получает `className` и `...rest`.
- Корневой элемент — `<div>` без `role` и `tabIndex`: статичная карточка не является
  интерактивным элементом и в tab-порядок не попадает. Добавление роли или фокусируемости
  «по умолчанию» изменит наблюдаемое поведение.
- Атрибут `data-tx` проставляется после `...rest` — потребитель его не переопределяет.
  Это общий для библиотеки маркер версии.
- Имена props (`theme`, `roundingSize`), значения `ECardTheme` / `ECardRoundingSize` /
  `ECardContentPaddingSize` и barrel-экспорты `src/components/Card/index.ts` — публичный
  API, не переименовывать.
- Статические свойства `CardStatic.Content` и `CardStatic.Media` (и вложенные
  `Content.Header` / `Content.Body` / `Content.Footer`) — часть публичного API.
  `displayName` — `"CardStatic"`.
- Составные части (`CardMedia`, `CardContent`, `CardContent.Header/Body/Footer`) объявлены
  как `React.FC` и **`ref` не пробрасывают** — переданный им `ref` молча теряется. Не пиши
  на них тест вида `expect(ref.current).toBeInstanceOf(HTMLDivElement)` — он упадёт. Файлы
  частей общие с `CardAction`, поэтому добавление им `forwardRef` — отдельная задача на
  семейство Card, а не правка в рамках `CardStatic`.
- `ICardProps` — база для `ICardActionProps`: правка этого интерфейса меняет публичный API
  обеих карточек.

---

## Accessibility

- Карточка семантически прозрачна: своей роли не имеет, фокус не принимает, клавиатурных
  обработчиков нет. Содержимое озвучивается как обычный поток.
- Семантику задаёт потребитель через `...rest` — например, `role="group"` с `aria-labelledby`,
  указывающим на заголовок внутри `CardStatic.Content.Header`. Сменить тег компонент не
  позволяет: корень всегда `<div>`, поэтому `<li>` или `<section>` оборачивается снаружи.
- Компонент не хардкодит текстов (библиотека мультиязычная): `aria-label` и прочие подписи
  передаёт потребитель.
- Интерактивные элементы внутри карточки (кнопка в `Footer`, ссылка в `Body`) работают
  обычным образом — карточка не перехватывает клики и не всплывает собственных событий.
- Медийная область `CardStatic.Media` рисуется фоном, а не `<img>`: осмысленное изображение
  нужно сопровождать текстом в контенте либо задавать доступное имя самому элементу
  (`role="img"` + `aria-label`) через props части.

---

## Связанные компоненты

- `CardAction` — интерактивная карточка: тот же лейаут и те же составные части, плюс
  состояние выбора, роль `button` и клавиатурная активация.
- `CardContent` (`CardStatic.Content`) — контентная область карточки с `paddingSize`;
  отдельного AI.md нет, описана выше в «Составных частях».
- `CardMedia` (`CardStatic.Media`) — медийная область; принимает `className` и `...rest`,
  но **не `ref`** (см. «Инварианты»), отдельного AI.md нет.

---

## Stories

Основные истории: `stories/Cards/CardStatic.stories.tsx`
Файлы примеров: `stories/Cards/examples/CardStatic/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный подбор `theme`, `roundingSize` и `paddingSize` |
| `Default` | `DefaultExample.tsx` | Минимальная карточка с заголовком и телом |
| `Themes` | `ThemesExample.tsx` | Темы `GENERAL` и `SECONDARY` |
| `PaddingSizes` | `PaddingSizesExample.tsx` | Внутренние отступы контента `SM` и `MD` |
| `RoundingSizes` | `RoundingSizesExample.tsx` | Скругления `SM`, `MD`, `LG` |
| `VisualTests` | `VisualTests.tsx` | Скриншот-регрессия: карточка с `Media` и `Footer` в обеих темах и комбинации `roundingSize` + `paddingSize` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-11 | Создан документ |
