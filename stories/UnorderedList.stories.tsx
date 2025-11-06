import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { UnorderedList } from "../src/components/UnorderedList";

export default {
    title: "Components/UnorderedList",
    component: UnorderedList,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: `Unordered list for displaying non-sequential items.

**Usage example:**

\`\`\`tsx
import { UnorderedList } from "@sberbusiness/triplex-next/components/UnorderedList";

<UnorderedList>
    <UnorderedList.Item>List item text;</UnorderedList.Item>
    <UnorderedList.Item>List item text;</UnorderedList.Item>
    <UnorderedList.Item>List item text.</UnorderedList.Item>
</UnorderedList>
\`\`\`
                `,
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "200px" }}>
                <Story />
            </div>
        ),
    ],
} as Meta<typeof UnorderedList>;

type Story = StoryObj<typeof UnorderedList>;

export const Default: Story = {
    render: (args) => (
        <UnorderedList {...args}>
            <UnorderedList.Item>List item text;</UnorderedList.Item>
            <UnorderedList.Item>List item text;</UnorderedList.Item>
            <UnorderedList.Item>List item text.</UnorderedList.Item>
        </UnorderedList>
    ),
};

export const WithLongContent: Story = {
    render: (args) => (
        <UnorderedList {...args}>
            <UnorderedList.Item>List item text;</UnorderedList.Item>
            <UnorderedList.Item>List item text;</UnorderedList.Item>
            <UnorderedList.Item>Extremely long list item that fits in two lines.</UnorderedList.Item>
        </UnorderedList>
    ),
    parameters: {
        docs: {
            description: {
                story: "List with items containing multiline text.",
            },
        },
    },
};
