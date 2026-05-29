import React, { useRef, useState } from "react";
import { ChipSuggest, EChipType, EComponentSize, type ISuggestFieldOption } from "@sberbusiness/triplex-next";
import { mapFruitsToSuggestOptions, SUGGEST_STORY_FRUITS } from "./storyConstants";

type TypeItemProps = {
    type: EChipType;
    label: string;
};

const initialOptions = mapFruitsToSuggestOptions([...SUGGEST_STORY_FRUITS]);

const TypeItem = ({ type, label }: TypeItemProps) => {
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
                type={type}
                size={EComponentSize.MD}
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

const typeOptions = Object.values(EChipType).map((type) => ({
    value: type,
    label: type.toUpperCase(),
}));

export const TypesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {typeOptions.map(({ value, label }) => (
            <TypeItem key={value} type={value} label={label} />
        ))}
    </div>
);
