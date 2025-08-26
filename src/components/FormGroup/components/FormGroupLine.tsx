import React from 'react';

/** Свойства компонента FormGroupLine. */
interface IFormGroupLineProps extends React.HTMLAttributes<HTMLDivElement> { }

/** Горизонтальный контейнер FormGroup. */
export const FormGroupLine = React.forwardRef<HTMLDivElement, IFormGroupLineProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={className} ref={ref} {...rest}>
            {children}
        </div>
    )
);

FormGroupLine.displayName = 'FormGroupLine';
