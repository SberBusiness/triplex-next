import React, { useState } from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetWrapper.module.less";
import { IslandWidgetLayoutContext } from "../IslandWidgetLayoutContext";

/** Свойства компонента IslandWidgetWrapper. */
export interface IIslandWidgetWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Общая обёртка виджета и его дополнительного подвала.
 * Нужна только когда используется IslandWidget.ExtraFooter: через неё виджет узнаёт, что подвал раскрыт, и рисует тень.
 */
export const IslandWidgetWrapper = React.forwardRef<HTMLDivElement, IIslandWidgetWrapperProps>(
    ({ children, className, ...rest }, ref) => {
        const [hasExtraFooter, setHasExtraFooter] = useState(false);

        return (
            <IslandWidgetLayoutContext.Provider value={{ hasExtraFooter, setHasExtraFooter }}>
                <div className={clsx(styles.islandWidgetWrapper, className)} {...rest} ref={ref}>
                    {children}
                </div>
            </IslandWidgetLayoutContext.Provider>
        );
    },
);

IslandWidgetWrapper.displayName = "IslandWidgetWrapper";
