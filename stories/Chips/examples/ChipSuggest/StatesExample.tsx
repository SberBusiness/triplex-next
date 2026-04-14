import React, { useRef, useState } from "react";
import { ChipSuggest, EComponentSize, type ISuggestFieldOption } from "@sberbusiness/triplex-next";
import { mapFruitsToSuggestOptions, SUGGEST_STORY_FRUITS } from "./storyConstants";

const states = [
    { id: "selected" as const, targetProps: { selected: true as const } },
    { id: "disabled" as const, targetProps: { disabled: true as const } },
];

export const StatesExample = () => {
    const initialOptions = mapFruitsToSuggestOptions([...SUGGEST_STORY_FRUITS]);

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
            String(label).toLowerCase().includes(inputValue.toLowerCase()),
        );

        setOptions(filteredOptions);
        setTooltipOpen(filteredOptions.length === 0);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            {states.map((state) => (
                <ChipSuggest
                    key={state.id}
                    label={state.targetProps.selected ? "Selected" : "Disabled"}
                    size={EComponentSize.MD}
                    placeholder="Type to proceed"
                    noOptionsText="No matches found."
                    value={state.targetProps.selected ? valueSelected : valueDisabled}
                    options={options}
                    tooltipOpen={tooltipOpen}
                    onSelect={state.targetProps.selected ? setValueSelected : setValueDisabled}
                    onFilter={handleFilter}
                    targetProps={{
                        clearSelected: () =>
                            state.targetProps.selected ? setValueSelected(undefined) : setValueDisabled(undefined),
                        ...state.targetProps,
                    }}
                    dropdownProps={{ onOpen: handleDropdownOpen }}
                />
            ))}
        </div>
    );
};
