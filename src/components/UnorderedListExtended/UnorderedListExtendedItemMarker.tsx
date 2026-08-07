import React from "react";
import clsx from "clsx";
import { IUnorderedListExtendedItemMarkerProps } from "./types";
import styles from "./styles/UnorderedListExtendedItemMarker.module.less";

/** Обертка для маркера элемента списка. */
export const UnorderedListExtendedItemMarker = React.forwardRef<HTMLSpanElement, IUnorderedListExtendedItemMarkerProps>(
    ({ children, className, ...restProps }, ref) => (
        <span
            className={clsx(styles.markerWrapper, className)}
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={ref}
        >
            {children === undefined ? <span className={styles.marker} /> : children}
        </span>
    ),
);

UnorderedListExtendedItemMarker.displayName = "UnorderedListExtendedItemMarker";
