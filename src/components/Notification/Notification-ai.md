---
component: Notification
category: Feedback
related: [NotificationGrouped, Button, AlertContext, UnorderedList]
tokens:
  - Notification.Background
  - Notification.Color
  - Notification.Shadow
  - Notification.TimeColor
stories: stories/Notification/Notification.stories.tsx
version: "1.0"
---

# Notification

## Назначение

Составной компонент уведомления для отображения сообщений об успехе, ошибке, предупреждении,
а также бизнес-уведомлений (mail-нотификации, формы обратной связи). Состоит из иконки,
тела (заголовок, текст, список, футер), кнопки закрытия и времени.

Используй когда: нужно показать уведомление в списке нотификаций, в side-overlay или как алерт.
Не используй когда: нужно инлайновое сообщение об ошибке формы (используй `Alert`) или
пустое состояние (используй `EmptyView`).

---

## Структура (compound API)

Компонент собирается из статических подкомпонентов. Порядок дочерних элементов определяет вёрстку.

```
Notification
├── Notification.Icon                 — кастомная иконка (слева)
├── Notification.Body                 — тело уведомления
│   ├── Notification.Body.Header      — заголовок (<h3>)
│   ├── Notification.Body.Content     — основной текст (Typography Text)
│   ├── Notification.Body.List        — маркированный список (UnorderedList)
│   └── Notification.Body.Footer      — футер (кнопки, Alert и т.д.)
├── Notification.Close                — кнопка закрытия (ButtonIcon)
└── Notification.Time                 — время уведомления
```

`NotificationGrouped` — обёртка для отображения уведомления как «стопки» (визуальный эффект
нескольких карточек снизу). Принимает одно `Notification` в `children`.

---

## Варианты и props

### Notification

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `ReactElement \| ReactElement[]` | — | Только `Icon`, `Body`, `Close`, `Time` |
| `withExtraBottomPadding` | `boolean` | `false` | Увеличенный отступ снизу (тип mail) |
| `isShowCloseOnHover` | `boolean` | `false` | Кнопка закрытия появляется по ховеру (для side-overlay/алерта) |
| `onClick` | `() => void` | — | Обработчик клика по уведомлению |

Наследует `React.ButtonHTMLAttributes<HTMLElement>` (остальные атрибуты прокидываются на корневой `div`).

### Notification.Close

| Prop | Тип | Описание |
|---|---|---|
| `onClick` | `() => void` | Обработчик закрытия (обязателен) |

Наследует `IButtonIconProps` без `children` (`children?: never`).

### Notification.Time

| Prop | Тип | Описание |
|---|---|---|
| `time` | `ReactNode` | Значение времени уведомления |

### Notification.Body.List

| Prop | Тип | Описание |
|---|---|---|
| `values` | `string[]` | Элементы списка |

Наследует `IUnorderedListProps`.

### NotificationGrouped

| Prop | Тип | Описание |
|---|---|---|
| `children` | `ReactNode` | Вложенное уведомление |

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` →
«Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/Notification.ts`.

```text
Notification.Background   (фон уведомления)
Notification.Color        (цвет текста)
Notification.Shadow       (тень карточки)
Notification.TimeColor    (цвет времени)
```

---

## Инварианты

- `forwardRef` на `Notification`, `NotificationGrouped`, `NotificationBody` — не убирать. Ref ведёт на корневой `div`.
- Компонент собран паттерном `Object.assign(forwardRef(...), { ...статики })` — статики (`Icon`, `Body`, `Close`, `Time`; у `Body` — `Header`, `Content`, `List`, `Footer`) часть публичного API, переименовывать нельзя.
- Корневой элемент имеет `role="alertdialog"` — не менять.
- `children` корневого `Notification` ограничены типом `ReactElement` — допускаются только `Icon`/`Body`/`Close`/`Time`.
- CSS-классы `notification`, `notificationBody`, `notificationIcon`, `notificationClose`, `notificationGroupedWrapper`, `extraBottomPadding`, `showCloseOnHover` используются в тестах — не переименовывать.

---

## Accessibility

- Корневой элемент — `role="alertdialog"`.
- `Notification.Close` рендерит `ButtonIcon` с иконкой-крестиком; потребителю стоит передать `aria-label` для кнопки закрытия (библиотека мультиязычная, текст не хардкодится).
- Прочие aria-атрибуты прокидываются на корневой `div` через spread.

---

## Связанные компоненты

- `NotificationGrouped` — обёртка для отображения уведомления стопкой.
- `Button` — типичное содержимое `Notification.Body.Footer`.
- `AlertContext` — может вкладываться в `Notification.Body.Footer`.
- `UnorderedList` — основа `Notification.Body.List`.

---

## Stories

Основные истории: `stories/Notification/Notification.stories.tsx`
Файлы примеров: `stories/Notification/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль наполнения уведомления |
| `Default` | `Default.tsx` | Минимальное уведомление: иконка, заголовок, текст, закрытие |
| `Status` | `Status.tsx` | Success / Warning / Error со списком |
| `Business` | `Business.tsx` | Бизнес-уведомления: текст, кнопка, вложенный Alert |
| `Business Stack` | `BusinessStack.tsx` | Уведомления в `NotificationGrouped` (стопка) |
| `Feedback Without Stars` | `FeedbackWithoutStars.tsx` | Форма обратной связи без оценки звёздами |
| `Feedback With Stars` | `FeedbackWithStars.tsx` | Форма обратной связи с оценкой звёздами |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-06-16 | Создан AI-документ. `Notification`, `NotificationGrouped`, `NotificationBody` переведены на `forwardRef` (паттерн `Object.assign`); удалены типы `INotificationSFC`/`INotificationBodySFC`; тип `Notification.Time.time` расширен с `React.ReactText` до `React.ReactNode`. Stories мигрированы на modern pattern. |
