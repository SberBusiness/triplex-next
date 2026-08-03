---
component: Portal
category: Portal
related: [Dropdown, Tooltip]
tokens: []
stories: stories/Portal/Portal.stories.tsx
version: "1.0"
---

# Portal

## Назначение

Сервисный компонент — тонкая обёртка над `ReactDOM.createPortal`. Рендерит
`children` в указанный внешний DOM-узел (`container`), а не в месте объявления,
сохраняя React-контекст и всплытие событий по React-дереву.

Используй когда: содержимое нужно вынести из DOM-иерархии родителя — выйти за
пределы контейнера с `overflow: hidden`, поверх `z-index`-контекста, в
`document.body` или произвольный узел (всплывающие слои, тултипы, дропдауны).

Не используй когда:
- Нужен готовый всплывающий слой с позиционированием и поведением — используй
  `Dropdown`, `Tooltip`, `ModalWindow`: они уже рендерятся через Portal или
  собственные механизмы.
- Контейнер ещё не существует на момент рендера — сначала дождись монтирования
  узла (создай его через ref-callback/`useState`), затем рендери Portal.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `children` | `React.ReactNode` | Содержимое, рендерящееся в `container` |
| `container` | `Element \| DocumentFragment` | Существующий DOM-узел, в который рендерится содержимое |

Опциональных props нет. Компонент не рендерит собственный host-элемент и не
принимает `className`/rest-атрибуты — стилизуется сам `container` или
содержимое.

### Особенности поведения

- При смене `container` на rerender содержимое переносится в новый узел,
  старый очищается.
- При unmount содержимое удаляется из `container`; сам узел-контейнер
  компонент не создаёт и не удаляет — его жизненный цикл на потребителе.
- События из содержимого всплывают по React-дереву (к родителю Portal), а не
  по DOM-дереву контейнера — стандартная семантика `createPortal`.

---

## Дизайн-токены

Собственных стилей и CSS-переменных нет — компонент не рендерит разметку.

---

## Инварианты

- **Без `forwardRef` — осознанное исключение** из общего правила библиотеки:
  Portal не рендерит собственный host-элемент, ref форвардить некуда. Не
  добавлять `forwardRef` без изменения контракта.
- **Имена props `children` и `container`** и тип `container: Element |
  DocumentFragment` — публичное API с версии 1.21.0, не менять.
- **Интерфейс `IPortalProps`** экспортируется из barrel — не переименовывать.
- Реализация остаётся тонкой обёрткой над `ReactDOM.createPortal` (React
  17-совместимый API) — не добавлять состояние, эффекты и React 18-only API:
  код синхронизируется в release-0.

---

## Accessibility

- Собственной ARIA-семантики нет — компонент прозрачен для accessibility-дерева.
- Портал не управляет фокусом: focus trap, возврат фокуса, `aria-modal` и
  прочие контракты всплывающих слоёв — ответственность потребителя
  (`ModalWindow`, `Dropdown` реализуют их самостоятельно).
- Учитывай порядок чтения screen reader'ом: содержимое читается в месте
  `container` в DOM, а не в месте объявления.

---

## Связанные компоненты

- `Dropdown` (`src/components/Dropdown/`) — рендерит выпадающий слой через
  Portal в `document.body`.
- `Tooltip` (`src/components/Tooltip/`) — desktop- и mobile-реализации
  рендерят тултип через Portal: mobile — всегда в `document.body`, desktop — в
  `renderContainer ?? document.body`.

---

## Stories

Основные истории: `stories/Portal/Portal.stories.tsx`
Файлы примеров: `stories/Portal/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `children`; `container` задаётся обёрткой (узел с пунктирной рамкой) |
| `Default` | `Default.tsx` | Содержимое рендерится в указанный DOM-узел, а не в месте объявления |
| `Example` | `Example.tsx` | Типовой сценарий: вынос содержимого из контейнера с `overflow: hidden` |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-07-29 | Создан документ. AI-рефакторинг (TRI-67): JSDoc на props `IPortalProps`, unit-тесты (5 кейсов: рендер в container/DocumentFragment, rerender, смена container, unmount), stories по modern pattern. Публичный API не менялся; `forwardRef` осознанно отсутствует. |
