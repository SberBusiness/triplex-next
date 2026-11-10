---
component: Dropdown
category: Dropdown
related: [ButtonDropdown, ButtonDropdownExtended, Portal, MobileView, Puller, LoaderSmall]
tokens:
  - Dropdown.Background
  - Dropdown.Shadow
  - DropdownList.Color
  - DropdownList.Background_Default
  - DropdownList.Background_Active
  - DropdownList.Background_Selected
stories: stories/Dropdown/Dropdown.stories.tsx
version: "1.0"
---

# Dropdown

## Назначение

Выпадающее меню: рендерится через `Portal` в `document.body` и фиксированно позиционируется относительно управляющего элемента (`targetRef`). Содержимое произвольное — список опций, форма фильтра, любой блок. Если задан `pullerProps`, на мобильной ширине экрана (<768px) вместо десктопного меню открывается нижняя шторка `Puller`.

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
| `pullerProps` | `Omit<IPullerProps, "opened" \| "setOpened">` | — | Включает адаптивный режим и целиком спредится в `Puller`. `pullerProps.children` заменяет `children` в мобильной версии; если не задан, используется `children` |
| `className` | `string` | — | Дополнительный класс корневого `<div>` десктопного меню. В мобильную версию не попадает: там класс задаётся через `pullerProps.className` |
| `style` | `React.CSSProperties` | — | Мержится **поверх** вычисленного положения, поэтому им можно перебить `top` / `left` / `width` |

### Список опций — `DropdownList` и `DropdownList.Item`

`Dropdown` не знает про списки: клавиатурную навигацию и роли `listbox` / `option` добавляет `DropdownList`.
Фокус при этом остаётся на управляющем элементе (паттерн `aria-activedescendant`), поэтому клавиши списку передаёт он —
через хук `useDropdownListKeyboard` (см. ниже).

| Prop `DropdownList` | Тип | По умолчанию | Описание |
|---|---|---|---|
| `dropdownOpened` | `boolean` | — | Обязательный. Пока `true`, список регистрирует свой клавиатурный обработчик в `DropdownListContext` |
| `size` | `EComponentSize` | `MD` | Размер списка. Задаёт размер каждому `DropdownList.Item` (через внутренний контекст списка) |
| `loading` | `boolean` | `false` | Добавляет в конец списка служебный элемент с лоадером |
| `listRef` | `React.RefObject<HTMLDivElement>` | — | Внешняя ссылка на контейнер списка. Если не передана, используется внутренняя |

| Prop `DropdownList.Item` | Тип | По умолчанию | Описание |
|---|---|---|---|
| `id` | `string` | — | Обязательный и уникальный в документе: по нему список хранит активный элемент, находит пункт для прокрутки и выставляет `aria-activedescendant` |
| `onSelect` | `() => void` | — | Выбор элемента: по клику, а когда элемент активен — по клавишам из `keyCodesForSelection`, переданным списку через `useDropdownListKeyboard` |
| `selected` | `boolean` | `false` | Элемент выбран: подсветка + `aria-selected`. При открытии меню активным становится именно он |
| `keyCodesForSelection` | `number[]` | `[SPACE, ENTER]` | Числовые `keyCode` клавиш выбора. Читает `DropdownList`. Если клавиши приходят из поля ввода, задайте `[ENTER]`, иначе пробел выберет пункт вместо ввода |
| `showNotificationIcon` | `boolean` | `false` | Значок новых уведомлений (`Badge.Dot`) в углу элемента |

### Связка с управляющим элементом — `useDropdownListKeyboard`

Хук создаёт значение `DropdownListContext` и обработчик клавиатуры для управляющего элемента:

| Поле | Тип | Описание |
|---|---|---|
| `context` | `IDropdownListContext` | Значение `DropdownListContext.Provider`, внутри которого рендерится `DropdownList` |
| `activeDescendant` | `string \| undefined` | `id` активного элемента — для `aria-activedescendant` управляющего элемента |
| `handleKeyDown` | `(event: React.KeyboardEvent) => boolean` | Вызывается из `onKeyDown` управляющего элемента. Передаёт клавишу открытому списку; `true` — клавиша обработана (стрелки или выбор), у события уже вызван `preventDefault`. Пока список закрыт, возвращает `false` |

```tsx
const { context, activeDescendant, handleKeyDown } = useDropdownListKeyboard();

<Button aria-activedescendant={activeDescendant} onKeyDown={handleKeyDown} onClick={() => setOpened(!opened)} ref={targetRef} />
<Dropdown opened={opened} setOpened={setOpened} targetRef={targetRef}>
    <DropdownListContext.Provider value={context}>
        <DropdownList dropdownOpened={opened}>…</DropdownList>
    </DropdownListContext.Provider>
</Dropdown>
```

