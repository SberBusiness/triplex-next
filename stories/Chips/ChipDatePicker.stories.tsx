import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipDatePicker } from "../../src/components/Chip/ChipDatePicker/ChipDatePicker";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { EDropdownAlignment } from "../../src/components/Dropdown/enums";

export default {
    title: "Components/Chips/ChipDatePicker",
    component: ChipDatePicker,
    tags: ["autodocs"],
    parameters: {},
};

export const Playground: StoryObj<typeof ChipDatePicker> = {
    args: {
        size: EComponentSize.MD,
        label: "Date label",
        displayedValue: "Date value",
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
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <ChipDatePicker
                value={value}
                label={args.label}
                onChange={setValue}
                displayedValue={args.displayedValue}
                alignment={EDropdownAlignment.LEFT}
                size={args.size}
                status="default"
            />
        );
    },
};

export const DifferentSizes: StoryObj<typeof ChipDatePicker> = {
    args: {
        label: "Date label",
        displayedValue: "Date value",
    },
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        label: {
            table: {
                disable: true,
            },
        },
        displayedValue: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                <ChipDatePicker
                    value={value}
                    label={args.label}
                    onChange={setValue}
                    displayedValue={args.displayedValue}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.SM}
                    status="default"
                />
                <ChipDatePicker
                    value={value}
                    label={args.label}
                    onChange={setValue}
                    displayedValue={args.displayedValue}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.MD}
                    status="default"
                />
                <ChipDatePicker
                    value={value}
                    label={args.label}
                    onChange={setValue}
                    displayedValue={args.displayedValue}
                    alignment={EDropdownAlignment.LEFT}
                    size={EComponentSize.LG}
                    status="default"
                />
            </div>
        );
    },
};
