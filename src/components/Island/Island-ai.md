---
component: Island
category: Layout
related: [IslandAccordion, IslandWidget, BodyPage, HeaderPage, FooterPage, Confirm, ModalWindowBody]
tokens:
  - --triplex-next-Island-Type1_Background
  - --triplex-next-Island-Type1_Shadow
  - --triplex-next-Island-Type2_Background
  - --triplex-next-Island-Type2_Shadow
  - --triplex-next-Island-Type3_Background
  - --triplex-next-Island-Type3_Shadow
stories: stories/Island/Island.stories.tsx
version: "1.0"
---

# Island

## Назначение

Базовый контейнер-карточка библиотеки: `<div>` с фоном, тенью, скруглением и внутренними
отступами. Собственной логики не имеет — задаёт поверхность, на которой лежит контент, и
вертикальные отступы между своими частями `Island.Header`, `Island.Body`, `Island.Footer`.

Используй когда: контент нужно визуально выделить карточкой на фоне страницы — блок страницы
(`BodyPage`, `HeaderPage`, `FooterPage`), диалог подтверждения (`Confirm`), элемент аккордеона
(`IslandAccordion`), виджет (`IslandWidget`).

Не используй когда:
- Нужна интерактивность (клик по карточке, раскрытие, удаление) — Island не кнопка и не
  управляет состоянием. Возьми `IslandAccordion` (раскрывающиеся элементы) или `IslandWidget`
  (виджет со сворачиванием в адаптиве), либо положи интерактивный элемент внутрь Island.
- Нужен только отступ или сетка без визуальной карточки — возьми `Gap`, `Row`/`Col`.
- Нужен overlay/модальное окно — возьми `ModalWindow`, `LightBox`, `LightBoxSideOverlay`.

---

## Варианты и props

### Обязательные props

Обязательных props нет — `<Island>` рендерится с типом `TYPE_1` и размером `MD`.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `type` | `EIslandType` | `EIslandType.TYPE_1` | Визуальный тип. Влияет только на фон и тень, на размеры — нет |
| `size` | `EComponentSize` | `EComponentSize.MD` | Скругление, внутренние отступы карточки и отступы между Header / Body / Footer |

Компонент расширяет `React.HTMLAttributes<HTMLDivElement>` — все стандартные атрибуты `<div>`
(`className`, `style`, `role`, `aria-*`, `data-*`, обработчики событий) попадают на корневой элемент.

### Размеры

| `size` | `border-radius` | `padding` | Отступ между частями | Адаптив (`max-width: @screen-sm-max`) |
|---|---|---|---|---|
| `SM` | 16px | 16px | 8px | без изменений |
| `MD` | 24px | 24px | 12px | схлопывается до 16px / 16px |
| `LG` | 32px | 32px | 16px | схлопывается до 24px / 24px |

Отступ между частями схлопыванию в адаптиве не подвергается — меняются только скругление и padding.

### Составные части

`Island.Header`, `Island.Body`, `Island.Footer` (они же `IslandHeader`, `IslandBody`,
`IslandFooter` из barrel) — тривиальные `<div>`-обёртки: `className + ...rest + forwardRef`,
собственных props нет. Их единственная задача — нести класс, по которому Island расставляет
вертикальные отступы. Использовать их все необязательно: у карточки может быть только Body.

### Ограничения

- **Части должны идти соседними элементами в порядке Header → Body → Footer.**
  Отступы задаются смежными селекторами (`.islandHeader + .islandBody`,
  `.islandHeader + .islandFooter`, `.islandBody + .islandFooter`) внутри классов размера.
  Обёртка вокруг части, чужой элемент между частями или другой порядок ломают отступы.
- **Отступы даёт только родительский Island.** Отрендеренный отдельно `IslandBody` — просто `<div>`.
- **Вложенный Island:** правила отступов написаны через потомка (`.island.md .islandHeader + .islandBody`),
  поэтому части вложенной карточки попадают и под селекторы внешней. Специфичность у правил всех
  размеров одинаковая, так что при разных `size` побеждает правило, которое ниже в
  `Island.module.less` (порядок в файле — `sm` → `md` → `lg`), а не ближайший родитель.

---

## Дизайн-токены

```
--triplex-next-Island-Type1_Background
--triplex-next-Island-Type1_Shadow
--triplex-next-Island-Type2_Background
--triplex-next-Island-Type2_Shadow
--triplex-next-Island-Type3_Background
--triplex-next-Island-Type3_Shadow
```

Значения задаются в `src/components/DesignTokens/components/Island.ts`. `Type1_Shadow` и
`Type3_Shadow` — `none`, `Type2_Shadow` — внутренняя рамка `0 0 0 1px … inset`. Скругления и
отступы токенами не описываются, они заданы литералами в `styles/Island.module.less`.

