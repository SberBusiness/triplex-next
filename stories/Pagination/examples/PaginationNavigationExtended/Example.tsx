import React from "react";
import {
    EPaginationNavigationIconDirection,
    PaginationExtended,
    PaginationNavigationButton,
    PaginationNavigationExtended,
    PaginationNavigationExtendedItem,
    PaginationPageButton,
    PaginationPageEllipsis,
} from "@sberbusiness/triplex-next";

export const Example = () => (
    <PaginationExtended aria-label="Пагинация">
        <PaginationNavigationExtended>
            <PaginationNavigationExtendedItem>
                <PaginationNavigationButton
                    direction={EPaginationNavigationIconDirection.BACK}
                    aria-label="Предыдущая страница"
                    disabled
                    onClick={() => {}}
                />
            </PaginationNavigationExtendedItem>
            <PaginationNavigationExtendedItem>
                <PaginationPageButton isCurrent aria-current="page" onClick={() => {}}>
                    1
                </PaginationPageButton>
            </PaginationNavigationExtendedItem>
            <PaginationNavigationExtendedItem>
                <PaginationPageButton onClick={() => {}}>2</PaginationPageButton>
            </PaginationNavigationExtendedItem>
            <PaginationNavigationExtendedItem>
                <PaginationPageButton onClick={() => {}}>3</PaginationPageButton>
            </PaginationNavigationExtendedItem>
            <PaginationNavigationExtendedItem>
                <PaginationPageEllipsis>...</PaginationPageEllipsis>
            </PaginationNavigationExtendedItem>
            <PaginationNavigationExtendedItem>
                <PaginationPageButton onClick={() => {}}>20</PaginationPageButton>
            </PaginationNavigationExtendedItem>
            <PaginationNavigationExtendedItem>
                <PaginationNavigationButton
                    direction={EPaginationNavigationIconDirection.NEXT}
                    aria-label="Следующая страница"
                    onClick={() => {}}
                />
            </PaginationNavigationExtendedItem>
        </PaginationNavigationExtended>
    </PaginationExtended>
);
