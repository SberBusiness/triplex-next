import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { AlertProcess, EAlertProcessBorderRadius, EAlertType } from "@sberbusiness/triplex-next";
import {
    Title,
    Description,
    Primary,
    Controls,
    Stories,
    ArgTypes,
    Heading,
    Subheading,
} from "@storybook/addon-docs/blocks";
import {
    ClosableExample,
    ClosableExampleSource,
    DefaultExample,
    DefaultExampleSource,
    PlaygroundExample,
    TypesExample,
    TypesExampleSource,
    WithButtonLinkExample,
    WithButtonLinkExampleSource,
    WithCustomIconExample,
    WithCustomIconExampleSource,
    WithLinkExample,
    WithLinkExampleSource,
    WithSpoilerExample,
    WithSpoilerExampleSource,
    BorderRadiusExample,
    BorderRadiusExampleSource,
} from "./examples/AlertProcess";

const meta = {
    title: "Components/Alerts/AlertProcess",
    component: AlertProcess,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент процессного предупреждения с возможностью скрытия/раскрытия контента.

## Особенности

- Компонент не задает размеры или цвет текста. Контент передается с нужными компонентами Typography.
- Передать контент для спойлера можно через компонент **AlertProcess.Spoiler**.
- Передать кастомную иконку можно через свойство **renderIcon**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <Subheading>AlertProcess</Subheading>
                    <ArgTypes of={AlertProcess} />
                    <Subheading>AlertProcess.Spoiler</Subheading>
                    <ArgTypes of={AlertProcess.Spoiler} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof AlertProcess>;

export default meta;

type Story = StoryObj<typeof AlertProcess>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
        closable: false,
        onClose: action("onClose"),
        borderRadius: EAlertProcessBorderRadius.MD,
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
        closable: {
            control: { type: "boolean" },
            description: "Возможность закрытия предупреждения",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        children: {
            control: { type: "text" },
            description: "Содержимое предупреждения (используйте Typography компоненты)",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        borderRadius: {
            control: { type: "select" },
            options: Object.values(EAlertProcessBorderRadius),
            description: "Вариант скругления визуальной формы",
            table: {
                type: { summary: "EAlertProcessBorderRadius" },
                defaultValue: { summary: EAlertProcessBorderRadius.MD },
            },
        },
    },
    parameters: {
        controls: {
            include: ["type", "closable", "children", "borderRadius"],
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
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
        closable: false,
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
        closable: false,
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

export const BorderRadius: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
        closable: false,
        borderRadius: EAlertProcessBorderRadius.MD,
    },
    render: BorderRadiusExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: BorderRadiusExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomIcon: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
        closable: false,
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

export const Closable: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
        closable: true,
    },
    render: ClosableExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ClosableExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithButtonLink: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
        closable: false,
    },
    render: WithButtonLinkExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithButtonLinkExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithLink: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
        closable: false,
    },
    render: WithLinkExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithLinkExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithSpoiler: Story = {
    args: {
        children: "This message provides context or highlights important information to note.",
        type: EAlertType.INFO,
        closable: false,
    },
    render: WithSpoilerExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithSpoilerExampleSource,
                language: "tsx",
            },
        },
    },
};