`ButtonDropdownExtended`, `SelectExtendedField` и `Suggest` подключают хук сами.

### Ограничения

- `DropdownList` в качестве `children` принимает `DropdownList.Item` — напрямую или в компоненте-обёртке (так работает `renderDropdownListItem` у `SuggestField`). `id`, `selected`, `onSelect` и `keyCodesForSelection` список читает из props прямого child: обёртка должна получать их сама и передавать вложенному `DropdownList.Item`, а `onSelect`, заданный только внутри обёртки, с клавиатуры не вызывается. Children без prop `id` в навигации не участвуют и рендерятся как есть. Пункты внутри `Fragment` не поддерживаются.
- `DropdownList` — не `forwardRef`-компонент: ссылка на контейнер списка передаётся через prop `listRef`.
- Закрытие по `Escape`, `Tab` и клику вне меню `Dropdown` **не реализует**. Это ответственность потребителя либо `ButtonDropdownExtended`.
- Без `DropdownListContext.Provider` со значением из `useDropdownListKeyboard` клавиатурной навигации по списку нет: работают только клик и наведение.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — файлы групп `Dropdown`, `DropdownList` в `src/components/DesignTokens/components/`. Токены мобильной версии (группы `Puller`, `PullerList`) описаны в `Puller-ai.md`.

```text
Dropdown.Background
Dropdown.Shadow
DropdownList.Color
DropdownList.Background_Default
DropdownList.Background_Active
DropdownList.Background_Selected
```

---

## Инварианты

- `forwardRef` на `Dropdown`, `DropdownDesktop`, `DropdownListItem` — не убирать. Ref `Dropdown` указывает на корневой `<div>` десктопного меню, а в мобильном режиме — на контентный `<div>` `Puller` (`.puller`).
- Меню в закрытом состоянии не рендерит ничего (`DropdownDesktop` возвращает `null`) — на это опираются потребители, монтирующие `Dropdown` безусловно.
- Компонент управляемый: не добавлять внутренний state открытости, иначе сломается контракт `opened` / `setOpened`.
- `Dropdown` рендерится в `document.body` через `Portal`. Смена контейнера портала — breaking change для потребителей, которые ищут меню в DOM. Мобильная версия рендерится туда же, если не задан `pullerProps.renderContainer`.
- Публичные barrel-экспорты `src/components/Dropdown/index.ts`, `desktop/index.ts` должны сохраняться: компонент используется внутри `ButtonDropdown`, `SelectField`, `SelectExtendedField`, `SuggestField`, `MultiselectField`, `TabsLine`, `DatePickerExtended`, `Chip`, `List`.
- `DropdownList` раздаёт пунктам активный `id`, его сеттер и `size` через внутренний `DropdownListItemsContext` (в barrel не экспортируется), а `DropdownListItem` сам берёт из него активность и размер и обрабатывает наведение — через не всплывающие `mouseenter` / `mouseleave`: переход курсора на вложенную разметку пункта не меняет активность; `mouseleave` снимает активность, только если пункт всё ещё активен (клавиатура могла перевести её на другой). Активность и размер пункта задаёт только список: вне `DropdownList` пункт не подсвечивается и имеет размер `MD`. Пункт, который не рендерит `DropdownListItem`, подсветку от списка не получает.
- DOM-элемент пункта для прокрутки ищется по `id` только внутри контейнера списка (`getListItemElement`), не через `document.getElementById`: `id` опций задаёт потребитель, и элемент с тем же `id` в другом месте страницы не должен скрывать пункт.
- Активный элемент хранится по `id`: при фильтрации и подгрузке опций подсветка остаётся на той же опции; если она пропала из списка — переходит на первую. Лоадер (`loading`) рендерится вне контекста и в навигации не участвует.
- Пока десктопное меню открыто, на `document.body` висит класс блокировки скролла, а на документе — обработчики `wheel` и `keydown` (`DropdownDesktop`, только для блокировки прокрутки). Снятие обработчиков в cleanup эффекта обязательно. Класс вешается только через `lockBodyScroll` (`src/utils/scroll/bodyScrollLock.ts`): прямой `classList.remove` снял бы блокировку при другом открытом меню.
- Числовой формат `keyCodesForSelection` (`number[]`, а не `KeyboardEvent.code`) — часть публичного API.
- Хелперы из `desktop/utils.ts` внутренние: не экспортировать их через barrel.
- `listRef` у `DropdownList`, `setActiveDescendant` и `registerKeyDownHandler` из `DropdownListContext` должны быть стабильными между рендерами (ref из `useRef`, функции из `useDropdownListKeyboard`). Нестабильный `setActiveDescendant` сбрасывает `aria-activedescendant` на каждый рендер.
- `DropdownList` и `DropdownListItem` не подписываются на клавиатуру `document`. Клавиши передаёт управляющий элемент через `useDropdownListKeyboard`: иначе список ловит то же нажатие, которым его открыли (`Space` выберет первый пункт, `ArrowDown` перескочит на второй).
- Контейнеры, связывающие список со своим управляющим элементом (`ButtonDropdownExtended`, `SelectExtendedField`), передают клавиши списку в фазе **bubble** корневого `onKeyDown`, не в capture: между нативными слушателями фаз capture и bubble браузер выполняет микротаски, React успевает закоммитить выбор пункта, и управляющий элемент видит уже закрытый список — `Enter` открыл бы его снова. В jsdom этот эффект не воспроизводится, его ловит e2e `e2e/tests/dropdownKeyboard.spec.ts`.
- Один `DropdownList` на одно значение `DropdownListContext`: обработчик клавиатуры у контекста один, и при нескольких открытых списках клавиши получит только последний отрендеренный. Для второго списка нужен свой `useDropdownListKeyboard` и свой Provider.

