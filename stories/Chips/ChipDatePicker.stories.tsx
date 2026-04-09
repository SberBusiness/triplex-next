import React, { useState } from "react";
import { Title, Description, Controls, Stories, Primary, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { Meta, StoryObj } from "@storybook/react";
import { ChipDatePicker, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    WithCustomDisplayedValueExample,
    WithCustomDisplayedValueExampleSource,
} from "./examples/ChipDatePicker";

const meta = {
    title: "Components/Chips/ChipDatePicker",
    component: ChipDatePicker,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipDatePicker} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipDatePicker>;

export default meta;
type Story = StoryObj<typeof ChipDatePicker>;

const useChipDatePickerLogic = () => {
    const [value, setValue] = useState("");

    return {
        value,
        onChange: setValue,
    };
};

export const Playground: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: {
            include: ["size", "label", "displayedValue", "disabled"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    args: {
        size: EComponentSize.MD,
        label: "Date label",
        disabled: false,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        label: {
            control: { type: "text" },
            description: "Название поля, которое отображается, когда значение не выбрано",
        },
        displayedValue: {
            control: { type: "text" },
            description: "Лейбл, который отображается вместо выбранного значения",
        },
        disabled: {
            control: { type: "boolean" },
            description: "Состояние disabled",
        },
    },
    render: (args) => {
        const { value, onChange } = useChipDatePickerLogic();

        return (
            <ChipDatePicker
                value={value}
                label={args.label}
                onChange={onChange}
                displayedValue={args.displayedValue || null}
                size={args.size}
                status={EFormFieldStatus.DEFAULT}
                disabled={args.disabled}
            />
        );
    },
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};

export const WithCustomDisplayedValue: Story = {
    render: WithCustomDisplayedValueExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipDatePicker с переданным displayedValue.",
            },
            source: { code: WithCustomDisplayedValueExampleSource, language: "tsx" },
        },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: SizesExampleSource, language: "tsx" } },
    },
};
