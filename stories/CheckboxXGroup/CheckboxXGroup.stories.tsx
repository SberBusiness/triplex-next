import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Stories, ArgTypes, Controls, Heading } from "@storybook/addon-docs/blocks";
import { CheckboxXGroup } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    IndentsExample,
    IndentsExampleSource,
    PlaygroundExample,
    SizesExample,
    SizesExampleSource,
} from "./examples";

const meta = {
    title: "Components/Checkboxes/CheckboxXGroup",
    component: CheckboxXGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Группа чекбоксов с направлением по оси X.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CheckboxXGroup} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CheckboxXGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxXGroup>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        indent: 16,
    },
    argTypes: {
        indent: {
            control: { type: "select" },
            options: [12, 16, 20, 24, 28, 32],
            description: "Размер отступа между чекбоксами",
            table: { type: { summary: "TIndentSize" }, defaultValue: { summary: "12" } },
        },
    },
    parameters: {
        controls: { include: ["indent"] },
        testRunner: { skip: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Группа чекбоксов с направлением по оси X" },
            source: { code: DefaultExampleSource, language: "tsx" },
        },
    },
};

export const CheckboxSizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Группа чекбоксов разных размеров" },
            source: { code: SizesExampleSource, language: "tsx" },
        },
    },
};

export const Indents: Story = {
    render: IndentsExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Различные значения отступа между чекбоксами" },
            source: { code: IndentsExampleSource, language: "tsx" },
        },
    },
};
