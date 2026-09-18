---
component: UploadZone
category: UploadZone
related: []
tokens:
  - UploadZone.Background_Default
  - UploadZone.Background_Hover
  - UploadZone.BorderColor_Default
  - UploadZone.DragArea_Background
  - UploadZone.DragArea_BorderColor
stories: stories/UploadZone/UploadZone.stories.tsx
version: "1.0"
---

# UploadZone

## Назначение

Зона загрузки файлов: кликабельная область с пунктирной рамкой, открывающая
системный диалог выбора файлов, и опциональная дроп-зона, которая раскрывается
поверх заданного контейнера, пока пользователь перетаскивает файлы.

Собственного содержимого компонент не рисует — разметка передаётся
render-функцией в `children`, а результат выбора приходит одним обработчиком
`onChange` и для диалога, и для drag-and-drop.

Используй когда: нужен блок «перетащите файл или выберите на компьютере»,
в том числе с подсветкой всей области формы/карточки при перетаскивании.
Не используй когда: нужен готовый список загруженных файлов со статусами —
`UploadZone` отвечает только за приём файлов, таблицу/список строит потребитель
(см. story `Example: production`); нужна кнопка загрузки без зоны
перетаскивания — достаточно обычного `<input type="file">` рядом с `Button`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `children` | `(props: IUploadZoneChildrenProvideProps) => React.ReactNode` | Render-функция содержимого зоны. Получает `openUploadDialog` |
| `onChange` | `UploadZoneOnChangeType` | Единый обработчик выбора файлов: `(files: FileList \| null, e: React.SyntheticEvent) => void`. Вызывается и при выборе через диалог, и при drop |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `dropZoneContainer` | `HTMLElement \| null` | `undefined` | Контейнер, на площади которого перехватывается перетаскивание. Без него drag-and-drop не работает вовсе |
| `renderContainerContent` | `() => JSX.Element` | `undefined` | Контент внутри дроп-зоны (иконка + подпись «Положите файлы сюда») |

Остальные props — `Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children">`.

### Куда попадают `className`, `ref` и `...rest`

Это главная неочевидность компонента:

- **`ref`** указывает на корневой `<div class="uploadZone">` — обёртку,
  которая задаёт фон и `position: relative`.
- **`className` и все остальные HTML-атрибуты** уходят **не** на корневой
  элемент, а на абсолютно позиционированный слой-перехватчик кликов
  (`uploadZoneDragArea`) внутри него. Те же `className` и `...rest`
  дублируются на слой дроп-зоны (`uploadZoneContainerDragArea`), когда он
  смонтирован.
- **`onDrop` и `onDragOver`** вынимаются из `...rest` отдельно и вешаются
  только на дроп-зону. `onDragOver` вызывается после `preventDefault()`,
  `onDrop` — до `onChange`.
- `onClick` из `...rest` раскладывается **после** внутреннего обработчика, поэтому
  переданный `onClick` полностью заменяет открытие диалога по клику на зону.

### `UploadZone.Input` — поле выбора файлов

Составная часть: `UploadZone.Input` (он же экспортируемый `UploadZoneInput`).

- Рендерится внутри `children` и обязателен, если нужен диалог выбора файлов:
  `openUploadDialog()` вызывает `click()` именно на нём. Без `UploadZone.Input`
  и клик по зоне, и `openUploadDialog()` ничего не делают.
- Поле скрыто (`display: none`) и потому не фокусируется — доступную точку
  входа даёт потребитель (см. Accessibility).
- Свой `onChange` полем не поддерживается (`Omit<..., "onChange">`): изменение
  всегда уходит в `onChange` родительского `UploadZone` через контекст.
  Остальные атрибуты (`multiple`, `accept`, `disabled`, `data-*`) проходят как есть.
- При клике поле сбрасывает `value`, иначе повторный выбор того же файла не
  вызовет `change`.
- `ref` пробрасывается на `<input>`; параллельно ссылка кладётся во внутренний
  контекст — переданный потребителем ref её не отменяет.

### Как работает дроп-зона

- Слушатели `dragenter` / `dragleave` вешаются на `dropZoneContainer`.
  Счётчик вложенных `dragenter` (события всплывают от дочерних элементов)
  не даёт зоне мигать при движении курсора над содержимым.
- Пока идёт перетаскивание, в `dropZoneContainer` добавляется отдельный
  `<div>` с собственным React-root (`createRoot`), в нём рендерится дроп-зона
  на всю площадь контейнера. После `drop` или ухода курсора узел удаляется,
  а root размонтируется на следующем микротаске.
- Контент дроп-зоны формируется **один раз** в момент появления. Изменение
  `renderContainerContent` или `className` во время перетаскивания на уже
  открытую зону не влияет.
- Контейнеру нужен `position: relative` (и `display: flow-root`, если зона
  должна накрывать блок целиком) — слой позиционируется абсолютно по всем
  четырём сторонам.

### Мобильная вёрстка

