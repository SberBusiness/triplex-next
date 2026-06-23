---
component: HeaderPage
category: Page
related: [Page, BodyPage, FooterPage, Header, Island, LightBox]
tokens: [--triplex-next-HeaderPage-StickyShadow]
stories: stories/Page/HeaderPage/HeaderPage.stories.tsx
version: "1.0"
---

# HeaderPage

## Назначение

Заголовок страницы `Page`. Доступен как статическое свойство `Page.Header`. Верхний блок страницы
с заголовком, табами и подзаголовком, располагается над `Page.Body`.

Контент строится через составные части `Page.Header`: `Page.Header.Title` (с областями `Content`
и `Controls`), `Page.Header.Tabs` (с областями `Content` и `Controls`), `Page.Header.Subhead` и
`Page.Header.LayoutSidebar` (с областями `Content` и `Sidebar`).

Используй когда: нужен верхний блок страницы с заголовком и действиями — как в карточке (Island),
так и без неё; а также прилипающий к верху заголовок внутри `LightBox`.
Не используй когда: нужно тело или футер страницы — для этого есть `Page.Body` / `Page.Footer`.

---

## Варианты и props

Публичный API — discriminated union по `type`: `IHeaderPageTypeFirstProps | IHeaderPageTypeSecondProps`.
Оба интерфейса расширяют `IHeaderProps` (≈ `React.HTMLAttributes<HTMLDivElement>`).

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `type` | `EHeaderPageType` | `FIRST` — заголовок оборачивается в `Island` (карточка с белым фоном и тенью). `SECOND` — заголовок без карточки. |
| `children` | `React.ReactNode` | Контент заголовка страницы. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `sticky` | `boolean` | `false` | Заголовок прилипает к верхней границе при скролле. **Только для `type=FIRST`** (внутри `LightBox`); для `type=SECOND` типизирован как `never`. |
| `size` | `EComponentSize` | — | Размер острова (Island). **Доступен только для `type=FIRST`**; для `type=SECOND` типизирован как `never`. |

### Ограничения по типам

- `size` и `sticky` доступны только при `type=FIRST` (в `SECOND` контент не оборачивается в Island,
  поэтому оба типизированы как `never`).

---

## Дизайн-токены

| Токен | Назначение |
|---|---|
| `--triplex-next-HeaderPage-StickyShadow` | Тень прилипшего заголовка (когда `sticky` и заголовок коснулся верхней границы, `data-stuck="true"`). |

Внешний вид карточки наследуется от `Island` (`EIslandType.TYPE_1`). Радиус верхних углов при
прилипании плавно обнуляется через CSS-переменную `--r-top` (управляется хуком
`useStickyCornerRadius` с `edge="top"`).

---

## Инварианты

- `forwardRef<HTMLDivElement>` — не убирать. Ref всегда указывает на корневой элемент
  (Island для FIRST, Header для SECOND).
- Ручной merge ref (`setIslandRef`) обязателен: ref нужен одновременно хуку
  `useStickyCornerRadius` (внутренний `islandRef`) и наружу (проброшенный `ref`). Не упрощать.
- `displayName = "HeaderPage"` — не менять.
- `HeaderPage` собран через `Object.assign(forwardRef(...), { LayoutSidebar, Subhead, Tabs, Title })` —
  статические свойства (= `Header.LayoutSidebar` / `Header.Subhead` / `Header.Tabs` / `Header.Title`)
  должны сохраняться.
- Discriminated union по `type` и значения `EHeaderPageType` — часть публичного API, менять нельзя.
- Экспорты `HeaderPage`, `IHeaderPageTypeFirstProps`, `IHeaderPageTypeSecondProps` идут в barrel
  `src/components/Page/index.ts` — сохранять.

---

## Accessibility

Особого a11y-поведения нет — это структурный контейнер. Семантику и aria-атрибуты задаёт
потребитель через проброшенные HTML-атрибуты (`...rest` уходит в `Header`). Интерактивность
обеспечивают вложенные кнопки/ссылки/табы внутри `Title.Controls` / `Tabs.Controls`.

---

## Связанные компоненты

- `Page` — родитель; `HeaderPage` доступен как `Page.Header`.
- `BodyPage` (`Page.Body`), `FooterPage` (`Page.Footer`) — соседи внутри `Page`.
- `Header` — внутренний контейнер заголовка; статика `Page.Header.Title` / `Tabs` / `Subhead` /
  `LayoutSidebar` берётся из `Header.*`.
- `Island` — карточка-обёртка для `type=FIRST`.
- `LightBox` — типичное место использования с `sticky`.

---

## Stories

Основные истории: `stories/Page/HeaderPage/HeaderPage.stories.tsx`
Файлы примеров: `stories/Page/HeaderPage/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `type` и `size` |
| `Default` | `Default.tsx` | Минимальный пример (FIRST, заголовок в карточке) |
| `Types` | `Types.tsx` | Сравнение типов FIRST и SECOND (покрывает скриншот-регрессию) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-06-23 | Создан документ. AI-рефакторинг (clsx order, JSDoc на props, displayName), unit-тесты, миграция stories на modern pattern. |
