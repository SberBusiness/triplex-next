import clsx from "clsx";
import React, { useContext, useState } from "react";
import {
    EFormFieldStatus,
    FormField,
    FormFieldCounter,
    FormFieldDescription,
    FormFieldInput,
} from "@sberbusiness/triplex-next/components/FormField";
import { FormGroup } from "@sberbusiness/triplex-next/components/FormGroup";
import { SMSFieldContext } from "@sberbusiness/triplex-next/components/SMSField/SMSFieldContext";
import styles from "@sberbusiness/triplex-next/components/SMSField/styles/SMSField.module.less";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";

/** Свойства SMSField.Input. */
export interface ISMSFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Счётчик символов */
    counter?: React.ReactNode;
    /** Описание поля ввода */
    description?: React.ReactNode;
    /** Текст ошибки */
    errorText?: string;
}

const regExp = new RegExp(/^[0-9]*$/);

export const SMSFieldInput = React.forwardRef<HTMLInputElement, ISMSFieldInputProps>(
    (
        {
            className,
            counter,
            description,
            disabled,
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
        const {
            code,
            disabled: allDisabled,
            disabledSubmit,
            error,
            onChangeCode,
            onSubmitCode,
            size,
            sizeClassName,
        } = useContext(SMSFieldContext);

        const [focused, setFocused] = useState(false);

        const inputDisabled = allDisabled || disabled;
        const showErrorText = error && Boolean(errorText) && !focused;
        const inputClassName = clsx(
            styles.input,
            sizeClassName,
            { [styles.errorPlaceholder]: showErrorText },
            className,
        );

        let status = EFormFieldStatus.DEFAULT;

        if (error) {
            status = EFormFieldStatus.ERROR;
        }

        if (inputDisabled) {
            status = EFormFieldStatus.DISABLED;
        }

        /** Обработчик ввода sms-кода. */
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (!regExp.test(value)) {
                return;
            }
            onChangeCode(value);
            onChange?.(e);
        };

        /** Обработчик получения фокуса. */
        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setFocused(true);
            onFocus?.(e);
        };

        /** Обработчик потери фокуса. */
        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setFocused(false);
            onBlur?.(e);
        };

        /** Обработчик нажатия клавиши Enter (для отправки sms-кода). */
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.keyCode === EVENT_KEY_CODES.ENTER && !disabledSubmit) {
                onSubmitCode(code);
            }
            onKeyDown?.(e);
        };

        return (
            <FormGroup>
                <FormField className={sizeClassName} onKeyDown={handleKeyDown} size={size} status={status}>
                    <FormFieldInput
                        aria-invalid={error || undefined}
                        autoComplete="off"
                        className={inputClassName}
                        maxLength={maxLength}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        placeholder={showErrorText ? errorText : placeholder}
                        ref={ref}
                        value={code}
                        {...restProps}
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
