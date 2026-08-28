---
component: Header
category: Header
related: [HeaderPage]
tokens: []
stories: stories/Header/Header.stories.tsx
version: "1.0"
---

# Header

## Назначение

Контейнер верхнего блока — заголовок, табы и подзаголовочный контент вверху карточки,
страницы или произвольного блока. Собственной визуальной оболочки не имеет: не рисует фон,
рамку и отступы, только даёт разметку и раскладку через составные части.

Наполнение строится уровнями, которые вкладываются в `Header` в нужном порядке:

- `Header.Title` — первый уровень: заголовок, подзаголовок и кнопки действий
  (`Header.Title.Content` и `Header.Title.Controls`);
- `Header.Tabs` — второй уровень: табы и кнопки действий
  (`Header.Tabs.Content` и `Header.Tabs.Controls`), с отступом сверху 8px;
- `Header.Subhead` — третий уровень: произвольный контент с вертикальными отступами 24px;
- `Header.LayoutSidebar` — необязательная раскладка в две колонки
  (`Header.LayoutSidebar.Content` и `Header.LayoutSidebar.Sidebar`), в которую
  оборачиваются уровни, если справа нужна боковая колонка.

Ни один уровень не обязателен, порядок задаёт потребитель — сам `Header` рендерит только
`<div>` с `children`.

Используй когда: нужен верхний блок с заголовком, действиями и табами внутри своего
контейнера (`Island`, карточка, произвольный блок), и оформление задаёт этот контейнер.
Не используй когда: нужен заголовок страницы — там `Page.Header` (`HeaderPage`), который в
зависимости от обязательного `type` либо оборачивает заголовок в карточку (`Island`) и умеет прилипать
к верхней границе экрана (`EHeaderPageType.FIRST`), либо рендерит голый `Header`
(`EHeaderPageType.SECOND`).

---

## Варианты и props

Собственных props у `Header` нет. `IHeaderProps` расширяет `React.HTMLAttributes<HTMLDivElement>`:
принимаются `children`, `className` и любые HTML-атрибуты div, всё уходит на корневой элемент
через `...rest`. То же верно для `HeaderTitle`, `HeaderTitleContent`, `HeaderTitleControls`,
`HeaderTabs`, `HeaderTabsContent`, `HeaderTabsControls`, `HeaderLayoutSidebar`,
`HeaderLayoutSidebarContent` и `HeaderLayoutSidebarSidebar`.

Единственный собственный prop во всём семействе — `withoutPaddings` у `HeaderSubheader`.

### Обязательные props

Обязательных props нет.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Содержимое заголовка. Обычно составные `Header.Title`, `Header.Tabs` и `Header.Subhead`. |

`HeaderSubheader` (`Header.Subhead`) дополнительно принимает:

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `withoutPaddings` | `boolean` | `false` | Снимает вертикальные отступы 24px. |

### Ограничения

- Корневой `<div>` у `Header` не получает собственного класса — фон, рамку и внешние отступы
  задаёт контейнер-родитель либо переданный `className`.
- `Header.LayoutSidebar.Sidebar` не задаёт себе горизонтального отступа от контента: расстояние
  между колонками добавляет потребитель (`className` или `style`). Сама раскладка —
  `display: flex` + `justify-content: space-between` у родителя, `flex-grow: 1` и
  `min-width: 1px` у `Content`.
- Кнопки действий внутри `Header.Title.Controls` на мобильных отступают от левого края через
  отрицательный `margin-left: -16px` у контейнера и `margin-left: 16px` у прямых потомков
  `> button` и `> [class*="buttonDropdown"]`. Другие обёртки вокруг кнопок этот отступ не получат.
- `Header.Tabs.Controls` на мобильных обнуляет `margin-left` у прямых `> button` через
  `!important` — переопределить отступ между соседними кнопками снаружи не выйдет.

---

## Дизайн-токены