---

## Accessibility

- `DropdownList` рендерит контейнер с `role="listbox"`, `DropdownList.Item` — `role="option"` и `aria-selected`. В мобильной версии `PullerList` / `PullerListItem` — те же роли.
- Клавиатурная навигация по списку: `ArrowDown` / `ArrowUp` перемещают активный элемент по кругу, пропуская children, которые не являются React-элементами (`null`, `false` из условного рендера), и прокручивают контейнер к нему, `Enter` / `Space` (или клавиши из `keyCodesForSelection` активного элемента) вызывают его `onSelect`. Клавиши приходят только с управляющего элемента — через `handleKeyDown` из `useDropdownListKeyboard`, пока `dropdownOpened === true`.
- При открытии активным становится элемент с `selected`, иначе первый элемент с `id` среди children (`null` / `false` пропускаются), в том числе подгруженный уже после открытия; список прокручивается к выбранному элементу, а без выбранного — в начало.
- Пока меню открыто, `DropdownDesktop` гасит клавиши прокрутки страницы (`Space`, `PageUp`, `PageDown`, `Home`, `End`, стрелки), но только если фокус на `document.body`.
- `aria-activedescendant` компонент сам на триггер **не выставляет**: `DropdownList` публикует id активного элемента через `DropdownListContext.setActiveDescendant`, а потребитель берёт его из `useDropdownListKeyboard().activeDescendant` (у `ButtonDropdownExtended` — из `activeDescendant` в `renderButton`, `SelectExtendedField.Target` выставляет его сам). Значение обновляется и тогда, когда опции подгрузились уже после открытия. Контекст сбрасывается, когда активного элемента нет (курсор ушёл с элемента), при закрытии и размонтировании списка.
- Потребитель отвечает за атрибуты триггера: `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`.
- Компонент не хардкодит текстовые строки: `aria-label` для `PullerClose` и заголовки мобильной версии передаёт потребитель (библиотека мультиязычная).
- Фокус компонент не перехватывает и не возвращает. Если нужен focus trap, его добавляет потребитель (так делает `MultiselectField.Dropdown`).

---

## Связанные компоненты

Отдельного AI.md пока нет ни у одного субкомпонента семейства — они описаны здесь.
Это область задачи TRI-35 («Scope: только Dropdown; соседние экспортируемые компоненты
из `src/components/Dropdown/` — отдельные задачи»), а не вывод по критериям
`docs/ai/CONTEXT.md` → «Когда создавать `{ComponentName}-ai.md`». По этим критериям
`DropdownList` и `DropdownListItem`
заслуживают собственных AI.md и отдельных строк в `docs/ai/ROADMAP.md` — как это
сделано для семейства `List`. Решение о том, заводить ли их, за владельцем репозитория.

**Десктоп (`src/components/Dropdown/desktop/`):**

- `DropdownDesktop` — десктопное меню: позиционирование, блокировка скролла страницы. `Dropdown` рендерит его напрямую или как fallback `MobileView`.
- `DropdownList` — контейнер списка с клавиатурной навигацией, `role="listbox"`. Статическое свойство `DropdownList.Item`.
- `DropdownListItem` — элемент списка, `role="option"`, выбор мышью и клавиатурой.

**Мобильная версия:**

- `Puller` (`src/components/Puller/`) — нижняя шторка на базе `OverlayBase`, которую `Dropdown` рендерит в адаптивном режиме вместо десктопного меню. Части шторки описаны в `Puller-ai.md`.

**Общее:**

