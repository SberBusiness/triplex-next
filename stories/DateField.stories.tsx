import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DateField } from "../src/components/DateField";
import { EComponentSize } from "../src/enums";
import { EFormFieldStatus } from "../src/components/FormField";

export default {
    title: "Components/DateField",
    component: DateField,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "200px" }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DateField>;

type Story = StoryObj<typeof DateField>;

export const Playground: Story = {
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        placeholderMask: "дд.мм.гггг",
        label: "Label",
        invalidDateHint: "Указана недоступная для выбора дата.",
    },
    argTypes: {
        value: {
            table: {
                disable: true,
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: {
                type: { summary: "EComponentSize" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            table: {
                type: { summary: "EFormFieldStatus" },
            },
        },
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return <DateField value={value} onChange={setValue} {...args} />;
    },
};
