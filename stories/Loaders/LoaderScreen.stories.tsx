import React from "react";
import { LoaderScreen } from "../../src/components/LoaderScreen";
import { ELoaderSmallTheme, ELoaderSmallSize } from "../../src/components/Loader";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Loaders/LoaderScreen",
    component: LoaderScreen,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Лоадер виждет, закрывает контент и отображает лоадер в середине своей области.

## Особенности

- Для использования с loaderSmall необходимо передать тему и размер

## Использование

\`\`\`tsx
import { LoaderScreen } from '@sberbusiness/triplex-next';

// LoaderScreen с loaderSmall
<LoaderScreen type="small" theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.MD} />

// LoaderScreen с loaderMiddle
<LoaderScreen type="middle" />
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof LoaderScreen> = {
    name: "Playground",
    args: {
        type: "small",
        theme: ELoaderSmallTheme.BRAND,
        size: ELoaderSmallSize.MD,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: ["small", "middle"],
            description: "Тип лоадера",
        },
        theme: {
            control: { type: "select" },
            options: Object.values(ELoaderSmallTheme),
            description: "Тема (только для типа small)",
            if: { arg: "type", eq: "small" },
        },
        size: {
            control: { type: "select" },
            options: Object.values(ELoaderSmallSize),
            description: "Размер (только для типа small)",
            if: { arg: "type", eq: "small" },
        },
    },
    decorators: [
        (Story) => {
            return (
                <div style={{ position: "relative", height: "200px" }}>
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => <LoaderScreen {...args} />,
};

export const SmallLoader: StoryObj<typeof LoaderScreen> = {
    name: "Small Loader",
    args: {
        type: "small",
        theme: ELoaderSmallTheme.BRAND,
        size: ELoaderSmallSize.MD,
    },
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        theme: {
            table: {
                disable: true,
            },
        },
        size: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <div style={{ position: "relative", height: "200px" }}>
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => <LoaderScreen {...args} />,
};

export const MiddleLoader: StoryObj<typeof LoaderScreen> = {
    name: "Middle Loader",
    args: {
        type: "middle",
    },
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        theme: {
            table: {
                disable: true,
            },
        },
        size: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <div style={{ position: "relative", height: "200px" }}>
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => <LoaderScreen {...args} />,
};
