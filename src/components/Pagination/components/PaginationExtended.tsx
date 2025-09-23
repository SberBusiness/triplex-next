import clsx from "clsx";
import React from "react";
import styles from "../styles/Pagination.module.less";

/* Свойства компонента PaginationExtended. */
export interface IPaginationExtendedProps extends React.HTMLAttributes<HTMLElement> {}

/* Контейнер для компоновки кастомной пагинации. */
export const PaginationExtended = React.forwardRef<HTMLElement, IPaginationExtendedProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <nav
                className={clsx(styles.paginationExtended, className)}
                data-tx={process.env.npm_package_version}
                {...rest}
                ref={ref}
            >
                {children}
            </nav>
        );
    },
);

PaginationExtended.displayName = "PaginationExtended";
