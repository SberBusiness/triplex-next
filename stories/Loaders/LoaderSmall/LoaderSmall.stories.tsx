import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { LoaderSmall, ELoaderSmallTheme, EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    ThemesExample,
    ThemesExampleSource,
    SizesExample,
    SizesExampleSource,
} from "./examples";

const meta = {
    title: "Components/Loaders/LoaderSmall",
    component: LoaderSmall,
    parameters: {
        docs: {
            description: {
                component: "Компонент горизонтального загрузчика с анимированными точками.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={LoaderSmall} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof LoaderSmall>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        theme: ELoaderSmallTheme.BRAND,
        size: EComponentSize.MD,
    },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: Object.values(ELoaderSmallTheme),
            description: "Тема",
            table: {
                type: { summary: "ELoaderSmallTheme" },
                defaultValue: { summary: "ELoaderSmallTheme.BRAND" },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
    },
    render: (args) => <LoaderSmall {...args} />,
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

export const Themes: Story = {
    name: "Themes",
    render: ThemesExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: ThemesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: Story = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: Story = {
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
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {Object.values(EComponentSize).map((size) => (
                <div key={size} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                    <div style={{ width: "32px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
                    <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={size} />
                    <div style={{ display: "inline-flex", padding: "8px", borderRadius: "8px", background: "#1C1C1E" }}>
                        <LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={size} />
                    </div>
                </div>
            ))}
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
