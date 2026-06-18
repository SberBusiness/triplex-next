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
| `verticalMargin` | `EBodyPageVerticalMargin` | `LARGE` | Вертикальные отступы: `LARGE` = 24px (16px на узких экранах), `SMALL` = 16px (8px на узких). В LightBox используется `SMALL`. |
| `size` | `EComponentSize` | — | Размер острова (Island). **Доступен только для `type=FIRST`**; для `type=SECOND` типизирован как `never`. |

### Ограничения по типам

- `size` доступен только при `type=FIRST` (в `SECOND` контент не оборачивается в Island, поэтому `size?: never`).

---

## Дизайн-токены

Собственных CSS-переменных нет. Внешний вид карточки наследуется от `Island` (`EIslandType.TYPE_1`).
Вертикальные отступы заданы фиксированными значениями в `styles/BodyPage.module.less`
(24/16px и адаптив 16/8px на `@screen-sm-max`).

---

## Инварианты

- `forwardRef<HTMLDivElement>` — не убирать. Ref всегда указывает на корневой элемент
  (Island для FIRST, Body для SECOND).
- `displayName = "BodyPage"` — не менять.
- Discriminated union по `type` и значения `EBodyPageType` / `EBodyPageVerticalMargin` — часть
  публичного API, менять нельзя.
- Экспорты `BodyPage`, `IBodyPageTypeFirstProps`, `IBodyPageTypeSecondProps` идут в barrel
  `src/components/Page/index.ts` — сохранять.
- `verticalMargin` по умолчанию `LARGE` — менять дефолт нельзя без обсуждения.

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
| `VerticalMargins` | `VerticalMargins.tsx` | Отступы LARGE (24px) и SMALL (16px) |
| `VisualTests` | — | Матрица type × verticalMargin для скриншот-регрессии |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-06-18 | Создан документ. AI-рефакторинг (clsx order, JSDoc), unit-тесты, миграция stories на modern pattern. |
