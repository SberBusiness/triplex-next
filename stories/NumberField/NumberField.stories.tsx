import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { NumberField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
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
    title: "Components/NumberField",
    component: NumberField,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
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

export interface PlaygroundArgs extends Pick<
    React.ComponentProps<typeof NumberField>,
    "size" | "status" | "label" | "active" | "inputProps"
> {
    /** Текст-заполнитель в поле ввода. */
    placeholder: string;
    /** С постфиксом. */
    withPostfix: boolean;
    /** С описанием. */
    withDescription: boolean;
}

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    label: "Label",
    active: false,
    inputProps: {},
    // Settings
    placeholder: "0",
    withPostfix: false,
    withDescription: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        size: {
            options: Object.values(EComponentSize),
            table: { category: "Props" },
        },
        status: {
            options: Object.values(EFormFieldStatus),
            table: { category: "Props" },
        },
        label: {
            control: { type: "text" },
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
        placeholder: {
            description: "Текст-заполнитель в поле ввода.",
            control: "text",
            table: {
                category: "Settings",
                defaultValue: { summary: "0" },
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
    },
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
    },
    render: PlaygroundExample,
};

export const Default: StoryObj<typeof NumberField> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
    render: DefaultExample,
};

export const Sizes: StoryObj<typeof NumberField> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: SizesExample,
};

export const Statuses: StoryObj<typeof NumberField> = {
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: StatusesExampleSource,
                language: "tsx",
            },
        },
    },
    render: StatusesExample,
};

export const Production: StoryObj<typeof NumberField> = {
    name: "Example: production",
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: ProductionExampleSource,
                language: "tsx",
            },
        },
    },
    render: ProductionExample,
};
