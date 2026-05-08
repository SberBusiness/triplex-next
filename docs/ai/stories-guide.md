# Руководство по написанию Stories

## Зачем нужны Stories

Stories выполняют несколько функций (в порядке приоритета):

1. **Документация** — описание props и предназначения компонента.
2. **Копирование кода** — готовые примеры использования, которые можно скопировать.
3. **Отображение ключевых props** — size, theme, variants, состояния.
4. **Краевые случаи** — для сложных компонентов (опционально).
5. **Examples** — композиции компонентов и примеры из дизайна, приближенные к production.
6. **Visual tests** — дополнительные примеры для скриншот-тестов, если основных сторей недостаточно.

---

## Статус миграции

В репозитории сейчас сосуществуют два паттерна stories:

- **Modern pattern** — grouped folders, `examples/`, `?raw`, копируемые examples, публичные импорты из `@sberbusiness/triplex-next`.
- **Legacy pattern** — flat story files, inline render-функции, локальные импорты из `src/...`.

Правило использования:

- Для **новых компонентов** и **существенно переписанных story-файлов** используй modern pattern.
- Если задача маленькая и story-файл уже legacy, **не рефактори весь файл только ради миграции**. Сохраняй локальный паттерн и обновляй только нужный участок.
- Не переименовывай существующие story ids/export names без явной необходимости: на них могут опираться e2e и visual tests.

---

## Что обновлять при добавлении нового prop

### Всегда

- **Playground** — добавить новый prop в `args` (дефолтное значение) и в `argTypes` (описание и контрол).
- **`ArgTypes`** в docs page автоматически покажет новый prop, если он типизирован в интерфейсе.

### Если prop имеет несколько визуальных вариантов (enum, размер, тема)

- Добавить новую named story: `Sizes`, `Themes`, `Statuses` — в зависимости от типа prop.
- Создать файл `examples/{PropName}.tsx` и реэкспортировать через `examples/index.ts`.

### Если prop — boolean-состояние с видимым эффектом

- Добавить отдельную story: `Disabled`, `Loading`, `ReadOnly` — по паттерну именования (название prop как есть).
- Если prop меняет только незначительную деталь и хорошо виден в существующих стори — достаточно обновить Playground.

### Если prop — нестандартный вариант наполнения

- Добавить story `With{Variant}`: `WithIcon`, `WithClearButton` и т.д.

### Если prop — callback или поведенческий параметр (не меняет внешний вид)

- Отдельную named story не создавай.
- Обнови Playground или соответствующий `examples/`-файл: добавь callback или параметр, чтобы в копируемом коде было видно, как его использовать.

### Если props добавляются к субкомпоненту составного компонента

Составной компонент — это когда публичный API строится через статические свойства: `LightBox.RightSidebar`, `Select.Option`, `Page.Header` и т.д.

- У субкомпонентов, как правило, нет собственного Playground, поэтому правило "обновить Playground" к ним неприменимо.
- Вместо этого обнови `examples/`-файл, где субкомпонент используется, — добавь новый prop в JSX примера. Это гарантирует, что копируемый код в документации отражает актуальный API.

### Visual regression

- Если новый prop меняет внешний вид — проверить, покрыт ли он существующими скриншотами.
- Если нет — добавить вариант в `VisualTests` story (или создать её).

---

## Структура файлов

Ниже описан **modern pattern** для новых и мигрируемых story-файлов:

```
stories/
  ComponentGroup/
    ComponentName/
      ComponentName.stories.tsx    # основной файл стори
      examples/
        index.ts                   # реэкспорт всех примеров
        Default.tsx
        Sizes.tsx
        Statuses.tsx
        Production.tsx
        ...
```

Если файл сторей компонента находится в папке `stories`, необходимо создать одноименную папку и перенести файл сторей туда.

Все стори выносятся в подпапку `examples/` и импортируются в основной файл. Если в основной папке находятся несколько файлов с расширением `.stories.tsx`, внутри подпапки `examples` необходимо создать подпапки по названию компонентов из файлов с расширением `.stories.tsx`. Также необходимо в каждой такой подпапке создать отдельный файл `index.ts`.

### Именование файлов примеров

