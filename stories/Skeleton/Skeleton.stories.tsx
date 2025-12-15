import React from "react";
import { Controls, Description, Primary, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { Skeleton, ESkeletonType } from "../../src/components/Skeleton";
import { StoryObj } from "@storybook/react";
import "./Skeleton.less";

export default {
    title: "Components/Loaders/Skeleton",
    component: Skeleton,
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
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Playground} />
                </>
            ),
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
    parameters: {
        controls: {
            include: ["type"],
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
                        <Skeleton {...args} />
                    </li>
                    <li>
                        <span>
                            <Skeleton {...args} />
                        </span>
                        <Skeleton {...args} />
                    </li>
                    <li>
                        <span>
                            <Skeleton {...args} />
                        </span>
                        <Skeleton {...args} />
                    </li>
                    <li>
                        <span>
                            <Skeleton {...args} />
                        </span>
                        <Skeleton {...args} />
                    </li>
                </ul>
            </div>
            <div className="skeleton-example-right">
                <div className="skeleton-example-grid">
                    <Skeleton {...args} />
                    <Skeleton {...args} />
                    <Skeleton {...args} />
                    <Skeleton {...args} />
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
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="skeleton-example-default">
            <div className="skeleton-example-grid">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
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
    parameters: {
        controls: { disable: true },
    },
    render: (args) => (
        <div className="skeleton-example-gray">
            <div className="skeleton-example-grid">
                <Skeleton {...args} />
                <Skeleton {...args} />
                <Skeleton {...args} />
                <Skeleton {...args} />
            </div>
        </div>
    ),
};
