import React from "react";
import clsx from "clsx";
import styles from "./Gap.module.css";

export type TGapSize = 4 | 8 | 12 | 16 | 24 | 32 | 64 | 128;

export interface IGapProps extends React.HTMLAttributes<HTMLDivElement> {
    size: TGapSize;
}

export const Gap = React.forwardRef<HTMLDivElement, IGapProps>(({ className, style, size, ...restProps }, ref) => {
    return (
        <div
            className={clsx(styles.gap, className)}
            style={{ height: `${size}px`, ...style }}
            role="presentation"
            {...restProps}
            ref={ref}
        />
    );
});

Gap.displayName = "Gap";
