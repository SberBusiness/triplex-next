import React from "react";

/** Свойства компонента PaginationNavigationExtendedItem. */
interface IPaginationNavigationExtendedItemProps extends React.HTMLAttributes<HTMLLIElement> {}

/** Элемент списка навигации пагинации (обёртка для кнопки страницы или многоточия). */
export const PaginationNavigationExtendedItem = React.forwardRef<HTMLLIElement, IPaginationNavigationExtendedItemProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <li className={className} {...rest} ref={ref}>
                {children}
            </li>
        );
    },
);

PaginationNavigationExtendedItem.displayName = "PaginationNavigationExtendedItem";
