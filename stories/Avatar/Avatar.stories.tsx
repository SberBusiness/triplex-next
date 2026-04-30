import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Primary, Controls, Stories, Heading } from "@storybook/addon-docs/blocks";
import { Avatar, EAvatarSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    ExampleUsage,
    ExampleUsageSource,
    PlaygroundExample,
    SizesExample,
    SizesExampleSource,
    BorderRadiusExample,
    BorderRadiusExampleSource,
} from "./examples";

const meta = {
    title: "Components/Avatar",
    component: Avatar,
    parameters: {
        docs: {
            description: {
                component: `
Компонент предназначен для отображения изображений профиля пользователя, инициалов или иконок.

## Особенности

- **Размеры**: XXS, XS, SM, MD, LG, XL, XXL
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Avatar} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["size", "borderRadius"],
        },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    tags: ["!autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EAvatarSize),
            table: {
                type: { summary: "EAvatarSize" },
            },
        },
        borderRadius: {
            control: { type: "select" },
            options: [10, 12, 14],
            table: {
                type: { summary: "TAvatarBorderRadius" },
                defaultValue: { summary: "12" },
            },
        },
    },
    args: {
        size: EAvatarSize.XXL,
        borderRadius: 12,
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
    args: {
        size: EAvatarSize.XXL,
    },
    render: DefaultExample,
};

export const Sizes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
    args: {
        size: EAvatarSize.XXL,
    },
    render: SizesExample,
};

export const BorderRadius: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: BorderRadiusExampleSource,
                language: "tsx",
            },
        },
    },
    args: {
        size: EAvatarSize.XXL,
        borderRadius: 10,
    },
    render: BorderRadiusExample,
};

export const Example: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "В сочетании с другими компонентами." },
            source: {
                code: ExampleUsageSource,
                language: "tsx",
            },
        },
    },
    args: {
        size: EAvatarSize.XXL,
    },
    render: ExampleUsage,
};
