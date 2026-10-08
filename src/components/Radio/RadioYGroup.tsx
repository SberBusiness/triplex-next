import React from "react";
import clsx from "clsx";
import styles from "./styles/RadioYGroup.module.less";

/** Свойства компонента RadioYGroup. */
export interface IRadioYGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое группы, обычно набор Radio с одинаковым name. */
    children?: React.ReactNode;
}

/**
 * Группа радио-кнопок с направлением по оси Y.
 * Корневой div получает ref, className и остальные HTML-атрибуты.
 * По умолчанию имеет роль radiogroup, которую можно переопределить через role.
 */
export const RadioYGroup = React.forwardRef<HTMLDivElement, IRadioYGroupProps>((props, ref) => {
    const { children, className, ...rest } = props;
    const classNames = clsx(styles.radioYGroup, className);

    return (
        <div className={classNames} role="radiogroup" {...rest} ref={ref}>
            {children}
        </div>
    );
});

RadioYGroup.displayName = "RadioYGroup";
