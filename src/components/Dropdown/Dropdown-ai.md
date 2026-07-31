---
component: Dropdown
category: Dropdown
related: [ButtonDropdown, ButtonDropdownExtended, Portal, MobileView, OverlayBase, SelectField, SelectExtendedField, SuggestField, MultiselectField, TabsLine]
tokens:
  - --triplex-next-Dropdown-Background
  - --triplex-next-Dropdown-Shadow
  - --triplex-next-DropdownList-Color
  - --triplex-next-DropdownList-Background_Default
  - --triplex-next-DropdownList-Background_Active
  - --triplex-next-DropdownList-Background_Selected
  - --triplex-next-DropdownMobile-Backdrop
  - --triplex-next-DropdownMobile-Header_Background
  - --triplex-next-DropdownMobile-Content_Background
  - --triplex-next-DropdownMobile-Footer_Background
  - --triplex-next-DropdownMobile-Border_Color
  - --triplex-next-DropdownMobileList-Active_Background
  - --triplex-next-DropdownMobileList-Selected_Background
stories: stories/Dropdown/Dropdown.stories.tsx
version: "1.0"
---

# Dropdown

## Назначение

Выпадающее меню: рендерится через `Portal` в `document.body` и фиксированно позиционируется относительно управляющего элемента (`targetRef`). Содержимое произвольное — список опций, форма фильтра, любой блок. Если задан `mobileViewProps`, на мобильной ширине экрана (<768px) вместо десктопного меню открывается полноэкранная мобильная версия.

Используй когда: нужно показать всплывающий блок, привязанный к элементу-триггеру, и при этом выйти за пределы контейнеров с `overflow: hidden`.
Не используй когда:

- нужна готовая кнопка со списком действий — используй `ButtonDropdown`;
- нужна кнопка с произвольным выпадающим блоком и закрытием по Escape / Tab / клику вне — используй `ButtonDropdownExtended` (он оборачивает `Dropdown` и добавляет эту логику);
- нужно поле выбора значения — используй `SelectField`, `SelectExtendedField`, `SuggestField`, `MultiselectField`.

---

## Варианты и props

`Dropdown` расширяет `IDropdownDesktopProps`, а тот — `React.HTMLAttributes<HTMLDivElement>`. Все неизвестные компоненту атрибуты попадают на корневой `<div>` десктопного меню.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `opened` | `boolean` | Состояние открытости. Компонент полностью управляемый: собственного state открытости нет |
| `setOpened` | `(opened: boolean) => void` | Изменение состояния открытости. Используется мобильной версией (закрытие по тапу на подложку); в десктопной версии не вызывается |
| `targetRef` | `React.RefObject<HTMLElement>` | Ссылка на управляющий элемент. От его `getBoundingClientRect()` считается положение меню |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер меню (влияет на радиус скругления). Размер списка задаётся отдельно — через `size` у `DropdownList` |
| `direction` | `EDropdownDirection` | `AUTO` | Направление раскрытия. `AUTO` — вниз, а если снизу не хватает места и сверху места больше, то вверх |
| `alignment` | `EDropdownAlignment` | `LEFT` | Выравнивание относительно управляющего элемента. Если меню выходит за границу экрана, оно смещается внутрь области просмотра |
| `width` | `EDropdownWidth` | `CONTENT` | Расчёт ширины: по содержимому, равна ширине управляющего элемента (`TARGET`) или не уже неё (`MIN_TARGET`) |
| `onOpen` | `() => void` | — | Вызывается при переходе `opened` в `true`. На первом рендере не вызывается |
| `onClose` | `() => void` | — | Вызывается при переходе `opened` в `false`. На первом рендере не вызывается |
| `mobileViewProps` | `Omit<IDropdownMobileProps, "opened" \| "setOpened">` | — | Включает адаптивный режим. `mobileViewProps.children` заменяет `children` в мобильной версии; если не задан, используется `children` |
| `className` | `string` | — | Дополнительный класс. В десктопной версии — на корневом `<div>` меню, в мобильной — на wrapper'е оверлея |
| `style` | `React.CSSProperties` | — | Мержится **поверх** вычисленного положения, поэтому им можно перебить `top` / `left` / `width` |

### Список опций — `DropdownList` и `DropdownList.Item`

`Dropdown` не знает про списки: клавиатурную навигацию и роли `listbox` / `option` добавляет `DropdownList`.

| Prop `DropdownList` | Тип | По умолчанию | Описание |
|---|---|---|---|
| `dropdownOpened` | `boolean` | — | Обязательный. Пока `true`, список слушает `ArrowUp` / `ArrowDown` на документе |
| `size` | `EComponentSize` | `MD` | Размер списка. Пробрасывается в каждый `DropdownList.Item` |
| `loading` | `boolean` | `false` | Добавляет в конец списка служебный элемент с лоадером |
| `listRef` | `React.RefObject<HTMLDivElement>` | — | Внешняя ссылка на контейнер списка. Если не передана, используется внутренняя |

