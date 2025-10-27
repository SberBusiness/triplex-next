import clsx from "clsx";
import React from "react";
import styles from "./styles/Chip.module.less";
import { EChipSize } from "./enums";

/** Свойства компонента Chip. */
export interface IChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix"> {
    /** Состояние disabled. */
    disabled?: boolean;
    /** Выбранное состояние. */
    selected?: boolean;
    /** Контент, предшествующий основному контенту, например иконка слева. */
    prefix?: React.ReactNode;
    /** Контент, следующий за основным контентом, например иконка справа. */
    postfix?: React.ReactNode;
    /** Размер Chip. */
    size?: EChipSize;
}

const getSizeCssClass = (size: EChipSize) => {
    switch (size) {
        case EChipSize.LG:
            return styles["size-lg"];
        case EChipSize.MD:
            return styles["size-md"];
        case EChipSize.SM:
            return styles["size-sm"];
    }
};

/**
 * Предоставляет возможность произвести действие по нажатию, также отображает выбранное состояние.
 * Рекомендуется всегда располагать Chip внутри компонента ChipGroup.
 */
export const Chip = React.forwardRef<HTMLSpanElement, IChipProps>(
    ({ children, className, disabled, postfix, prefix, selected, size = EChipSize.MD, ...rest }, ref) => (
        <span
            className={clsx(
                styles.chip,
                styles.chipGroupItem,
                {
                    [styles.disabled]: Boolean(disabled),
                    [styles.selected]: Boolean(selected),
                    [styles.withPostfix]: typeof postfix !== "undefined",
                    [styles.withPrefix]: typeof prefix !== "undefined",
                    [getSizeCssClass(size)]: size,
                },
                className,
            )}
            role="button"
            tabIndex={disabled ? -1 : 0}
            {...rest}
            ref={ref}
        >
            {prefix ? (
                <span
                    className={clsx(
                        styles.prefix,
                        // Для иконок.
                        "hoverable",
                        {
                            disabled: Boolean(disabled),
                        },
                    )}
                >
                    {prefix}
                </span>
            ) : null}

            <span className={styles.content}>{children}</span>

            {postfix ? (
                <span
                    className={clsx(
                        styles.postfix,
                        // Для иконок.
                        "hoverable",
                        {
                            // Для иконок.
                            disabled: Boolean(disabled),
                        },
                    )}
                >
                    {postfix}
                </span>
            ) : null}
        </span>
    ),
);

Chip.displayName = "Chip";
