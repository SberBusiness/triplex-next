import React from "react";
import { TIndentSize } from "../../consts/IndentConst";
import clsx from "clsx";
import styles from "./styles/CheckboxXGroup.module.less";

/** Свойства компонента CheckboxXGroup. */
export interface ICheckboxXGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер отступа. */
    indent?: TIndentSize;
}

/** Группа чекбоксов с направлением по оси X. */
export const CheckboxXGroup: React.FC<ICheckboxXGroupProps> = (props) => {
    const { children, className, indent = 12, ...rest } = props;
    const classNames = clsx(styles.checkboxXGroup, styles[`indent-${indent}`], className);

    return (
        <div className={classNames} role="group" {...rest}>
            {children}
        </div>
    );
};

CheckboxXGroup.displayName = "CheckboxXGroup";
