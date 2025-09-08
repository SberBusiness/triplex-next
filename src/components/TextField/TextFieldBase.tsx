import React from 'react';
import {
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldPostfix,
    FormFieldPrefix,
    IFormFieldProps,
    FormGroup,
    FormGroupLine,
} from '@sberbusiness/triplex-next';

/** Свойства TextFieldBase. */
export interface ITextFieldBaseProps extends Omit<IFormFieldProps, 'prefix' | 'postfix'> {
    /** Дочерние элементы. */
    children: React.ReactNode;
    /** Описание поля ввода. */
    description?: React.ReactNode;
    /** Префикс поля ввода. */
    prefix?: React.ReactNode;
    /** Постфикс поля ввода. */
    postfix?: React.ReactNode;
    /** Лейбл поля ввода. */
    label?: React.ReactNode;
}

/** Компонент текстового ввода, на основе которого реализуются TextField и MaskedInputField. */
export const TextFieldBase: React.FC<ITextFieldBaseProps> = ({children, description, label, prefix, postfix, ...formFieldProps}) => {
    return (
        <FormGroup>
            <FormGroupLine>
                <FormField {...formFieldProps}>
                    {prefix ? <FormFieldPrefix>{prefix}</FormFieldPrefix> : null}

                    {children}

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

TextFieldBase.displayName = 'TextFieldBase';
