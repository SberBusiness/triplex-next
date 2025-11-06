import React from "react";
import { MarkerStatus } from "../src/components/MarkerStatus";
import { StoryObj } from "@storybook/react";
import { EMarkerStatus, EMarkerSize } from "../src/components/Marker/enums";

export default {
    title: "Components/MarkerStatus",
    component: MarkerStatus,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент иконки статуса подписи.

## Особенности

- Размеры - medium (MD), large (LG)
- Статусы - success, error, warning, waiting

## Использование

\`\`\`tsx
import { MarkerStatus } from '@sberbusiness/triplex-next';   

<MarkerStatus status={EMarkerStatus.SUCCESS}>Success Status</MarkerStatus>
\`\`\`
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof MarkerStatus> = {
    name: "Playground",
    argTypes: {
        status: {
            control: { type: "select" },
            options: Object.values(EMarkerStatus),
            description: "Статус",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EMarkerSize),
            description: "Размер компонента",
        },
        description: {
            control: { type: "text" },
            description: "Описание статуса",
        },
        children: {
            control: { type: "text" },
            description: "Заголовок статуса",
        },
    },
    args: {
        status: EMarkerStatus.SUCCESS,
        size: EMarkerSize.MD,
        description: "Description",
        children: "Status text",
    },
    render: (args) => (
        <MarkerStatus {...args} description={args.description}>
            {args.children}
        </MarkerStatus>
    ),
};
