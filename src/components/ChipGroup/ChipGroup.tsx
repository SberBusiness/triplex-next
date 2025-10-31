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

const getSizeCssClass = (size: EChipGroupSize): string => {
    switch (size) {
        case EChipGroupSize.LG:
            return styles.lg;
        case EChipGroupSize.MD:
            return styles.md;
        case EChipGroupSize.SM:
            return styles.sm;
    }
};

/**
 * Компонент Chips.
 * Контейнер компонентов Chip.
 */
export const ChipGroup = React.forwardRef<HTMLDivElement, IChipGroupProps>(
    ({ children, className, oneLine, size = EChipGroupSize.MD, ...rest }, ref) => (
        <div
            className={clsx(
                styles.chipGroup,
                className,
                {
                    [styles.multiLine]: !oneLine,
                    [styles.oneLine]: Boolean(oneLine),
                },
                getSizeCssClass(size),
            )}
            {...rest}
            ref={ref}
            data-tx={process.env.npm_package_version}
        >
            {children}
        </div>
    ),
);

ChipGroup.displayName = "ChipGroup";
