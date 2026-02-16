import React, { useRef, useCallback, useEffect } from "react";
import { ISuggestOption, ISuggestProps } from "./types";
import { SuggestContext } from "./SuggestContext";
import { useSuggest } from "./useSuggest";

const SuggestBase = <T extends ISuggestOption = ISuggestOption>(
    props: ISuggestProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const {
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
        onKeyDown: onKeyDownProp,
        onSelect,
        onFilter,
        onScrollEnd,
        ...restProps
    } = props;
    const suggest = useSuggest(props);
    const { dropdownOpen, closeDropdown, onKeyDown } = suggest;
    const suggestRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    }, [dropdownOpen, closeDropdown]);

    const setRef = useCallback(
        (instance: HTMLDivElement | null) => {
            suggestRef.current = instance;

            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        },
        [ref],
    );

    return (
        <div {...restProps} onKeyDown={onKeyDown} ref={setRef}>
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
                    onScrollEnd,
                    suggestRef,
                    dropdownRef,
                    ...suggest,
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
