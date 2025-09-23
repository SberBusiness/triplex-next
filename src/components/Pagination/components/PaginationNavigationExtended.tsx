import React from "react";
import styles from "../styles/PaginationNavigationExtended.module.less";
import clsx from "clsx";

/* Свойства компонента PaginationNavigation. */
export interface IPaginationNavigationExtendedProps extends React.HTMLAttributes<HTMLUListElement> {}

/* Контейнер для компоновки кастомной навигации. */
export const PaginationNavigationExtended = React.forwardRef<HTMLUListElement, IPaginationNavigationExtendedProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <ul className={clsx(styles.paginationNavigationExtended, className)} {...rest} ref={ref}>
                {children}
            </ul>
        );
    },
);

PaginationNavigationExtended.displayName = "PaginationNavigationExtended";
