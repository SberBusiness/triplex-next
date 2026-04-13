import React, { useRef, useState } from "react";
import { ChipSuggest, EComponentSize, type ISuggestFieldOption } from "@sberbusiness/triplex-next";
import { mapFruitsToSuggestOptions, SUGGEST_STORY_FRUITS } from "./storyConstants";

export const SizesExample = () => {
    const sizes = Object.values(EComponentSize);

    const initialOptions = mapFruitsToSuggestOptions([...SUGGEST_STORY_FRUITS]);

    const [valueSM, setValueSM] = useState<ISuggestFieldOption>();
    const [valueMD, setValueMD] = useState<ISuggestFieldOption>();
    const [valueLG, setValueLG] = useState<ISuggestFieldOption>();

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
            String(label).toLowerCase().includes(inputValue.toLowerCase()),
        );

        setOptions(filteredOptions);
        setTooltipOpen(filteredOptions.length === 0);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            {sizes.map((size) => (
                <ChipSuggest
                    key={size}
                    size={size}
                    label={size.toUpperCase()}
                    placeholder="Type to proceed"
                    noOptionsText="No matches found."
                    value={size === EComponentSize.SM ? valueSM : size === EComponentSize.MD ? valueMD : valueLG}
                    options={options}
                    tooltipOpen={tooltipOpen}
                    onSelect={
                        size === EComponentSize.SM ? setValueSM : size === EComponentSize.MD ? setValueMD : setValueLG
                    }
                    onFilter={handleFilter}
                    targetProps={{
                        clearSelected: () =>
                            size === EComponentSize.SM
                                ? setValueSM(undefined)
                                : size === EComponentSize.MD
                                  ? setValueMD(undefined)
                                  : setValueLG(undefined),
                    }}
                    dropdownProps={{ onOpen: handleDropdownOpen }}
                />
            ))}
        </div>
    );
};
