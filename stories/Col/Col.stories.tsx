import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { Col } from "@sberbusiness/triplex-next";
import {
    PlaygroundExample,
    DefaultExample,
    DefaultExampleSource,
    DifferentSizesExample,
    DifferentSizesExampleSource,
    ResponsiveSizesExample,
    ResponsiveSizesExampleSource,
    WithOffsetsExample,
    WithOffsetsExampleSource,
    ResponsiveOffsetsExample,
    ResponsiveOffsetsExampleSource,
    HiddenColumnsExample,
    HiddenColumnsExampleSource,
} from "./examples";

const meta = {
    title: "Components/Col",
    component: Col,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент колонки сетки, который используется внутри компонента Row.

## Особенности

- Размеры от 1 до 12 (12-колоночная сетка)
- Адаптивные размеры для разных экранов (sm, md, lg, xl)
- Поддержка отступов (offset)
- Управление видимостью (hidden/block)
- Следует использовать только внутри компонента Row
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Col} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Col>;

export default meta;
type Story = StoryObj<typeof Col>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: { size: 6, offset: 0, children: "Col Content" },
    argTypes: {
        children: { control: { type: "text" }, description: "Контент колонки" },
        size: {
            control: { type: "select" },
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            description: "Ширина колонки",
        },
        offset: {
            control: { type: "select" },
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            description: "Отступ слева для колонки",
        },
        hidden: { control: { type: "boolean" }, description: "Колонка скрыта" },
        block: { control: { type: "boolean" }, description: "Колонка отображается независимо от свойства hidden" },
    },
    parameters: {
        controls: { include: ["children", "size", "offset", "hidden", "block"] },
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
            description: { story: "Размер колонки по-умолчанию" },
            source: { code: DefaultExampleSource, language: "tsx" },
        },
    },
};

export const DifferentSizes: Story = {
    render: DifferentSizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Демонстрация различных размеров колонок, включая размер по-умолчанию" },
            source: { code: DifferentSizesExampleSource, language: "tsx" },
        },
    },
};

export const ResponsiveSizes: Story = {
    render: ResponsiveSizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Колонки с адаптивными размерами для разных экранов" },
            source: { code: ResponsiveSizesExampleSource, language: "tsx" },
        },
    },
};

export const WithOffsets: Story = {
    render: WithOffsetsExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Колонки с отступами (offset)" },
            source: { code: WithOffsetsExampleSource, language: "tsx" },
        },
    },
};

export const ResponsiveOffsets: Story = {
    render: ResponsiveOffsetsExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Адаптивные отступы для разных размеров экрана" },
            source: { code: ResponsiveOffsetsExampleSource, language: "tsx" },
        },
    },
};

export const HiddenColumns: Story = {
    render: HiddenColumnsExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Колонки, скрытые на определенных размерах экрана" },
            source: { code: HiddenColumnsExampleSource, language: "tsx" },
        },
    },
};
