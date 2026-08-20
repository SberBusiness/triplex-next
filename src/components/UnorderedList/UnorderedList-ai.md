---
component: UnorderedList
category: UnorderedList
related: [UnorderedListExtended, OrderedList, Text]
tokens: []
stories: stories/UnorderedList/UnorderedList.stories.tsx
version: "1.0"
---

# UnorderedList

## Назначение

Маркированный список с data-driven API: содержимое описывается массивом `items`, а не JSX-разметкой.
Компонент разворачивает каждый элемент массива в `UnorderedListExtended.Item` с обязательным
маркером-обёрткой перед содержимым.

Используй когда: список строится из данных (map по массиву), а каждому элементу достаточно текста,
свойств типографики `Text` и опционального маркера.

Не используй когда:
- Элементы списка — сложная композиция из нескольких блоков или интерактивных элементов, которую
  удобнее собирать JSX-ом. Для этого есть `UnorderedListExtended` с составным API
  (`UnorderedListExtended.Item`, `UnorderedListExtended.Item.Marker`).
- Нужен нумерованный список — используй `OrderedList`.
- Нужен список записей с действиями, выделением, сортировкой — это `List` и его семейство,
  а не типографический маркированный список.

---

## Варианты и props

### Обязательные props

Обязательных props нет: `<UnorderedList />` без `items` отрендерит пустой `<ul>`.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `items` | `IUnorderedListItemProps[]` | — | Конфигурация элементов списка. Содержимое элемента задаётся его `children`. |

`IUnorderedListProps` расширяет `Omit<IUnorderedListExtendedProps, "children">`, то есть принимает
все стандартные атрибуты `<ul>` (`className`, `style`, `aria-*`, обработчики событий) и **не**
принимает `children` — это часть data-driven контракта.

### Элемент списка (`IUnorderedListItemProps`)

Наследует свойства элемента расширенного списка (`Partial<Omit<TTextProps<"li">, "tag">>`), то есть
всю типографику `Text` (`size`, `type`, `weight`, `line`, `underline`, `strikethrough`) и стандартные
атрибуты `<li>`, плюс:

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `marker` | `React.ReactNode` | маркер-точка | Кастомный маркер элемента. |

Особенности, которые не видны из типов:

- **Размер текста элемента** по умолчанию — `ETextSize.B3` (дефолт задаёт `UnorderedListExtended.Item`).
- **React-ключ** элемента вычисляется как `key ?? id ?? index`. Явный `key` в объекте элемента
  вырезается из props и не попадает в DOM, а `id` — попадает (это обычный HTML-атрибут).
- **`DataAttributes`** подмешаны в `IUnorderedListItemProps` намеренно: элементы задаются объектами
  в массиве, а не JSX-атрибутами, поэтому без этого типа `data-*` на элементе не прошли бы проверку типов.
- **`ref` элемента** можно передать прямо в объекте элемента — `UnorderedListItem` объявлен через
  `forwardRef`, а React вырезает `ref` из spread-props. Поведение поддерживаемое и покрыто тестом
  (`__tests__/UnorderedList.test.tsx` → «forwards ref passed inside an item object to the li element»).

---

## Дизайн-токены

Собственных CSS-переменных у компонента нет: разметку и стили даёт `UnorderedListExtended`
(`styles/UnorderedListExtended*.module.less` — только layout: `display`, `gap`, отступы, размер точки).
Цвет текста и маркера приходит из типографики `Text` через prop `type`: маркер по умолчанию залит
`currentcolor`, поэтому меняется вместе с цветом текста элемента.

Обёртка маркера тянется на высоту строки элемента (`min-height: 1lh` с фолбэком `20px` для браузеров
без единицы `lh`), поэтому маркер центрируется по первой строке при любом `size`. Высота — минимум,
а не фиксированное значение: маркер выше строки (например, иконка 20px при `B4`) не обрезается.

---

## Инварианты

- **`forwardRef`** на `UnorderedList` — не убирать. Ref указывает на корневой `<ul>`
  (тот же элемент, что получает `className`, `...rest` и `data-tx`).
- **`items` — единственный собственный prop.** `children` исключён типом (`Omit<..., "children">`):
  переход на data-driven API был breaking change в 1.43.0, возврат `children` ломает контракт.
- **Маркер-обёртка рендерится всегда**, даже если `marker` не передан: дефолтную точку рисует сам
  `UnorderedListExtended.Item.Marker` при `children === undefined`. Условный рендер обёртки уберёт
  маркер у всех элементов без `marker`.
