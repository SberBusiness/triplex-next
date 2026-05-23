import React, { useContext, useRef, useEffect } from "react";
import clsx from "clsx";
import { FormFieldContext } from "../FormFieldContext";
import { TARGET_PADDING_X_DEFAULT } from "../consts";
import styles from "../styles/FormFieldPostfix.module.less";

/** Свойства компонента FormFieldPostfix. */
export interface IFormFieldPostfixProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Контейнер элементов, отображающихся в правой части FormField. */
export const FormFieldPostfix = React.forwardRef<HTMLSpanElement, IFormFieldPostfixProps>(
    ({ children, className, ...restProps }, ref) => {
        const { setPostfixWidth } = useContext(FormFieldContext);
        const innerRef = useRef<HTMLSpanElement | null>();
        const classNames = clsx(styles.formFieldPostfix, className);

        const setRef = (instance: HTMLSpanElement | null) => {
            innerRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        useEffect(() => {
            const element = innerRef.current;
            if (!element) {
                return;
            }

            const resizeObserver = new ResizeObserver(([entry]) => {
                const width = entry.target.getBoundingClientRect().width;
                setPostfixWidth((prevWidth) => (prevWidth !== width ? width : prevWidth));
            });

            resizeObserver.observe(element);
            return () => {
                resizeObserver.disconnect();
                setPostfixWidth(TARGET_PADDING_X_DEFAULT);
            };
        }, [setPostfixWidth]);

        return (
            <span className={classNames} {...restProps} ref={setRef}>
                {children}
            </span>
        );
    },
);

FormFieldPostfix.displayName = "FormFieldPostfix";
