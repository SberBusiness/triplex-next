import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { AmountField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
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
    VisualTestsRender,
    VisualTestsSource,
    type PlaygroundArgs,
} from "./examples";

export default {
    title: "Components/TextFields/AmountField",
    component: AmountField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={AmountField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof AmountField>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    label: "Label",
    active: false,
    inputProps: { placeholder: "0,00 ₽" },
    currency: "₽",
    maxIntegerDigits: 16,
    fractionDigits: 2,
    // Settings
    withClear: false,
    withHelpBox: false,
    withDescription: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        status: {
            control: "select",
            options: Object.values(EFormFieldStatus),
            table: { category: "Props" },
        },
        size: {
            control: "select",
            options: Object.values(EComponentSize),
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
        currency: {
            control: "text",
            table: { category: "Props" },
        },
        maxIntegerDigits: {
            control: "number",
            table: { category: "Props" },
        },
        fractionDigits: {
            control: "number",
            table: { category: "Props" },
        },
        // Settings
        withClear: {
            control: "boolean",
            description: "С кнопкой очистки.",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
        withHelpBox: {
            control: "boolean",
            description: "С подсказкой.",
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

export const Default: StoryObj<typeof AmountField> = {
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

export const Sizes: StoryObj<typeof AmountField> = {
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

export const Statuses: StoryObj<typeof AmountField> = {
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

export const Production: StoryObj<typeof AmountField> = {
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

export const VisualTests: StoryObj<typeof AmountField> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: VisualTestsSource,
                language: "tsx",
            },
        },
    },
    render: VisualTestsRender,
    play: async ({ canvas, userEvent }) => {
        const inputs = await canvas.findAllByRole("textbox");

        // Фокус на первом поле (вариант "CURRENCY | FOCUSED") — показывает плейсхолдер маски.
        await userEvent.click(inputs[0]);
    },
};
