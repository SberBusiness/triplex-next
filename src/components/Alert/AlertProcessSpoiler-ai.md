---
component: AlertProcessSpoiler
category: Alert
related: [AlertProcess, ButtonIcon]
tokens: []
stories: stories/Alerts/AlertProcess.stories.tsx
version: "1.0"
---

# AlertProcessSpoiler

## Назначение

Раскрываемые подробности процессного уведомления. Публично доступен как
`AlertProcess.Spoiler`: хранение состояния открытия остаётся у потребителя,
а компонент выводит содержимое и кнопку с кареткой внутри `AlertProcess`.

Используй когда: часть сообщения `AlertProcess` нужно свернуть, оставив
основной текст уведомления видимым.

Не используй когда: нужен самостоятельный спойлер вне уведомления — для
этого есть `Spoiler`. Для содержимого выше 1000px текущая анимация не подходит:
раскрытый блок ограничен `max-height` и обрежет лишнее.

### Публичный путь использования

Импортируй родителя из публичного пакета и обращайся к статическому полю:

```tsx
import React, { useState } from "react";
import { AlertProcess, EAlertType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const ProcessDetails = () => {
    const [open, setOpen] = useState(false);

    return (
        <AlertProcess type={EAlertType.INFO}>
            <Text size={ETextSize.B3}>Заявление принято.</Text>
            <AlertProcess.Spoiler open={open} onOpen={setOpen}>
                <Text size={ETextSize.B3}>Результат появится после проверки документов.</Text>
            </AlertProcess.Spoiler>
        </AlertProcess>
    );
};
```

Именованные экспорты `AlertProcessSpoiler` и `IAlertProcessSpoilerProps` в
публичном barrel отсутствуют. Для получения типа props через публичный API
используй `React.ComponentProps<typeof AlertProcess.Spoiler>`.

---

## Варианты и props

Обязательных props нет. `IAlertProcessSpoilerProps` определён в
`AlertProcess/components/AlertProcessSpoiler.tsx` и наследует атрибуты `<div>`.

| Prop | По умолчанию | Назначение и ограничения |
|---|---|---|
| `open` | `undefined` (закрыт) | Управляет раскрытием содержимого и поворотом каретки. Собственного состояния открытия нет |
| `onOpen` | — | При нажатии кнопки получает следующее значение `!open`. Потребитель должен обновить `open`; без этого вид не меняется |
| `children` | — | Раскрываемое содержимое. Типографику и цвет текста задаёт потребитель |
| `className` | — | Объединяется с классами блока содержимого через `clsx` |
| `ref` | — | Ссылка на `HTMLDivElement` раскрываемого содержимого |
| Остальные атрибуты `<div>` | — | Передаются блоку содержимого, включая `id`, `aria-*` и обработчики событий. До кнопки раскрытия они не доходят |

Ни `open` без `onOpen`, ни `onOpen` без обновления внешнего состояния не
делают компонент неконтролируемым. `defaultOpen`, собственных размеров,
тем и prop для отключения кнопки у него нет.

---

## Дизайн-токены

Собственных дизайн-токенов нет, поэтому `tokens: []`. Правила спойлера в
`AlertProcess/styles/AlertProcess.module.less` задают высоту, прозрачность,
позиционирование и поворот каретки без обращения к токенам.

Фон уведомления задаётся токенами родителя `AlertProcess` в зависимости от
его `type` — см. [AlertProcess-ai.md](./AlertProcess-ai.md). Фокус кнопки
использует `Button.Icon_Shadow_Focus` через вложенный `ButtonIcon` — см.
[ButtonIcon-ai.md](../Button/ButtonIcon-ai.md). Цвет каретки определяется
`paletteIndex={5}` иконки. Оформление текста приходит из `children`.

Переопределение токенов зависимостей через `ThemeProvider` описано в
[ThemeProvider-ai.md](../ThemeProvider/ThemeProvider-ai.md), раздел
«Как переопределять токены».

---

## Инварианты

- Публичный путь — `AlertProcess.Spoiler`, назначаемый родителю через
  `Object.assign`. Отдельного экспорта атома из `Alert/index.ts` нет.
- `forwardRef<HTMLDivElement, IAlertProcessSpoilerProps>` обязателен;
  `displayName` — `AlertProcessSpoiler`. Ref указывает на содержимое,
  а не на кнопку или её обёртку.
