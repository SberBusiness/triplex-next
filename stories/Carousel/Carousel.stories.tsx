import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Carousel, EOrientation, ECarouselScrollMode } from "@sberbusiness/triplex-next";
import {
    type PlaygroundArgs,
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
    DynamicIndicatorsRender,
    DynamicIndicatorsSource,
    VisualTestsRender,
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
    orientation: EOrientation.HORIZONTAL,
    scrollMode: ECarouselScrollMode.ITEM,
    gap: 16,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        orientation: {
            options: Object.values(EOrientation),
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

export const DynamicIndicators: StoryObj<typeof Carousel> = {
    name: "Example: dynamic indicators",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DynamicIndicatorsSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: DynamicIndicatorsRender,
};

export const VisualTests: StoryObj<typeof Carousel> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { hoverSelector: '[data-testid="carousel-next-hover"]' },
    },
    play: async ({ canvasElement, userEvent }) => {
        const canvas = within(canvasElement);
        const endButton = canvas.getByTestId("carousel-next-end");
        await userEvent.click(endButton);
        await userEvent.click(endButton);
        await expect(endButton).toHaveAttribute("aria-disabled", "true");
        await userEvent.click(canvasElement);
        await userEvent.tab();
        await expect(canvas.getByTestId("carousel-next-focus")).toHaveFocus();
    },
};
