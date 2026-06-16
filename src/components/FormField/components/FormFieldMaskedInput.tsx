import React, { useContext, useMemo } from "react";
import clsx from "clsx";
import { MaskedInput, IMaskedInputProps } from "../../MaskedInput";
import { DataAttributes } from "../../../types/CoreTypes";
import { FormFieldInput } from "./FormFieldInput";
import { FormFieldContext } from "../FormFieldContext";
import { EFormFieldStatus } from "../enums";
import styles from "../styles/FormFieldMaskedInput.module.less";

/** Свойства компонента FormFieldMaskedInput. */
export interface IFormFieldMaskedInputProps extends Omit<IMaskedInputProps, "render">, DataAttributes {
    /** Состояние ошибки. */
    error?: boolean;
}

const FormFieldMaskedInputBase = React.forwardRef<HTMLElement, IFormFieldMaskedInputProps>(
    ({ className, placeholder, ...restProps }, ref) => {
        const { filled, focused, size, status } = useContext(FormFieldContext);
        const hasValue = Boolean(restProps.value);
        const isFieldActive = focused || filled || hasValue;

        const maskedInputPlaceholder = useMemo(() => {
            if (!isFieldActive) {
                return " ";
            }
            return placeholder || "";
        }, [isFieldActive, placeholder]);

        const showNativePlaceholder = isFieldActive && !hasValue && Boolean(placeholder);

        return (
            <MaskedInput
                ref={ref}
                disabled={status === EFormFieldStatus.DISABLED}
                {...restProps}
                placeholder={maskedInputPlaceholder}
                className={clsx(styles.formFieldMaskedInputWrapper, styles[`size-${size}`], className)}
                render={(combinedRef, inputProps) => (
                    <FormFieldInput
                        {...inputProps}
                        className={clsx(styles.formFieldMaskedInput, {
                            [styles.error]: Boolean(restProps.error),
                        })}
                        placeholder={showNativePlaceholder ? placeholder || "" : ""}
                        ref={combinedRef}
                    />
                )}
            />
        );
    },
);

FormFieldMaskedInputBase.displayName = "FormFieldMaskedInput";

export const FormFieldMaskedInput = Object.assign(FormFieldMaskedInputBase, { presets: MaskedInput.presets });
