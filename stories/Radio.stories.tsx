import React from "react";
import { Radio, RadioXGroup, RadioYGroup } from "../src/components/Radio";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Radio",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Радио-кнопка с описанием.

## Особенности

- **Группировка**: по осям X (компонент RadioXGroup) и Y (компонент RadioYGroup)

## Использование

\`\`\`tsx
import { Radio } from '@sberbusiness/triplex-next';

// Простая радио-кнопка
<Radio>
    Sample text
</Radio>

// Отключенная радио-кнопка
<Radio disabled>
    Disabled option
</Radio>
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Radio> = {
    name: "Playground",
    args: {
        children: "Radio text",
        disabled: false,
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Контент лейбла радио-кнопки",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        checked: {
            control: { type: "boolean" },
            description: "Состояние checked",
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
        onChange: {
            table: {
                disable: true,
            },
        },
        labelAttributes: {
            table: {
                disable: true,
            },
        },
        name: {
            table: {
                disable: true,
            },
        },
        value: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => <Radio {...args} />,
};

export const Default: StoryObj<typeof Radio> = {
    name: "Default",
    args: {
        children: "Radio text",
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        name: {
            table: {
                disable: true,
            },
        },
        value: {
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
        onChange: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <div style={{ width: "250px" }}>
            <Radio {...args} />
        </div>
    ),
};

export const XGroup: StoryObj<typeof Radio> = {
    name: "XGroup",
    parameters: {
        docs: {
            description: {
                story: "Группа радио-кнопок с направлением по оси X",
            },
        },
    },
    render: () => (
        <RadioXGroup aria-labelledby="radio-x-group-label" indent={20}>
            {[1, 2, 3].map((value, index) => (
                <Radio key={index} name="radio-x-group" value={value}>
                    Radio text
                </Radio>
            ))}
        </RadioXGroup>
    ),
};

export const YGroup: StoryObj<typeof Radio> = {
    name: "YGroup",
    parameters: {
        docs: {
            description: {
                story: "Группа радио-кнопок с направлением по оси Y",
            },
        },
    },
    render: () => (
        <RadioYGroup>
            {[1, 2, 3].map((value, index) => (
                <Radio key={index} name="radio-group" value={value}>
                    Radio text
                </Radio>
            ))}
        </RadioYGroup>
    ),
};
