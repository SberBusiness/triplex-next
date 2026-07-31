import React, { useState, useMemo } from "react";
import clsx from "clsx";
import { FormFieldContext, IFormFieldContext } from "./FormFieldContext";
import { TARGET_PADDING_X_DEFAULT } from "./consts";
import { EFormFieldStatus } from "./enums";
import { EComponentSize } from "../../enums/EComponentSize";
import { DataAttributes } from "../../types/CoreTypes";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import styles from "./styles/FormField.module.less";

/** Свойства компонента FormField. */
export interface IFormFieldProps extends React.HTMLAttributes<HTMLDivElement>, DataAttributes {
    /** Визуальное состояние поля. По умолчанию EFormFieldStatus.DEFAULT. Значение DISABLED блокирует вложенные элементы ввода. */
    status?: EFormFieldStatus;
    /** Размер поля. По умолчанию EComponentSize.LG. Прокидывается вложенным элементам через контекст. */
    size?: EComponentSize;
    /** Принудительно активное состояние. По умолчанию false. Поле также становится активным, когда вложенный элемент ввода в фокусе. */
    active?: boolean;
}

/** Соответствие статуса имени класса. */
export const statusToClassNameMap = {
    [EFormFieldStatus.DEFAULT]: styles.default,
    [EFormFieldStatus.DISABLED]: styles.disabled,
    [EFormFieldStatus.ERROR]: styles.error,
    [EFormFieldStatus.WARNING]: styles.warning,
};

/** Соответствие размера имени класса. */
const sizeToClassNameMap = createSizeToClassNameMap(styles);

/**
 * Элемент, отображающий input/select/textarea + label.
 *
 * Является провайдером FormFieldContext: размер, статус и состояния поля (фокус, заполненность,
 * идентификаторы элемента ввода и лейбла, ширины префикса и постфикса) распространяются
 * на вложенные FormFieldLabel / FormFieldInput / FormFieldTarget и другие субкомпоненты.
 */
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

        // Поле активно, если активность задана снаружи или вложенный элемент ввода в фокусе.
        const isActive = active || focused;

        const contextValue = useMemo<IFormFieldContext>(
            () => ({
                size,
                status,
                targetId,
                labelId,
                postfixWidth,
                prefixWidth,
                filled,
                focused,
                active: isActive,
                setTargetId,
                setLabelId,
                setPostfixWidth,
                setPrefixWidth,
                setFilled,
                setFocused,
            }),
            [size, status, targetId, labelId, postfixWidth, prefixWidth, filled, focused, isActive],
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
                            [styles.active]: isActive,
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
