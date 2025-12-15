import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DateField } from "../src/components/DateField";
import { EComponentSize } from "../src/enums";
import { EFormFieldStatus } from "../src/components/FormField";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

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
} satisfies Meta<typeof DateField>;

type Story = StoryObj<typeof DateField>;

export const Playground: Story = {
    name: "Playground",
    args: {
        size: EComponentSize.LG,
        status: EFormFieldStatus.DEFAULT,
        placeholderMask: "дд.мм.гггг",
        label: "Label",
        invalidDateHint: "Указана недоступная для выбора дата.",
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
            include: ["size", "status", "placeholderMask", "label", "invalidDateHint"],
        },
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return <DateField value={value} onChange={setValue} {...args} />;
    },
};

export const Default: Story = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("");

        return <DateField value={value} onChange={setValue} label="Label" placeholderMask="дд.мм.гггг" />;
    },
};
