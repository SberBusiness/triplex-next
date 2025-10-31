import React from "react";
import clsx from "clsx";
import styles from "./styles/ChipGroup.module.less";
import { EChipGroupSize } from "./enums";

export interface IChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Чипсы выводятся в одну строку со скроллом. */
    oneLine?: boolean;
    /** Размер компонента. */
    size?: EChipGroupSize;
}

export const sizeToClassNameMap = {
    [EChipGroupSize.SM]: styles.sm,
    [EChipGroupSize.MD]: styles.md,
    [EChipGroupSize.LG]: styles.lg,
};

/**
 * Компонент ChipGroup.
 * Контейнер компонентов Chip.
 */
export const ChipGroup = React.forwardRef<HTMLDivElement, IChipGroupProps>(
    ({ children, className, oneLine, size = EChipGroupSize.MD, ...rest }, ref) => (
        <div
            className={clsx(styles.chipGroup, sizeToClassNameMap[size], className, {
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
