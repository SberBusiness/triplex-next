import React from "react";
import { IPaginationExtendedProps, PaginationExtended } from "./components/PaginationExtended";
import { IPaginationSelectProps, PaginationSelect } from "./components/PaginationSelect";
import { IPaginationNavigationProps, PaginationNavigation } from "./components/PaginationNavigation";

/** Свойства компонента Pagination. */
export interface IPaginationProps extends IPaginationExtendedProps {
    /** Свойства компонента PaginationSelect. */
    paginationSelectProps?: IPaginationSelectProps;
    /** Свойства компонента PaginationNavigation. */
    paginationNavigationProps: IPaginationNavigationProps;
}

/** Пагинация: выбор количества элементов на странице (PaginationSelect) и навигация по страницам (PaginationNavigation). */
export const Pagination = React.forwardRef<HTMLSpanElement, IPaginationProps>(
    ({ paginationNavigationProps, paginationSelectProps, ...rest }, ref) => {
        return (
            <PaginationExtended {...rest} ref={ref}>
                {paginationSelectProps && <PaginationSelect {...paginationSelectProps} />}
                <PaginationNavigation {...paginationNavigationProps} />
            </PaginationExtended>
        );
    },
);

Pagination.displayName = "Pagination";
