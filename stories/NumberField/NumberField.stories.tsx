import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { NumberField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    PlaygroundSource,
    DefaultRender,
    DefaultSource,
    SizesRender,
    SizesSource,
    StatusesRender,
    StatusesSource,
    ProductionRender,
    ProductionSource,
    type PlaygroundArgs,
} from "./examples";

export default {
    title: "Components/NumberField",
    component: NumberField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={NumberField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof NumberField>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    label: "Label",
    active: false,
    inputProps: { placeholder: "0" },
    // Settings
    withPostfix: false,
    withDescription: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        size: {
            control: "select",
            options: Object.values(EComponentSize),
            table: { category: "Props" },
        },
        status: {
            control: "select",
            options: Object.values(EFormFieldStatus),
            table: { category: "Props" },
        },
        label: {
            control: "text",
            table: { category: "Props" },
        },
        active: {
            control: "boolean",
            table: { category: "Props" },
        },
        inputProps: {
            control: "object",
            table: { category: "Props" },
        },
        // Settings
        withPostfix: {
            control: "boolean",
            description: "С постфиксом.",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
        withDescription: {
            control: "boolean",
            description: "С описанием.",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
            source: {
                code: PlaygroundSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof NumberField> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const Sizes: StoryObj<typeof NumberField> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
    render: SizesRender,
};

export const Statuses: StoryObj<typeof NumberField> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StatusesSource,
                language: "tsx",
            },
        },
    },
    render: StatusesRender,
};

export const Production: StoryObj<typeof NumberField> = {
    name: "Example: production",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: ProductionRender,
};
