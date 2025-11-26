import React from "react";
import { ISuggestFieldOption, ISuggestFieldProps } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { MobileView } from "@sberbusiness/triplex-next/components/MobileView/MobileView";
import { SuggestFieldDesktop } from "@sberbusiness/triplex-next/components/SuggestField/desktop/SuggestFieldDesktop";
import { SuggestFieldMobile } from "@sberbusiness/triplex-next/components/SuggestField/mobile/SuggestFieldMobile";
import { SuggestFieldTarget } from "@sberbusiness/triplex-next/components/SuggestField/SuggestFieldTarget";

// TODO: Переписать через Suggest.
const SuggestFieldBase = <T extends ISuggestFieldOption = ISuggestFieldOption>(
    props: ISuggestFieldProps<T>,
): JSX.Element => {
    const {
        status,
        size,
        value,
        label,
        loading,
        options,
        placeholder,
        tooltipHint,
        tooltipOpen,
        dropdownListLoading,
        clearInputOnFocus,
        onSelect,
        onFilter,
        onScrollEnd,
        onTargetInputFocus,
        onTargetInputBlur,
        renderTarget,
        renderTargetInput,
        renderTargetLabel,
        renderTargetPostfix,
        renderTargetPrefix,
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
                dropdownHint={tooltipOpen ? tooltipHint : ""}
                loading={loading}
                dropdownListLoading={dropdownListLoading}
                clearInputOnFocus={clearInputOnFocus}
                onSelect={onSelect}
                onFilter={onFilter}
                onScrollEnd={onScrollEnd}
                onTargetInputFocus={onTargetInputFocus}
                onTargetInputBlur={onTargetInputBlur}
                renderTarget={renderTarget}
                renderTargetInput={renderTargetInput}
                renderTargetLabel={renderTargetLabel}
                renderTargetPrefix={renderTargetPrefix}
                renderTargetPostfix={renderTargetPostfix}
            />
        </MobileView>
    );
};

/** Выпадающий список с возможностью поиска по введённому значению. */
export const SuggestField = Object.assign(SuggestFieldBase, { Target: SuggestFieldTarget });
