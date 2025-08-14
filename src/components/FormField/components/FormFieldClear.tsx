import React, {useContext} from 'react';
// import {ClosenotificationSrvxIcon16} from '@sberbusiness/icons/ClosenotificationSrvxIcon16';
import {FormFieldContext} from '../FormFieldContext';
import clsx from 'clsx';
import styles from '../styles/FormFieldClear.module.less';

export interface IFormFieldClearProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Кнопка очищения введенного значения. */
export const FormFieldClear = React.forwardRef<HTMLSpanElement, IFormFieldClearProps>(
    ({children, className, onClick, ...htmlLabelAttributes}, ref) => {
        const {disabled, focused, hovered, id, valueExist} = useContext(FormFieldContext);

        const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
            // Установка фокуса в поле ввода при очищении значения.
            const input = document.querySelector<HTMLInputElement>(`#${id}`);
            if (input) {
                input.focus();
            }

            onClick?.(event);
        };

        const classNames = clsx(
            styles.formFieldClear,
            'hoverable',
            {
                [styles.shown]: valueExist && !disabled && (focused || hovered),
            },
            className
        );

        return (
            <span className={classNames} ref={ref} onClick={handleClick} {...htmlLabelAttributes}>
                {/* <ClosenotificationSrvxIcon16 /> */}
                X
            </span>
        );
    }
);

FormFieldClear.displayName = 'FormFieldClear';
