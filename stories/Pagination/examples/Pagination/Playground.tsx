import React, { useState } from "react";
import { action } from "storybook/actions";
import { Pagination, ISelectExtendedFieldDefaultOption } from "@sberbusiness/triplex-next";

export interface IPaginationPlaygroundProps {
    currentPage?: number;
    totalPages?: number;
    boundaryCount?: number;
    siblingCount?: number;
    hidePaginationSelect?: boolean;
    paginationLabel?: string;
    className?: string;
}

export const Playground = (props: IPaginationPlaygroundProps) => {
    const [page, setPage] = useState(props.currentPage ?? 1);
    const [pageSize, setPageSize] = useState(10);

    const totalPages = props.totalPages && props.totalPages <= 200 ? props.totalPages : 200;

    // Синхронизация внутреннего состояния со значением контрола currentPage — корректировка
    // во время рендера (рекомендованная React альтернатива useEffect + setState).
    const [prevCurrentPage, setPrevCurrentPage] = useState(props.currentPage);
    if (prevCurrentPage !== props.currentPage) {
        setPrevCurrentPage(props.currentPage);
        setPage(props.currentPage ?? 1);
    }

    // Если totalPages уменьшилось ниже текущей страницы — показываем первую (без записи в state).
    const currentPage = page > totalPages ? 1 : page;

    const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
        setPageSize(Number(option.value));
        action("onPageSizeChange")(option);
    };

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
        action("onCurrentPageChange")(nextPage);
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
            className={props.className}
            paginationNavigationProps={{
                currentPage,
                totalPages,
                boundaryCount: props.boundaryCount ?? 0,
                siblingCount: props.siblingCount ?? 0,
                onCurrentPageChange: handlePageChange,
            }}
            paginationSelectProps={
                props.hidePaginationSelect
                    ? undefined
                    : {
                          paginationLabel: props.paginationLabel ?? "Показать на странице:",
                          options,
                          value: selectedOption || options[0],
                          onChange: handlePageSizeChange,
                          targetProps: {
                              fieldLabel: "",
                          },
                      }
            }
        />
    );
};
