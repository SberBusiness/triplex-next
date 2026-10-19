import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { DefaultRender, DefaultSource } from "./examples";

const meta = {
    title: "Experiments/Knitted skin",
    component: DefaultRender,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        controls: { disable: true },
        // Browser-verified GPU experiment: rendering varies across platforms, so image baselines are excluded.
        testRunner: { skip: true },
        docs: {
            description: {
                component:
                    "Три способа связать один интерфейс: текстура поверх DOM, SVG-рельеф и WebGL-петли. " +
                    "Во всех образцах используются Button, TextField и Island из Triplex; вязка применяется только к этим компонентам. " +
                    "WebGL получает снимок локального DOM через SVG foreignObject, а не использует экспериментальный HTML-in-Canvas API. " +
                    "Это ограниченный стенд: внешние ресурсы, порталы и произвольные страницы не поддерживаются.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof DefaultRender>;

export default meta;

export const Default: StoryObj<typeof meta> = {
    render: () => <DefaultRender />,
    parameters: { docs: { source: { code: DefaultSource, language: "tsx" } } },
};
