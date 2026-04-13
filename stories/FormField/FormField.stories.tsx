import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { EComponentSize, EFormFieldStatus, FormField } from "@sberbusiness/triplex-next";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    Heading,
    ArgTypes,
} from "@storybook/addon-docs/blocks";
import {
    PlaygroundExample,
    type IFormFieldPlaygroundProps,
    DefaultExample,
    DefaultExampleSource,
    MaskedInputExample,
    MaskedInputExampleSource,
    SizesExample,
    SizesExampleSource,
    StatesExample,
    StatesExampleSource,
    TextareaExample,
    TextareaExampleSource,
    WithClearButtonExample,
    WithClearButtonExampleSource,
    WithCounterExample,
    WithCounterExampleSource,
    WithPrefixAndPostfixExample,
    WithPrefixAndPostfixExampleSource,
    VisualTestsExample,
} from "./examples";

const meta = {
    title: "Components/FormField",
    component: FormField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Компонент представляет собой универсальное поле ввода с поддержкой различных элементов.",
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={FormField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof FormField>;
type PlaygroundStory = StoryObj<IFormFieldPlaygroundProps>;

export const Playground: PlaygroundStory = {
    tags: ["!autodocs"],
    render: PlaygroundExample,
    argTypes: {
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Состояние поля",
        },
        labelText: { control: { type: "text" }, description: "Текст лейбла" },
        placeholder: { control: { type: "text" }, description: "Плейсхолдер поля ввода" },
        descriptionText: { control: { type: "text" }, description: "Текст описания" },
        size: { control: { type: "select" }, options: Object.values(EComponentSize), description: "Размер поля ввода" },
    },
    args: {
        status: EFormFieldStatus.DEFAULT,
        size: EComponentSize.MD,
        labelText: "Название поля",
        placeholder: "Введите текст...",
        descriptionText: "Описание поля",
    },
    parameters: {
        controls: { include: ["status", "labelText", "placeholder", "descriptionText", "size"] },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
};

export const Default: Story = {
    render: DefaultExample,
    parameters: { controls: { disable: true }, docs: { source: { code: DefaultExampleSource, language: "tsx" } } },
};

export const WithPrefixAndPostfix: Story = {
    render: WithPrefixAndPostfixExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: WithPrefixAndPostfixExampleSource, language: "tsx" } },
    },
};
export const WithClearButton: Story = {
    render: WithClearButtonExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: WithClearButtonExampleSource, language: "tsx" } },
    },
};
export const WithCounter: Story = {
    render: WithCounterExample,
    parameters: { controls: { disable: true }, docs: { source: { code: WithCounterExampleSource, language: "tsx" } } },
};
export const States: Story = {
    render: StatesExample,
    parameters: { controls: { disable: true }, docs: { source: { code: StatesExampleSource, language: "tsx" } } },
};
export const Textarea: Story = {
    render: TextareaExample,
    parameters: { controls: { disable: true }, docs: { source: { code: TextareaExampleSource, language: "tsx" } } },
};
export const Sizes: Story = {
    render: SizesExample,
    parameters: { controls: { disable: true }, docs: { source: { code: SizesExampleSource, language: "tsx" } } },
};
export const MaskedInput: Story = {
    render: MaskedInputExample,
    parameters: { controls: { disable: true }, docs: { source: { code: MaskedInputExampleSource, language: "tsx" } } },
};

export const VisualTests: StoryObj<typeof FormField> = {
    tags: ["!autodocs"],
    render: VisualTestsExample,
    parameters: { controls: { disable: true }, docs: { canvas: { sourceState: "none" }, codePanel: false } },
};
