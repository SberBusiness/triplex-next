---
component: LoaderScreen
category: Loaders
related: [LoaderSmall, LoaderMiddle, Gap, Text, ModalWindowContent, LightBoxContent, LightBoxSideOverlay, List, TableBasic, MultiselectField]
tokens:
  - --triplex-next-LoaderScreen-Small_Backdrop_Default
  - --triplex-next-LoaderScreen-Middle_Backdrop_Default
stories: stories/Loaders/LoaderScreen/LoaderScreen.stories.tsx
version: "1.0"
---

# LoaderScreen

## Назначение

Виджет-загрузчик: абсолютно позиционированный `<div>`, который перекрывает область ближайшего
позиционированного родителя полупрозрачной подложкой и показывает по её центру лоадер
(`LoaderSmall` или `LoaderMiddle`), опциональное описание и опциональные кнопки.

Используй когда: нужно закрыть уже отрисованный блок на время загрузки — тело модального окна,
контент LightBox, список, таблицу, выпадающий список поля. Так пользователь видит, какая именно
часть интерфейса перезагружается, и не теряет контекст страницы.

Не используй когда:
- Нужен просто индикатор загрузки без перекрытия контента — возьми `LoaderSmall` или `LoaderMiddle`
  напрямую.
- Нужен полноэкранный лоадер приложения — LoaderScreen перекрывает только своего позиционированного
  родителя, а не вьюпорт.
- Нужно заблокировать взаимодействие со страницей — LoaderScreen не ловушка фокуса и не модальный
  оверлей, см. «Accessibility». Для блокирующего сценария возьми `ModalWindow` / `LightBox`
  с их встроенным `isLoading`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `type` | `"small" \| "middle"` | Какой лоадер рендерится внутри и какой токен подложки используется. `small` → `LoaderSmall` с темой `ELoaderSmallTheme.BRAND`, `middle` → `LoaderMiddle` |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер лоадера. **Учитывается только при `type="small"`** — `LoaderMiddle` размеров не имеет и prop молча игнорируется |
| `description` | `React.ReactNode` | — | Текст под лоадером. Оборачивается в `Text` (`tag="div"`, `size={ETextSize.B2}`) с выравниванием по центру |
| `controls` | `React.ReactNode` | — | Кнопки под лоадером (например, «Отмена»). Рендерятся в простом `<div>` без раскладки — flex/gap задаёт потребитель |

Компонент расширяет `React.HTMLAttributes<HTMLDivElement>` — все стандартные атрибуты `<div>`
(`className`, `style`, `role`, `aria-*`, `data-*`, обработчики событий) попадают на корневой элемент.

### `ILoaderScreenMiddleProps`

`Omit<ILoaderScreenProps, "type" | "size">` — экспортируемый тип для компонентов, которые встраивают
LoaderScreen и сами фиксируют `type="middle"`. Потребителю остаются `description`, `controls`,
`className` и остальные атрибуты `<div>`. Используется в `ModalWindowContent`, `LightBoxContent`,
`LightBoxSideOverlay` как тип prop'а `loaderScreenProps`.

### Ограничения раскладки

- **Родитель обязан быть позиционированным** (`position: relative` / `absolute` / `fixed`).
  Сам LoaderScreen — `position: absolute` с `left/top/right/bottom: 0`; при статическом родителе он
  растянется по ближайшему позиционированному предку выше или по initial containing block.
  Во всех stories и примерах обёртка явно получает `position: relative`.
- **Ширина контента ограничена 380px** (`.loaderContent`), содержимое центрируется по обеим осям.
  Длинное `description` переносится, а не расширяет блок.
- **Отступы фиксированы:** `Gap size={24}` между лоадером и описанием и между описанием и кнопками.
  Настроить их через props нельзя.
- **`z-index: @z-index-loader-screen`** (10100 из `src/helpers/less/z-indexes.less`). Значение выше
  тултипа; `ModalWindowClose` намеренно поднимается ещё выше (`@z-index-loader-screen + 50`), чтобы
  крестик оставался кликабельным поверх лоадера.

---

## Дизайн-токены

```
--triplex-next-LoaderScreen-Small_Backdrop_Default    (подложка при type="small")
--triplex-next-LoaderScreen-Middle_Backdrop_Default   (подложка при type="middle")
```

Определены в `src/components/DesignTokens/components/LoaderScreen.ts`. Оба ссылаются на
`ColorNeutralAlpha.30` (в тёмной теме — `ColorDarkNeutralAlpha.30`), то есть визуально совпадают, но
разведены по типам намеренно — чтобы дизайн мог развести их независимо.

Там же объявлен третий токен `--triplex-next-LoaderScreen-Middle_Background_Default`, который стилями
LoaderScreen **не используется**: фон плашки `LoaderMiddle` берётся из
`--triplex-next-Loader-Middle_Background_Default`, а точки — из
`--triplex-next-Loader-Element_Background_Brand`. Токен остаётся в публичном наборе (его удаление —
breaking change для темизации), но опираться на него не нужно.

Собственных цветов текста у компонента нет — они приходят из `Text` (`Typography`).

---

