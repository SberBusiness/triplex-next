import React, { useState } from "react";
import {
    Amount,
    Col,
    EComponentSize,
    EHorizontalAlign,
    MasterTable,
    Pagination,
    Row,
    TextField,
    ISelectExtendedFieldDefaultOption,
    ITableBasicColumn,
    ITableBasicRow,
} from "@sberbusiness/triplex-next";
import { renderCounterpartyDetails, renderNoData } from "../utils";

const filtersAndPaginationRows = Array.from({ length: 30 }, (_, index) => ({
    docNumber: String(1000 + index),
    recipient: index % 2 === 0 ? "ООО Ромашка" : "ИП Иванов Иван Иванович",
    status: ["Создан", "Подписан", "Оплачен"][index % 3],
    sum: String((index + 1) * 10000),
}));

export const TableWithPaginationLoading = () => {
    const [docNumberFilter, setDocNumberFilter] = useState("");
    const [recipientFilter, setRecipientFilter] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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

    const isFiltered = docNumberFilter !== "" || recipientFilter !== "";

    const filteredRows = filtersAndPaginationRows.filter(
        (row) =>
            row.docNumber.includes(docNumberFilter) &&
            row.recipient.toLowerCase().includes(recipientFilter.toLowerCase()),
    );

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    // Фильтр мог сократить выборку сильнее, чем текущая страница — страховка от выхода за диапазон.
    const currentPage = Math.min(page, totalPages);

    const data: ITableBasicRow[] = filteredRows
        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .map((row) => ({
            rowData: {
                number: row.docNumber,
                status: row.status,
                sum: row.sum,
                value: renderCounterpartyDetails(
                    `Платежное поручение ${row.recipient}`,
                    "40702 810 2 0527 5000000",
                    "В том числе НДС 20%",
                ),
            },
            rowKey: `table-with-filters-row-${row.docNumber}`,
        }));

    const pageSizeOptions: ISelectExtendedFieldDefaultOption[] = [
        { id: "0", value: "10", label: "10" },
        { id: "1", value: "20", label: "20" },
        { id: "2", value: "50", label: "50" },
    ];

    const handleChangeDocNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDocNumberFilter(event.target.value);
        setPage(1);
    };

    const handleChangeRecipient = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRecipientFilter(event.target.value);
        setPage(1);
    };

    const handlePageSizeChange = (option: ISelectExtendedFieldDefaultOption) => {
        setPageSize(Number(option.value));
        setPage(1);
    };

    return (
        <MasterTable loading>
            <MasterTable.FilterPanel>
                <Row paddingBottom={false}>
                    <Col size={6}>
                        <TextField
                            size={EComponentSize.MD}
                            inputProps={{
                                value: docNumberFilter,
                                onChange: handleChangeDocNumber,
                                placeholder: "Введите номер документа",
                            }}
                            label="Номер документа"
                        />
                    </Col>
                    <Col size={6}>
                        <TextField
                            size={EComponentSize.MD}
                            inputProps={{
                                value: recipientFilter,
                                onChange: handleChangeRecipient,
                                placeholder: "Введите получателя",
                            }}
                            label="Получатель"
                        />
                    </Col>
                </Row>
            </MasterTable.FilterPanel>
            <MasterTable.TableBasic columns={columns} data={data} renderNoData={() => renderNoData(isFiltered)} />
            <MasterTable.PaginationPanel>
                <Pagination
                    paginationNavigationProps={{
                        currentPage,
                        totalPages,
                        boundaryCount: 1,
                        siblingCount: 1,
                        onCurrentPageChange: setPage,
                    }}
                    paginationSelectProps={{
                        paginationLabel: "Показать на странице:",
                        options: pageSizeOptions,
                        value:
                            pageSizeOptions.find((option) => option.value === String(pageSize)) || pageSizeOptions[0],
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
