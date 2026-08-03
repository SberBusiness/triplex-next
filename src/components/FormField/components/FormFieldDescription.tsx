import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { FormFieldDescriptionContext, IFormFieldDescriptionContext } from "../FormFieldDescriptionContext";
import styles from "../styles/FormFieldDescription.module.less";

/** Свойства компонента FormFieldDescription. */
export interface IFormFieldDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Отображает дополнительную информацию под полем ввода.
 *
 * Является провайдером FormFieldDescriptionContext: вложенный FormFieldCounter сообщает
 * о своём присутствии, и описание перестраивает раскладку под счётчик.
 */
export const FormFieldDescription: React.FC<IFormFieldDescriptionProps> = ({ children, className, ...rest }) => {
    const [withCounter, setWithCounter] = useState(false);
    const contextValue = useMemo<IFormFieldDescriptionContext>(() => ({ withCounter, setWithCounter }), [withCounter]);

    return (
        <FormFieldDescriptionContext.Provider value={contextValue}>
            <div
                className={clsx(styles.formFieldDescription, { [styles.withCounter]: withCounter }, className)}
                {...rest}
            >
                {children}
            </div>
        </FormFieldDescriptionContext.Provider>
    );
};

FormFieldDescription.displayName = "FormFieldDescription";
