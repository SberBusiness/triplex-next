import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MonthYearField } from "../src/components/MonthYearField";
import { EComponentSize } from "../src/enums";
import { EFormFieldStatus } from "../src/components/FormField";

export default {
    title: "Components/MonthYearField",
    component: MonthYearField,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "200px" }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof MonthYearField>;

type Story = StoryObj<typeof MonthYearField>;

export const Playground: Story = {
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        placeholder: "Placeholder",
        label: "Label",
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

        return <MonthYearField value={value} onChange={setValue} {...args} />;
    },
};
