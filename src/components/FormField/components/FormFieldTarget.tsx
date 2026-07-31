import React, { useContext, useMemo, useLayoutEffect, useCallback } from "react";
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
export const FormFieldTarget = React.forwardRef<HTMLDivElement, IFormFieldTargetProps>(
    ({ children, id: idProp, className, placeholder, onFocus, onBlur, ...restProps }, ref) => {
        const { size, status, active, labelId, setFilled, setFocused, setTargetId } = useContext(FormFieldContext);
        const id = useMemo(() => (idProp === undefined ? uniqueId("target_") : idProp), [idProp]);
        const childrenExist = useMemo(() => React.Children.toArray(children).length !== 0, [children]);
        const classNames = clsx(styles.formFieldTarget, sizeToClassNameMap[size], className, {
            [styles.disabled]: status === EFormFieldStatus.DISABLED,
            [styles.placeholder]: !!placeholder && !childrenExist && status !== EFormFieldStatus.DISABLED,
            [styles.active]: active,
        });

        useLayoutEffect(() => {
            setTargetId(id);
        }, [id, setTargetId]);

        useLayoutEffect(() => {
            setFilled(childrenExist);
        }, [childrenExist, setFilled]);

        const handleFocus = useCallback<React.FocusEventHandler<HTMLDivElement>>(
            (event) => {
                setFocused(true);
                onFocus?.(event);
            },
            [onFocus, setFocused],
        );

        const handleBlur = useCallback<React.FocusEventHandler<HTMLDivElement>>(
            (event) => {
                setFocused(false);
                onBlur?.(event);
            },
            [onBlur, setFocused],
        );

        return (
            <div
                {...restProps}
                id={id}
                className={classNames}
                tabIndex={status === EFormFieldStatus.DISABLED ? -1 : 0}
                aria-labelledby={labelId}
                aria-disabled={status === EFormFieldStatus.DISABLED}
                onBlur={handleBlur}
                onFocus={handleFocus}
                ref={ref}
            >
                {childrenExist ? children : <span className={styles.placeholderWrapper}>{placeholder}</span>}
            </div>
        );
    },
);

FormFieldTarget.displayName = "FormFieldTarget";
