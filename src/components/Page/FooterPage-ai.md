---
component: FooterPage
category: Page
related: [Page, HeaderPage, BodyPage, Footer, Island, LightBox]
tokens: [--triplex-next-FooterPage-StickyShadow]
stories: stories/Page/FooterPage/FooterPage.stories.tsx
version: "1.0"
---

# FooterPage

## Назначение

Футер страницы `Page`. Доступен как статическое свойство `Page.Footer`. Нижний блок страницы
с контентом и управляющими элементами (кнопки, ссылки), располагается под `Page.Body`.

Контент обычно строится через составной `Page.Footer.Description` с областями
`Page.Footer.Description.Content` и `Page.Footer.Description.Controls`.

Используй когда: нужен нижний блок страницы с действиями — как в карточке (Island), так и без неё;
а также прилипающий к низу футер внутри `LightBox`.
Не используй когда: нужен заголовок или тело страницы — для этого есть `Page.Header` / `Page.Body`.

---

## Варианты и props

Публичный API — discriminated union по `type`: `IFooterPageTypeFirstProps | IFooterPageTypeSecondProps`.
Оба интерфейса расширяют `IFooterProps` (≈ `React.HTMLAttributes<HTMLDivElement>`).

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `type` | `EFooterPageType` | `FIRST` — футер оборачивается в `Island` (карточка с белым фоном и тенью). `SECOND` — футер без карточки. |
| `children` | `React.ReactNode` | Контент футера страницы. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `sticky` | `boolean` | `false` | Футер прилипает к нижней границе при скролле, если ширина viewport от 992px, а высота больше 800px. **Только для `type=FIRST`**; для `type=SECOND` типизирован как `never`. |
| `size` | `EComponentSize` | — | Размер острова (Island). **Доступен только для `type=FIRST`**; для `type=SECOND` типизирован как `never`. |

### Ограничения по типам

- `size` и `sticky` доступны только при `type=FIRST` (в `SECOND` контент не оборачивается в Island,
  поэтому оба типизированы как `never`).

---

## Дизайн-токены

| Токен | Назначение |
|---|---|
| `--triplex-next-FooterPage-StickyShadow` | Тень прилипшего футера (когда `sticky` и футер коснулся нижней границы, `data-stuck="true"`). |

Внешний вид карточки наследуется от `Island` (`EIslandType.TYPE_1`). Радиус нижних углов при
прилипании плавно обнуляется через CSS-переменную `--r-bottom` (управляется хуком
`useStickyCornerRadius`).

---

## Инварианты

- `forwardRef<HTMLDivElement>` — не убирать. Ref всегда указывает на корневой элемент
  (Island для FIRST, Footer для SECOND).
- Ручной merge ref (`setFooterRef`) обязателен: ref нужен одновременно хуку
  `useStickyCornerRadius` (внутренний `footerRef`) и наружу (проброшенный `ref`). Не упрощать.
- `displayName = "FooterPage"` — не менять.
- `FooterPage` собран через `Object.assign(forwardRef(...), { Description })` — статическое
  свойство `Description` (= `Footer.Description`) должно сохраняться.
- Discriminated union по `type` и значения `EFooterPageType` — часть публичного API, менять нельзя.
- Экспорты `FooterPage`, `IFooterPageTypeFirstProps`, `IFooterPageTypeSecondProps` идут в barrel
  `src/components/Page/index.ts` — сохранять.

---

## Accessibility

Особого a11y-поведения нет — это структурный контейнер. Семантику и aria-атрибуты задаёт
потребитель через проброшенные HTML-атрибуты (`...rest` уходит в `Footer`). Интерактивность
обеспечивают вложенные кнопки/ссылки внутри `Description.Controls`.

---

## Связанные компоненты

- `Page` — родитель; `FooterPage` доступен как `Page.Footer`.
- `HeaderPage` (`Page.Header`), `BodyPage` (`Page.Body`) — соседи внутри `Page`.
- `Footer` — внутренний контейнер футера; `Page.Footer.Description` = `Footer.Description`.
- `Island` — карточка-обёртка для `type=FIRST`.
- `LightBox` — типичное место использования с `sticky`.

---

## Stories

Основные истории: `stories/Page/FooterPage/FooterPage.stories.tsx`
Файлы примеров: `stories/Page/FooterPage/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `type`, `size` |
| `Default` | `Default.tsx` | Минимальный пример (FIRST, футер в карточке) |
| `Types` | `Types.tsx` | Сравнение типов FIRST и SECOND (покрывает скриншот-регрессию) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-06 | Sticky-позиционирование доступно вне `LightBox` при ширине viewport от 992px и отключено при высоте viewport не больше 800px. |
| 2026-06-19 | Создан документ. AI-рефакторинг (clsx order, JSDoc на props, displayName), unit-тесты, миграция stories на modern pattern. |
