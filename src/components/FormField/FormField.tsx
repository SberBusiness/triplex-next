import React, { useState, useMemo } from "react";
import clsx from "clsx";
import { FormFieldContext } from "./FormFieldContext";
import { TARGET_PADDING_X_DEFAULT } from "./consts";
import { EFormFieldStatus } from "./enums";
import { EComponentSize } from "../../enums/EComponentSize";
import { DataAttributes } from "../../types/CoreTypes";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import styles from "./styles/FormField.module.less";

/** Свойства компонента FormField. */
export interface IFormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "placeholder">, DataAttributes {
    /** Визуальное состояние. */
    status?: EFormFieldStatus;
    /** Размер. */
    size?: EComponentSize;
    /** Активное состояние. */
    active?: boolean;
}

export const statusToClassNameMap = {
    [EFormFieldStatus.DEFAULT]: styles.default,
    [EFormFieldStatus.DISABLED]: styles.disabled,
    [EFormFieldStatus.ERROR]: styles.error,
    [EFormFieldStatus.WARNING]: styles.warning,
};

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Элемент, отображающий input/select/textarea + label. */
export const FormField = React.forwardRef<HTMLDivElement, IFormFieldProps>(
    (
        {
            children,
            className,
            style,
            size = EComponentSize.LG,
            status = EFormFieldStatus.DEFAULT,
            active = false,
            ...htmlDivAttributes
        },
        ref,
    ) => {
        const [targetId, setTargetId] = useState<string>();
        const [labelId, setLabelId] = useState<string>();
        const [postfixWidth, setPostfixWidth] = useState(TARGET_PADDING_X_DEFAULT);
        const [prefixWidth, setPrefixWidth] = useState(TARGET_PADDING_X_DEFAULT);
        const [filled, setFilled] = useState(false);
        const [focused, setFocused] = useState(false);

        const contextValue = useMemo(
            () => ({
                size,
                status,
                targetId,
                labelId,
                postfixWidth,
                prefixWidth,
                filled,
                focused,
                active: active || focused,
                setTargetId,
                setLabelId,
                setPostfixWidth,
                setPrefixWidth,
                setFilled,
                setFocused,
            }),
            [size, status, targetId, labelId, postfixWidth, prefixWidth, filled, focused, active],
        );

        return (
            <FormFieldContext.Provider value={contextValue}>
                <div
                    className={clsx(
                        styles.formField,
                        sizeToClassNameMap[size],
                        statusToClassNameMap[status],
                        {
                            [styles.filled]: filled,
                            [styles.active]: active || focused,
                        },
                        className,
                    )}
                    data-tx={process.env.npm_package_version}
                    style={{ paddingLeft: prefixWidth, paddingRight: postfixWidth, ...style }}
                    {...htmlDivAttributes}
                    ref={ref}
                >
                    {children}
                </div>
            </FormFieldContext.Provider>
        );
    },
);

FormField.displayName = "FormField";