- Имя файла = имя story: `Default` → `Default.tsx`, `Sizes` → `Sizes.tsx`, `Playground` → `Playground.tsx`.
- **Без постфикса `Example`** — не пиши `DefaultExample.tsx`, `SizesExample.tsx`. Если встретишь старые файлы с этим постфиксом, сохраняй локальный паттерн до миграции, но новые файлы создавай без него.
- Имя экспорта-функции внутри файла совпадает с именем файла: `export const Default = () => ...`.
- Source-константа: `{StoryName}Source` — `DefaultSource`, `SizesSource`, `PlaygroundSource`.
- В story-файле импорт компонента-примера делается через alias, чтобы избежать коллизии со story-экспортом: `Default as DefaultRender`, `Playground as PlaygroundRender`. Source без alias.

---

## Обязательные стори

| Стори                         | Описание                                                                                                     | Controls | Код |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ | -------- | --- |
| **Playground**                | Интерактивная песочница с Controls                                                                           | Да       | Нет |
| **Default**                   | Минимальное состояние компонента с параметрами по умолчанию                                                  | Нет      | Да  |
| **Sizes / Themes / Statuses** | Стори на ключевые props — отрендеренные варианты с подписями                                                 | Нет      | Да  |
| **Edge cases**                | Опционально, на усмотрение разработчика. Каждый кейс — отдельная стори                                       | Нет      | Да  |
| **Examples**                  | Композиции компонентов, production-like примеры                                                              | Нет      | Да  |
| **Visual tests**              | Дополнительные примеры для скриншот-тестов (если недостаточно основных); исходный код в docs не показывается | Нет      | Нет |

> **Правило:** только Playground имеет Controls. Документационные стори (`Default`, `Sizes / Themes / Statuses`, `Edge cases`, `Examples`) не имеют Controls и показывают пример кода. `Visual tests` не имеют Controls и не показывают код.

