import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { FormFieldDescriptionContext } from "../FormFieldDescriptionContext";
import styles from "../styles/FormFieldCounter.module.less";

/** HTML-атрибуты контейнера. Отображаемое значение передаётся через children. */
export interface IFormFieldCounterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Отображает переданное значение счётчика. Расчёт длины и ограничение ввода задаёт потребитель.
 * При монтировании включает режим счётчика у ближайшего FormFieldDescription, при размонтировании выключает.
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
