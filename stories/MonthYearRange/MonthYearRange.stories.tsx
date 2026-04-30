import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MonthYearRange, EMonthYearRangeShiftUnit } from "@sberbusiness/triplex-next";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    WithoutNavigationExample,
    WithoutNavigationExampleSource,
    VisualTestsExample,
    SizesExample,
    SizesExampleSource,
    ProductionExample,
    ProductionExampleSource,
} from "./examples";

const meta = {
    title: "Components/Date components/MonthYearRange",
    component: MonthYearRange,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент выбора диапазона месяцев с возможностью навигации.
                `,
            },
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
type Story = StoryObj<typeof MonthYearRange>;
type MonthYearRangePlaygroundStory = StoryObj<React.ComponentProps<typeof MonthYearRange>>;

export const Playground: MonthYearRangePlaygroundStory = {
    tags: ["!autodocs"],
    args: {
        shiftAmount: 1,
        shiftUnit: EMonthYearRangeShiftUnit.MONTH,
        hideNavigation: false,
    },
    argTypes: {
        shiftAmount: {
            control: { type: "number", min: 1, max: 12 },
            description: "Численная величина сдвига диапазона месяцев",
        },
        shiftUnit: {
            control: { type: "select" },
            options: Object.values(EMonthYearRangeShiftUnit),
            description: "Единица измерения сдвига диапазона месяцев",
        },
        hideNavigation: { control: { type: "boolean" }, description: "Скрыть кнопки навигации" },
    },
    parameters: {
        controls: { include: ["shiftAmount", "shiftUnit", "hideNavigation"] },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: DefaultExampleSource, language: "tsx" },
        },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: SizesExampleSource, language: "tsx" },
        },
    },
};

export const WithoutNavigation: Story = {
    render: WithoutNavigationExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "MonthYearRange без кнопок навигации - только поля выбора месяца." },
            source: { code: WithoutNavigationExampleSource, language: "tsx" },
        },
    },
};

export const Production: Story = {
    name: "Example: production",
    render: ProductionExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: ProductionExampleSource, language: "tsx" } },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsExample,
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
};
