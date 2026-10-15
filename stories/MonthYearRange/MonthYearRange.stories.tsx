import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MonthYearRange, EMonthYearRangeShiftUnit } from "@sberbusiness/triplex-next";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import {
    PlaygroundRender,
    DefaultRender,
    DefaultSource,
    SizesRender,
    SizesSource,
    WithoutNavigationRender,
    WithoutNavigationSource,
    ProductionRender,
    ProductionSource,
    VisualTestsRender,
    type PlaygroundArgs,
} from "./examples";

const meta = {
    title: "Components/Date components/MonthYearRange",
    component: MonthYearRange,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={MonthYearRange} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof MonthYearRange>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    shiftAmount: 1,
    shiftUnit: EMonthYearRangeShiftUnit.MONTH,
    hideNavigation: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        shiftAmount: {
            control: { type: "number", min: 1, max: 12 },
        },
        shiftUnit: { control: "select", options: Object.values(EMonthYearRangeShiftUnit) },
        hideNavigation: { control: "boolean" },
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

export const Default: StoryObj<typeof MonthYearRange> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: DefaultSource, language: "tsx" },
        },
    },
    render: DefaultRender,
};

export const Sizes: StoryObj<typeof MonthYearRange> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: SizesSource, language: "tsx" },
        },
    },
    render: SizesRender,
};

export const WithoutNavigation: StoryObj<typeof MonthYearRange> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: WithoutNavigationSource, language: "tsx" },
        },
    },
    render: WithoutNavigationRender,
};

export const Production: StoryObj<typeof MonthYearRange> = {
    name: "Example: production",
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: ProductionSource, language: "tsx" },
        },
    },
    render: ProductionRender,
};

export const VisualTests: StoryObj<typeof MonthYearRange> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
};
