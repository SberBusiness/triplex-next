import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { ExpandAnimation } from "@sberbusiness/triplex-next";
import {
    AnimationTime as AnimationTimeRender,
    AnimationTimeSource,
    Callbacks as CallbacksRender,
    CallbacksSource,
    Default as DefaultRender,
    DefaultSource,
    Playground as PlaygroundRender,
} from "./examples";

const meta = {
    title: "Components/ExpandAnimation",
    component: ExpandAnimation,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Обёртка, которая анимирует раскрытие и сворачивание содержимого по высоте. Состояние полностью управляется потребителем через свойство `expanded` — своего внутреннего состояния у компонента нет.\n\n### Как это работает\n\nПеред раскрытием измеряется `scrollHeight` контента, и высота анимируется от `0` до этого значения; в конце анимации высота отпускается в `auto`, чтобы контент мог свободно менять размер. При сворачивании текущая высота фиксируется в пикселях и анимируется к `0`.\n\nСвёрнутый блок получает `visibility: hidden`, поэтому скрытое содержимое не попадает в порядок обхода по Tab.\n\n### Доступность\n\nКомпонент не выставляет ARIA-атрибутов сам. Связывайте его с триггером на стороне потребителя: `aria-expanded` на кнопке, `aria-controls` с `id` блока анимации.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ExpandAnimation} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ExpandAnimation>;

export default meta;

export const Playground: StoryObj<typeof ExpandAnimation> = {
    tags: ["!autodocs"],
    args: {
        expanded: true,
        animationTime: 300,
    },
    argTypes: {
        expanded: {
            control: "boolean",
            description: "Развёрнут ли компонент.",
            table: {
                type: { summary: "boolean" },
            },
        },
        animationTime: {
            control: { type: "number", min: 0, step: 100 },
            description: "Время анимации (мс).",
            table: {
                type: { summary: "number" },
                defaultValue: { summary: "300" },
            },
        },
    },
    parameters: {
        testRunner: { skip: true },
        controls: { include: ["expanded", "animationTime"] },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof ExpandAnimation> = {
    name: "Default",
    render: DefaultRender,
    parameters: {
        docs: {
            description: {
                story: "Раскрытие управляется потребителем: кнопка переключает `expanded`, а `aria-expanded` и `aria-controls` связывают её с блоком анимации.",
            },
            controls: { disable: true },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};

export const AnimationTime: StoryObj<typeof ExpandAnimation> = {
    name: "Animation time",
    render: AnimationTimeRender,
    parameters: {
        docs: {
            description: {
                story: "Длительность анимации задаётся свойством `animationTime` в миллисекундах. По умолчанию — 300.",
            },
            controls: { disable: true },
            source: { code: AnimationTimeSource, language: "tsx" },
        },
    },
};

export const Callbacks: StoryObj<typeof ExpandAnimation> = {
    name: "Callbacks",
    render: CallbacksRender,
    parameters: {
        docs: {
            description: {
                story: "`onStart` вызывается в начале анимации, `onEnd` — в конце. Оба срабатывают и при разворачивании, и при сворачивании, поэтому по ним удобно отслеживать факт анимации.",
            },
            controls: { disable: true },
            source: { code: CallbacksSource, language: "tsx" },
        },
    },
};
