import React from "react";
import clsx from "clsx";
import { TIndentSize } from "@sberbusiness/triplex-next/consts/IndentConst";
import styles from "./styles/RadioXGroup.module.less";

/** Свойства компонента RadioXGroup. */
export interface IRadioXGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Радио-кнопки группы. */
    children?: React.ReactNode;
    /** Размер горизонтального отступа между радио-кнопками. По умолчанию 12. */
    indent?: TIndentSize;
}

/** Группа радио-кнопок с направлением по оси X. */
export const RadioXGroup = React.forwardRef<HTMLDivElement, IRadioXGroupProps>((props, ref) => {
    const { children, className, indent = 12, ...rest } = props;
    const classNames = clsx(styles.radioXGroup, styles[`indent-${indent}`], className);

    return (
        <div className={classNames} role="radiogroup" {...rest} ref={ref}>
            {children}
        </div>
    );
});

RadioXGroup.displayName = "RadioXGroup";
