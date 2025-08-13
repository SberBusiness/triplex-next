import React from 'react';

/** Свойства компонента FormGroup. */
interface IFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Элемент, объединяющий FormField, HelpBox, Alert, Description.
 * Дочерние элементы, передаются декларативно, это позволяет их кастомизировать и передавать data-атрибуты.
 */
export const FormGroup = React.forwardRef<HTMLDivElement, IFormGroupProps>(({children, ...rest}, ref) => (
    <div ref={ref} {...rest}>
        {children}
    </div>
));

FormGroup.displayName = 'FormGroup';
