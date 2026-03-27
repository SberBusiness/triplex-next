import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { MediaWidth, EScreenWidth } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    MinWidthExample,
    MinWidthExampleSource,
    MaxWidthExample,
    MaxWidthExampleSource,
    FallbackExample,
    FallbackExampleSource,
    MobileViewExample,
    MobileViewExampleSource,
} from "./examples";

const meta = {
    title: "Components/MediaWidth",
    component: MediaWidth,
    parameters: {
        docs: {
            description: {
                component: "Компонент, который рендерит элементы в зависимости от ширины окна браузера.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={MediaWidth} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MediaWidth>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        minWidth: EScreenWidth.MD_MIN,
        maxWidth: EScreenWidth.LG_MAX,
    },
    argTypes: {
        minWidth: {
            control: { type: "select" },
            options: [undefined, ...Object.values(EScreenWidth)],
            description: "Минимальная ширина экрана, при которой будут отрендерены children",
            table: {
                type: { summary: "EScreenWidth" },
            },
        },
        maxWidth: {
            control: { type: "select" },
            options: [undefined, ...Object.values(EScreenWidth)],
            description: "Максимальная ширина экрана, при которой будут отрендерены children",
            table: {
                type: { summary: "EScreenWidth" },
            },
        },
    },
    render: ({ minWidth, maxWidth }) => (
        <MediaWidth
            minWidth={minWidth}
            maxWidth={maxWidth}
            fallback={
                <div>
                    Fallback: ширина экрана за пределами диапазона {minWidth ?? "—"} – {maxWidth ?? "—"}
                </div>
            }
        >
            <div>
                Контент виден на экранах шириной {minWidth ?? "—"} – {maxWidth ?? "—"}
            </div>
        </MediaWidth>
    ),
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: Story = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const MinWidth: Story = {
    name: "MinWidth",
    render: MinWidthExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: MinWidthExampleSource,
                language: "tsx",
            },
        },
    },
};

export const MaxWidth: Story = {
    name: "MaxWidth",
    render: MaxWidthExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: MaxWidthExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Fallback: Story = {
    name: "Fallback",
    render: FallbackExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: FallbackExampleSource,
                language: "tsx",
            },
        },
    },
};

export const MobileViewStory: Story = {
    name: "Example: MobileView",
    render: MobileViewExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: MobileViewExampleSource,
                language: "tsx",
            },
        },
    },
};
