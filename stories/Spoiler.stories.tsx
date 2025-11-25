import React from "react";
import { StoryObj } from "@storybook/react";
import { EComponentSize } from "../src/enums";
import { Spoiler } from "../src/components/Spoiler";
import { Text, ETextSize, EFontType } from "../src/components/Typography";

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
    args: {
        labelExpand: "Развернуть",
        labelCollapse: "Свернуть",
        size: EComponentSize.MD,
    },
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        labelExpand: {
            table: {
                disable: true,
            },
        },
        labelCollapse: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <Spoiler {...args}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Скрытый контент
            </Text>
        </Spoiler>
    ),
};

export const DifferentSizes: StoryObj<typeof Spoiler> = {
    name: "Different Sizes",
    args: {
        labelExpand: "Развернуть",
        labelCollapse: "Свернуть",
    },
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        labelExpand: {
            table: {
                disable: true,
            },
        },
        labelCollapse: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <>
            <Spoiler size={EComponentSize.SM} {...args}>
                <Text size={ETextSize.B4} type={EFontType.PRIMARY}>
                    Скрытый контент
                </Text>
            </Spoiler>
            <Spoiler size={EComponentSize.MD} {...args}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    Скрытый контент
                </Text>
            </Spoiler>
            <Spoiler size={EComponentSize.LG} {...args}>
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
        labelExpand: "Развернуть",
        labelCollapse: "Свернуть",
        size: EComponentSize.MD,
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
        size: {
            table: {
                disable: true,
            },
        },
        labelExpand: {
            table: {
                disable: true,
            },
        },
        labelCollapse: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <Spoiler {...args}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Скрытый контент
            </Text>
        </Spoiler>
    ),
};
