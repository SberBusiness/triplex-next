import React, { useState } from "react";
import {
    SuggestField,
    Text,
    useMatchMedia,
    ISuggestFieldOption,
    EScreenWidth,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";

const FOOD_DATA = [
    { label: "Mushroom", icon: "🍄", category: "Vegetable" },
    { label: "Tomato", icon: "🍅", category: "Vegetable" },
    { label: "Eggplant", icon: "🍆", category: "Vegetable" },
    { label: "Grapes", icon: "🍇", category: "Fruit" },
    { label: "Melon", icon: "🍈", category: "Fruit" },
    { label: "Watermelon", icon: "🍉", category: "Fruit" },
    { label: "Tangerine", icon: "🍊", category: "Fruit" },
    { label: "Lemon", icon: "🍋", category: "Fruit" },
    { label: "Banana", icon: "🍌", category: "Fruit" },
    { label: "Pineapple", icon: "🍍", category: "Fruit" },
    { label: "Red apple", icon: "🍎", category: "Fruit" },
    { label: "Green apple", icon: "🍏", category: "Fruit" },
    { label: "Pear", icon: "🍐", category: "Fruit" },
    { label: "Peach", icon: "🍑", category: "Fruit" },
    { label: "Cherries", icon: "🍒", category: "Fruit" },
    { label: "Strawberry", icon: "🍓", category: "Fruit" },
] as const;

const FOOD_OPTIONS: ISuggestFieldOption[] = FOOD_DATA.map((item, index) => ({
    id: `suggest-field-option-${index}`,
    label: item.label,
    content: (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>{item.icon}</span>
            <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                {item.label}
            </Text>
            <Text size={ETextSize.B3} type={EFontType.SECONDARY} style={{ marginLeft: "auto" }}>
                {item.category}
            </Text>
        </div>
    ),
}));

const useAdaptive = () =>
    useMatchMedia(`(max-width: ${EScreenWidth.SM_MAX})`, window.innerWidth <= parseInt(EScreenWidth.SM_MAX));

const getFilteredOptions = (query: string): ISuggestFieldOption[] =>
    FOOD_OPTIONS.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()));

export const CustomOptionsExample = () => {
    const [value, setValue] = useState<ISuggestFieldOption | undefined>(undefined);
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [inputPristine, setInputPristine] = useState(true);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

    const adaptive = useAdaptive();

    const reset = (newOptions: typeof options) => {
        setOptions(newOptions);
        setInputPristine(true);
        setTooltipOpen(false);
    };

    const handleFilter = (inputValue: string) => {
        setInputPristine(false);

        if (inputValue.length === 0) {
            setOptions(FOOD_OPTIONS);
            setTooltipOpen(false);
        } else {
            const filteredOptions = getFilteredOptions(inputValue);

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0);
        }
    };

    const handleSelect = (nextValue: typeof value) => {
        setValue(nextValue);
        reset([]);
    };

    const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        if (!adaptive) {
            reset([]);
        }
    };

    const handleInputMouseDown: React.MouseEventHandler<HTMLInputElement> = (event) => {
        if (options.length === 0) {
            const query = event.currentTarget.value;
            const filteredOptions = getFilteredOptions(inputPristine ? "" : query);

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0 && query.length !== 0);
        } else if (adaptive) {
            reset(FOOD_OPTIONS);
        }
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <SuggestField
                value={value}
                options={options}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label="Label"
                placeholder="Type to proceed"
                tooltipHint="No matches found."
                tooltipOpen={tooltipOpen}
                onFilter={handleFilter}
                onSelect={handleSelect}
                inputProps={{
                    onBlur: handleInputBlur,
                    onMouseDown: handleInputMouseDown,
                }}
            />
        </div>
    );
};
