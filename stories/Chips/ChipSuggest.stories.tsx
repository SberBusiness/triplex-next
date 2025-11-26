import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ChipSuggest } from "../../src/components/Chip/ChipSuggest/ChipSuggest";
import { ISuggestFieldOption } from "../../src/components/SuggestField/types";
import { EComponentSize } from "../../src/enums";

const meta = {
    title: "Components/Chips/ChipSuggest",
    component: ChipSuggest,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента.",
            table: {
                type: {
                    summary: Object.values(EComponentSize).join(" | "),
                },
                defaultValue: { summary: EComponentSize.LG },
            },
        },
        label: {
            control: { type: "text" },
            description: "Текст лейбла, который отображается над полем ввода.",
        },
        displayedValue: {
            control: { type: "text" },
            description: "Лейбл, отображаемый вместо выбранного значения.",
        },
        placeholder: {
            control: { type: "text" },
        },
        noOptionsText: {
            control: { type: "text" },
            description: "Текст, отображаемый при отсутствии опций.",
        },
        loading: {
            control: { type: "boolean" },
            description: "Флаг состояния загрузки.",
        },
        clearInputOnFocus: {
            control: { type: "boolean" },
            description: "Определяет, нужно ли очищать поле ввода при получении фокуса.",
        },
    },
} satisfies Meta<typeof ChipSuggest>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = [
    "Hot Pepper",
    "Corn",
    "Tomato",
    "Eggplant",
    "Grapes",
    "Melon",
    "Watermelon",
    "Tangerine",
    "Lemon",
    "Banana",
    "Pineapple",
    "Red Apple",
    "Green Apple",
    "Pear",
    "Peach",
    "Cherries",
    "Strawberry",
    "Avocado",
    "Cucumber",
    "Kiwi",
    "Coconut",
    "Mango",
    "Blueberries",
    "Bell Pepper",
    "Olive",
    "Pea Pod",
];

const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
    id: `suggest-option-${index}`,
    label: fruit,
}));

// Базовая логика для переиспользования
const useChipSuggestLogic = () => {
    const [value, setValue] = useState<ISuggestFieldOption>();
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const initialOptionsRef = useRef<ISuggestFieldOption[]>(initialOptions);

    const handleDropdownOpen = () => {
        setOptions(initialOptionsRef.current);
        setTooltipOpen(false);
    };

    const handleFilter = (inputValue: string) => {
        if (inputValue.length === 0) {
            setOptions(initialOptionsRef.current);
            setTooltipOpen(false);
            return;
        }

        const filteredOptions = initialOptionsRef.current.filter(({ label }) =>
            label.toLowerCase().includes(inputValue.toLowerCase()),
        );

        setOptions(filteredOptions);
        setTooltipOpen(filteredOptions.length === 0);
    };

    return {
        value,
        options,
        tooltipOpen,
        onSelect: setValue,
        onFilter: handleFilter,
        targetProps: { clearSelected: () => setValue(undefined) },
        dropdownProps: { onOpen: handleDropdownOpen },
    };
};

export const Playground: Story = {
    args: {
        size: EComponentSize.LG,
        label: "Label",
        displayedValue: undefined,
        placeholder: "Type to proceed",
        noOptionsText: "No matches found.",
        loading: false,
        clearInputOnFocus: false,
        targetProps: { disabled: false },
    },
    render: (args) => {
        const props = useChipSuggestLogic(args);

        return <ChipSuggest {...props} {...args} targetProps={{ ...props.targetProps, ...args.targetProps }} />;
    },
};

const sizeToLabelMap = {
    [EComponentSize.SM]: "SM",
    [EComponentSize.MD]: "MD",
    [EComponentSize.LG]: "LG",
};

export const DifferentSizes: Story = {
    name: "Different sizes",
    args: {
        placeholder: "Type to proceed",
        displayedValue: undefined,
        noOptionsText: "No matches found.",
        loading: false,
        clearInputOnFocus: false,
        targetProps: { disabled: false },
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
    },
    render: (args) => {
        const sizes = Object.values(EComponentSize);

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                {sizes.map((size) => {
                    const props = useChipSuggestLogic(args);

                    return (
                        <ChipSuggest
                            key={size}
                            size={size}
                            label={sizeToLabelMap[size]}
                            {...props}
                            {...args}
                            targetProps={{ ...props.targetProps, ...args.targetProps }}
                        />
                    );
                })}
            </div>
        );
    },
};

export const DifferentStates: Story = {
    name: "Different states",
    args: {
        size: EComponentSize.LG,
        placeholder: "Type to proceed",
        displayedValue: undefined,
        noOptionsText: "No matches found.",
        loading: false,
        clearInputOnFocus: false,
    },
    argTypes: {
        loading: {
            table: {
                disable: true,
            },
        },
        label: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            {[
                { label: "Default", targetProps: {} },
                { label: "Selected", targetProps: { selected: true } },
                { label: "Disabled", targetProps: { disabled: true } },
            ].map((state) => {
                const props = useChipSuggestLogic(args);

                return (
                    <ChipSuggest
                        key={state.label}
                        label={state.label}
                        {...props}
                        {...args}
                        targetProps={{ ...props.targetProps, ...args.targetProps, ...state.targetProps }}
                    />
                );
            })}
        </div>
    ),
};
