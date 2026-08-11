import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
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
import { AlertProcess, EAlertProcessBorderRadius, EAlertType } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Types as TypesRender,
    TypesSource,
    BorderRadius as BorderRadiusRender,
    BorderRadiusSource,
    WithCustomIcon as WithCustomIconRender,
    WithCustomIconSource,
    Closable as ClosableRender,
    ClosableSource,
    WithButtonLink as WithButtonLinkRender,
    WithButtonLinkSource,
    WithLink as WithLinkRender,
    WithLinkSource,
    WithSpoiler as WithSpoilerRender,
    WithSpoilerSource,
    VisualTests as VisualTestsRender,
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
- Закрытие не управляется извне: по клику на крестик компонент скрывает себя сам и затем вызывает **onClose**.
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
    render: PlaygroundRender,
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Types: Story = {
    render: TypesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Все типы предупреждения. Тип определяет фон блока и иконку по умолчанию.",
            },
            source: {
                code: TypesSource,
                language: "tsx",
            },
        },
    },
};

export const BorderRadius: Story = {
    render: BorderRadiusRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Варианты скругления визуальной формы, задаются свойством borderRadius.",
            },
            source: {
                code: BorderRadiusSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomIcon: Story = {
    render: WithCustomIconRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Компонент с иконкой, переданной через свойство renderIcon.",
            },
            source: {
                code: WithCustomIconSource,
                language: "tsx",
            },
        },
    },
};

export const Closable: Story = {
    render: ClosableRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Предупреждение с кнопкой закрытия. Компонент скрывает себя сам и затем вызывает onClose.",
            },
            source: {
                code: ClosableSource,
                language: "tsx",
            },
        },
    },
};

export const WithButtonLink: Story = {
    render: WithButtonLinkRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithButtonLinkSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
};

export const WithLink: Story = {
    render: WithLinkRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithLinkSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
};

export const WithSpoiler: Story = {
    render: WithSpoilerRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Раскрывающийся блок AlertProcess.Spoiler. Состояние открытия хранит потребитель.",
            },
            source: {
                code: WithSpoilerSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
};
