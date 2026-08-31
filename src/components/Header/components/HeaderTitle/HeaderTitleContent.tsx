import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderTitle.module.less";

/** Свойства компонента HeaderTitleContent. */
export interface IHeaderTitleContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Заголовок и подзаголовок. */
    children?: React.ReactNode;
}

/** Часть HeaderTitle с заголовком и подзаголовком. Занимает свободное место в строке. */
export const HeaderTitleContent = React.forwardRef<HTMLDivElement, IHeaderTitleContentProps>(
    ({ children, className, ...rest }, ref) => (
        <div
            className={clsx(styles.headerTitleContent, styles["global-HeaderTitleContent"], className)}
            {...rest}
            ref={ref}
        >
            {children}
        </div>
    ),
);

HeaderTitleContent.displayName = "HeaderTitleContent";
