---
component: ConfirmClose
category: Confirm
related: [Confirm, Button, TriggerClickOnKeyDownEvent]
tokens: []
stories: stories/Confirm/Confirm.stories.tsx
version: "1.0"
---

# ConfirmClose

## Назначение

Кнопка-крестик `Confirm.Close`: вызывает переданный обработчик клика и при
`clickByEsc` связывает глобальный Escape с программным кликом по этой же кнопке.
Самостоятельно предупреждение или его родительский оверлей не закрывает.

Используй когда: нужен стандартный крестик в `Confirm`, а закрытие выполняет
обработчик потребителя.
Не используй когда: требуется готовое управление открытостью, фокусом или стеком
оверлеев — эти обязанности остаются у родительской композиции.

Публичный доступ из корня пакета:

```tsx
import React from "react";
import { Confirm } from "@sberbusiness/triplex-next";

type TConfirmCloseProps = React.ComponentProps<typeof Confirm.Close>;

const Close = Confirm.Close;
```

`ConfirmClose` и `IConfirmCloseProps` не реэкспортируются из корневого barrel:
используй `Confirm.Close` и при необходимости выведенный тип props.

---

## Варианты и props

### Обязательный prop

| Prop | Описание |
|---|---|
| `clickByEsc` | При `true` подключает глобальное нажатие Escape к `click()` кнопки; при `false` слушателя нет. Передавай открытость соответствующего предупреждения |

### Остальные props

Наследует props внутреннего `ConfirmCloseButton` → `Button`, кроме `theme`,
`size` и `icon`: компонент задаёт `SECONDARY`, `MD` и `CrossStrokeSrvIcon20`.

| Prop | По умолчанию | Описание |
|---|---|---|
| `onClick` | — | Получает событие клика по кнопке, включая программный клик от Escape. Смена открытости — ответственность потребителя |
| `title`, `aria-label`, `aria-labelledby` | — | Доступное имя иконочной кнопки задаёт потребитель; локализованного дефолта нет |
| `disabled` | `false` | Нативно отключает кнопку: блокирует обычный клик и `click()` от Escape |
| `loading` | `false` | Загрузка `Button`: скрывает обычное содержимое, показывает лоадер и по умолчанию задаёт `tabIndex=-1`; не выставляет нативный `disabled` |
| `block`, `children` | `false` / — | Наследуются от `Button`; типовой крестик используется без текста и блочного растягивания |
| `type` | `button` | Наследуется от `ButtonBase`; внешний `type` может его переопределить |
| `className`, HTML-/`data-*`-/`aria-*`-атрибуты | — | Передаются на `<button>`; `className` объединяется с базовым `confirmCloseButton` |
| `ref` | — | Указывает на `HTMLButtonElement` в обоих режимах `clickByEsc` |

### Escape и жизненный цикл

- Используется `TriggerClickOnKeyDownEvent` → `KeyDownListener`: событие
  `keydown` слушается на `window`, сравнивается `event.keyCode` с
  `EVENT_KEY_CODES.ESCAPE`.
- Перед кликом проверяется наличие кнопки и `offsetParent !== null`.
  Это точный предикат реализации, а не полная проверка всех способов скрытия.
- Обработчик `onClick` получает mouse/click-событие кнопки, не исходный
  `KeyboardEvent`. Компонент не вызывает `preventDefault()` и не останавливает
  Escape у других слушателей.
- При смене `clickByEsc` подписка подключается или снимается; после unmount
  слушателя нет. Смена условной обёртки может пересоздать DOM-кнопку и обновить ref.
- `loading` блокирует pointer-взаимодействие стилями, но программный клик от
  Escape остаётся рабочим при `!disabled`. Если требуется заблокировать действие,
  передавай `disabled` или выключай `clickByEsc`.

---

## Дизайн-токены

Собственных цветовых токенов нет: `tokens: []`. Класс `confirmCloseButton` в
`styles/Confirm.module.less` задаёт только абсолютное позиционирование:
отступы сверху и справа 24px, на узких экранах 16px.

