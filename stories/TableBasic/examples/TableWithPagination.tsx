import React, { useState } from "react";
import {
    Amount,
    EFontType,
    EHorizontalAlign,
    ETextSize,
    Gap,
    MasterTable,
    Pagination,
    Text,
    ISelectExtendedFieldDefaultOption,
    ITableBasicColumn,
    ITableBasicRow,
} from "@sberbusiness/triplex-next";

const renderCounterpartyDetails = (purpose: string, account: string, tax: string) => (
    <>
        <div>
            {purpose}
            <br />
            {account}
        </div>
        <Gap size={4} />
        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
            {tax}
        </Text>
    </>
);

// Колонки и данные собираются вне рендера, чтобы таблица не обновляла контекст MasterTable на каждый рендер.
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

const data: ITableBasicRow[] = Array.from({ length: 300 }, (_, index) => ({
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

const options: ISelectExtendedFieldDefaultOption[] = [
    { id: "0", value: "10", label: "10" },
    { id: "1", value: "20", label: "20" },
    { id: "2", value: "50", label: "50" },
    { id: "3", value: "100", label: "100" },
];

export const TableWithPagination = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
        setPage(1);
        setPageSize(Number(option.value));
    };

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
