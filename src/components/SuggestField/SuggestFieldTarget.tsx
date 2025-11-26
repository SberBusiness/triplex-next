import React from "react";
import { ISuggestFieldTargetProps } from "@sberbusiness/triplex-next/components/SuggestField/types";
import {
    FormField,
    FormFieldLabel,
    FormFieldInput,
    FormFieldPrefix,
    EFormFieldStatus,
} from "@sberbusiness/triplex-next/components/FormField";
import { SuggestFieldTargetPostfix } from "@sberbusiness/triplex-next/components/SuggestField/SuggestFieldTargetPostfix";
import { DataTestId } from "@sberbusiness/triplex-next/consts/DataTestId";

export const SuggestFieldTargetBase: React.FC<ISuggestFieldTargetProps> = ({
    size,
    status,
    inputValue,
    label,
    placeholder,
    "aria-controls": ariaControls,
    "aria-activedescendant": ariaActiveDescendant,
    dataTestId,
    loading,
    dropdownOpen,
    onFocus,
    onBlur,
    onClick,
    onChange,
    onClear,
    renderInput,
    renderLabel,
    renderPrefix,
    renderPostfix,
    ...restProps
}) => {
    const Prefix = renderPrefix === undefined ? FormFieldPrefix : renderPrefix;
    const Label = renderLabel === undefined ? FormFieldLabel : renderLabel;
    const Input = renderInput === undefined ? FormFieldInput : renderInput;
    const Postfix = renderPostfix === undefined ? SuggestFieldTargetPostfix : renderPostfix;

    return (
        <FormField size={size} status={status} {...restProps}>
            <Prefix />
            <Label>{label}</Label>
            <Input
                value={inputValue}
                placeholder={placeholder}
                role="combobox"
                aria-controls={ariaControls}
                aria-activedescendant={ariaActiveDescendant}
                data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.input}`}
                disabled={status === EFormFieldStatus.DISABLED}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={onClick}
                onChange={onChange}
            />
            <Postfix size={size} loading={loading} onClear={onClear} />
        </FormField>
    );
};

/** Целевой элемент SuggestField. */
export const SuggestFieldTarget = Object.assign(SuggestFieldTargetBase, {
    Input: FormFieldInput,
    Label: FormFieldLabel,
    Prefix: FormFieldPrefix,
    Postfix: SuggestFieldTargetPostfix,
});
