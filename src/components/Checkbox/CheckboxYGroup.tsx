import React from "react";
import clsx from "clsx";
import styles from "./styles/CheckboxYGroup.module.less";

/** Свойства компонента CheckboxYGroup. */
export interface ICheckboxYGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
    children?: React.ReactNode;
}

/** Группа чекбоксов с направлением по оси Y. */
export const CheckboxYGroup = React.forwardRef<HTMLDivElement, ICheckboxYGroupProps>((props, ref) => {
    const { children, className, ...rest } = props;
    const classNames = clsx(styles.checkboxYGroup, className);

    return (
        <div className={classNames} {...rest} role="group" ref={ref}>
            {children}
        </div>
    );
});

CheckboxYGroup.displayName = "CheckboxYGroup";
