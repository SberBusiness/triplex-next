import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandBody.module.less";

export interface IIslandBodyProps extends React.HTMLProps<HTMLDivElement> {}

export const IslandBody = React.forwardRef<HTMLDivElement, IIslandBodyProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <div className={clsx(styles.islandBody, className)} ref={ref} {...rest}>
                {children}
            </div>
        );
    },
);
