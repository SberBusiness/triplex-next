import React, { useMemo, useContext, useEffect } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { FormFieldContext } from "../FormFieldContext";
import { EFormFieldStatus } from "../enums";
import styles from "../styles/FormFieldTextarea.module.less";

/** Свойства компонента FormFieldTextarea. */
export interface IFormFieldTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Соответствие размера имени класса.
const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Компонент, отображающий textarea. */
export const FormFieldTextarea = React.forwardRef<HTMLTextAreaElement, IFormFieldTextareaProps>(
    ({ className, id, onBlur, onFocus, value, ...htmlTextareaHTMLAttributes }, ref) => {
        const { size, status, setFocused, setId, setValueExist } = useContext(FormFieldContext);
        const instanceId = useMemo(() => (id === undefined ? uniqueId("textarea_") : id), [id]);
        const classNames = clsx(styles.formFieldTextarea, sizeToClassNameMap[size], className);

        useEffect(() => {
            setId(instanceId);
        }, [instanceId, setId]);

        useEffect(() => {
            setValueExist(Boolean(value));
        }, [setValueExist, value]);

        const handleBlur: React.FocusEventHandler<HTMLTextAreaElement> = (event) => {
            setFocused(false);
            onBlur?.(event);
        };

        const handleFocus: React.FocusEventHandler<HTMLTextAreaElement> = (event) => {
            setFocused(true);
            onFocus?.(event);
        };

        return (
            <textarea
                {...htmlTextareaHTMLAttributes}
                id={instanceId}
                className={classNames}
                disabled={status === EFormFieldStatus.DISABLED}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                ref={ref}
            />
        );
    },
);

FormFieldTextarea.displayName = "FormFieldTextarea";
