import React, { useContext, useEffect, useRef } from "react";
import { FormFieldContext } from "../FormFieldContext";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import styles from "../styles/FormFieldTextarea.module.less";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField/enums";

/** Свойства компонента FormFieldTextarea. */
export interface IFormFieldTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Компонент, отображающий textarea. */
export const FormFieldTextarea = React.forwardRef<HTMLTextAreaElement, IFormFieldTextareaProps>(
    ({ className, id, onBlur, onFocus, placeholder, value, ...htmlTextareaHTMLAttributes }, ref) => {
        const { size, status, focused, setFocused, setId, setValueExist } = useContext(FormFieldContext);
        const instanceId = useRef(id === undefined ? uniqueId() : "");
        const classNames = clsx(styles.formFieldTextarea, sizeToClassNameMap[size], className);

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
                id={instanceId.current}
                className={classNames}
                disabled={status === EFormFieldStatus.DISABLED}
                onFocus={handleFocus}
                onBlur={handleBlur}
                /* Когда элемент не в фокусе, вместо placeholder показывается Label. */
                placeholder={focused ? placeholder : undefined}
                value={value}
                ref={ref}
            />
        );
    },
);

FormFieldTextarea.displayName = "FormFieldTextarea";
