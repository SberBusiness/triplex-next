import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { debounce } from "lodash-es";
import { useMatchMedia, EScreenWidth, ISuggestFieldOption } from "../../../src";

const getFilteredOptions = (options: ISuggestFieldOption[], query: string): ISuggestFieldOption[] =>
    options.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()));

const useAdaptive = () =>
    useMatchMedia(`(max-width: ${EScreenWidth.SM_MAX})`, window.innerWidth <= parseInt(EScreenWidth.SM_MAX));

export const useSuggestField = (initialOptions: ISuggestFieldOption[], defaultValue?: ISuggestFieldOption) => {
    const [value, setValue] = useState<ISuggestFieldOption | undefined>(defaultValue);
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [inputPristine, setInputPristine] = useState(true);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

    const adaptive = useAdaptive();

    const reset = useCallback(() => {
        setOptions([]);
        setTooltipOpen(false);
    }, []);

    const handleFilter = useCallback(
        (inputValue: string) => {
            setInputPristine(false);

            if (inputValue.length === 0) {
                setOptions(initialOptions);
                setTooltipOpen(false);
            } else {
                const filteredOptions = getFilteredOptions(initialOptions, inputValue);

                setOptions(filteredOptions);
                setTooltipOpen(filteredOptions.length === 0);
            }
        },
        [initialOptions],
    );

    const handleClear = useCallback(() => {
        setValue(undefined);
        setInputPristine(true);
        setOptions(initialOptions);
        setTooltipOpen(false);
    }, [initialOptions]);

    const handleSelect = useCallback(
        (nextValue?: ISuggestFieldOption) => {
            setValue(nextValue);
            setInputPristine(true);
            reset();
        },
        [reset],
    );

    const handleInputBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => {
        if (!adaptive) {
            reset();
        }
    }, [adaptive, reset]);

    const handleInputMouseDown = useCallback<React.MouseEventHandler<HTMLInputElement>>(
        (event) => {
            if (options.length !== 0) {
                return;
            }

            const query = event.currentTarget.value;
            const filteredOptions = getFilteredOptions(initialOptions, inputPristine ? "" : query);

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0 && query.length > 0);
        },
        [options.length, initialOptions, inputPristine],
    );

    return {
        value,
        options,
        tooltipOpen,
        onFilter: handleFilter,
        onClear: handleClear,
        onSelect: handleSelect,
        inputProps: {
            onBlur: handleInputBlur,
            onMouseDown: handleInputMouseDown,
        },
    };
};

export const useSuggestFieldAsync = (initialOptions: ISuggestFieldOption[], defaultValue?: ISuggestFieldOption) => {
    const [value, setValue] = useState<ISuggestFieldOption | undefined>(defaultValue);
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const [dropdownListLoading, setDropdownListLoading] = useState<boolean>(false);

    const filteredOptionsRef = useRef<ISuggestFieldOption[]>([]);
    const lastSearchQueryRef = useRef<string>("");
    const activeRequestRef = useRef<boolean>(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const adaptive = useAdaptive();

    const debouncedFilter = useMemo(
        () =>
            // eslint-disable-next-line react-hooks/refs
            debounce((inputValue: string) => {
                if (!activeRequestRef.current) return;

                const filteredOptions = getFilteredOptions(initialOptions, inputValue);

                filteredOptionsRef.current = filteredOptions;
                lastSearchQueryRef.current = inputValue;

                setOptions(filteredOptions.slice(0, 6));
                setLoading(false);
                setTooltipOpen(filteredOptions.length === 0);
            }, 1000),
        [initialOptions],
    );

    const stopTimers = useCallback(() => {
        debouncedFilter.cancel();
        clearTimeout(scrollTimeoutRef.current);
    }, [debouncedFilter]);

    const stopLoading = useCallback(() => {
        stopTimers();
        setLoading(false);
        setDropdownListLoading(false);
    }, [stopTimers]);

    const reset = useCallback(() => {
        filteredOptionsRef.current = [];
        lastSearchQueryRef.current = "";
        activeRequestRef.current = false;
        stopLoading();
        setOptions([]);
        setTooltipOpen(false);
    }, [stopLoading]);

    const startSearch = useCallback(
        (query: string) => {
            stopTimers();
            activeRequestRef.current = true;

            setTooltipOpen(false);
            setLoading(true);
            debouncedFilter(query);
        },
        [stopTimers, debouncedFilter],
    );

    const handleFilter = useCallback(
        (inputValue: string) => {
            if (inputValue.length === 0) {
                return reset();
            }

            if (inputValue !== lastSearchQueryRef.current) {
                startSearch(inputValue);
            }
        },
        [reset, startSearch],
    );

    const handleSelect = useCallback(
        (nextValue?: ISuggestFieldOption) => {
            setValue(nextValue);
            reset();
        },
        [reset],
    );

    const handleScrollEnd = useCallback(() => {
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
    }, [dropdownListLoading, options.length]);

    const handleInputBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => {
        if (adaptive === false) {
            reset();
        }
    }, [adaptive, reset]);

    const handleInputMouseDown = useCallback<React.MouseEventHandler<HTMLInputElement>>(
        (event) => {
            const query = event.currentTarget.value;

            if (query.length !== 0 && !loading && query !== lastSearchQueryRef.current) {
                startSearch(query);
            }
        },
        [loading, startSearch],
    );

    useEffect(() => {
        return () => {
            activeRequestRef.current = false;
            stopTimers();
        };
    }, [stopTimers]);

    return {
        value,
        options,
        loading,
        tooltipOpen,
        dropdownListLoading,
        onFilter: handleFilter,
        onSelect: handleSelect,
        onScrollEnd: handleScrollEnd,
        inputProps: {
            onBlur: handleInputBlur,
            onMouseDown: handleInputMouseDown,
        },
    };
};
