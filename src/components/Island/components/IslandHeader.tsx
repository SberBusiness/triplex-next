import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandHeader.module.less";

export interface IIslandHeaderProps extends React.HTMLProps<HTMLDivElement> {}

export const IslandHeader = React.forwardRef<HTMLDivElement, IIslandHeaderProps>(({ children, ...rest }, ref) => {
    return (
        <div className={clsx(styles.islandHeader)} ref={ref} {...rest}>
            {children}
        </div>
    );
});
