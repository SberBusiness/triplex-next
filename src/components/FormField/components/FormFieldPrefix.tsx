import React, { useContext, useRef, useEffect } from "react";
import clsx from "clsx";
import { FormFieldContext } from "../FormFieldContext";
import { TARGET_PADDING_X_DEFAULT } from "../consts";
import styles from "../styles/FormFieldPrefix.module.less";

/** Свойства компонента FormFieldPrefix. */
export interface IFormFieldPrefixProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Контейнер элементов, отображающихся в левой части FormField. */
export const FormFieldPrefix = React.forwardRef<HTMLSpanElement, IFormFieldPrefixProps>(
    ({ children, className, ...restProps }, ref) => {
        const { setPrefixWidth } = useContext(FormFieldContext);
        const innerRef = useRef<HTMLSpanElement | null>();
        const classNames = clsx(styles.formFieldPrefix, className);

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
                setPrefixWidth((prevWidth) => (prevWidth !== width ? width : prevWidth));
            });

            resizeObserver.observe(element);
            return () => {
                resizeObserver.disconnect();
                setPrefixWidth(TARGET_PADDING_X_DEFAULT);
            };
        }, [setPrefixWidth]);

        return (
            <span className={classNames} {...restProps} ref={setRef}>
                {children}
            </span>
        );
    },
);

FormFieldPrefix.displayName = "FormFieldPrefix";
