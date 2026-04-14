import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { ButtonIcon, EButtonIconShape } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    PlaygroundExample,
    DisabledExample,
    DisabledExampleSource,
    SizesExample,
    SizesExampleSource,
} from "./examples/ButtonIcon/index";

const meta = {
    title: "Components/Buttons/ButtonIcon",
    component: ButtonIcon,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент кнопка-иконка.

## Особенности

- Размер кнопки определяется размером переданной в нее иконки.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ButtonIcon} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ButtonIcon>;

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        active: false,
        disabled: false,
        shape: EButtonIconShape.SQUIRCLE,
        onClick: action("On Click"),
    },
    argTypes: {
        shape: {
            control: { type: "select" },
            options: [EButtonIconShape.CIRCLE, EButtonIconShape.SQUIRCLE],
            description: "Форма кнопки",
            table: {
                type: { summary: "EButtonIconShape" },
                defaultValue: { summary: EButtonIconShape.SQUIRCLE },
            },
        },
        active: {
            control: { type: "boolean" },
            description: "Активное состояние",
            table: {
                type: { summary: "boolean" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Отключенное состояние",
            table: {
                type: { summary: "boolean" },
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        controls: {
            include: ["shape", "active", "disabled"],
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

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Кнопка-иконка разных размеров (16, 20, 24, 32)",
            },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Disabled: Story = {
    render: DisabledExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DisabledExampleSource,
                language: "tsx",
            },
        },
    },
};
