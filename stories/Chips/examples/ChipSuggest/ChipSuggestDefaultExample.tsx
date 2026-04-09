import React, { useRef, useState } from "react";
import { ChipSuggest, EComponentSize } from "@sberbusiness/triplex-next";
import { ISuggestFieldOption } from "../../../../src/components/SuggestField/types";

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

export const ChipSuggestDefaultExample = () => {
    const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
        id: `suggest-option-${index}`,
        label: fruit,
    }));
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

    return (
        <ChipSuggest
            value={value}
            options={options}
            tooltipOpen={tooltipOpen}
            onSelect={setValue}
            onFilter={handleFilter}
            targetProps={{ clearSelected: () => setValue(undefined) }}
            dropdownProps={{ onOpen: handleDropdownOpen }}
            label="Suggest label"
            placeholder="Type to proceed"
            noOptionsText="No matches found."
            size={EComponentSize.MD}
        />
    );
};
