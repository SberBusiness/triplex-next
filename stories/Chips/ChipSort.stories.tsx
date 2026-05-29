import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { ChipSort, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundArgs,
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    TypesExample,
    TypesExampleSource,
    SizesExample,
    SizesExampleSource,
    VisualTestsExample,
} from "./examples/ChipSort";

const meta = {
    title: "Components/Chips/ChipSort",
    component: ChipSort,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipSort} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipSort>;

export default meta;

type Story = StoryObj<typeof ChipSort>;

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
        disabled: false,
        defaultValue: 0,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EChipType),
            table: { category: "Props" },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: { category: "Props" },
        },
        disabled: {
            control: { type: "boolean" },
            table: { category: "Props" },
        },
        defaultValue: {
            control: { type: "select" },
            options: [0, 1, 2],
            description: "Дефолтное значение",
            table: { category: "Settings" },
        },
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["type", "size", "disabled", "defaultValue"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: PlaygroundExample,
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

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: VisualTestsExample,
};
