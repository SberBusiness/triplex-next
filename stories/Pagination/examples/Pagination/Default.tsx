import React, { useState } from "react";
import { Pagination } from "@sberbusiness/triplex-next";

export const Default = () => {
    const totalItems = 50;
    const pageSize = 10;
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    return <Pagination paginationNavigationProps={{ currentPage: page, totalPages, onCurrentPageChange: setPage }} />;
};
