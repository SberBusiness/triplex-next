import React, {useContext, useEffect, useState} from 'react';
import {FormFieldContext} from '../FormFieldContext';
import {TARGET_PADDING_X_DEFAULT} from '../consts';
import clsx from 'clsx';
import styles from '../styles/FormFieldLabel.module.less';
import { EFormFieldSize } from '../enums';

/** Свойства компонента FormFieldLabel. */
interface IFormFieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/** Лейбл поля ввода/селекта. Отображается по-середине поля ввода, когда инпут/селект имеет значение или фокус, перемещается в верхний левый угол. */
export const FormFieldLabel = React.forwardRef<HTMLLabelElement, IFormFieldLabelProps>(
    ({children, className, style, ...htmlLabelAttributes}, ref) => {
        const {disabled, focused, id, prefixWidth, postfixWidth, size, valueExist} = useContext(FormFieldContext);
        // Label отображается в уменьшенном виде над полем ввода/селектом.
        const [floating, setFloating] = useState(false);

        useEffect(() => {
            setFloating(focused || valueExist);
        }, [focused, valueExist]);

        const classNames = clsx(
            styles.formFieldLabel,
            {
                [styles.disabled]: disabled,
                [styles.floating]: floating,
            },
            className
        );

        const stylesLabel = {
            // Левая позиция элемента. Когда label по-середине инпута, позиция учитывает иконки по краям, когда сверху, позиция на все ширину поля ввода.
            left: prefixWidth || TARGET_PADDING_X_DEFAULT,
            // Правая позиция элемента. Когда label по-середине инпута, позиция учитывает иконки по краям, когда сверху, позиция на все ширину поля ввода.
            right: postfixWidth || TARGET_PADDING_X_DEFAULT,
            ...style,
        };

        // Label не отображается для маленького и среднего размера.
        if ([EFormFieldSize.SM, EFormFieldSize.MD].includes(size)) {
            return null;
        }

        return (
            <label className={classNames} ref={ref} htmlFor={id} {...htmlLabelAttributes} style={stylesLabel}>
                <span className={styles.formFieldLabelText}>{children}</span>
            </label>
        );
    }
);

FormFieldLabel.displayName = 'FormFieldLabel';
