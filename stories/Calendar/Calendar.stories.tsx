import React from "react";
import moment from "moment";
import { Meta, StoryObj, ArgTypes as ArgTypesType } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Calendar, dateFormatYYYYMMDD } from "@sberbusiness/triplex-next";
import {
    PlaygroundArgs,
    PlaygroundExample,
    PlaygroundExampleSource,
    DefaultExample,
    DefaultExampleSource,
    MarkedDaysExample,
    MarkedDaysExampleSource,
    DisabledDaysExample,
    DisabledDaysExampleSource,
    ButtonsExample,
    ButtonsExampleSource,
    VisualTestsExample,
    VisualTestsExampleSource,
} from "./examples";

export default {
    title: "Components/Date components/Calendar",
    component: Calendar,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Calendar} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Calendar>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    defaultViewDate: moment().format(dateFormatYYYYMMDD),
    adaptiveMode: false,
    // Settings
    withMarkedDays: false,
    withDisabledDays: false,
    withButtons: false,
};

const PLAYGROUND_ARG_TYPES: ArgTypesType<PlaygroundArgs> = {
    // Props
    defaultViewDate: {
        control: { type: "text" },
        table: {
            category: "Props",
        },
    },
    adaptiveMode: {
        control: { type: "boolean" },
        table: {
            category: "Props",
        },
    },
    // Settings
    withMarkedDays: {
        description: "С отмеченными днями.",
        control: { type: "boolean" },
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
    withDisabledDays: {
        description: "С днями недоступными для выбора.",
        control: { type: "boolean" },
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
    withButtons: {
        description: "С кнопками быстрого выбора.",
        control: { type: "boolean" },
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

export const Default: StoryObj<typeof Calendar> = {
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

export const MarkedDays: StoryObj<typeof Calendar> = {
    name: "With marked days",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: MarkedDaysExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: MarkedDaysExample,
};

export const DisabledDays: StoryObj<typeof Calendar> = {
    name: "With disabled days",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DisabledDaysExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: DisabledDaysExample,
};

export const Buttons: StoryObj<typeof Calendar> = {
    name: "With buttons",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ButtonsExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: ButtonsExample,
};

export const VisualTests: StoryObj<typeof Calendar> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
            source: {
                code: VisualTestsExampleSource,
                language: "tsx",
            },
        },
    },
    render: VisualTestsExample,
};
