import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { LoaderScreen, ELoaderSmallTheme, EComponentSize } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, TypesExample, TypesExampleSource } from "./examples";

const meta = {
    title: "Components/Loaders/LoaderScreen",
    component: LoaderScreen,
    parameters: {
        docs: {
            description: {
                component: "Виджет-загрузчик, перекрывающий содержимое и отображающий лоадер по центру своей области.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={LoaderScreen} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof LoaderScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        type: "small",
        theme: ELoaderSmallTheme.BRAND,
        size: EComponentSize.MD,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: ["small", "middle"],
            description: "Тип лоадера",
            table: {
                type: { summary: '"small" | "middle"' },
            },
        },
        theme: {
            control: { type: "select" },
            options: Object.values(ELoaderSmallTheme),
            description: "Тема (только для типа small)",
            if: { arg: "type", eq: "small" },
            table: {
                type: { summary: "ELoaderSmallTheme" },
                defaultValue: { summary: "ELoaderSmallTheme.BRAND" },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер (только для типа small)",
            if: { arg: "type", eq: "small" },
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ position: "relative", height: "200px", width: "300px" }}>
                <Story />
            </div>
        ),
    ],
    render: (args) => <LoaderScreen {...args} />,
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof LoaderScreen> = {
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

export const Types: StoryObj<typeof LoaderScreen> = {
    name: "Types",
    render: TypesExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: TypesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof LoaderScreen> = {
    name: "Visual tests",
    tags: ["!autodocs"],
    decorators: [
        (Story) => (
            <>
                <style>{`* { animation: none !important; }`}</style>
                <Story />
            </>
        ),
    ],
    render: () => (
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", height: "200px", width: "300px" }}>
                <LoaderScreen type="small" theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />
            </div>
            <div style={{ position: "relative", height: "200px", width: "300px" }}>
                <LoaderScreen type="small" theme={ELoaderSmallTheme.NEUTRAL} size={EComponentSize.MD} />
            </div>
            <div style={{ position: "relative", height: "200px", width: "300px" }}>
                <LoaderScreen type="middle" />
            </div>
        </div>
    ),
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
