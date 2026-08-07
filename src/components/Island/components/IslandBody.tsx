import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandBody.module.less";

/** Свойства компонента IslandBody. */
export interface IIslandBodyProps extends React.HTMLProps<HTMLDivElement> {}

/** Основное содержимое острова. Отступы до соседних блоков задаются размером родительского Island. */
export const IslandBody = React.forwardRef<HTMLDivElement, IIslandBodyProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <div className={clsx(styles.islandBody, className)} ref={ref} {...rest}>
                {children}
            </div>
        );
    },
);

IslandBody.displayName = "IslandBody";
