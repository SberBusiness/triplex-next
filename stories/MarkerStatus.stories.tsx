import React from "react";
import { MarkerStatus } from "../src/components/MarkerStatus";
import { StoryObj } from "@storybook/react";
import { EMarkerStatus } from "../src/components/Marker/enums";
import { Gap } from "../src/components/Gap";
import { EComponentSize } from "../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

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
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
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
    parameters: {
        controls: {
            include: ["status", "size", "description", "children"],
        },
    },
    render: (args) => (
        <MarkerStatus {...args} description={args.description}>
            {args.children}
        </MarkerStatus>
    ),
};

export const Default: StoryObj<typeof MarkerStatus> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <MarkerStatus status={EMarkerStatus.SUCCESS} description="Description">
            Status text
        </MarkerStatus>
    ),
};

export const DifferentSizes: StoryObj<typeof MarkerStatus> = {
    name: "Different Sizes",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.MD} description="Description">
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.MD}>
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.LG} description="Description">
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.LG}>
                    Status text
                </MarkerStatus>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.MD} description="Description">
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.MD}>
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.LG} description="Description">
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.LG}>
                    Status text
                </MarkerStatus>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.MD} description="Description">
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.MD}>
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.LG} description="Description">
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.LG}>
                    Status text
                </MarkerStatus>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.MD} description="Description">
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.MD}>
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.LG} description="Description">
                    Status text
                </MarkerStatus>
                <Gap size={16} />
                <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.LG}>
                    Status text
                </MarkerStatus>
            </div>
        </>
    ),
};

export const DifferentStatuses: StoryObj<typeof MarkerStatus> = {
    name: "Different Statuses",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.MD} description="Description">
                Status text
            </MarkerStatus>
            <Gap size={16} />
            <MarkerStatus status={EMarkerStatus.ERROR} size={EComponentSize.MD} description="Description">
                Status text
            </MarkerStatus>
            <Gap size={16} />
            <MarkerStatus status={EMarkerStatus.WARNING} size={EComponentSize.MD} description="Description">
                Status text
            </MarkerStatus>
            <Gap size={16} />
            <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.MD} description="Description">
                Status text
            </MarkerStatus>
        </div>
    ),
};
