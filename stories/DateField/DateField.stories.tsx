import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Controls, Stories, ArgTypes, Primary, Heading } from "@storybook/addon-docs/blocks";
import { DateField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
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
    VisualTestsExample,
} from "./examples";

export default {
    title: "Components/Date components/DateField",
    component: DateField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={DateField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof DateField>;

export interface PlaygroundArgs extends Pick<
    React.ComponentProps<typeof DateField>,
    "size" | "status" | "placeholderMask" | "label" | "invalidDateHint"
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
    placeholderMask: "дд.мм.гггг",
    label: "Label",
    invalidDateHint: "Указана недоступная для выбора дата.",
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
        label: {
            control: { type: "text" },
            table: { category: "Props" },
        },
        placeholderMask: {
            control: { type: "text" },
            table: { category: "Props" },
        },
        invalidDateHint: {
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

export const Default: StoryObj<typeof DateField> = {
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

export const Sizes: StoryObj<typeof DateField> = {
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

export const Statuses: StoryObj<typeof DateField> = {
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

export const Production: StoryObj<typeof DateField> = {
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

export const VisualTests: StoryObj<typeof DateField> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsExample,
    play: async ({ canvas, userEvent }) => {
        const inputs = await canvas.findAllByRole("textbox");
        await userEvent.click(inputs[0]);
    },
};
