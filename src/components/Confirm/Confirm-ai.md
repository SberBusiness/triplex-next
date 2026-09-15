---
component: Confirm
category: Confirm
related: [Island, Button, Title, Text, TriggerClickOnKeyDownEvent]
tokens: []
stories: stories/Confirm/Confirm.stories.tsx
version: "1.0"
---

# Confirm

## Назначение

Предупреждение о закрытии лайтбокса или его боковой панели: карточка `Island` типа `TYPE_1`
с ролью `dialog` и `aria-modal="true"`, внутри которой лежит текст (`Confirm.Content`), кнопки
действий (`Confirm.Controls`) и кнопка-крестик (`Confirm.Close`). Собственного состояния нет —
компонент ничего не открывает и не закрывает, обработчики кнопок задаёт потребитель.

Используй когда: действие пользователя приведёт к потере данных (закрытие формы, выход из
мастера) и его нужно подтвердить прямо поверх контента — как правило, внутри `TopOverlay`
(он же `LightBox.TopOverlay`), который и обеспечивает маску, выезд панели и ловушку фокуса.

Не используй когда:
- Диалог нужен поверх обычной страницы, а не внутри лайтбокса — возьми `ModalWindow`: он сам
  рендерится в портал, блокирует скролл и держит фокус. Confirm ничего из этого не делает.
- Нужен полноэкранный сценарий с навигацией — возьми `LightBox`.
- Нужно уведомление без выбора действия — возьми компоненты уведомлений (`AlertContext`,
  `Notification`).

---

## Варианты и props

### Обязательные props

Обязательных props нет — `<Confirm>` рендерится с шириной под контент лайтбокса.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `parentComponent` | `EConfirmParentComponent` | `EConfirmParentComponent.LIGHTBOX` | Компонент, внутри которого открыт Confirm. Влияет только на максимальную ширину |

`IConfirmProps extends IIslandProps`, поэтому доступны и props `Island` (`type`, `size`,
`loading`, `loaderScreenProps`, `withoutPaddings`) и все атрибуты `<div>`. `type` компонент
задаёт сам (`EIslandType.TYPE_1`) до spread'а — потребитель может его переопределить, но это
выход за пределы дизайна компонента.

### Максимальная ширина (`EConfirmParentComponent`)

Класс ширины — единственное, на что влияет `parentComponent`. Из ширины родителя вычитаются
горизонтальные отступы страницы (`@page-padding-desktop-x` × 2 = 64px):

| Значение | Родитель | Max-width |
|---|---|---|
| `LIGHTBOX` | `LightBox` | `--lightBox-content-max-width` − 64px (вне лайтбокса fallback 864px → 800px) |
| `SIDE_OVERLAY_SM` | `LightBoxSideOverlay` SM | 520px |
| `SIDE_OVERLAY_MD` | `LightBoxSideOverlay` MD | 680px |
| `SIDE_OVERLAY_LG` | `LightBoxSideOverlay` LG | 800px |

`--lightBox-content-max-width` выставляет сам `LightBox` в зависимости от своего размера
(664 / 864 / 1064 / 1264px), поэтому вариант `LIGHTBOX` подстраивается под лайтбокс, а не
фиксирует число. Вне лайтбокса используется fallback-значение 864px. Карточка центрируется
(`margin: 0 auto`) и растягивается до максимума (`flex-grow: 1`).

### Составные части

| Часть | Она же | Что делает |
|---|---|---|
| `Confirm.Content` | `ConfirmContent` | `<div>`-обёртка текста: отступ 24px до кнопок и `padding-right: 56px` — место под крестик |
| `Confirm.Content.Title` | `ConfirmContentTitle` | `Title` с `size=H3` по умолчанию (тег `<h3>`) и отступом 12px до подзаголовка |
| `Confirm.Content.SubTitle` | `ConfirmContentSubTitle` | `Text` с `size=B2` и `tag="div"` по умолчанию (тег можно переопределить) |
| `Confirm.Controls` | `ConfirmControls` | `<div>` с `white-space: nowrap` — кнопки не переносятся на новую строку. Отступ между кнопками даёт сам `Button` (12px у соседних кнопок) |
| `Confirm.Close` | `ConfirmClose` | Кнопка-крестик, абсолютно спозиционированная в правом верхнем углу; при `clickByEsc` нажатие Esc вызывает click по ней |

