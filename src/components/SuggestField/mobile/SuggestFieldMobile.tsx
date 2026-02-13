import React, { useState, useEffect, useRef } from "react";
import { ISuggestFieldMobileProps } from "./types";
import { ISuggestFieldOption } from "../types";
import { EComponentSize } from "../../../enums";
import { SuggestFieldMobileDropdown } from "./SuggestFieldMobileDropdown";
import { TextFieldBase } from "../../TextField/TextFieldBase";
import { DataTestId } from "../../../consts/DataTestId";
import { FormFieldInput, FormFieldClear } from "../../FormField";
import { LoaderSmall, ELoaderSmallTheme } from "../../Loader";

/**
 * Мобильный SuggestField.
 * Отображает поле ввода (target). При получении полем ввода фокуса - отображает мобильный Dropdown.
 */
export const SuggestFieldMobile = <T extends ISuggestFieldOption = ISuggestFieldOption>({
    value,
    options,
    size = EComponentSize.LG,
    placeholder,
    "data-test-id": dataTestId,
    postfix,
    tooltipHint,
    loading,
    dropdownListLoading,
    clearInputOnFocus,
    onFilter,
    onSelect,
    onClear,
    onScrollEnd,
    renderInput,
    inputProps,
    ...restProps
}: ISuggestFieldMobileProps<T>) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    // Предыдущее состояние dropdownOpened.
    const prevDropdownOpen = useRef(false);
    const Input = renderInput === undefined ? FormFieldInput : renderInput;

    useEffect(() => {
        // Дропдаун закрылся.
        if (prevDropdownOpen.current && !dropdownOpen && ref.current) {
            // Обратный скролл к инпуту т.к. при открытии Dropdown в iOS страница скроллится вверх.
            ref.current.scrollIntoView({ block: "center" });
        }
        prevDropdownOpen.current = dropdownOpen;
    }, [dropdownOpen]);

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setDropdownOpen(true);
        inputProps.onFocus?.(event);
    };

    return (
        <TextFieldBase
            data-test-id={dataTestId}
            size={size}
            postfix={
                <React.Fragment>
                    {onClear !== undefined && <FormFieldClear onClick={onClear} />}
                    {loading && <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={size} />}
                    {postfix}
                </React.Fragment>
            }
            {...restProps}
            ref={ref}
        >
            <Input
                value={value ? value.label : ""}
                placeholder={placeholder}
                role="combobox"
                aria-expanded={dropdownOpen}
                data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.input}`}
                {...inputProps}
                readOnly={true}
                onFocus={handleInputFocus}
            />
            <SuggestFieldMobileDropdown
                value={value}
                options={options}
                placeholder={placeholder}
                tooltipHint={tooltipHint}
                opened={dropdownOpen}
                loading={loading}
                dropdownListLoading={dropdownListLoading}
                clearInputOnFocus={clearInputOnFocus}
                setOpened={setDropdownOpen}
                onFilter={onFilter}
                onSelect={onSelect}
                onScrollEnd={onScrollEnd}
            />
        </TextFieldBase>
    );
};
