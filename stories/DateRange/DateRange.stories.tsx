import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DateRange, EDateRangeShiftUnit } from "@sberbusiness/triplex-next";
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
} from "./examples";

const meta = {
    title: "Components/Date components/DateRange",
    component: DateRange,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент выбора диапазона дат с возможностью навигации.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={DateRange} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof DateRange>;

export default meta;
type Story = StoryObj<typeof DateRange>;
type DateRangePlaygroundStory = StoryObj<React.ComponentProps<typeof DateRange>>;

export const Playground: DateRangePlaygroundStory = {
    tags: ["!autodocs"],
    args: {
        shiftAmount: 1,
        shiftUnit: EDateRangeShiftUnit.MONTH,
        hideNavigation: false,
    },
    argTypes: {
        shiftAmount: {
            control: { type: "number", min: 1, max: 12 },
            description: "Численная величина сдвига диапазона дат",
        },
        shiftUnit: {
            control: { type: "select" },
            options: Object.values(EDateRangeShiftUnit),
            description: "Единица измерения сдвига диапазона дат",
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
            description: { story: "DateRange без кнопок навигации - только поля выбора дат." },
            source: { code: WithoutNavigationExampleSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: VisualTestsExample,
};
