import React from "react";
import { Ellipsis } from "../src/components";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Ellipsis",
    component: Ellipsis,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент, для сворачивания в многоточие текста, который не поместился в заданное количество строк. Данному компоненту нельзя устанавливать паддинги, так как реализация через CSS свойство line-clamp, и если установить паддинги то в них будет видно часть спрятанного текста.

## Использование

\`\`\`tsx
import { Ellipsis } from '@sberbusiness/triplex-next';

<Ellipsis maxLines={2}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</Ellipsis>
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Ellipsis> = {
    name: "Playground",
    args: {
        maxLines: 2,
    },
    argTypes: {
        maxLines: {
            control: { type: "number" },
            description: "Количество строк, после которых происходит сворачивание в многоточие.",
            table: {
                type: { summary: "number" },
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <Ellipsis {...args}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
        </Ellipsis>
    ),
};

export const Default: StoryObj<typeof Ellipsis> = {
    name: "Default",
    args: {
        maxLines: 2,
    },
    render: (args) => (
        <Ellipsis {...args}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
        </Ellipsis>
    ),
};
