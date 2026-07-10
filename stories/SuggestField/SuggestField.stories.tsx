import React from "react";
import { Meta, StoryObj, ArgTypes as ArgTypesType } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { SuggestField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import {
    PlaygroundArgs,
    PlaygroundExample,
    PlaygroundExampleSource,
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    StatusesExample,
    StatusesExampleSource,
    LoadingExample,
    LoadingExampleSource,
    ProductionExample,
    ProductionExampleSource,
    CustomOptionsExample,
    CustomOptionsExampleSource,
    AsyncExample,
    AsyncExampleSource,
} from "./examples";

export default {
    title: "Components/TextFields/SuggestField",
    component: SuggestField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SuggestField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SuggestField>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    label: "Label",
    placeholder: "Type to proceed",
    tooltipHint: "No matches found.",
    active: false,
    loading: false,
    dropdownListLoading: false,
    clearInputOnFocus: false,
    inputProps: {},
    // Settings
    withPrefix: false,
    withPostfix: false,
    withDescription: false,
};

const PLAYGROUND_ARG_TYPES: ArgTypesType<PlaygroundArgs> = {
    // Props
    size: {
        control: { type: "select" },
        options: Object.values(EComponentSize),
        table: { category: "Props" },
    },
    status: {
        control: { type: "select" },
        options: Object.values(EFormFieldStatus),
        table: { category: "Props" },
    },
    label: {
        control: { type: "text" },
        table: { category: "Props" },
    },
    placeholder: {
        control: { type: "text" },
        table: { category: "Props" },
    },
    tooltipHint: {
        control: { type: "text" },
        table: { category: "Props" },
    },
    active: {
        control: { type: "boolean" },
        table: { category: "Props" },
    },
    loading: {
        control: { type: "boolean" },
        table: { category: "Props" },
    },
    dropdownListLoading: {
        control: { type: "boolean" },
        table: { category: "Props" },
    },
    clearInputOnFocus: {
        control: { type: "boolean" },
        table: { category: "Props" },
    },
    inputProps: {
        control: "object",
        table: { category: "Props" },
    },
    // Settings
    withPrefix: {
        description: "С префиксом.",
        control: { type: "boolean" },
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
    withPostfix: {
        description: "С постфиксом.",
        control: { type: "boolean" },
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
    withDescription: {
        description: "С описанием.",
        control: { type: "boolean" },
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
};

export const Playground: StoryObj<PlaygroundArgs> = {
    name: "Playground",
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: PLAYGROUND_ARG_TYPES,
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
            source: {
                code: PlaygroundExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: PlaygroundExample,
};

export const Default: StoryObj<typeof SuggestField> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: DefaultExample,
};

export const Sizes: StoryObj<typeof SuggestField> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: SizesExample,
};

export const Statuses: StoryObj<typeof SuggestField> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StatusesExampleSource,
                language: "tsx",
            },
        },
    },
    render: StatusesExample,
};

export const Loading: StoryObj<typeof SuggestField> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: LoadingExampleSource,
                language: "tsx",
            },
        },
    },
    render: LoadingExample,
};

export const Production: StoryObj<typeof SuggestField> = {
    name: "Example: production",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: ProductionExample,
};

export const CustomOptions: StoryObj<typeof SuggestField> = {
    name: "Example: custom options",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CustomOptionsExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: CustomOptionsExample,
};

export const Async: StoryObj<typeof SuggestField> = {
    name: "Example: async",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: AsyncExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: AsyncExample,
};

export const VisualTests: StoryObj<typeof SuggestField> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: DefaultExample,
    play: async ({ canvas, userEvent }) => {
        const input = await canvas.findByRole("combobox");
        await userEvent.click(input);
    },
};
