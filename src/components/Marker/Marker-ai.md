---
component: Marker
category: Marker
related: [Badge, MarkerStatus]
tokens:
  - Marker.Background_Error
  - Marker.Background_Success
  - Marker.Background_Waiting
  - Marker.Background_Warning
stories: stories/Marker/Marker.stories.tsx
version: "1.0"
---

# Marker

## Назначение

Цветная точка-индикатор статуса. Тонкая обёртка над `Badge.Dot`: единственное, что
`Marker` добавляет к точке, — цвет фона по статусу. Ни содержимого, ни состояния, ни
логики у компонента нет; размер, разметка и проброс `ref` целиком приходят из `Badge.Dot`.

Используй когда: нужно отметить статус объекта компактной цветной точкой — в строке
таблицы, в списке, рядом с заголовком.

Не используй когда:

- Нужна точка с подписью статуса и описанием под ней — возьми `MarkerStatus`, это
  готовая композиция `Marker` + типографика.
- Нужен нейтральный индикатор без статусной семантики (счётчик уведомлений,
  «есть непрочитанное») — возьми `Badge.Dot` напрямую: у него один общий токен фона.
- Нужен интерактивный элемент — `Marker` рендерит неинтерактивный `<span>` без роли,
  фокуса и обработки клавиатуры.

---

## Варианты и props

`IMarkerProps extends IBadgeDotProps`, то есть публичный API `Marker` наследует форму
props точки: любой стандартный атрибут `<span>` (`id`, `data-*`, `style`, `role`,
`aria-*`, обработчики) уходит на корневой элемент через `...rest`. `className`
объединяется с базовыми классами через `clsx`, а не заменяет их.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `status` | `EMarkerStatus` | Цвет точки: `SUCCESS` / `ERROR` / `WARNING` / `WAITING`. Значения по умолчанию нет |
| `size` | `EComponentSize` | Диаметр точки: `SM` — 6px, `MD` — 8px, `LG` — 10px. Приходит из `IBadgeDotProps`, значения по умолчанию нет |

Опциональных props сверх стандартных атрибутов `<span>` у компонента нет.
`children` унаследован из `IBadgeDotProps` как `never` — точка не имеет содержимого,
передать детей не даст типизация.

### Статусы и цвета

