import React from "react";
import { FormFieldMaskedInput, IFormFieldMaskedInputProps } from "../FormField/components/FormFieldMaskedInput";
import { ITextFieldBaseProps, TextFieldBase } from "./TextFieldBase";

/** Свойства компонента MaskedField. */
export interface IMaskedFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /**
     * Свойства поля ввода с маской: обязательные `mask` и `value`, опциональный `placeholderMask`
     * и остальные атрибуты input. Ссылка на элемент input передаётся через `forwardedRef`.
     */
    maskedInputProps: IFormFieldMaskedInputProps & {
        /**
         * Ссылка на корневой div-обёртку FormFieldMaskedInput.
         * Для ссылки на элемент input используйте `forwardedRef`.
         */
        ref?: React.RefObject<HTMLDivElement>;
    };
}

/**
 * Компонент ввода с маской.
 * Отличается от TextField элементом ввода — вместо обычного input используется FormFieldMaskedInput.
 */
export const MaskedField = React.forwardRef<HTMLDivElement, IMaskedFieldProps>(
    ({ maskedInputProps, ...restProps }, ref) => (
        <TextFieldBase {...restProps} ref={ref}>
            <FormFieldMaskedInput {...maskedInputProps} />
        </TextFieldBase>
    ),
);

MaskedField.displayName = "MaskedField";
