import React, { useCallback } from "react";
import clsx from "clsx";
import styles from "./styles/Chip.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { DataAttributes } from "@sberbusiness/triplex-next/types/CoreTypes";
import { isKey } from "../../utils/keyboard";

/** Свойства компонента Chip. */
export interface IChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix">, DataAttributes {
    /** Состояние disabled. */
    disabled?: boolean;
    /** Выбранное состояние. */
    selected?: boolean;
    /** Контент, предшествующий основному контенту, например иконка слева. */
    prefix?: React.ReactNode;
    /** Контент, следующий за основным контентом, например иконка справа. */
    postfix?: React.ReactNode;
    /** Размер Chip. */
    size?: EComponentSize;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/**
 * Предоставляет возможность произвести действие по нажатию, также отображает выбранное состояние.
 * Рекомендуется всегда располагать Chip внутри компонента ChipGroup.
 */
export const Chip = React.forwardRef<HTMLSpanElement, IChipProps>(
    (
        { children, className, disabled, postfix, prefix, selected, size = EComponentSize.MD, onKeyDown, ...rest },
        ref,
    ) => {
        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLSpanElement>) => {
                if (isKey(event.code, "SPACE")) {
                    event.preventDefault();
                }
                onKeyDown?.(event);
            },
            [onKeyDown],
        );

        return (
            <span
                className={clsx(
                    styles.chip,
                    styles.chipGroupItem,
                    sizeToClassNameMap[size],
                    {
                        [styles.disabled]: Boolean(disabled),
                        [styles.selected]: Boolean(selected),
                        [styles.withPostfix]: typeof postfix !== "undefined",
                        [styles.withPrefix]: typeof prefix !== "undefined",
                    },
                    className,
                )}
                role="button"
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
                {...rest}
                ref={ref}
            >
                {prefix ? (
                    <span
                        className={clsx(
                            styles.prefix,
                            "hoverable", // Для иконок.

                            {
                                disabled: Boolean(disabled), // Для иконок.
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
                            "hoverable", // Для иконок.
                            {
                                disabled: Boolean(disabled), // Для иконок.
                            },
                        )}
                    >
                        {postfix}
                    </span>
                ) : null}
            </span>
        );
    },
);

Chip.displayName = "Chip";
