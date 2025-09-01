import React from "react";
import { Checkbox, ECheckboxSize, CheckboxXGroup, CheckboxYGroup } from "../src/components/Checkbox";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент чекбокса с поддержкой различных состояний и режимов.

## Особенности

- **Размеры**: medium (MD), large (LG)
- **Группировка**: поддержка группировки по осям X (CheckboxXGroup) и Y (CheckboxYGroup)

## Использование

\`\`\`tsx
import { Checkbox } from '../src/components/Checkbox/Checkbox';

// Базовый чекбокс
<Checkbox onChange={handleChange}>
    Согласен с условиями
</Checkbox>

// Чекбокс в состоянии частичного выбора
<Checkbox bulk checked onChange={handleChange}>
    Выбрать все
</Checkbox>

// Отключенный чекбокс
<Checkbox disabled>
    Недоступная опция
</Checkbox>
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Checkbox> = {
    name: "Playground",
    args: {
        children: "Checkbox label",
        checkboxSize: ECheckboxSize.MD,
        bulk: false,
        disabled: false,
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Текст метки чекбокса",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        checked: {
            control: { type: "boolean" },
            description: "Состояние чекбокса",
            table: {
                type: { summary: "boolean" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Состояние disabled",
            table: {
                type: { summary: "boolean" },
            },
        },
        bulk: {
            control: { type: "boolean" },
            description: "Режим частичного выбора",
            table: {
                type: { summary: "boolean" },
            },
        },
        checkboxSize: {
            control: { type: "select" },
            options: Object.values(ECheckboxSize),
            description: "Размер чекбокса",
            table: {
                type: { summary: "ECheckboxSize" },
                defaultValue: { summary: ECheckboxSize.MD },
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => <Checkbox {...args} />,
};

export const Default: StoryObj<typeof Checkbox> = {
    name: "Default",
    args: {
        children: "Checkbox label",
        checkboxSize: ECheckboxSize.MD,
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        checked: {
            table: {
                disable: true,
            },
        },
        disabled: {
            table: {
                disable: true,
            },
        },
        bulk: {
            table: {
                disable: true,
            },
        },
        checkboxSize: {
            table: {
                disable: true,
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => <Checkbox {...args} />,
};

export const XGroup: StoryObj<typeof Checkbox> = {
    name: "X Group",
    args: {
        children: "Checkbox label",
        checkboxSize: ECheckboxSize.MD,
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        checked: {
            table: {
                disable: true,
            },
        },
        disabled: {
            table: {
                disable: true,
            },
        },
        bulk: {
            table: {
                disable: true,
            },
        },
        checkboxSize: {
            table: {
                disable: true,
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Группа чекбоксов с направлением по оси X",
            },
        },
    },
    render: () => (
        <CheckboxXGroup aria-labelledby="checkbox-x-group-label" indent={20}>
            {[1, 2, 3].map((value, index) => (
                <Checkbox key={index} name="checkbox-x-group" value={value}>
                    Checkbox text
                </Checkbox>
            ))}
        </CheckboxXGroup>
    ),
};

export const YGroup: StoryObj<typeof Checkbox> = {
    name: "Y Group",
    args: {
        children: "Checkbox label",
        checkboxSize: ECheckboxSize.MD,
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        checked: {
            table: {
                disable: true,
            },
        },
        disabled: {
            table: {
                disable: true,
            },
        },
        bulk: {
            table: {
                disable: true,
            },
        },
        checkboxSize: {
            table: {
                disable: true,
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Группа чекбоксов с направлением по оси Y",
            },
        },
    },
    render: () => (
        <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
            {[1, 2, 3, 4].map((value, index) => (
                <Checkbox key={index} name="checkbox-y-group" value={value}>
                    Checkbox text
                </Checkbox>
            ))}
        </CheckboxYGroup>
    ),
};
