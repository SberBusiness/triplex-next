import React from "react";
import { EHorizontalAlign, ITableBasicColumn, ITableBasicRow, MasterTable } from "@sberbusiness/triplex-next";

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
    },
    {
        rowKey: "1351",
        rowData: { docNumber: "1351", recipient: "ИП Иванов Иван Иванович", status: "Подписан", sum: "8 300,00 ₽" },
    },
    {
        rowKey: "1352",
        rowData: { docNumber: "1352", recipient: "ООО Василёк", status: "Оплачен", sum: "145 000,00 ₽" },
    },
];

export const Default = () => (
    <MasterTable>
        <MasterTable.TableBasic columns={columns} data={data} renderNoData={() => <div>Нет данных</div>} />
    </MasterTable>
);
