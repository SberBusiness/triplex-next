import React, { useState, useRef, useCallback, useEffect } from "react";
import {
    SuggestField,
    useMatchMedia,
    ISuggestFieldOption,
    EScreenWidth,
    EComponentSize,
    EFormFieldStatus,
} from "@sberbusiness/triplex-next";
import { debounce } from "lodash-es";

const FOOD_NAMES = [
    "Mushroom",
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
] as const;

const FOOD_OPTIONS: ISuggestFieldOption[] = FOOD_NAMES.map((item, index) => ({
    id: `suggest-field-option-${index}`,
    label: item,
}));

const useAdaptive = () =>
    useMatchMedia(`(max-width: ${EScreenWidth.SM_MAX})`, window.innerWidth <= parseInt(EScreenWidth.SM_MAX));

const getFilteredOptions = (query: string): ISuggestFieldOption[] =>
    FOOD_OPTIONS.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()));

export const AsyncExample = () => {
    const [value, setValue] = useState<ISuggestFieldOption | undefined>(undefined);
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const [dropdownListLoading, setDropdownListLoading] = useState<boolean>(false);

    const filteredOptionsRef = useRef<typeof options>([]);
    const lastSearchQueryRef = useRef<string>("");
    const activeRequestRef = useRef<boolean>(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const adaptive = useAdaptive();

    const debouncedFilter = useRef(
        // eslint-disable-next-line react-hooks/refs
        debounce((inputValue: string) => {
            if (!activeRequestRef.current) return;

            const filteredOptions = getFilteredOptions(inputValue);

            filteredOptionsRef.current = filteredOptions;
            lastSearchQueryRef.current = inputValue;

            setOptions(filteredOptions.slice(0, 6));
            setLoading(false);
            setTooltipOpen(filteredOptions.length === 0);
        }, 1000),
    ).current;

    const stopTimers = useCallback(() => {
        debouncedFilter.cancel();
        clearTimeout(scrollTimeoutRef.current);
    }, [debouncedFilter]);

    const stopLoading = () => {
        stopTimers();
        setLoading(false);
        setDropdownListLoading(false);
    };

    const reset = () => {
        filteredOptionsRef.current = [];
        lastSearchQueryRef.current = "";
        activeRequestRef.current = false;
        stopLoading();
        setOptions([]);
        setTooltipOpen(false);
    };

    const startSearch = (query: string) => {
        stopTimers();
        activeRequestRef.current = true;

        setTooltipOpen(false);
        setLoading(true);
        setDropdownListLoading(false);
        debouncedFilter(query);
    };

    const handleFilter = (inputValue: string) => {
        if (inputValue.length === 0) {
            return reset();
        }

        if (inputValue !== lastSearchQueryRef.current) {
            startSearch(inputValue);
        }
    };

    const handleSelect = (nextValue: typeof value) => {
        setValue(nextValue);
        reset();
    };

    const handleScrollEnd = () => {
        const filteredOptions = filteredOptionsRef.current;

        if (dropdownListLoading || options.length === 0 || options.length === filteredOptions.length) {
            return;
        }

        clearTimeout(scrollTimeoutRef.current);
        setDropdownListLoading(true);

        scrollTimeoutRef.current = setTimeout(() => {
            setOptions((prevOptions) => {
                const nextChunk = filteredOptions.slice(prevOptions.length, prevOptions.length + 6);
                return [...prevOptions, ...nextChunk];
            });
            setDropdownListLoading(false);
        }, 1000);
    };

    const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        if (adaptive === false) {
            reset();
        }
    };

    const handleInputMouseDown: React.MouseEventHandler<HTMLInputElement> = (event) => {
        const query = event.currentTarget.value;

        if (query.length !== 0 && !loading && query !== lastSearchQueryRef.current) {
            startSearch(query);
        }
    };

    useEffect(() => {
        return () => {
            activeRequestRef.current = false;
            stopTimers();
        };
    }, [stopTimers]);

    return (
        <div style={{ maxWidth: 300 }}>
            <SuggestField
                value={value}
                options={options}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label="Label"
                placeholder="Type to proceed"
                tooltipHint="No matches found."
                loading={loading}
                tooltipOpen={tooltipOpen}
                onFilter={handleFilter}
                onSelect={handleSelect}
                onScrollEnd={handleScrollEnd}
                inputProps={{
                    onBlur: handleInputBlur,
                    onMouseDown: handleInputMouseDown,
                }}
            />
        </div>
    );
};
