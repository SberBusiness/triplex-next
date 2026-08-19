import React from "react";
import clsx from "clsx";
import styles from "./styles/CheckboxYGroup.module.less";

/** Свойства компонента CheckboxYGroup. */
export interface ICheckboxYGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
    /**
     * Содержимое группы, обычно набор Checkbox.
     * Вертикальный отступ получают только соседние потомки-Checkbox одного размера: маргины вешаются на корневой label компонента Checkbox.
     */
    children?: React.ReactNode;
}

/**
 * Группа чекбоксов с направлением по оси Y.
 * Корневой элемент — div с фиксированной ролью group, на него указывает ref и приходят className и остальные props.
 */
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
