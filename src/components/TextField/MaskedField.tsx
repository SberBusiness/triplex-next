import React from "react";
import { FormFieldMaskedInput, IFormFieldMaskedInputProps } from "../FormField/components/FormFieldMaskedInput";
import { ITextFieldBaseProps, TextFieldBase } from "./TextFieldBase";

/** Свойства компонента MaskedField. */
export interface IMaskedFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /**
     * Свойства поля ввода с маской: обязательные `mask` и `value`, опциональный `placeholderMask`
     * и остальные атрибуты input. Ссылка на элемент input передаётся через `forwardedRef`.
     */
    maskedInputProps: IFormFieldMaskedInputProps & { ref?: React.RefObject<HTMLInputElement> };
}

/**
 * Компонент ввода с маской.
 * Отличается от TextField элементом ввода — вместо обычного input используется FormFieldMaskedInput.
 */
export const MaskedField = React.forwardRef<HTMLDivElement, IMaskedFieldProps>(
    ({ maskedInputProps, ...textFieldBaseProps }, ref) => (
        <TextFieldBase {...textFieldBaseProps} ref={ref}>
            <FormFieldMaskedInput {...maskedInputProps} />
        </TextFieldBase>
    ),
);

MaskedField.displayName = "MaskedField";
