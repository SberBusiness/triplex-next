import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Controls, Stories, ArgTypes, Heading, Primary } from "@storybook/addon-docs/blocks";
import { Chip, EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    StatesExample,
    StatesExampleSource,
    WithPrefixAndPostfixExample,
    WithPrefixAndPostfixExampleSource,
} from "./examples/Chip";

const meta = {
    title: "Components/Chips/Chip",
    component: Chip,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент предоставляет возможность произвести действие по нажатию, а также отображает выбранное состояние.

## Особенности:

- prefix и postfix можно передать через одноименные свойства.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Chip} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
    tags: ["!autodocs"],
    render: (args) => {
        const [selected, setSelected] = useState(false);
        const handleClick = () => setSelected((s) => !s);
        return (
            <Chip {...args} selected={selected} onClick={handleClick}>
                Value
            </Chip>
        );
    },
    args: {
        size: EComponentSize.MD,
        disabled: false,
        showNotificationIcon: false,
    },
    argTypes: {
        size: { control: { type: "select" }, options: Object.values(EComponentSize) },
        disabled: { control: { type: "boolean" } },
        showNotificationIcon: { control: { type: "boolean" } },
    },
    parameters: {
        controls: {
            include: ["size", "disabled", "showNotificationIcon"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<typeof Chip> = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: SizesExampleSource, language: "tsx" } },
    },
};

export const States: Story = {
    render: StatesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: StatesExampleSource, language: "tsx" } },
    },
};

export const WithPrefixAndPostfix: Story = {
    render: WithPrefixAndPostfixExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: WithPrefixAndPostfixExampleSource, language: "tsx" } },
    },
};

export const WithNotificationIcon: StoryObj<typeof Chip> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div style={{ display: "flex", gap: 12 }}>
            <Chip size={EComponentSize.SM} showNotificationIcon>
                SM
            </Chip>
            <Chip size={EComponentSize.MD} showNotificationIcon>
                MD
            </Chip>
            <Chip size={EComponentSize.LG} showNotificationIcon>
                LG
            </Chip>
        </div>
    ),
};
