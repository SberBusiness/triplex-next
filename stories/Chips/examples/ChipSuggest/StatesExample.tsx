import React, { useRef, useState } from "react";
import { ChipSuggest, EComponentSize, type ISuggestFieldOption } from "@sberbusiness/triplex-next";
import { mapFruitsToSuggestOptions, SUGGEST_STORY_FRUITS } from "./storyConstants";

const states = [
    { id: "selected", label: "SELECTED" },
    { id: "disabled", label: "DISABLED", targetProps: { disabled: true } },
];

export const StatesExample = () => {
    const initialOptions = mapFruitsToSuggestOptions([...SUGGEST_STORY_FRUITS]);

    const [valueSelected, setValueSelected] = useState<ISuggestFieldOption | undefined>(initialOptions[0]);
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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {states.map((state) => (
                <div key={state.id}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{state.label}</div>
                    <ChipSuggest
                        label="Suggest label"
                        size={EComponentSize.MD}
                        placeholder="Type to proceed"
                        noOptionsText="No matches found."
                        value={state.id === "selected" ? valueSelected : valueDisabled}
                        options={options}
                        tooltipOpen={tooltipOpen}
                        onSelect={state.id === "selected" ? setValueSelected : setValueDisabled}
                        onFilter={handleFilter}
                        targetProps={{
                            clearSelected: () =>
                                state.id === "selected" ? setValueSelected(undefined) : setValueDisabled(undefined),
                            ...state.targetProps,
                        }}
                        dropdownProps={{ onOpen: handleDropdownOpen }}
                    />
                </div>
            ))}
        </div>
    );
};
