import React, { useState, useId, useRef, useCallback, useEffect } from "react";
import { ISuggestOption, ISuggestProps } from "./types";
import { SuggestContext } from "./SuggestContext";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";

const SuggestBase = <T extends ISuggestOption = ISuggestOption>(
    {
        children,
        value,
        options,
        size,
        placeholder,
        noOptionsText,
        loading,
        dropdownListLoading,
        tooltipOpen,
        clearInputOnFocus,
        onKeyDown,
        onSelect,
        onFilter,
        onScrollEnd,
        ...restProps
    }: ISuggestProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const [inputValue, setInputValue] = useState(value?.label || "");
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownListId = useId();
    const suggestRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const updateInputValueRef = useRef<typeof updateInputValue>(() => {});
    const closeDropdownRef = useRef<typeof closeDropdown>(() => {});

    const updateInputValue = useCallback(
        (newInputValue: string) => {
            if (inputValue !== newInputValue) {
                setInputValue(newInputValue);
            }
        },
        [inputValue],
    );

    updateInputValueRef.current = updateInputValue;

    useEffect(() => {
        updateInputValueRef.current(value?.label || "");
    }, [value]);

    const closeDropdown = useCallback(
        (newInputValue: string = value?.label || "") => {
            updateInputValueRef.current(newInputValue);
            setActiveDescendant(undefined);
            setDropdownOpen(false);
        },
        [value],
    );

    closeDropdownRef.current = closeDropdown;

    useEffect(() => {
        /** Обработчик нажатия мыши вне компонента. */
        const handleOutsideMouseDown = (event: MouseEvent) => {
            if (
                !suggestRef.current?.contains(event.target as Node) &&
                !dropdownRef.current?.contains(event.target as Node)
            ) {
                closeDropdownRef.current();
            }
        };

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleOutsideMouseDown);

            return () => {
                document.removeEventListener("mousedown", handleOutsideMouseDown);
            };
        }
    }, [dropdownOpen]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (dropdownOpen === true) {
                if (isKey(event.code, "ESCAPE")) {
                    closeDropdownRef.current();
                }
            }
            onKeyDown?.(event);
        },
        [dropdownOpen, onKeyDown],
    );

    const handleSelect = useCallback(
        (selectedValue: T | undefined) => {
            closeDropdownRef.current(selectedValue?.label || "");
            onSelect(selectedValue);
        },
        [onSelect],
    );

    const handleFilter = useCallback(
        (newInputValue: string) => {
            setInputValue(newInputValue);
            onFilter(newInputValue);
        },
        [onFilter],
    );

    const setRef = (instance: HTMLDivElement | null) => {
        suggestRef.current = instance;

        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <div onKeyDown={handleKeyDown} {...restProps} ref={setRef}>
            <SuggestContext.Provider
                value={{
                    value,
                    options,
                    placeholder,
                    noOptionsText,
                    loading,
                    dropdownListLoading,
                    tooltipOpen,
                    clearInputOnFocus,
                    onSelect: handleSelect,
                    onFilter: handleFilter,
                    onScrollEnd,
                    inputValue,
                    setInputValue,
                    activeDescendant,
                    dropdownOpen,
                    setDropdownOpen,
                    closeDropdown,
                    dropdownListId,
                    suggestRef,
                    dropdownRef,
                }}
            >
                {children}
            </SuggestContext.Provider>
        </div>
    );
};

export const Suggest = React.forwardRef(SuggestBase) as <T extends ISuggestOption = ISuggestOption>(
    props: ISuggestProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
