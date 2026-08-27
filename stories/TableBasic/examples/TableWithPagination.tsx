import React, { useState } from "react";
import {
    Amount,
    EHorizontalAlign,
    MasterTable,
    Pagination,
    ISelectExtendedFieldDefaultOption,
    ITableBasicColumn,
} from "@sberbusiness/triplex-next";
import { renderCounterpartyDetails } from "../utils";

export const TableWithPagination = () => {
    const columns: ITableBasicColumn[] = [
        {
            fieldKey: "number",
            label: "Номер",
        },
        {
            fieldKey: "value",
            label: "Получатель",
        },
        {
            fieldKey: "sum",
            horizontalAlign: EHorizontalAlign.RIGHT,
            label: "Сумма",
            renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency="RUB" />,
        },
        {
            fieldKey: "status",
            label: "Статус",
        },
    ];

    const data = Array.from({ length: 300 }, (_, index) => ({
        rowData: {
            number: 1000 + index,
            status: "Исполнено",
            sum: "1220000000",
            value: renderCounterpartyDetails(
                "Платежное поручение ООО Ромашка",
                "40702 810 2 0527 5000000",
                "В том числе НДС 20%",
            ),
        },
        rowKey: `table-basic-row-${index}`,
    }));

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
        setPage(1);
        setPageSize(Number(option.value));
    };

    const options: ISelectExtendedFieldDefaultOption[] = [
        { id: "0", value: "10", label: "10" },
        { id: "1", value: "20", label: "20" },
        { id: "2", value: "50", label: "50" },
        { id: "3", value: "100", label: "100" },
    ];

    const selectedOption = options.find((option) => option.value === String(pageSize));

    const getPaginatedData = () => {
        return data.slice((page - 1) * pageSize, page * pageSize);
    };

    return (
        <MasterTable>
            <MasterTable.TableBasic
                columns={columns}
                data={getPaginatedData()}
                renderNoData={() => <div>Нет данных</div>}
            />
            <MasterTable.PaginationPanel>
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
            </MasterTable.PaginationPanel>
        </MasterTable>
    );
};