Все части необязательны и порядок в разметке произвольный: крестик позиционируется абсолютно,
остальные части идут потоком. Типичный порядок — `Content` → `Controls` → `Close`.

### Закрытие по Esc (`Confirm.Close`)

`clickByEsc` — обязательный prop `Confirm.Close`. При `true` компонент оборачивается в
`TriggerClickOnKeyDownEvent`, который слушает `keydown` на `window` (через `KeyDownListener`) и
вызывает `click()` по кнопке.

- Слушатель **глобальный**: он сработает на Esc из любого места страницы, пока `Confirm.Close`
  смонтирован. Поэтому передавай `clickByEsc` флагом видимости предупреждения
  (`clickByEsc={topOverlayOpened}`), иначе Esc будет закрывать невидимый Confirm и конфликтовать
  с Esc родительского `LightBox`.
- Клик выполняется, только если кнопка видима: `TriggerClickOnKeyDownEvent` проверяет
  `offsetParent !== null`. В jsdom `offsetParent` всегда `null`, поэтому в unit-тестах его
  мокают (`__tests__/ConfirmClose.test.tsx`).
- Совпадение клавиши проверяется по `event.keyCode` (`EVENT_KEY_CODES.ESCAPE`), а не по `key`.

---

## Дизайн-токены

Собственных токенов у Confirm нет: `styles/Confirm.module.less` задаёт только ширину, отступы и
позиционирование крестика. Цвета приходят из вложенных компонентов — фон и тень от `Island`
(`Island.Type1_Background`, `Island.Type1_Shadow`), текст от `Title` / `Text`, кнопка закрытия от
`Button` (тема `SECONDARY`). Переопределяются они через `ThemeProvider` у соответствующего
компонента — см. `Island-ai.md`, `Button-ai.md` и `ThemeProvider-ai.md` → «Как переопределять
токены».

---

## Инварианты

- **`forwardRef`** — обязателен у `Confirm` и всех частей. `ref` у `Confirm` идёт на корневой
  `<div>` `Island` (тот же элемент, что получает `className`, `role` и `...rest`), у
  `Confirm.Close` — на `<button>`.
- **Корневой элемент — `Island`, а не голый `<div>`.** Замена сломает фон, скругление и отступы
  карточки, а также `position: relative` у `Island.Body`, от которого зависит абсолютное
  позиционирование крестика.
- **`children` кладутся в `Island.Body`.** Крестик позиционируется относительно `Island.Body`,
  поэтому оборачивать содержимое в дополнительный контейнер с `position: relative` нельзя —
  крестик уедет.
- **`role="dialog"` и `aria-modal="true"` выставляются до spread'а props** — потребитель может
  их переопределить (например на `alertdialog`). Убирать роль из компонента нельзя: на неё
  опираются тесты и accessibility-контракт.
- **Публичный API:** `Confirm`, `IConfirmProps`, `IConfirmFC`, `EConfirmParentComponent`
  экспортируются из `src/components/Confirm/index.ts`. Значения enum — строки `lightBox`,
  `sideOverlaySM`, `sideOverlayMD`, `sideOverlayLG`. Части доступны только как статики
  (`Confirm.Close` / `.Content` / `.Controls`), из barrel они не экспортируются — их типы
  (`IConfirmCloseProps`, `IConfirmContentProps`, `IConfirmControlsProps` и др.) живут в
  `components/`.
- **`IConfirmFC` и `IConfirmContentFC` описывают `React.ForwardRefExoticComponent` со
  статиками.** Явная аннотация снимает проверку лишних свойств у `Object.assign`, поэтому при
  добавлении статики интерфейс нужно править синхронно — иначе статика окажется в рантайме, но
  не в публичном типе.
- **`.isInLightBox` дублирует базовый `.confirm` намеренно** — max-width совпадает, класс
  выставляется для симметрии с остальными значениями enum и читаемости DOM.
- **`PARENT_COMPONENT_TO_CLASS_NAME_MAP` — внутренняя константа** `Confirm.tsx`, в barrel не
  экспортируется.

---

## Accessibility

- **Роль:** корневой элемент — `role="dialog"` с `aria-modal="true"`. Доступного имени компонент
  сам не проставляет: если у предупреждения есть `Confirm.Content.Title`, свяжи их
  (`aria-labelledby` на `Confirm` и `id` на заголовке) или передай `aria-label` — иначе
  скринридер объявит диалог без названия.
