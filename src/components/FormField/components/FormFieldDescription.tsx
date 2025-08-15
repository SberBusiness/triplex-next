import React from 'react';
import styles from '../styles/FormFieldDescription.module.less';

/** Свойства компонента FormFieldDescription. */
export interface IFormFieldDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Отображает дополнительную информацию под полем ввода. */
export const FormFieldDescription: React.FC<IFormFieldDescriptionProps> = ({children, ...rest}) => (
    <div className={styles.formFieldDescription} {...rest}>
        {children}
    </div>
);

FormFieldDescription.displayName = 'FormFieldDescription';
