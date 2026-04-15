import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { TextareaField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
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
    title: "Components/TextFields/TextareaField",
    component: TextareaField,
    parameters: {
        testRunner: { skip: true },
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

type PlaygroundControlledProps = "postfix" | "description" | "counter";

export interface PlaygroundArgs extends Omit<React.ComponentProps<typeof TextareaField>, PlaygroundControlledProps> {
    /** Текст-заполнитель в поле ввода. */
    placeholder: string;
    /** Максимальное количество символов. */
    maxLength: number;
    /** С постфиксом. */
    withPostfix: boolean;
    /** С описанием. */
    withDescription: boolean;
    /** Со счётчиком. */
    withCounter: boolean;
}

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        // Props
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        label: "Label",
        active: false,
        textareaProps: {},
        // Playground
        placeholder: "Type to proceed",
        maxLength: 201,
        withPostfix: false,
        withDescription: false,
        withCounter: false,
    },
    argTypes: {
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
        placeholder: {
            description: "Текст-заполнитель в поле ввода.",
            control: "text",
            table: {
                category: "Settings",
                defaultValue: { summary: "Type to proceed" },
            },
        },
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
    },
    render: PlaygroundExample,
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        controls: {
            include: [
                // Props
                "size",
                "status",
                "label",
                "active",
                "textareaProps",
                // Settings
                "placeholder",
                "maxLength",
                "withPostfix",
                "withDescription",
                "withCounter",
            ],
        },
    },
};

export const Default: StoryObj<typeof TextareaField> = {
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

export const Sizes: StoryObj<typeof TextareaField> = {
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

export const Statuses: StoryObj<typeof TextareaField> = {
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

export const Production: StoryObj<typeof TextareaField> = {
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
