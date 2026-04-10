import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ChipMultiselect, EComponentSize } from "@sberbusiness/triplex-next";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    LoadingExample,
    LoadingExampleSource,
    VisualTestsExample,
} from "./examples/ChipMultiselect";
import "./ChipMultiselect.less";

const meta = {
    title: "Components/Chips/ChipMultiselect",
    component: ChipMultiselect,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент выбора нескольких значений из списка в виде компонента Chip.
                `,
            },
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
        size: EComponentSize.MD,
        label: "Multiselect label",
        displayedValue: "Multiselect value",
        disabled: false,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        label: {
            control: { type: "text" },
            description: "Название поля, которое отображается, когда значение не выбрано",
        },
        displayedValue: {
            control: { type: "text" },
            description: "Лейбл, который отображается вместо выбранного значения",
        },
        disabled: {
            control: { type: "boolean" },
            description: "Состояние disabled",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["size", "label", "displayedValue", "disabled"],
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
    tags: ["!autodocs"],
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
