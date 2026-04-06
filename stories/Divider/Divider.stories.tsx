import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Divider, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource } from "./examples/index";

const meta = {
    title: "Components/Divider",
    component: Divider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент визуального разделения контента.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Divider} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        marginTopSize: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 20, 24, 28, 32],
            description: "Отступ сверху",
        },
        marginBottomSize: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 20, 24, 28, 32],
            description: "Отступ снизу",
        },
    },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: { marginTopSize: 24, marginBottomSize: 16 },
    parameters: {
        controls: { include: ["marginTopSize", "marginBottomSize"] },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
    render: (args) => (
        <div style={{ maxWidth: 600 }}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </Text>
            <Divider {...args} />
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </Text>
            <Divider {...args} />
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
            </Text>
        </div>
    ),
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};
