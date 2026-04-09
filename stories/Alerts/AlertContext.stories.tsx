import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { AlertContext, EAlertType } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    TypesExample,
    TypesExampleSource,
    WithCustomIconExample,
    WithCustomIconExampleSource,
} from "./examples/AlertContext";

const meta = {
    title: "Components/Alerts/AlertContext",
    component: AlertContext,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент контекстного предупреждения.

## Особенности

- Передать кастомную иконку можно через свойство **renderIcon**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={AlertContext} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof AlertContext>;

export default meta;

type Story = StoryObj<typeof AlertContext>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EAlertType),
            description: "Тип предупреждения",
            table: {
                type: { summary: "EAlertType" },
            },
        },
        children: {
            control: { type: "text" },
            description: "Текст сообщения",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["type", "children"],
        },
        testRunner: { skip: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
};

export const Default: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
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

export const Types: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
    },
    render: TypesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomIcon: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
    },
    render: WithCustomIconExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Компонент с иконкой, переданной через свойство renderIcon.",
            },
            source: {
                code: WithCustomIconExampleSource,
                language: "tsx",
            },
        },
    },
};
