import React from "react";
import { EPaginationNavigationIconDirection } from "../enums";
import { IPaginationNavigationButtonProps, PaginationNavigationButton } from "./PaginationNavigationButton";
import { PaginationUtils, PAGINATION_ELLIPSIS_VALUE } from "../utils/paginationUtils";
import { PaginationPageEllipsis } from "./PaginationPageEllipsis";
import { PaginationPageButton } from "./PaginationPageButton";
import { PaginationNavigationExtended } from "./PaginationNavigationExtended";
import { PaginationNavigationExtendedItem } from "./PaginationNavigationExtendedItem";

/* Свойства компонента PaginationNavigation. */
export interface IPaginationNavigationProps extends React.HTMLAttributes<HTMLUListElement> {
    /* Свойства кнопки "Следующая страница". */
    buttonNextProps?: Omit<IPaginationNavigationButtonProps, "direction" | "children">;
    /* Свойства кнопки "Предыдущая страница". */
    buttonPrevProps?: Omit<IPaginationNavigationButtonProps, "direction" | "children">;
    /* Номер текущей страницы. */
    currentPage: number;
    /* Функция при смене страницы. */
    onCurrentPageChange: (currentPage: number) => void;
    /* Общее число страниц. */
    totalPages: number;
    /* Количество всегда видимых страниц в начале и в конце. */
    boundaryCount?: number;
    /* Количество всегда видимых страниц по краям текущей страницы. */
    siblingCount?: number;
}

/* Контейнер для компоновки кастомной навигации. */
export const PaginationNavigation = React.forwardRef<HTMLUListElement, IPaginationNavigationProps>(
    (
        {
            buttonNextProps,
            buttonPrevProps,
            currentPage,
            onCurrentPageChange,
            totalPages,
            boundaryCount = 0,
            siblingCount = 0,
            ...rest
        },
        ref,
    ) => {
        const pageNumbers = PaginationUtils.createPagesArray({
            boundaryCount,
            currentPage,
            siblingCount,
            totalPages,
        });

        const isFirstPage = currentPage === 1;
        const isLastPage = currentPage === totalPages;

        const handlePrevClick = () => {
            onCurrentPageChange(currentPage - 1);
        };

        const handleClick = (pageNumber: number) => () => {
            onCurrentPageChange(pageNumber);
        };

        const handleNextClick = () => {
            onCurrentPageChange(currentPage + 1);
        };

        const renderPages = (page: number, index: number) => {
            switch (page) {
                case PAGINATION_ELLIPSIS_VALUE:
                    return (
                        <PaginationNavigationExtendedItem key={index}>
                            <PaginationPageEllipsis>...</PaginationPageEllipsis>
                        </PaginationNavigationExtendedItem>
                    );
                default: {
                    const isCurrent = page === currentPage;

                    return (
                        <PaginationNavigationExtendedItem key={index}>
                            <PaginationPageButton isCurrent={isCurrent} onClick={handleClick(page)}>
                                {page}
                            </PaginationPageButton>
                        </PaginationNavigationExtendedItem>
                    );
                }
            }
        };
        return (
            <PaginationNavigationExtended {...rest} ref={ref}>
                <PaginationNavigationExtendedItem>
                    <PaginationNavigationButton
                        direction={EPaginationNavigationIconDirection.BACK}
                        {...buttonPrevProps}
                        onClick={handlePrevClick}
                        disabled={isFirstPage || buttonPrevProps?.disabled}
                    />
                </PaginationNavigationExtendedItem>

                {pageNumbers.map((page, index) => renderPages(page, index))}

                <PaginationNavigationExtendedItem>
                    <PaginationNavigationButton
                        direction={EPaginationNavigationIconDirection.NEXT}
                        {...buttonNextProps}
                        onClick={handleNextClick}
                        disabled={isLastPage || buttonNextProps?.disabled}
                    />
                </PaginationNavigationExtendedItem>
            </PaginationNavigationExtended>
        );
    },
);

PaginationNavigation.displayName = "PaginationNavigation";