> **Исключение для компонентов без props:** если у компонента нет настраиваемых props (например, контейнер-обёртка с одним только `children` и стандартными HTML-атрибутами), Playground не создаётся — интерактивность нечего показывать. Также убирается блок `Heading>Props` + `ArgTypes` — таблица будет пустой. В этом случае из docs page убираются `Heading>Props`, `ArgTypes`, `Heading>Playground`, `Primary` и `Controls of={Playground}` (см. раздел [Структура docs page](#структура-docs-page)).

> **MCP bundle:** `Playground` и `VisualTests` не попадают в `mcp-data.json` — у них нет кода для агента (Playground интерактивен, VisualTests — скриншот-регрессия). Фильтр реализован в `scripts/generateMcpData.ts` (`EXCLUDED_STORIES`). В остальном для MCP нужен файл примера в `examples/{Component}/` и ссылка на него из колонки `Example file` в `{Component}-ai.md`.

---

## Порядок внутри файла stories

```
1. imports
2. meta
3. constants / helpers
4. type Story = StoryObj<typeof meta>
5. Playground
6. Default
7. остальные stories (Sizes, Themes, Statuses, edge cases, examples...)
```

---

## Структура docs page

```tsx
parameters: {
    docs: {
        page: () => (
            <>
                <Title />
                <Description />
                <Heading>Props</Heading>
                <ArgTypes of={Component} />
                <Heading>Playground</Heading>
                <Primary />
                <Controls of={Playground} />
                <Stories />
            </>
        ),
    },
},
```

Если у компонента нет настраиваемых props (см. [Когда не создавать Playground](#когда-не-создавать-playground)), блок Playground убирается, а вместе с ним и блок `Props` — `ArgTypes` без props покажет пустую таблицу:

```tsx
parameters: {
    docs: {
        page: () => (
            <>
                <Title />
                <Description />
                <Stories />
            </>
        ),
    },
},
```

---

## Playground

### Назначение

Playground показывает только те props, которые реально помогают исследовать компонент.

### Когда не создавать Playground

Если у компонента нет настраиваемых props (только `children` и стандартные HTML-атрибуты), Playground не создаётся — нечего класть в Controls. Типичный случай: контейнер-обёртка вроде `ListItem`, `ListItemControls`, `ChipGroup`.

В этом случае:

- В файле stories нет экспорта `Playground` и связанного с ним example-файла.
- В docs page убираются:
  - `Heading>Props` и `ArgTypes of={Component}` — без props таблица будет пустой.
  - `Heading>Playground`, `Primary`, `Controls of={Playground}`.
  - См. вариант без Playground в разделе [Структура docs page](#структура-docs-page).
- Из импортов `@storybook/addon-docs/blocks` удаляются `ArgTypes`, `Heading`, `Primary`, `Controls` — остаются только `Title`, `Description`, `Stories`.

Если props всего один-два, но они имеют визуальный эффект — Playground всё равно создаётся, и блок `Props` остаётся.

### Разделение Controls

- Свойства, являющиеся props компонента, располагаются в блоке **Props** (по умолчанию).
- Свойства, **не** являющиеся props компонента (вспомогательные настройки), выносятся в отдельный блок **Settings**.

```tsx
argTypes: {
    // Props компонента — без category, попадают в блок Props
    size: {
        control: { type: "select" },
        options: Object.values(EComponentSize),
        description: "Размер поля",
        table: {
            type: { summary: "EComponentSize" },
            defaultValue: { summary: "EComponentSize.LG" },
        },
    },
    // Вспомогательные настройки — выносим в Settings
    withClearButton: {
        control: "boolean",
        description: "С кнопкой очистки.",
        table: {
            category: "Settings",
        },
    },
},
```

### Параметры Playground

В modern pattern Playground не показывает пример кода и исключён из скриншот-тестов:

```tsx
parameters: {
    testRunner: { skip: true },
    docs: {
        canvas: { sourceState: "none" },
    },
},
```

В modern pattern Playground не отображается в docs как отдельная стори:

```tsx
tags: ["!autodocs"],
```

---

## Именование сторей

| Ситуация                               | Название                                  | Пример                  |
| -------------------------------------- | ----------------------------------------- | ----------------------- |
| Базовая стори                          | `Default`                                 | `Default`               |
| Варианты props без дефолтного значения | Название props во **множественном** числе | `size` → `Sizes`        |
| Заполнение необязательного props       | Название props **как есть**               | `disabled` → `Disabled` |
| Нестандартные варианты наполнения      | `With` + вариант                          | `WithTextAndIcon`       |
| Композиции / production примеры        | `Example`                                 | `Example`               |
| Скриншот-тесты                         | `VisualTests`                             | `VisualTests`           |

---

## Как писать примеры

### Базовые примеры (Default, Sizes, Themes)

- Минимальный код — только то, что нужно для демонстрации конкретного props.
- Каждый вариант подписывается **рядом с компонентом**, а не внутри него.
- Никаких лишних обёрток и логики.

### Examples (production-like)

- Приближены к реальному использованию.
- Показывают композицию компонентов.
- Стори показывает использование компонента, а **не** становится мини-приложением.

### Дублирование кода

Для каждого примера пишется **полноценный самодостаточный код**. Не нужно выносить общие куски между примерами — дублирование в примерах допустимо и предпочтительно, чтобы каждый пример можно было скопировать целиком.

### Импорты в примерах

Для **modern examples** компоненты и утилиты библиотеки импортируются **из корня пакета**, а не по относительным путям к исходникам:

```tsx
// Правильно
import { LightBox, Page, Button, EButtonTheme } from "@sberbusiness/triplex-next";

// Неправильно
import { LightBox } from "../../../src/components/LightBox/LightBox";
import { Button } from "../../../src/components/Button/Button";
```

Это обеспечивает:

- **Копируемость** — пользователь может скопировать пример и использовать его в своём проекте без изменения импортов.
- **Читаемость** — один импорт вместо множества относительных путей.
- **Актуальность** — при перемещении файлов внутри библиотеки примеры не ломаются.

> Иконки импортируются из `@sberbusiness/icons-next`.

Для legacy story-файлов не нужно устраивать отдельную миграцию импортов без задачи.

### Колбэки в примерах

| Файл | Что использовать | Почему |
| --- | --- | --- |
| `Playground.tsx`, `VisualTests`-рендеры | `action("eventName")` из `storybook/actions` | Код не показывается через `?raw`, поэтому storybook-импорт допустим. Помогает увидеть события во вкладке Actions при ручной проверке. |
| Копируемые примеры (`Default`, `Sizes`, `Statuses`, `With*`, production-like `Example`) | Пустые функции `() => {}` | Код показывается через `?raw` и должен копироваться без правок. `alert()`, `console.log()` и `import { action } from "storybook/actions"` ломают копируемость и создают side effects. |

```tsx
// Playground.tsx
import { action } from "storybook/actions";

<Component onChange={action("onChange")} />;
```

```tsx
// Default.tsx
<Component onChange={() => {}} />;
```

---

## Скриншот-тесты

Каждая стори автоматически снимается test-runner'ом на двух viewport'ах — **xs** (575px) и **xl** (1200px). Скриншоты сохраняются в `__screenshots__/` с именем `{storyId}--{viewport}.png`.

### Какие стори участвуют в скриншот-тестах

По умолчанию **все** стори участвуют в скриншот-тестах. Исключения задаются параметром `testRunner: { skip: true }`.

**Всегда исключаются:**

- **Playground** — интерактивная песочница, состояние зависит от пользователя, скриншоты не имеют смысла.

**Исключаются при необходимости:**

- Стори, дублирующие отображение другой стори. Если две стори рендерят визуально одно и то же — для теста оставьте одну, вторую исключите через `testRunner: { skip: true }`. Не нужно генерировать идентичные скриншоты.

### Когда создавать Visual tests

Стори **Visual tests** создаётся, когда основных сторей недостаточно для покрытия всех визуальных состояний компонента. Типичные случаи:

- Нужно проверить состояние, которого нет в документационных сторях (например, заполненное поле, фокус, комбинации props).
- Компонент требует **взаимодействия перед скриншотом** — нужно открыть dropdown, навести курсор, кликнуть по элементу.
- Нужно собрать несколько вариантов в одну стори, чтобы сократить количество скриншотов.

### Параметры Visual tests

Visual tests скрыта из документации и не показывает исходный код — она предназначена только для тестов:

```tsx
export const VisualTests: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => {
        // ...
    },
};
```

### Взаимодействие через play

Если компонент должен изменить состояние перед скриншотом (открыть dropdown, показать tooltip и т.д.), реализуйте взаимодействие через `play`-функцию:

```tsx
export const VisualTests: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => {
        const [value, setValue] = useState("");

        return (
            <div style={{ display: "flex", gap: 50, flexWrap: "wrap" }}>
                <DateField value={value} onChange={setValue} label="Label" placeholderMask="дд.мм.гггг" />
                {/* ...другие варианты */}
            </div>
        );
    },
    play: async ({ canvas, userEvent }) => {
        const inputs = await canvas.findAllByRole("textbox");

        await userEvent.click(inputs[0]);
    },
};
```

Test-runner после выполнения `play` ждёт стабилизации DOM (500ms без мутаций) и только потом делает скриншот. Это гарантирует, что анимации завершились и dropdown полностью раскрылся.

### Стабильность скриншотов

Чтобы скриншоты не были «плавающими»:

- **Фиксируйте данные.** Не используйте `new Date()`, `Math.random()` и т.д. Значения должны быть захардкожены.
- **Избегайте анимаций** или дождитесь их завершения через `play`. Test-runner использует MutationObserver с таймаутом 500ms.
- **Каретка скрывается автоматически** — test-runner инжектит `caret-color: transparent`.
- **Задавайте фиксированные размеры контейнера**, чтобы layout не «плыл» между viewport'ами, где это не нужно.

### Компоновка Visual tests

Рендерите несколько вариантов компонента в одной Visual tests стори, а не создавайте отдельную стори на каждый кейс. Это сокращает количество скриншотов и время прогона тестов:

```tsx
render: () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 50, flexWrap: "wrap" }}>
        <Component size={EComponentSize.SM} value="filled" />
        <Component size={EComponentSize.MD} value="filled" />
        <Component size={EComponentSize.LG} value="filled" />
        <Component status={EFormFieldStatus.ERROR} value="filled" />
        {/* ...остальные комбинации */}
    </div>
),
```

Используйте `flexWrap: "wrap"` и `gap`, чтобы варианты не обрезались на узких viewport'ах.

---

## Подписи вариантов

В стори, показывающих варианты (Sizes, Statuses), каждый вариант должен быть подписан **рядом** с компонентом:

```tsx
<div>
    <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>
        {size.toUpperCase()}
    </div>
    <NumberField size={size} ... />
</div>
```

Если в примере уже есть подписи, необходимо проверить, чтобы они были консистентны подписям в других компонентах, при необходимости поменять обертку.

---

## Файл `examples/index.ts`

В modern pattern для каждого примера экспортируются два значения — сам компонент и его исходный код:

```ts
export * from "./Default";
export { default as DefaultSource } from "./Default?raw";
export * from "./Sizes";
export { default as SizesSource } from "./Sizes?raw";
```

> **Имена.** Файл и экспорт-функция называются как story (`Default.tsx` экспортирует `Default`). Source-константа добавляет суффикс `Source` (`DefaultSource`). Из-за коллизии с именем story-экспорта в `*.stories.tsx` импорт компонента-примера делается через alias — см. ниже.

---

## Подключение примеров к стори

В modern pattern каждая документационная стори подключает пример и его исходный код через `?raw`:

```tsx
import { Default as DefaultRender, DefaultSource } from "./examples";

export const Default: StoryObj<typeof Component> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};
```

> **Alias обязателен.** Имя экспорта-функции (`Default`) совпадает с именем story-экспорта (`Default: StoryObj`), поэтому в импорте используется `Default as DefaultRender`. Source-константа конфликта не вызывает (`DefaultSource`), её импортируем без alias. То же относится к Playground (`Playground as PlaygroundRender`).

---

## Полный пример

### `ComponentName.stories.tsx`

```tsx
import React, { useState, useCallback } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { ComponentName, EComponentSize } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Playground as PlaygroundRender,
    Sizes as SizesRender,
    SizesSource,
} from "./examples";

const meta = {
    title: "Components/Group/ComponentName",
    component: ComponentName,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ComponentName} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ComponentName>;

export default meta;

export const Playground: StoryObj<typeof meta> = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.LG,
        // ...остальные args
    },
    render: PlaygroundRender,
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
            },
        },
        // ...остальные argTypes
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof ComponentName> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof ComponentName> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};
```

### `examples/Default.tsx`

```tsx
import React, { useState } from "react";
import { ComponentName, EComponentSize } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <ComponentName size={EComponentSize.LG} value={value} onChange={handleChange} />
        </div>
    );
};
```

### `examples/Sizes.tsx`

```tsx
import React, { useState } from "react";
import { ComponentName, EComponentSize } from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <ComponentName size={size} value={value} onChange={handleChange} />
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
```

### `examples/index.ts`

```ts
export * from "./Default";
export { default as DefaultSource } from "./Default?raw";
export * from "./Sizes";
export { default as SizesSource } from "./Sizes?raw";
```

---

## Чек-лист перед мержем

### Для новых и мигрируемых story-файлов

### Документация и структура

- [ ] Есть docs page с `Title`, `Description`, `ArgTypes`, `Playground`, `Stories` (если у компонента нет настраиваемых props — блоки `Props`/`ArgTypes` и `Playground` пропускаются)
- [ ] Playground имеет Controls, не показывает код (`sourceState: "none"`) — если есть
- [ ] Playground исключён из скриншот-тестов (`testRunner: { skip: true }`) — если есть
- [ ] Playground скрыт из autodocs (`tags: ["!autodocs"]`) — если есть
- [ ] Все документационные стори, кроме Playground, **не** имеют Controls (`controls: { disable: true }`)
- [ ] Все документационные стори, кроме Playground, показывают пример кода через `source.code`
- [ ] Все примеры вынесены в `examples/` и реэкспортированы через `index.ts`
- [ ] Default — минимальный пример с параметрами по умолчанию
- [ ] Стори с вариантами (Sizes, Statuses) — каждый вариант подписан рядом с компонентом
- [ ] Примеры самодостаточны (можно скопировать целиком)
- [ ] Импорты в примерах из корня пакета (`@sberbusiness/triplex-next`), а не по относительным путям
- [ ] Порядок: imports → meta → constants → Playground → Default → остальные
- [ ] Именование сторей соответствует конвенции

### Скриншот-тесты

Скриншот-тесты обязательны для UI-компонентов. Без baseline-файлов в `__screenshots__/` регрессию не поймать.

- [ ] Playground исключён из скриншот-тестов (`testRunner: { skip: true }`)
- [ ] Нет дублирующих скриншотов — визуально идентичные стори исключены через `testRunner: { skip: true }`
- [ ] Все ключевые визуальные состояния покрыты (размеры, статусы, заполненные поля, фокус)
- [ ] Если основных сторей недостаточно — создана Visual tests с недостающими состояниями
- [ ] Visual tests скрыта из autodocs (`tags: ["!autodocs"]`) и не показывает код
- [ ] Если компонент требует взаимодействия (dropdown, tooltip, modal, popover) — реализован `play` в Visual tests
- [ ] Данные в Visual tests захардкожены (нет `new Date()`, `Math.random()`)
- [ ] Контейнеры имеют фиксированные размеры для стабильного layout'а
- [ ] Для каждой не-skip story есть baseline-файлы в `__screenshots__/{story-id}--xs.png` и `--xl.png`. Если baseline ещё нет — запустить `GitHub Actions → Update Visual Snapshots` на ветке (CI закоммитит скриншоты), и только потом мержить.

### Для небольших изменений в legacy stories

- [ ] Изменения согласованы с локальным паттерном файла
- [ ] Playground/Docs/testRunner поведение не сломано
- [ ] Не изменены story ids/export names без необходимости
- [ ] Не добавлен большой структурный рефакторинг без отдельной задачи

---

## Эталонный пример

Референсная реализация: `stories/NumberField/NumberField.stories.tsx`
