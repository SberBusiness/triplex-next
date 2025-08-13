import React from 'react';
import clsx from 'clsx';
import styles from '../styles/FormFieldSidebar.module.less';
/** Свойства компонента FormFieldSidebar. */
interface IFormFieldSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Сайдбар поля ввода, отображается справа от поля ввода. Обычно содержит HelpBox. */
export const FormFieldSidebar = React.forwardRef<HTMLDivElement, IFormFieldSidebarProps>(
    ({children, className, ...htmlDivAttributes}, ref) => (
        <div className={clsx(styles.formFieldSidebar, className)} ref={ref} {...htmlDivAttributes}>
            {children}
        </div>
    )
);

FormFieldSidebar.displayName = 'FormFieldSidebar';
