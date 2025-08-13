import React from 'react';
import clsx from 'clsx';
import styles from '../styles/FormGroupLine.module.less';

/** Свойства компонента FormGroupLine. */
interface IFormGroupLineProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Flex режим. */
    flex?: boolean;
}

/** Горизонтальный контейнер FormGroup. */
export const FormGroupLine = React.forwardRef<HTMLDivElement, IFormGroupLineProps>(
    ({children, className, flex, ...rest}, ref) => {
        const classNames = clsx(
            styles.formGroupLine,
            {
                [styles.flex]: Boolean(flex),
            },
            className
        );
        return (
            <div className={classNames} ref={ref} {...rest}>
                {children}
            </div>
        );
    }
);

FormGroupLine.displayName = 'FormGroupLine';
