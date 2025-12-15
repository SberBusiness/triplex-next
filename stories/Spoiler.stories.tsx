import React from "react";
import { StoryObj } from "@storybook/react";
import { EComponentSize } from "../src/enums";
import { Spoiler } from "../src/components/Spoiler";
import { Text, ETextSize, EFontType } from "../src/components/Typography";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Spoiler",
    component: Spoiler,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент используется для раскрытия внутреннего содержимого.

Особенности:
- Размеры - small (SM), medium (MD), large (LG)
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
};

const sizeToTextSizeMap = {
    [EComponentSize.SM]: ETextSize.B4,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.LG]: ETextSize.B2,
};

export const Playground: StoryObj<typeof Spoiler> = {
    name: "Playground",
    args: {
        labelExpand: "Развернуть",
        labelCollapse: "Свернуть",
        size: EComponentSize.MD,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер спойлера",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        labelExpand: {
            control: { type: "text" },
            description: "Текст кнопки раскрытия содержимого",
        },
        labelCollapse: {
            control: { type: "text" },
            description: "Текст кнопки скрытия содержимого",
        },
    },
    parameters: {
        controls: {
            include: ["size", "labelExpand", "labelCollapse"],
        },
    },
    render: (args) => (
        <Spoiler {...args}>
            <Text size={sizeToTextSizeMap[args.size!]} type={EFontType.PRIMARY}>
                Скрытый контент
            </Text>
        </Spoiler>
    ),
};

export const Default: StoryObj<typeof Spoiler> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть" size={EComponentSize.MD}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Скрытый контент
            </Text>
        </Spoiler>
    ),
};

export const DifferentSizes: StoryObj<typeof Spoiler> = {
    name: "Different Sizes",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <>
            <Spoiler size={EComponentSize.SM} labelExpand="Развернуть" labelCollapse="Свернуть">
                <Text size={ETextSize.B4} type={EFontType.PRIMARY}>
                    Скрытый контент
                </Text>
            </Spoiler>
            <Spoiler size={EComponentSize.MD} labelExpand="Развернуть" labelCollapse="Свернуть">
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    Скрытый контент
                </Text>
            </Spoiler>
            <Spoiler size={EComponentSize.LG} labelExpand="Развернуть" labelCollapse="Свернуть">
                <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Скрытый контент
                </Text>
            </Spoiler>
        </>
    ),
};

export const Controlled: StoryObj<typeof Spoiler> = {
    name: "Controlled",
    args: {
        expanded: false,
    },
    argTypes: {
        expanded: {
            control: { type: "boolean" },
            description: "Состояние спойлера",
            table: {
                type: { summary: "boolean" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["expanded"],
        },
    },
    render: (args) => (
        <Spoiler {...args} labelExpand="Развернуть" labelCollapse="Свернуть" size={EComponentSize.MD}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Скрытый контент
            </Text>
        </Spoiler>
    ),
};
