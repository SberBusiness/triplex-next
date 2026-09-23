import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { StepperExtended, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    DefaultRender,
    DefaultSource,
    SizesRender,
    SizesSource,
    TypesRender,
    TypesSource,
    StatesRender,
    StatesSource,
    WithIconsRender,
    WithIconsSource,
    ExampleRender,
    ExampleSource,
    VisualTestsRender,
    type PlaygroundArgs,
} from "./examples/StepperExtended";

export default {
    title: "Components/StepperExtended",
    component: StepperExtended,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={StepperExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof StepperExtended>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    selectedStepId: "signing",
    // Settings
    withIcons: true,
    withDisabledStep: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        size: {
            control: "select",
            options: Object.values(EComponentSize),
            description: "Размер шагов.",
            table: {
                category: "Props",
                defaultValue: { summary: "EComponentSize.LG" },
            },
        },
        selectedStepId: {
            control: "select",
            options: ["application", "documents", "signing", "result"],
            description: "Идентификатор выбранного шага.",
            table: { category: "Props" },
        },
        // Settings
        withIcons: {
            control: "boolean",
            description: "С иконками статуса в шагах.",
            table: {
                category: "Settings",
                defaultValue: { summary: "true" },
            },
        },
        withDisabledStep: {
            control: "boolean",
            description: "Второй шаг недоступен для выбора.",
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
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof StepperExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
    render: DefaultRender,
};

export const Sizes: StoryObj<typeof StepperExtended> = {
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

export const Types: StoryObj<typeof StepperExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesSource,
                language: "tsx",
            },
        },
    },
    render: TypesRender,
};

export const States: StoryObj<typeof StepperExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StatesSource,
                language: "tsx",
            },
        },
    },
    render: StatesRender,
};

export const WithIcons: StoryObj<typeof StepperExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithIconsSource,
                language: "tsx",
            },
        },
    },
    render: WithIconsRender,
};

export const Example: StoryObj<typeof StepperExtended> = {
    name: "Example: карусель шагов",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
        // Ширина ленты и положение прокрутки зависят от ResizeObserver — скриншот нестабилен.
        testRunner: { skip: true },
    },
    render: ExampleRender,
};

export const VisualTests: StoryObj<typeof StepperExtended> = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
    play: async ({ userEvent }) => {
        // Фокус с клавиатуры — единственный способ увидеть состояние focus-visible на скриншоте.
        await userEvent.tab();
    },
};
