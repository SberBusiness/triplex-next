import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { CheckboxTreeExtended, EComponentSize } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, SizesExample, SizesExampleSource } from "./examples";

const meta = {
    title: "Components/CheckboxTreeExtended",
    component: CheckboxTreeExtended,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: { component: "Декларативное дерево чекбоксов." },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CheckboxTreeExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CheckboxTreeExtended>;

export default meta;
type Story = StoryObj<typeof CheckboxTreeExtended>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: { size: EComponentSize.MD },
    argTypes: {
        size: { control: { type: "select" }, options: Object.values(EComponentSize), description: "Размер компонента" },
    },
    parameters: {
        controls: { include: ["size"] },
        testRunner: { skip: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: (args) => <DefaultExample size={args.size} />,
};

export const Default: Story = {
    render: () => <DefaultExample size={EComponentSize.MD} />,
    parameters: { controls: { disable: true }, docs: { source: { code: DefaultExampleSource, language: "tsx" } } },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: { controls: { disable: true }, docs: { source: { code: SizesExampleSource, language: "tsx" } } },
};
