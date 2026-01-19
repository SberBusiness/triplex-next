import React from "react";
import { Checkbox, CheckboxXGroup, CheckboxYGroup } from "../src/components/Checkbox";
import { EComponentSize } from "../src/enums/EComponentSize";
import { Gap } from "../src/components/Gap";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";
import { StoryObj } from "@storybook/react";
import { Title, Description, Primary, Stories, ArgTypes, Controls } from "@storybook/addon-docs/blocks";

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

- **Размеры**: small (SM), medium (MD), large (LG)
- **Группировка**: по осям X (компонент CheckboxXGroup) и Y (компонент CheckboxYGroup)
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <h2>Props</h2>
                    <ArgTypes of={Checkbox} />
                    <h2>Playground</h2>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof Checkbox> = {
    name: "Playground",
    tags: ["!autodocs"],
    args: {
        children: "Checkbox label",
        size: EComponentSize.MD,
        bulk: false,
        disabled: false,
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Контент лейбла чекбокса",
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
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер чекбокса",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: EComponentSize.MD },
            },
        },
    },
    parameters: {
        controls: {
            include: ["children", "checked", "disabled", "bulk", "size"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => <Checkbox {...args} />,
};

export const Default: StoryObj<typeof Checkbox> = {
    name: "Default",
    args: {
        children: "Checkbox label",
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => (
        <>
            <Checkbox {...args} />
        </>
    ),
};

export const Sizes: StoryObj<typeof Checkbox> = {
    name: "Sizes",
    args: {
        children: "Checkbox label",
        size: EComponentSize.MD,
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => (
        <>
            <Checkbox {...args} size={EComponentSize.SM} />
            <Gap size={16} />
            <Checkbox {...args} />
            <Gap size={16} />
            <Checkbox {...args} size={EComponentSize.LG} />
        </>
    ),
};

export const XGroup: StoryObj<typeof Checkbox> = {
    name: "X Group",
    parameters: {
        docs: {
            description: {
                story: "Группа чекбоксов с направлением по оси X",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <>
            <CheckboxXGroup aria-labelledby="checkbox-x-group-label" indent={16}>
                {[1, 2, 3].map((value, index) => (
                    <Checkbox key={index} name="checkbox-x-group" value={value} size={EComponentSize.SM}>
                        Checkbox text
                    </Checkbox>
                ))}
            </CheckboxXGroup>
            <Gap size={16} />
            <CheckboxXGroup aria-labelledby="checkbox-x-group-label" indent={16}>
                {[1, 2, 3].map((value, index) => (
                    <Checkbox key={index} name="checkbox-x-group" value={value}>
                        Checkbox text
                    </Checkbox>
                ))}
            </CheckboxXGroup>
            <Gap size={16} />
            <CheckboxXGroup aria-labelledby="checkbox-x-group-label" indent={20}>
                {[1, 2, 3].map((value, index) => (
                    <Checkbox key={index} name="checkbox-x-group" value={value} size={EComponentSize.LG}>
                        Checkbox text
                    </Checkbox>
                ))}
            </CheckboxXGroup>
        </>
    ),
};

export const YGroup: StoryObj<typeof Checkbox> = {
    name: "Y Group",
    parameters: {
        docs: {
            description: {
                story: "Группа чекбоксов с направлением по оси Y",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <Row>
            <Col size={3}>
                <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                    {[1, 2, 3, 4].map((value, index) => (
                        <Checkbox key={index} name="checkbox-y-group" value={value} size={EComponentSize.SM}>
                            Checkbox text
                        </Checkbox>
                    ))}
                </CheckboxYGroup>
            </Col>
            <Col size={3}>
                <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                    {[1, 2, 3, 4].map((value, index) => (
                        <Checkbox key={index} name="checkbox-y-group" value={value}>
                            Checkbox text
                        </Checkbox>
                    ))}
                </CheckboxYGroup>
            </Col>
            <Col size={3}>
                <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                    {[1, 2, 3, 4].map((value, index) => (
                        <Checkbox key={index} name="checkbox-y-group" value={value} size={EComponentSize.LG}>
                            Checkbox text
                        </Checkbox>
                    ))}
                </CheckboxYGroup>
            </Col>
        </Row>
    ),
};
