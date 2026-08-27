import React, { useState } from "react";
import {
    PaginationExtended,
    PaginationNavigation,
    PaginationSelect,
    ISelectExtendedFieldDefaultOption,
} from "@sberbusiness/triplex-next";

export const Extended = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = 300;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
        setPageSize(Number(option.value));
        // Смена размера страницы меняет totalPages — возвращаемся на первую, чтобы не оказаться вне диапазона.
        setPage(1);
    };

    const options: ISelectExtendedFieldDefaultOption[] = [
        { id: "0", value: "10", label: "10" },
        { id: "1", value: "20", label: "20" },
        { id: "2", value: "50", label: "50" },
        { id: "3", value: "100", label: "100" },
        { id: "4", value: "300", label: "300" },
    ];

    const selectedOption = options.find((option) => option.value === String(pageSize));

    return (
        <PaginationExtended>
            <PaginationNavigation
                currentPage={page}
                totalPages={totalPages}
                boundaryCount={1}
                siblingCount={1}
                onCurrentPageChange={setPage}
            />
            <PaginationSelect
                paginationLabel="Показать на странице:"
                value={selectedOption || options[0]}
                options={options}
                onChange={handlePageSizeChange}
                targetProps={{
                    fieldLabel: "",
                }}
            />
        </PaginationExtended>
    );
};