- `DropdownListContext` — контекст между списком и триггером: `activeDescendant` / `setActiveDescendant` и регистрация клавиатурного обработчика списка (`registerKeyDownHandler`, возвращает функцию снятия).
- `useDropdownListKeyboard` — хук, создающий значение `DropdownListContext` и `handleKeyDown` для управляющего элемента.
- `Portal`, `MobileView`, `OverlayBase` — инфраструктура рендера.
- `ButtonDropdown`, `ButtonDropdownExtended` — готовые кнопки с выпадающим блоком поверх `Dropdown`.

**Потребители внутри библиотеки** (в `related` не входят — по `docs/ai/CONTEXT.md` ссылка
стоит с их стороны, и она там уже есть):

- `SelectExtendedField` — база полей выбора: владеет состоянием открытости и рендерит `Dropdown`.
- `SelectField`, `MultiselectField` — поля выбора одного и нескольких значений, построены на `SelectExtendedField`.
- `SuggestField` — поле с поиском по вводу; собрано на `Dropdown` напрямую, а не на `SelectExtendedField`.
- `TabsLine` — прячет не поместившиеся вкладки в `Dropdown`.

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
| `MobileView` | `MobileView.tsx` | Адаптивный режим: `pullerProps` и части `Puller` |
| `VisualTests` | `VisualTests.tsx` | Длинный список со скроллом, значок уведомления, произвольный контент вместо списка |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-31 | Создан документ AI-ready для `Dropdown` (TRI-35). |
| 2026-07-31 | AI-рефакторинг: `DropdownList` больше не создаёт ref через `React.createRef()` в рендере (из-за этого автопрокрутка к активному элементу не работала), сброс активного элемента при открытии переведён на корректировку state в рендере вместо `setState` в эффекте, прокрутка вынесена в `desktop/utils.ts`, в `DropdownListItem` починен устаревший обработчик клавиатуры, в `Dropdown` актуальные `onOpen` / `onClose` хранятся в ref. Публичный API не изменён. Добавлены unit-тесты (109 кейсов) и stories. |
| 2026-07-31 | Правки по ревью PR #491: эффект `onOpen` / `onClose` в `Dropdown` сравнивает предыдущее значение `opened` вместо флага «смонтирован» — колбэки больше не срабатывают ложно при двойном маунте в React 18 StrictMode (регрессионный тест `__tests__/Dropdown.strictMode.test.tsx`). Документационные stories стартуют закрытыми и раскрываются через `play`. Сброс активного элемента `DropdownList` сделан симметричным: при закрытии подсветка снимается вместе с `activeDescendant`. |
| 2026-09-28 | Токен `Dropdown.Shadow` ссылается на `Shadow.07` (светлая) и `DarkShadow.07` (тёмная) вместо литералов; в тёмной теме прозрачность 0.25 вместо 0.35. |
| 2026-09-29 | Аудит симметрии `related` (TRI-156): из `related` убраны имена без строки в `docs/ai/ROADMAP.md` (`OverlayBase`) и потребители `SelectField` / `SelectExtendedField` / `SuggestField` / `MultiselectField` / `TabsLine` — по `docs/ai/CONTEXT.md` ссылка стоит с их стороны; добавлен `LoaderSmall` — контракт по рендеру в верную сторону. Пояснения к убранным именам сохранены прозой в «Связанные компоненты»; публичный API и поведение не затронуты. |
| 2026-10-21 | **Breaking** (TRIPLEX-961): мобильная версия выделена в компонент `Puller`, `DropdownMobile*` удалены без алиасов. Prop `mobileViewProps` переименован в `pullerProps`, группы токенов `DropdownMobile` / `DropdownMobileList` — в `Puller` / `PullerList` (ключ `Content_Background` → `Body_Background`). |
| 2026-10-23 | Исправлено: закрытие одного из открытых `DropdownDesktop` снимало блокировку скролла страницы при другом открытом меню. **Breaking:** класс блокировки на `body` переименован `.dropdownDesktopOverflowHidden` → `.dropdownDesktopScrollLock`. |
| 2026-10-31 | Мобильная версия рендерится в `pullerProps.renderContainer`, если он задан, иначе в `document.body` (TRIPLEX-961). |
| 2026-11-05 | **Breaking** (TRIPLEX-1039): `DropdownList` / `DropdownListItem` больше не подписываются на `keydown` документа — клавиши передаёт управляющий элемент через новый хук `useDropdownListKeyboard`; в `IDropdownListContext` добавлено обязательное поле `registerKeyDownHandler`. `DropdownList` хранит активный элемент по `id` и больше не клонирует children: `DropdownListItem` сам берёт активность и размер из списка и обрабатывает наведение, props `active` и `size` удалены. Исправления клавиатурной навигации и `aria-activedescendant`. |
