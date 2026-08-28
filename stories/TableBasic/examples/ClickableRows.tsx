import React, { useState } from "react";
import { ITableBasicColumn, ITableBasicRow, MasterTable } from "@sberbusiness/triplex-next";

const columns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", width: 100 },
    { fieldKey: "recipient", label: "Получатель" },
    { fieldKey: "sum", label: "Сумма", width: 140 },
];

const rows = [
    { rowKey: "1350", number: "1350", recipient: "ООО Ромашка", sum: "9 450,00" },
    { rowKey: "1351", number: "1351", recipient: "ИП Иванов И. И.", sum: "18 914,00" },
    { rowKey: "1352", number: "1352", recipient: "ООО Росинка", sum: "28 392,00" },
];

export const ClickableRows = () => {
    const [selectedRowKey, setSelectedRowKey] = useState("1351");

    // Заданный onClickRow сам включает подсветку строки при наведении, highlightRowOnHover не нужен.
    const data: ITableBasicRow[] = rows.map((row) => ({
        rowKey: row.rowKey,
        selected: row.rowKey === selectedRowKey,
        rowData: { number: row.number, recipient: row.recipient, sum: row.sum },
    }));

    return (
        <MasterTable>
            <MasterTable.TableBasic
                columns={columns}
                data={data}
                onClickRow={setSelectedRowKey}
                renderNoData={() => <div>Нет данных</div>}
            />
        </MasterTable>
    );
};
