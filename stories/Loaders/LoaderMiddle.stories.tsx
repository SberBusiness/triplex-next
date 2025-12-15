import React from "react";
import { Controls, Description, Primary, Subtitle, Title } from "@storybook/addon-docs/blocks";
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
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Default} />
                </>
            ),
        },
    },
};

export const Default: StoryObj<typeof LoaderMiddle> = {
    name: "Default",
    render: (args) => <LoaderMiddle {...args} />,
    parameters: {
        controls: { disable: true },
    },
};
