---
component: EmptyView
category: Feedback
figma-node: "80-48"
figma-file: "https://www.figma.com/design/lpkxmWZ512mG2OJyDvGtHD/-W--LIB-DSN-01-Components-DCB-Next-v.1.3.0"
related: [Button]
tokens:
  - --triplex-next-Typography-Primary_Color
  - --triplex-next-Typography-Secondary_Color
stories: stories/EmptyView/EmptyView.stories.tsx
version: "1.0"
---

# EmptyView

## Назначение

Компонент для отображения пустых состояний: нет данных, сервис недоступен, нет результатов поиска и т.д.

Используй когда: нужно показать заглушку при отсутствии контента.
Не используй когда: есть контент для отображения или нужно показать ошибку загрузки (используй Alert).

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `EEmptyViewSize` | Размер: `SM` / `MD` |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `icon` | `ReactNode` | — | Иконка (96px для `SM`, 128px для `MD`) |
| `title` | `ReactNode` | — | Заголовок |
| `description` | `ReactNode` | — | Текст описания |
| `caption` | `ReactNode` | — | Подпись |
| `buttons` | `ReactNode` | — | Кнопки действий |

### Ограничения по темам

- Если `title` задан — описание отображается вторичным цветом (Secondary).
- Если `title` не задан — описание становится основным текстом (Primary).

---

## Дизайн-токены

```
--triplex-next-Typography-Primary_Color    (title, description без title)
--triplex-next-Typography-Secondary_Color  (description с title, caption)
```

---

## Инварианты

- `forwardRef` на компоненте — не убирать.
- `EEmptyViewSize` — публичный enum, менять значения нельзя.
- CSS-классы `emptyView`, `hasTitle` используются в тестах.

---

## Accessibility

- Компонент не требует обязательных aria-атрибутов.
- Потребитель может передать `role`, `aria-label` и другие атрибуты через spread.

---

## Связанные компоненты

- `Button` — используется в `buttons` для действий.

---

## Stories

Основные истории: `stories/EmptyView/EmptyView.stories.tsx`
Файлы примеров: `stories/EmptyView/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `PlaygroundExample.tsx` | Интерактивный контроль всех props |
| `Default` | `DefaultExample.tsx` | Минимальное состояние с title, description и caption |
| `Sizes` | `SizesExample.tsx` | Размеры `SM` / `MD` |
| `WithoutTitle` | `WithoutTitleExample.tsx` | Вариант без заголовка |
| `WithButtons` | `WithButtonsExample.tsx` | Вариант с кнопками действий |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-04-09 | Создан компонент и документ. |
| 2026-04-27 | Приведён в соответствие с `docs/ai/template-AI.md`: добавлена колонка `Example file`, переименована подсекция «Поведение описания» в «Ограничения по темам». |
