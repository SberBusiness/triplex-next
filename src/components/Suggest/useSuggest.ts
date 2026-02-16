import React, { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { uniqueId } from "lodash-es";
import { ISuggestOption, ISuggestProps } from "./types";
import { isKey } from "@sberbusiness/triplex-next/utils";

export const useSuggest = <T extends ISuggestOption = ISuggestOption>({
    value,
    onSelect,
    onFilter,
    onKeyDown,
}: Pick<ISuggestProps<T>, "value" | "onSelect" | "onFilter" | "onKeyDown">) => {
    const [inputValue, setInputValue] = useState(value?.label || "");
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [prevValue, setPrevValue] = useState(value);
    const [dropdownListId] = useState(() => `dropdown-list-${uniqueId()}`);

    // Синхронизация стейта при изменении внешнего пропса
    if (value !== prevValue) {
        setPrevValue(value);
        setInputValue(value?.label || "");
    }

    const latestValueRef = useRef(value);
    // Обновляем ref после каждого рендера, чтобы closeDropdown всегда имел доступ к актуальному value.
    useLayoutEffect(() => {
        latestValueRef.current = value;
    });

    const closeDropdown = useCallback((newInputValue?: string) => {
        setInputValue(newInputValue ?? (latestValueRef.current?.label || ""));
        setActiveDescendant(undefined);
        setDropdownOpen(false);
    }, []);

    const handleSelect = useCallback(
        (selectedValue: T | undefined) => {
            closeDropdown(selectedValue?.label);
            onSelect(selectedValue);
        },
        [closeDropdown, onSelect],
    );

    const handleFilter = useCallback(
        (newValue: string) => {
            setInputValue(newValue);
            onFilter(newValue);
        },
        [onFilter],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (dropdownOpen && isKey(event.key, "ESCAPE")) {
                event.stopPropagation();
                closeDropdown();
            }
            onKeyDown?.(event);
        },
        [dropdownOpen, closeDropdown, onKeyDown],
    );

    return useMemo(
        () => ({
            inputValue,
            activeDescendant,
            dropdownOpen,
            dropdownListId,
            setInputValue,
            setDropdownOpen,
            setActiveDescendant,
            closeDropdown,
            onSelect: handleSelect,
            onFilter: handleFilter,
            onKeyDown: handleKeyDown,
        }),
        [
            inputValue,
            activeDescendant,
            dropdownOpen,
            dropdownListId,
            closeDropdown,
            handleSelect,
            handleFilter,
            handleKeyDown,
        ],
    );
};