На ширине `≤ @screen-sm-max` (767px) фон корневого элемента и слой с пунктирной
рамкой скрываются: перетаскивание на мобильных недоступно. Разметку под мобильный
сценарий (заголовок + кнопка «Загрузить», вызывающая `openUploadDialog`) даёт
потребитель — типовой приём с `MobileView` показан в stories `Default`
и `Example: production`. На узком экране перетаскивания нет, поэтому по дизайну
вместо области сброса показывается обычная кнопка загрузки.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/UploadZone.ts`.

```text
UploadZone.Background_Default
UploadZone.Background_Hover
UploadZone.BorderColor_Default
UploadZone.DragArea_Background
UploadZone.DragArea_BorderColor
```

`Background_*` — фон корневого блока в покое и при наведении (на мобильной
ширине фон отключён). `BorderColor_Default` — пунктирная рамка зоны в покое.
`DragArea_*` — фон и рамка дроп-зоны, видимой во время перетаскивания.

---

## Инварианты

- `forwardRef` на `UploadZone` — не убирать; ref всегда указывает на корневой
  `<div class="uploadZone">`, а не на слой-перехватчик.
- Раскладка `className` / `...rest` на слой `uploadZoneDragArea` (а не на
  корневой элемент) — наблюдаемое поведение публичного API. Перенос их на
  корневой `<div>` сломает существующую вёрстку потребителей.
- `onChange` — единственный канал результата и для диалога, и для drop.
  Добавлять отдельный `onChange` в `UploadZone.Input` нельзя: тип поля намеренно
  исключает этот prop.
- `UploadZoneOnChangeType` экспортируется из barrel без префикса `T`
  (нарушение текущего naming convention) — переименование будет ломающим
  изменением, оставлено как есть.
- Barrel `src/components/UploadZone/index.ts` экспортирует `UploadZone`,
  `IUploadZoneProps`, `IUploadZoneChildrenProvideProps`, `UploadZoneInput`,
  `IUploadZoneInputProps`, `UploadZoneOnChangeType`.
- `UploadZoneContext` — внутренняя деталь, в barrel его нет; связь
  `UploadZone` ↔ `UploadZone.Input` можно менять свободно.
- Класс `uploadZoneContainerDragArea` используется unit-тестами для поиска
  смонтированной дроп-зоны — переименование требует правки тестов.
- Дроп-зона монтируется через отдельный `createRoot` (React 18 API) — это
  единственное место компонента, зависящее от версии React.

---

## Accessibility

- Слой-перехватчик кликов — `<div role="none">` с `onClick`: он намеренно
  скрыт от дерева доступности и **не управляется с клавиатуры**.
- Поле `UploadZone.Input` скрыто через `display: none`, поэтому в таб-порядок
  тоже не попадает.
- Отсюда требование к потребителю: чтобы загрузка была доступна с клавиатуры
  и скринридеру, в `children` нужен фокусируемый элемент, вызывающий
  `openUploadDialog`.
- Этому требованию отвечает `Button` (в том числе `theme={EButtonTheme.LINK}`,
  если нужен вид ссылки): он рендерит `<button>` и попадает в таб-порядок.
  **`Link` без `href` — не отвечает**: он рендерит `<a role="link">`, а такой
  элемент браузер в таб-порядок не включает.
- В десктопном контенте примеров stories используется `Link`, поэтому точка
  входа в диалог там с клавиатуры недоступна. Мобильные ветки `Default`
  и `Example: production` вызывают `openUploadDialog` из `Button` и доступны.
  В продуктовом коде предпочитай `Button`.
- Текстовые подписи и `aria-label` задаёт потребитель: компонент не хардкодит
  строки на конкретном языке.

---

## Связанные компоненты

Отдельного семейства и близких альтернатив у компонента нет — `related` пуст.

- `UploadZone.Input` — составная часть, описана выше; собственного AI.md не имеет.
- Типовые соседи в разметке (связь композиционная, не структурная): `MobileView`
  для мобильного варианта содержимого, `TableBasic` со списком загруженных
  файлов, `Link` / `Button` как точка вызова `openUploadDialog`, `HelpBox`
  с подсказкой о допустимых форматах.

---

## Stories

Основные истории: `stories/UploadZone/UploadZone.stories.tsx`
Файлы примеров: `stories/UploadZone/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Переключение `dropZoneContainer`, `renderContainerContent` и `multiple` |
| `Default` | `Default.tsx` | Зона с дроп-зоной на площади внешнего контейнера; на узком экране через `MobileView` вместо неё кнопка |
| `Production` (Example: production) | `Production.tsx` | Композиция с таблицей загруженных файлов и мобильным вариантом через `MobileView` |
| `VisualTests` | `VisualTests.tsx` | Состояния для скриншот-тестов: покой и раскрытая дроп-зона (через `play`) |

`Playground` исключён из скриншот-тестов: кадр зависит от значений controls.
`Production` тоже исключён — пример композиционный, его кадр ловит изменения
`TableBasic` и `MobileView`, а не самой зоны загрузки.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-16 | Создан документ. AI-рефакторинг: `UploadZone.Input` получил `forwardRef` и корректный `displayName`, stories переписаны на modern pattern |
| 2026-09-18 | Правки по ревью: в примерах точка входа в диалог вернулась на `Link`, уточнён раздел Accessibility |
