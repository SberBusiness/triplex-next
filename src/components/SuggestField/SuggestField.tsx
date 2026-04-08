import React from "react";
import { ISuggestFieldOption, ISuggestFieldProps } from "./types";
import { MobileView } from "../MobileView/MobileView";
import { SuggestFieldDesktop } from "./desktop/SuggestFieldDesktop";
import { SuggestFieldMobile } from "./mobile/SuggestFieldMobile";
import { FormFieldInput } from "../FormField";

// TODO: Переписать через useSuggest.
const SuggestFieldBase = <T extends ISuggestFieldOption = ISuggestFieldOption>(
    props: ISuggestFieldProps<T>,
): JSX.Element => {
    const {
        status,
        size,
        value,
        options,
        label,
        placeholder,
        tooltipHint,
        loading,
        tooltipOpen,
        dropdownListLoading,
        clearInputOnFocus,
        onSelect,
        onFilter,
        onScrollEnd,
        inputProps,
    } = props;

    return (
        <MobileView fallback={<SuggestFieldDesktop<T> {...props} />}>
            <SuggestFieldMobile<T>
                status={status}
                size={size}
                value={value}
                options={options}
                label={label}
                placeholder={placeholder}
                tooltipHint={tooltipHint}
                loading={loading}
                tooltipOpen={tooltipOpen}
                dropdownListLoading={dropdownListLoading}
                clearInputOnFocus={clearInputOnFocus}
                onSelect={onSelect}
                onFilter={onFilter}
                onScrollEnd={onScrollEnd}
                inputProps={inputProps}
            />
        </MobileView>
    );
};

/** Выпадающий список с возможностью поиска по введённому значению. */
export const SuggestField = Object.assign(SuggestFieldBase, { Input: FormFieldInput });
