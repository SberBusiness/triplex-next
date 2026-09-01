---
component: MarkerStatus
category: MarkerStatus
related: [Badge, TagColor, Marker, Text, Caption]
tokens: []
stories: stories/MarkerStatus/MarkerStatus.stories.tsx
version: "1.0"
---

# MarkerStatus

## Назначение

Неинтерактивная подпись состояния: цветная точка-маркер слева, наименование статуса
справа и необязательное описание под наименованием. Собственного состояния, логики и
обработчиков нет — компонент собирает разметку из трёх частей и раздаёт классы по
`size` и `status`.

Используй когда: нужно показать статус объекта в списке, таблице или карточке
(«Исполнен», «Отклонён», «Ожидает подписи»), при необходимости с пояснением под
наименованием — датой, суммой, причиной отказа.

Не используй когда:
- Нужен интерактивный элемент (клик, фокус, клавиатура) — возьми `Chip` или `Button`.
- Нужна только точка без подписи — `Marker` (или `Badge.Dot`, если статусная палитра
  не нужна).
- Нужен статус на цветной подложке — `TagColor` или `Badge`.
- Нужен многошаговый прогресс процесса — `StatusTracker`, он строит цепочку шагов и
  использует `MarkerStatus` внутри (`StatusTracker.Body.Status`).

---

## Варианты и props

