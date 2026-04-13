import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { ChipSuggest, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    StatesExample,
    StatesExampleSource,
    WithNotificationIconExample,
    WithNotificationIconExampleSource,
    VisualTestsExample,
} from "./examples/ChipSuggest";

const meta = {
    title: "Components/Chips/ChipSuggest",
    component: ChipSuggest,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент выбора одного значения из списка с возможностью фильтрации. Выбранное значение отображается в виде компонента Chip.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipSuggest} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента.",
            table: {
                type: {
                    summary: Object.values(EComponentSize).join(" | "),
                },
                defaultValue: { summary: EComponentSize.LG },
            },
        },
        label: {
            control: { type: "text" },
            description: "Текст лейбла, который отображается над полем ввода.",
        },
        displayedValue: {
            control: { type: "text" },
            description: "Лейбл, отображаемый вместо выбранного значения.",
        },
        placeholder: {
            control: { type: "text" },
        },
        noOptionsText: {
            control: { type: "text" },
            description: "Текст, отображаемый при отсутствии опций.",
        },
        loading: {
            control: { type: "boolean" },
            description: "Флаг состояния загрузки.",
        },
        clearInputOnFocus: {
            control: { type: "boolean" },
            description: "Определяет, нужно ли очищать поле ввода при получении фокуса.",
        },
    },
} satisfies Meta<typeof ChipSuggest>;

export default meta;

type Story = StoryObj<typeof ChipSuggest>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.LG,
        label: "Suggest label",
        displayedValue: undefined,
        placeholder: "Type to proceed",
        noOptionsText: "No matches found.",
        loading: false,
        clearInputOnFocus: false,
        targetProps: { disabled: false },
    },
    parameters: {
        controls: {
            include: [
                "size",
                "label",
                "displayedValue",
                "placeholder",
                "noOptionsText",
                "loading",
                "clearInputOnFocus",
            ],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const States: Story = {
    render: StatesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSuggest в состояниях selected, disabled.",
            },
            source: {
                code: StatesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithNotificationIcon: Story = {
    render: WithNotificationIconExample,
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
        docs: {
            description: {
                story: "ChipSuggest с опциями, у которых задан showNotificationIcon. Флаг передаётся напрямую в объект опции.",
            },
            source: {
                code: WithNotificationIconExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: VisualTestsExample,
};
