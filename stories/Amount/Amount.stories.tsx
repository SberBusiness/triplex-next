import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Amount, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { DefaultExample, DefaultExampleSource, ShowcaseExample, ShowcaseExampleSource } from "./examples";

const meta = {
    title: "Components/Amount",
    component: Amount,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент отображения суммы.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Amount} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Amount>;

export default meta;

type Story = StoryObj<typeof Amount>;

export const Playground: Story = {
    tags: ["!autodocs"],
    argTypes: {
        value: {
            control: { type: "text" },
            description: "Значение суммы",
        },
        fractionLength: {
            control: { type: "select" },
            options: [0, 1, 2, 3, 4],
            description: "Количество знаков после запятой",
        },
        currency: {
            control: { type: "text" },
            description: "Сокращённое обозначение валюты",
        },
        currencyTitle: {
            control: { type: "text" },
            description: "Сообщение подсказки названия валюты",
        },
        adaptive: {
            control: { type: "boolean" },
            description: "При большом количестве цифр уменьшает размер шрифта",
        },
    },
    args: {
        value: "8967452.3145",
        fractionLength: 2,
        currency: "RUB",
        currencyTitle: "Российские рубли",
        adaptive: false,
    },
    parameters: {
        controls: {
            include: ["value", "fractionLength", "currency", "currencyTitle", "adaptive"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: (args) => {
        return (
            <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                <Amount {...args} />
            </Text>
        );
    },
};

export const Default: Story = {
    args: {
        value: "8967452.31",
        currency: "RUB",
        currencyTitle: "Российские рубли",
        fractionLength: 2,
        adaptive: false,
    },
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

export const Example: Story = {
    args: {
        value: "8967452.31",
        currency: "RUB",
        currencyTitle: "Российские рубли",
        fractionLength: 2,
        adaptive: false,
    },
    render: ShowcaseExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ShowcaseExampleSource,
                language: "tsx",
            },
        },
    },
};
