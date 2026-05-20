import React, { forwardRef } from "react";
import clsx from "clsx";
import styles from "../styles/CollapsibleTreeLeafContent.module.less";

/** Свойства CollapsibleTreeLeafContent. */
export interface ICollapsibleTreeLeafContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Контейнер контента листа CollapsibleTree.
 * Рендерит произвольный контент с отступами, согласованными с заголовками веток, без интерактивных стилей.
 */
export const CollapsibleTreeLeafContent = forwardRef<HTMLDivElement, ICollapsibleTreeLeafContentProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={clsx(styles.collapsibleTreeLeafContent, className)} {...props}>
            {children}
        </div>
    ),
);

CollapsibleTreeLeafContent.displayName = "CollapsibleTreeLeafContent";
