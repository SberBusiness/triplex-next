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

## Структура файлов

```
stories/
  ComponentGroup/
    ComponentName/
      ComponentName.stories.tsx    # основной файл стори
      examples/
        index.ts                   # реэкспорт всех примеров
        DefaultExample.tsx
        SizesExample.tsx
        StatusesExample.tsx
        ProductionExample.tsx
        ...
```

Все стори, кроме **Playground**, выносятся в подпапку `examples/` и импортируются в основной файл.

---

## Обязательные стори

| Стори | Описание | Controls | Код |
|---|---|---|---|
| **Playground** | Интерактивная песочница с Controls | Да | Нет |
| **Default** | Минимальное состояние компонента с параметрами по умолчанию | Нет | Да |
| **Sizes / Themes / Statuses** | Стори на ключевые props — отрендеренные варианты с подписями | Нет | Да |
| **Edge cases** | Опционально, на усмотрение разработчика. Каждый кейс — отдельная стори | Нет | Да |
| **Examples** | Композиции компонентов, production-like примеры | Нет | Да |
| **Visual tests** | Дополнительные примеры для скриншот-тестов (если недостаточно основных) | Нет | Да |

> **Правило:** только Playground имеет Controls. Все остальные стори Controls не имеют, но всегда показывают пример кода.

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

---

## Playground

### Назначение

Playground показывает только те props, которые реально помогают исследовать компонент.

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

Playground не показывает пример кода и исключён из скриншот-тестов:

```tsx
parameters: {
    testRunner: { skip: true },
    docs: {
        canvas: { sourceState: "none" },
    },
},
```

Playground не отображается в docs как отдельная стори:

```tsx
tags: ["!autodocs"],
```

---

## Именование сторей

| Ситуация | Название | Пример |
|---|---|---|
| Базовая стори | `Default` | `Default` |
| Варианты props без дефолтного значения | Название props во **множественном** числе | `size` → `Sizes` |
| Заполнение необязательного props | Название props **как есть** | `disabled` → `Disabled` |
| Нестандартные варианты наполнения | `With` + вариант | `WithTextAndIcon` |
| Композиции / production примеры | `Example: описание` | `Example: production` |
| Скриншот-тесты | `Visual tests` | `Visual tests` |

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

---

## Файл `examples/index.ts`

Для каждого примера экспортируются два значения — сам компонент и его исходный код:

```ts
export * from "./DefaultExample";
export { default as DefaultExampleSource } from "./DefaultExample?raw";
export * from "./SizesExample";
export { default as SizesExampleSource } from "./SizesExample?raw";
```

---

## Подключение примеров к стори

Каждая стори (кроме Playground) подключает пример и его исходный код:

```tsx
export const Default: StoryObj<typeof Component> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};
```

---

## Полный пример

### `ComponentName.stories.tsx`

```tsx
import React, { useState, useCallback } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { ComponentName, EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
} from "./examples";

const meta = {
    title: "Components/Group/ComponentName",
    component: ComponentName,
    parameters: {
        testRunner: { skip: true },
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
    render: ({ ...args }) => {
        // ...render с useState и обработчиками
    },
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
    name: "Default",
    render: DefaultExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof ComponentName> = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};
```

### `examples/DefaultExample.tsx`

```tsx
import React, { useState } from "react";
import { ComponentName, EComponentSize } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState<string>("");

    const handleChange = (event) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <ComponentName
                size={EComponentSize.LG}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
```

### `examples/SizesExample.tsx`

```tsx
import React, { useState } from "react";
import { ComponentName, EComponentSize } from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (event) => setValue(event.target.value);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>
                {size.toUpperCase()}
            </div>
            <ComponentName size={size} value={value} onChange={handleChange} />
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const SizesExample = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
```

### `examples/index.ts`

```ts
export * from "./DefaultExample";
export { default as DefaultExampleSource } from "./DefaultExample?raw";
export * from "./SizesExample";
export { default as SizesExampleSource } from "./SizesExample?raw";
```

---

## Чек-лист перед мержем

- [ ] Есть docs page с `Title`, `Description`, `ArgTypes`, `Playground`, `Stories`
- [ ] Playground имеет Controls, не показывает код (`sourceState: "none"`)
- [ ] Playground исключён из скриншот-тестов (`testRunner: { skip: true }`)
- [ ] Playground скрыт из autodocs (`tags: ["!autodocs"]`)
- [ ] Все остальные стори **не** имеют Controls (`controls: { disable: true }`)
- [ ] Все остальные стори показывают пример кода через `source.code`
- [ ] Все примеры вынесены в `examples/` и реэкспортированы через `index.ts`
- [ ] Default — минимальный пример с параметрами по умолчанию
- [ ] Стори с вариантами (Sizes, Statuses) — каждый вариант подписан рядом с компонентом
- [ ] Примеры самодостаточны (можно скопировать целиком)
- [ ] Порядок: imports → meta → constants → Playground → Default → остальные
- [ ] Именование сторей соответствует конвенции

---

## Эталонный пример

Референсная реализация: `stories/TextFields/NumberField/NumberField.stories.tsx`
