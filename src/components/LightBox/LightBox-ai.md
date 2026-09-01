---
component: LightBox
category: LightBox
related: [Page, TopOverlay, Portal, FocusTrapExtended, LoaderScreen, Button, ModalWindow]
tokens:
  - LightBox.Backdrop_Background
  - LightBox.Content_Background
  - LightBox.SideOverlay_Background
stories: stories/LightBox/LightBox.stories.tsx
version: "1.0"
---

# LightBox

## Назначение

Полноэкранный диалог поверх страницы для отображения крупного контента: просмотр документа,
пошаговый сценарий, галерея. Рендерится через портал в отдельную DOM-ноду, блокирует скролл
страницы, держит фокус внутри (focus trap). Составной компонент: контентная область
(`LightBox.Content`), кнопки управления (`LightBox.Controls` — закрыть/назад/вперёд),
боковые панели-сайдбары (`LightBox.LeftSidebar` / `LightBox.RightSidebar`), выезжающая справа
панель (`LightBox.SideOverlay`) и верхняя панель (`LightBox.TopOverlay`).

Используй когда: контенту нужен весь экран и собственный сценарий навигации (листание,
вложенные панели).
Не используй когда: достаточно компактного диалога с кнопками действий — возьми `ModalWindow`;
нужна нотификация — возьми соответствующий компонент уведомлений.

Внутрь `LightBox.Content` кладётся `Page` (Header/Body/Footer). Если контента мало —
`Page.Body` типа `FIRST`; если много — тип `SECOND` с несколькими `Island` внутри.

---

## Варианты и props

### Размеры (`ELightBoxSize`)

Ограничивают максимальную ширину контентной области:

| Значение | Max-width контента |
|---|---|
| `SM` | 664px |
| `MD` (по умолчанию) | 864px |
| `LG` | 1064px |
| `XL` | 1264px |

### Обязательные props (`LightBox`)

| Prop | Тип | Описание |
|---|---|---|
| `children` | `React.ReactElement[]` | Массив элементов: `LightBox.Content` и опционально `LightBox.Controls`, сайдбары, оверлеи |

### Опциональные props (`LightBox`)

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `ELightBoxSize` | `MD` | Максимальная ширина контента |
| `isLoading` | `boolean` | — | Состояние загрузки: деактивирует focus trap, добавляет модификатор на корневой элемент (кнопка закрытия поднимается над лоадером контента); `LightBox.Content` показывает `LoaderScreen` |
| `isSideOverlayOpened` | `boolean` | — | Флаг открытой боковой панели — добавляет модификатор на корневой элемент (блокирует скролл контента) |
| `isTopOverlayOpened` | `boolean` | — | Флаг открытой верхней панели — аналогичный модификатор |
| `focusTrapProps` | `IFocusTrapExtendedProps` | — | Переопределение настроек `FocusTrapExtended` |
| `forwardRef` | `React.MutableRefObject<HTMLElement \| null>` | — | Ref на корневой контейнер (исторически — prop, а не `React.forwardRef`) |
| `mountNode` | `HTMLDivElement` | нода `#LightBox-next-mount-node` (создаётся автоматически) | DOM-нода для портала |
| `lightBoxViewManagerNodeId` | `string` | `LightBox-next-view-manager-node` | Id DOM-элемента, задающего левую/правую визуальные границы лайтбокса (split-mode). Известная особенность: если элемента с кастомным id нет в DOM, fallback-нода создаётся с дефолтным id |

Открытие/закрытие управляется снаружи условным рендером: `{isOpen && <LightBox>...</LightBox>}` —
собственного prop `opened` нет.

### Ключевые props субкомпонентов

- `LightBox.Content`: `isLoading`, `loaderScreenProps`; автоматически добавляет `padding-top`
  на высоту `LightBox.Controls`.
- `LightBox.Controls.Close`: `onClick` (обязателен), `title` (по умолчанию «Закрыть»);
  срабатывает по Esc.
- `LightBox.Controls.Prev` / `Next`: `onClick` (обязателен), `clickByArrowLeft` /
  `clickByArrowRight` — клик по стрелкам клавиатуры, `dataTutorialId`.
- `LightBox.LeftSidebar` / `RightSidebar`: `fixed` (фиксация панели), `minVisibleWidth`
  (порог ширины в px, ниже которого содержимое скрывается; по умолчанию 100), `onShow`/`onHide`.
  Отслеживают собственную ширину через `ResizeObserver`.
- `LightBox.SideOverlay`: `opened` (управляется снаружи), `onOpen`/`onClose` (вызываются по
  окончании CSS-анимации), `isLoading`, `isTopLevelSideOverlayOpened` (открыт другой SideOverlay
  поверх), `isTopOverlayOpened`, `size` (`EComponentSize` SM/MD/LG),
  субкомпоненты `SideOverlay.CloseDesktop` / `SideOverlay.CloseMobile`.
