import React from "react";

/* Свойства компонента PaginationNavigation. */
interface IPaginationNavigationExtendedProps extends React.HTMLAttributes<HTMLLIElement> {}

/* Контейнер для компоновки кастомной навигации. */
export const PaginationNavigationExtendedItem = React.forwardRef<HTMLLIElement, IPaginationNavigationExtendedProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <li className={className} {...rest} ref={ref}>
                {children}
            </li>
        );
    },
);

PaginationNavigationExtendedItem.displayName = "PaginationNavigationExtendedItem";
