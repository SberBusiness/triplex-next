import React from "react";
import { Radio, RadioXGroup, RadioYGroup } from "../src/components/Radio";
import { Gap } from "../src/components/Gap";
import { StoryObj } from "@storybook/react";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";
import { EComponentSize } from "../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Radio",
    component: Radio,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Радио-кнопка с описанием.

## Особенности

- **Размеры**: small (SM), medium (MD), large (LG)
- **Группировка**: по осям X (компонент RadioXGroup) и Y (компонент RadioYGroup)
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <h2>Props</h2>
                    <ArgTypes of={Radio} />
                    <h2>Playground</h2>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof Radio> = {
    name: "Playground",
    tags: ["!autodocs"],
    args: {
        children: "Radio text",
        disabled: false,
        size: EComponentSize.MD,
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
            options: Object.values(EComponentSize),
            description: "Размер радио-кнопки",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["children", "checked", "disabled", "size"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => <Radio {...args} />,
};

export const Default: StoryObj<typeof Radio> = {
    name: "Default",
    render: () => <Radio>Radio text</Radio>,
    parameters: {
        controls: { disable: true },
    },
};

export const DifferentSizes: StoryObj<typeof Radio> = {
    name: "Sizes",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div style={{ width: "250px" }}>
            <Radio size={EComponentSize.SM}>Radio text</Radio>
            <Gap size={16} />
            <Radio>Radio text</Radio>
            <Gap size={16} />
            <Radio size={EComponentSize.LG}>Radio text</Radio>
        </div>
    ),
};

export const XGroup: StoryObj<typeof Radio> = {
    name: "X Group",
    parameters: {
        docs: {
            description: {
                story: "Группа радио-кнопок с направлением по оси X",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <>
            <RadioXGroup aria-labelledby="radio-x-group-label" indent={16}>
                {[1, 2, 3].map((value, index) => (
                    <Radio key={index} name="radio-x-group-md" value={value} size={EComponentSize.SM}>
                        Radio text
                    </Radio>
                ))}
            </RadioXGroup>
            <Gap size={16} />
            <RadioXGroup aria-labelledby="radio-x-group-label" indent={16}>
                {[1, 2, 3].map((value, index) => (
                    <Radio key={index} name="radio-x-group-md" value={value}>
                        Radio text
                    </Radio>
                ))}
            </RadioXGroup>
            <Gap size={16} />
            <RadioXGroup aria-labelledby="radio-x-group-label" indent={20}>
                {[1, 2, 3].map((value, index) => (
                    <Radio key={index} name="radio-x-group-lg" value={value} size={EComponentSize.LG}>
                        Radio text
                    </Radio>
                ))}
            </RadioXGroup>
        </>
    ),
};

export const YGroup: StoryObj<typeof Radio> = {
    name: "Y Group",
    parameters: {
        docs: {
            description: {
                story: "Группа радио-кнопок с направлением по оси Y",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <Row>
            <Col size={3}>
                <RadioYGroup>
                    {[1, 2, 3, 4].map((value, index) => (
                        <Radio key={index} name="radio-y-group-md" value={value} size={EComponentSize.SM}>
                            Radio text
                        </Radio>
                    ))}
                </RadioYGroup>
            </Col>
            <Col size={3}>
                <RadioYGroup>
                    {[1, 2, 3, 4].map((value, index) => (
                        <Radio key={index} name="radio-y-group-md" value={value}>
                            Radio text
                        </Radio>
                    ))}
                </RadioYGroup>
            </Col>
            <Col size={3}>
                <RadioYGroup>
                    {[1, 2, 3, 4].map((value, index) => (
                        <Radio key={index} name="radio-y-group-lg" value={value} size={EComponentSize.LG}>
                            Radio text
                        </Radio>
                    ))}
                </RadioYGroup>
            </Col>
        </Row>
    ),
};

export const Selected: StoryObj<typeof Radio> = {
    name: "Selected",
    parameters: {
        docs: {
            description: {
                story: "Группа радио-кнопок с одной предварительно выбранной",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <>
            <RadioYGroup>
                {[1, 2, 3, 4].map((value, index) => (
                    <Radio key={index} name="radio-group" value={value} defaultChecked={value === 2}>
                        Radio text
                    </Radio>
                ))}
            </RadioYGroup>
            <Gap size={32} />
            <RadioXGroup aria-labelledby="radio-x-group-label" indent={16}>
                {[1, 2, 3].map((value, index) => (
                    <Radio key={index} name="radio-x-group" value={value} defaultChecked={value === 2}>
                        Radio text
                    </Radio>
                ))}
            </RadioXGroup>
        </>
    ),
};
