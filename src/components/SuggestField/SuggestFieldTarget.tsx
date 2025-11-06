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

/** Целевой элемент SuggestField. */
export const SuggestFieldTarget = Object.assign(
    React.forwardRef<HTMLDivElement, ISuggestFieldTargetProps>(
        (
            {
                size,
                status,
                inputValue,
                label,
                placeholder,
                "aria-controls": ariaControls,
                "aria-activedescendant": ariaActiveDescendant,
                loading,
                onInputFocus,
                onInputBlur,
                onInputChange,
                onClear,
                renderInput,
                renderLabel,
                renderPrefix,
                renderPostfix,
                ...restProps
            },
            ref,
        ) => {
            const Prefix = renderPrefix === undefined ? FormFieldPrefix : renderPrefix;
            const Label = renderLabel === undefined ? FormFieldLabel : renderLabel;
            const Input = renderInput === undefined ? FormFieldInput : renderInput;
            const Postfix = renderPostfix === undefined ? SuggestFieldTargetPostfix : renderPostfix;

            return (
                <FormField size={size} status={status} {...restProps} ref={ref}>
                    <Prefix />
                    <Label>{label}</Label>
                    <Input
                        value={inputValue}
                        placeholder={placeholder}
                        role="combobox"
                        aria-controls={ariaControls}
                        aria-activedescendant={ariaActiveDescendant}
                        disabled={status === EFormFieldStatus.DISABLED}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                        onChange={onInputChange}
                    />
                    <Postfix size={size} loading={loading} onClear={onClear} />
                </FormField>
            );
        },
    ),
    {
        Input: FormFieldInput,
        Label: FormFieldLabel,
        Prefix: FormFieldPrefix,
        Postfix: SuggestFieldTargetPostfix,
    },
);

SuggestFieldTarget.displayName = "SuggestFieldTarget";
