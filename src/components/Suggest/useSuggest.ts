import React, { useState, useId, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { ISuggestOption, ISuggestProps } from "./types";
import { isKey } from "@sberbusiness/triplex-next/utils";

export const useSuggest = <T extends ISuggestOption = ISuggestOption>(
    { value, onSelect, onFilter, onKeyDown }: Pick<ISuggestProps<T>, "value" | "onSelect" | "onFilter" | "onKeyDown">,
    suggestRef: React.MutableRefObject<HTMLDivElement | null>,
    dropdownRef: React.RefObject<HTMLDivElement | null>,
) => {
    const [inputValue, setInputValue] = useState(value?.label || "");
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [prevValue, setPrevValue] = useState(value);

    // Синхронизация стейта при изменении внешнего пропса
    if (value !== prevValue) {
        setPrevValue(value);
        setInputValue(value?.label || "");
    }

    const dropdownListId = useId();

    const latestValueRef = useRef(value);
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
                closeDropdown();
            }
            onKeyDown?.(event);
        },
        [dropdownOpen, closeDropdown, onKeyDown],
    );

    useEffect(() => {
        if (!dropdownOpen) {
            return;
        }

        const handleOutsideMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;

            if (!suggestRef.current?.contains(target) && !dropdownRef.current?.contains(target)) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleOutsideMouseDown);
        return () => document.removeEventListener("mousedown", handleOutsideMouseDown);
    }, [dropdownOpen, closeDropdown, suggestRef, dropdownRef]);

    return {
        // State
        inputValue,
        activeDescendant,
        dropdownOpen,
        dropdownListId,
        // Actions
        setInputValue,
        setDropdownOpen,
        setActiveDescendant,
        closeDropdown,
        onSelect: handleSelect,
        onFilter: handleFilter,
        onKeyDown: handleKeyDown,
    };
};
