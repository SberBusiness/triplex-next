---
component: KeyDownListener
category: KeyDownListener
related: [ComposedKeyDownListener, TriggerClickOnKeyDownEvent, SelectExtendedField, SliderExtended]
tokens: []
stories: stories/KeyDownListener/KeyDownListener.stories.tsx
version: "1.0"
---

# KeyDownListener

## Назначение

Сервисный headless-компонент. Пока смонтирован, слушает `keydown` на `window` и
вызывает `onMatch`, если числовой код нажатой клавиши (`event.keyCode`) совпал с
`eventKeyCode`. Собственной разметки не рендерит: `children` выводятся как есть,
без обёртки; без `children` не рендерит ничего.

Используй когда: нужна глобальная (документная) горячая клавиша, работающая
независимо от того, где находится фокус — закрытие оверлея по `Esc`, стрелки для
управления слайдером/ползунком, подтверждение по `Enter`.

Не используй когда:
- Клавиша должна обрабатываться только внутри конкретного элемента — навесь
  `onKeyDown` на сам элемент, иначе обработчик сработает при вводе в другое поле
  на странице.
- Нужно кликнуть по конкретной кнопке по нажатию клавиши — есть готовый
  `TriggerClickOnKeyDownEvent`.
- Нужно несколько разных клавиш с разными обработчиками — используй
  `ComposedKeyDownListener` (см. «Связанные компоненты»).

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `eventKeyCode` | `number \| number[]` | Код клавиши из `EVENT_KEY_CODES` или массив кодов. Массив — «любая из перечисленных клавиш»; различить нажатую можно по `event.keyCode` внутри `onMatch` |
| `onMatch` | `(event: KeyboardEvent) => void` | Вызывается при совпадении. Получает нативный `KeyboardEvent` (не React SyntheticEvent) |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Рендерится как есть. Компонент не оборачивает содержимое и никак на него не влияет — вложение нужно только для читаемости кода |

### Особенности поведения

- Слушатель навешивается на `window` в `componentDidMount` и снимается в
  `componentWillUnmount`. Компонент не вызывает `preventDefault` и не
  останавливает всплытие — это ответственность `onMatch`.
- Сравнение идёт по устаревшему `event.keyCode`, а не по `event.key`. Коды
  берутся из `EVENT_KEY_CODES` (`@sberbusiness/triplex-next`); не хардкодь числа.
- `onMatch` и `eventKeyCode` читаются из `this.props` в момент события, поэтому
  свежие значения после rerender применяются без переподписки.
- Несколько смонтированных `KeyDownListener` на одну клавишу срабатывают все —
  порядок соответствует порядку монтирования.
- Компонент не проверяет, где находится фокус: `Esc` сработает и во время ввода
  в поле. Если это нежелательно, фильтруй в `onMatch` по `event.target`.

---

## Дизайн-токены

Собственных стилей и CSS-переменных нет — компонент не рендерит разметку.

---

## Инварианты

- **`KeyDownListener` — class-компонент**, и это часть публичного контракта:
  `ref` указывает на инстанс класса, метод `handleKeyDown` публичный. Не
  переписывать на функциональный компонент.
- **Без `forwardRef` — осознанное исключение** из общего правила библиотеки:
  компонент не рендерит собственный host-элемент, форвардить ref некуда.
- **Имена props `children`, `eventKeyCode`, `onMatch`** и интерфейс
  `IKeyDownListenerProps` (экспортируется из barrel) — публичное API, не менять.
  `IKeyDownListenerProps` переиспользуется в `TriggerClickOnKeyDownEvent`
  (`Pick<IKeyDownListenerProps, "eventKeyCode">`) и в props
  `ComposedKeyDownListener`.
- **Сравнение по `event.keyCode`** — не мигрировать на `event.key` без отдельной
  задачи: у `EVENT_KEYS.SPACE` значения `["Spacebar", "Space"]` не совпадают с
  современным `event.key === " "`, и миграция изменит наблюдаемое поведение у
  потребителей.
