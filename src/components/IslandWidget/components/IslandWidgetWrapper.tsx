import React, { useState } from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetWrapper.module.less";
import { IslandWidgetContext } from "../IslandWidgetContext";

export interface IIslandWidgetWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetWrapper = React.forwardRef<HTMLDivElement, IIslandWidgetWrapperProps>(
    ({ children, className, ...rest }, ref) => {
        const [hasExtraFooter, setHasExtraFooter] = useState(false);

        return (
            <IslandWidgetContext.Provider value={{ hasExtraFooter, setHasExtraFooter }}>
                <div className={clsx(styles.islandWidgetWrapper, className)} {...rest} ref={ref}>
                    {children}
                </div>
            </IslandWidgetContext.Provider>
        );
    },
);

IslandWidgetWrapper.displayName = "IslandWidgetWrapper";
