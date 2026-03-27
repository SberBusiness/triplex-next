import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { OrderedList } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, WithLongContentExample, WithLongContentExampleSource } from "./examples";

const meta = {
    title: "Components/OrderedList",
    component: OrderedList,
    parameters: {
        docs: {
            description: {
                component: "Нумерованный список.",
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
} satisfies Meta<typeof OrderedList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithLongContent: Story = {
    name: "WithLongContent",
    render: WithLongContentExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithLongContentExampleSource,
                language: "tsx",
            },
        },
    },
};
