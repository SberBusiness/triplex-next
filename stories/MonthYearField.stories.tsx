import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MonthYearField } from "../src/components/MonthYearField";
import { EComponentSize } from "../src/enums";
import { EFormFieldStatus } from "../src/components/FormField";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/MonthYearField",
    component: MonthYearField,
    tags: ["autodocs"],
    parameters: {
        docs: {
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
} satisfies Meta<typeof MonthYearField>;

type Story = StoryObj<typeof MonthYearField>;

export const Playground: Story = {
    name: "Playground",
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        placeholder: "Placeholder",
        label: "Label",
    },
    argTypes: {
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
    parameters: {
        controls: {
            include: ["size", "status", "placeholder", "label"],
        },
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return <MonthYearField value={value} onChange={setValue} {...args} />;
    },
};

export const Default: Story = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("");

        return <MonthYearField value={value} onChange={setValue} placeholder="Placeholder" label="Label" />;
    },
};
