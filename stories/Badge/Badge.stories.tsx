import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Stories, Heading, Controls, Primary } from "@storybook/addon-docs/blocks";
import { Badge, EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    DotSizesExample,
    DotSizesExampleSource,
    PlaygroundExample,
    ProductionExample,
    ProductionExampleSource,
    SizesExample,
    SizesExampleSource,
    WithPrefixAndPostfixExample,
    WithPrefixAndPostfixExampleSource,
} from "./examples";

const meta = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        docs: {
            description: {
                component: `
Компонент-индикатор статуса или уведомления.

## Особенности

- prefix и postfix можно передать через одноименные свойства.
- Для отображения индикатора-точки используется компонент **Badge.Dot**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Badge} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
    tags: ["!autodocs"],
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
    args: {
        size: EComponentSize.MD,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: {
                type: { summary: "EComponentSize" },
            },
        },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    args: {
        size: EComponentSize.MD,
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

export const Sizes: Story = {
    args: {
        size: EComponentSize.MD,
    },
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Размеры компонента Badge." },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithPrefixAndPostfix: Story = {
    args: {
        size: EComponentSize.MD,
    },
    render: WithPrefixAndPostfixExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithPrefixAndPostfixExampleSource,
                language: "tsx",
            },
        },
    },
};

export const DotSizes: StoryObj<typeof Badge.Dot> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Размеры компонента BadgeDot." },
            source: {
                code: DotSizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: DotSizesExample,
};

export const Example: Story = {
    args: {
        size: EComponentSize.MD,
    },
    render: ProductionExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionExampleSource,
                language: "tsx",
            },
        },
    },
};
