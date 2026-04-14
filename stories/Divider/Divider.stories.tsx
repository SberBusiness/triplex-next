import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Divider } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    VisualTestsExample,
    VisualTestsExampleSource,
} from "./examples/index";

const meta = {
    title: "Components/Divider",
    component: Divider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент визуального разделения контента.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Divider} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        marginTopSize: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 20, 24, 28, 32],
            description: "Отступ сверху",
        },
        marginBottomSize: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 20, 24, 28, 32],
            description: "Отступ снизу",
        },
    },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: { marginTopSize: 24, marginBottomSize: 16 },
    parameters: {
        controls: { include: ["marginTopSize", "marginBottomSize"] },
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

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: VisualTestsExampleSource, language: "tsx" },
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
