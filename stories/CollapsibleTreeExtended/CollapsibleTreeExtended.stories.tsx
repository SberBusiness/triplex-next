import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CollapsibleTreeExtended } from "../../src/components/CollapsibleTreeExtended/CollapsibleTreeExtended";
import { DefaultExample, DefaultExampleSource } from "./examples";

const meta = {
    title: "Components/CollapsibleTreeExtended",
    component: CollapsibleTreeExtended,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: { component: "Дерево, ноды которого могут сворачиваться и разворачиваться." },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CollapsibleTreeExtended>;

export default meta;
type Story = StoryObj<typeof CollapsibleTreeExtended>;

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};
