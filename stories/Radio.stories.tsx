import React from "react";
import { Radio, RadioXGroup, RadioYGroup, ERadioSize } from "../src/components/Radio";
import { Gap } from "../src/components/Gap";
import { StoryObj } from "@storybook/react";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";

export default {
    title: "Components/Radio",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Радио-кнопка с описанием.

## Особенности

- **Размеры**: medium (MD), large (LG)
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

// Группа радио-кнопок с направлением по оси X
<RadioXGroup>
    {[1, 2, 3].map((value, index) => (
        <Radio key={index} value={value}>
            Вариант - {index + 1}
        </Radio>
    ))}
</RadioXGroup>

// Группа радио-кнопок с направлением по оси Y
<RadioYGroup>
    {[1, 2, 3, 4].map((value, index) => (
        <Radio key={index} value={value}>
            Вариант - {index + 1}
        </Radio>
    ))}
</RadioYGroup>
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
        size: ERadioSize.MD,
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
        size: {
            control: { type: "select" },
            options: Object.values(ERadioSize),
            description: "Размер радио-кнопки",
            table: {
                type: { summary: "ERadioSize" },
                defaultValue: { summary: "ERadioSize.MD" },
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

export const DifferentSizes: StoryObj<typeof Radio> = {
    name: "Different Sizes",
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
        size: {
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
            <Gap size={16} />
            <Radio {...args} size={ERadioSize.LG} />
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
        <>
            <RadioXGroup aria-labelledby="radio-x-group-label" indent={16}>
                {[1, 2, 3].map((value, index) => (
                    <Radio key={index} name="radio-x-group" value={value}>
                        Radio text
                    </Radio>
                ))}
            </RadioXGroup>
            <Gap size={16} />
            <RadioXGroup aria-labelledby="radio-x-group-label" indent={20}>
                {[1, 2, 3].map((value, index) => (
                    <Radio key={index} name="radio-x-group" value={value} size={ERadioSize.LG}>
                        Radio text
                    </Radio>
                ))}
            </RadioXGroup>
        </>
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
        <Row>
            <Col size={3}>
                <RadioYGroup>
                    {[1, 2, 3, 4].map((value, index) => (
                        <Radio key={index} name="radio-group" value={value}>
                            Radio text
                        </Radio>
                    ))}
                </RadioYGroup>
            </Col>
            <Col size={3}>
                <RadioYGroup>
                    {[1, 2, 3, 4].map((value, index) => (
                        <Radio key={index} name="radio-group" value={value} size={ERadioSize.LG}>
                            Radio text
                        </Radio>
                    ))}
                </RadioYGroup>
            </Col>
        </Row>
    ),
};
