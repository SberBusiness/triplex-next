import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { AlertContext, EAlertType } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    PlaygroundExample,
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

- Рендерится как live-region (**role="alert"**) — текст озвучивается скринридером при появлении.
- Иконка по умолчанию выбирается по свойству **type**.
- Передать кастомную иконку можно через свойство **renderIcon**.
- Поддерживаются типы **info**, **warning**, **error**, **system**. Тип **feature** не поддерживается.
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

/** Типы, поддерживаемые AlertContext (EAlertType.FEATURE исключён типом свойства type). */
const TYPE_OPTIONS = Object.values(EAlertType).filter((type) => type !== EAlertType.FEATURE);

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: TYPE_OPTIONS,
            description: "Тип предупреждения. EAlertType.FEATURE не поддерживается.",
            table: {
                type: { summary: "Exclude<EAlertType, EAlertType.FEATURE>" },
            },
        },
        children: {
            control: { type: "text" },
            description: "Текст предупреждения",
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

export const Types: Story = {
    render: TypesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Все поддерживаемые типы предупреждения. Тип EAlertType.FEATURE исключён типом свойства type.",
            },
            source: {
                code: TypesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomIcon: Story = {
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
