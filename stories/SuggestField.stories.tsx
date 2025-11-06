import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    SuggestField,
    ISuggestFieldOption,
    EFormFieldSize,
    EFormFieldStatus,
    Text,
    ETextSize,
    EFontType,
} from "../src";

export default {
    title: "Components/SuggestField",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Выпадающий список с возможностью поиска по введённому значению. Поддерживает кастомные опции, различные состояния и размеры.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "300px" }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EFormFieldSize),
            description: "Размер компонента.",
            table: {
                type: {
                    summary: Object.values(EFormFieldSize).join(" | "),
                },
                defaultValue: { summary: EFormFieldSize.LG },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Визуальное состояние компонента.",
            table: {
                type: {
                    summary: Object.values(EFormFieldStatus).join(" | "),
                },
                defaultValue: { summary: EFormFieldStatus.DEFAULT },
            },
        },
        label: {
            control: { type: "text" },
            description: "Текст лейбла, который отображается над полем ввода.",
        },
        placeholder: {
            control: { type: "text" },
            description: "Текст подсказки, которая отображается в поле ввода когда оно пустое и не в фокусе.",
        },
        tooltipHint: {
            control: { type: "text" },
            description: "Текст Tooltip.",
        },
        loading: {
            control: { type: "boolean" },
            description: "Флаг состояния загрузки.",
        },
        dropdownListLoading: {
            control: { type: "boolean" },
            description: "Флаг состояния загрузки DropdownList.",
        },
        clearInputOnFocus: {
            control: { type: "boolean" },
            description: "Определяет, нужно ли очищать поле ввода при получении фокуса.",
        },
    },
} as Meta<typeof SuggestField>;

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
const useSuggestFieldLogic = () => {
    const [value, setValue] = useState<ISuggestFieldOption>();
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleTargetInputFocus = () => {
        setOptions(initialOptions);
        setTooltipOpen(false);
    };

    const handleFilter = (inputValue: string) => {
        if (inputValue.length === 0) {
            setOptions(initialOptions);
            setTooltipOpen(false);
            return;
        }

        const filteredOptions = initialOptions.filter(({ label }) =>
            label.toLowerCase().includes(inputValue.toLowerCase()),
        );

        setOptions(filteredOptions);
        setTooltipOpen(filteredOptions.length === 0);
    };

    const handleSelect = (value?: ISuggestFieldOption) => {
        setValue(value);
    };

    return {
        value,
        options,
        tooltipOpen,
        onTargetInputFocus: handleTargetInputFocus,
        onFilter: handleFilter,
        onSelect: handleSelect,
    };
};

export const Playground: StoryObj = {
    args: {
        size: EFormFieldSize.LG,
        status: EFormFieldStatus.DEFAULT,
        label: "Label",
        placeholder: "Type to proceed",
        tooltipHint: "No matches found.",
        loading: false,
        dropdownListLoading: false,
        clearInputOnFocus: false,
    },
    render: (args) => {
        const { value, options, tooltipOpen, onTargetInputFocus, onFilter, onSelect } = useSuggestFieldLogic();

        return (
            <SuggestField
                value={value}
                options={options}
                tooltipOpen={tooltipOpen}
                onTargetInputFocus={onTargetInputFocus}
                onFilter={onFilter}
                onSelect={onSelect}
                {...args}
            />
        );
    },
};

const sizeToLabelMap = {
    [EFormFieldSize.SM]: "SM",
    [EFormFieldSize.MD]: "MD",
    [EFormFieldSize.LG]: "LG",
};

export const DifferentSizes = {
    render: () => {
        const sizes = Object.values(EFormFieldSize);

        return sizes.map((size) => {
            const { value, options, tooltipOpen, onTargetInputFocus, onFilter, onSelect } = useSuggestFieldLogic();

            return (
                <SuggestField
                    key={size}
                    size={size}
                    label={sizeToLabelMap[size]}
                    value={value}
                    options={options}
                    placeholder="Type to proceed"
                    tooltipHint="No matches found."
                    tooltipOpen={tooltipOpen}
                    onTargetInputFocus={onTargetInputFocus}
                    onFilter={onFilter}
                    onSelect={onSelect}
                />
            );
        });
    },
};