| Prop `DropdownList.Item` | Тип | По умолчанию | Описание |
|---|---|---|---|
| `id` | `string` | — | Обязательный и уникальный: используется как значение `aria-activedescendant` |
| `onSelect` | `() => void` | — | Выбор элемента: по клику и по клавишам из `keyCodesForSelection`, когда элемент активен |
| `selected` | `boolean` | `false` | Элемент выбран: подсветка + `aria-selected`. При открытии меню активным становится именно он |
| `active` | `boolean` | — | Активен при навигации с клавиатуры. **Проставляется самим `DropdownList`** — снаружи задавать не нужно |
| `keyCodesForSelection` | `number[]` | `[SPACE, ENTER]` | Числовые `keyCode` клавиш выбора |
| `showNotificationIcon` | `boolean` | `false` | Значок новых уведомлений (`Badge.Dot`) в углу элемента |

### Ограничения

- `DropdownList` в качестве `children` принимает только `DropdownList.Item` — остальные узлы рендерятся как есть, но не участвуют в навигации и нумерации.
- `DropdownList` — не `forwardRef`-компонент: ссылка на контейнер списка передаётся через prop `listRef`.
- Закрытие по `Escape`, `Tab` и клику вне меню `Dropdown` **не реализует**. Это ответственность потребителя либо `ButtonDropdownExtended`.
- Мобильная версия строится на `OverlayBase` и имеет собственный набор субкомпонентов (`DropdownMobileHeader`, `DropdownMobileBody`, `DropdownMobileList` и т.д.), которые передаются через `mobileViewProps.children`.

---

## Дизайн-токены

```
--triplex-next-Dropdown-Background
--triplex-next-Dropdown-Shadow
--triplex-next-DropdownList-Color
--triplex-next-DropdownList-Background_Default
--triplex-next-DropdownList-Background_Active
--triplex-next-DropdownList-Background_Selected
--triplex-next-DropdownMobile-Backdrop
--triplex-next-DropdownMobile-Header_Background
--triplex-next-DropdownMobile-Content_Background
--triplex-next-DropdownMobile-Footer_Background
--triplex-next-DropdownMobile-Border_Color
--triplex-next-DropdownMobileList-Active_Background
--triplex-next-DropdownMobileList-Selected_Background
```

`DropdownMobileInput` дополнительно использует токены поля ввода: `--triplex-next-FormField-Input_Color_Default`, `--triplex-next-FormField-Placeholder_Color`.

---

## Инварианты

- `forwardRef` на `Dropdown`, `DropdownDesktop`, `DropdownListItem` и всех мобильных субкомпонентах — не убирать. Ref `Dropdown` указывает на корневой `<div>` десктопного меню, а в мобильном режиме — на контентный `<div>` (`.dropdownMobile`).
- Меню в закрытом состоянии не рендерит ничего (`DropdownDesktop` возвращает `null`) — на это опираются потребители, монтирующие `Dropdown` безусловно.
- Компонент управляемый: не добавлять внутренний state открытости, иначе сломается контракт `opened` / `setOpened`.
- `Dropdown` рендерится в `document.body` через `Portal`. Смена контейнера портала — breaking change для потребителей, которые ищут меню в DOM.
- Публичные barrel-экспорты `src/components/Dropdown/index.ts`, `desktop/index.ts`, `mobile/index.ts` должны сохраняться: компонент используется внутри `ButtonDropdown`, `SelectField`, `SelectExtendedField`, `SuggestField`, `MultiselectField`, `TabsLine`, `DatePickerExtended`, `Chip`, `List`.
- `DropdownList` проставляет дочерним элементам `active`, `size`, `ref`, `onMouseOver` и `onMouseOut` через `cloneElement` — эти props у `DropdownList.Item` нельзя считать «пользовательскими».
- Пока десктопное меню открыто, на `document.body` висит класс блокировки скролла, а на документе — обработчики `wheel` и `keydown`. Снятие обработчиков в cleanup эффекта обязательно.
- Числовой формат `keyCodesForSelection` (`number[]`, а не `KeyboardEvent.code`) — часть публичного API.
- Хелперы из `desktop/utils.ts` внутренние: не экспортировать их через barrel.
- `listRef` у `DropdownList` и `setActiveDescendant` из `DropdownListContext` должны быть стабильными между рендерами (ref из `useRef`, сеттер из `useState`). Нестабильные значения переподписывают клавиатурный обработчик и сбрасывают `aria-activedescendant` на каждый рендер.

---

## Accessibility

