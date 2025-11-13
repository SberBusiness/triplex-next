import React, {useContext, useEffect, useRef} from 'react';
import {FormFieldContext} from '../FormFieldContext';
import clsx from 'clsx';
import styles from '../styles/FormFieldPrefix.module.less';

/** Свойства компонента FormFieldPrefix. */
export interface IFormFieldPrefixProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Контейнер элементов, отображающихся в левой части FormField. */
export const FormFieldPrefix = React.forwardRef<HTMLSpanElement, IFormFieldPrefixProps>(
    ({children, className, ...htmlSpanAttributes}, ref) => {
        const classNames = clsx(styles.formFieldPrefix, className);
        const {prefixWidth, setPrefixWidth} = useContext(FormFieldContext);

        const innerRef = useRef<HTMLSpanElement | null>();

        const setRef = (instance: HTMLSpanElement | null) => {
            innerRef.current = instance;
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        useEffect(() => {
            if (!innerRef.current) {
                return;
            }
            const {width} = innerRef.current.getBoundingClientRect();

            if (width !== prefixWidth) {
                setPrefixWidth(width);
            }
        });

        return (
            <span className={classNames} ref={setRef} {...htmlSpanAttributes}>
                {children}
            </span>
        );
    }
);

FormFieldPrefix.displayName = 'FormFieldPrefix';
