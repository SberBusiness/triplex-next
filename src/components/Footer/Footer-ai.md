---
component: Footer
category: Footer
related: [FooterPage, TableBasic]
tokens: []
stories: stories/Footer/Footer.stories.tsx
version: "1.0"
---

# Footer

## Назначение

Контейнер нижнего блока — контент и управляющие элементы (кнопки, ссылки) внизу карточки,
страницы или таблицы. Собственной визуальной оболочки не имеет: не рисует фон, рамку и отступы,
только даёт разметку и раскладку через составной `Footer.Description`.

Наполнение строится тремя частями:

- `Footer.Description` — строка с контентом и кнопками (`display: flex`);
- `Footer.Description.Content` — контент, занимает свободное место;
- `Footer.Description.Controls` — кнопки действий, прижаты вправо.

Используй когда: нужен нижний блок с текстом и действиями внутри своего контейнера
(`Island`, таблица, произвольная карточка), и оформление задаёт этот контейнер.
Не используй когда: нужен футер страницы — там `Page.Footer` (`FooterPage`), он добавляет
карточку (`Island`) и прилипание к нижней границе экрана.

---

## Варианты и props

Собственных props нет. `IFooterProps` расширяет `React.HTMLAttributes<HTMLDivElement>`:
принимаются `children`, `className` и любые HTML-атрибуты div, всё уходит на корневой элемент
через `...rest`. То же верно для `FooterDescription`, `FooterDescriptionContent`
и `FooterDescriptionControls`.

### Обязательные props

Обязательных props нет.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Контент футера. Обычно составной `Footer.Description`. |

### Ограничения

- Корневой `<div>` не получает собственного класса — вертикальные отступы и фон задаёт
  контейнер-родитель либо переданный `className`.
- Тип props у `FooterDescriptionControls` — `IFooterDescriptionControlsProps` — импортируется
  из `@sberbusiness/triplex-next/components/Table/TableBasic/types`, а не объявлен рядом
  с компонентом. Это чужой публичный API: переносить и переименовывать его нельзя.

---

## Дизайн-токены

Компонент не использует CSS-переменные дизайн-токенов: цвета и типографику задают вложенные
компоненты (`Text`, `Button`, `Link`) и контейнер-родитель.

Раскладка задаётся литеральными значениями в `styles/Footer.module.less`:
отступ `padding-left: 24px` у `Controls` на десктопе и компенсирующие отступы `16px`
между кнопками при переносе на мобильных.

---

## Инварианты

- `forwardRef<HTMLDivElement>` на всех четырёх компонентах — не убирать. Ref всегда указывает
  на корневой `<div>`.
- Корневой элемент — `<div>`; у `Footer` он без собственного класса, у остальных — с одним
  классом из `styles/Footer.module.less` плюс `className` потребителя через `clsx`.
- `Footer` собран через `Object.assign(forwardRef(...), { Description })`,
  `FooterDescription` — через `Object.assign(forwardRef(...), { Content, Controls })`.
  Статические свойства сохранять: на них опирается `FooterPage` (`Page.Footer.Description`).
- `data-tx={process.env.npm_package_version}` на корневом элементе `Footer` — маркер версии
  библиотеки, ставится после `...rest`, чтобы потребитель его не перетирал.
- `displayName` — `"Footer"`, `"FooterDescription"`, `"FooterDescriptionContent"`,
  `"FooterDescriptionControls"`. Не менять.
- Экспорты `Footer`, `IFooterProps`, `FooterDescription`, `IFooterDescriptionProps`,
  `FooterDescriptionContent`, `IFooterDescriptionContentProps`, `FooterDescriptionControls`
  идут в barrel `src/components/Footer/index.ts` — сохранять.
- `IFooterDescriptionControlsProps` живёт в `Table/TableBasic/types` и экспортируется оттуда —
  сюда не переносить.
- Перенос кнопок под контент на ширине экрана до `@screen-sm-max` (767px) — часть визуального
  контракта, покрыт скриншотами на viewport `xs`.

---

## Accessibility

Структурный контейнер без собственного интерактивного поведения и ARIA-ролей. Семантику задаёт
потребитель через проброшенные атрибуты (`role="contentinfo"`, `aria-label` и т.п.).
Интерактивность обеспечивают вложенные кнопки и ссылки внутри `Footer.Description.Controls` —
порядок фокуса совпадает с порядком в DOM.

---

## Связанные компоненты

- `FooterPage` — футер страницы (`Page.Footer`); рендерит `Footer` внутри себя, наследует
  `IFooterProps` и реэкспортирует `Footer.Description` как `Page.Footer.Description`.
- `TableBasic` — владелец типа `IFooterDescriptionControlsProps`, который используют
  `FooterDescriptionControls`.
- `FooterDescription` (`Footer.Description`) — основная часть футера: строка с контентом
  и кнопками, `justify-content: space-between`. Тривиальная обёртка (className + spread + ref),
  отдельного AI.md нет.
- `FooterDescriptionContent` (`Footer.Description.Content`) — контентная область,
  `flex-grow: 1`. Тривиальная обёртка, отдельного AI.md нет.
- `FooterDescriptionControls` (`Footer.Description.Controls`) — область кнопок действий,
  прижата вправо. Тривиальная обёртка, отдельного AI.md нет.

---

## Stories

Основные истории: `stories/Footer/Footer.stories.tsx`
Файлы примеров: `stories/Footer/examples/`

Playground не создаётся — у компонента нет настраиваемых props.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `Default.tsx` | Минимальный футер: контент и две кнопки |
| `Layouts` | `Layouts.tsx` | Варианты наполнения: контент и кнопки, только контент, только кнопки, длинный контент |
| `Example` | `Example.tsx` | Production-like композиция: футер внутри `Island` с ссылкой и тремя кнопками |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-25 | Создан документ. AI-рефакторинг (JSDoc на `children`, удалён мёртвый CSS-класс `.footer`), unit-тесты на все четыре компонента, stories по modern pattern. |
