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
            include: ["size"],
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
    },
    args: {
        size: EAvatarSize.XXL,
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
