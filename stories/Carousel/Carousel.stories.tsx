import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Carousel, ECarouselOrientation, ECarouselScrollMode } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    PlaygroundSource,
    DefaultRender,
    DefaultSource,
    ScrollModesSource,
    ScrollModesRender,
    OrientationsSource,
    OrientationsRender,
    ProductionRender,
    ProductionSource,
    type PlaygroundArgs,
} from "./examples";

export default {
    title: "Components/Carousel",
    component: Carousel,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Carousel} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Carousel>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    orientation: ECarouselOrientation.HORIZONTAL,
    scrollMode: ECarouselScrollMode.ITEM,
    gap: 16,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        orientation: {
            options: Object.values(ECarouselOrientation),
            control: { type: "select" },
            table: { category: "Props" },
        },
        scrollMode: {
            options: Object.values(ECarouselScrollMode),
            control: { type: "select" },
            table: { category: "Props" },
        },
        gap: {
            control: { type: "number", min: 0 },
            table: { category: "Props" },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            source: {
                code: PlaygroundSource,
                language: "tsx",
            },
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof Carousel> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const ScrollModes: StoryObj<typeof Carousel> = {
    name: "Scroll modes",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ScrollModesSource,
                language: "tsx",
            },
        },
    },
    render: ScrollModesRender,
};

export const Orientations: StoryObj<typeof Carousel> = {
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

export const Production: StoryObj<typeof Carousel> = {
    name: "Example: production",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: ProductionRender,
};
