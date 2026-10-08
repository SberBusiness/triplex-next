import React, { useState } from "react";
import { PaginationExtended, PaginationNavigation } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <PaginationExtended aria-label="Навигация по страницам">
            <PaginationNavigation
                currentPage={currentPage}
                totalPages={5}
                onCurrentPageChange={setCurrentPage}
                buttonPrevProps={{ "aria-label": "Предыдущая страница" }}
                buttonNextProps={{ "aria-label": "Следующая страница" }}
            />
        </PaginationExtended>
    );
};
