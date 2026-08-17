---
component: TabsExtended
category: Tabs
related: [Tabs, TabsLine, Badge, Text]
tokens:
  - --triplex-next-Tabs-Type1_Background
  - --triplex-next-Tabs-Type2_Background
  - --triplex-next-Tabs-Type1_Tab_Background_Default
  - --triplex-next-Tabs-Type2_Tab_Background_Default
  - --triplex-next-Tabs-Type1_Tab_Background_Hover
  - --triplex-next-Tabs-Type2_Tab_Background_Hover
  - --triplex-next-Tabs-Type1_Tab_Background_Selected
  - --triplex-next-Tabs-Type2_Tab_Background_Selected
  - --triplex-next-Tabs-Tab_BorderColor_Default
  - --triplex-next-Tabs-Tab_BorderColor_Focus
stories: stories/TabsExtended/TabsExtended.stories.tsx
version: "1.0"
---

# TabsExtended

## Назначение

Базовый компонент табов-переключателей: сам он задаёт контекст, корневой контейнер с `role="tablist"` и логику «какие табы не поместились в строку», а разметку каждого таба собирает потребитель из субкомпонентов. Табы, которые не помещаются по ширине, автоматически уезжают в выпадающий список — его рендерит потребитель через render-prop.

Используй когда: нужны табы с нестандартным содержимым или нестандартным триггером выпадающего списка — то, что нельзя выразить через готовый `Tabs`.
Не используй когда:

- достаточно списка табов «лейбл + значок уведомления» — возьми `Tabs`: он собран поверх `TabsExtended`, добавляет клавиатурную навигацию стрелками и готовую кнопку выпадающего списка;
- нужны табы-подчёркивания в шапке раздела — возьми `TabsLine`;
- нужен просто набор переключателей без семантики табов — это не задача компонента.

---

## Состав (compound-компонент)

Состав задаётся вложенностью субкомпонентов, порядок важен: `TabsWrapper` должен идти раньше `DropdownWrapper`.

| Субкомпонент | Обязателен | Что делает |
|---|---|---|
| `TabsExtended.Content` | Да | Контейнер с фоном, скруглением и внутренними отступами. Несёт размер (`size`) |
| `TabsExtended.Content.TabsWrapper` | Да | Рендерит табы и скрытую копию табов для замеров. По замерам решает, какие табы уезжают в Dropdown |
| `TabsExtended.Content.Tab` | Да | Контейнер (`<span>`) одного таба. Render-prop отдаёт `selected`, `isFirstInlineTab`, `isLastInlineTab`. Обрабатывает клик |
| `TabsExtended.Content.TabButton` | Практически всегда | Кнопка таба: `<button role="tab">` с текстом и опциональным значком уведомлений |
| `TabsExtended.Content.DropdownWrapper` | Нет | Контейнер выпадающего списка. Render-prop отдаёт id не поместившихся табов и обработчик выбора. Скрыт (`hidden`), пока все табы помещаются |

Без `DropdownWrapper` компонент работает, но не поместившиеся табы просто исчезают из строки — попасть в них будет нельзя.

---

## Варианты и props

`ITabsExtendedProps` расширяет `React.HTMLAttributes<HTMLDivElement>`. Неизвестные компоненту атрибуты уходят на корневой `<div>`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `selectedId` | `string` | Id выбранного таба. Компонент полностью управляемый: своего состояния выбора у него нет |
| `onSelectTab` | `TTabsExtendedOnSelectTab` | Запрос на смену выбранного таба. Вызывается **только** если кликнули по табу, отличному от `selectedId` |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `type` | `ETabsExtendedType` | `TYPE_1` | Тип оформления, выбирается по фону **страницы**: `TYPE_1` — серый фон контейнера, для белой страницы; `TYPE_2` — белый фон контейнера, для затенённой страницы. Значение уходит в контекст и применяется к кнопкам таба |

### Props субкомпонентов

| Субкомпонент | Prop | По умолчанию | Описание |
|---|---|---|---|
| `Content` | `size` | `EComponentSize.MD` | Скругление и внутренние отступы контейнера |
| `Tab` | `id` | — | Id таба. Сопоставляется с `selectedId` и с id из `DropdownWrapper` |
| `TabButton` | `selected` | `false` | Выбранное состояние: класс `selected` и `aria-selected` |
| `TabButton` | `size` | `EComponentSize.MD` | Размер кнопки и размер текста внутри неё |
| `TabButton` | `showNotificationIcon` | `false` | Значок новых уведомлений (`Badge.Dot`) в правом верхнем углу кнопки |

### Ограничения

