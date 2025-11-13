import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import { uniqueId, debounce } from "lodash-es";
import { ISuggestFieldDesktopProps } from "@sberbusiness/triplex-next/components/SuggestField/desktop/types";
import { ISuggestFieldOption } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { Tooltip, ETooltipSize } from "@sberbusiness/triplex-next/components/Tooltip";
import { SuggestFieldTarget } from "@sberbusiness/triplex-next/components/SuggestField/SuggestFieldTarget";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { DropdownListContext } from "@sberbusiness/triplex-next/components/Dropdown";
import { DataTestId } from "@sberbusiness/triplex-next/consts/DataTestId";
import { SuggestFieldDesktopDropdown } from "@sberbusiness/triplex-next/components/SuggestField/desktop/SuggestFieldDesktopDropdown";
import styles from "../styles/SuggestFieldDesktop.module.less";

/**
 * Выпадающий список с возможностью поиска по введённому значению, позволяет задать кастомные компоненты для отображения всех
 * элементов управления.
 *
 * @template T - тип опции, должен расширять ISuggestFieldOption
 */
export const SuggestFieldDesktop = <T extends ISuggestFieldOption = ISuggestFieldOption>({
    className,
    value,
    options,
    size,
    status,
    label,
    placeholder,
    loading,
    dropdownListLoading,
    tooltipHint,
    tooltipOpen,
    clearInputOnFocus,
    onSelect,
    onFilter,
    onScrollEnd,
    onTargetInputFocus,
    onTargetInputBlur,
    renderTarget,
    renderTargetInput,
    renderTargetLabel,
    renderTargetPrefix,
    renderTargetPostfix,
    renderDropdown,
    renderDropdownList,
    renderDropdownListItem,
    "data-test-id": dataTestId,
    ...restProps
}: ISuggestFieldDesktopProps<T>) => {
    const [inputValue, setInputValue] = useState(value?.label || "");
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const [inputFocused, setInputFocused] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownDisabled, setDropdownDisabled] = useState(false);

    const dropdownListId = useRef(uniqueId());
    const suggestRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const onScrollEndRef = useRef(onScrollEnd);
    onScrollEndRef.current = onScrollEnd;

    const handleSelect = useCallback(
        (selectedValue: T | undefined) => {
            setInputValue(selectedValue?.label || "");
            setActiveDescendant(undefined);
            setDropdownOpen(false);
            setDropdownDisabled(true);
            onSelect(selectedValue);
        },
        [onSelect],
    );

    const handleTargetInputFocus = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setInputFocused(true);
            setDropdownOpen(true);

            if (clearInputOnFocus && inputValue.length !== 0) {
                setInputValue("");
            }

            onTargetInputFocus?.(event);
        },
        [clearInputOnFocus, inputValue, onTargetInputFocus],
    );

    const handleTargetInputBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setActiveDescendant(undefined);
            setInputFocused(false);
            setDropdownOpen(false);
            setDropdownDisabled(false);

            if (inputValue.length !== 0) {
                setInputValue(value?.label || "");
            } else {
                onSelect(undefined);
            }

            onTargetInputBlur?.(event);
        },
        [value?.label, inputValue, onSelect, onTargetInputBlur],
    );

    const handleClick = useCallback(() => {
        if (inputFocused && !dropdownOpen) {
            setDropdownOpen(true);
            setDropdownDisabled(false);
        }
    }, [inputFocused, dropdownOpen]);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setInputValue(newValue);
            setDropdownDisabled(false);
            onFilter(newValue);
        },
        [onFilter],
    );

    const handleClear = useCallback(() => {
        if (inputFocused) {
            setInputValue("");
            onFilter("");
        } else {
            onSelect(undefined);
        }
    }, [inputFocused, onFilter, onSelect]);

    const handleSetActiveDescendant = useCallback(
        (id?: string) => {
            if (activeDescendant !== id) {
                setActiveDescendant(id);
            }
        },
        [activeDescendant],
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
        if (inputFocused) {
            if (dropdownOpen && options.length === 0) {
                setDropdownOpen(false);
            } else if (!dropdownOpen && !dropdownDisabled && options.length !== 0) {
                setDropdownOpen(true);
            }
        }
    }, [inputFocused, dropdownOpen, dropdownDisabled, options.length]);

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
        const classNames = clsx(styles.suggestFieldDesktop, "hoverable", className);
        const Target = renderTarget === undefined ? SuggestFieldTarget : renderTarget;
        const Dropdown = renderDropdown === undefined ? SuggestFieldDesktopDropdown : renderDropdown;

        return (
            <div className={classNames} data-test-id={dataTestId} {...restProps} ref={suggestRef}>
                <DropdownListContext.Provider
                    value={{ activeDescendant, setActiveDescendant: handleSetActiveDescendant }}
                >
                    <Target
                        size={size}
                        status={status}
                        inputValue={inputValue}
                        label={label}
                        placeholder={placeholder}
                        aria-controls={dropdownListId.current}
                        aria-activedescendant={activeDescendant}
                        loading={loading}
                        onClick={handleClick}
                        onClear={handleClear}
                        onInputFocus={handleTargetInputFocus}
                        onInputBlur={handleTargetInputBlur}
                        onInputChange={handleInputChange}
                        renderInput={renderTargetInput}
                        renderLabel={renderTargetLabel}
                        renderPrefix={renderTargetPrefix}
                        renderPostfix={renderTargetPostfix}
                        dataTestId={dataTestId}
                    />
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
            </div>
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

SuggestFieldDesktop.displayName = "SuggestFieldDesktop";
