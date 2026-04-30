import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Controls, Stories, ArgTypes, Primary, Heading } from "@storybook/addon-docs/blocks";
import { MonthYearField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import {
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
    title: "Components/Date components/MonthYearField",
    component: MonthYearField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={MonthYearField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
        testRunner: { skip: true },
    },
} satisfies Meta<typeof MonthYearField>;

export interface PlaygroundArgs extends Pick<
    React.ComponentProps<typeof MonthYearField>,
    "size" | "status" | "placeholder" | "label"
> {
    /** С постфиксом. */
    withPostfix: boolean;
    /** С описанием. */
    withDescription: boolean;
}

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    placeholder: "мм.гггг",
    label: "Label",
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
            options: Object.values(EComponentSize),
            table: { category: "Props" },
        },
        status: {
            options: Object.values(EFormFieldStatus),
            table: { category: "Props" },
        },
        placeholder: {
            control: { type: "text" },
            table: { category: "Props" },
        },
        label: {
            control: { type: "text" },
            table: { category: "Props" },
        },
        // Settings
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

export const Default: StoryObj<typeof MonthYearField> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
    render: DefaultExample,
};

export const Sizes: StoryObj<typeof MonthYearField> = {
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

export const Statuses: StoryObj<typeof MonthYearField> = {
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

export const Production: StoryObj<typeof MonthYearField> = {
    name: "Example: production",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionExampleSource,
                language: "tsx",
            },
        },
    },
    render: ProductionExample,
};
