import React from "react";
import clsx from "clsx";
import styles from "./styles/CheckboxYGroup.module.less";

/** Свойства компонента CheckboxYGroup. */
export interface ICheckboxYGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Группа чекбоксов с направлением по оси Y. */
export const CheckboxYGroup: React.FC<ICheckboxYGroupProps> = (props) => {
    const { children, className, ...rest } = props;
    const classNames = clsx(styles.checkboxYGroup, className);

    return (
        <div className={classNames} role="group" {...rest}>
            {children}
        </div>
    );
};

CheckboxYGroup.displayName = "CheckboxYGroup";
