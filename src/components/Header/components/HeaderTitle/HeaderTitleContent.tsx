import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderTitle.module.less";

/** Свойства компонента HeaderTitleContent. */
export interface IHeaderTitleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Часть HeaderTitle с заголовком и подзаголовком. */
export const HeaderTitleContent = React.forwardRef<HTMLDivElement, IHeaderTitleContentProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <div
                className={clsx(className, styles.headerTitleContent, styles["global-HeaderTitleContent"])}
                {...rest}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);

HeaderTitleContent.displayName = "HeaderTitleContent";
