import React, { useRef, useState } from "react";
import { ChipSuggest, EComponentSize, type ISuggestFieldOption } from "@sberbusiness/triplex-next";
import { mapFruitsToSuggestOptions, SUGGEST_STORY_FRUITS } from "./storyConstants";

type SizeItemProps = {
    size: EComponentSize;
    label: string;
};

const initialOptions = mapFruitsToSuggestOptions([...SUGGEST_STORY_FRUITS]);

const SizeItem = ({ size, label }: SizeItemProps) => {
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
            String(label).toLowerCase().includes(inputValue.toLowerCase()),
        );

        setOptions(filteredOptions);
        setTooltipOpen(filteredOptions.length === 0);
    };

    const handleClearSelected = () => setValue(undefined);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipSuggest
                size={size}
                label="Suggest label"
                placeholder="Type to proceed"
                noOptionsText="No matches found."
                value={value}
                options={options}
                tooltipOpen={tooltipOpen}
                onSelect={setValue}
                onFilter={handleFilter}
                targetProps={{ clearSelected: handleClearSelected }}
                dropdownProps={{ onOpen: handleDropdownOpen }}
            />
        </div>
    );
};

const sizeOptions = Object.values(EComponentSize).map((size) => ({
    value: size,
    label: size.toUpperCase(),
}));

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sizeOptions.map(({ value, label }) => (
            <SizeItem key={value} size={value} label={label} />
        ))}
    </div>
);
