import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ChipMultiselect, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    TypesExample,
    TypesExampleSource,
    SizesExample,
    SizesExampleSource,
    LoadingExample,
    LoadingExampleSource,
    VisualTestsExample,
    WithCheckboxTreeExample,
    WithCheckboxTreeExampleSource,
} from "./examples/ChipMultiselect";
import "./ChipMultiselect.less";

const meta = {
    title: "Components/Chips/ChipMultiselect",
    component: ChipMultiselect,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipMultiselect} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipMultiselect>;

export default meta;

type Story = StoryObj<typeof ChipMultiselect>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
        label: "Multiselect label",
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

export const Loading: Story = {
    render: LoadingExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: LoadingExampleSource,
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

export const WithCheckboxTree: Story = {
    name: "Example: with CheckboxTree",
    render: WithCheckboxTreeExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithCheckboxTreeExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
};
