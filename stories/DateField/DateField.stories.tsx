import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DateField } from "../../src/components/DateField";
import { EFormFieldStatus } from "../../src/components/FormField";
import { EComponentSize } from "../../src/enums";
import {
    Title as DocsTitle,
    Description,
    Controls,
    Stories,
    ArgTypes,
    Primary,
    Heading,
} from "@storybook/addon-docs/blocks";
import { dateFormatYYYYMMDD } from "../../src/consts/DateConst";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    StatesExample,
    StatesExampleSource,
    WithPostfixExample,
    WithPostfixExampleSource,
    VisualTestsExample,
} from "./examples";

const meta = {
    title: "Components/DateField",
    component: DateField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент ввода и выбора даты.
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Default} />
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
        },
        value: { table: { type: { summary: "string" } } },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Состояние компонента.",
        },
        label: { table: { type: { summary: "string" } }, description: "Текст лейбла, отображаемый над полем ввода." },
        placeholderMask: { table: { type: { summary: "string" } } },
        format: {
            table: { type: { summary: "string" }, defaultValue: { summary: dateFormatYYYYMMDD } },
            description: "Формат даты.",
        },
        limitRange: { table: { type: { summary: "IDateLimitRange" } }, description: "Ограничение диапазона дат." },
        disabledDays: { table: { type: { summary: "string[]" } }, description: "Массив дат, которые нельзя выбрать." },
        invalidDateHint: { table: { type: { summary: "string" } } },
        onChange: { table: { type: { summary: "() => void" } } },
        onDropdownOpen: {
            table: { type: { summary: "() => void" } },
            description: "Функция, вызывающаяся при открытии Dropdown.",
        },
        onDropdownClose: {
            table: { type: { summary: "() => void" } },
            description: "Функция, вызывающаяся при закрытии Dropdown.",
        },
        targetProps: { table: { type: { summary: "object" } } },
    },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof DateField>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.MD,
        status: EFormFieldStatus.DEFAULT,
        placeholderMask: "дд.мм.гггг",
        label: "Label",
        invalidDateHint: "Указана недоступная для выбора дата.",
    },
    argTypes: {
        size: { control: { type: "select" }, options: Object.values(EComponentSize) },
        status: { control: { type: "select" }, options: Object.values(EFormFieldStatus) },
    },
    parameters: {
        controls: { include: ["size", "status", "placeholderMask", "label", "invalidDateHint"] },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: { controls: { disable: true }, docs: { source: { code: DefaultExampleSource, language: "tsx" } } },
};

export const WithPostfix: Story = {
    render: WithPostfixExample,
    parameters: { controls: { disable: true }, docs: { source: { code: WithPostfixExampleSource, language: "tsx" } } },
};

export const States: Story = {
    render: StatesExample,
    parameters: { controls: { disable: true }, docs: { source: { code: StatesExampleSource, language: "tsx" } } },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: VisualTestsExample,
    play: async ({ canvas, userEvent }) => {
        const inputs = await canvas.findAllByRole("textbox");
        await userEvent.click(inputs[0]);
    },
};
