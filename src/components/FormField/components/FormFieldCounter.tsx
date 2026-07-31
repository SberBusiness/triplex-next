import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { FormFieldDescriptionContext } from "../FormFieldDescriptionContext";
import styles from "../styles/FormFieldCounter.module.less";

/** Свойства компонента FormFieldCounter. */
export interface IFormFieldCounterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Счётчик символов. Отображает дополнительную информацию под полем ввода справа.
 *
 * Сообщает родительскому FormFieldDescription о своём присутствии через FormFieldDescriptionContext.
 */
export const FormFieldCounter: React.FC<IFormFieldCounterProps> = ({ children, className, ...rest }) => {
    const { setWithCounter } = useContext(FormFieldDescriptionContext);

    useEffect(() => {
        setWithCounter(true);

        return () => setWithCounter(false);
    }, [setWithCounter]);

    return (
        <div className={clsx(styles.formFieldCounter, className)} {...rest}>
            {children}
        </div>
    );
};

FormFieldCounter.displayName = "FormFieldCounter";
