import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { ChipSelect, EComponentSize, type ISelectFieldOption } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    StatesExample,
    StatesExampleSource,
    WithCustomDisplayedValueExample,
    WithCustomDisplayedValueExampleSource,
    WithNotificationIconExample,
    WithNotificationIconExampleSource,
} from "./examples/ChipSelect";

const demoOptions: ISelectFieldOption[] = [
    { id: "1", value: "option1", label: "Первая опция" },
    { id: "2", value: "option2", label: "Вторая опция" },
    { id: "3", value: "option3", label: "Третья опция" },
    { id: "4", value: "option4", label: "Четвертая опция" },
    { id: "5", value: "option5", label: "Пятая опция" },
    { id: "6", value: "option6", label: "Шестая опция" },
];

interface IChipSelectPlaygroundProps extends Omit<
    React.ComponentProps<typeof ChipSelect>,
    "onChange" | "clearSelected" | "value" | "options"
> {
    selectedValueId?: string;
}

const meta = {
    title: "Components/Chips/ChipSelect",
    component: ChipSelect,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент ChipSelect позволяет выбрать одно значение из списка опций. Выбранное значение отображается в виде компонента Chip.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipSelect} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipSelect>;

export default meta;

type Story = StoryObj<typeof ChipSelect>;

export const Playground: StoryObj<IChipSelectPlaygroundProps> = {
    tags: ["!autodocs"],
    render: PlaygroundExample,
    argTypes: {
        label: {
            control: { type: "text" },
            description: "Название поля, отображаемое когда значение не выбрано",
            table: {
                type: { summary: "React.ReactNode" },
                defaultValue: { summary: "undefined" },
            },
        },
        displayedValue: {
            control: { type: "text" },
            description: "Лейбл, отображаемый вместо выбранного значения",
            table: {
                type: { summary: "React.ReactNode" },
                defaultValue: { summary: "undefined" },
            },
        },
        size: {
            control: { type: "inline-radio" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Отключенное состояние",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        selectedValueId: {
            control: { type: "select" },
            options: ["", ...demoOptions.map((opt) => opt.id)],
            description: "Предварительно выбранное значение (для демонстрации)",
            table: {
                type: { summary: "string" },
                category: "Settings",
            },
        },
    },
    args: {
        label: "Select label",
        displayedValue: undefined,
        size: EComponentSize.MD,
        disabled: false,
        selectedValueId: "",
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["label", "displayedValue", "size", "disabled", "selectedValueId"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
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
                story: "ChipSelect в состояниях selected, disabled.",
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
        docs: {
            description: {
                story: "ChipSelect с опциями, у которых задан showNotificationIcon. Флаг передаётся напрямую в объект опции.",
            },
            source: {
                code: WithNotificationIconExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomDisplayedValue: Story = {
    render: WithCustomDisplayedValueExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipSelect с переданным displayedValue.",
            },
            source: {
                code: WithCustomDisplayedValueExampleSource,
                language: "tsx",
            },
        },
    },
};
