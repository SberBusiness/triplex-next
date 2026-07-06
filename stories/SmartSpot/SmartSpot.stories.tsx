import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { SmartSpot } from "../../src/components/SmartSpot";
import { Default as DefaultRender, DefaultSource } from "./examples";

const meta = {
    title: "Components/SmartSpot",
    component: SmartSpot,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Подложка статуса: сплошной фон и четыре овальных пятна, слой пятен размыт гауссом " +
                    "и медленно двигается. Заполняет родителя (width/height: 100%), размер и скругление " +
                    "задаёт обёртка. Размытие задаётся в CSS px и " +
                    "передаётся в filter: blur() как есть (по умолчанию 116). Пресеты анимации: Drift (по умолчанию), Wave, Orbit, " +
                    "Breathing, None.",
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
} satisfies Meta<typeof SmartSpot>;

export default meta;

// SmartSpot бесконечно анимируется, поэтому скриншот-тесты для него нестабильны —
// стори исключены из test-runner'а (testRunner: { skip: true }).

export const Default: StoryObj<typeof SmartSpot> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};
