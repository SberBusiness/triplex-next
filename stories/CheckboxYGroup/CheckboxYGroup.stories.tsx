import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { CheckboxYGroup } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, SizesExample, SizesExampleSource } from "./examples";

const meta = {
    title: "Components/Checkboxes/CheckboxYGroup",
    component: CheckboxYGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Группа чекбоксов с направлением по оси Y.
                `,
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
} satisfies Meta<typeof CheckboxYGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxYGroup>;

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Группа чекбоксов с направлением по оси Y" },
            source: { code: DefaultExampleSource, language: "tsx" },
        },
    },
};

export const CheckboxSizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Группа чекбоксов разных размеров" },
            source: { code: SizesExampleSource, language: "tsx" },
        },
    },
};
