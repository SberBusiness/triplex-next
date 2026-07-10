import React from "react";
import { Meta, StoryObj, ArgTypes as ArgTypesType } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { TextareaField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
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
    ProductionExample,
    ProductionExampleSource,
} from "./examples";

export default {
    title: "Components/TextFields/TextareaField",
    component: TextareaField,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TextareaField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof TextareaField>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    label: "Label",
    active: false,
    textareaProps: { placeholder: "Type to proceed" },
    // Settings
    maxLength: 201,
    withPostfix: false,
    withDescription: false,
    withCounter: false,
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
    active: {
        control: { type: "boolean" },
        table: { category: "Props" },
    },
    textareaProps: {
        control: "object",
        table: { category: "Props" },
    },
    // Settings
    maxLength: {
        description: "Максимальное количество символов.",
        control: "number",
        table: {
            category: "Settings",
            defaultValue: { summary: "201" },
        },
    },
    withPostfix: {
        description: "С постфиксом.",
        control: "boolean",
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
    withDescription: {
        description: "С описанием.",
        control: "boolean",
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
    withCounter: {
        description: "Со счётчиком.",
        control: "boolean",
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: PLAYGROUND_ARG_TYPES,
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
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

export const Default: StoryObj<typeof TextareaField> = {
    name: "Default",
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

export const Sizes: StoryObj<typeof TextareaField> = {
    name: "Sizes",
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

export const Statuses: StoryObj<typeof TextareaField> = {
    name: "Statuses",
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

export const Production: StoryObj<typeof TextareaField> = {
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
