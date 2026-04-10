import React, { useRef, useState } from "react";
import { ChipSuggest, type ISuggestFieldOption } from "@sberbusiness/triplex-next";
import { mapFruitsToSuggestOptions, SUGGEST_STORY_FRUITS } from "./storyConstants";

export const PlaygroundExample = (args: React.ComponentProps<typeof ChipSuggest>) => {
    const initialOptions = mapFruitsToSuggestOptions([...SUGGEST_STORY_FRUITS]);

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
            {...args}
            value={value}
            options={options}
            tooltipOpen={tooltipOpen}
            onSelect={setValue}
            onFilter={handleFilter}
            targetProps={{
                ...args.targetProps,
                clearSelected: () => {
                    setValue(undefined);
                    args.targetProps?.clearSelected?.();
                },
            }}
            dropdownProps={{ ...args.dropdownProps, onOpen: handleDropdownOpen }}
        />
    );
};
