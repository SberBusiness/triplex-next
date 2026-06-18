import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Chip, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    TypesExample,
    TypesExampleSource,
    SizesExample,
    SizesExampleSource,
    StatesExample,
    StatesExampleSource,
    WithPrefixAndPostfixExample,
    WithPrefixAndPostfixExampleSource,
    WithNotificationIconExample,
} from "./examples/Chip";

const meta = {
    title: "Components/Chips/Chip",
    component: Chip,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Chip} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
    tags: ["!autodocs"],
    render: PlaygroundExample,
    args: {
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
        disabled: false,
        showNotificationIcon: false,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EChipType),
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
        },
        disabled: {
            control: { type: "boolean" },
        },
        showNotificationIcon: {
            control: { type: "boolean" },
        },
    },
    parameters: {
        controls: {
            include: ["type", "size", "disabled", "showNotificationIcon"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<typeof Chip> = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};

export const Types: Story = {
    render: TypesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: TypesExampleSource, language: "tsx" } },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: SizesExampleSource, language: "tsx" } },
    },
};

export const States: Story = {
    render: StatesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: StatesExampleSource, language: "tsx" } },
    },
};

export const WithPrefixAndPostfix: Story = {
    render: WithPrefixAndPostfixExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: WithPrefixAndPostfixExampleSource, language: "tsx" } },
    },
};

export const WithNotificationIcon: StoryObj<typeof Chip> = {
    parameters: {
        controls: { disable: true },
    },
    render: WithNotificationIconExample,
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
    play: async ({ canvasElement, userEvent }) => {
        await userEvent.click(canvasElement);
        await userEvent.tab();
    },
};
