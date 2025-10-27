import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

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
}

/**
 * Предоставляет возможность произвести действие по нажатию, также отображает выбранное состояние.
 * Рекомендуется всегда располагать Chip внутри компонента ChipGroup.
 */
export const Chip = React.forwardRef<HTMLSpanElement, IChipProps>(
    ({ children, className, disabled, postfix, prefix, selected, ...rest }, ref) => (
        <span
            className={classnames(
                "cssClass[chip]",
                "cssClass[chipGroupItem]",
                {
                    "cssClass[disabled]": Boolean(disabled),
                    "cssClass[selected]": Boolean(selected),
                    "cssClass[withPostfix]": typeof postfix !== "undefined",
                    "cssClass[withPrefix]": typeof prefix !== "undefined",
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
                    className={classnames(
                        "cssClass[prefix]",
                        // Для иконок.
                        "hoverable",
                        {
                            // Для иконок.
                            disabled: Boolean(disabled),
                        },
                    )}
                >
                    {prefix}
                </span>
            ) : null}

            <span className="cssClass[content]">{children}</span>

            {postfix ? (
                <span
                    className={classnames(
                        "cssClass[postfix]",
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
