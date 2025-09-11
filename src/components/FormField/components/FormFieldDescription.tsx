import React, { useState } from "react";
import styles from "../styles/FormFieldDescription.module.less";
import clsx from "clsx";
import { FormFieldDescriptionContext } from "../FormFieldDescriptionContext";

/** Свойства компонента FormFieldDescription. */
export interface IFormFieldDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Отображает дополнительную информацию под полем ввода. */
export const FormFieldDescription: React.FC<IFormFieldDescriptionProps> = ({ children, ...rest }) => {
    const [withCounter, setWithCounter] = useState(false);

    return (
        <FormFieldDescriptionContext.Provider value={{ withCounter, setWithCounter }}>
            <div className={clsx(styles.formFieldDescription, { [styles.withCounter]: withCounter })} {...rest}>
                {children}
            </div>
        </FormFieldDescriptionContext.Provider>
    );
};

FormFieldDescription.displayName = "FormFieldDescription";
