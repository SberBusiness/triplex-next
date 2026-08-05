---
component: LoaderMiddle
category: Loaders
related: [LoaderSmall, LoaderScreen, TableBasic]
tokens:
  - --triplex-next-Loader-Middle_Background_Default
  - --triplex-next-Loader-Element_Background_Brand
stories: stories/Loaders/LoaderMiddle/LoaderMiddle.stories.tsx
version: "1.0"
---

# LoaderMiddle

## Назначение

Квадратный индикатор загрузки фиксированного размера 64×64 px: четыре точки по углам
внутренней области и линия, обегающая их по периметру. Все состояния анимации задаются CSS —
у компонента нет ни props, ни внутреннего состояния.

Используй когда: нужно показать, что грузится целая область или страница, а место под
индикатор заведомо есть (плитка, пустая таблица, оверлей поверх контента).

Не используй когда:
- Индикатор должен встраиваться в строку текста, кнопку или узкий элемент управления —
  возьми `LoaderSmall` (горизонтальный, с темами и размерами `SM` / `MD` / `LG`).
- Нужен индикатор с подложкой, подписью и кнопками отмены — возьми `LoaderScreen`
  (`type="middle"` рендерит внутри себя именно `LoaderMiddle`).
- Нужно управлять размером, цветом или темой — LoaderMiddle не настраивается, см. «Инварианты».

---

## Варианты и props

У компонента **нет props**. Публичный тип — `React.FC` без параметров: `<LoaderMiddle />` —
единственная допустимая форма вызова.

Следствия, важные при интеграции:

- `className` и произвольные HTML-атрибуты **не принимаются** — обернуть в свой контейнер и
  стилизовать его. Так поступает `WithAnimationExample` в stories: сбрасывает фон через
  внешний класс-обёртку, а не через prop.
- `ref` на корневой `<div>` **не пробрасывается** — компонент не обёрнут в `forwardRef`.
  Если нужен доступ к DOM, измеряй элемент-обёртку.
- Размер (64×64), геометрия точек (12×12) и тайминги анимаций (цикл 3 s) заданы в
  `styles/LoaderMiddle.module.less` и снаружи не настраиваются.

---

## Дизайн-токены

```text
--triplex-next-Loader-Middle_Background_Default
--triplex-next-Loader-Element_Background_Brand
```

- `Middle_Background_Default` — фон квадратной подложки (`ColorNeutral.80` в светлой теме,
  `ColorDarkNeutral.50` в тёмной).
- `Element_Background_Brand` — цвет точек и обегающей линии.

Оба токена объявлены в `src/components/DesignTokens/components/Loader.ts` и общие для
семейства Loader (`Element_Background_Brand` используется также в `LoaderSmall`).

---

## Инварианты

- **Публичный контракт — компонент без props.** Добавление `className`, `...rest` или обёртка
  в `forwardRef` меняет публичный тип компонента и требует отдельной задачи и записи в release
  notes. По той же схеме объявлен сосед `LoaderSmall` (`React.FC`, без `forwardRef`).
- **Корневой элемент — `<div role="status">`.** На эту связку опираются unit-тесты компонента и
  тест потребителя `LoaderScreen.test.tsx`, который ищет лоадер через
  `getByRole("status", { name: "loading" })`.
- **Имя класса корневого элемента `loaderMiddle` — внешняя зависимость.**
  `TableBasic.test.tsx` находит лоадер через `container.querySelector("[class*='loaderMiddle']")`,
  поэтому переименование класса ломает тест потребителя. Перед переименованием LESS-классов
  проверяй использование грепом (`docs/ai/ai-refactoring.md`).
- **Разметка внутренностей фиксирована:** контейнер `.loaderMiddleDots`, один `.line` и ровно
  четыре точки `.dot` с модификаторами `.dot1`–`.dot4`. Порядок и количество завязаны на
  keyframes (`lineCycle`, `dotCycleMiddle`) и на задержки анимации; удаление или перестановка
  ломает визуальную последовательность.
- **`displayName = "LoaderMiddle"`** — используется в React DevTools.
- **Токены `Loader-*` общие для семейства** — переименование ломает темизацию у потребителей и
  затрагивает `LoaderSmall`.

---

## Accessibility

- Корневой элемент имеет `role="status"` — это неявная `aria-live="polite"` область: скринридер
  сообщит о появлении лоадера, не прерывая текущее чтение.
- `aria-label="loading"` захардкожен в компоненте. Это отступление от общего правила библиотеки
  «не хардкодить язык в aria-атрибутах», унаследованное от `LoaderSmall`; менять его нельзя без
  согласования — строка входит в доступное имя, по которому лоадер находят тесты потребителей.
  Локализация доступного имени — предмет отдельной задачи по всему семейству Loader.
- Компонент неинтерактивен: не получает фокус, не обрабатывает клавиатуру и не содержит текста.
  Если загрузку нужно подписать для пользователя — используй `LoaderScreen` с `description`.
- Анимация непрерывная и не отключается по `prefers-reduced-motion` — известное ограничение
  семейства Loader.

---

## Связанные компоненты

- `LoaderSmall` (`src/components/Loader/LoaderSmall/LoaderSmall.tsx`) — горизонтальный вариант из
  трёх точек с props `theme` (`ELoaderSmallTheme`) и `size` (`EComponentSize`). Экспортируется из
  того же barrel `src/components/Loader/index.ts`.
- `LoaderScreen` (`src/components/LoaderScreen/LoaderScreen.tsx`) — оверлей-подложка с лоадером по
  центру, подписью и кнопками; при `type="middle"` рендерит `LoaderMiddle` без обёрток.
- `TableBasic` (`src/components/Table/TableBasic/TableBasic.tsx`) — показывает `LoaderMiddle` в
  футере таблицы при догрузке данных на пустом состоянии.

---

## Stories

Основные истории: `stories/Loaders/LoaderMiddle/LoaderMiddle.stories.tsx`
Файлы примеров: `stories/Loaders/LoaderMiddle/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `DefaultExample.tsx` | Единственная форма вызова — `<LoaderMiddle />` без props |
| `WithAnimation` | `WithAnimationExample.tsx` | Замена лоадера на Lottie-анимацию результата (success / fail / warning / waiting) с подгонкой размера точек |
| `VisualTests` | — | Скриншот-регрессия, анимации заглушены декоратором |

Стори `Default` и `WithAnimation` исключены из скриншот-тестов (`testRunner: { skip: true }`):
первая визуально идентична `VisualTests`, вторая завязана на проигрывание Lottie и давала бы
нестабильный снимок. Playground не создаётся — у компонента нет настраиваемых props
(`docs/ai/stories-guide.md` → «Когда не создавать Playground»).

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-05 | Создан документ. AI-рефакторинг: JSDoc на компоненте, порядок импортов приведён к codestyle, в LESS объединены дублирующиеся базовые стили `.dot` и `.line`, unit-тесты расширены с 1 до 2 кейсов (роль корневого элемента, количество точек и линии). В stories `controls: { disable: true }` перенесён на верхний уровень `parameters` (внутри `docs` не применялся). Публичный API, DOM и визуальное поведение не изменены. |