const statusToLabelMap = {
    [EFormFieldStatus.DEFAULT]: "Default",
    [EFormFieldStatus.DISABLED]: "Disabled",
    [EFormFieldStatus.ERROR]: "Error",
    [EFormFieldStatus.WARNING]: "Warning",
};

export const DifferentStates = {
    render: () => {
        const statuses = Object.values(EFormFieldStatus);

        return statuses.map((status) => {
            const { value, options, tooltipOpen, onTargetInputFocus, onFilter, onSelect } = useSuggestFieldLogic();

            return (
                <SuggestField
                    key={status}
                    status={status}
                    value={value}
                    options={options}
                    label={statusToLabelMap[status]}
                    tooltipHint="No matches found."
                    tooltipOpen={tooltipOpen}
                    onTargetInputFocus={onTargetInputFocus}
                    onFilter={onFilter}
                    onSelect={onSelect}
                />
            );
        });
    },
};

export const WithLoadingStates = {
    render: () => {
        const { value, options, tooltipOpen, onTargetInputFocus, onFilter, onSelect } = useSuggestFieldLogic();

        return (
            <SuggestField
                value={value}
                options={options}
                label="Label"
                tooltipHint="No matches found."
                tooltipOpen={tooltipOpen}
                loading={true}
                dropdownListLoading={true}
                onTargetInputFocus={onTargetInputFocus}
                onFilter={onFilter}
                onSelect={onSelect}
            />
        );
    },
};

const fruitToTupleMap = {
    "Hot Pepper": ["🌶️", "Berries"],
    Corn: ["🌽", "Dry Fruits"],
    Tomato: ["🍅", "Berries"],
    Eggplant: ["🍆", "Berries"],
    Grapes: ["🍇", "Berries"],
    Melon: ["🍈", "Pepos"],
    Watermelon: ["🍉", "Pepos"],
    Tangerine: ["🍊", "Hesperidia"],
    Lemon: ["🍋", "Hesperidia"],
    Banana: ["🍌", "Berries"],
    Pineapple: ["🍍", "Multiple Fruits"],
    "Red Apple": ["🍎", "Pomes"],
    "Green Apple": ["🍏", "Pomes"],
    Pear: ["🍐", "Pomes"],
    Peach: ["🍑", "Drupes"],
    Cherries: ["🍒", "Drupes"],
    Strawberry: ["🍓", "Aggregate Fruits"],
    Avocado: ["🥑", "Berries"],
    Cucumber: ["🥒", "Pepos"],
    Kiwi: ["🥝", "Berries"],
    Coconut: ["🥥", "Drupes"],
    Mango: ["🥭", "Drupes"],
    Blueberries: ["🫐", "Berries"],
    "Bell Pepper": ["🫑", "Berries"],
    Olive: ["🫒", "Drupes"],
    "Pea Pod": ["🫛", "Dry Fruits"],
};

export const WithCustomOptions = {
    render: () => {
        const { value, tooltipOpen, onTargetInputFocus, onSelect } = useSuggestFieldLogic();
        const [options, setOptions] = useState<ISuggestFieldOption[]>([]);

        const customOptions: ISuggestFieldOption[] = initialOptions.map((option, index) => ({
            ...option,
            labelReactNode: (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{fruitToTupleMap[option.label][0]}</span>
                    <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                        {option.label}
                    </Text>
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY} style={{ marginLeft: "auto" }}>
                        {fruitToTupleMap[option.label][1]}
                    </Text>
                </div>
            ),
        }));

        const handleFilter = (inputValue: string) => {
            if (inputValue.length === 0) {
                setOptions(customOptions);
                return;
            }

            const filteredOptions = customOptions.filter(({ label }) =>
                label.toLowerCase().includes(inputValue.toLowerCase()),
            );
            setOptions(filteredOptions);
        };

        const handleTargetInputFocusWithCustom = () => {
            setOptions(customOptions);
            onTargetInputFocus();
        };

        return (
            <SuggestField
                value={value}
                options={options}
                label="Label"
                tooltipHint="No matches found."
                tooltipOpen={tooltipOpen}
                onTargetInputFocus={handleTargetInputFocusWithCustom}
                onFilter={handleFilter}
                onSelect={onSelect}
            />
        );
    },
};
