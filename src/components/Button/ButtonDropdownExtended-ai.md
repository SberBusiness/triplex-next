---
component: ButtonDropdownExtended
category: Buttons
related: [ButtonDropdown, Button, Dropdown, DropdownList]
tokens: []
stories: stories/Buttons/ButtonDropdownExtended.stories.tsx
version: "1.0"
---

# ButtonDropdownExtended

## Назначение

Низкоуровневый контейнер «кнопка + выпадающий блок». Сам ничего не рисует: кнопку и содержимое выпадающего блока задаёт потребитель через render-функции `renderButton` и `renderDropdown`. Компонент берёт на себя только состояние открытости и закрытие блока по Escape, по Tab (при `closeOnTab`) и по клику/тапу вне кнопки и вне блока.

Используй когда: нужен собственный триггер и/или произвольное содержимое выпадающего блока (форма, фильтр, кастомный список), а логику открытия/закрытия переиспользовать.
Не используй когда: нужен готовый список действий — используй `ButtonDropdown`, он построен поверх этого компонента.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `renderButton` | `(props: IButtonDropdownExtendedButtonProvideProps) => React.ReactNode` | Отрисовка кнопки-триггера. Получает `opened` и `setOpened` |
| `renderDropdown` | `(props: IButtonDropdownExtendedDropdownProvideProps) => React.ReactNode` | Отрисовка выпадающего блока. Дополнительно получает `className` внутреннего позиционирующего класса |
| `dropdownRef` | `React.RefObject<HTMLElement>` | Ссылка на DOM-элемент выпадающего блока. Нужна для click-outside: клик внутри этого элемента не закрывает блок |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `opened` | `boolean` | — | Внешнее состояние открытости. Включает контролируемый режим |
| `setOpened` | `(opened: boolean) => void` | — | Запрос на смену состояния. Вызывается **только** в контролируемом режиме |
| `closeOnTab` | `boolean` | `false` | Закрывать блок по Tab (в дополнение к Escape и клику снаружи) |
| `className` | `string` | — | Дополнительный CSS-класс корневого `<div>` |
| `...rest` | `React.HTMLAttributes<HTMLDivElement>` | — | Атрибуты корневого `<div>` |

### Контролируемый и неконтролируемый режим

- Режим **фиксируется на монтировании**: если `opened !== undefined` на первом рендере — компонент контролируемый на всё время жизни, иначе неконтролируемый. Появление или исчезновение `opened` после маунта режим не меняет.
- В контролируемом режиме внутреннее состояние не используется: `setOpened` вызывается, а фактическое значение приходит из prop `opened`. Без `setOpened` блок в этом режиме не сможет закрыться.
- В неконтролируемом режиме `setOpened` не вызывается — состояние живёт внутри компонента.
- `renderButton` и `renderDropdown` в обоих режимах получают одно и то же актуальное значение `opened` и один и тот же обработчик `setOpened`.

### Статические субкомпоненты

`ButtonDropdownExtended.Dropdown` и `ButtonDropdownExtended.DropdownList` — реэкспорты `Dropdown` и `DropdownList`, чтобы собирать выпадающий блок без дополнительных импортов. Это те же самые компоненты, а не обёртки.

---

## Дизайн-токены

Собственных CSS-переменных нет. `ButtonDropdownExtended.module.less` задаёт только раскладку корневого контейнера: `display: inline-block`, `position: relative`, `vertical-align: middle` (общая опорная точка с `Button`), `line-height: 0`. Цвета и размеры приходят из вложенных `Button` и `Dropdown`.

Правила класса выпадающего блока (`padding: 4px`, `margin-top: 4px`, `right: 0`) объявлены **вложенным** селектором внутри `.buttonDropdownExtended`, то есть компилируются в потомковый. При штатном использовании они не применяются: `ButtonDropdownExtended.Dropdown` рендерится через `<Portal container={document.body}>`, и узел с этим классом не является потомком корневого `<div>`. Позиционирование блока в этом случае обеспечивает сам `Dropdown` по `targetRef`. Учитывай это, если правишь отступы: менять их нужно не здесь.

---

## Инварианты

