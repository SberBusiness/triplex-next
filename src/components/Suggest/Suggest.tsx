import React, { useRef, useEffect, useCallback } from "react";
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
        placeholder,
        noOptionsText,
        loading,
        dropdownListLoading,
        tooltipOpen,
        clearInputOnFocus,
        onScrollEnd,
        // Свойства ниже раздаются потомкам через контекст либо обрабатываются useSuggest,
        // поэтому в restProps (и на корневой div) они попасть не должны.
        size: _size,
        onKeyDown: _onKeyDown,
        onSelect: _onSelect,
        onFilter: _onFilter,
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

/**
 * Headless-основа выпадающего списка с фильтрацией по введённому значению.
 * Собственной разметки не добавляет: рендерит div-обёртку и раздаёт потомкам через SuggestContext
 * состояние поля ввода, видимость выпадающего списка и обработчики выбора и фильтрации.
 * Управляющий элемент и выпадающий список пишет потребитель — как это делает ChipSuggest.
 */
export const Suggest = React.forwardRef(SuggestBase) as <T extends ISuggestOption = ISuggestOption>(
    props: ISuggestProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
