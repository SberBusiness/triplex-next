import React from "react";
import { AlertContext } from "../src/components/Alert/AlertContext/AlertContext";
import { StoryObj } from "@storybook/react";
import { EAlertType } from "../src/components/Alert/EAlertType";
import { WaitStrokeStsIcon16 } from "@sberbusiness/icons-next";

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
        },
    },
};

export const Playground: StoryObj<typeof AlertContext> = {
    name: "Playground",
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
        renderIcon: {
            table: {
                disable: true,
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
};

export const Default: StoryObj<typeof AlertContext> = {
    name: "Default",
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
    },
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
    },
};

export const DifferentTypes: StoryObj<typeof AlertContext> = {
    name: "Different Types",
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
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
    parameters: {
        docs: {
            description: {
                story: "Компонент разных типов.",
            },
        },
    },
};

export const WithCustomIcon: StoryObj<typeof AlertContext> = {
    name: "With Custom Icon",
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
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
    parameters: {
        docs: {
            description: {
                story: "Компонент с иконкой, переданной через свойство renderIcon.",
            },
        },
    },
};
