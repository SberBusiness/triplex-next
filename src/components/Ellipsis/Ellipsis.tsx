import React from "react";
import clsx from "clsx";
import styles from "./styles/Ellipsis.module.less";

interface IEllipsisStyle extends React.CSSProperties {
    "--triplex-next-runtime-Ellipsis-Root_LineClamp": number;
}

/** Свойства компонента Ellipsis. */
export interface IEllipsisProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Количество строк, после которых происходит сворачивание в многоточие. */
    maxLines: number;
}

/**
 * Сворачивает в многоточие текст, не поместившийся в заданное количество строк.
 * Обрезка построена на CSS `line-clamp`, поэтому паддинги компоненту задавать нельзя:
 * они попадают внутрь обрезаемой области и искажают число видимых строк.
 */
export const Ellipsis = React.forwardRef<HTMLDivElement, IEllipsisProps>(
    ({ children, maxLines, className, style, ...htmlDivAttributes }, ref) => {
        // Число строк уходит в CSS-переменную: line-clamp нельзя задать классом для произвольного значения.
        const ellipsisStyle: IEllipsisStyle = {
            ...style,
            "--triplex-next-runtime-Ellipsis-Root_LineClamp": maxLines,
        };

        return (
            <div
                className={clsx(styles.ellipsisLineClamp, { [styles.oneLine]: maxLines === 1 }, className)}
                style={ellipsisStyle}
                {...htmlDivAttributes}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);

Ellipsis.displayName = "Ellipsis";
