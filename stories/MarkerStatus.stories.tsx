import React from "react";
import { MarkerStatus } from "../src/components/MarkerStatus";
import { StoryObj } from "@storybook/react";
import { EMarkerStatus } from "../src/components/Marker/enums";
import { Gap } from "../src/components/Gap";
import { EComponentSize } from "../src/enums/EComponentSize";

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
            options: [EComponentSize.MD, EComponentSize.LG],
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
        size: EComponentSize.MD,
        description: "Description",
        children: "Status text",
    },
    render: (args) => (
        <MarkerStatus {...args} description={args.description}>
            {args.children}
        </MarkerStatus>
    ),
};

export const DifferentSizes: StoryObj<typeof MarkerStatus> = {
    name: "Different Sizes",
    argTypes: {
        status: {
            table: {
                disable: true,
            },
        },
        size: {
            table: {
                disable: true,
            },
        },
        description: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        children: "Status text",
        description: "Description",
    },
    render: (args) => (
        <>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.MD} description={args.description}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.MD}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.LG} description={args.description}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.LG}>
                    {args.children}
                </MarkerStatus>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.MD} description={args.description}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.MD}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.LG} description={args.description}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.LG}>
                    {args.children}
                </MarkerStatus>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.MD} description={args.description}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.MD}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.LG} description={args.description}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.LG}>
                    {args.children}
                </MarkerStatus>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.MD} description={args.description}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.MD}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.LG} description={args.description}>
                    {args.children}
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.LG}>
                    {args.children}
                </MarkerStatus>
            </div>
        </>
    ),
};

export const DifferentStatuses: StoryObj<typeof MarkerStatus> = {
    name: "Different Statuses",
    argTypes: {
        status: {
            table: {
                disable: true,
            },
        },
        size: {
            table: {
                disable: true,
            },
        },
        description: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        children: "Status text",
        description: "Description",
        size: EComponentSize.MD,
    },
    render: (args) => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <MarkerStatus status={EMarkerStatus.SUCCESS} size={args.size} description={args.description}>
                {args.children}
            </MarkerStatus>
            <Gap size={16} />
            <MarkerStatus status={EMarkerStatus.ERROR} size={args.size} description={args.description}>
                {args.children}
            </MarkerStatus>
            <Gap size={16} />
            <MarkerStatus status={EMarkerStatus.WARNING} size={args.size} description={args.description}>
                {args.children}
            </MarkerStatus>
            <Gap size={16} />
            <MarkerStatus status={EMarkerStatus.WAITING} size={args.size} description={args.description}>
                {args.children}
            </MarkerStatus>
        </div>
    ),
};