Цвета и фокус наследуются от `Button` темы `SECONDARY`; фон и размеры карточки
задаёт `Confirm` / `Island`. См. [Button-ai.md](../Button/Button-ai.md) и
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md#как-переопределять-токены).

---

## Инварианты

- Сохранять публичное статическое свойство `Confirm.Close`, сигнатуру
  `IConfirmCloseProps`, обязательность `clickByEsc` и `displayName="ConfirmClose"`.
- Сохранять `forwardRef<HTMLButtonElement>` на саму кнопку, без DOM-обёртки.
  Внутренняя ссылка для Escape и внешний callback-/object-ref должны указывать
  на одну кнопку и корректно очищаться при unmount.
- Позиционирование крестика рассчитано на `Island.Body` внутри `Confirm`.
  Не менять корневой элемент и класс `confirmCloseButton`.
- Сохранять глобальную семантику Escape, проверку по `keyCode`, условие
  `offsetParent !== null` и снятие подписки при выключении флага / unmount.
- Escape вызывает тот же нативный `click()`; не превращать его в отдельный
  callback с другими аргументами.
- Не добавлять локализованное имя по умолчанию. Доступное имя передаёт потребитель.
- Сохранять различие `loading` и нативного `disabled`.

---

## Accessibility

- Корень — нативный `<button>`, стандартная активация Enter / Space принадлежит
  браузеру. По умолчанию `type="button"`; иной `type` задаёт потребитель.
- Для крестика обязательно обеспечить доступное имя через `title`, `aria-label`
  или `aria-labelledby`. Одна иконка не заменяет текстовую альтернативу.
- Горячая клавиша глобальная: фокус может находиться вне `Confirm`.
  Несколько смонтированных слушателей могут реагировать на один Escape, поэтому
  `clickByEsc` должен соответствовать активности конкретного предупреждения.
- Компонент не создаёт диалог, не перемещает и не возвращает фокус.
  Семантику диалога задаёт `Confirm`, фокус-ловушку — контейнер оверлея.
- При загрузке `tabIndex=-1` является дефолтом `Button` и может переопределяться
  внешним `tabIndex`; `loading` не заменяет `disabled` для блокировки Escape.

---

## Связанные компоненты

- [Confirm](./Confirm-ai.md) — родитель и публичный доступ `.Close`; предоставляет
  карточку и позиционирующий `Island.Body`.
- [Button](../Button/Button-ai.md) — нативная кнопка, тема `SECONDARY`, размер `MD`,
  loading/disabled и HTML-атрибуты.
- [TriggerClickOnKeyDownEvent](../Triggers/TriggerClickOnKeyDownEvent-ai.md) —
  условная обёртка для глобального Escape и проверки `offsetParent`.
- `ConfirmCloseButton` — внутренний визуальный wrapper над `Button`, закрепляет
  тему, размер, иконку и позиционирование. Отдельного публичного barrel-export нет.

---

## Stories

Основные истории: `stories/Confirm/Confirm.stories.tsx`
Файлы примеров: `stories/Confirm/examples/`

Истории родителя рендерят `Confirm.Close`; отдельный stories-файл атому не нужен.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Наличие крестика и переключатель `clickByEsc` |
| `Default` | `Default.tsx` | Крестик с доступным именем в стандартном предупреждении |
| `Parent components` | `ParentComponents.tsx` | Положение крестика при разных размерах родителя |
| `Example` | `Example.tsx` | `clickByEsc` привязан к открытости `TopOverlay`, `onClick` закрывает предупреждение |
| `VisualTests` | `VisualTests.tsx` | Видимый крестик в существующих статичных случаях родителя; xs/xl baseline уже есть |

`Playground` и `Example` исключены из снимков. Глобальный Escape, видимость,
loading/disabled, refs и lifecycle проверяются в
`src/components/Confirm/__tests__/ConfirmClose.test.tsx`.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-03 | Создан документ; зафиксированы публичный путь, глобальный Escape, DOM-ref и различие loading/disabled. Передача внешнего ref использует общий внутренний helper. |
