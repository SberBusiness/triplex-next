import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { ChipOptions, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
} from "./examples/ChipOptions";

const meta = {
    title: "Components/Chips/ChipOptions",
    component: ChipOptions,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Chip с иконкой выбора опций.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipOptions} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipOptions>;

export default meta;

type Story = StoryObj<typeof ChipOptions>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.MD,
        disabled: false,
    },
    argTypes: {
        size: { control: { type: "select" }, options: Object.values(EComponentSize) },
        disabled: { control: { type: "boolean" } },
    },
    render: PlaygroundExample,
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["size", "disabled"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
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
