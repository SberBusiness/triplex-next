import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { Ellipsis } from "@sberbusiness/triplex-next";
import { PlaygroundExample, DefaultExample, DefaultExampleSource } from "./examples/index";

const meta = {
    title: "Components/Ellipsis",
    component: Ellipsis,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент для сворачивания в многоточие текста, который не поместился в заданное количество строк. Данному компоненту нельзя устанавливать паддинги, так как реализация через CSS свойство line-clamp.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Ellipsis} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Ellipsis>;

export default meta;
type Story = StoryObj<typeof Ellipsis>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: { maxLines: 2 },
    argTypes: {
        maxLines: {
            control: { type: "number" },
            description: "Количество строк, после которых происходит сворачивание в многоточие.",
        },
    },
    parameters: {
        controls: { include: ["maxLines"] },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};
