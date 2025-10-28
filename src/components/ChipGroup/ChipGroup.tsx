import React from "react";
import clsx from "clsx";
import styles from "./styles/ChipGroup.module.less";

export interface IChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Чипсы выводятся в одну строку со скроллом. */
    oneLine?: boolean;
}

/**
 * Компонент Chips.
 * Контейнер компонентов Chip.
 */
export const ChipGroup = React.forwardRef<HTMLDivElement, IChipGroupProps>(
    ({ children, className, oneLine, ...rest }, ref) => (
        <div
            className={clsx(styles.chipGroup, className, {
                [styles.multiLine]: !oneLine,
                [styles.oneLine]: Boolean(oneLine),
            })}
            {...rest}
            ref={ref}
            data-tx={process.env.npm_package_version}
        >
            {children}
        </div>
    ),
);

ChipGroup.displayName = "ChipGroup";
