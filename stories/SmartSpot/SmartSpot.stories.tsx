import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Canvas, Controls, Stories } from "@storybook/addon-docs/blocks";
import { SmartSpot, ESmartSpotAnimation, ESmartSpotShape } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    PLAYGROUND_COLORS,
    DefaultRender,
    DefaultSource,
    ShapesRender,
    ShapesSource,
    AnimationsRender,
    AnimationsSource,
    ExampleRender,
    ExampleSource,
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
                    "Отдельная декоративная фигура с настраиваемым цветом, размытием и анимацией. " +
                    "Размер и положение можно задать через CSS. Несколько фигур можно объединить в композицию. " +
                    "В стори Example размытие задано на общем слое через CSS `filter: blur()`.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SmartSpot} />
                    <Heading>Playground</Heading>
                    <Canvas of={Playground} />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SmartSpot>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    color: "ColorSuccess.50",
    animation: ESmartSpotAnimation.DRIFT,
    blur: 60,
    distance: 50,
    duration: 6000,
    shape: ESmartSpotShape.CIRCLE,
};

// Документационные стори используют анимацию по умолчанию (Drift): кадры пишутся в style
// на каждом requestAnimationFrame, DOM не стабилизируется и скриншоты нестабильны — поэтому
// они исключены из test-runner'а.

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        color: {
            control: "select",
            options: Object.keys(PLAYGROUND_COLORS),
            description: "Цвет фигуры задаётся через style.backgroundColor.",
            table: { category: "Settings" },
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
            description: "Размытие фигуры, px.",
            table: {
                category: "Props",
                type: { summary: "number" },
                defaultValue: { summary: "60" },
            },
        },
        distance: {
            control: { type: "range", min: 0, max: 150, step: 1 },
            description: "Дистанция движения фигуры (радиус эллипса по горизонтали), px. Влияет только на Drift.",
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
            description: "Форма фигуры.",
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

export const Example: StoryObj<typeof SmartSpot> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Композиция из четырёх фигур с анимацией Drift и общим размытием." },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: ExampleRender,
};
