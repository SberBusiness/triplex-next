import React from "react";
import { Skeleton, ESkeletonType } from "../../src/components/Skeleton";
import { StoryObj } from "@storybook/react";
import "./Skeleton.less";

export default {
    title: "Components/Loaders/Skeleton",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Элемент для визуализации содержимого, которое еще не загрузилось.

## Особенности

- **Типы**: Dark, Light
- Размер скелетона определяет родительский контейнер или переданный className

## Использование

\`\`\`tsx
import { Skeleton, ESkeletonType } from '@sberbusiness/triplex-next';

// Базовый скелетон
<Skeleton />

// Светлый скелетон
<Skeleton type={ESkeletonType.LIGHT} />

// Скелетон с переданным CSS классом
<Skeleton className="custom-skeleton" />
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Skeleton> = {
    name: "Playground",
    args: {
        type: ESkeletonType.DARK,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(ESkeletonType),
            description: "Тип скелетона",
            table: {
                defaultValue: { summary: ESkeletonType.DARK },
                type: { summary: "ESkeletonType" },
            },
        },
    },
    render: (args) => (
        <div className="skeleton-example">
            <div className="skeleton-example-left">
                <ul className="skeleton-example-list">
                    <li>
                        <span>
                            <Skeleton {...args} />
                        </span>
                        <div>
                            <Skeleton {...args} />
                        </div>
                    </li>
                    <li>
                        <span>
                            <Skeleton {...args} />
                        </span>
                        <div>
                            <Skeleton {...args} />
                        </div>
                    </li>
                    <li>
                        <span>
                            <Skeleton {...args} />
                        </span>
                        <div>
                            <Skeleton {...args} />
                        </div>
                    </li>
                    <li>
                        <span>
                            <Skeleton {...args} />
                        </span>
                        <div>
                            <Skeleton {...args} />
                        </div>
                    </li>
                </ul>
            </div>
            <div className="skeleton-example-right">
                <div className="skeleton-example-grid">
                    <div>
                        <Skeleton {...args} />
                    </div>
                    <div>
                        <Skeleton {...args} />
                    </div>
                    <div>
                        <Skeleton {...args} />
                    </div>
                    <div>
                        <Skeleton {...args} />
                    </div>
                </div>
            </div>
        </div>
    ),
};

export const Default: StoryObj<typeof Skeleton> = {
    name: "Default",
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
    },
    render: () => (
        <div className="skeleton-example-default">
            <div className="skeleton-example-grid">
                <div>
                    <Skeleton />
                </div>
                <div>
                    <Skeleton />
                </div>
                <div>
                    <Skeleton />
                </div>
                <div>
                    <Skeleton />
                </div>
            </div>
        </div>
    ),
};

export const LightBackground: StoryObj<typeof Skeleton> = {
    name: "Light Background",
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <div className="skeleton-example-gray">
            <div className="skeleton-example-grid">
                <div>
                    <Skeleton {...args} />
                </div>
                <div>
                    <Skeleton {...args} />
                </div>
                <div>
                    <Skeleton {...args} />
                </div>
                <div>
                    <Skeleton {...args} />
                </div>
            </div>
        </div>
    ),
};
