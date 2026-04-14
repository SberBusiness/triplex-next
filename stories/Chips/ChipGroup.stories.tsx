import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Controls, Stories, ArgTypes, Primary, Heading } from "@storybook/addon-docs/blocks";
import { ChipGroup, EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    OneLineExample,
    OneLineExampleSource,
    SizesExample,
    SizesExampleSource,
    PlaygroundExample,
} from "./examples/ChipGroup";

const meta = {
    title: "Components/Chips/ChipGroup",
    component: ChipGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `Контейнер для группировки нескольких компонентов Chip.

## Особенности:

- Для отображения чипов в одну строку используется свойство **oneLine**.
                    `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipGroup} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof ChipGroup>;

export const Playground: Story = {
    tags: ["!autodocs"],
    render: PlaygroundExample,
    args: { oneLine: false, size: EComponentSize.MD },
    argTypes: {
        oneLine: { control: { type: "boolean" } },
        size: { control: { type: "select" }, options: Object.values(EComponentSize) },
    },
    parameters: {
        controls: {
            include: ["oneLine", "size"],
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

export const OneLine: Story = {
    render: OneLineExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: OneLineExampleSource, language: "tsx" } },
    },
};
