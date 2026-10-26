import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { SmartSpot, ESmartSpotAnimation, ESmartSpotShape, ESmartSpotType } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    DefaultRender,
    DefaultSource,
    TypesRender,
    TypesSource,
    ShapesRender,
    ShapesSource,
    AnimationsRender,
    AnimationsSource,
    VisualTestsRender,
    type PlaygroundArgs,
} from "./examples";

const meta = {
    title: "Components/SmartSpot",
    component: SmartSpot,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Анимированная подложка статуса на прозрачном фоне: четыре пятна, слой пятен размыт гауссом " +
                    "и медленно двигается. Заполняет родителя (`width/height: 100%`), размер и скругление " +
                    "задаёт обёртка. Размытие задаётся в CSS px и передаётся в `filter: blur()` как есть " +
                    "(по умолчанию 60). Пресеты анимации: Drift (по умолчанию), Breathing, None. " +
                    "Форма пятен (`shape`): круг (по умолчанию), овал, квадрат, треугольник. " +
                    "`children` отображаются поверх подложки.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SmartSpot} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SmartSpot>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    type: ESmartSpotType.SUCCESS,
    animation: ESmartSpotAnimation.DRIFT,
    blur: 60,
    distance: 50,
    duration: 6000,
    shape: ESmartSpotShape.CIRCLE,
};

// Документационные стори используют анимацию по умолчанию (Drift): кадры пишутся в style
// на каждом requestAnimationFrame, DOM не стабилизируется и скриншоты нестабильны — поэтому
// они исключены из test-runner'а. Скриншот-покрытие — в VisualTests с Animation None.

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        type: {
            control: "select",
            options: Object.values(ESmartSpotType),
            description: "Тип: задаёт цвета и набор пятен.",
            table: {
                category: "Props",
                type: { summary: "ESmartSpotType" },
            },
        },
        animation: {
            control: "select",
            options: Object.values(ESmartSpotAnimation),
            description: "Пресет анимации.",
            table: {
                category: "Props",
                type: { summary: "ESmartSpotAnimation" },
                defaultValue: { summary: "ESmartSpotAnimation.DRIFT" },
            },
        },
        blur: {
            control: { type: "range", min: 0, max: 300, step: 1 },
            description: "Размытие слоя пятен, px.",
            table: {
                category: "Props",
                type: { summary: "number" },
                defaultValue: { summary: "60" },
            },
        },
        distance: {
            control: { type: "range", min: 0, max: 150, step: 1 },
            description: "Дистанция движения слоя пятен (радиус эллипса по горизонтали), px. Влияет только на Drift.",
            table: {
                category: "Props",
                type: { summary: "number" },
                defaultValue: { summary: "50" },
            },
        },
        duration: {
            control: { type: "range", min: 1000, max: 20000, step: 500 },
            description: "Длительность одного цикла анимации, мс. Смена значения не перезапускает анимацию.",
            table: {
                category: "Props",
                type: { summary: "number" },
                defaultValue: { summary: "6000" },
            },
        },
        shape: {
            control: "select",
            options: Object.values(ESmartSpotShape),
            description: "Форма пятен.",
            table: {
                category: "Props",
                type: { summary: "ESmartSpotShape" },
                defaultValue: { summary: "ESmartSpotShape.CIRCLE" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof SmartSpot> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Бесконечная анимация — см. комментарий выше.
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const Types: StoryObj<typeof SmartSpot> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesSource,
                language: "tsx",
            },
        },
        // Бесконечная анимация — см. комментарий выше.
        testRunner: { skip: true },
    },
    render: TypesRender,
};

export const Shapes: StoryObj<typeof SmartSpot> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ShapesSource,
                language: "tsx",
            },
        },
        // Бесконечная анимация — см. комментарий выше.
        testRunner: { skip: true },
    },
    render: ShapesRender,
};

export const Animations: StoryObj<typeof SmartSpot> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: AnimationsSource,
                language: "tsx",
            },
        },
        // Drift и Breathing анимируются бесконечно — см. комментарий выше.
        testRunner: { skip: true },
    },
    render: AnimationsRender,
};

export const VisualTests: StoryObj<typeof SmartSpot> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
