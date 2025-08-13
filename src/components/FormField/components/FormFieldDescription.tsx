import React from 'react';

/** Свойства компонента FormFieldDescription. */
export interface IFormFieldDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Отображает дополнительную информацию под полем ввода. */
export const FormFieldDescription: React.FC<IFormFieldDescriptionProps> = ({children, ...rest}) => (
    <div {...rest}>
        {children}
    </div>
);

FormFieldDescription.displayName = 'FormFieldDescription';
