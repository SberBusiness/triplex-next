import React from "react";
import { TIndentSize } from "@sberbusiness/triplex-next/consts/IndentConst";
import styles from "./styles/RadioXGroup.module.less";
import clsx from "clsx";

/** Свойства компонента RadioXGroup. */
export interface IRadioXGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер отступа. */
    indent?: TIndentSize;
}

/** Группа радио-кнопок с направлением по оси X. */
export const RadioXGroup: React.FC<IRadioXGroupProps> = (props) => {
    const { children, className, indent = 12, ...rest } = props;
    const classNames = clsx(styles.radioXGroup, styles[`indent-${indent}`], className);

    return (
        <div className={classNames} role="radiogroup" {...rest}>
            {children}
        </div>
    );
};

RadioXGroup.displayName = "RadioXGroup";
