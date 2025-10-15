import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandFooter.module.less";

export interface IIslandFooterProps extends React.HTMLProps<HTMLDivElement> {}

export const IslandFooter = React.forwardRef<HTMLDivElement, IIslandFooterProps>(({ children, ...rest }, ref) => {
    return (
        <div className={clsx(styles.islandFooter)} ref={ref} {...rest}>
            {children}
        </div>
    );
});