- `size` на `Content` и `size` на `TabButton` — **независимые props**. Контейнер не транслирует свой размер кнопкам; передавать нужно оба, иначе отступы контейнера и высота кнопок разойдутся.
- `Tab` и `DropdownWrapper` принимают `children` только как функцию (render-prop). Обычные узлы туда положить нельзя — тип это запрещает.
- Компонент не рендерит выпадающий список сам: и триггер, и список — целиком на потребителе. В библиотеке для этого обычно берут `ButtonDropdown`.
- **Высоту триггера потребитель обязан согласовать с высотой кнопки таба.** `DropdownWrapper` — обычный flex-элемент строки, а строка тянется по самому высокому: `ButtonDropdown` размера MD — 40px против 32px у таба того же размера, поэтому «сырой» триггер растягивает и контейнер (40px → 48px), и сами табы (32px → 40px, из-за `align-items: stretch`). Ориентир по высоте: SM — 20px, MD — 32px, LG — 40px; в библиотеке это зашито в `Tabs` классом `.tabButtonDropdown`, в примерах stories — через `buttonAttributes.style`.
- У `TabButton` нет собственного оформления для `disabled`: атрибут проставится, но визуально кнопка не изменится.
- Возможность переопределить роль зависит от порядка спреда и у каждого субкомпонента своя: на `TabsExtended` `role="tablist"` стоит до `...rest` — переопределяется; на `Tab` `role="presentation"` и `data-tab-item-id` стоят после спреда — не переопределяются (и `data-tab-item-id` трогать нельзя, по нему идут замеры); на `TabButton` спред идёт последним — переопределяется всё, включая `role="tab"`, `aria-selected` и `type`.

---

## Дизайн-токены

Компонент использует токены семейства `Tabs` — они общие с `Tabs`:

```text
--triplex-next-Tabs-Type1_Background
--triplex-next-Tabs-Type2_Background
--triplex-next-Tabs-Type1_Tab_Background_Default
--triplex-next-Tabs-Type2_Tab_Background_Default
--triplex-next-Tabs-Type1_Tab_Background_Hover
--triplex-next-Tabs-Type2_Tab_Background_Hover
--triplex-next-Tabs-Type1_Tab_Background_Selected
--triplex-next-Tabs-Type2_Tab_Background_Selected
--triplex-next-Tabs-Tab_BorderColor_Default
--triplex-next-Tabs-Tab_BorderColor_Focus
```

Собственного префикса `--triplex-next-TabsExtended-*` у компонента нет: переименование токенов `Tabs` ломает оба компонента сразу.

---

## Инварианты

- `forwardRef` есть у `TabsExtended` и всех пяти публичных субкомпонентов — не убирать. Ref указывает на тот же элемент, который получает `className` и `...rest`: у `TabsWrapper` это **отображаемый** контейнер (`tabsReal`), а не скрытый контейнер замеров.
- `TabsExtended` — `forwardRef`-компонент со статическим свойством `Content`, у `Content` — статические `TabsWrapper`, `Tab`, `TabButton`, `DropdownWrapper`. Набор статических свойств — часть публичного API.
- Интерфейс props кнопки называется `ITabsExtendedButtonProps` (без `Tab` в середине) — рассинхрон с именем компонента `TabsExtendedTabButton`. Переименование — breaking change, требует отдельного согласования.
- Атрибут `data-tab-item-id` на `Tab` — контракт замеров: по нему `TabsWrapper` находит табы среди детей скрытого контейнера. Не переименовывать и не снимать.
- Скрытый контейнер `tabsFake` обязан идти в разметке **раньше** отображаемого `tabsReal`: на этом построено сравнение позиций.
- `TabsWrapper` копирует `children` в скрытый контейнер, вырезая `data-`атрибуты потребителя (`stripDataAttributes`). Это нужно, чтобы селекторы по `data-`атрибутам не находили две копии одного таба. Копия создаётся через `React.createElement(child.type, props)` — компонент-обёртка вокруг `Tab` в копию не попадёт корректно, вкладывать `Tab` в собственные обёртки не стоит.
- У таба, уехавшего в Dropdown, и у любого таба из скрытой копии атрибут `id` снимается — иначе в DOM оказались бы два элемента с одинаковым `id`. `data-tab-item-id` при этом остаётся.
- Контекст `TabsExtendedContext` и `TabsExtendedTabContext` через barrel `index.ts` не экспортируются (`TabsExtendedTabContext` реэкспортируется из `components/index.ts` — это исторический факт, а не приглашение им пользоваться). Их форма — внутренняя деталь.
- `Tabs` построен поверх `TabsExtended` и опирается на `isFirstInlineTab` / `isLastInlineTab` в клавиатурной навигации. Любое изменение семантики этих флагов ломает `Tabs`.
- Значение контекста мемоизировано (`useMemo`), а `onSelectTab` обёрнут в `useCallback`. Возврат к пересозданию объекта на каждый рендер вернёт лишние перерисовки всех табов.

---

## Accessibility

