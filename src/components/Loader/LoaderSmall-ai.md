---
component: LoaderSmall
category: Loaders
related: [LoaderMiddle, LoaderScreen, Button, Dropdown, ListItemLoading, SuggestField, SelectExtendedField]
tokens:
  - Loader.Element_Background_Brand
  - Loader.Element_Background_Neutral
stories: stories/Loaders/LoaderSmall/LoaderSmall.stories.tsx
version: "1.0"
---

# LoaderSmall

## Назначение

Компактный индикатор загрузки: три точки в ряд, гаснущие по очереди. Размер задаётся
общим для библиотеки `EComponentSize` (16 / 24 / 32 px по стороне), цвет — темой
(`ELoaderSmallTheme`). Анимация целиком на CSS, внутреннего состояния у компонента нет.

Используй когда: нужно показать загрузку внутри уже существующего элемента управления —
кнопки, поля с подсказками, выпадающего списка, строки списка.

Не используй когда:
- Грузится целая область или страница и место под крупный индикатор есть — возьми
  `LoaderMiddle` (квадрат 64×64).
- Нужны подложка поверх контента, подпись и кнопки отмены — возьми `LoaderScreen`
  (`type="small"` рендерит внутри себя именно `LoaderSmall`).

---

## Варианты и props

Компонент расширяет `React.HTMLAttributes<HTMLSpanElement>`: любой стандартный атрибут
`<span>` (`id`, `data-*`, `style`, обработчики) уходит на корневой элемент через `...rest`.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `theme` | `ELoaderSmallTheme` | `BRAND` — брендовый цвет точек для светлых поверхностей; `NEUTRAL` — светлые точки для тёмных и цветных поверхностей (тёмная кнопка, цветной блок) |
| `size` | `EComponentSize` | `SM` — 16×16 (точки 4px), `MD` — 24×24 (6px), `LG` — 32×32 (8px) |

Оба props обязательны — значений по умолчанию нет, вызов `<LoaderSmall />` не типизируется.
Как правило `size` пробрасывается из размера родительского контрола: так делают `Button`,
`Dropdown`, `SuggestField`, `SelectExtendedField`.

### Опциональные props

Собственных опциональных props нет. `className` объединяется с базовыми классами
(`clsx`), а не заменяет их.

### Особенности API

- `ref` на корневой `<span>` **не пробрасывается** — компонент объявлен как `React.FC`
  без `forwardRef`. Так же объявлен сосед `LoaderMiddle`. Если нужен доступ к DOM,
  измеряй элемент-обёртку.
