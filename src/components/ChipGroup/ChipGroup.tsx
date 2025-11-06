import React from "react";
import clsx from "clsx";
import styles from "./styles/ChipGroup.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

export interface IChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Чипсы выводятся в одну строку со скроллом. */
    oneLine?: boolean;
    /** Размер компонента. */
    size?: EComponentSize;
}

/**
 * Компонент ChipGroup.
 * Контейнер компонентов Chip.
 */
export const ChipGroup = React.forwardRef<HTMLDivElement, IChipGroupProps>(
    ({ children, className, oneLine, size = EComponentSize.MD, ...rest }, ref) => {
        const sizeToClassNameMap = createSizeToClassNameMap(styles);

        return (
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
        );
    },
);

ChipGroup.displayName = "ChipGroup";
