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

type Story = StoryObj<typeof LoaderSmall>;

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
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
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
    render: DefaultExample,
    parameters: {
        // Визуально дублирует MD-вариант из Visual tests — отдельный скриншот не нужен.
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Themes: Story = {
    render: ThemesExample,
    parameters: {
        // Обе темы сняты в Visual tests — отдельный скриншот не нужен.
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: ThemesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        // Все размеры сняты в Visual tests — отдельный скриншот не нужен.
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: Story = {
    name: "Visual tests",
    tags: ["!autodocs", "!dev"],
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
