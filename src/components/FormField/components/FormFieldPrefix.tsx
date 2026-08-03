import React, { useContext } from "react";
import clsx from "clsx";
import { FormFieldContext } from "../FormFieldContext";
import { useFormFieldAffixWidth } from "./useFormFieldAffixWidth";
import styles from "../styles/FormFieldPrefix.module.less";

/** Свойства компонента FormFieldPrefix. */
export interface IFormFieldPrefixProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Контейнер элементов, отображающихся в левой части FormField.
 *
 * Измеряет собственную ширину и передаёт её в FormFieldContext — поле использует это
 * значение как левый внутренний отступ, чтобы содержимое не перекрывалось префиксом.
 */
export const FormFieldPrefix = React.forwardRef<HTMLSpanElement, IFormFieldPrefixProps>(
    ({ children, className, ...restProps }, ref) => {
        const { setPrefixWidth } = useContext(FormFieldContext);
        const setRef = useFormFieldAffixWidth(setPrefixWidth, ref);

        return (
            <span className={clsx(styles.formFieldPrefix, className)} {...restProps} ref={setRef}>
                {children}
            </span>
        );
    },
);

FormFieldPrefix.displayName = "FormFieldPrefix";
