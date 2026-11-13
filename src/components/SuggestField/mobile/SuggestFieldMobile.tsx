import React, { useState, useRef, useCallback } from "react";
import { ISuggestFieldMobileProps } from "./types";
import { ISuggestFieldOption } from "../types";
import { EComponentSize } from "../../../enums";
import { SuggestFieldMobileDropdown } from "./SuggestFieldMobileDropdown";
import { TextFieldBase } from "../../TextField/TextFieldBase";
import { DataTestId } from "../../../consts/DataTestId";
import { FormFieldInput, FormFieldClear } from "../../FormField";
import { LoaderSmall, ELoaderSmallTheme } from "../../Loader";
import { useDropdownOpenCallbacks } from "../../Dropdown/useDropdownOpenCallbacks";

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
    tooltipOpen,
    dropdownListLoading,
    clearInputOnFocus,
    onFilter,
    onSelect,
    onClear,
    onScrollEnd,
    renderInput,
    inputProps,
    // Из настроек выпадающего списка мобильному варианту нужны только pullerProps и колбэки открытия,
    // остальное в restProps ушло бы в DOM.
    dropdownProps: { pullerProps, onOpen: onDropdownOpen, onClose: onDropdownClose } = {},
    ...restProps
}: ISuggestFieldMobileProps<T>) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const Input = renderInput ?? FormFieldInput;

    // Без useCallback: хук вызывает колбэки только на смену dropdownOpen, их идентичность ни на что не влияет.
    const handleDropdownClose = () => {
        // Обратный скролл к инпуту т.к. при открытии дропдауна в iOS страница скроллится вверх.
        ref.current?.scrollIntoView({ block: "center" });
        onDropdownClose?.();
    };

    useDropdownOpenCallbacks(dropdownOpen, onDropdownOpen, handleDropdownClose);

    const handleInputFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (event) => {
            setDropdownOpen(true);
            inputProps.onFocus?.(event);
        },
        [inputProps],
    );

    const handleClear = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
        (event) => {
            if (value !== undefined) {
                onSelect(undefined);

                // Поле-триггер показывает label значения, поэтому «поле не пустое» здесь равно «label не пустой».
                if (value.label.length !== 0) {
                    onFilter("");
                }
            }

            onClear?.(event);
        },
        [value, onSelect, onFilter, onClear],
    );

    return (
        <TextFieldBase
            data-test-id={dataTestId}
            size={size}
            postfix={
                <React.Fragment>
                    {onClear !== undefined && <FormFieldClear onClick={handleClear} />}
                    {loading && <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={size} />}
                    {postfix}
                </React.Fragment>
            }
            {...restProps}
            ref={ref}
        >
            <Input
                value={value?.label ?? ""}
                placeholder={placeholder}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={dropdownOpen}
                data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.input}`}
                {...inputProps}
                readOnly={true}
                onFocus={handleInputFocus}
            />
            <SuggestFieldMobileDropdown
                {...pullerProps}
                value={value}
                options={options}
                placeholder={placeholder}
                tooltipHint={tooltipHint}
                opened={dropdownOpen}
                loading={loading}
                tooltipOpen={tooltipOpen}
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
