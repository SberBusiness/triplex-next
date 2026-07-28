import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Row, EComponentSize } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    GridHorizontalGaps as GridHorizontalGapsRender,
    GridHorizontalGapsSource,
    WithoutPaddingBottom as WithoutPaddingBottomRender,
    WithoutPaddingBottomSource,
} from "./examples";

const meta = {
    title: "Components/Row",
    component: Row,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Строка сетки, принимающая в children только компоненты Col.

## Особенности

- Принимает только компоненты Col в качестве children.
- Имеет нижний отступ по умолчанию, отключается через **paddingBottom**.
- Размер отступа между колонками задаётся через **gridHorizontalGap** и передаётся в Col через контекст.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Row} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Row>;

export default meta;

type Story = StoryObj<typeof Row>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        paddingBottom: true,
        gridHorizontalGap: EComponentSize.SM,
    },
    argTypes: {
        paddingBottom: {
            control: { type: "boolean" },
            description: "Вертикальный нижний отступ",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        gridHorizontalGap: {
            control: { type: "select" },
            options: [EComponentSize.SM, EComponentSize.MD],
            description: "Размер отступа между колонками",
            table: {
                type: { summary: "EComponentSize.SM | EComponentSize.MD" },
                defaultValue: { summary: "EComponentSize.SM" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["paddingBottom", "gridHorizontalGap"],
        },
        testRunner: { skip: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Строки с параметрами по умолчанию: нижний отступ включён, отступ между колонками SM.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const GridHorizontalGaps: Story = {
    render: GridHorizontalGapsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Строки с различными размерами отступа между колонками.",
            },
            source: {
                code: GridHorizontalGapsSource,
                language: "tsx",
            },
        },
    },
};

export const WithoutPaddingBottom: Story = {
    render: WithoutPaddingBottomRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Строки без нижнего отступа (paddingBottom={false}) прижаты друг к другу; последняя строка — с отступом по умолчанию.",
            },
            source: {
                code: WithoutPaddingBottomSource,
                language: "tsx",
            },
        },
    },
};