- **`render` возвращает `this.props.children || null`** — falsy-`children`
  (`0`, `""`) осознанно дают `null`. Не заменять на `??`.
- Реализация остаётся React 17-совместимой (класс, без хуков и React 18-only
  API): код синхронизируется в `release-0`.

---

## Accessibility

- Собственной ARIA-семантики нет — компонент прозрачен для accessibility-дерева
  и не рендерит фокусируемых элементов.
- Горячая клавиша глобальная: она перехватывается независимо от позиции фокуса и
  не анонсируется screen reader'ом. Если клавиша дублирует видимое действие,
  оставь пользователю и обычный путь (кнопку) — клавиатурный шорткат не должен
  быть единственным способом выполнить действие.
- `Esc` для закрытия оверлеев — ожидаемое поведение; возврат фокуса на триггер
  после закрытия компонент не делает, это ответственность потребителя.

---

## Связанные компоненты

### `ComposedKeyDownListener` (`src/components/KeyDownListener/ComposedKeyDownListener.tsx`)

Композитор: рендерит по одному `KeyDownListener` на элемент `keyDownListeners`.
Используй, когда нужно несколько разных клавиш с разными обработчиками.
Документация — `src/components/KeyDownListener/ComposedKeyDownListener-ai.md`.

### Потребители внутри библиотеки

- `TriggerClickOnKeyDownEvent` (`src/components/Triggers/`) — по нажатию клавиши
  вызывает `click` на элементе из `targetRef`.
- `SelectExtendedField` — закрывает выпадающий список по `Esc`.
- `SliderExtendedDot`, `SliderExtendedTrack` — стрелки для перемещения ползунка,
  слушатели монтируются только когда элемент в фокусе.

---

## Stories

Основные истории: `stories/KeyDownListener/KeyDownListener.stories.tsx`
Файлы примеров: `stories/KeyDownListener/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный выбор `eventKeyCode` и счётчик срабатываний `onMatch` |
| `Default` | `Default.tsx` | Слушатель одной клавиши: панель скрывается по `Esc` |
| `WithMultipleKeys` | `WithMultipleKeys.tsx` | Массив кодов в `eventKeyCode`; нажатая клавиша различается по `event.keyCode` |
| `VisualTests` | — | Состояние после срабатывания слушателя: `play` диспатчит на `window` `keydown` с `keyCode` клавиши `Esc` |

Примеры `ComposedKeyDownListener` живут в собственном наборе stories —
`stories/ComposedKeyDownListener/`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-11 | TRI-112: у `ComposedKeyDownListener` появились собственный `ComposedKeyDownListener-ai.md` и набор stories `stories/ComposedKeyDownListener/`; раздел «Связанные компоненты» сокращён до ссылки, story `Example` (демонстрация композитора) перенесена в новый набор. Ограничение на стабильную длину `keyDownListeners` снято — композитор рендерит слушателей соседями к `children`. Сам `KeyDownListener` не менялся. |
| 2026-08-04 | По ревью PR #502: интерфейс props `IComposedKeyDownListenerProps` стал экспортируемым — публичная поверхность пакета расширена аддитивно. `ComposedKeyDownListener` добавлен отдельной строкой в `docs/ai/ROADMAP.md`, собственный AI.md вынесен в отдельную задачу. |
| 2026-08-04 | Создан документ. AI-рефакторинг (TRI-48): JSDoc на props `IKeyDownListenerProps` и `ComposedKeyDownListener`, ветвление в `handleKeyDown` сведено к одной проверке (снят `eslint-disable`), в `ComposedKeyDownListener` убран `as JSX.Element` и добавлен `displayName`, unit-тесты (16 кейсов на оба компонента), stories по modern pattern. Публичный API не менялся; компонент остаётся class-компонентом, `forwardRef` осознанно отсутствует. |
