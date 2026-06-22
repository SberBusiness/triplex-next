import React, { useState } from "react";
import { Pagination, ISelectExtendedFieldDefaultOption } from "@sberbusiness/triplex-next";

export const WithSelectField = () => {
    const [page, setPage] = useState(7);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = 300;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
        setPageSize(Number(option.value));
    };

    const options: ISelectExtendedFieldDefaultOption[] = [
        { id: "0", value: "10", label: "10" },
        { id: "1", value: "20", label: "20" },
        { id: "2", value: "50", label: "50" },
        { id: "3", value: "100", label: "100" },
    ];

    const selectedOption = options.find((option) => option.value === String(pageSize));

    return (
        <Pagination
            paginationNavigationProps={{
                currentPage: page,
                totalPages,
                boundaryCount: 1,
                siblingCount: 1,
                onCurrentPageChange: setPage,
            }}
            paginationSelectProps={{
                paginationLabel: "Показать на странице:",
                options,
                value: selectedOption || options[0],
                onChange: handlePageSizeChange,
                targetProps: {
                    fieldLabel: "",
                },
            }}
        />
    );
};
