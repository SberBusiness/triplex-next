import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { LoaderMiddle } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource } from "./examples";

const meta = {
    title: "Components/Loaders/LoaderMiddle",
    component: LoaderMiddle,
    parameters: {
        docs: {
            description: {
                component: "Компонент квадратного загрузчика с анимированными точками.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof LoaderMiddle>;

export default meta;

type Story = StoryObj<typeof meta>;

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
    render: () => <LoaderMiddle />,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
