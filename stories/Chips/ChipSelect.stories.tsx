import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { ChipSelect, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundArgs,
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    StatesExample,
    StatesExampleSource,
    WithCustomDisplayedValueExample,
    WithCustomDisplayedValueExampleSource,
    WithNotificationIconExample,
    WithNotificationIconExampleSource,
    VisualTestsExample,
    VisualTestsExampleSource,
} from "./examples/ChipSelect";

const meta = {
    title: "Components/Chips/ChipSelect",
    component: ChipSelect,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipSelect} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipSelect>;

export default meta;

type Story = StoryObj<typeof ChipSelect>;

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
        label: "Select label",
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
        displayedValue: {
            control: { type: "text" },
        },
        disabled: {
            control: { type: "boolean" },
        },
    },
    render: PlaygroundExample,
    parameters: {
        controls: {
            include: ["type", "size", "label", "displayedValue", "disabled"],
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

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const States: Story = {
    render: StatesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSelect в состояниях selected, disabled.",
            },
            source: {
                code: StatesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithNotificationIcon: Story = {
    render: WithNotificationIconExample,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSelect с опциями, у которых задан showNotificationIcon. Флаг передаётся напрямую в объект опции.",
            },
            source: {
                code: WithNotificationIconExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomDisplayedValue: Story = {
    render: WithCustomDisplayedValueExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSelect с переданным displayedValue.",
            },
            source: {
                code: WithCustomDisplayedValueExampleSource,
                language: "tsx",
            },
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
        const chip = await canvas.findByText("Select label");
        await userEvent.click(chip);
    },
};
