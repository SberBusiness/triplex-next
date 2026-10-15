import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { PageIndicators, EOrientation } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    DefaultRender,
    DefaultSource,
    OrientationsRender,
    OrientationsSource,
    ManyPagesRender,
    ManyPagesSource,
    CustomIndicatorPropsRender,
    CustomIndicatorPropsSource,
    VisualTestsRender,
    type IPlaygroundArgs,
} from "./examples";

export default {
    title: "Components/PageIndicators",
    component: PageIndicators,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={PageIndicators} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof PageIndicators>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    // Props
    count: 5,
    orientation: EOrientation.HORIZONTAL,
};

/** Интерактивный playground: `count` и `orientation` настраиваются через Controls, `activeIndex` хранится в state. */
export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        count: {
            control: { type: "number", min: 1, max: 30, step: 1 },
            description: "Количество страниц.",
            table: { category: "Props" },
        },
        orientation: {
            control: { type: "select" },
            options: Object.values(EOrientation),
            description: "Ориентация ряда индикаторов.",
            table: {
                category: "Props",
                type: { summary: "EOrientation" },
                defaultValue: { summary: "EOrientation.HORIZONTAL" },
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

/** Минимальный пример: 5 страниц, горизонтальная ориентация. Активный индекс хранится снаружи (controlled). */
export const Default: StoryObj<typeof PageIndicators> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Визуально совпадает с горизонтальным вариантом в Orientations.
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

/** Горизонтальная (по умолчанию) и вертикальная ориентации. Навигация стрелками следует ориентации. */
export const Orientations: StoryObj<typeof PageIndicators> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: OrientationsSource,
                language: "tsx",
            },
        },
    },
    render: OrientationsRender,
};

/** 12 страниц: видно окно из 5 индикаторов, крайние уменьшаются, окно сдвигается за активной страницей. */
export const ManyPages: StoryObj<typeof PageIndicators> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ManyPagesSource,
                language: "tsx",
            },
        },
        // Начальное состояние покрыто VisualTests (ряд "12 pages, start").
        testRunner: { skip: true },
    },
    render: ManyPagesRender,
};

/** Свойства индикаторов через функцию `indicatorProps`: `aria-label`, связь с `tabpanel`, `title` и data-атрибуты. */
export const CustomIndicatorProps: StoryObj<typeof PageIndicators> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CustomIndicatorPropsSource,
                language: "tsx",
            },
        },
        // Индикаторы визуально совпадают с Default — меняются только атрибуты.
        testRunner: { skip: true },
    },
    render: CustomIndicatorPropsRender,
};

/**
 * Скриншот-тест: фокус, малое число страниц, 12 страниц с активной в начале,
 * середине и конце, disabled-индикаторы и вертикальная ориентация.
 */
export const VisualTests: StoryObj<typeof PageIndicators> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
    play: async ({ canvasElement, userEvent }) => {
        await userEvent.click(canvasElement);
        await userEvent.tab();
    },
};
