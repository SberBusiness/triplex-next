import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { FormFieldDescriptionContext, IFormFieldDescriptionContext } from "../FormFieldDescriptionContext";
import styles from "../styles/FormFieldDescription.module.less";

/** HTML-атрибуты контейнера описания. id можно связать с полем через aria-describedby. */
export interface IFormFieldDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Контейнер подсказки или сообщения под полем ввода.
 * Регистрация одного FormFieldCounter через контекст включает горизонтальную раскладку.
 */
export const FormFieldDescription: React.FC<IFormFieldDescriptionProps> = ({ children, className, ...rest }) => {
    const [withCounter, setWithCounter] = useState(false);
    // Стабильное значение: переключение раскладки не перерисовывает потребителей контекста.
    const contextValue = useMemo<IFormFieldDescriptionContext>(() => ({ setWithCounter }), []);

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
