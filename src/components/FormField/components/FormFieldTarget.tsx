import React, { useContext, useEffect, useRef } from "react";
import { FormFieldContext } from "../FormFieldContext";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField/enums";
import styles from "../styles/FormFieldTarget.module.less";

/** Свойства компонента FormFieldTarget. */
export interface IFormFieldTargetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Текст, или компонент отображающий выбранное placeholder. Отличие от children в том, что placeholder отображается только когда нет children и более бледным цветом. */
    placeholder?: React.ReactNode;
}

/** Компонент, отображающий нередактируемое значение. */
export const FormFieldTarget = React.forwardRef<HTMLDivElement, IFormFieldTargetProps>((props, ref) => {
    const { className, id, onBlur, onFocus, placeholder, children, ...restProps } = props;
    const { status, setFocused, setId, setValueExist, size, active } = useContext(FormFieldContext);
    const classNames = clsx(styles.formFieldTarget, className, styles[`size-${size}`], {
        [styles.disabled]: status === EFormFieldStatus.DISABLED,
        [styles.placeholder]: !!placeholder && !children && status !== EFormFieldStatus.DISABLED,
        [styles.active]: active,
    });

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
        setValueExist(!!children);
    }, [setValueExist, children]);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
    };

    return (
        <div
            {...restProps}
            className={classNames}
            aria-disabled={status === EFormFieldStatus.DISABLED}
            // eslint-disable-next-line react-hooks/refs
            id={instanceId.current}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={status === EFormFieldStatus.DISABLED ? -1 : 0}
            ref={ref}
        >
            {children || <span className={styles.placeholderWrapper}>{placeholder}</span>}
        </div>
    );
});

FormFieldTarget.displayName = "FormFieldTarget";
