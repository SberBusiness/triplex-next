import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { ChipIcon, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    TypesExample,
    TypesExampleSource,
    StatesExample,
    StatesExampleSource,
} from "./examples/ChipIcon";

const meta = {
    title: "Components/Chips/ChipIcon",
    component: ChipIcon,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipIcon} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipIcon>;

export default meta;

type Story = StoryObj<typeof ChipIcon>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
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
        disabled: {
            control: { type: "boolean" },
        },
    },
    render: PlaygroundExample,
    parameters: {
        controls: {
            include: ["type", "size", "disabled"],
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

export const Types: Story = {
    render: TypesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesExampleSource,
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
            source: {
                code: StatesExampleSource,
                language: "tsx",
            },
        },
    },
};
