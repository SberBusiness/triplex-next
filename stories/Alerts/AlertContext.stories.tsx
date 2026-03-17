import React from "react";
import { AlertContext } from "../../src/components/Alert";
import { StoryObj } from "@storybook/react";
import { EAlertType } from "../../src/components/Alert/EAlertType";
import { WaitStrokeStsIcon16 } from "@sberbusiness/icons-next";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Alerts/AlertContext",
    component: AlertContext,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
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
};

export const Playground: StoryObj<typeof AlertContext> = {
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
    parameters: {
        controls: { disable: true },
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