- Из barrel экспортируется enum `ELoaderSmallSize` (`sm` / `md` / `lg`). Компонентом он
  **не используется** — размер задаётся `EComponentSize`. Enum остаётся в публичном API
  ради обратной совместимости; в новом коде не применяй.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Loader.ts`.

```text
Loader.Element_Background_Brand
Loader.Element_Background_Neutral
```

- `Element_Background_Brand` — цвет точек темы `BRAND` (`ColorBrand.50` в обеих темах).
- `Element_Background_Neutral` — цвет точек темы `NEUTRAL` (`ColorNeutralAlpha.0`).

Токены объявлены в `src/components/DesignTokens/components/Loader.ts` и общие для семейства
Loader: `Element_Background_Brand` использует также `LoaderMiddle`. Геометрия (размеры,
`gap`, радиус) и тайминги анимации (цикл 0.9s, сдвиг фазы 0.15s) заданы в
`styles/LoaderSmall.module.less` и снаружи не настраиваются.

---

## Инварианты

- **Публичный контракт — `React.FC` без `forwardRef`.** Добавление ref-проброса расширяет
  публичный API и требует отдельной задачи и записи в release notes.
- **Корневой элемент — `<span role="status" aria-label="loading">`.** На эту связку опираются
  `LoaderSmall.test.tsx` и `LoaderScreen.test.tsx` (кейсы `type="small"`) через
  `getByRole("status", { name: "loading" })`, а `Button.test.tsx` — через
  `getByRole("status")` без фильтра по имени.
- **Разметка внутренностей фиксирована:** ровно три `<span class="dot dot1|dot2|dot3">`.
  Порядок и количество завязаны на задержки анимации (`.dot2` — 0.15s, `.dot3` — 0.3s);
  удаление или перестановка ломают визуальную последовательность.
- **`...rest` разливается после `role` и `aria-label`** — потребитель может их переопределить.
  Порядок атрибутов в JSX менять не нужно: это осознанная точка расширения.
- **`displayName = "LoaderSmall"`** — используется в React DevTools.
- **Значения `ELoaderSmallTheme`** (`brand` / `neutral`) и наличие `ELoaderSmallSize` в barrel —
  часть публичного API, удаление или переименование — breaking change.
- **`ILoaderSmallProps` — не только props этого компонента.** `DropdownMobileLoader` строит из
  него свой публичный интерфейс: `IDropownMobileLoaderProps extends Omit<ILoaderSmallProps,
  "theme" | "size">` (`src/components/Dropdown/mobile/DropdownMobileLoader.tsx:8`). Любое
  изменение формы `ILoaderSmallProps` автоматически меняет публичный API и этого компонента.
- **Токены `Loader-*` общие для семейства** — переименование ломает темизацию у потребителей
  и затрагивает `LoaderMiddle`.

---

## Accessibility

- Корневой элемент имеет `role="status"` — неявная `aria-live="polite"` область: скринридер
  сообщит о появлении лоадера, не прерывая текущее чтение.
- `aria-label="loading"` захардкожен в компоненте. Это отступление от общего правила
  библиотеки «не хардкодить язык в aria-атрибутах»; менять нельзя без согласования — строка
  входит в доступное имя, по которому лоадер находят тесты потребителей. Локализация
  доступного имени — предмет отдельной задачи по всему семейству Loader. Потребитель может
  перекрыть значение, передав свой `aria-label` (уйдёт в `...rest`).
- Компонент неинтерактивен: не получает фокус, не обрабатывает клавиатуру, текста не содержит.
  Подпись к загрузке даёт родитель (например `LoaderScreen` через `description`).
- Анимация непрерывная и не отключается по `prefers-reduced-motion` — известное ограничение
  семейства Loader.

---

## Связанные компоненты

- `LoaderMiddle` (`src/components/Loader/LoaderMiddle/LoaderMiddle.tsx`) — крупный квадратный
  вариант без props, из того же barrel `src/components/Loader/index.ts`.
- `LoaderScreen` (`src/components/LoaderScreen/LoaderScreen.tsx`) — оверлей с лоадером,
  подписью и кнопками; при `type="small"` рендерит `LoaderSmall` с темой `BRAND`.
- `Button` (`src/components/Button/Button.tsx`) — рендерит `LoaderSmall` **всегда**, а вне
  состояния `loading` прячет обёртку классом (`Button.tsx:156`), поэтому `role="status"`
  доступен и у обычной кнопки — не пиши тест вида `queryByRole("status")` → `null`.
  Тему выбирает по теме кнопки (`SECONDARY` / `SECONDARY_LIGHT` → `BRAND`,
  остальные → `NEUTRAL`), размер — по размеру кнопки.
- `Dropdown` (`DropdownList`, `DropdownMobileList`, `DropdownMobileLoader`), `SuggestField`,
  `ChipSuggest`, `SelectExtendedField`, `ListItemLoading` — показывают `LoaderSmall` с темой
  `BRAND` во время подгрузки данных.

---

## Stories

Основные истории: `stories/Loaders/LoaderSmall/LoaderSmall.stories.tsx`
Файлы примеров: `stories/Loaders/LoaderSmall/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный подбор `theme` и `size` |
| `Default` | `DefaultExample.tsx` | Минимальный вызов: тема `BRAND`, размер `MD` |
| `Themes` | `ThemesExample.tsx` | `BRAND` на светлом фоне и `NEUTRAL` на тёмной подложке |
| `Sizes` | `SizesExample.tsx` | Размеры `SM` / `MD` / `LG` в обеих темах |
| `VisualTests` | — | Скриншот-регрессия: сетка размеров × тем, анимации заглушены декоратором |

Файлы примеров сохраняют исторический постфикс `Example` (`DefaultExample.tsx`) —
переименование ломало бы ссылки на них без пользы, миграция именования не входит в задачу
(`docs/ai/stories-guide.md`).

Стори `Default`, `Themes` и `Sizes` исключены из скриншот-тестов (`testRunner: { skip: true }`):
их содержимое целиком повторяется в `VisualTests`, дублирующие снимки не нужны. Скриншоты
снимаются только со стори `VisualTests` (`loaders-loadersmall--visual-tests--xs|xl.png`).

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-06 | Создан документ. AI-рефакторинг: JSDoc на компоненте, props и значениях `ELoaderSmallTheme`, документирован неиспользуемый `ELoaderSmallSize`, порядок импортов приведён к codestyle, константы-маппинги переименованы в `THEME_TO_CLASS_NAME_MAP` / `SIZE_TO_CLASS_NAME_MAP`, в стилях объединено дублирующееся объявление анимации точек — сама анимация задана один раз на `.dot`, а у `.dot1` / `.dot2` / `.dot3` осталась только `animation-delay` (правило `.dot1` с нулевой задержкой обязательно: без него класс исчезнет из CSS-модуля и из разметки), unit-тесты расширены с 3 до 6 кейсов. В stories `controls: { disable: true }` перенесён на верхний уровень `parameters` — внутри `docs` он не применялся. Публичный API, DOM и визуальное поведение не изменены. |
