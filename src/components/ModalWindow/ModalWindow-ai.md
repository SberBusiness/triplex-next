---
component: ModalWindow
category: ModalWindow
related: [ModalWindowContent, ModalWindowHeader, ModalWindowBody, ModalWindowFooter, ModalWindowClose, ModalWindowViewManager, Portal, FocusTrap, Page, HeaderPage, FooterPage, Island, LoaderScreen]
tokens:
  - --triplex-next-ModalWindow-Backdrop_Background
  - --triplex-next-ModalWindow-Background
stories: stories/ModalWindow/ModalWindow.stories.tsx
version: "1.0"
---

# ModalWindow

## Назначение

Модальное окно поверх контента страницы с затемнённым backdrop, ловушкой фокуса и блокировкой скролла `body`. Рендерится через `Portal` в собственный wrapper (`#ufs-modal-window-wrapper`), позиционируется по координатам, которые вычисляет вспомогательный `ModalWindowViewManager` (CSS-переменные `--modalWindow-screen-*`).

Используй когда: нужно вывести критичный контент (форму, подтверждение, мастер-форму), который должен прервать взаимодействие со страницей и удержать фокус.

---

## Варианты и props

`ModalWindow` принимает все стандартные `React.HTMLAttributes<HTMLDivElement>` (они пробрасываются на корневой `role="dialog"` элемент) плюс собственные props.

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `isOpen` | `boolean` | Открыто ли окно. Управляет монтированием Portal и анимацией `CSSTransition`. |
| `children` | `React.ReactElement` | Контент окна. Обычно — `ModalWindowContent` с вложенными `ModalWindowHeader`, `ModalWindowBody`, `ModalWindowFooter`. |
| `closeButton` | `React.ReactNode` | Кнопка закрытия (обычно `ModalWindowClose`). Рендерится внутри корневого dialog-элемента поверх контента. |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `EComponentSize.MD` | Размер окна: `SM` / `MD` / `LG`. Определяет `max-width` контента и `min-height` body. |
| `topPosition` | `number` | `100` | Отступ от верхней границы экрана, px. Прокидывается в CSS-переменную `--modal-window-top`. |
| `containerClassName` | `string` | — | Кастомный класс на контейнер (внешний `div` с `position: fixed`, который содержит backdrop и dialog). |
| `className` | `string` | — | Кастомный класс на корневой `role="dialog"` элемент. |
| `focusTrapProps` | `FocusTrapProps` | — | Свойства `focus-trap-react`. Внутренние `allowOutsideClick: true` и `preventScroll: true` мерджатся с пользовательскими `focusTrapOptions`. |
| `onExited` | `() => void` | — | Callback после завершения анимации закрытия (`CSSTransition.onExited`). |

### Ограничения использования

- **Controlled-only.** Состояние открытия полностью контролируется потребителем через `isOpen`. Компонент сам не закрывается на клик по backdrop'у — обработчик `Escape` живёт в `ModalWindowClose`, не в `ModalWindow`.
- **`children` — единый `React.ReactElement`.** Это требование `CSSTransition` для анимирования одного дочернего узла. Не передавай массив или фрагмент — оборачивай контент в `ModalWindowContent`.
- **Rendering lifecycle.** При `isOpen=true` создаётся локальный `mountNode` под `#ufs-modal-window-wrapper` и взводится `renderPortal=true`. При закрытии Portal-нода удаляется в `onExited` после завершения анимации (300ms). До завершения первой анимации компонент возвращает `null`.
- **`ModalWindowViewManager` рендерится всегда** рядом с Portal — он отвечает за вычисление координат рамки, в которой живёт окно (через `useResizeDetector`), и инжектит `<style>` с CSS-переменными `--modalWindow-screen-{left,top,width}` в `:root`. Не пытайся убрать его из дерева.

---

## Дизайн-токены

```
--triplex-next-ModalWindow-Backdrop_Background
--triplex-next-ModalWindow-Background
```

Помимо токенов, компонент инжектит и читает несколько runtime CSS-переменных, не относящихся к дизайн-системе:

```
--modalWindow-screen-left   # координата слева, выставляется ModalWindowViewManager
--modalWindow-screen-top    # высота шапки лайаута, выставляется ModalWindowViewManager
--modalWindow-screen-width  # ширина области, выставляется ModalWindowViewManager
--modal-window-top          # отступ контента от верхней границы окна (= prop topPosition)
```

Имена этих переменных — публичный контракт для лайаута приложения, не переименовывать без согласования.

---

## Инварианты

- **`forwardRef`** на `ModalWindow` пробрасывает ref на корневой `role="dialog"` `<div>` — не убирать.
- **`role="dialog"` + `aria-modal="true"`** на корневом dialog-элементе — не менять.
- **Body-классы `modal-open` + `no-hash-overflow-hidden`** добавляются при открытии и убираются при закрытии и unmount. Имена согласованы с внешним лайаутом сббола, не переименовывать.
- **Portal-wrapper id `ufs-modal-window-wrapper`** и класс `ufs-modal-window-portal-node` — публичный контракт, на него могут опираться e2e-тесты и внешние стили.
- **`ModalWindowViewManager` node id `modalWindowViewManagerNodeId` (`"modalWindowViewManagerNodeId"`)** — публичный контракт лайаута: контейнер `<div id="modalWindowViewManagerNodeId">` создаётся вне React-дерева приложения и используется как граница позиционирования.
- **Animation timeout 300ms** (`animationExitTime`) — синхронизирован с CSS-анимацией `modalWindowContentAnimationOnExit` и `keyframes-fadeOut`. Менять только синхронно с less-стилями.
- **Barrel export в `src/components/ModalWindow/index.ts`** — все семь экспортов (`ModalWindow`, `ModalWindowBody`, `ModalWindowClose`, `ModalWindowContent`, `ModalWindowFooter`, `ModalWindowHeader`, `ModalWindowViewManager`) — публичный API.
- **`displayName = "ModalWindow"`** и displayName всех субкомпонентов — публичный API React DevTools/snapshot-тестов.

