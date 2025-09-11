import React from "react";
import { LoaderSmall, ELoaderSmallTheme, ELoaderSmallSize } from "../src/components/Loader";
import { StoryObj } from "@storybook/react";
import { Col } from "../src/components/Col";

export default {
    title: "Components/Loaders/LoaderSmall",
    component: LoaderSmall,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент горизонтального загрузчика с анимированными точками.

## Особенности

- **Темы**: Brand, Neutral
- **Размеры**: Small (SM), Medium (MD), Large (LG)

## Использование

\`\`\`tsx
import { LoaderSmall, ELoaderSmallTheme, ELoaderSmallSize } from '@sberbusiness/triplex-next';

// Основной загрузчик
<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.MD} />
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof LoaderSmall> = {
    name: "Playground",
    args: {
        theme: ELoaderSmallTheme.BRAND,
        size: ELoaderSmallSize.MD,
    },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: Object.values(ELoaderSmallTheme),
            description: "Тема",
        },
        size: {
            control: { type: "select" },
            options: Object.values(ELoaderSmallSize),
            description: "Размер",
        },
    },
    decorators: [
        (Story) => {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#C4C4C4",
                        padding: "16px",
                        maxWidth: "50px",
                    }}
                >
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => <LoaderSmall {...args} />,
};

export const Default: StoryObj<typeof LoaderSmall> = {
    name: "Default",
    args: {
        theme: ELoaderSmallTheme.BRAND,
        size: ELoaderSmallSize.MD,
    },
    argTypes: {
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#C4C4C4",
                        padding: "16px",
                        maxWidth: "50px",
                    }}
                >
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => <LoaderSmall {...args} />,
};

export const DifferentThemes: StoryObj<typeof LoaderSmall> = {
    name: "Different Themes",
    argTypes: {
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#C4C4C4",
                        padding: "16px",
                        maxWidth: "100px",
                    }}
                >
                    <Story />
                </div>
            );
        },
    ],
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.MD} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={ELoaderSmallSize.MD} />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Доступные темы",
            },
        },
    },
};

export const DifferentSizes: StoryObj<typeof LoaderSmall> = {
    name: "Different Sizes",
    argTypes: {
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#C4C4C4",
                        padding: "16px",
                        maxWidth: "200px",
                    }}
                >
                    <Story />
                </div>
            );
        },
    ],
    render: () => (
        <Col>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
                <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.SM} />
                <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.MD} />
                <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.LG} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
                <LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={ELoaderSmallSize.SM} />
                <LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={ELoaderSmallSize.MD} />
                <LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={ELoaderSmallSize.LG} />
            </div>
        </Col>
    ),
    parameters: {
        docs: {
            description: {
                story: "Доступные размеры",
            },
        },
    },
};
