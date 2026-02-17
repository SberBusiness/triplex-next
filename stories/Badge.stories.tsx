import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { NewsmallFilledSrvIcon16, NewsmallFilledSrvIcon24 } from "@sberbusiness/icons-next";
import { Title, Description, ArgTypes, Primary, Controls, Stories, Heading } from "@storybook/addon-docs/blocks";
import { Badge, Text, EComponentSize, EFontType, ETextSize, EFontWeightText } from "../src";

const meta = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        docs: {
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
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: { story: "Интерактивная демонстрация." },
            canvas: { sourceState: "none" },
        },
    },
    tags: ["!autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: {
                type: { summary: "EComponentSize" },
            },
        },
    },
    args: {
        size: EComponentSize.LG,
        children: "",
    },
    render: (args) => <Badge {...args} />,
};

export const Default: Story = {
    parameters: {
        docs: {
            description: { story: "Базовый пример." },
            controls: { disable: true },
        },
    },
    args: {
        size: EComponentSize.LG,
    },
    render: (args) => <Badge {...args} />,
};

export const Sizes: Story = {
    parameters: {
        docs: { description: { story: "Размеры" } },
        controls: { disable: true },
    },
    args: {
        size: EComponentSize.LG,
    },
    render: (args) => {
        const sizes = Object.values(EComponentSize);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sizes.map((size) => (
                    <Badge key={size} {...args} size={size} />
                ))}
            </div>
        );
    },
};

export const Example: Story = {
    parameters: {
        docs: { description: { story: "В сочетании с другими компонентами." } },
        controls: { disable: true },
    },
    args: {
        size: EComponentSize.LG,
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Badge size={EComponentSize.SM} style={{ backgroundColor: "#339FF1" }}>
                <NewsmallFilledSrvIcon16 paletteIndex={7} />
            </Badge>
            <Badge size={EComponentSize.MD}>
                <Text
                    size={ETextSize.B3}
                    weight={EFontWeightText.REGULAR}
                    type={EFontType.PRIMARY_INVERT}
                    style={{ padding: "0px 6px" }}
                >
                    Новое
                </Text>
            </Badge>
            <Badge size={EComponentSize.LG} style={{ backgroundColor: "#339FF1" }}>
                <NewsmallFilledSrvIcon24 paletteIndex={7} />
                <Text
                    size={ETextSize.B3}
                    weight={EFontWeightText.REGULAR}
                    type={EFontType.PRIMARY_INVERT}
                    style={{ padding: "2px 8px 2px 0px" }}
                >
                    Новинка
                </Text>
            </Badge>
        </div>
    ),
};
