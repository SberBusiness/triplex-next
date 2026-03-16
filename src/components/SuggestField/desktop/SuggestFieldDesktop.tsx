import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { uniqueId } from "lodash-es";
import { ISuggestFieldDesktopProps } from "./types";
import { ISuggestFieldOption } from "../types";
import { EComponentSize } from "../../../enums";
import { Tooltip, ETooltipSize } from "../../Tooltip";
import { TextFieldBase } from "../../TextField/TextFieldBase";
import { FormFieldInput, FormFieldClear, EFormFieldStatus } from "../../FormField";
import { LoaderSmall, ELoaderSmallTheme } from "../../Loader";
import { DropdownListContext } from "../../Dropdown";
import { DataTestId } from "../../../consts/DataTestId";
import { SuggestFieldDesktopDropdown } from "./SuggestFieldDesktopDropdown";
import { isKey } from "@sberbusiness/triplex-next/utils";

/**
 * Выпадающий список с возможностью поиска по введённому значению, позволяет задать кастомные компоненты для отображения всех
 * элементов управления.
 *
 * @template T - тип опции, должен расширять ISuggestFieldOption
 */
export const SuggestFieldDesktop = <T extends ISuggestFieldOption = ISuggestFieldOption>({
    value,
    options,
    size = EComponentSize.LG,
    status,
    placeholder,
    "data-test-id": dataTestId,
    loading,
    dropdownListLoading,
    tooltipHint,
    tooltipOpen,
    clearInputOnFocus,
    onFilter,
    onClear,
    onSelect,
    onScrollEnd,
    prefix,
    postfix,
    renderInput,
    renderDropdown,
    renderDropdownList,
    renderDropdownListItem,
    inputProps,
    ...restProps
}: ISuggestFieldDesktopProps<T>) => {
    const [inputValue, setInputValue] = useState(value?.label || "");
    const [inputFocused, setInputFocused] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // Флаг для предотвращения автоматического открытия Dropdown сразу после выбора значения.
    const [ignoreAutoOpen, setIgnoreAutoOpen] = useState(false);
    const [dropdownListId] = useState(() => uniqueId());
    const [activeDescendant, setActiveDescendant] = useState<string>();

    const [prevValue, setPrevValue] = useState(value);
    if (value?.id !== prevValue?.id) {
        setPrevValue(value);
        setInputValue(value?.label || "");
    }

    const suggestRef = useRef<HTMLDivElement>(null);

    const onScrollEndRef = useRef(onScrollEnd);
    useLayoutEffect(() => {
        onScrollEndRef.current = onScrollEnd;
    }, [onScrollEnd]);

    const handleInputFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (event) => {
            setInputFocused(true);

            if (clearInputOnFocus && inputValue.length !== 0) {
                setInputValue("");
                onFilter("");
            }

            inputProps.onFocus?.(event);
        },
        [clearInputOnFocus, inputValue, onFilter, inputProps],
    );

    const closeDropdown = useCallback((nextIgnoreAutoOpen: boolean) => {
        setIgnoreAutoOpen(nextIgnoreAutoOpen);
        setActiveDescendant(undefined);
        setDropdownOpen(false);
    }, []);

    const handleInputBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (event) => {
            setInputFocused(false);
            closeDropdown(false);

            if (inputValue.length !== 0) {
                setInputValue(value?.label || "");
            } else if (value !== undefined) {
                onSelect(undefined);
            }

            inputProps.onBlur?.(event);
        },
        [closeDropdown, inputValue, value, onSelect, inputProps],
    );

    const handleInputKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
        (event) => {
            if (isKey(event.key, "ESCAPE")) {
                if (dropdownOpen) {
                    event.stopPropagation();
                    closeDropdown(true);
                }
            }

            inputProps.onKeyDown?.(event);
        },
        [dropdownOpen, closeDropdown, inputProps],
    );

    const handleInputMouseDown = useCallback<React.MouseEventHandler<HTMLInputElement>>(
        (event) => {
            if (!dropdownOpen) {
                setIgnoreAutoOpen(false);
                setDropdownOpen(true);
            }

            inputProps.onMouseDown?.(event);
        },
        [dropdownOpen, inputProps],
    );

    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            setIgnoreAutoOpen(false);
            setActiveDescendant(undefined);
            setInputValue(event.target.value);
            onFilter(event.target.value);
            inputProps.onChange?.(event);
        },
        [onFilter, inputProps],
    );

    const handleClear = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
        (event) => {
            if (inputFocused) {
                setInputValue("");
                onFilter("");
            }
            onClear?.(event);
        },
        [inputFocused, onFilter, onClear],
    );

    const handleDropdownOpen = useCallback<typeof setDropdownOpen>(
        (nextDropdownOpen) => {
            if (nextDropdownOpen) {
                setDropdownOpen(nextDropdownOpen);
            } else {
                closeDropdown(false);
            }
        },
        [closeDropdown],
    );

    const handleSelect = useCallback<typeof onSelect>(
        (nextValue) => {
            closeDropdown(true);
            setInputValue(nextValue?.label || "");
            onSelect(nextValue);
        },
        [closeDropdown, onSelect],
    );

    useEffect(() => {
        if (inputFocused) {
            if (dropdownOpen) {
                if (options.length === 0) {
                    closeDropdown(false);
                }
            } else {
                if (options.length !== 0 && !ignoreAutoOpen) {
                    setDropdownOpen(true);
                }
            }
        }
    }, [inputFocused, dropdownOpen, options.length, closeDropdown, ignoreAutoOpen]);

    const renderSuggestField = () => {
        const Input = renderInput === undefined ? FormFieldInput : renderInput;
        const Dropdown = renderDropdown === undefined ? SuggestFieldDesktopDropdown : renderDropdown;
        // Фактическое состояние открытия выпадающего списка.
        const dropdownActuallyOpen = dropdownOpen && options.length !== 0;

        return (
            <TextFieldBase
                data-test-id={dataTestId}
                status={status}
                size={size}
                prefix={prefix}
                postfix={
                    <React.Fragment>
                        {onClear !== undefined && <FormFieldClear onClick={handleClear} />}
                        {loading && <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={size} />}
                        {postfix}
                    </React.Fragment>
                }
                {...restProps}
                ref={suggestRef}
            >
                <Input
                    value={inputValue}
                    placeholder={placeholder}
                    data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.input}`}
                    {...inputProps}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-controls={dropdownListId}
                    aria-activedescendant={activeDescendant}
                    aria-expanded={dropdownActuallyOpen}
                    disabled={status === EFormFieldStatus.DISABLED}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    onMouseDown={handleInputMouseDown}
                    onChange={handleInputChange}
                />
                <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
                    <Dropdown
                        value={value}
                        options={options}
                        size={size}
                        dataTestId={dataTestId}
                        listId={dropdownListId}
                        opened={dropdownActuallyOpen}
                        listLoading={dropdownListLoading}
                        targetRef={suggestRef}
                        setOpened={handleDropdownOpen}
                        onSelect={handleSelect}
                        onScrollEnd={onScrollEnd}
                        renderList={renderDropdownList}
                        renderListItem={renderDropdownListItem}
                    />
                </DropdownListContext.Provider>
            </TextFieldBase>
        );
    };

    return (
        <Tooltip
            size={ETooltipSize.SM}
            isOpen={!!(tooltipOpen && inputFocused) && status !== EFormFieldStatus.DISABLED}
            toggle={() => {}}
            targetRef={suggestRef}
            disableAdaptiveMode
        >
            <Tooltip.Body data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.tooltip}`}>
                {tooltipHint}
            </Tooltip.Body>
            <Tooltip.Target>{renderSuggestField()}</Tooltip.Target>
        </Tooltip>
    );
};
