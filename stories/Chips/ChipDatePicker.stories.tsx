import React, { useState } from "react";
import { Title, Description, Controls, Stories, Primary, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { StoryObj } from "@storybook/react";
import { ChipDatePicker, EComponentSize, EFormFieldStatus, EDropdownAlignment } from "../../src";

export default {
    title: "Components/Chips/ChipDatePicker",
    component: ChipDatePicker,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
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
};

const useChipDatePickerLogic = () => {
    const [value, setValue] = useState("");

    return {
        value,
        onChange: setValue,
    };
};

export const Playground: StoryObj<typeof ChipDatePicker> = {
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
                alignment={EDropdownAlignment.LEFT}
                size={args.size}
                status="default"
                disabled={args.disabled}
            />
        );
    },
};

export const Default: StoryObj<typeof ChipDatePicker> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const { value, onChange } = useChipDatePickerLogic();

        return (
            <ChipDatePicker
                value={value}
                label="Date label"
                onChange={onChange}
                alignment={EDropdownAlignment.LEFT}
                size={EComponentSize.MD}
                status="default"
            />
        );
    },
};

export const WithCustomDisplayedValue: StoryObj<typeof ChipDatePicker> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ChipDatePicker с переданным displayedValue.",
            },
        },
    },
    render: () => {
        const { value, onChange } = useChipDatePickerLogic();

        return (
            <ChipDatePicker
                value={value}
                label="Date label"
                onChange={onChange}
                alignment={EDropdownAlignment.LEFT}
                size={EComponentSize.MD}
                status="default"
                displayedValue="Date value"
            />
        );
    },
};

export const Sizes: StoryObj<typeof ChipDatePicker> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                {sizes.map((size) => {
                    const { value, onChange } = useChipDatePickerLogic();

                    return (
                        <ChipDatePicker
                            key={size}
                            value={value}
                            label={size.toUpperCase()}
                            onChange={onChange}
                            alignment={EDropdownAlignment.LEFT}
                            size={size}
                            status={EFormFieldStatus.DEFAULT}
                        />
                    );
                })}
            </div>
        );
    },
};
