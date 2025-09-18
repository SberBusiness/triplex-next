import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderTabs.module.less";

/** Свойства компонента HeaderTabsControls. */
export interface IHeaderTabsControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с кнопками действий HeaderTabs. */
export const HeaderTabsControls = React.forwardRef<HTMLDivElement, IHeaderTabsControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.headerTabsControls, className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderTabsControls.displayName = "HeaderTabsControls";
