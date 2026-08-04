import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandFooter.module.less";

/** Свойства компонента IslandFooter. */
export interface IIslandFooterProps extends React.HTMLProps<HTMLDivElement> {}

/** Подвал острова. Отступ от предыдущего блока задаётся размером родительского Island. */
export const IslandFooter = React.forwardRef<HTMLDivElement, IIslandFooterProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <div className={clsx(styles.islandFooter, className)} ref={ref} {...rest}>
                {children}
            </div>
        );
    },
);

IslandFooter.displayName = "IslandFooter";
