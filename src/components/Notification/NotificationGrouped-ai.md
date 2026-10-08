---
component: NotificationGrouped
category: Feedback
related: [Notification]
tokens:
  - Notification.Background
  - Notification.Shadow
stories: stories/NotificationGrouped/NotificationGrouped.stories.tsx
version: "1.0"
---

# NotificationGrouped

## Назначение

Визуально обозначает группу уведомлений: под содержимым отображаются два декоративных
слоя, создающие эффект стопки карточек. Обычно в группу вкладывают один `Notification`,
который представляет несколько сообщений.

Используй когда: нужно показать свёрнутую группу уведомлений одной карточкой.
Не используй когда: нужно отобразить каждое сообщение отдельно — отрендери список
`Notification`. Количество сообщений, раскрытие группы и закрытие управляются приложением.

---

## Варианты и props

| Prop | Тип | Описание |
|---|---|---|
| `children` | `React.ReactNode` | Содержимое группы. Обычно один `Notification`; тип не ограничивает состав дочерних узлов |

Других props у обёртки нет: HTML-атрибуты, `className` и обработчики задаются вложенному
`Notification` или внешнему контейнеру. `ref` передаётся на корневой `div` группы,
а не на вложенное уведомление.

Компонент выводит `children` без преобразования и всегда добавляет декоративный footer,
в том числе при `children={null}`. Два слоя обозначают стопку независимо от числа сообщений.
Для пользовательского интерфейса передавай содержательную карточку.

Ширина группы на десктопе — 376px, на ширине экрана до 575px — 100% родителя.
Нижний внешний отступ — 32px; декоративные слои выступают на 8px и 16px ниже содержимого.
Отступы, иконка, текст, время и действия самой карточки настраиваются через `Notification`.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см.
[`ThemeProvider-ai.md`](../ThemeProvider/ThemeProvider-ai.md) → «Как переопределять токены».
Значения по умолчанию — `src/components/DesignTokens/components/Notification.ts`.

| Токен | Назначение |
|---|---|
| `Notification.Background` | Фон декоративных слоёв |
| `Notification.Shadow` | Тень декоративных слоёв |

Токены общие с `Notification`: их переопределение меняет карточку и слои стопки.
Цвет текста и времени относятся к вложенному уведомлению и описаны в
[`Notification-ai.md`](./Notification-ai.md).

---

## Инварианты

- `INotificationGroupedProps.children` обязателен и сохраняет тип `React.ReactNode`.
- `forwardRef<HTMLDivElement, INotificationGroupedProps>` и `displayName="NotificationGrouped"`
  сохраняются; корневой элемент и ref-target — `div` группы.
- Публичные экспорты `NotificationGrouped` и `INotificationGroupedProps` из
  `src/components/Notification/index.ts` сохраняются.
- Декоративный `NotificationGroupedFooter` располагается после `children` и содержит
  два слоя. Он не экспортируется через публичный barrel.
- Классы `notificationGroupedWrapper`, `notificationGroupedFooterItem`, `first`, `second`
  и пути токенов сохраняются. Разметка и порядок слоёв влияют на visual baselines.
- Группа не фильтрует дочерние узлы и не управляет состоянием сообщений.

---

## Accessibility

Обёртка — обычный `div` без роли, `tabIndex` и клавиатурных обработчиков. Курсор при
наведении имеет вид указателя, но компонент сам не добавляет интерактивность.
Декоративные слои не содержат текста или элементов управления.

Роль `alertdialog` задаёт вложенный `Notification`, а не группа. Подписи ARIA и действия
передавай самому уведомлению и его дочерним элементам; например, `aria-label` для
`Notification.Close` задаёт потребитель на языке приложения. Клавиатурный фокус
принадлежит вложенным кнопкам и ссылкам.

---

## Связанные компоненты

- `Notification` — карточка внутри группы; определяет содержимое, действия и accessibility.
- `NotificationGroupedFooter` — приватный декоративный footer из двух пустых слоёв;
  отдельного публичного API и AI-документа нет.

---

## Stories

Основные истории: `stories/NotificationGrouped/NotificationGrouped.stories.tsx`
Файлы примеров: `stories/NotificationGrouped/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Default` | `Default.tsx` | Минимальная группа с одним уведомлением |
| `WithFooter` | `WithFooter.tsx` | Карточка с действием, кнопкой закрытия и временем |
| `DarkTheme` | `DarkTheme.tsx` | Тёмная тема через scoped ThemeProvider |
| `VisualTests` | `VisualTests.tsx` | Клавиатурный фокус на действии и закрытие при наведении на карточку |

Playground отсутствует: у обёртки только `children`, настраиваемых вариантов нет.
Stories снимаются на xs/xl; реальное наведение для `VisualTests` выполняется test-runner
через `hoverSelector`, а фокус устанавливается клавиатурой в `play`.
Существующий пример `BusinessStack` в `stories/Notification/` сохраняется.

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-08 | Создан документ; уточнены JSDoc, выделены unit-тесты и добавлены отдельные modern stories NotificationGrouped |
