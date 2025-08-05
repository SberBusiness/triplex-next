import React from "react";
import { StoryObj } from "@storybook/react";
import { EScreenWidth } from "../src/enums/EScreenWidth";
import { MediaWidth } from "../src/components/MediaWidth";
import { MobileView } from "../src/components/MobileView";

export default {
    title: "Components/MediaWidth",
    component: MediaWidth,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент, который рендерит элементы в зависимости от ширины окна браузера.

## Особенности

- Позволяет задавать минимальную ширину экрана, максимальную ширину экрана или их одновременно.
- Если не задана ни минимальная, ни максимальная ширина экрана - всегда будет отображаться fallback.

## Использование

\`\`\`tsx
import { MediaWidth } from '@sberbusiness/triplex-next';

<MediaWidth minWidth={EScreenWidth.MD_MIN} maxWidth={EScreenWidth.LG_MAX}>
    <div>Контент для экранов от 768px до 1199px</div>
</MediaWidth>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        minWidth: {
            control: { type: "select" },
            options: Object.values(EScreenWidth),
            description: "Минимальная ширина экран, при которой будут отрендерены children.",
        },
        maxWidth: {
            control: { type: "select" },
            options: Object.values(EScreenWidth),
            description: "Максимальная ширина экрана, при которой будут отрендерены children.",
        },
        children: {
            control: { type: "text" },
            description:
                "Элементы, которые рендерятся, когда ширина окна браузера попадает в диапазон minWidth и/или maxWidth.",
        },
        fallback: {
            control: { type: "text" },
            description:
                "Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth.",
        },
    },
};

export const MinWidth: StoryObj<typeof MediaWidth> = {
    name: "Min Width",
    args: {
        minWidth: EScreenWidth.MD_MIN,
    },
    parameters: {
        docs: {
            description: {
                story: "Задана только минимальная необходимая ширина - minWidth. Контент отображается на экранах шириной 768px и более.",
            },
        },
    },
    render: (args) => (
        <MediaWidth {...args} fallback={<div>Fallback на экранах шириной меньше, чем {args.minWidth}</div>}>
            <div>Контент виден только на экранах шириной {args.minWidth} и более</div>
        </MediaWidth>
    ),
};

export const MaxWidth: StoryObj<typeof MediaWidth> = {
    name: "Max Width",
    args: {
        maxWidth: EScreenWidth.LG_MAX,
    },
    parameters: {
        docs: {
            description: {
                story: "Задана только максимальная допустимая ширина - maxWidth. Контент отображается на экранах шириной до 767px включительно.",
            },
        },
    },
    render: (args) => (
        <MediaWidth {...args} fallback={<div>Fallback на экранах шириной больше, чем {args.maxWidth}</div>}>
            <div>Контент виден только на экранах шириной {args.maxWidth} и менее</div>
        </MediaWidth>
    ),
};

export const BetweenWidth: StoryObj<typeof MediaWidth> = {
    name: "Between Width",
    args: {
        minWidth: EScreenWidth.MD_MIN,
        maxWidth: EScreenWidth.LG_MAX,
    },
    parameters: {
        docs: {
            description: {
                story: "Заданы максимальная и минимальная допустимая ширина - minWidth и maxWidth. Контент отображается на экранах, чья ширина находится в диапазоне от 768px до 1199px включительно.",
            },
        },
    },
    render: (args) => (
        <MediaWidth
            {...args}
            fallback={
                <div>
                    Fallback на экранах, чья ширина за пределами диапазона от {args.minWidth} до {args.maxWidth}
                </div>
            }
        >
            <div>
                Контент виден только на экранах шириной от {args.minWidth} до {args.maxWidth} включительно
            </div>
        </MediaWidth>
    ),
};

export const Fallback: StoryObj<typeof MediaWidth> = {
    name: "Fallback",
    args: {},
    parameters: {
        docs: {
            description: {
                story: "Не указаны ни minWidth, ни maxWidth. В этом случае всегда отображается fallback.",
            },
        },
    },
    render: (args) => (
        <MediaWidth {...args} fallback={<div>Fallback отображается всегда</div>}>
            <div>Контент не должен отображаться</div>
        </MediaWidth>
    ),
};

export const MobileVersion: StoryObj<typeof MediaWidth> = {
    name: "Mobile View",
    args: {},
    parameters: {
        docs: {
            description: {
                story: "Контент переключается между мобильной (экран шириной менее 768px) и десктоп (экран шириной 768px и более) версиями.",
            },
        },
    },
    argTypes: {
        minWidth: { table: { disable: true } },
        maxWidth: { table: { disable: true } },
    },
    render: () => (
        <MobileView fallback={<div>Десктоп контент</div>}>
            <div>Мобильный контент</div>
        </MobileView>
    ),
};
