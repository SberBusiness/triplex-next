import React from "react";
import { FormField, IFormFieldProps } from "@sberbusiness/triplex-next/components/FormField/FormField";
import { FormFieldDescription } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldDescription";
import { FormFieldLabel } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldLabel";
import { FormFieldPostfix } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldPostfix";
import { FormFieldPrefix } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldPrefix";
import { FormFieldCounter } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldCounter";
import { FormGroup } from "@sberbusiness/triplex-next/components/FormGroup/FormGroup";

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
export const TextFieldBase: React.FC<ITextFieldBaseProps> = ({
    children,
    description,
    label,
    prefix,
    postfix,
    counter,
    ...formFieldProps
}) => (
    <FormGroup>
        <FormField {...formFieldProps}>
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
);

TextFieldBase.displayName = "TextFieldBase";
