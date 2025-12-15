import React from "react";
import { StoryObj } from "@storybook/react";
import { EScreenWidth } from "../src/helpers/breakpoints";
import { MediaWidth } from "../src/components/MediaWidth";
import { MobileView } from "../src/components/MobileView";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

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
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={BetweenWidth} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        minWidth: {
            control: { type: "select" },
            options: Object.values(EScreenWidth),
            description: "Минимальная ширина экрана, при которой будут отрендерены children.",
        },
        maxWidth: {
            control: { type: "select" },
            options: Object.values(EScreenWidth),
            description: "Максимальная ширина экрана, при которой будут отрендерены children.",
        },
        children: {
            control: { type: "text" },
            table: {
                type: { summary: "React.ReactElement" },
            },
            description:
                "Элементы, которые рендерятся, когда ширина окна браузера попадает в диапазон minWidth и/или maxWidth.",
        },
        fallback: {
            control: { type: "text" },
            table: {
                type: { summary: "React.ReactElement" },
            },
            description:
                "Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth.",
        },
    },
};

export const BetweenWidth: StoryObj<typeof MediaWidth> = {
    name: "Between Width",
    args: {
        minWidth: EScreenWidth.MD_MIN,
        maxWidth: EScreenWidth.LG_MAX,
    },
    parameters: {
        controls: {
            include: ["minWidth", "maxWidth", "children", "fallback"],
        },
        docs: {
            description: {
                story: "Заданы максимальная и минимальная допустимая ширина - minWidth и maxWidth. Контент отображается на экранах, чья ширина находится в диапазоне от 768px до 1199px включительно.",
            },
        },
    },
    render: (args) => {
        const { minWidth, maxWidth, children, fallback } = args;

        return (
            <MediaWidth
                minWidth={minWidth}
                maxWidth={maxWidth}
                fallback={
                    fallback || (
                        <div>
                            Fallback на экранах, чья ширина за пределами диапазона от {minWidth} до {maxWidth}{" "}
                            включительно
                        </div>
                    )
                }
            >
                {children || (
                    <div>
                        Контент виден только на экранах шириной от {minWidth} до {maxWidth} включительно
                    </div>
                )}
            </MediaWidth>
        );
    },
};

export const MinWidth: StoryObj<typeof MediaWidth> = {
    name: "Min Width",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Задана только минимальная необходимая ширина - minWidth. Контент отображается на экранах шириной 768px и более.",
            },
        },
    },
    render: () => {
        const minWidth = EScreenWidth.MD_MIN;

        return (
            <MediaWidth minWidth={minWidth} fallback={<div>Fallback на экранах шириной менее {minWidth}</div>}>
                <div>Контент виден только на экранах шириной {minWidth} и более</div>
            </MediaWidth>
        );
    },
};

export const MaxWidth: StoryObj<typeof MediaWidth> = {
    name: "Max Width",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Задана только максимальная допустимая ширина - maxWidth. Контент отображается на экранах шириной до 767px включительно.",
            },
        },
    },
    render: () => {
        const maxWidth = EScreenWidth.LG_MAX;

        return (
            <MediaWidth maxWidth={maxWidth} fallback={<div>Fallback на экранах шириной более {maxWidth}</div>}>
                <div>Контент виден только на экранах шириной до {maxWidth} включительно</div>
            </MediaWidth>
        );
    },
};

export const Fallback: StoryObj<typeof MediaWidth> = {
    name: "Fallback",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Не указаны ни minWidth, ни maxWidth. В этом случае всегда отображается fallback.",
            },
        },
    },
    render: () => <MediaWidth fallback={<div>Fallback отображается всегда</div>} />,
};

export const MobileVersion: StoryObj<typeof MediaWidth> = {
    name: "Mobile View",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Контент переключается между мобильной (экран шириной менее 768px) и десктоп (экран шириной 768px и более) версиями.",
            },
        },
    },
    render: () => (
        <MobileView fallback={<div>Десктоп контент</div>}>
            <div>Мобильный контент</div>
        </MobileView>
    ),
};
