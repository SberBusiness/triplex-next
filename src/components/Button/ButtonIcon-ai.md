---
component: ButtonIcon
category: Buttons
related: [Button]
tokens:
  - --triplex-next-Button-Icon_Shadow_Focus
stories: stories/Buttons/ButtonIcon.stories.tsx
version: "1.0"
---

# ButtonIcon

## Назначение

Кнопка только с иконкой без текстового контента. Используется как компактный trigger для локальных действий (например, открыть меню, удалить, закрыть).

Используй когда: действие можно однозначно распознать по иконке и есть корректный `aria-label`.
Не используй когда: нужен текстовый CTA или несколько визуальных тем с размерами как у `Button` — используй `Button`.

---

## Варианты и props

### Обязательные props

Обязательных custom-props нет.

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `shape` | `EButtonIconShape` | `SQUIRCLE` | Форма кнопки: `SQUIRCLE` (радиус 4px) или `CIRCLE` (радиус 50%) |
| `active` | `boolean` | `false` | Визуально активное состояние |
| `className` | `string` | — | Дополнительный CSS-класс |
| `...rest` | `React.ButtonHTMLAttributes<HTMLButtonElement> & DataAttributes` | — | Нативные атрибуты `<button>`, включая `disabled`, `aria-*`, `data-*` |

### Ограничения использования

- Размер `ButtonIcon` задаётся размером переданной иконки; у компонента нет собственного prop `size`.
- Корневой DOM-элемент всегда `<button>`, `type` по умолчанию принудительно установлен в `button`.
- При расширении `EButtonIconShape` необходимо добавить класс в маппинг `Record<EButtonIconShape, string>` и в `ButtonIcon.module.less`.

---

## Дизайн-токены

```
--triplex-next-Button-Icon_Shadow_Focus
```

---

## Инварианты

- `forwardRef` обязателен: ref должен оставаться на `HTMLButtonElement`.
- `type="button"` должен оставаться дефолтом, чтобы не триггерить submit в формах по умолчанию.
- `shape` по умолчанию должен оставаться `EButtonIconShape.SQUIRCLE`.
- Публичный экспорт `ButtonIcon` из `src/components/Button/index.ts` должен сохраняться.

---

## Accessibility

- Компонент рендерит нативный `<button>`, поэтому базовая keyboard-навигация доступна из коробки.
- Компонент **не хардкодит** `aria-label` (библиотека мультиязычная). Для иконки без текста потребитель **обязан** передать `aria-label` через `...rest`.
- Фокусное состояние реализовано через `:focus-visible` и токен `--triplex-next-Button-Icon_Shadow_Focus`.

---

## Связанные компоненты

- `Button` (`src/components/Button/Button.tsx`) — текстовая/универсальная кнопка, используемая вместо `ButtonIcon` когда нужен label.
- `ButtonDropdown` (`src/components/Button/ButtonDropdown.tsx`) — использует иконочный паттерн для dots-варианта trigger.

---

## Stories

Основные истории: `stories/Buttons/ButtonIcon.stories.tsx`
Файлы примеров: `stories/Buttons/examples/ButtonIcon/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль `shape`, `active`, `disabled` |
| `Default` | `DefaultExample.tsx` | Базовый сценарий использования |
| `Sizes` | `SizesExample.tsx` | Разные размеры через размер иконки (16/20/24/32) |
| `Disabled` | `DisabledExample.tsx` | Неактивное состояние |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-15 | Создан документ AI-ready для `ButtonIcon`. |
| 2026-04-27 | Приведён в соответствие с `docs/ai/template-ai.md`: убрана секция «Файловая структура», содержимое «Ключевых особенностей реализации» перенесено в `Ограничения использования`, добавлена колонка `Example file`. |
