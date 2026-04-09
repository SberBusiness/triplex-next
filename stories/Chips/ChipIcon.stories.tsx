import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Controls, Stories, Primary, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { ChipIcon, EComponentSize } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, SizesExample, SizesExampleSource } from "./examples/ChipIcon";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

const meta = {
    title: "Components/Chips/ChipIcon",
    component: ChipIcon,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
        docs: {
            description: {
                component: `
Chip с иконкой.
                `,
            },
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
    render: (args) => {
        const [selected, setSelected] = useState(false);
        return (
            <ChipIcon {...args} selected={selected} onClick={() => setSelected((s) => !s)}>
                <DefaulticonStrokePrdIcon24 paletteIndex={selected ? 6 : 5} />
            </ChipIcon>
        );
    },
    args: {
        size: EComponentSize.MD,
        disabled: false,
    },
    argTypes: {
        size: { control: { type: "select" }, options: Object.values(EComponentSize) },
        disabled: { control: { type: "boolean" } },
    },
    parameters: {
        controls: {
            include: ["size", "disabled"],
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
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: SizesExampleSource, language: "tsx" } },
    },
};