- Корневой элемент — `role="tablist"`, кнопка таба — `role="tab"` с `aria-selected`. Контейнер таба (`<span>`) помечен `role="presentation"`, чтобы не добавлять лишний уровень в дерево доступности.
- `aria-controls` и связку с панелью контента компонент **не выставляет** — если табы переключают панели, `id` панели и `aria-controls` проставляет потребитель.
- Клавиатурной навигации стрелками у `TabsExtended` нет: обработка `ArrowLeft` / `ArrowRight` и roving `tabIndex` живут в `Tabs`. Если строишь свой набор табов на `TabsExtended`, клавиатуру нужно реализовать самому — флаги `isFirstInlineTab` / `isLastInlineTab` из render-prop `Tab` для этого и предназначены.
- Выбор таба срабатывает по клику на контейнере `Tab`; нативная активация `<button>` по `Enter` / `Space` работает за счёт того, что `TabButton` рендерит настоящий `<button>`. Если подставляешь свой компонент кнопки, он тоже должен рендерить `<button>`, иначе выбор с клавиатуры сломается.
- Фокус подсвечивается через `:focus-visible` (токен `Tab_BorderColor_Focus`) — только при клавиатурной навигации.
- Таб, уехавший в Dropdown, скрыт через `display: none` и из порядка обхода клавиатурой выпадает; попасть в него можно только через выпадающий список.
- Компонент не хардкодит текст: `aria-label` кнопки выпадающего списка задаёт потребитель (библиотека мультиязычная).

---

## Связанные компоненты

Отдельного AI.md нет ни у одного субкомпонента семейства — все они описаны здесь. Это область задачи TRI-91 («Scope: только TabsExtended»): в таблице `docs/ai/ROADMAP.md` у `TabsExtended` одна строка.

**Части составного компонента (`components/`):**

- `TabsExtendedContent` — контейнер с фоном и размером; хост статических субкомпонентов.
- `TabsExtendedTabsWrapper` — замеры и распределение табов между строкой и Dropdown; единственное место, где живёт `useResizeDetector`.
- `TabsExtendedTab` — контейнер таба, обработка клика, render-prop с состоянием.
- `TabsExtendedTabButton` — кнопка таба: два слоя текста (обычный и hover-состояние) и значок уведомлений.
- `TabsExtendedDropdownWrapper` — контейнер выпадающего списка; отдаёт наружу id не поместившихся табов.

**Инфраструктура (через barrel не экспортируется):**

- `TabsExtendedContext` — выбранный таб, распределение табов, ref на Dropdown, тип оформления.
- `TabsExtendedTabContext` — флаг `isFakeTab`, отличающий скрытую копию таба от отображаемой.
- `utils.ts` — маппинги «размер → размер текста» и «тип → CSS-класс».

**Соседние компоненты:**

- `Tabs` — готовые табы поверх `TabsExtended`: принимает массив `tabs`, сам рендерит `ButtonDropdown` и добавляет навигацию стрелками. Первый выбор для типовой задачи.
- `TabsLine` — альтернативный визуальный паттерн табов (подчёркивание вместо залитой кнопки), собственной логики переполнения не имеет.
- `Badge` — `TabButton` рендерит `Badge.Dot` как значок новых уведомлений.
- `Text` — текст внутри `TabButton`; размер выбирается по `size` через `TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP`.
- `ButtonDropdown` — компонент, которым в примерах и в `Tabs` заполняется `DropdownWrapper`. Зависимости от него у `TabsExtended` нет.

---

## Stories

Основные истории: `stories/TabsExtended/TabsExtended.stories.tsx`
Файлы примеров: `stories/TabsExtended/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `type`, размера, количества табов и ширины контейнера |
| `Default` | `Default.tsx` | Минимальный состав: три таба без выпадающего списка |
| `Types` | `Types.tsx` | Типы оформления `TYPE_1` и `TYPE_2` |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG на `Content` и `TabButton` |
| `WithNotificationIcon` | `WithNotificationIcon.tsx` | Значок новых уведомлений на табах |
| `WithDropdown` | `WithDropdown.tsx` | Узкий контейнер: часть табов уезжает в `ButtonDropdown` |
| `VisualTests` | `VisualTests.tsx` | Типы × размеры, значок уведомлений, раскрытый выпадающий список, `:focus-visible` на табе (через `play`) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-14 | Создан документ AI-ready для `TabsExtended` (TRI-91). |
| 2026-08-14 | Правки по ревью (документация и stories, кода компонента не касаются): в «Ограничения» добавлено требование согласовывать высоту триггера Dropdown с высотой кнопки таба — «сырой» `ButtonDropdown` растягивает контейнер и табы; в примерах stories это согласование сделано через `buttonAttributes.style` (проверено в браузере: контейнер 48px → 40px, таб 40px → 32px). Описание `ETabsExtendedType` в JSDoc и здесь приведено к одной формулировке — тип выбирается по фону страницы, а не контейнера. |
| 2026-08-14 | AI-рефакторинг: `TabsExtended`, `TabsExtendedContent`, `TabsExtendedTabsWrapper` и `TabsExtendedDropdownWrapper` переведены с `React.FC` на `forwardRef` (у `DropdownWrapper` ref потребителя объединён с внутренним ref замеров), у всех субкомпонентов появился `displayName`. Значение контекста мемоизировано. В `TabsWrapper` убраны non-null assertion'ы, чтение ref во время рендера заменено на состояние, зависимости `useLayoutEffect` приведены в порядок, константы и `stripDataAttributes` вынесены на module scope. JSDoc проставлен на всех публичных props, enum и типах. Публичный API (имена props, значения enum, barrel-экспорты) не изменён. Добавлены unit-тесты на все субкомпоненты и stories по modern pattern. |