Компонент не использует CSS-переменные дизайн-токенов: цвета и типографику задают вложенные
компоненты (`Title`, `Text`, `Button`, `Tabs`) и контейнер-родитель.

Раскладка задаётся литеральными значениями в `styles/`: `margin-top: 8px` у `HeaderTabs`,
`padding: 24px 0` у `HeaderSubheader`, `padding-left: 24px` у обоих блоков `Controls`
на десктопе и компенсирующие отступы 16px между кнопками при переносе на мобильных.
На мобильных (до `@screen-sm-max`) у `HeaderTabs` другие значения: `margin-top: 16px`
и `gap: 16px`.

---

## Инварианты

- `forwardRef<HTMLDivElement>` на всех одиннадцати компонентах семейства — не убирать. Ref всегда
  указывает на корневой `<div>`.
- Корневой элемент — `<div>`; у `Header` он без собственного класса, у остальных — с классами
  из соответствующего `styles/*.module.less` плюс `className` потребителя через `clsx`.
  `className` всегда идёт последним аргументом `clsx` и никогда не затирает собственные классы.
- `Header` собран через `Object.assign(forwardRef(...), { LayoutSidebar, Subhead, Tabs, Title })`,
  `HeaderTitle` — `{ Content, Controls }`, `HeaderTabs` — `{ Content, Controls }`,
  `HeaderLayoutSidebar` — `{ Content, Sidebar }`. Статические свойства сохранять: на них
  опирается `HeaderPage` (`Page.Header.Title`, `Page.Header.Tabs`, `Page.Header.Subhead`,
  `Page.Header.LayoutSidebar`).
- `data-tx={process.env.npm_package_version}` на корневом элементе `Header` — маркер версии
  библиотеки, ставится после `...rest`, чтобы потребитель его не перетирал.
- Классы `global-HeaderTitleContent` и `global-HeaderTitleControls` (оба — `min-width: 0`)
  выставляются в дополнение к основным классам на `HeaderTitleContent` и `HeaderTitleControls`.
  Не удалять: они гасят `min-width: auto` у flex-элементов, без них длинный заголовок
  перестаёт сжиматься и ломает строку.
- `min-width: 1px` у `.headerTabsContent` и `.headerLayoutSidebarContent` — тот же обход
  `min-width: auto` у flex-элементов. Не удалять: у `.headerTabsContent` это ещё и фикс бага
  с компонентом `Tabs` внутри `HeaderTabs`.
- `displayName` — `"Header"`, `"HeaderTitle"`, `"HeaderTitleContent"`, `"HeaderTitleControls"`,
  `"HeaderTabs"`, `"HeaderTabsContent"`, `"HeaderTabsControls"`, `"HeaderSubheader"`,
  `"HeaderLayoutSidebar"`, `"HeaderLayoutSidebarContent"`, `"HeaderLayoutSidebarSidebar"`.
  Не менять.
- Все одиннадцать компонентов и их интерфейсы props идут в barrel `src/components/Header/index.ts` —
  экспорты сохранять. Имя `IHeaderLayoutSidebarSidebarProps` выглядит удвоенным, но это
  публичный API: переименование — breaking change.
- Имя prop `withoutPaddings` у `HeaderSubheader` — публичный API, не переименовывать.
- Адаптивное поведение на ширине экрана до `@screen-sm-max` (767px) — часть визуального
  контракта, покрыто скриншотами на viewport `xs`: кнопки `Title.Controls` и `Tabs.Controls`
  переносятся под контент, `HeaderTitle.Content` растягивается на всю ширину,
  `HeaderLayoutSidebar.Sidebar` скрывается (`display: none`).

---

## Accessibility

Структурный контейнер без собственного интерактивного поведения и ARIA-ролей. Семантику задаёт
потребитель через проброшенные атрибуты (`role="banner"`, `aria-label` и т.п.) и через уровень
заголовка вложенного `Title` (`tag="h1"`). Интерактивность обеспечивают вложенные кнопки, табы
и ссылки — порядок фокуса совпадает с порядком в DOM.

