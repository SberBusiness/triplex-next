---
component: Page
category: Page
related: [HeaderPage, BodyPage, FooterPage, Island, LightBox]
tokens: []
stories: stories/Page/Page/Page.stories.tsx
version: "1.0"
---

# Page

## Назначение

Каркас страницы. Вертикальный flex-контейнер (`<div>`), в который вкладываются только составные
части: `Page.Header` (HeaderPage), `Page.Body` (BodyPage) и `Page.Footer` (FooterPage). Сам `Page`
не задаёт визуальный стиль контента — он лишь раскладывает части по вертикали и задаёт внешние
отступы страницы.

Используй когда: нужен типовой каркас страницы — заголовок сверху, контент по центру, футер снизу.
Чаще всего применяется как содержимое `LightBox`.
Не используй когда: нужен отдельный блок (карточка, заголовок) без полного каркаса — используй
`Island`, `Page.Header`/`Page.Body`/`Page.Footer` по отдельности или иной контейнер.

---

## Варианты и props

Собственных props у `Page` нет — интерфейс `IPageProps` пуст и расширяет
`React.HTMLAttributes<HTMLDivElement>`. Вся настройка внешнего вида задаётся через типы дочерних
частей (`type` у `Page.Header` / `Page.Body` / `Page.Footer`), а не через props самого `Page`.

### Props

| Prop | Тип | Описание |
|---|---|---|
| `className` | `string` | Дополнительный класс на корневой `<div>`. Мерджится через `clsx` после базовых классов. |
| `children` | `React.ReactNode` | Составные части страницы: `Page.Header`, `Page.Body`, `Page.Footer`. |
| `...rest` | `React.HTMLAttributes<HTMLDivElement>` | Любые стандартные HTML-атрибуты `<div>` пробрасываются на корневой элемент. |

### Статические свойства (составные части)

| Свойство | Компонент | Назначение |
|---|---|---|
| `Page.Header` | `HeaderPage` | Заголовок страницы. |
| `Page.Body` | `BodyPage` | Тело страницы с основным контентом. |
| `Page.Footer` | `FooterPage` | Футер страницы с действиями. |

### Типы частей

Каждая часть бывает двух типов (`type`):

- `FIRST` — часть оборачивается в `Island` (карточку с белым фоном и тенью). Применяется в `LightBox`.
- `SECOND` — часть без карточки (без фона). Применяется в обычном layout.

Детали props частей — в их собственных AI.md: `HeaderPage-ai.md`, `BodyPage-ai.md`, `FooterPage-ai.md`.

---

## Дизайн-токены

Собственных CSS-переменных дизайн-токенов у `Page` нет. Внешние отступы и брейкпоинты заданы
LESS-переменными в `styles/Page.module.less` (`@page-padding-*`, `@screen-sm-max`). Sticky-стили
для прилипающих Header/Footer (классы `.headerPageTypeFirst.sticky`, `.footerPageTypeFirst.sticky`)
применяются при ширине viewport от 992px (`@screen-lg`) и высоте от 801px и
используют токены соответствующих компонентов (`--triplex-next-HeaderPage-StickyShadow`,
`--triplex-next-FooterPage-StickyShadow`) — они описаны в AI.md этих компонентов.

---

## Инварианты

- `forwardRef<HTMLDivElement>` — не убирать. Ref всегда указывает на корневой `<div>`.
- `displayName = "Page"` — не менять.
- `Page` собран через `Object.assign(forwardRef(...), { Body, Header, Footer })` — статические
  свойства `Header` / `Body` / `Footer` должны сохраняться.
- Корневые классы `page` и `global-page` на корневом `<div>` — не переименовывать (используются
  в стилях; sticky-стили частей задаются медиазапросом `min-width: 992px` и `min-height: 801px`).
- Экспорты `Page`, `IPageProps` идут в barrel `src/components/Page/index.ts` — сохранять.
  Там же реэкспортируются части и их enum'ы (`EHeaderPageType`, `EFooterPageType`, `EBodyPageType`,
  `EBodyPageVerticalMargin`).

---

## Accessibility

Особого a11y-поведения нет — это структурный контейнер без интерактивности и без хардкода
aria-атрибутов. Семантику задаёт потребитель через проброшенные HTML-атрибуты (`...rest`).
Интерактивность обеспечивают вложенные элементы внутри `Page.Header` / `Page.Footer`
(кнопки, ссылки, табы).

---

## Связанные компоненты

- `HeaderPage` (`Page.Header`), `BodyPage` (`Page.Body`), `FooterPage` (`Page.Footer`) — составные
  части страницы. Каждая имеет собственный AI.md.
- `Island` — карточка-обёртка для частей типа `FIRST`.
- `LightBox` — типичное место использования `Page`.

---

## Stories

Основные истории: `stories/Page/Page/Page.stories.tsx`
Файлы примеров: `stories/Page/Page/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль типов `Page.Header` / `Page.Footer` и `verticalMargin` у `Page.Body` |
| `Default` | `Default.tsx` | Базовая страница: header FIRST, body SECOND, footer FIRST (типичная Page для LightBox) |
| `WithIslands` | `WithIslands.tsx` | Все части типа FIRST — острова (карточки); для LightBox |
| `WithoutIslands` | `WithoutIslands.tsx` | Все части типа SECOND — без островов; для layout |

`Default`, `WithIslands` и `WithoutIslands` участвуют в скриншот-тестах (покрывают
комбинации типов `FIRST` / `SECOND` у частей). `Playground` интерактивен и исключён
(`testRunner: { skip: true }`).

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-06 | Sticky-позиционирование Header/Footer доступно вне `LightBox` при ширине viewport от 992px и отключено при высоте viewport не больше 800px. |
| 2026-07-20 | Вертикальные padding изменены: 24px (было 32px) для desktop, 8px (было 16px) для mobile — через `@page-padding-desktop-y` / `@page-padding-mobile-y`. |
| 2026-06-24 | Создан документ. AI-рефакторинг (JSDoc на компоненте и `IPageProps`), unit-тесты (className-merge, статические части), миграция stories на modern pattern. |
