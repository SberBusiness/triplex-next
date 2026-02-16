import React, { useState, useEffect, useRef, useCallback } from "react";
import { uniqueId, debounce } from "lodash-es";
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
    onSelect,
    onFilter,
    onScrollEnd,
    onClear,
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
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const [inputFocused, setInputFocused] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownListId = useRef(uniqueId());
    const suggestRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const onScrollEndRef = useRef(onScrollEnd);
    onScrollEndRef.current = onScrollEnd;

    const handleSelect = useCallback<typeof onSelect>(
        (selectedValue) => {
            setInputValue(selectedValue?.label || "");
            setActiveDescendant(undefined);
            setDropdownOpen(false);
            onSelect(selectedValue);
        },
        [onSelect],
    );

    const handleInputFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (event) => {
            setInputFocused(true);

            if (clearInputOnFocus && inputValue.length !== 0) {
                setInputValue("");
            }

            inputProps.onFocus?.(event);
        },
        [clearInputOnFocus, inputValue, inputProps],
    );

    const handleInputBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (event) => {
            setActiveDescendant(undefined);
            setInputFocused(false);
            setDropdownOpen(false);

            if (inputValue.length !== 0) {
                setInputValue(value?.label || "");
            } else {
                onSelect(undefined);
            }

            inputProps.onBlur?.(event);
        },
        [value?.label, inputValue, onSelect, inputProps],
    );

    const handleInputClick = useCallback<React.MouseEventHandler<HTMLInputElement>>(() => {
        if (inputFocused && !dropdownOpen) {
            setDropdownOpen(true);
        }
    }, [inputFocused, dropdownOpen]);

    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const newValue = event.target.value;

            if (dropdownOpen === false && options.length > 0) {
                setDropdownOpen(true);
            }

            setInputValue(newValue);
            onFilter(newValue);
        },
        [dropdownOpen, options.length, onFilter],
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onScrollList = useCallback(
        debounce((event: Event) => {
            // Бессмысленно собирать данные об окончании скрола, если не передан обработчик.
            if (onScrollEndRef.current === undefined) {
                return;
            }

            const list = event.target as HTMLDivElement;
            const listParent = list.parentElement;

            if (listParent === null) {
                return;
            }

            const listHeight = list.scrollHeight;
            const scrolled = list.scrollTop;
            const parentFullHeight = listParent.scrollHeight;
            const styles = window.getComputedStyle(listParent);
            const parentPaddingTop = styles.getPropertyValue("padding-top");
            const parentPaddingBottom = styles.getPropertyValue("padding-bottom");
            const parentPaddings = Number.parseInt(parentPaddingBottom) + Number.parseInt(parentPaddingTop);

            if (Math.abs(scrolled + parentFullHeight - parentPaddings - listHeight) <= 1) {
                onScrollEndRef.current();
            }
        }, 100),
        [],
    );

    useEffect(() => {
        setInputValue(value?.label || "");
    }, [value]);

    useEffect(() => {
        if (dropdownOpen && options.length === 0) {
            setDropdownOpen(false);
        }
    }, [dropdownOpen, options.length]);

    useEffect(() => {
        if (dropdownOpen) {
            const listElement = listRef.current;
            if (listElement) {
                listElement.addEventListener("scroll", onScrollList);
            }

            return () => {
                if (listElement) {
                    listElement.removeEventListener("scroll", onScrollList);
                }
            };
        }
    }, [dropdownOpen, onScrollList]);

    const renderSuggestField = () => {
        const Input = renderInput === undefined ? FormFieldInput : renderInput;
        const Dropdown = renderDropdown === undefined ? SuggestFieldDesktopDropdown : renderDropdown;

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
                    aria-controls={dropdownListId.current}
                    aria-activedescendant={activeDescendant}
                    aria-expanded={dropdownOpen}
                    disabled={status === EFormFieldStatus.DISABLED}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                />
                <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
                    <Dropdown
                        value={value}
                        options={options}
                        size={size}
                        listId={dropdownListId.current}
                        opened={dropdownOpen && options.length > 0}
                        listLoading={dropdownListLoading}
                        listRef={listRef}
                        onSelect={handleSelect}
                        renderList={renderDropdownList}
                        renderListItem={renderDropdownListItem}
                        setOpened={setDropdownOpen}
                        targetRef={suggestRef}
                        dataTestId={dataTestId}
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
