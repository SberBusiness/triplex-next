import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { OrderedList } from "../src/components/OrderedList";

export default {
    title: "Components/OrderedList",
    component: OrderedList,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: `Ordered list for displaying sequential items.

**Usage example:**

\`\`\`tsx
import { OrderedList } from "@sberbusiness/triplex-next/components/OrderedList";

<OrderedList>
    <OrderedList.Item>List item text;</OrderedList.Item>
    <OrderedList.Item>List item text;</OrderedList.Item>
    <OrderedList.Item>List item text.</OrderedList.Item>
</OrderedList>
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
} as Meta<typeof OrderedList>;

type Story = StoryObj<typeof OrderedList>;

export const Default: Story = {
    render: (args) => (
        <OrderedList {...args}>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>List item text.</OrderedList.Item>
        </OrderedList>
    ),
};

export const WithLongContent: Story = {
    render: (args) => (
        <OrderedList {...args}>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>Extremely long list item that fits in two lines.</OrderedList.Item>
        </OrderedList>
    ),
    parameters: {
        docs: {
            description: {
                story: "List with items containing multiline text.",
            },
        },
    },
};