- `DropdownList` рендерит контейнер с `role="listbox"`, `DropdownList.Item` — `role="option"` и `aria-selected`. Мобильные `DropdownMobileList` / `DropdownMobileListItem` — те же роли.
- Клавиатурная навигация по списку: `ArrowDown` / `ArrowUp` перемещают активный элемент по кругу и прокручивают контейнер к нему, `Enter` / `Space` (или клавиши из `keyCodesForSelection`) вызывают `onSelect` активного элемента. Обработчики висят на `document`, пока `dropdownOpened === true`.
- При открытии активным становится элемент с `selected`, иначе первый; список прокручивается к нему.
- Пока меню открыто, `DropdownDesktop` гасит клавиши прокрутки страницы (`Space`, `PageUp`, `PageDown`, `Home`, `End`, стрелки), но только если фокус на `document.body`.
- `aria-activedescendant` компонент сам на триггер **не выставляет**: `DropdownList` публикует id активного элемента через `DropdownListContext.setActiveDescendant`, а связать его с триггером должен потребитель (см. `SelectField`, `ButtonDropdown`). Контекст сбрасывается при закрытии и размонтировании списка.
- Потребитель отвечает за атрибуты триггера: `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`.
- Компонент не хардкодит текстовые строки: `aria-label` для `DropdownMobileClose` и заголовки мобильной версии передаёт потребитель (библиотека мультиязычная).
- Фокус компонент не перехватывает и не возвращает. Если нужен focus trap, его добавляет потребитель (так делает `MultiselectField.Dropdown`).

---

## Связанные компоненты

Отдельного AI.md пока нет ни у одного субкомпонента семейства — они описаны здесь.

**Десктоп (`src/components/Dropdown/desktop/`):**

- `DropdownDesktop` — десктопное меню: позиционирование, блокировка скролла страницы. `Dropdown` рендерит его напрямую или как fallback `MobileView`.
- `DropdownList` — контейнер списка с клавиатурной навигацией, `role="listbox"`. Статическое свойство `DropdownList.Item`.
- `DropdownListItem` — элемент списка, `role="option"`, выбор мышью и клавиатурой.

**Мобильная версия (`src/components/Dropdown/mobile/`):**

- `DropdownMobile` — полноэкранный оверлей снизу на базе `OverlayBase`, блокирует скролл body.
- `DropdownMobileInner` — внутренняя разметка оверлея: подложка и контент с анимацией открытия/закрытия.
- `DropdownMobileHeader` — шапка со слотом `controlButtons` (тип `IDropdownMobileHeaderProps` объявлен в `src/components/Tooltip/types.ts`).
- `DropdownMobileBody` — скроллируемое тело.
- `DropdownMobileFooter` — футер для кнопок.
- `DropdownMobileList` / `DropdownMobileListItem` — список и элемент списка мобильной версии.
- `DropdownMobileClose` — кнопка закрытия (обёртка над `ButtonIcon`).
- `DropdownMobileLoader` — лоадер для шапки (обёртка над `LoaderSmall`).
- `DropdownMobileInput` / `DropdownMobileMaskedInput` — поля ввода для шапки (второе — обёртка над `FormFieldMaskedInput` с `presets`).

**Общее:**

- `DropdownListContext` — контекст `activeDescendant` / `setActiveDescendant` между списком и триггером.
- `Portal`, `MobileView`, `OverlayBase` — инфраструктура рендера.
- `ButtonDropdown`, `ButtonDropdownExtended` — готовые кнопки с выпадающим блоком поверх `Dropdown`.

---

## Stories

Основные истории: `stories/Dropdown/Dropdown.stories.tsx`
Файлы примеров: `stories/Dropdown/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `size`, `direction`, `alignment`, `width` и загрузки списка |
| `Default` | `Default.tsx` | Базовый сценарий: кнопка-триггер, список опций, выбор значения |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG |
| `Directions` | `Directions.tsx` | Раскрытие вниз (`BOTTOM`) и вверх (`TOP`) |
| `Alignments` | `Alignments.tsx` | Выравнивание по левому и правому краю управляющего элемента |
| `Widths` | `Widths.tsx` | `CONTENT` / `TARGET` / `MIN_TARGET` |
| `Loading` | `Loading.tsx` | Подгрузка опций: элемент с лоадером в конце списка |
| `WithSelectedOption` | `WithSelectedOption.tsx` | Выбранная опция подсвечена и активна при открытии |
| `MobileView` | `MobileView.tsx` | Адаптивный режим: `mobileViewProps` и мобильные субкомпоненты |
| `VisualTests` | `VisualTests.tsx` | Длинный список со скроллом, значок уведомления, произвольный контент вместо списка |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-31 | Создан документ AI-ready для `Dropdown` (TRI-35). |
| 2026-07-31 | AI-рефакторинг: `DropdownList` больше не создаёт ref через `React.createRef()` в рендере (из-за этого автопрокрутка к активному элементу не работала), сброс активного элемента при открытии переведён на корректировку state в рендере вместо `setState` в эффекте, прокрутка вынесена в `desktop/utils.ts`, в `DropdownListItem` починен устаревший обработчик клавиатуры, в `Dropdown` актуальные `onOpen` / `onClose` хранятся в ref. Публичный API не изменён. Добавлены unit-тесты (105 кейсов) и stories. |
