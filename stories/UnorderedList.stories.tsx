import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { UnorderedList } from "../src/components/UnorderedList";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

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
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
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
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <UnorderedList>
            <UnorderedList.Item>List item text;</UnorderedList.Item>
            <UnorderedList.Item>List item text;</UnorderedList.Item>
            <UnorderedList.Item>List item text.</UnorderedList.Item>
        </UnorderedList>
    ),
};

export const WithLongContent: Story = {
    name: "With Long Content",
    render: () => (
        <UnorderedList>
            <UnorderedList.Item>List item text;</UnorderedList.Item>
            <UnorderedList.Item>List item text;</UnorderedList.Item>
            <UnorderedList.Item>Extremely long list item that fits in two lines.</UnorderedList.Item>
        </UnorderedList>
    ),
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "List with items containing multiline text.",
            },
        },
    },
};
