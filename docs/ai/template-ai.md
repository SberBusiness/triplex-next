---
component: ComponentName
category: Category
related: []
tokens: []
stories: stories/Category/ComponentName.stories.tsx
version: "1.0"
---

<!--
ИНСТРУКЦИЯ ДЛЯ ЗАПОЛНЕНИЯ (удали этот блок после заполнения)

Этот шаблон заполняется разработчиком вместе с AI-агентом после изучения компонента.
Цель: дать агенту точный контекст для будущих изменений компонента.

Не копируй TypeScript-типы целиком — они читаются из исходного кода.
Описывай намерения и ограничения, которые не видны из кода.

Frontmatter:
- tokens: список CSS-переменных, которые компонент использует
- related: список связанных компонентов (строки, имена)

Таблица Stories: колонка `Example file` обязательна — её читает сборщик
mcp-data.json, чтобы инлайнить код примера. См. раздел Stories ниже.
-->

# ComponentName

## Назначение

<!-- Одно-два предложения: что делает компонент и когда его использовать. -->

Компонент для...

Используй когда: ...
Не используй когда: ...

---

## Варианты и props

<!-- Перечисли смысловые группы props. Не дублируй TypeScript — опиши намерения и ограничения. -->

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `theme` | `EComponentTheme` | Визуальный стиль компонента |
| `size` | `EComponentSize` | Размер: SM (28px) / MD (40px) / LG (56px) |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Блокирует взаимодействие |

### Ограничения по темам

<!-- Если некоторые props недоступны для определённых тем — опиши здесь. -->

- `loading` недоступен для темы `LINK`

---

## Дизайн-токены

<!-- Только те CSS-переменные, которые непосредственно используются в стилях компонента. -->

```
--triplex-next-ComponentName-Variant_Background_Default
--triplex-next-ComponentName-Variant_Color_Default
--triplex-next-ComponentName-Variant_Background_Hover
--triplex-next-ComponentName-Variant_Color_Hover
--triplex-next-ComponentName-Variant_Background_Active
--triplex-next-ComponentName-Variant_Color_Active
--triplex-next-ComponentName-Variant_Shadow_Focus
--triplex-next-ComponentName-Variant_Background_Disabled
--triplex-next-ComponentName-Variant_Color_Disabled
```

---

## Инварианты

<!-- Что НЕЛЬЗЯ изменять без явного обсуждения с командой. -->

- `forwardRef` на компоненте — не убирать
- Prop `X` изменить нельзя — он часть публичного API с версии N
- CSS-класс `Y` используется в тестах — не переименовывать

---

## Accessibility

<!-- Заполни, если компонент имеет нетривиальное поведение с точки зрения доступности. -->

<!--
Примеры того, что стоит описать:
- Управление фокусом: при открытии фокус уходит в контент, при закрытии — возвращается на триггер
- ARIA-роль компонента (combobox, listbox, dialog, alertdialog, tooltip...)
- Обязательные aria-атрибуты (aria-expanded, aria-haspopup, aria-controls, aria-labelledby...)
- Keyboard navigation: какие клавиши обрабатываются и что делают
- aria-live region, если компонент динамически обновляет содержимое
- Какие aria-атрибуты потребитель ОБЯЗАН передать сам (например, aria-label на кнопке-иконке)
  — компонент не хардкодит текст, библиотека мультиязычная
-->

---

## Связанные компоненты

<!-- Компоненты, которые часто используются вместе или являются вариантами. -->

- `RelatedComponent` — описание связи
- `AnotherComponent` — описание связи

---

## Stories

Основные истории: `stories/Category/ComponentName.stories.tsx`
Файлы примеров: `stories/Category/examples/ComponentName/`

<!--
Колонка `Example file` — имя файла внутри `stories/Category/examples/ComponentName/`.
Именно этот файл бандлится в mcp-data.json как код примера, поэтому ссылка обязательна.
Если у story нет отдельного example-файла (редкий случай) — поставь `—`.

Стори `Playground` и `VisualTests` в bundle НЕ попадают (скрипт generateMcpData
фильтрует их по имени): Playground — интерактивная песочница без показа кода,
VisualTests — скриншот-регрессия. Но в таблице их всё равно оставляй —
таблица описывает все stories компонента для человека, а не только то,
что уходит в MCP.
-->

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль всех props |
| `Themes` | `Themes.tsx` | Все визуальные темы |
| `Sizes` | `Sizes.tsx` | Размеры SM / MD / LG |

---

## История изменений

<!-- Краткий лог значимых изменений компонента. Агент дописывает при каждом изменении. -->

| Дата | Изменение |
|---|---|
| YYYY-MM-DD | Создан документ |
