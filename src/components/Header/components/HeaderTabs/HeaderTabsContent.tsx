import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderTabs.module.less";

/** Свойства компонента HeaderTabsContent. */
export interface IHeaderTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер табов. */
export const HeaderTabsContent = React.forwardRef<HTMLDivElement, IHeaderTabsContentProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <div className={clsx(styles.headerTabsContent, className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    },
);

HeaderTabsContent.displayName = "HeaderTabsContent";