Каждому значению `EMarkerStatus` соответствует один css-класс и один токен фона —
соответствие задано таблицей `statusToClassNameMap` в `src/components/Marker/utils.ts`.
Другой палитры и других вариантов оформления у компонента нет: чтобы добавить статус,
нужно добавить и значение enum (breaking change), и класс, и токен.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Marker.ts`.

```text
Marker.Background_Success
Marker.Background_Error
Marker.Background_Warning
Marker.Background_Waiting
```

Значения одинаковы в светлой и тёмной темах: `ColorBrand.50`, `ColorError.50`,
`ColorWarning.50`, `ColorSystem.50` соответственно. Геометрия точки (диаметр,
скругление) токенами не задаётся — она приходит из `Badge.Dot` литералами в LESS.

---

## Инварианты

- **`forwardRef` — не убирать.** `ref` уходит на корневой `<span>`, отрендеренный
  `Badge.Dot` (тип — `HTMLSpanElement`).
- **Корневой элемент — `<span>` из `Badge.Dot`.** Собственной разметки `Marker` не
  создаёт; смена тега или добавление обёртки ломает инлайновое размещение и вертикальное
  выравнивание у потребителей (в том числе у `MarkerStatus`).
- **Значения `EMarkerStatus`** (`"success"`, `"error"`, `"warning"`, `"waiting"`) —
  часть публичного API. Совпадают с именами css-классов в `Marker.module.less`, но это
  совпадение, а не контракт: связь между статусом и классом идёт только через
  `statusToClassNameMap`.
- **`statusToClassNameMap` — внутренняя утилита, но с внешним потребителем.**
  Через barrel не экспортируется, однако `MarkerStatus` импортирует её напрямую
  (`src/components/MarkerStatus/MarkerStatus.tsx`) и вешает те же классы на свой
  корневой `<div>`; на них опирается `MarkerStatus.test.tsx`. Переименование карты
  или её ключей ломает соседний компонент и его тест.
- **Классы `.success` / `.error` / `.warning` / `.waiting` работают только вложенными
  в `.marker`** (в LESS они записаны как `&.success` и т.д.). На корневом элементе
  `MarkerStatus` те же классы фона не дают — там они висят как маркер статуса для тестов.
- **`IMarkerProps extends IBadgeDotProps`** — любое изменение формы `IBadgeDotProps`
  автоматически меняет публичный API `Marker`.
- **`displayName`** — `Marker`, виден в React DevTools.
- **Имена токенов `Marker.Background_Success` / `_Error` / `_Warning` / `_Waiting`** —
  не переименовывать: путь токена потребитель передаёт в `ThemeProvider`, а на
  соответствующий ему внутренний css-слой ссылается `Marker.module.less`.

---

## Accessibility

Компонент неинтерактивен: не получает фокус, не обрабатывает клавиатуру, ARIA-ролей и
атрибутов сам не выставляет. Строк на конкретном языке не хардкодит — весь текст
приходит от потребителя.

**Своего доступного имени у точки нет** — это ограничение унаследовано от `Badge.Dot`:
корневой `<span>` без роли попадает в `generic`, а для него доступное имя запрещено,
поэтому одного `aria-label` недостаточно. Обязанность потребителя:

- если статус продублирован видимым текстом рядом (типичный случай — `MarkerStatus`),
  точка декоративна: передай `aria-hidden`;
- если точка — единственный носитель смысла, передай роль, поддерживающую имя, вместе
  с текстом: `role="img"` и `aria-label` (оба уходят в `...rest`).

**Внутри библиотеки этого пока нет:** `MarkerStatus` рендерит `<Marker status={status} size={size} />`
без `aria-hidden`, хотя подпись статуса стоит рядом. Пробел известный, образцом для
копирования не является.

---

## Связанные компоненты

- `Badge` (`src/components/Badge/Badge.tsx`) — семейство, из которого `Marker` берёт
  точку: рендерит `Badge.Dot` и наследует `IBadgeDotProps`. Всё, кроме цвета фона
  (размеры, разметка, `ref`, ограничение `children: never`), задаётся там.
- `MarkerStatus` (`src/components/MarkerStatus/MarkerStatus.tsx`) — готовая композиция
  «точка + заголовок статуса + описание». Единственный внутренний потребитель `Marker`,
  и при этом он опирается на внутреннюю карту `statusToClassNameMap` — см. «Инварианты».

---

## Stories

Основные истории: `stories/Marker/Marker.stories.tsx`
Файлы примеров: `stories/Marker/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный подбор `status` и `size` |
| `Default` | `Default.tsx` | Минимальный вызов: оба props обязательны |
| `Statuses` | `Statuses.tsx` | Все четыре статуса с подписями |
| `Sizes` | `Sizes.tsx` | Размеры `SM` / `MD` / `LG` |
| `WithAccessibleName` | `WithAccessibleName.tsx` | Точка как единственный носитель смысла: `role="img"` + `aria-label` |

Скриншот-регрессия снимается со стори `Statuses` и `Sizes`
(`__screenshots__/marker--{statuses,sizes}--xs|xl.png`). `Playground` исключён как
интерактивная песочница, `Default` и `WithAccessibleName` — через `testRunner: { skip: true }`:
обе рендерят ровно ту же точку, что уже есть в `Statuses`. Отдельная стори `VisualTests`
не нужна — у компонента нет состояний, требующих взаимодействия (ни hover, ни focus,
ни раскрытия).

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-01 | Создан документ. AI-рефакторинг: `Marker` переведён с `React.FC` на `React.forwardRef` — `ref` теперь уходит на корневой `<span>` от `Badge.Dot`; добавлены JSDoc на компонент, `IMarkerProps.status`, значения `EMarkerStatus` и `statusToClassNameMap`, карта закреплена через `satisfies Record<EMarkerStatus, string>`, поправлен порядок импортов. Добавлены unit-тесты: `__tests__/Marker.test.tsx` (11 кейсов — разметка, базовые классы, все статусы, проброс `size` в `Badge.Dot`, мердж `className`, `ref`, `...rest`, `displayName`) и `__tests__/utils.test.tsx` (2 кейса — полнота и различимость карты статусов). Заведены stories `stories/Marker/` в modern pattern. Публичный API (имена и типы props, значения `EMarkerStatus`, barrel-экспорты), разметка и визуальное поведение не изменены. |
