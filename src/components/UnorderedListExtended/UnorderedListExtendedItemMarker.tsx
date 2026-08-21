import React from "react";
import clsx from "clsx";
import { IUnorderedListExtendedItemMarkerProps } from "./types";
import styles from "./styles/UnorderedListExtendedItemMarker.module.less";

/**
 * Обёртка для маркера элемента списка. Без children рисует маркер-точку.
 * Высота обёртки равна строке текста элемента, поэтому маркер центрируется по первой строке.
 */
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
