import React from "react";
import { HeaderTabsContent } from "./HeaderTabsContent";
import { HeaderTabsControls } from "./HeaderTabsControls";
import clsx from "clsx";
import styles from "../../styles/HeaderTabs.module.less";

/** Свойства компонента HeaderTabs. */
export interface IHeaderTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Второй уровень Header. Содержит в себе табы и кнопки действий. */
export const HeaderTabs = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderTabsProps>(function HeaderTabs({ children, className, ...rest }, ref) {
        return (
            <div className={clsx(styles.headerTabs, className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Content: HeaderTabsContent,
        Controls: HeaderTabsControls,
    },
);

HeaderTabs.displayName = "HeaderTabs";
