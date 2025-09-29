import React from "react";
import { LoaderWidget } from "../../src/components/LoaderWidget";
import { ELoaderSmallTheme, ELoaderSmallSize } from "../../src/components/Loader";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Loaders/LoaderWidget",
    component: LoaderWidget,
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
import { LoaderWidget } from '@sberbusiness/triplex-next';

// LoaderWidget с loaderSmall
<LoaderWidget type="small" theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.MD} />

// LoaderWidget с loaderMiddle
<LoaderWidget type="middle" />
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof LoaderWidget> = {
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
                    <div>Контент под лоадером</div>
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => <LoaderWidget {...args} />,
};

export const SmallLoader: StoryObj<typeof LoaderWidget> = {
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
                    <div>Контент под лоадером</div>
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => <LoaderWidget {...args} />,
};

export const MiddleLoader: StoryObj<typeof LoaderWidget> = {
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
                    <div>Контент под лоадером</div>
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => <LoaderWidget {...args} />,
};
