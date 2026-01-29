import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Avatar, EAvatarSize } from "../src/components/Avatar";
import { Title as TypographyTitle, ETitleSize, EFontType, EFontWeightTitle } from "../src/components/Typography";

const meta = {
    title: "Components/Avatar",
    component: Avatar,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Title>Props</Title>
                    <ArgTypes of={Avatar} />
                    <Title>Playground</Title>
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
        docs: {
            description: { story: "Интерактивная демонстрация." },
            canvas: { sourceState: "none" },
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
    render: (args) => <Avatar {...args} />,
};

export const Basic: Story = {
    parameters: {
        docs: {
            description: { story: "Базовый пример." },
            controls: { disable: true },
        },
    },
    args: {
        size: EAvatarSize.XXL,
    },
    render: (args) => <Avatar {...args} />,
};

export const Sizes: Story = {
    parameters: {
        docs: { description: { story: "Размеры" } },
        controls: { disable: true },
    },
    args: {
        size: EAvatarSize.XXL,
    },
    render: () => {
        const sizes = Object.values(EAvatarSize);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sizes.map((size) => (
                    <Avatar key={size} size={size} />
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
        size: EAvatarSize.XXL,
    },
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Avatar style={{ backgroundImage: "url(assets/images/avatar.png)", backgroundSize: "contain" }} {...args} />
            <Avatar style={{ backgroundColor: "#339FF1" }} {...args}>
                <TypographyTitle
                    // TODO: Заменить на новый тип, когда его добавят
                    type={EFontType.PRIMARY}
                    size={ETitleSize.H1}
                    weight={EFontWeightTitle.REGULAR}
                    style={{ color: "#FFFFFF" }}
                >
                    AA
                </TypographyTitle>
            </Avatar>
        </div>
    ),
};
