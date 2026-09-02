import React, { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { uniqueId } from "lodash-es";
import { ISuggestOption, ISuggestProps } from "./types";
import { isKey } from "@sberbusiness/triplex-next/utils";

/** Текст, отображаемый в поле ввода для выбранной опции. */
const getOptionLabel = (option: ISuggestOption | undefined) => option?.label ?? "";

/**
 * Состояние Suggest: значение поля ввода, видимость выпадающего списка и обработчики выбора,
 * фильтрации и клавиатуры. Результат раздаётся потомкам через SuggestContext.
 */
export const useSuggest = <T extends ISuggestOption = ISuggestOption>({
    value,
    onSelect,
    onFilter,
    onKeyDown,
}: Pick<ISuggestProps<T>, "value" | "onSelect" | "onFilter" | "onKeyDown">) => {
    const [inputValue, setInputValue] = useState(() => getOptionLabel(value));
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [prevValue, setPrevValue] = useState(value);
    const [dropdownListId] = useState(() => `dropdown-list-${uniqueId()}`);

    // Синхронизация стейта при изменении внешнего пропса.
    if (value !== prevValue) {
        setPrevValue(value);
        setInputValue(getOptionLabel(value));
    }

    const latestValueRef = useRef(value);
    // Обновляем ref после каждого рендера, чтобы closeDropdown всегда имел доступ к актуальному value.
    useLayoutEffect(() => {
        latestValueRef.current = value;
    });

    const closeDropdown = useCallback((newInputValue?: string) => {
        setInputValue(newInputValue ?? getOptionLabel(latestValueRef.current));
        setActiveDescendant(undefined);
        setDropdownOpen(false);
    }, []);

    const handleSelect = useCallback(
        (selectedValue: T | undefined) => {
            // Явно передаём label выбранной опции. Для undefined аргумент остаётся undefined,
            // и closeDropdown вернёт в поле label текущего value.
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
