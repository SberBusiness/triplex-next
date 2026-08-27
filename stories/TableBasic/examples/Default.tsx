import React from "react";
import { ITableBasicColumn, ITableBasicRow, MasterTable } from "@sberbusiness/triplex-next";

const columns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", title: "Номер", width: 100 },
    { fieldKey: "recipient", label: "Получатель", title: "Получатель" },
    { fieldKey: "sum", label: "Сумма", title: "Сумма", width: 140 },
    { fieldKey: "status", label: "Статус", title: "Статус", width: 140 },
];

const data: ITableBasicRow[] = [
    { rowKey: "1350", rowData: { number: "1350", recipient: "ООО Ромашка", sum: "9 450,00", status: "Создан" } },
    { rowKey: "1351", rowData: { number: "1351", recipient: "ИП Иванов И. И.", sum: "18 914,00", status: "Подписан" } },
    { rowKey: "1352", rowData: { number: "1352", recipient: "ООО Росинка", sum: "28 392,00", status: "Оплачен" } },
];

export const Default = () => (
    <MasterTable>
        <MasterTable.TableBasic columns={columns} data={data} renderNoData={() => <div>Нет данных</div>} />
    </MasterTable>
);
