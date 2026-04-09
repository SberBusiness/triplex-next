import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { CheckboxTree, EComponentSize } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, SizesExample, SizesExampleSource, PlaygroundExample } from "./examples";

const meta = {
    title: "Components/CheckboxTree",
    component: CheckboxTree,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: { component: "Дерево чекбоксов. Является оберткой над CheckboxTreeExtended." },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CheckboxTree} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CheckboxTree>;

export default meta;
type Story = StoryObj<typeof CheckboxTree>;

export const Playground: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { include: ["size"] },
        testRunner: { skip: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    args: { size: EComponentSize.MD },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: { type: { summary: "EComponentSize" }, defaultValue: { summary: EComponentSize.MD } },
        },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: { controls: { disable: true }, docs: { source: { code: DefaultExampleSource, language: "tsx" } } },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: { controls: { disable: true }, docs: { source: { code: SizesExampleSource, language: "tsx" } } },
};
