import React, { useContext, useState } from "react";
import clsx from "clsx";
import {
    EFormFieldStatus,
    FormField,
    FormFieldCounter,
    FormFieldDescription,
    FormFieldInput,
} from "@sberbusiness/triplex-next/components/FormField";
import { FormGroup } from "@sberbusiness/triplex-next/components/FormGroup";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { SMSFieldContext } from "../SMSFieldContext";
import styles from "../styles/SMSField.module.less";

/** Свойства SMSField.Input. */
export interface ISMSFieldInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled"> {
    /** Счётчик символов. */
    counter?: React.ReactNode;
    /** Описание поля ввода. */
    description?: React.ReactNode;
    /** Текст ошибки. Отображается вместо placeholder в статусе EFormFieldStatus.ERROR, пока поле не в фокусе. */
    errorText?: string;
}

const DIGITS_REGEXP = /^[0-9]*$/;

/** Поле ввода кода: принимает только цифры, значение берёт из code корневого SMSField. Ref указывает на input. */
export const SMSFieldInput = React.forwardRef<HTMLInputElement, ISMSFieldInputProps>(
    (
        {
            className,
            counter,
            description,
            errorText,
            maxLength = 8,
            onBlur,
            onChange,
            onFocus,
            onKeyDown,
            placeholder,
            ...restProps
        },
        ref,
    ) => {
        const { code, disabledSubmit, onChangeCode, onSubmitCode, size, sizeClassName, status } =
            useContext(SMSFieldContext);

        const [focused, setFocused] = useState(false);

        const error = status === EFormFieldStatus.ERROR;

        const showErrorText = error && !focused && Boolean(errorText);

        const inputClassName = clsx(
            styles.input,
            sizeClassName,
            { [styles.errorPlaceholder]: showErrorText },
            className,
        );

        const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
            const value = event.target.value;
            if (!DIGITS_REGEXP.test(value)) {
                return;
            }
            onChangeCode(value);
            onChange?.(event);
        };

        const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
            setFocused(true);
            onFocus?.(event);
        };

        const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
            setFocused(false);
            onBlur?.(event);
        };

        // Enter отправляет код, только если доступна SMSField.Submit.
        const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
            if (event.keyCode === EVENT_KEY_CODES.ENTER && !disabledSubmit) {
                onSubmitCode(code);
            }
            onKeyDown?.(event);
        };

        return (
            <FormGroup>
                <FormField className={sizeClassName} size={size} status={status}>
                    <FormFieldInput
                        autoComplete="off"
                        className={inputClassName}
                        maxLength={maxLength}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        placeholder={showErrorText ? errorText : placeholder}
                        ref={ref}
                        value={code}
                        {...restProps}
                        aria-invalid={error || undefined}
                    />
                </FormField>

                {description || counter ? (
                    <FormFieldDescription>
                        {description}
                        {counter ? <FormFieldCounter>{counter}</FormFieldCounter> : null}
                    </FormFieldDescription>
                ) : null}
            </FormGroup>
        );
    },
);

SMSFieldInput.displayName = "SMSFieldInput";
