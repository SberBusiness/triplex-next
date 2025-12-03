import React, { useContext, useEffect, useRef } from "react";
import { FormFieldContext } from "../FormFieldContext";
import clsx from "clsx";
import styles from "../styles/FormFieldPostfix.module.less";

/** Свойства компонента FormFieldPostfix. */
export interface IFormFieldPostfixProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Контейнер элементов, отображающихся в правой части FormField. */
export const FormFieldPostfix = React.forwardRef<HTMLSpanElement, IFormFieldPostfixProps>(
    ({ children, className, ...htmlSpanAttributes }, ref) => {
        const classNames = clsx(styles.formFieldPostfix, className);
        const { postfixWidth, setPostfixWidth } = useContext(FormFieldContext);
        const innerRef = useRef<HTMLSpanElement | null>();

        const setRef = (instance: HTMLSpanElement | null) => {
            innerRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        useEffect(() => {
            if (!innerRef.current) {
                return;
            }
            const { width } = innerRef.current.getBoundingClientRect();

            if (width !== postfixWidth) {
                setPostfixWidth(width);
            }
        });

        return (
            <span className={classNames} ref={setRef} {...htmlSpanAttributes}>
                {children}
            </span>
        );
    },
);

FormFieldPostfix.displayName = "FormFieldPostfix";
