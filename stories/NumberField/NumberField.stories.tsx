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
    title: "Components/TextFields/NumberField",
    component: NumberField,
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
    tags: ["autodocs"],
} satisfies Meta<typeof NumberField>;

export type PlaygroundArgs = React.ComponentProps<typeof NumberField> & {
    /** С постфиксом. */
    withPostfix: boolean;
    /** С описанием. */
    withDescription: boolean;
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        // Props
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        label: "Label",
        active: false,
        inputProps: { placeholder: "0" },
        // Settings
        withPostfix: false,
        withDescription: false,
    },
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
        withPostfix: {
            control: "boolean",
            table: { category: "Settings" },
        },
        withDescription: {
            control: "boolean",
            table: { category: "Settings" },
        },
    },
    render: PlaygroundExample,
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
        },
        controls: {
            include: [
                // Props
                "size",
                "status",
                "label",
                "active",
                "inputProps",
                // Settings
                "withPostfix",
                "withDescription",
            ],
        },
    },
};

export const Default: StoryObj<typeof NumberField> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof NumberField> = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Statuses: StoryObj<typeof NumberField> = {
    name: "Statuses",
    render: StatusesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: StatusesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Production: StoryObj<typeof NumberField> = {
    name: "Example: production",
    render: ProductionExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: ProductionExampleSource,
                language: "tsx",
            },
        },
    },
};
