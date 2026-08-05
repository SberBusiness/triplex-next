import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandHeader.module.less";

/** Свойства компонента IslandHeader. */
export interface IIslandHeaderProps extends React.HTMLProps<HTMLDivElement> {}

/** Шапка острова. Отступ до следующего блока задаётся размером родительского Island. */
export const IslandHeader = React.forwardRef<HTMLDivElement, IIslandHeaderProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <div className={clsx(styles.islandHeader, className)} ref={ref} {...rest}>
                {children}
            </div>
        );
    },
);

IslandHeader.displayName = "IslandHeader";
