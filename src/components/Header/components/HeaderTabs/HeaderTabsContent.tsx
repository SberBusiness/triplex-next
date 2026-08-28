import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderTabs.module.less";

/** Свойства компонента HeaderTabsContent. */
export interface IHeaderTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Табы. Обычно компонент Tabs. */
    children?: React.ReactNode;
}

/** Контейнер табов. Занимает свободное место в строке HeaderTabs. */
export const HeaderTabsContent = React.forwardRef<HTMLDivElement, IHeaderTabsContentProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.headerTabsContent, className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderTabsContent.displayName = "HeaderTabsContent";
