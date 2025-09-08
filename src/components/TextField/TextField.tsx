import React from 'react';
import {
    FormFieldInput,
    IFormFieldInputProps,
} from '@sberbusiness/triplex-next';
import { ITextFieldBaseProps, TextFieldBase } from './TextFieldBase';

/** Свойства TextField. */
export interface ITextFieldProps extends Omit<ITextFieldBaseProps, 'children'> {
    /** Свойства поля ввода. */
    inputProps: IFormFieldInputProps & { ref?: React.RefObject<HTMLInputElement> };
}

/** Компонент текстового ввода.
 *  Является более компактным вариантом отображения инпутов, чем FormGroup.
 * */
export const TextField: React.FC<ITextFieldProps> = ({ inputProps, ...textFieldBaseProps }) => (
    <TextFieldBase {...textFieldBaseProps}>
        <FormFieldInput {...inputProps} />
    </TextFieldBase>
);


TextField.displayName = 'TextField';
