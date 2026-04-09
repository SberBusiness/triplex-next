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

export const ChipSuggestStatesExample = () => {
    const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
        id: `suggest-option-${index}`,
        label: fruit,
    }));
    const [valueSelected, setValueSelected] = useState<ISuggestFieldOption>();
    const [valueDisabled, setValueDisabled] = useState<ISuggestFieldOption>();
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Selected</div>
                <ChipSuggest
                    size={EComponentSize.MD}
                    label="Suggest label"
                    placeholder="Type to proceed"
                    noOptionsText="No matches found."
                    value={valueSelected}
                    options={options}
                    tooltipOpen={tooltipOpen}
                    onSelect={setValueSelected}
                    onFilter={handleFilter}
                    targetProps={{ selected: true, clearSelected: () => setValueSelected(undefined) }}
                    dropdownProps={{ onOpen: handleDropdownOpen }}
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Disabled</div>
                <ChipSuggest
                    size={EComponentSize.MD}
                    label="Suggest label"
                    placeholder="Type to proceed"
                    noOptionsText="No matches found."
                    value={valueDisabled}
                    options={options}
                    tooltipOpen={tooltipOpen}
                    onSelect={setValueDisabled}
                    onFilter={handleFilter}
                    targetProps={{ disabled: true, clearSelected: () => setValueDisabled(undefined) }}
                    dropdownProps={{ onOpen: handleDropdownOpen }}
                />
            </div>
        </div>
    );
};