Важно: `Header.LayoutSidebar.Sidebar` скрывается на мобильных через `display: none`, поэтому
её содержимое пропадает и из дерева доступности. Дублируй в `Content` то, что должно оставаться
доступным на узких экранах.

---

## Связанные компоненты

- `HeaderPage` — заголовок страницы (`Page.Header`); рендерит `Header` внутри себя, наследует
  `IHeaderProps` и реэкспортирует статические свойства `Header` как `Page.Header.Title`,
  `Page.Header.Tabs`, `Page.Header.Subhead`, `Page.Header.LayoutSidebar`.
- `HeaderTitle` (`Header.Title`) — первый уровень: строка с заголовком и кнопками,
  `justify-content: space-between`. Тривиальная обёртка (className + spread + ref),
  отдельного AI.md нет.
- `HeaderTitleContent` (`Header.Title.Content`) — заголовок и подзаголовок, занимает свободное
  место. Тривиальная обёртка, отдельного AI.md нет.
- `HeaderTitleControls` (`Header.Title.Controls`) — кнопки действий первого уровня, прижаты
  вправо. Тривиальная обёртка, отдельного AI.md нет.
- `HeaderTabs` (`Header.Tabs`) — второй уровень: строка с табами и кнопками. Тривиальная
  обёртка, отдельного AI.md нет.
- `HeaderTabsContent` (`Header.Tabs.Content`) — контейнер табов, `flex-grow: 1`. Тривиальная
  обёртка, отдельного AI.md нет.
- `HeaderTabsControls` (`Header.Tabs.Controls`) — кнопки действий второго уровня. Тривиальная
  обёртка, отдельного AI.md нет.
- `HeaderSubheader` (`Header.Subhead`) — третий уровень с произвольным контентом; единственный
  в семействе имеет собственный prop `withoutPaddings`. Отдельного AI.md нет, prop описан выше.
- `HeaderLayoutSidebar` (`Header.LayoutSidebar`) — раскладка в две колонки. Тривиальная
  обёртка, отдельного AI.md нет.
- `HeaderLayoutSidebarContent` (`Header.LayoutSidebar.Content`) — основная колонка,
  `flex-grow: 1`. Тривиальная обёртка, отдельного AI.md нет.
- `HeaderLayoutSidebarSidebar` (`Header.LayoutSidebar.Sidebar`) — боковая колонка, скрыта на
  мобильных. Тривиальная обёртка, отдельного AI.md нет.

---

## Stories

Основные истории: `stories/Header/Header.stories.tsx`
Файлы примеров: `stories/Header/examples/`

Playground не создаётся — у компонента нет настраиваемых props.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `Default.tsx` | Минимальный заголовок: `Title.Content` с заголовком и подзаголовком плюс две кнопки в `Title.Controls` |
| `WithTabs` | `WithTabs.tsx` | Два уровня: заголовок и `Tabs` с табами и кнопками действий |
| `WithSubhead` | `WithSubhead.tsx` | Третий уровень `Subhead` с произвольным контентом под заголовком |
| `WithoutPaddings` | `WithoutPaddings.tsx` | Сравнение `Subhead` с отступами по умолчанию и с `withoutPaddings` |
| `WithLayoutSidebar` | `WithLayoutSidebar.tsx` | Раскладка в две колонки: заголовок слева, остаток по счёту в боковой колонке |
| `Example` | `Example.tsx` | Production-like композиция: все уровни внутри `Island` |
| `VisualTests` | — | Краевые состояния для скриншотов: заголовок без кнопок, длинный заголовок с тремя кнопками, два `Subhead` рядом, боковая колонка |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-28 | Создан документ. AI-рефакторинг (JSDoc на `children` и `withoutPaddings`, выровнен порядок аргументов `clsx`, удалён мёртвый CSS-селектор `.headerLink` и пустое правило `.headerTitleContent`), unit-тесты на все одиннадцать компонентов, stories по modern pattern. |
