import React from "react";
import { FormGroup } from "../FormGroup";
import {
    FormField,
    FormFieldLabel,
    FormFieldDescription,
    FormFieldPrefix,
    FormFieldPostfix,
    FormFieldCounter,
    IFormFieldProps,
} from "../FormField";

/** Свойства компонента TextFieldBase. */
export interface ITextFieldBaseProps extends Omit<IFormFieldProps, "prefix" | "postfix"> {
    /** Дочерние элементы. */
    children: React.ReactNode;
    /** Описание поля ввода. */
    description?: React.ReactNode;
    /** Счетчик символов. */
    counter?: React.ReactNode;
    /** Префикс поля ввода. */
    prefix?: React.ReactNode;
    /** Постфикс поля ввода. */
    postfix?: React.ReactNode;
    /** Лейбл поля ввода. */
    label?: React.ReactNode;
}

/** Компонент текстового ввода, на основе которого реализуются TextField и MaskedInputField. */
export const TextFieldBase = React.forwardRef<HTMLDivElement, ITextFieldBaseProps>(
    ({ children, description, label, prefix, postfix, counter, ...formFieldProps }, ref) => (
        <FormGroup>
            <FormField {...formFieldProps} ref={ref}>
                {prefix ? <FormFieldPrefix>{prefix}</FormFieldPrefix> : null}

                {children}

                {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}

                {postfix ? <FormFieldPostfix>{postfix}</FormFieldPostfix> : null}
            </FormField>

            {description || counter ? (
                <FormFieldDescription>
                    {description}
                    {counter ? <FormFieldCounter>{counter}</FormFieldCounter> : null}
                </FormFieldDescription>
            ) : null}
        </FormGroup>
    ),
);

TextFieldBase.displayName = "TextFieldBase";