`IMarkerStatusProps extends React.HTMLAttributes<HTMLDivElement>`: любой стандартный
атрибут `<div>` (`id`, `role`, `aria-*`, `data-*`, `style`, обработчики) уходит на
корневой элемент через `...rest`. `className` объединяется с базовыми классами через
`clsx`, а не заменяет их.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `status` | `EMarkerStatus` | `SUCCESS` / `ERROR` / `WARNING` / `WAITING`. Задаёт цвет точки-маркера. Enum объявлен в `src/components/Marker/enums.ts` и экспортируется из barrel `Marker` |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize.MD \| EComponentSize.LG` | `EComponentSize.MD` | Размер маркера, типографики и отступов. `EComponentSize.SM` не поддерживается — union сужен намеренно, класса `sm` в стилях нет |
| `children` | `React.ReactNode` | — | Наименование статуса. Всегда оборачивается в `Text` (`B4` для MD, `B3` для LG) — обёртка рендерится даже при пустом значении |
| `description` | `React.ReactNode` | — | Описание под наименованием. Для MD — `Caption` `C1`, для LG — `Text` `B4`; в обоих случаях `type={EFontType.SECONDARY}` |

### Размеры

| | MD | LG |
|---|---|---|
| Наименование | `Text` `B4` | `Text` `B3` |
| Описание | `Caption` `C1` | `Text` `B4` |
| Диаметр точки | 8px (`Badge.Dot` MD) | 10px (`Badge.Dot` LG) |
| Отступ маркер → текст | 4px | 6px |
| Отступ наименование → описание | 0 | 4px |
| Верхний отступ маркера | 4px | 5px |

Верхний отступ маркера — оптическое выравнивание точки по первой строке
наименования, значения подобраны под конкретные высоты строк типографики. При смене
размеров текста их нужно пересчитывать.

### Falsy-значения `description`

Описание рендерится по truthy-проверке (`description && ...`). Поэтому
`description=""` и `description={false}` не выводят ни текста, ни обёртки, а
`description={0}` выводит голый `0` мимо `Caption` / `Text` — без вторичного цвета и
размера. Для числовых значений передавай строку. Это исторически сложившееся
поведение; менять его — задача с записью в release notes.

---

## Дизайн-токены

Собственных токенов в стилях компонента нет: `styles/MarkerStatus.module.less`
задаёт только раскладку (flex, отступы, выравнивание). Цвета приходят из вложенных
компонентов и переопределяются через их группы токенов — см. `ThemeProvider-ai.md` →
«Как переопределять токены».

```text
Marker.Background_Success
Marker.Background_Error
Marker.Background_Warning
Marker.Background_Waiting
Typography.Secondary_Color
```

- Цвет точки — токены группы `Marker` (`src/components/DesignTokens/components/Marker.ts`),
  применяются внутри `Marker`.
- Цвет наименования — `Typography.Primary_Color` (дефолтный `EFontType.PRIMARY`),
  цвет описания — `Typography.Secondary_Color` (`EFontType.SECONDARY`).

**Известное расхождение:** группа `MarkerStatus` в
`src/components/DesignTokens/components/MarkerStatus.ts` объявляет токен
`MarkerStatus.Description_Color`, но ни один LESS-файл его не читает — описание
красится через типографику. Токен остался от прежней реализации, его переопределение
через `ThemeProvider` ни на что не влияет. Удаление токена и его css-переменной —
изменение публичного API, делается отдельной задачей с записью в release notes
(прецедент — `ImageGallery.Arrow_*_Disabled` в 1.45.0). Поэтому во frontmatter
`tokens:` он не перечислен: список описывает токены, которые компонент реально
использует.

---

## Инварианты

- **`forwardRef`** — ref пробрасывается на корневой `<div>`; не убирать.
- **Корневой элемент — `<div>`** с классами `markerStatus` + размер + статус. Внутри
  ровно две обёртки: `markerContainer` (точка) и `contentContainer` (наименование и
  описание). На эту структуру опираются unit-тесты; `StatusTrackerStatus` дописывает
  корневому элементу свой класс `statusTrackerStatus`.
- **Классы статуса на корне приходят из CSS-модуля `Marker`** —
  `statusToClassNameMap` импортируется из `src/components/Marker/utils.ts`, где
  правила объявлены как `.marker.success` и т.п. На корне `MarkerStatus` эти классы
  визуального эффекта не дают, но присутствуют в разметке и проверяются unit-тестами
  (`toHaveClass("success")`). Не удалять без согласования: класс виден потребителю в
  DOM.
- **`size` сужен до `MD | LG`.** Расширение до полного `EComponentSize` требует
  класса `sm` в стилях, размеров типографики и верхнего отступа маркера — это новая
  функциональность, а не рефакторинг.
- **`data-tx` ставится после `...restProps`** — потребитель не может переопределить
  метку версии пакета. Порядок атрибутов в JSX менять нельзя, на это есть тест.
- **`displayName`** — `MarkerStatus`; виден в React DevTools.
- **`IMarkerStatusProps` — часть публичного API `StatusTracker`:**
  `StatusTrackerStatus` типизирован как `React.FC<IMarkerStatusProps>`
  (`src/components/StatusTracker/components/StatusTrackerStatus.tsx`). Любое изменение
  формы интерфейса автоматически меняет публичный API `StatusTracker.Body.Status`.

---

## Accessibility

- Компонент неинтерактивен: не получает фокус, не обрабатывает клавиатуру, ролей и
  aria-атрибутов не выставляет. Смысл статуса несёт текст в `children`, поэтому для
  скринридера подпись читается как обычный текст.
- **Точка-маркер не имеет доступного имени** — это чисто визуальное дублирование
  статуса, продублированное текстом рядом. Отдельная подпись ей не нужна.
- Если статус меняется динамически (например, документ переходит из «Ожидает» в
  «Исполнен») и об этом нужно сообщить скринридеру — потребитель сам передаёт
  `role="status"` или `aria-live` через `...rest`. Компонент их не выставляет.
- Строки на конкретном языке компонент не хардкодит — весь текст приходит от
  потребителя.

---

## Связанные компоненты

- `Marker` (`src/components/Marker/Marker.tsx`) — точка со статусной палитрой,
  рендерится внутри `MarkerStatus`; из его CSS-модуля берётся и `statusToClassNameMap`
  для корневого элемента.
- `Text`, `Caption` — типографика наименования и описания; размеры и `EFontType`
  выбираются по `size`.
- `Badge` — альтернатива, когда нужен статус на цветной подложке или счётчик;
  `Marker` построен на `Badge.Dot`.
- `TagColor` — альтернатива, когда статус показывается цветным тегом.
- `StatusTracker` — потребитель: `StatusTracker.Body.Status` (`StatusTrackerStatus`)
  оборачивает `MarkerStatus`, добавляя свой класс, и переиспользует `IMarkerStatusProps`.
  Обёртка объявлена как `React.FC`, то есть ref до `MarkerStatus` через неё не доходит.

---

## Stories

Основные истории: `stories/MarkerStatus/MarkerStatus.stories.tsx`
Файлы примеров: `stories/MarkerStatus/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный подбор `status`, `size`, `description` и текста |
| `Default` | `DefaultExample.tsx` | Минимальный вызов: `SUCCESS`, размер MD, описание |
| `Statuses` | `StatusesExample.tsx` | Все четыре статуса в размере MD |
| `Sizes` | `SizesExample.tsx` | Статусы в размерах MD и LG |

Скриншот-регрессия снимается со стори `Statuses` и `Sizes`
(`__screenshots__/markerstatus--statuses--xs|xl.png`,
`__screenshots__/markerstatus--sizes--xs|xl.png`). `Playground` и `Default` исключены
через `testRunner: { skip: true }`: первый — интерактивная песочница, второй полностью
покрыт стори `Sizes`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-01 | Создан документ. AI-рефакторинг: добавлен `displayName`, `data-tx` перенесён после `...restProps` (потребитель больше не может его переопределить), в `IMarkerStatusProps` добавлен явный `children` (тип совпадает с унаследованным из `React.HTMLAttributes`), JSDoc на props и компонент, модульные константы приведены к UPPER_SNAKE_CASE, порядок импортов — по `codestyle.md`. Unit-тесты расширены с 4 до 15 кейсов: типографика наименования и описания по размерам, отсутствие описания, `description` как узел, проброс `status` / `size` в `Marker`, мердж `className`, `...rest`, `data-tx`, `ref`, `displayName`. Публичный API, DOM-структура и визуальное поведение не изменены. |
