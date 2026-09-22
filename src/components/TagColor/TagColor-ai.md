---
component: TagColor
category: Tag
related: [Tag, MarkerStatus]
tokens:
  - TagColor.Background_Default
  - TagColor.Background_Error
  - TagColor.Background_Info
  - TagColor.Background_Success
  - TagColor.Background_Warning
  - TagColor.Text_Color_Default
stories: stories/TagColor/TagColor.stories.tsx
version: "1.0"
---

# TagColor

## Назначение

Неинтерактивная цветная плашка с текстом — метка для маркировки и классификации. Цвет фона
кодирует статус (`DEFAULT` / `SUCCESS` / `INFO` / `WARNING` / `ERROR`), содержимое произвольное.
Типичное место — статус заявки в строке таблицы, тип документа в списке, признак записи рядом
с заголовком.

Используй когда: нужно показать состояние или категорию объекта короткой цветной меткой,
и пользователь с ней не взаимодействует.

Не используй когда:

- Метку нужно снимать или редактировать — возьми `Tag`: у него есть кнопки удаления
  и редактирования, но нет `status`.
- Статус достаточно показать точкой без текста — возьми `Marker`, а с подписью и описанием —
  `MarkerStatus`.
- Нужен интерактивный элемент (выбор фильтра, выпадающий список) — это семейство `Chip`.
  `TagColor` рендерит `<span>` без роли, фокуса, обработчиков и клавиатуры.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `EComponentSize` | Размер: SM (высота 16px) / MD (20px) / LG (28px). Задаёт высоту, внутренние отступы, `border-radius` (4 / 4 / 8px) и размер текста (10 / 12 / 14px) |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `status` | `ETagColorStatus` | `ETagColorStatus.DEFAULT` | Определяет **только** цвет фона. На размер, типографику и цвет текста не влияет |
| `children` | `React.ReactNode` | — | Содержимое метки. Рендерится во вложенном `<span>`, длинный текст обрезается многоточием |

Остальные props — стандартные атрибуты `span`
(`ITagColorProps extends React.HTMLAttributes<HTMLSpanElement>`), уходят на корневой элемент
через `...restProps`.

### Размер и статус независимы

Две оси не пересекаются: `size` отвечает за геометрию и типографику, `status` — за один
`background`. Любая комбинация допустима, поэтому матрицу 3×5 целиком покрывает story
`VisualTests`, а документационные stories показывают оси по отдельности.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/TagColor.ts`.

```text
TagColor.Background_Default
TagColor.Background_Success
TagColor.Background_Info
TagColor.Background_Warning
TagColor.Background_Error
TagColor.Text_Color_Default
```

Пять фоновых токенов — по одному на значение `ETagColorStatus`; добавление статуса означает
и новый токен. Цвет текста один на все статусы (`Text_Color_Default`, тёмный нейтральный
в обеих темах): фоны подобраны так, чтобы контраст держался без переключения цвета текста.

Размерные значения (высоты 16/20/28px, отступы, `border-radius`, `font-size` / `line-height`)
заданы литералами в `styles/TagColor.module.less` — они специфичны для компонента.

---

## Инварианты

- `forwardRef<HTMLSpanElement>` — не убирать. Ref всегда указывает на корневой `<span>`.
- Корневой элемент — `<span>` (метка инлайновая, встаёт в строку текста и в ячейку таблицы).
  Менять на `div` нельзя.
- `displayName` — `"TagColor"`. Не менять.
- Двухуровневая разметка обязательна: корневой `<span class="tagColor">` держит фон, размеры
  и `display: inline-flex`, вложенный `<span class="content">` — обрезку текста
  (`min-width: 0`, `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`)
  и цвет текста. Схлопывать в один элемент нельзя: обрезка перестанет работать, а `max-width: 100%`
  на корне — ограничивать ширину.
- `status` имеет значение по умолчанию `ETagColorStatus.DEFAULT` — оно проставляется
  в деструктуризации props, а не в `defaultProps`. Класс статуса на корне есть всегда.
- Значения `ETagColorStatus` (`"default"` / `"success"` / `"info"` / `"warning"` / `"error"`)
  совпадают с именами CSS-классов в `TagColor.module.less` и с суффиксами токенов
  `TagColor.Background_*`. Переименование значения enum — ломающее изменение сразу в трёх местах.
- `className` деструктурируется из props и мерджится через `clsx`, поэтому в `...restProps`
  его нет и перезатереть базовые классы он не может.
- Экспорты `TagColor`, `ITagColorProps` и `ETagColorStatus` идут в barrel
  `src/components/TagColor/index.ts` — сохранять.

---

## Accessibility

- Собственной ARIA-роли нет: корневой `<span>` — неинтерактивный контейнер, в порядок фокуса
  не попадает, обработчиков клавиатуры у компонента нет.
- Цвет — единственный визуальный носитель статуса, поэтому **смысл обязан быть в тексте
  метки**. Не полагайся на один цвет: `<TagColor status={ETagColorStatus.ERROR}>Отклонено</TagColor>`,
  а не пустая красная плашка.
- Если метка расшифровывает соседний элемент (статус строки таблицы), связывай их через
  `aria-describedby` / `aria-labelledby` на стороне потребителя — компонент никаких
  ARIA-атрибутов сам не проставляет, но пробрасывает любые через `...restProps`.
- Компонент не хардкодит текстовые строки: содержимое и любые `aria-label` / `title` задаёт
  потребитель. Библиотека мультиязычная.

---

## Связанные компоненты

- `Tag` — визуально похожая плашка, но интерактивная: с кнопками удаления и редактирования
  и без `status`. Берётся, когда значение можно снять; `TagColor` — когда метку только показывают.
- `Marker` — цветная точка-индикатор статуса без текста. Тот же набор смыслов, минимальная форма:
  берётся, когда на подпись нет места.
- `MarkerStatus` — точка с подписью и описанием. Альтернатива, когда статусу нужен не компактный
  бейдж, а строка с пояснением.

---

## Stories

Основные истории: `stories/TagColor/TagColor.stories.tsx`
Файлы примеров: `stories/TagColor/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `children`, `size` и `status` |
| `Default` | `Default.tsx` | Минимальная метка: обязателен только `size`, статус по умолчанию |
| `DifferentSizes` | `DifferentSizes.tsx` | Размеры SM / MD / LG при одном статусе |
| `DifferentStatuses` | `DifferentStatuses.tsx` | Все пять значений `ETagColorStatus` при одном размере |
| `WithOverflow` | `WithOverflow.tsx` | Обрезка длинного контента многоточием по ширине контейнера |
| `VisualTests` | `VisualTests.tsx` | Матрица размеров × статусов плюс пустая метка и обрезка — для скриншот-тестов |

Имена `DifferentSizes` и `DifferentStatuses` сохранены от прежнего story-файла намеренно:
story ID участвуют в именах baseline-скриншотов, и переименование в `Sizes` / `Statuses`
(как у `Tag`, `Marker`, `NumberField`) потребует перегенерации baseline. Отдельного решения
на это не было — не переименовывай походя.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-22 | Создан документ. AI-рефакторинг (JSDoc на props, enum и map'ах класса, типизация `STATUS_TO_CLASS_NAME_MAP`, исправлен JSDoc `ITagColorProps`), расширены unit-тесты, stories переведены на modern pattern и дополнены `VisualTests`. |
| 2026-09-22 | По ревью: `children` объявлен в `ITagColorProps` явно (тип прежний, приходил из `React.HTMLAttributes`) — попадает в таблицу Props в Storybook. JSDoc компонента сокращён, детали разметки остались здесь. |
