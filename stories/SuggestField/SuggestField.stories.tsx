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
        testRunner: { skip: true },
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
    render: PlaygroundExample,
    parameters: {
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
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
    },
};

export const Default: StoryObj<typeof SuggestField> = {
    render: DefaultExample,
    parameters: {
        docs: {
            controls: {
                disable: true,
            },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof SuggestField> = {
    render: SizesExample,
    parameters: {
        docs: {
            controls: {
                disable: true,
            },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Statuses: StoryObj<typeof SuggestField> = {
    render: StatusesExample,
    parameters: {
        docs: {
            controls: {
                disable: true,
            },
            source: {
                code: StatusesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof SuggestField> = {
    render: LoadingExample,
    parameters: {
        docs: {
            controls: {
                disable: true,
            },
            source: {
                code: LoadingExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Production: StoryObj<typeof SuggestField> = {
    name: "Example: production",
    render: ProductionExample,
    parameters: {
        docs: {
            controls: {
                disable: true,
            },
            source: {
                code: ProductionExampleSource,
                language: "tsx",
            },
        },
    },
};

export const CustomOptions: StoryObj<typeof SuggestField> = {
    name: "Example: custom options",
    render: CustomOptionsExample,
    parameters: {
        docs: {
            controls: {
                disable: true,
            },
            source: {
                code: CustomOptionsExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Async: StoryObj<typeof SuggestField> = {
    name: "Example: async",
    render: AsyncExample,
    parameters: {
        docs: {
            controls: {
                disable: true,
            },
            source: {
                code: AsyncExampleSource,
                language: "tsx",
            },
        },
    },
};