---

## Accessibility

- **Роль и aria.** Корневой dialog-элемент рендерится с `role="dialog"` и `aria-modal="true"`. Дополнительные aria-атрибуты (`aria-label`, `aria-labelledby`, `aria-describedby`) потребитель **обязан** передать сам через `...rest` — компонент не хардкодит текст, библиотека мультиязычная.
- **Focus trap.** Активная ловушка фокуса (`focus-trap-react`) включается синхронно с `isOpen`. По умолчанию: `allowOutsideClick: true` (клик за пределами не сбрасывает trap, но не блокируется), `preventScroll: true` (фокус не скроллит layout). Расширить настройки можно через `focusTrapProps.focusTrapOptions`.
- **Закрытие по Escape.** Обработчик ESC живёт в `ModalWindowClose` (через `TriggerClickOnKeyDownEvent` + `KeyDownListener` на window keydown). Если `closeButton` заменён на кастомный — потребитель сам реализует ESC-handler.
- **Возврат фокуса.** За возврат фокуса на триггер при закрытии отвечает `focus-trap-react` (стандартное поведение). Если триггер был внутри другой ловушки фокуса — настрой `returnFocusOnDeactivate` через `focusTrapProps`.
- **Блокировка фоновой страницы.** Body-классы `modal-open` + `no-hash-overflow-hidden` блокируют скролл страницы. Это визуальная блокировка, не aria — для технологий screen-reader полагаемся на `aria-modal="true"`.

---

## Связанные компоненты

Все экспортируются из `@sberbusiness/triplex-next` через barrel `src/components/ModalWindow/index.ts`:

- **`ModalWindowContent`** — контейнер контента. Оборачивает дочерние секции в `Page` (`triplex-next/Page`). Имеет `isLoading?: boolean` и `loadingTitle?: React.ReactNode` — при `isLoading` поверх контента показывается `LoaderScreen` типа `middle`. Свой `displayName`. Свои props через интерфейс `IModalWindowContentProps` — экспортируется.
- **`ModalWindowHeader`** — заголовок. Тривиальная обёртка над `HeaderPage` с фиксированным `type=FIRST` и доп. отступом справа под кнопку закрытия (через less). Экспонирует статическое поле `Title = HeaderPage.Title`. Тип `IModalWindowHeaderProps` (Omit `children`/`type` от `IHeaderPageTypeFirstProps`).
- **`ModalWindowBody`** — тело. Тривиальная обёртка над `Island` с фиксированными `type=TYPE_1` и `size=MD`. Тип `IModalWindowBodyProps extends IIslandProps`.
- **`ModalWindowFooter`** — футер. Тривиальная обёртка над `FooterPage` с фиксированным `type=FIRST`. Экспонирует статическое поле `Description = FooterPage.Description`.
- **`ModalWindowClose`** — кнопка закрытия. Обёртка над `Button` (`theme=SECONDARY`, `size=MD`, иконка `CrossStrokeSrvIcon20`) внутри `TriggerClickOnKeyDownEvent` с `EVENT_KEY_CODES.ESCAPE`. По умолчанию `title="Закрыть"` — потребитель может переопределить через props. Тип `IModalWindowCloseProps` (Omit `size`/`theme`/`icon` от `IButtonSecondaryProps`).
- **`ModalWindowViewManager`** — невидимый компонент-сенсор. Создаёт DOM-ноду `<div id="modalWindowViewManagerNodeId">` (если её нет в `body`) и рендерит туда через `Portal` resize-сенсор + `<style>`-инжект CSS-переменных `--modalWindow-screen-*` в `:root`. Подключается автоматически из `ModalWindow`; экспортируется отдельно для случая, когда лайаут хочет позиционировать ноду вручную (например, рисовать модалку только в области рабочей зоны без шапки).

---

## Stories

Основные истории: `stories/ModalWindow/ModalWindow.stories.tsx`
Файлы примеров: `stories/ModalWindow/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | — | Интерактивный контроль `isLoading` и `size`; кнопки эмитят `action()` |
| `Default` | `Default.tsx` | Минимальный пример: открытие/закрытие, заголовок, body, футер |
| `Sizes` | `Sizes.tsx` | Размеры `SM` / `MD` / `LG`, для каждого — отдельный триггер |
| `WithLongContent` | `WithLongContent.tsx` | Длинный контент с прилипающими header/footer |
| `LoadingState` | `LoadingState.tsx` | Состояние загрузки (`isLoading=true` + `loadingTitle`) |

Все стори, кроме скриншотных проверок, исключены из визуальных тестов на уровне `meta.parameters.testRunner: { skip: true }` — модалка анимируется и реализована через Portal вне Storybook canvas, скриншоты были бы пустыми.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-05-04 | Создан документ. AI-рефакторинг: добавлены JSDoc на компоненты и props, экспортирован `IModalWindowContentProps`, унифицированы импорты в `ModalWindowClose`, добавлен `displayName` субкомпонентам. Stories мигрированы в modern pattern (папка `examples/`, `?raw`, публичные импорты). Добавлены unit-тесты на `ModalWindowContent`, `ModalWindowClose`, `ModalWindowBody`, `ModalWindowHeader`, `ModalWindowFooter`. |
