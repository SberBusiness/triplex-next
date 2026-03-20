import React, { useContext, useMemo, useEffect } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { FormFieldContext } from "../FormFieldContext";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField/enums";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import styles from "../styles/FormFieldTarget.module.less";

/** Свойства компонента FormFieldTarget. */
export interface IFormFieldTargetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Текст, или компонент отображающий выбранное placeholder. Отличие от children в том, что placeholder отображается только когда нет children и более бледным цветом. */
    placeholder?: React.ReactNode;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Компонент, отображающий нередактируемое значение. */
export const FormFieldTarget = React.forwardRef<HTMLDivElement, IFormFieldTargetProps>((props, ref) => {
    const { className, id, onBlur, onFocus, placeholder, children, ...restProps } = props;
    const { status, setFocused, setTargetId, setFilled, size, active } = useContext(FormFieldContext);
    const instanceId = useMemo(() => (id === undefined ? uniqueId("target_") : id), [id]);
    const classNames = clsx(styles.formFieldTarget, sizeToClassNameMap[size], className, {
        [styles.disabled]: status === EFormFieldStatus.DISABLED,
        [styles.placeholder]: !!placeholder && !children && status !== EFormFieldStatus.DISABLED,
        [styles.active]: active,
    });

    useEffect(() => {
        setTargetId(instanceId);
    }, [instanceId, setTargetId]);

    useEffect(() => {
        setFilled(!!children);
    }, [setFilled, children]);

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
            id={instanceId}
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
