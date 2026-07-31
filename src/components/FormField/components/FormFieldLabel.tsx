import React, { useContext, useMemo, useLayoutEffect } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { FormFieldContext } from "../FormFieldContext";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { EFormFieldStatus } from "../enums";
import { TARGET_PADDING_X_DEFAULT } from "../consts";
import styles from "../styles/FormFieldLabel.module.less";

/** Свойства компонента FormFieldLabel. */
export interface IFormFieldLabelProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "htmlFor"> {
    /**
     * Label отображается в уменьшенном виде над полем ввода/селектом.
     * Если значение не задано, вычисляется из состояния поля в FormFieldContext.
     * @default filled || active
     */
    floating?: boolean;
}

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Лейбл поля ввода/селекта.
 *
 * Отображается по середине поля ввода; когда инпут/селект имеет значение или фокус,
 * перемещается в верхний левый угол. Атрибут htmlFor берётся из FormFieldContext (targetId),
 * собственный идентификатор публикуется в контекст как labelId.
 */
export const FormFieldLabel = React.forwardRef<HTMLLabelElement, IFormFieldLabelProps>(
    ({ children, id: idProp, className, style, floating: floatingProp, ...restProps }, ref) => {
        const { targetId, size, status, filled, active, prefixWidth, postfixWidth, setLabelId } =
            useContext(FormFieldContext);
        const id = useMemo(() => (idProp === undefined ? uniqueId("label_") : idProp), [idProp]);
        // Label отображается в уменьшенном виде над полем ввода/селектом.
        const floating = floatingProp ?? (filled || active);

        const classNames = clsx(
            styles.formFieldLabel,
            SIZE_TO_CLASS_NAME_MAP[size],
            {
                [styles.floating]: floating,
                [styles.disabled]: status === EFormFieldStatus.DISABLED,
            },
            className,
        );

        const labelStyle = {
            // Позиции по краям учитывают ширину префикса и постфикса, чтобы лейбл не перекрывался иконками.
            left: prefixWidth || TARGET_PADDING_X_DEFAULT,
            right: postfixWidth || TARGET_PADDING_X_DEFAULT,
            ...style,
        };

        useLayoutEffect(() => {
            setLabelId(id);
        }, [id, setLabelId]);

        return (
            <label {...restProps} id={id} className={classNames} htmlFor={targetId} style={labelStyle} ref={ref}>
                <span className={styles.formFieldLabelText}>{children}</span>
            </label>
        );
    },
);

FormFieldLabel.displayName = "FormFieldLabel";