## Инварианты

- **`forwardRef`** — обязателен, `ref` идёт на корневой `<div>` подложки (не на внутренний лоадер).
- **Публичный API:** `LoaderScreen`, `ILoaderScreenProps`, `ILoaderScreenMiddleProps` экспортируются
  через `src/components/LoaderScreen/index.ts`. `type` — строковый union `"small" | "middle"`,
  а не enum; замена на enum — breaking change.
- **`ILoaderScreenMiddleProps` не мёртвый тип** — на нём держатся `loaderScreenProps` в
  `ModalWindowContent`, `LightBoxContent` и `LightBoxSideOverlay`. Удалять нельзя.
- **`type` управляет и лоадером, и подложкой одновременно.** Разделять их на два props без задачи
  не нужно: `TYPE_TO_BACKDROP_CLASS_NAME_MAP` в `LoaderScreen.tsx` держит это соответствие в одном месте.
- **Тема `LoaderSmall` захардкожена как `ELoaderSmallTheme.BRAND`** — `NEUTRAL` через LoaderScreen
  недоступна. Пробрасывание темы наружу — расширение публичного API.
- **CSS-классы `loaderScreen`, `loaderSmallBackdrop`, `loaderMiddleBackdrop`** проверяются в
  unit-тестах — переименование поймается прогоном. `loaderContent` и `description` тестами не
  покрыты: они задают раскладку (ограничение ширины 380px и центрирование текста, см.
  «Ограничения раскладки»), их переименование безопасно, но требует синхронной правки
  `LoaderScreen.module.less`. `className` потребителя добавляется последним и базовые классы
  не затирает.
- **Корневой элемент — `<div>`**: смена тега ломает абсолютное позиционирование потребителей.

---

## Accessibility

- **Роль `status` живёт на внутреннем лоадере**, а не на корневом `<div>`: `LoaderSmall` и
  `LoaderMiddle` сами выставляют `role="status"` и `aria-label="loading"`. Корневая подложка —
  презентационный контейнер без роли.
- **`aria-label="loading"` захардкожен в компонентах семейства Loader** — это отклонение от правила
  «не хардкодь aria-текст» (`docs/ai/codestyle.md`). Локализовать его через LoaderScreen нельзя;
  фикс относится к `src/components/Loader/`.
- **Фокус не перехватывается и не возвращается.** LoaderScreen не focus trap: элементы под подложкой
  остаются в tab-порядке и доступны с клавиатуры, хотя визуально закрыты. Если взаимодействие нужно
  запретить по-настоящему — делай это на уровне потребителя (`disabled`, `inert`, снятие контента
  из DOM) или используй модальные компоненты.
- **Мышь блокируется, клавиатура — нет.** Подложка перекрывает клики по контенту под собой просто
  потому, что лежит сверху и имеет фон.
- Потребитель может передать `role`, `aria-live`, `aria-busy` и другие атрибуты через spread на
  корневой `<div>` — компонент их не переопределяет.
- Анимация лоадеров непрерывная; `prefers-reduced-motion` семейством Loader не обрабатывается.

---

## Связанные компоненты

- `LoaderSmall` — рендерится при `type="small"` с темой `BRAND` и переданным `size`.
- `LoaderMiddle` — рендерится при `type="middle"`; своих props не имеет.
- `Gap` — фиксированные отступы 24px между лоадером, описанием и кнопками.
- `Text` (`Typography`) — обёртка `description` (`ETextSize.B2`, выравнивание по центру).
- `ModalWindowContent` — `isLoading` + `loaderScreenProps?: ILoaderScreenMiddleProps`.
- `LightBoxContent`, `LightBoxSideOverlay` — то же через свои `loaderScreenProps`.
- `List` — при `loading` кладёт `LoaderScreen type="middle"` поверх списка.
- `TableBasic` — лоадер поверх тела таблицы.
- `MultiselectField` — `LoaderScreen type="small"` внутри выпадающего списка.

---

## Stories

Основные истории: `stories/Loaders/LoaderScreen/LoaderScreen.stories.tsx`
Файлы примеров: `stories/Loaders/LoaderScreen/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контроль `type`, `size`, `description` и наличия кнопок |
| `Default` | `DefaultExample.tsx` | Минимальный вариант: `type="small"`, `size="md"` в relative-обёртке |
| `Types` | `TypesExample.tsx` | `small` и `middle` рядом |
| `VisualTests` | — | Скриншот-состояния: `small` без текста, `middle` с описанием и кнопками, `middle` только с кнопками (анимации отключены) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-06 | Создан документ. AI-рефакторинг: порядок импортов по `codestyle.md`, JSDoc на компоненте, props и `ILoaderScreenMiddleProps` (включая `@default` для `size`), подложка вынесена в `TYPE_TO_BACKDROP_CLASS_NAME_MAP`, `className` в `clsx` перенесён в конец. Unit-тесты расширены: все значения `EComponentSize`, игнорирование `size` при `type="middle"`, класс подложки по типу, отсутствие `description` / `controls`, мердж `className`, spread rest-props, `forwardRef`. Публичный API, DOM и стили не изменены. |