- `LightBox.TopOverlay` — реэкспорт компонента `TopOverlay`.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/LightBox.ts`.

```text
LightBox.Backdrop_Background
LightBox.Content_Background
LightBox.SideOverlay_Background
```

Ширина скроллбара — не токен: `addClassNameWithScrollbarWidth` вешает на `<html>` класс
`scroll-{0|15|16|17}`, а `styles/LightBoxScroll.module.less` объявляет по нему локальную
css-переменную `--lightBox-scroll-width`, которую вычитают из ширины оверлеев. Ширины размеров
(`664/864/1064/1264`) заданы LESS-константами `@lightBox-content-max-width-*`.

---

## Инварианты

- **Публичный API**: имена props `ILightBoxProps`, значения `ELightBoxSize`, компаундные ключи
  `LightBox.Content` / `SideOverlay` / `TopOverlay` / `Controls` / `LeftSidebar` / `RightSidebar`
  и `Controls.Close` / `Prev` / `Next` — не переименовывать.
- **`forwardRef`-паттерн**: `LightBox` принимает ref через prop `forwardRef`
  (`MutableRefObject`) — не менять на `React.forwardRef` (breaking change);
  `LightBoxSideOverlay`, `LightBoxLeftSidebar`, `LightBoxRightSidebar` обёрнуты в
  `React.forwardRef` — не убирать.
- **Экспортируемые константы** `lightBoxMountNodeIdDefault` (`LightBox-next-mount-node`) и
  `lightBoxViewManagerNodeIdDefault` (`LightBox-next-view-manager-node`) — часть публичного API.
- **`data-lightbox-component="controls"`** на контейнере `LightBox.Controls` — по нему
  `LightBox.Content` вычисляет `padding-top`. Не удалять.
- **`data-test-id`** `lightBox-prev` / `lightBox-next` на кнопках стрелок — используются
  автотестами потребителей.
- **Глобальные классы** `global-LB-less-or-equal-media-point-0` / `global-LB-more-media-point-0`
  (`LightBoxViewManagerConsts`) заменяют media query по ширине контейнера; связаны со стилями в
  `src/styles/components/lightbox.less`.
- Константы `LightBoxViewManagerConsts` (ширина стрелки 64, отступы 16/16, breakpoint 1024 +
  ширина скроллбара) синхронизированы с LESS — менять только парой.
- Пока смонтирован хотя бы один лайтбокс, на `document.documentElement` висит класс блокировки
  скролла; ведётся счётчик смонтированных лайтбоксов — класс снимается при размонтировании
  последнего (при переключении роутов второй лайтбокс может смонтироваться раньше, чем
  размонтируется первый). Аналогичный счётчик в `LightBoxViewManager` управляет классами
  mount-ноды (`LightBoxMountNodeViewManager`, `LB-*`).
- **Локальные z-index внутри лайтбокса** (стековый контекст создаёт `.lightBox`): контролы и
  sticky-шапка/футер `Page` — 100/101, лоадеры `LightBox.Content` и `LightBox.SideOverlay` — 201,
  `TopOverlay` — 500. `LoaderScreen` приходит с глобальным `@z-index-loader-screen` (10100),
  поэтому обе обёртки лоадера обязаны переопределять его локальным значением — иначе лоадер
  перекрывает `TopOverlay`.
- В состоянии загрузки (`isLoading` и без открытых оверлеев) контейнер контролов поднимается
  до 202 — иначе лоадер контента перекрывает кнопку закрытия. Поднимать нужно именно контейнер:
  `.lightBoxControls` — flex-элемент с собственным z-index, то есть создаёт стековый контекст,
  из которого z-index на самой кнопке уже не выберется.
- Баррел `index.ts` реэкспортирует `LightBox`, `enums`, `LightBoxSideOverlay` — сохранять.
- React 17 совместимость (синхронизация в release-0): React 18-only API не использовать.

---

## Accessibility

- Корневой элемент и `SideOverlay` — `role="dialog"` + `aria-modal="true"`.
- **Focus trap** (`FocusTrapExtended`): активен, пока `isLoading` не установлен; у `SideOverlay` —
  пока панель открыта и не анимируется. Начальный фокус — элемент с data-атрибутом
  `FocusTrapUtils.firstInteractionElementDataAttr` (потребитель помечает его сам, например
  заголовок с `tabIndex={-1}`).
- **Клавиатура**: Esc — клик по `Controls.Close`; ArrowLeft / ArrowRight — клик по
  `Controls.Prev` / `Controls.Next` при включённых `clickByArrowLeft` / `clickByArrowRight`.
  При открытом `SideOverlay` или `TopOverlay` клавиатурные триггеры контролов лайтбокса
  не активны (рендерится вариант кнопок без триггера). В состоянии загрузки Esc работает.
- Кнопки `Controls.Close` имеют `data-exclude-modal-focus` — исключаются из начального фокуса
  (у `Prev`/`Next` атрибута нет).
- `title` у `Controls.Close` по умолчанию «Закрыть» — для других языков потребитель передаёт
  свой `title`.

---

## Связанные компоненты

- `LightBoxContent` (`LightBoxContent.tsx`) — контентная область; следит за высотой контролов и шириной окна
- `LightBoxControls` + `LightBoxClose` / `LightBoxPrev` / `LightBoxNext` (`LightBoxControls/`) — кнопки управления; стрелки построены на общем внутреннем `LightBoxArrow` (не экспортируется)
- `LightBoxLeftSidebar` / `LightBoxRightSidebar` (`LightBoxSidebars/`) — сайдбары с автоскрытием содержимого по ширине (общий хук `useLightBoxSidebarVisibility`)
- `LightBoxSideOverlay` (`LightBoxSideOverlay/`) — выезжающая справа панель с собственным focus trap, лоадером и кнопками закрытия CloseDesktop/CloseMobile
- `LightBoxViewManager` (`LightBoxViewManager/`) — внутренний менеджер позиционирования: следит за границами view-manager-ноды, проставляет breakpoint-классы и CSS-переменные
- `TopOverlay` (`src/components/TopOverlay`) — верхняя панель, реэкспортируется как `LightBox.TopOverlay`
- `Page` (`src/components/Page`) — рекомендуемая структура содержимого `LightBox.Content`
- `ModalWindow` — альтернатива для компактных диалогов

---

## Stories

Основные истории: `stories/LightBox/LightBox.stories.tsx`
Файлы примеров: `stories/LightBox/examples/`
Визуальная регрессия: `stories/LightBox/LightBoxInitialOpened.stories.tsx` (лайтбокс, открытый
сразу при рендере — для скриншот-тестов; baseline в `__screenshots__/`).

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контроль size / isLoading / контролы / sticky header и footer |
| `Default` | `DefaultExample.tsx` | Базовая конфигурация с контролами и sticky-шапкой/футером |
| `Sizes` | `SizesExample.tsx` | Размеры SM / MD / LG / XL |
| `SmallContent` | `SmallContentExample.tsx` | Малый контент с `Page.Body` типа FIRST |
| `SplitMode` | `SplitModeExample.tsx` | Позиционирование по границам кастомной view-manager-ноды |
| `WithSidebars` | `WithSidebarsExample.tsx` | Левый и правый сайдбары |
| `WithFixedSidebars` | `WithFixedSidebarsExample.tsx` | Фиксированные сайдбары (`fixed`) |
| `WithOneSidebar` | `WithOneSidebarExample.tsx` | Только один сайдбар |
| `WithSideOverlay` | `WithSideOverlayExample.tsx` | Боковая выезжающая панель |
| `WithSideOverlayLoading` | `WithSideOverlayLoadingExample.tsx` | SideOverlay в состоянии загрузки |
| `WithTopOverlay` | `WithTopOverlayExample.tsx` | Верхняя панель |
| `WithTopOverlayInSideOverlay` | `WithTopOverlayInSideOverlayExample.tsx` | TopOverlay внутри SideOverlay |
| `LightBoxInitialOpened/Default` | — | Visual regression: лайтбокс, открытый сразу при рендере (`LightBoxInitialOpened.stories.tsx`, baseline в `__screenshots__/`) |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-22 | Создан документ (Phase 1 AI-Ready). В том же изменении — AI-рефакторинг: JSDoc на props, общий `LightBoxArrow` для Prev/Next, хук `useLightBoxSidebarVisibility` для сайдбаров, устранение eslint-подавлений; публичный API не менялся |
| 2026-07-22 | Добавлен `export` к props-интерфейсам `ILightBoxControlsProps`, `ILightBoxCloseProps`, `ILightBoxPrevProps`, `ILightBoxNextProps`, `ILightBoxSideOverlayLoaderProps` (аддитивно, для консистентности с остальными интерфейсами компонента) |
| 2026-07-22 | Багфиксы по ревью PR #474: клавиатурные триггеры контролов целятся в видимую кнопку (стрелки не работали на desktop, Esc — на mobile); таймер-хак блокировки скролла заменён счётчиком смонтированных лайтбоксов; `LightBoxViewManager` снимает классы mount-ноды при размонтировании последнего менеджера |
| 2026-08-17 | Исправлено: `LightBox.TopOverlay` перекрывался лоадером `LightBox.Content`. У `.loadingContentOverlay` теперь локальный z-index (201) — выше sticky-шапки и футера `Page`, но ниже `TopOverlay` (500); раньше `LoaderScreen` шёл с глобальным `@z-index-loader-screen` (10100) |
| 2026-08-25 | Исправлено: в состоянии загрузки кнопка закрытия была недоступна для клика — её перекрывал лоадер `LightBox.Content`. Восстановлен модификатор `isLoading` на корневом элементе (терялся при переходе на CSS Modules): контролы поднимаются над лоадером, кнопки вперёд/назад скрываются. Esc в состоянии загрузки сохранён рабочим |
