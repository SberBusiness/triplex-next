import React from "react";
import clsx from "clsx";
import { IBadgeContentProps } from "../types";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import styles from "./styles/BadgeContent.module.less";

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Обёртка содержимого Badge. Внутренний компонент, из barrel не экспортируется.
 * Задаёт горизонтальные отступы по размеру и снимает их со стороны, где стоит prefix или postfix.
 * */
export const BadgeContent: React.FC<IBadgeContentProps> = ({
    children,
    size,
    noPaddingLeft,
    noPaddingRight,
    className,
    ...restProps
}) => (
    <span
        className={clsx(
            styles.badgeContent,
            SIZE_TO_CLASS_NAME_MAP[size],
            { [styles.noPaddingLeft]: noPaddingLeft, [styles.noPaddingRight]: noPaddingRight },
            className,
        )}
        {...restProps}
    >
        {children}
    </span>
);

BadgeContent.displayName = "BadgeContent";
