import React from "react";
import clsx from "clsx";
import { TIndentSize } from "../../consts/IndentConst";
import styles from "./styles/CheckboxXGroup.module.less";

/** Свойства компонента CheckboxXGroup. */
export interface ICheckboxXGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
    /** Содержимое группы, обычно набор Checkbox. */
    children?: React.ReactNode;
    /**
     * Размер горизонтального отступа между чекбоксами, в пикселях. По умолчанию 12.
     * Отступ получают только потомки-Checkbox: маргины вешаются на корневой label компонента Checkbox.
     */
    indent?: TIndentSize;
}

/**
 * Группа чекбоксов с направлением по оси X.
 * Корневой элемент — div с фиксированной ролью group, на него указывает ref и приходят className и остальные props.
 */
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
