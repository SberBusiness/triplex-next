import React from "react";

/** Свойства компонента FormGroup. */
interface IFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Части группы: поле ввода и относящиеся к нему подсказки и сообщения. */
    children?: React.ReactNode;
}

/**
 * Контейнер формы, объединяющий поле ввода с относящимися к нему элементами — `FormField`,
 * `FormFieldDescription`, `HelpBox`, `Alert`. Части передаются декларативно через `children`,
 * поэтому каждой можно задать свои props и data-атрибуты. Собственной разметки и стилей не
 * добавляет: рендерит один `div` с переданными атрибутами.
 */
export const FormGroup = React.forwardRef<HTMLDivElement, IFormGroupProps>(({ children, ...rest }, ref) => (
    <div ref={ref} {...rest}>
        {children}
    </div>
));

FormGroup.displayName = "FormGroup";
