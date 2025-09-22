import React from "react";
import styles from "./styles/RadioYGroup.module.less";
import clsx from "clsx";

/** Свойства компонента RadioYGroup. */
export interface IRadioYGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Группа радио-кнопок с направлением по оси Y. */
export const RadioYGroup: React.FC<IRadioYGroupProps> = (props) => {
    const { children, className, ...rest } = props;
    const classNames = clsx(styles.radioYGroup, className);

    return (
        <div className={classNames} role="radiogroup" {...rest}>
            {children}
        </div>
    );
};

RadioYGroup.displayName = "RadioYGroup";
