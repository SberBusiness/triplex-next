import clsx from "clsx";
import React, { useContext } from "react";
import {
    EFormFieldStatus,
    FormField,
    FormFieldCounter,
    FormFieldDescription,
    FormFieldInput,
} from "@sberbusiness/triplex-next/components/FormField";
import { FormGroup } from "@sberbusiness/triplex-next/components/FormGroup";
import { SMSInputContext } from "@sberbusiness/triplex-next/components/SMSInput/SMSInputContext";
import styles from "@sberbusiness/triplex-next/components/SMSInput/styles/SMSInput.module.less";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";

/** Свойства SMSInput.Input. */
export interface ISMSInputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Счётчик символов */
    counter: React.ReactNode;
    /** Описание поля ввода */
    description?: React.ReactNode;
}

const regExp = new RegExp(/^[0-9]*$/);

export const SMSInputInput = React.forwardRef<HTMLInputElement, ISMSInputInputProps>(
    (
        { className, counter, description, disabled, maxLength = 8, onChange, onKeyDown, placeholder, ...restProps },
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
        } = useContext(SMSInputContext);

        const inputDisabled = allDisabled || disabled;
        const inputClassName = clsx(styles.input, sizeClassName, className);

        let status = EFormFieldStatus.DEFAULT;

        if (inputDisabled) {
            status = EFormFieldStatus.DISABLED;
        }

        if (error) {
            status = EFormFieldStatus.ERROR;
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

        /** Обработчик нажатия клавиши Enter (для отправки sms-кода). */
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.keyCode === EVENT_KEY_CODES.ENTER && !disabledSubmit) {
                onSubmitCode(code);
            }
            onKeyDown?.(e);
        };

        return (
            <FormGroup>
                <FormField
                    className={sizeClassName}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    size={size}
                    status={status}
                >
                    <FormFieldInput
                        autoComplete="off"
                        className={inputClassName}
                        ref={ref}
                        value={code}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        {...restProps}
                    />
                </FormField>
                <FormFieldDescription>
                    {description || counter ? (
                        <>
                            {description}
                            {counter ? <FormFieldCounter>{counter}</FormFieldCounter> : null}
                        </>
                    ) : null}
                </FormFieldDescription>
            </FormGroup>
        );
    },
);

SMSInputInput.displayName = "SMSInputInput";
