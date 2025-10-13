import React, { useContext, useEffect, useState } from "react";
import { FormFieldContext } from "../FormFieldContext";
import { TARGET_PADDING_X_DEFAULT } from "../consts";
import clsx from "clsx";
import { EFormFieldStatus } from "../enums";
import styles from "../styles/FormFieldLabel.module.less";
import { isUndefined } from "lodash-es";

/** Свойства компонента FormFieldLabel. */
interface IFormFieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    /** Label отображается в уменьшенном виде над полем ввода/селектом. */
    floating?: boolean;
}

/** Лейбл поля ввода/селекта. Отображается по-середине поля ввода, когда инпут/селект имеет значение или фокус, перемещается в верхний левый угол. */
export const FormFieldLabel = React.forwardRef<HTMLLabelElement, IFormFieldLabelProps>(
    ({ children, className, style, floating: floatingProp, ...htmlLabelAttributes }, ref) => {
        const { status, focused, id, prefixWidth, postfixWidth, size, valueExist } = useContext(FormFieldContext);
        // Label отображается в уменьшенном виде над полем ввода/селектом.
        const [floating, setFloating] = useState(false);

        useEffect(() => {
            if (!isUndefined(floatingProp)) {
                setFloating(floatingProp);
            } else {
                setFloating(focused || valueExist);
            }
        }, [focused, valueExist, floatingProp]);

        const classNames = clsx(
            styles.formFieldLabel,
            {
                [styles.disabled]: status === EFormFieldStatus.DISABLED,
                [styles.floating]: floating,
                [styles[`size-${size}`]]: size,
            },
            className,
        );

        const stylesLabel = {
            // Левая позиция элемента. Когда label по-середине инпута, позиция учитывает иконки по краям, когда сверху, позиция на все ширину поля ввода.
            left: prefixWidth || TARGET_PADDING_X_DEFAULT,
            // Правая позиция элемента. Когда label по-середине инпута, позиция учитывает иконки по краям, когда сверху, позиция на все ширину поля ввода.
            right: postfixWidth || TARGET_PADDING_X_DEFAULT,
            ...style,
        };

        return (
            <label className={classNames} ref={ref} htmlFor={id} {...htmlLabelAttributes} style={stylesLabel}>
                <span className={styles.formFieldLabelText}>{children}</span>
            </label>
        );
    },
);

FormFieldLabel.displayName = "FormFieldLabel";
