import React, {FocusEventHandler, useContext, useEffect, useRef, useState} from 'react';
import {FormFieldContext} from '../FormFieldContext';
import clsx from 'clsx';
import { uniqueId } from 'lodash-es';
import styles from '../styles/FormFieldTextarea.module.less';
import { EFormFieldStatus } from '../enums';

/** Свойства компонента FormFieldTextarea. */
export interface IFormFieldTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/** Компонент, отображающий textarea. */
export const FormFieldTextarea = React.forwardRef<HTMLTextAreaElement, IFormFieldTextareaProps>(
    ({className, id, onBlur, onFocus, placeholder, value, ...htmlTextareaHTMLAttributes}, ref) => {
        const {status, focused, setFocused, setId, setValueExist} = useContext(FormFieldContext);
        const instanceId = useRef(id || uniqueId());
        const classNames = clsx(styles.formFieldTextarea, className);

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

        const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (event) => {
            setFocused(false);
            onBlur?.(event);
        };

        const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (event) => {
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
    }
);

FormFieldTextarea.displayName = 'FormFieldTextarea';
