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

export const ChipSuggestSizesExample = () => {
    const initialOptions: ISuggestFieldOption[] = fruits.map((fruit, index) => ({
        id: `suggest-option-${index}`,
        label: fruit,
    }));
    const [valueSM, setValueSM] = useState<ISuggestFieldOption>();
    const [valueMD, setValueMD] = useState<ISuggestFieldOption>();
    const [valueLG, setValueLG] = useState<ISuggestFieldOption>();
    const [options, setOptions] = useState<ISuggestFieldOption[]>(initialOptions);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const initialOptionsRef = useRef<ISuggestFieldOption[]>(initialOptions);

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
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipSuggest
                    size={EComponentSize.SM}
                    label="Suggest label"
                    placeholder="Type to proceed"
                    noOptionsText="No matches found."
                    value={valueSM}
                    options={options}
                    tooltipOpen={tooltipOpen}
                    onSelect={setValueSM}
                    onFilter={handleFilter}
                    targetProps={{ clearSelected: () => setValueSM(undefined) }}
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipSuggest
                    size={EComponentSize.MD}
                    label="Suggest label"
                    placeholder="Type to proceed"
                    noOptionsText="No matches found."
                    value={valueMD}
                    options={options}
                    tooltipOpen={tooltipOpen}
                    onSelect={setValueMD}
                    onFilter={handleFilter}
                    targetProps={{ clearSelected: () => setValueMD(undefined) }}
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipSuggest
                    size={EComponentSize.LG}
                    label="Suggest label"
                    placeholder="Type to proceed"
                    noOptionsText="No matches found."
                    value={valueLG}
                    options={options}
                    tooltipOpen={tooltipOpen}
                    onSelect={setValueLG}
                    onFilter={handleFilter}
                    targetProps={{ clearSelected: () => setValueLG(undefined) }}
                />
            </div>
        </div>
    );
};
