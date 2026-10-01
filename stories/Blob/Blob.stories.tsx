import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { Blob } from "../../src/components/Blob";
import { Default as DefaultRender, DefaultSource, Example as ExampleRender, ExampleSource } from "./examples";

const meta = {
    title: "Components/Blob",
    component: Blob,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Декоративный анимированный элемент: размытая «капля» с градиентом, " +
                    "которая бесконечно меняет форму и масштаб (CSS keyframes). Не имеет props " +
                    "и предназначена для фоновых и акцентных украшений интерфейса.",
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
} satisfies Meta<typeof Blob>;

export default meta;

// Blob бесконечно анимируется, поэтому скриншот-тесты для него нестабильны —
// стори исключены из test-runner'а (testRunner: { skip: true }).

export const Default: StoryObj<typeof Blob> = {
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

export const Example: StoryObj<typeof Blob> = {
    name: "Example",
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
        docs: {
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};
