import React from "react";
import clsx from "clsx";
import styles from "./styles/ChipGroup.module.less";
import { EChipSize } from "../Chip/enums";

export interface IChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Чипсы выводятся в одну строку со скроллом. */
    oneLine?: boolean;
    /** Размер компонента. */
    size?: EChipSize;
}

const getSizeCssClass = (size: EChipSize) => {
    switch (size) {
        case EChipSize.LG:
            return styles.lg;
        case EChipSize.MD:
            return styles.md;
        case EChipSize.SM:
            return styles.sm;
    }
};

/**
 * Компонент Chips.
 * Контейнер компонентов Chip.
 */
export const ChipGroup = React.forwardRef<HTMLDivElement, IChipGroupProps>(
    ({ children, className, oneLine, size = EChipSize.MD, ...rest }, ref) => (
        <div
            className={clsx(styles.chipGroup, className, {
                [styles.multiLine]: !oneLine,
                [styles.oneLine]: Boolean(oneLine),
                [getSizeCssClass(size)]: size,
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
