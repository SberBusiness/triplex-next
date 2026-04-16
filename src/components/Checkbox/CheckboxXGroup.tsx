import React from "react";
import clsx from "clsx";
import { TIndentSize } from "../../consts/IndentConst";
import styles from "./styles/CheckboxXGroup.module.less";

/** Свойства компонента CheckboxXGroup. */
export interface ICheckboxXGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
    children?: React.ReactNode;
    /** Размер отступа. */
    indent?: TIndentSize;
}

/** Группа чекбоксов с направлением по оси X. */
export const CheckboxXGroup = React.forwardRef<HTMLDivElement, ICheckboxXGroupProps>((props, ref) => {
    const { children, className, indent = 12, ...rest } = props;
    const classNames = clsx(styles.checkboxXGroup, styles[`indent-${indent}`], className);

    return (
        <div className={classNames} {...rest} role="group" ref={ref}>
            {children}
        </div>
    );
});

CheckboxXGroup.displayName = "CheckboxXGroup";
