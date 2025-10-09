import React, { useEffect, useContext, useRef } from "react";
import { FormFieldContext } from "../FormFieldContext";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import styles from "../styles/FormFieldInput.module.less";

/** Компонент, отображающий input. */
export const FormFieldTarget = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    (props, ref) => {
        const { className, id, onAnimationStart, onBlur, onFocus, ...restProps } = props;
        const { disabled, setFocused, setId, setValueExist, size } = useContext(FormFieldContext);
        const classNames = clsx(styles.formFieldInput, className, styles[`size-${size}`]);

        const instanceId = useRef(id || uniqueId("formFieldTarget_"));

        useEffect(() => {
            setId(instanceId.current);
        }, [setId]);

        useEffect(() => {
            if (id) {
                instanceId.current = id;
                setId(instanceId.current);
            }
        }, [id, setId]);

        useEffect(() => {
            setValueExist(!!props.children);
        }, [setValueExist, props.children]);

        const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
            setFocused(false);
            onBlur?.(event);
        };

        const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
            setFocused(true);
            onFocus?.(event);
        };

        return (
            <span
                {...restProps}
                className={classNames}
                aria-disabled={disabled}
                id={instanceId.current}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={disabled ? -1 : 0}
                ref={ref}
            >
                {props.children}
            </span>
        );
    },
);

FormFieldTarget.displayName = "FormFieldTarget";
