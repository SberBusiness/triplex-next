import React from "react";
import { ITableBasicColumn, ITableBasicRow, MasterTable } from "@sberbusiness/triplex-next";

const columns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", width: 100 },
    { fieldKey: "recipient", label: "Получатель" },
    { fieldKey: "sum", label: "Сумма", width: 140 },
];

const data: ITableBasicRow[] = [
    { rowKey: "1350", rowData: { number: "1350", recipient: "ООО Ромашка", sum: "9 450,00" } },
    { rowKey: "1351", rowData: { number: "1351", recipient: "ИП Иванов И. И.", sum: "18 914,00" } },
    { rowKey: "1352", rowData: { number: "1352", recipient: "ООО Росинка", sum: "28 392,00" } },
];

export const HighlightRowOnHover = () => (
    <MasterTable>
        <MasterTable.TableBasic
            highlightRowOnHover
            columns={columns}
            data={data}
            renderNoData={() => <div>Нет данных</div>}
        />
    </MasterTable>
);