---

## Инварианты

- **`forwardRef`** — обязателен у `Island` и всех трёх частей, `ref` идёт на корневой `<div>`.
- **Корневой элемент — `<div>`** у Island и у каждой части. Смена тега меняет дефолтный
  `display` и семантику, то есть ломает вёрстку потребителей (селекторы отступов
  класс-базированные и тег не проверяют).
- **Имена CSS-классов `islandHeader` / `islandBody` / `islandFooter` совпадают в четырёх
  LESS-модулях намеренно.** `scripts/generate-scoped-name.ts` хеширует класс по
  `имя папки компонента + имя класса + версия библиотеки`, поэтому `.islandHeader` в
  `styles/Island.module.less` и в `styles/IslandHeader.module.less` дают один и тот же хеш —
  на этом и держатся селекторы отступов. Следствия:
  - файлы частей и их стили нельзя выносить из `src/components/Island/`;
  - переименовывать класс можно только одновременно во всех модулях, где он встречается.
- **У классов `.islandHeader` / `.islandBody` / `.islandFooter` должно оставаться хотя бы одно
  CSS-свойство** (сейчас `position: relative` / `display: block`), иначе класс не попадёт в сборку
  и отступы перестанут работать. В LESS-файлах об этом есть комментарии — не удаляй.
- **Публичный API:** `Island`, `IslandHeader`, `IslandBody`, `IslandFooter`, `EIslandType`,
  `IIslandProps`, `IIslandHeaderProps`, `IIslandBodyProps`, `IIslandFooterProps` экспортируются из
  `src/components/Island/index.ts`. Значения `EIslandType` — строки `type_1` / `type_2` / `type_3`.
- **Части типизированы через `React.HTMLProps<HTMLDivElement>`** (не `HTMLAttributes`). Сужение
  типа — breaking change для потребителей.
- **`mapTypeToClassName` (`utils.ts`) — внутренняя утилита**, в barrel не экспортируется.

---

## Accessibility

Island — неинтерактивный контейнер: не выставляет роль, не управляет фокусом и не обрабатывает
клавиатуру. Всё это задаёт потребитель через spread — например, `Confirm` передаёт
`role="dialog"` и `aria-modal="true"`, `IslandAccordion` кладёт внутрь `Island.Header` собственную
`<button>` с `aria-expanded` / `aria-controls`.

Важно: `Island.Header` — это `<div>`, а не заголовок. Если нужен семантический заголовок карточки,
положи внутрь `Title` с нужным тегом или собственный `<h*>`. Текстовые строки компонент не
хардкодит (библиотека мультиязычная).

---

## Связанные компоненты

- `IslandHeader` (`components/IslandHeader.tsx`, он же `Island.Header`) — шапка карточки.
  Тривиальная `<div>`-обёртка без собственных props; отдельного AI.md не имеет.
- `IslandBody` (`components/IslandBody.tsx`, он же `Island.Body`) — основное содержимое.
  Тривиальная `<div>`-обёртка без собственных props.
- `IslandFooter` (`components/IslandFooter.tsx`, он же `Island.Footer`) — подвал карточки.
  Тривиальная `<div>`-обёртка без собственных props.
- `IslandAccordion` — строит на Island раскрывающиеся элементы; `IslandAccordionFooter`
  оборачивает `Island.Footer` и передаёт в него свой `className`.
- `IslandWidget` — виджет со сворачиванием в адаптиве; использует Island как контейнер, но своими
  Header / Body / Footer, а не частями Island.
- `BodyPage`, `HeaderPage`, `FooterPage` — оборачивают контент страницы в Island с `TYPE_1`, если
  их тип `FIRST`.
- `Confirm` — диалог подтверждения на Island `TYPE_1` с `Island.Body` внутри.
- `ModalWindowBody` — тело модального окна; `IModalWindowBodyProps` расширяет `IIslandProps`,
  поэтому `type` и `size` Island доступны и там.

---

## Stories

Основные истории: `stories/Island/Island.stories.tsx`
Файлы примеров: `stories/Island/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контроль `type`, `size` и состава (Header / Body / Footer) |
| `Default` | `DefaultExample.tsx` | Минимальная карточка: Header + Body + Footer |
| `Types` | `TypesExample.tsx` | Все значения `EIslandType` рядом |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG: скругление, паддинги, отступы между частями |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-04 | Создан документ. AI-рефакторинг: JSDoc на props, значениях `EIslandType` и субкомпонентах, `displayName` у `IslandHeader` / `IslandBody` / `IslandFooter`, unit-тесты на все типы и размеры, части острова и `mapTypeToClassName`. Исправлено: `className` в `IslandHeader` и `IslandFooter` больше не затирает базовый класс компонента. Публичный API не изменён. |
