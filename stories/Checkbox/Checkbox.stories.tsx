import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Stories, ArgTypes, Controls, Heading } from "@storybook/addon-docs/blocks";
import { Checkbox, CheckboxXGroup, CheckboxYGroup, EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    XGroupExample,
    XGroupExampleSource,
    YGroupExample,
    YGroupExampleSource,
} from "./examples";

const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент чекбокса с поддержкой различных состояний и режимов.

## Особенности

- Возможна группировка по осям X (компонент **CheckboxXGroup**) и Y (компонент **CheckboxYGroup**)
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Checkbox} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
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
            table: { type: { summary: "React.ReactNode" } },
        },
        checked: {
            control: { type: "boolean" },
            description: "Состояние чекбокса",
            table: { type: { summary: "boolean" } },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Состояние disabled",
            table: { type: { summary: "boolean" } },
        },
        bulk: {
            control: { type: "boolean" },
            description: "Режим частичного выбора",
            table: { type: { summary: "boolean" } },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер чекбокса",
            table: { type: { summary: "EComponentSize" }, defaultValue: { summary: EComponentSize.MD } },
        },
    },
    parameters: {
        controls: { include: ["children", "checked", "disabled", "bulk", "size"] },
        testRunner: { skip: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: (args) => <Checkbox {...args} />,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: { controls: { disable: true }, docs: { source: { code: DefaultExampleSource, language: "tsx" } } },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: { controls: { disable: true }, docs: { source: { code: SizesExampleSource, language: "tsx" } } },
};

export const XGroup: StoryObj<typeof CheckboxXGroup> = {
    render: XGroupExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Группа чекбоксов с направлением по оси X" },
            source: { code: XGroupExampleSource, language: "tsx" },
        },
    },
};

export const YGroup: StoryObj<typeof CheckboxYGroup> = {
    render: YGroupExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Группа чекбоксов с направлением по оси Y" },
            source: { code: YGroupExampleSource, language: "tsx" },
        },
    },
};