- Рендерятся два соседних `<div>` без общей обёртки: содержимое и блок
  кнопки. `className` и `...rest` получает только содержимое. Перенос кнопки
  внутрь него скроет её при сворачивании.
- Полностью управляемый контракт `open` / `onOpen(!open)` сохраняется.
  Нажатие кнопки само по себе состояние не меняет.
- Через приватный `AlertProcessContext` при монтировании вызывается
  `setHasSpoiler(true)`, при размонтировании — `setHasSpoiler(false)`.
  Родитель добавляет `withSpoiler` и резервирует `min-height: 40px`
  под кнопку независимо от `open`. Спойлер может находиться на любой
  глубине внутри родителя.
- В одном `AlertProcess` используй один спойлер: контекст хранит булев
  признак, а не число экземпляров. Размонтирование одного из нескольких
  сбросит резерв высоты для оставшихся.
- Стили содержимого зависят от предков `.alertProcess` и
  `.alertProcessContentBlock`; кнопка позиционируется абсолютно относительно
  родителя. Самостоятельное использование вне `AlertProcess` не обеспечивает
  эту раскладку.
- Классы `expandableContent`, `expandButton`, `expanded` и `withSpoiler`
  участвуют в контракте DOM и тестах. Раскрытие анимируется за 0.3s через
  `max-height: 0 → 1000px` и `opacity: 0 → 1`; каретка поворачивается на 180°.

---

## Accessibility

- Кнопка — нативный `<button type="button">` внутри `ButtonIcon`:
  доступна по `Tab`, активируется клавишами `Enter` / `Space` и мышью.
  Собственного управления фокусом и клавиатурных обработчиков нет.
- На кнопке выставляется `aria-expanded={Boolean(open)}`. Атрибут
  отражает prop, а не факт последнего нажатия.
- Доступное имя кнопки и `aria-controls` сейчас не задаются. Props спойлера
  уходят на содержимое: переданный `aria-label` попадёт на блок содержимого, а `id` не
  создаст связь с кнопкой. Публичного prop для атрибутов кнопки нет.
- Свёрнутое содержимое остаётся в DOM и скрывается только высотой,
  прозрачностью и `overflow`. `hidden`, `inert` и `aria-hidden` автоматически
  не выставляются: содержимое остаётся доступно скринридеру, а вложенные
  интерактивные элементы могут получать фокус по `Tab` даже при `open=false`.
- Ни спойлер, ни родитель не добавляют `role="alert"` или live-region.
  Это текущее ограничение реализации; отдельный контракт доступности
  потребует изменения компонента.

---

## Связанные компоненты

- [AlertProcess](./AlertProcess-ai.md) — родитель: предоставляет контекст,
  фон, раскладку и публичное поле `Spoiler`.
- [ButtonIcon](../Button/ButtonIcon-ai.md) — внутренняя кнопка раскрытия;
  обеспечивает нативное поведение кнопки и оформление фокуса.

---

## Stories

Основные истории: `stories/Alerts/AlertProcess.stories.tsx`
Файлы примеров: `stories/Alerts/examples/AlertProcess/`

Используются существующие modern examples родителя. Отдельный stories-файл
атому не требуется.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `WithSpoiler` | `WithSpoiler.tsx` | Публичный `AlertProcess.Spoiler`, внешнее состояние через `useState`, начальное закрытое состояние и переключение |
| `VisualTests` | `VisualTests.tsx` | Раскрытое состояние с `open={true}` для скриншот-регрессии |

Baseline закрытого и раскрытого состояний уже хранятся в `__screenshots__/`:
`alerts-alertprocess--with-spoiler--{xs,xl}.png` и
`alerts-alertprocess--visual-tests--{xs,xl}.png`.

Unit-тесты: `AlertProcess/__tests__/AlertProcessSpoiler.test.tsx` проверяет
управляемое состояние, аргументы callback, `aria-expanded`, DOM-соседство,
`className`, атрибуты и ref. `AlertProcess/__tests__/AlertProcess.test.tsx`
проверяет публичное поле `Spoiler` и резерв высоты при монтировании и
размонтировании атома. Код и stories уже прошли рефакторинг в задаче TRI-7;
для TRI-160 повторно проверено соответствие текущему DoD.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-19 | Создан документ по TRI-160. Проверены самостоятельный контракт атома, выполненный рефакторинг, тесты и существующие примеры родителя |
