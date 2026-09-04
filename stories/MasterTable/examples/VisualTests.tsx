import React from "react";
import {
    EHorizontalAlign,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
    Pagination,
} from "@sberbusiness/triplex-next";

const columns: ITableBasicColumn[] = [
    { fieldKey: "docNumber", label: "Номер", width: "15%" },
    { fieldKey: "recipient", label: "Получатель", width: "45%" },
    { fieldKey: "status", label: "Статус", width: "20%" },
    { fieldKey: "sum", label: "Сумма", width: "20%", horizontalAlign: EHorizontalAlign.RIGHT },
];

const data: ITableBasicRow[] = [
    {
        rowKey: "1350",
        rowData: { docNumber: "1350", recipient: "ООО Ромашка", status: "Создан", sum: "12 500,00 ₽" },
        selected: true,
    },
    {
        rowKey: "1351",
        rowData: { docNumber: "1351", recipient: "ИП Иванов Иван Иванович", status: "Подписан", sum: "8 300,00 ₽" },
    },
];

const pageSizeOptions = [
    { id: "10", value: "10", label: "10" },
    { id: "20", value: "20", label: "20" },
];

/**
 * Состояния, которых нет в документационных стори:
 * загрузка поверх пустой таблицы, выделенная строка и заблокированная загрузкой пагинация.
 */
export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        <MasterTable loading>
            <MasterTable.TableBasic columns={columns} data={[]} renderNoData={() => <div>Нет данных</div>} />
        </MasterTable>

        <MasterTable>
            <MasterTable.TableBasic columns={columns} data={data} renderNoData={() => <div>Нет данных</div>} />
        </MasterTable>

        <MasterTable loading>
            <MasterTable.PaginationPanel>
                <Pagination
                    paginationSelectProps={{
                        paginationLabel: "Показывать по",
                        options: pageSizeOptions,
                        value: pageSizeOptions[0],
                        onChange: () => {},
                    }}
                    paginationNavigationProps={{
                        currentPage: 2,
                        totalPages: 5,
                        onCurrentPageChange: () => {},
                    }}
                />
            </MasterTable.PaginationPanel>
        </MasterTable>
    </div>
);