- **Фокус компонент не трапит и не переводит.** Ловушку фокуса даёт контейнер: `TopOverlay`
  использует `FocusTrapExtended`, `LightBox` — свой focus trap. Отдельно от них Confirm
  доступностью модального диалога не обладает.
- **Клавиатура:** собственных обработчиков нет, кроме Esc у `Confirm.Close` при `clickByEsc`
  (глобальный слушатель `keydown` на `window`). Кнопки действий — обычные `<button>` из `Button`.
- **Текст кнопки закрытия задаёт потребитель, и он обязателен.** Дефолта у `Confirm.Close`
  нет: строки на конкретном языке внутри компонентов запрещены. Кнопка иконочная, поэтому
  без `title` (или `aria-label`) у неё не будет доступного имени — передавай его всегда.
- **Заголовок — `<h3>` по умолчанию** (`Title` берёт тег из `size`). Если по структуре страницы
  нужен другой уровень, передай `tag` в `Confirm.Content.Title`.

---

## Связанные компоненты

### Контракты (в `related`)

- `Island` — корневая карточка. `IConfirmProps extends IIslandProps`, поэтому добавление prop в
  `Island` расширяет публичный API `Confirm` без правок в его коде. Confirm задаёт
  `type={EIslandType.TYPE_1}` и кладёт `children` в `Island.Body`.
- `Button` — `ConfirmCloseButton` рендерит `Button` с темой `SECONDARY`, размером `MD` и иконкой
  `CrossStrokeSrvIcon20`; props `theme`, `size` и `icon` в `IConfirmCloseButtonProps` вырезаны
  через `Omit`. Кнопки действий потребитель кладёт в `Confirm.Controls` сам.
- `Title` — основа `Confirm.Content.Title` (дефолт `size=H3`).
- `Text` — основа `Confirm.Content.SubTitle` (дефолт `size=B2`, `tag="div"`).
- `TriggerClickOnKeyDownEvent` — обёртка, дающая `Confirm.Close` реакцию на Esc при `clickByEsc`.

### Части Confirm (своего AI.md не имеют)

- `ConfirmContent` (`Confirm.Content`) и его части `ConfirmContentTitle` (`.Title`),
  `ConfirmContentSubTitle` (`.SubTitle`).
- `ConfirmControls` (`Confirm.Controls`).
- `ConfirmClose` (`Confirm.Close`) и внутренний `ConfirmCloseButton`.

### Контейнеры, в которых открывают Confirm (в `related` не входят — связи по коду нет)

- `TopOverlay` (он же `LightBox.TopOverlay`) — штатное место Confirm: маска поверх контента
  лайтбокса и выезжающая сверху панель с ловушкой фокуса. Значение `parentComponent` выбирается
  по тому, в чём открыт сам лайтбокс.
- `LightBox` и `LightBoxSideOverlay` — задают ширину, под которую подстраивается Confirm через
  `parentComponent`.
- `ModalWindow` — направление из «Не используй когда»: самостоятельный модальный диалог поверх
  страницы.

---

## Stories

Основные истории: `stories/Confirm/Confirm.stories.tsx`
Файлы примеров: `stories/Confirm/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `parentComponent`, наличия крестика и `clickByEsc` |
| `Default` | `Default.tsx` | Минимальное предупреждение: заголовок, текст, две кнопки, крестик |
| `Parent components` | `ParentComponents.tsx` | Все значения `EConfirmParentComponent` и разница в максимальной ширине |
| `Example` | `Example.tsx` | Продуктовый сценарий: Confirm внутри `TopOverlay` подтверждает закрытие `LightBox` |
| `VisualTests` | `VisualTests.tsx` | Скриншот-кейсы: только заголовок, без крестика, длинный текст с тремя кнопками |

`Playground` и `Example` исключены из скриншот-тестов: песочница интерактивна, а лайтбокс в
`Example` открывается по клику — статичный скриншот показал бы только кнопку.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-09-15 | Создан документ. AI-рефакторинг: `Confirm`, `Confirm.Content`, `Confirm.Content.Title`, `Confirm.Content.SubTitle`, `Confirm.Controls` и `Confirm.Close` переведены с `React.FC` на `forwardRef` (статики сохранены через `Object.assign`), JSDoc на props, значениях `EConfirmParentComponent` и компонентах, `className` больше не идёт перед базовыми классами в `clsx`. Добавлены unit-тесты (34) и stories `stories/Confirm/`. Публичный API не изменён. |
