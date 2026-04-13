import React, { useRef, useState } from "react";
import { ChipSuggest, EComponentSize, type ISuggestFieldOption } from "@sberbusiness/triplex-next";
import { mapFruitsToOptionsWithNotification, SUGGEST_STORY_FRUITS_SHORT } from "./storyConstants";

export const WithNotificationIconExample = () => {
    const initialOptions = mapFruitsToOptionsWithNotification([...SUGGEST_STORY_FRUITS_SHORT], 2);

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
