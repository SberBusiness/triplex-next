import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

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
            className={classnames("cssClass[chipGroup]", className, {
                "cssClass[multiLine]": !oneLine,
                "cssClass[oneLine]": Boolean(oneLine),
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
