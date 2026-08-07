import React, { useContext } from "react";
import clsx from "clsx";
import { FormFieldContext } from "../FormFieldContext";
import { useFormFieldAffixWidth } from "./useFormFieldAffixWidth";
import styles from "../styles/FormFieldPostfix.module.less";

/** Свойства компонента FormFieldPostfix. */
export interface IFormFieldPostfixProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Контейнер элементов, отображающихся в правой части FormField.
 *
 * Измеряет собственную ширину и передаёт её в FormFieldContext — поле использует это
 * значение как правый внутренний отступ, чтобы содержимое не перекрывалось постфиксом.
 */
export const FormFieldPostfix = React.forwardRef<HTMLSpanElement, IFormFieldPostfixProps>(
    ({ children, className, ...restProps }, ref) => {
        const { setPostfixWidth } = useContext(FormFieldContext);
        const setRef = useFormFieldAffixWidth(setPostfixWidth, ref);

        return (
            <span className={clsx(styles.formFieldPostfix, className)} {...restProps} ref={setRef}>
                {children}
            </span>
        );
    },
);

FormFieldPostfix.displayName = "FormFieldPostfix";
