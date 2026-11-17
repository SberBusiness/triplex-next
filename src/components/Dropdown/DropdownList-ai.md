---
component: DropdownList
category: Dropdown
related: [Dropdown, DropdownListItem, LoaderSmall]
tokens:
  - DropdownList.Color
  - DropdownList.Background_Default
  - DropdownList.Background_Active
  - DropdownList.Background_Selected
stories: stories/Dropdown/Dropdown.stories.tsx
version: "1.0"
---

# DropdownList

## Назначение

`DropdownList` — прокручиваемый контейнер опций выпадающего блока. Он отслеживает активную опцию, прокручивает список к ней при навигации стрелками и передаёт выбор потребителю через `onSelect` у `DropdownList.Item`. Открытость, позицию и закрытие блока определяет родительская композиция.

В `ButtonDropdownExtended` импортируй родителя из `@sberbusiness/triplex-next` и рендери `ButtonDropdownExtended.DropdownList` в `renderDropdown`, передавая его `opened` в `dropdownOpened`. Используй `ButtonDropdownExtended.DropdownList.Item` для опций. Полный пример приведён в [ButtonDropdownExtended.Default](../../../stories/Buttons/examples/ButtonDropdownExtended/Default.tsx).

В полях выбора те же компоненты доступны через `SelectExtendedField.Dropdown.List` и `SelectExtendedFieldDropdown.List`. Для собственного управляющего элемента импортируй `DropdownList`, `DropdownListContext` и `useDropdownListKeyboard` из `@sberbusiness/triplex-next` и подключи клавиатуру по примеру `Dropdown.Default`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `dropdownOpened` | `boolean` | Текущее состояние открытости блока. При `true` список регистрирует клавиатурный обработчик, а при закрытии сбрасывает активную опцию |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Опции `DropdownList.Item`. Их можно рендерить через компонент-обёртку с теми же props, которые читает список |
| `listRef` | `React.RefObject<HTMLDivElement>` | Внутренний ref | Ссылка на корневой прокручиваемый `<div>`. Создавай её через `useRef` |
| `loading` | `boolean` | `false` | Добавляет строку с `LoaderSmall` в конец списка. Уже отрисованные опции остаются доступны |
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер контейнера, опций и лоадера. Размер внешнего `Dropdown` задаётся отдельно |

Атрибуты `<div>`, включая `id`, `className`, `aria-label` и `aria-labelledby`, передаются контейнеру списка.

---

## Дизайн-токены

Контейнер задаёт размеры и прокрутку. Цвет текста и фоны его опций настраиваются через `ThemeProvider` (prop `tokens`). Значения по умолчанию находятся в `src/components/DesignTokens/components/DropdownList.ts`.

```text
DropdownList.Color
DropdownList.Background_Default
DropdownList.Background_Active
DropdownList.Background_Selected
```

---

## Инварианты

- Ссылка на DOM-узел передаётся через `listRef`. Статическое свойство `DropdownList.Item` указывает на `DropdownListItem`.
- Список считывает `id`, `selected`, `onSelect` и `keyCodesForSelection` из props непосредственных дочерних React-элементов. Если опция обёрнута в компонент, передавай эти props и обёртке, и вложенному `DropdownList.Item`. Опции без `id` и опции внутри `Fragment` не участвуют в клавиатурной навигации.
- При открытии активна последняя выбранная опция или первая при отсутствии выбранных. При фильтрации активность сохраняется по `id`. Если активная опция исчезает, список переходит к первой доступной. Пустой список оставляет активную опцию неопределённой.
- Прокрутка при открытии ориентируется на последнюю выбранную опцию, а без неё возвращается к началу. Поиск опции для прокрутки ограничен контейнером списка.
- `selected` управляется потребителем. Активность нужна для навигации и синхронизации с `aria-activedescendant`.
- Для каждого списка с клавиатурной навигацией используй отдельное значение `DropdownListContext`. В контексте хранится один клавиатурный обработчик.

---

## Accessibility

- По умолчанию контейнер имеет `role="listbox"`, а `DropdownList.Item` — `role="option"`. Задай списку доступное имя через `aria-label` или `aria-labelledby`. Используй уникальные в документе `id` опций, чтобы связать их с активным потомком.
- Фокус остаётся на управляющем элементе. В собственной композиции передай `context` из `useDropdownListKeyboard` в `DropdownListContext.Provider`, а `handleKeyDown` — в `onKeyDown` управляющего элемента. Используй `activeDescendant` для `aria-activedescendant` там, где роль управляющего элемента поддерживает этот атрибут. `ButtonDropdownExtended` и `SelectExtendedField` уже передают события клавиатуры списку.
- `ArrowDown` и `ArrowUp` переводят активность по кругу. `Enter` и `Space` по умолчанию вызывают `onSelect` активной опции. Опция может переопределить клавиши через `keyCodesForSelection`. Для ввода текста используй только `Enter`, если пробел должен оставаться доступен для ввода.
- Список вызывает `preventDefault()` для обработанных клавиш. Строка с лоадером исключена из клавиатурной навигации.

---

## Связанные компоненты

- [Dropdown](Dropdown-ai.md) — внешний выпадающий блок, который позиционируется относительно управляющего элемента.
- [DropdownListItem](DropdownListItem-ai.md) — опция, доступная как `DropdownList.Item`. Получает активность и размер из списка.
- [LoaderSmall](../Loader/LoaderSmall-ai.md) — индикатор в служебной строке списка при `loading`.
- [ButtonDropdownExtended](../Button/ButtonDropdownExtended-ai.md) и [SelectExtendedField](../SelectExtendedField/SelectExtendedField-ai.md) предоставляют список через статические свойства и связывают его со своими управляющими элементами.

---

## Stories

Основные истории: `stories/Dropdown/Dropdown.stories.tsx`

Файлы примеров: `stories/Dropdown/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Управление размером и загрузкой списка |
| `Default` | `Default.tsx` | Подключение списка к управляющему элементу через `useDropdownListKeyboard` |
| `Sizes` | `Sizes.tsx` | Размеры `SM`, `MD` и `LG` |
| `Loading` | `Loading.tsx` | Строка загрузки после существующих опций |
| `WithSelectedOption` | `WithSelectedOption.tsx` | Активность заранее выбранной опции при открытии |
| `VisualTests` | `VisualTests.tsx` | Отображение списка в открытом выпадающем блоке |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-17 | Создан документ |
