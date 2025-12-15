import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipSort } from "../../src/components/Chip/ChipSort";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Chips/ChipSort",
    component: ChipSort,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
ChipSelect с иконкой выбора сортировки.

## Особенности

- **Размеры**: SM, MD, LG.
- Элемент отображается как selected, если выбранное значение (value) отличается от свойства defaultValue.
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
};

const options = [
    { id: "chip-sort-1", label: "По дате", value: "i1" },
    { id: "chip-sort-2", label: "По времени", value: "i2" },
    { id: "chip-sort-3", label: "По названию", value: "i3" },
];

export const Playground: StoryObj<typeof ChipSort> = {
    name: "Playground",
    args: {
        size: EComponentSize.MD,
        disabled: false,
        defaultValue: 0,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: { type: { summary: "EComponentSize" }, defaultValue: { summary: EComponentSize.SM } },
        },
        disabled: { control: { type: "boolean" } },
        defaultValue: {
            control: { type: "select" },
            options: [0, 1, 2],
            description: "Дефолтное значение",
        },
    },
    parameters: {
        controls: {
            include: ["size", "disabled", "defaultValue"],
        },
    },
    render: (args) => {
        const [value, setValue] = useState(options[0]);

        const defaultValue =
            args.defaultValue !== undefined && args.defaultValue !== null ? options[args.defaultValue] : undefined;

        return <ChipSort {...args} defaultValue={defaultValue} value={value} options={options} onChange={setValue} />;
    },
};

export const Default: StoryObj<typeof ChipSort> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState(options[0]);

        return <ChipSort defaultValue={options[0]} value={value} options={options} onChange={setValue} />;
    },
};

export const DifferentSizes: StoryObj<typeof ChipSort> = {
    name: "Different Sizes",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [valueSM, setValueSM] = useState(options[0]);
        const [valueMD, setValueMD] = useState(options[0]);
        const [valueLG, setValueLG] = useState(options[0]);

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.SM}
                    value={valueSM}
                    options={options}
                    onChange={setValueSM}
                />
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.MD}
                    value={valueMD}
                    options={options}
                    onChange={setValueMD}
                />
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.LG}
                    value={valueLG}
                    options={options}
                    onChange={setValueLG}
                />
            </div>
        );
    },
};
