import React, { useEffect, useContext } from "react";
import { FormFieldDescriptionContext } from "../FormFieldDescriptionContext";
import styles from "../styles/FormFieldCounter.module.less";

/** Свойства компонента FormFieldCounter. */
export interface IFormFieldCounterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Отображает дополнительную информацию под полем ввода справа, счетчик символов. */
export const FormFieldCounter: React.FC<IFormFieldCounterProps> = ({ children, ...rest }) => {
    const { setWithCounter } = useContext(FormFieldDescriptionContext);

    useEffect(() => {
        setWithCounter(true);
    }, []);

    return (
        <div className={styles.formFieldCounter} {...rest}>
            {children}
        </div>
    );
};

FormFieldCounter.displayName = "FormFieldCounter";
