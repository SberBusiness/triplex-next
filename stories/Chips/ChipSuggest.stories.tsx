import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { ChipSuggest, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
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
    WithNotificationIconExample,
    WithNotificationIconExampleSource,
    VisualTestsExample,
} from "./examples/ChipSuggest";

const meta = {
    title: "Components/Chips/ChipSuggest",
    component: ChipSuggest,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipSuggest} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipSuggest>;

export default meta;

type Story = StoryObj<typeof ChipSuggest>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
        label: "Suggest label",
        displayedValue: undefined,
        placeholder: "Type to proceed",
        noOptionsText: "No matches found.",
        loading: false,
        clearInputOnFocus: false,
        targetProps: { type: EChipType.TYPE_1, disabled: false },
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
        placeholder: {
            control: { type: "text" },
        },
        noOptionsText: {
            control: { type: "text" },
        },
        loading: {
            control: { type: "boolean" },
        },
        clearInputOnFocus: {
            control: { type: "boolean" },
        },
        targetProps: {
            control: { type: "object" },
        },
    },
    parameters: {
        controls: {
            include: [
                "type",
                "size",
                "label",
                "displayedValue",
                "placeholder",
                "noOptionsText",
                "loading",
                "clearInputOnFocus",
                "targetProps",
            ],
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

export const States: Story = {
    render: StatesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSuggest в состояниях selected, disabled.",
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
        controls: { disable: true },
        testRunner: { skip: true },
        docs: {
            description: {
                story: "ChipSuggest с опциями, у которых задан showNotificationIcon. Флаг передаётся напрямую в объект опции.",
            },
            source: {
                code: WithNotificationIconExampleSource,
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