- **Порядок в элементе**: маркер, затем содержимое. Изменение порядка — наблюдаемое изменение DOM.
- **Вертикальное выравнивание маркера** задаётся высотой обёртки, а не фиксированными вертикальными
  отступами точки: отступы под конкретную строку (`20px` для `B2`/`B3`) снова сместят маркер на `B1` и `B4`.
- **Порядок вычисления ключа** `key ?? id ?? index` — менять только осознанно: смена ключей
  перемонтирует элементы у потребителей.
- **`UnorderedListItem` не экспортируется** из barrel `src/components/UnorderedList/index.ts` —
  это внутренняя деталь. Публичны только `UnorderedList`, `IUnorderedListProps`
  и `IUnorderedListItemProps`; их имена — часть публичного API.
- **`displayName`**: `"UnorderedList"` и `"UnorderedListItem"` — не менять.

---

## Accessibility

- Семантика штатная: корневой элемент — `<ul>` (`role="list"`), элементы — `<li>` (`role="listitem"`).
  Дополнительных ARIA-атрибутов компонент не выставляет.
- Маркер лежит в обычном `<span>` и **не** скрыт от скринридеров. Текстовый маркер (например, `"1."`)
  будет озвучен; если маркер декоративный (иконка), скрывай его сам — передавай в `marker` узел
  с `aria-hidden="true"`.
- Компонент не интерактивный: фокус-менеджмента и клавиатурных обработчиков нет.
- Язык не хардкодится: весь текст приходит от потребителя через `children` элементов.

---

## Связанные компоненты

- `UnorderedListExtended` — тот же маркированный список, но с составным JSX-API
  (`UnorderedListExtended.Item`, `UnorderedListExtended.Item.Marker`). `UnorderedList` — тонкая
  data-driven обёртка над ним, и `IUnorderedListProps` наследует его props. Типичная точка выбора:
  данные → `UnorderedList`, произвольная композиция → `UnorderedListExtended`.
- `Text` — типографика элемента списка. `UnorderedListExtended.Item` рендерится как `Text` с `tag="li"`,
  поэтому props элемента (`size`, `type`, `weight`, `line`) — это props `Text`.
- `UnorderedListItem` (`src/components/UnorderedList/UnorderedListItem.tsx`) — внутренний элемент списка
  без отдельного AI.md: `forwardRef`-обёртка, которая добавляет маркер перед содержимым и пробрасывает
  остальные props в `UnorderedListExtended.Item`. Наружу не экспортируется.
- `OrderedList` — нумерованный список для той же задачи, когда важен порядок пунктов.

---

## Stories

Основные истории: `stories/UnorderedList/UnorderedList.stories.tsx`
Файлы примеров: `stories/UnorderedList/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `items` плюс размер, тип и кастомный маркер для всех элементов |
| `Default` | `Default.tsx` | Минимальный список с маркерами по умолчанию |
| `CustomMarkerText` | `CustomMarkerText.tsx` | Кастомные маркеры-иконки и разные типы текста элементов |
| `Sizes` | `Sizes.tsx` | Размеры текста элементов `ETextSize.B1`–`B4` |
| `VisualTests` | `VisualTests.tsx` | Скриншот-покрытие: маркеры по умолчанию, иконки, текстовые маркеры, перенос длинного текста, типы, толщина и интерлиньяж, список из одного элемента |

`Default` и `CustomMarkerText` исключены из скриншот-тестов (`testRunner: { skip: true }`) — они
рендерят то же самое, что одноимённые истории `UnorderedListExtended`. Собственное визуальное
покрытие компонента дают `Sizes` и `VisualTests`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-20 | Исправлено вертикальное центрирование маркера: обёртка маркера тянется на высоту строки текста (`min-height: 1lh`) вместо вертикальных отступов точки под строку `20px`. На `B1` маркер смещался на 2px вверх, на `B4` — на 2px вниз. Правка в `UnorderedListExtended`, затрагивает оба компонента. |
| 2026-08-20 | Тесты маркера переведены со structural-проверок по LESS-классам `UnorderedListExtended` на проверку структуры DOM; добавлен тест на `ref`, переданный внутри объекта элемента. |
| 2026-08-20 | Создан документ. AI-рефакторинг: уточнены JSDoc компонента, элемента и props (`items`, `marker`); расширены unit-тесты (пустой список, маркер по умолчанию, типографика элемента, вычисление React-ключа) и добавлен файл тестов `UnorderedListItem`; stories переведены на modern pattern — добавлены `Playground`, `Sizes`, `VisualTests`. Публичный API не менялся. |