- `forwardRef` на компоненте — не убирать. Ref идёт на корневой `<div>` (`HTMLDivElement`) и мерджится с внутренним `containerRef` через callback-ref: `containerRef` отвечает за определение «клик внутри триггера», поэтому подменять его форвардом нельзя — нужны оба.
- Публичные имена `ButtonDropdownExtended`, `IButtonDropdownExtendedProps`, `IButtonDropdownExtendedButtonProvideProps`, `IButtonDropdownExtendedDropdownProvideProps`, `IButtonDropdownExtendedComponent` экспортируются из `src/components/Button/index.ts` — сохранять.
- Статические свойства `Dropdown` и `DropdownList` — часть публичного API.
- Фиксация режима управления на монтировании — наблюдаемое поведение, на него опираются потребители. Менять только осознанно.
- `renderDropdown` обязан применить переданный `className` к выпадающему блоку. Но не считай, что на нём держится раскладка: стили этого класса объявлены вложенным селектором внутри `.buttonDropdownExtended` и при рендере блока в портале (штатный путь через `ButtonDropdownExtended.Dropdown`) не применяются — см. раздел «Дизайн-токены».
- Корневой DOM-элемент — `<div>` с классом `buttonDropdownExtended`; на нём же живут `containerRef` и forwarded ref.
- Слушатели `keydown` / `mousedown` / `touchstart` вешаются на `document` только пока блок открыт.

---

## Accessibility

- Компонент не рендерит собственной разметки кроме контейнера `<div>` и **не выставляет ARIA-атрибутов**. Роли и связки — зона ответственности `renderButton` / `renderDropdown`.
- Потребитель обязан сам проставить на триггере `aria-haspopup`, `aria-expanded={opened}` и при необходимости `aria-controls` (см. `ButtonDropdown` как эталонную реализацию).
- Клавиатура, обрабатываемая самим компонентом: `Escape` закрывает блок всегда, `Tab` — только при `closeOnTab`. Обработчик висит на `document`, поэтому срабатывает независимо от того, где находится фокус.
- Фокус компонент не перемещает: при открытии фокус не уходит в блок, при закрытии не возвращается на триггер. Если продукту нужен focus trap или возврат фокуса — реализуй это в render-функциях.
- Текстовых строк компонент не содержит, хардкода языка нет.

---

## Связанные компоненты

- `ButtonDropdown` (`src/components/Button/ButtonDropdown.tsx`) — готовая кнопка со списком действий, построена поверх `ButtonDropdownExtended`.
- `Button` (`src/components/Button/Button.tsx`) — обычный триггер для `renderButton`.
- `Dropdown` (`src/components/Dropdown`) — выпадающий блок, доступен как `ButtonDropdownExtended.Dropdown`; рендерится в портале, позиционируется по `targetRef`.
- `DropdownList` (`src/components/Dropdown/desktop/DropdownList.tsx`) — список с клавиатурной навигацией, доступен как `ButtonDropdownExtended.DropdownList`.
- Внутренние потребители в библиотеке: `ListItemControlsButtonDropdown`, `TableBasicSettings` — при изменении поведения проверяй их.

---

## Stories

Основные истории: `stories/Buttons/ButtonDropdownExtended.stories.tsx`
Файлы примеров: `stories/Buttons/examples/ButtonDropdownExtended/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `closeOnTab` |
| `Default` | `Default.tsx` | Неконтролируемый режим: кнопка `Button` + `Dropdown` со списком действий |
| `Controlled` | `Controlled.tsx` | Контролируемый режим через `opened` / `setOpened` |
| `CloseOnTab` | `CloseOnTab.tsx` | Закрытие блока по Tab |
| `WithCustomContent` | `WithCustomContent.tsx` | Произвольное содержимое блока вместо списка действий |
| `VisualTests` | `VisualTests.tsx` | Раскрытые блоки: список действий (`MIN_TARGET` + `RIGHT`, раскрывается `play`-функцией) и произвольный контент (`CONTENT` + `LEFT`, форсированно раскрыт в контролируемом режиме) |

Документационные стори намеренно рендерятся в закрытом состоянии: раскрытый `Dropdown` блокирует скролл страницы (`wheel`-обработчик в `DropdownDesktop`), что ломает навигацию по autodocs. Раскрытые состояния покрыты `VisualTests`.

Скриншот-тесты: `Playground` пропускается всегда; `Controlled` и `CloseOnTab` пропускаются как визуально идентичные `Default`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-31 | Компонент переведён с `React.FC` на `Object.assign(forwardRef(...), {...})` — теперь пробрасывает `ref` на корневой `<div>`, форвард мерджится с внутренним `containerRef`. Базовый тип `IButtonDropdownExtendedComponent` изменился с `React.FC` на `React.ForwardRefExoticComponent`; набор props, статики и DOM не изменились. Понадобилось для `TableBasicSettings`, который рендерит `ButtonDropdownExtended` корнем. |
| 2026-07-29 | Создан документ AI-ready для `ButtonDropdownExtended`. AI-рефакторинг без изменения публичного API: режим управления переведён с ref на `useState` (устранены ошибки `react-hooks/refs`), убраны вырожденный тернарник в `useState` и мёртвые проверки `opened` внутри обработчиков, `setOpened && setOpened(...)` заменён на опциональный вызов, добавлены JSDoc. Добавлены unit-тесты и stories по modern pattern. |
