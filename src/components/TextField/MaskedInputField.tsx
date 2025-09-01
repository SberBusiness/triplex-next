import React from 'react';
import {
    IFormFieldMaskedInputProps,
    FormFieldMaskedInput,
} from '../../components';
import { ITextFieldBaseProps, TextFieldBase } from './TextFieldBase';


export interface IMaskedInputFieldProps extends Omit<ITextFieldBaseProps, 'children'> {
    /** Свойства поля ввода. */
    maskedInputProps: IFormFieldMaskedInputProps & { ref?: React.RefObject<HTMLInputElement> };
}
/** Компонент ввода с маской. */
export const MaskedInputField: React.FC<IMaskedInputFieldProps> = ({ maskedInputProps, ...textFieldProps }) => (
    <TextFieldBase {...textFieldProps} >
        <FormFieldMaskedInput {...maskedInputProps} />
    </TextFieldBase>
);


MaskedInputField.displayName = 'MaskedInputField';
