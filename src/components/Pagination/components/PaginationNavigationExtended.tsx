import React from "react";
import clsx from "clsx";
import styles from "../styles/PaginationNavigationExtended.module.less";

/**
 * Свойства компонента PaginationNavigationExtended: стандартные HTML-атрибуты списка.
 * children задаёт элементы списка, className добавляется к классу корневого ul.
 */
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
