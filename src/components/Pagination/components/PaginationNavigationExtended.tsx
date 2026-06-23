import React from "react";
import styles from "../styles/PaginationNavigationExtended.module.less";
import clsx from "clsx";

/** Свойства компонента PaginationNavigationExtended. */
export interface IPaginationNavigationExtendedProps extends React.HTMLAttributes<HTMLUListElement> {}

/** Контейнер-список для компоновки кастомной навигации пагинации. */
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
