import React from "react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Meta, StoryObj } from "@storybook/react";
import { ChipMonthYearPicker, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    TypesExample,
    TypesExampleSource,
    SizesExample,
    SizesExampleSource,
    WithCustomDisplayedValueExample,
    WithCustomDisplayedValueExampleSource,
    VisualTestsExample,
    VisualTestsExampleSource,
} from "./examples/ChipMonthYearPicker";

const meta = {
    title: "Components/Chips/ChipMonthYearPicker",
    component: ChipMonthYearPicker,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipMonthYearPicker} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipMonthYearPicker>;

export default meta;
type Story = StoryObj<typeof ChipMonthYearPicker>;

export const Playground: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: {
            include: ["type", "size", "label", "placeholder", "displayedValue", "disabled"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    args: {
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
        label: "Month label",
        placeholder: "мм.гггг",
        displayedValue: undefined,
        disabled: false,
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
        label: {
            control: { type: "text" },
        },
        placeholder: {
            control: { type: "text" },
        },
        displayedValue: {
            control: { type: "text" },
        },
        disabled: {
            control: { type: "boolean" },
        },
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

export const WithCustomDisplayedValue: Story = {
    name: "With custom displayed value",
    render: WithCustomDisplayedValueExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: WithCustomDisplayedValueExampleSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
            source: { code: VisualTestsExampleSource, language: "tsx" },
        },
    },
    render: VisualTestsExample,
    play: async ({ canvas, userEvent }) => {
        const chips = await canvas.findAllByRole("button", { name: /1970/ });
        await userEvent.click(chips[chips.length - 1]);
    },
};
