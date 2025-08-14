import React from 'react';
import {
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldInput,
    FormFieldPostfix,
    FormFieldPrefix,
    IFormFieldInputProps,
    IFormFieldProps,
    FormGroup,
    FormGroupLine,
} from '../../components';

/** Свойства TextField. */
export interface ITextFieldProps extends Omit<IFormFieldProps, 'prefix' | 'postfix'> {
    /** Описание поля ввода. */
    description?: React.ReactNode;
    /** Префикс поля ввода. */
    prefix?: React.ReactNode;
    /** Постфикс поля ввода. */
    postfix?: React.ReactNode;
    /** Свойства поля ввода. */
    inputProps: IFormFieldInputProps & {ref?: React.RefObject<HTMLInputElement>};
    /** Лейбл поля ввода. */
    label?: React.ReactNode;
}

/** Компонент текстового ввода.
 *  Является более компактным вариантом отображения инпутов, чем FormGroup.
 * */
export const TextField: React.FC<ITextFieldProps> = ({description, inputProps, label, prefix, postfix, ...formFieldProps}) => {
    return (
        <FormGroup>
            <FormGroupLine>
                <FormField {...formFieldProps}>
                    {prefix ? <FormFieldPrefix>{prefix}</FormFieldPrefix> : null}

                    <FormFieldInput {...inputProps} />

                    {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}

                    {postfix ? <FormFieldPostfix>{postfix}</FormFieldPostfix> : null}
                </FormField>
            </FormGroupLine>

            {description ? (
                <FormGroupLine>
                    <FormFieldDescription>{description}</FormFieldDescription>
                </FormGroupLine>
            ) : null}
        </FormGroup>
    );
};

TextField.displayName = 'TextField';
