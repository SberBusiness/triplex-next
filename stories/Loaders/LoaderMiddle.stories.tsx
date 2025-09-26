import React from "react";
import { LoaderMiddle } from "../../src/components/Loader";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Loaders/LoaderMiddle",
    component: LoaderMiddle,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент квадратного загрузчика с анимированными точками.

## Использование

\`\`\`tsx
import { LoaderMiddle } from '@sberbusiness/triplex-next';

<LoaderMiddle />
\`\`\`
                `,
            },
        },
    },
};

export const Default: StoryObj<typeof LoaderMiddle> = {
    name: "Default",
    render: (args) => <LoaderMiddle {...args} />,
};
