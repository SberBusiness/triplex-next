import React from "react";
import { AlertContext } from "../../src/components/Alert/AlertContext/AlertContext";
import { StoryObj } from "@storybook/react";
import { EAlertType } from "../../src/components/Alert/EAlertType";
import { WaitStrokeStsIcon16 } from "@sberbusiness/icons-next";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Alerts/AlertContext",
    component: AlertContext,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент контекстного предупреждения.

## Особенности

- **Типы**: Info, Warning, Error, System
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <h2>Props</h2>
                    <ArgTypes of={AlertContext} />
                    <h2>Playground</h2>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof AlertContext> = {
    name: "Playground",
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
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
};

export const Default: StoryObj<typeof AlertContext> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
    },
};

export const DifferentTypes: StoryObj<typeof AlertContext> = {
    name: "Different Types",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Компонент разных типов.",
            },
        },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <AlertContext type={EAlertType.INFO}>
                This message provides context or highlights important information to note.
            </AlertContext>
            <AlertContext type={EAlertType.WARNING}>
                This message provides context or highlights important information to note.
            </AlertContext>
            <AlertContext type={EAlertType.ERROR}>
                This message provides context or highlights important information to note.
            </AlertContext>
            <AlertContext type={EAlertType.SYSTEM}>
                This message provides context or highlights important information to note.
            </AlertContext>
        </div>
    ),
};

export const WithCustomIcon: StoryObj<typeof AlertContext> = {
    name: "With Custom Icon",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Компонент с иконкой, переданной через свойство renderIcon.",
            },
        },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <AlertContext type={EAlertType.INFO} renderIcon={<WaitStrokeStsIcon16 paletteIndex={4} />}>
                This message provides context or highlights important information to note.
            </AlertContext>
        </div>
    ),
};
