---
component: BodyPage
category: Page
related: [Page, HeaderPage, FooterPage, Body, Island, LightBox]
tokens: []
stories: stories/Page/BodyPage/BodyPage.stories.tsx
version: "1.0"
---

# BodyPage

## Назначение

Тело страницы `Page`. Доступен как статическое свойство `Page.Body`. Контейнер для основного
контента страницы между `Page.Header` и `Page.Footer`.

Используй когда: нужно разместить основной контент внутри `Page` — как в карточке (Island), так и без неё.
Не используй когда: нужен заголовок или футер страницы — для этого есть `Page.Header` / `Page.Footer`.

---

## Варианты и props

Публичный API — discriminated union по `type`: `IBodyPageTypeFirstProps | IBodyPageTypeSecondProps`.
Оба интерфейса расширяют `IBodyProps` (≈ `React.HTMLAttributes<HTMLDivElement>`).

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `type` | `EBodyPageType` | `FIRST` — контент оборачивается в `Island` (карточка с белым фоном и тенью). `SECOND` — контент без карточки. |
| `children` | `React.ReactNode` | Контент тела страницы. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `verticalMargin` | `TBodyPageVerticalMargin` | `LARGE` | Вертикальные отступы: `LARGE` = 24px (16px на узких экранах), `SMALL` = 16px (8px на узких), `NONE` = 0. Одно значение задаёт обе стороны; объект `{top, bottom}` — каждую отдельно, обе стороны указываются явно. В LightBox используется `SMALL`. |
| `size` | `EComponentSize` | — | Размер острова (Island). **Доступен только для `type=FIRST`**; для `type=SECOND` типизирован как `never`. |

### Тип verticalMargin

```ts
interface IBodyPageVerticalMarginSides {
    top: EBodyPageVerticalMargin;
    bottom: EBodyPageVerticalMargin;
}

type TBodyPageVerticalMargin = EBodyPageVerticalMargin | IBodyPageVerticalMarginSides;
```

```tsx
<Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.NONE}>…</Page.Body>
<Page.Body
    type={EBodyPageType.FIRST}
    verticalMargin={{top: EBodyPageVerticalMargin.NONE, bottom: EBodyPageVerticalMargin.LARGE}}
>…</Page.Body>
```

`top` и `bottom` в объектной форме обязательны: скрытого дефолта у стороны нет, отступ виден
прямо в месте вызова. Частичный объект (`{top}`) и пустой (`{}`) — ошибка компиляции.

### Ограничения по типам

- `size` доступен только при `type=FIRST` (в `SECOND` контент не оборачивается в Island, поэтому `size?: never`).

---

## Дизайн-токены

Собственных CSS-переменных нет. Внешний вид карточки наследуется от `Island` (`EIslandType.TYPE_1`).
Вертикальные отступы заданы фиксированными значениями в `styles/BodyPage.module.less`
односторонними классами `marginTop{Large,Small,None}` / `marginBottom{Large,Small,None}`
(24/16/0px и адаптив 16/8/0px на `@screen-sm-max`).

---

## Инварианты

- `forwardRef<HTMLDivElement>` — не убирать. Ref всегда указывает на корневой элемент
  (Island для FIRST, Body для SECOND).
- `displayName = "BodyPage"` — не менять.
- Discriminated union по `type` и значения `EBodyPageType` / `EBodyPageVerticalMargin` — часть
  публичного API, менять нельзя.
- Экспорты `BodyPage`, `IBodyPageTypeFirstProps`, `IBodyPageTypeSecondProps`,
  `IBodyPageVerticalMarginSides`, `TBodyPageVerticalMargin` идут в barrel
  `src/components/Page/index.ts` — сохранять.
- `verticalMargin` по умолчанию `LARGE` — менять дефолт нельзя без обсуждения.
- В объектной форме `top` и `bottom` обязательны — не делать их опциональными: дефолт стороны
  вернул бы скрытое поведение, которого здесь сознательно нет.
- Скалярная форма `verticalMargin` должна и дальше работать как раньше — это обратная
  совместимость публичного API.

---

## Accessibility

Особого a11y-поведения нет — это структурный контейнер. Семантику и aria-атрибуты задаёт
потребитель через проброшенные HTML-атрибуты (`...rest` уходит в `Body`).

---

## Связанные компоненты

- `Page` — родитель; `BodyPage` доступен как `Page.Body`.
- `HeaderPage` (`Page.Header`), `FooterPage` (`Page.Footer`) — соседи внутри `Page`.
- `Body` — внутренний контейнер контента (рендерится в обоих типах).
- `Island` — карточка-обёртка для `type=FIRST`.
- `LightBox` — типичное место использования с `verticalMargin=SMALL`.

---

## Stories

Основные истории: `stories/Page/BodyPage/BodyPage.stories.tsx`
Файлы примеров: `stories/Page/BodyPage/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `type` и `verticalMargin` |
| `Default` | `Default.tsx` | Минимальный пример (FIRST, контент в карточке) |
| `Types` | `Types.tsx` | Сравнение типов FIRST и SECOND |
| `VerticalMargins` | `VerticalMargins.tsx` | Отступы LARGE (24px), SMALL (16px), NONE (0) и асимметричные комбинации |
| `VisualTests` | `VisualTests.tsx` | Матрица type × verticalMargin для скриншот-регрессии |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-06-18 | Создан документ. AI-рефакторинг (clsx order, JSDoc), unit-тесты, миграция stories на modern pattern. |
| 2026-08-26 | TRI-121: добавлено `EBodyPageVerticalMargin.NONE`; `verticalMargin` принимает объект `{top, bottom}` (обе стороны обязательны) для независимых отступов сверху и снизу. LESS переразбит на односторонние классы. |
