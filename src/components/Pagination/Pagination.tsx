import React from "react";
import { IPaginationExtendedProps, PaginationExtended } from "./components/PaginationExtended";
import { IPaginationSelectProps, PaginationSelect } from "./components/PaginationSelect";
import { IPaginationNavigationProps, PaginationNavigation } from "./components/PaginationNavigation";

interface IPaginationProps extends IPaginationExtendedProps {
    paginationSelectProps: IPaginationSelectProps;
    paginationNavigationProps: IPaginationNavigationProps;
}

export const Pagination = React.forwardRef<HTMLSpanElement, IPaginationProps>(
    ({ paginationNavigationProps, paginationSelectProps, ...rest }, ref) => {
        return (
            <PaginationExtended {...rest} ref={ref}>
                <PaginationSelect {...paginationSelectProps} />
                {paginationNavigationProps.totalPages > 1 && <PaginationNavigation {...paginationNavigationProps} />}
            </PaginationExtended>
        );
    },
);

Pagination.displayName = "Pagination";
