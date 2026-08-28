import React, { useState } from "react";
import {
    EHorizontalAlign,
    EOrderDirection,
    ISortOrder,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
} from "@sberbusiness/triplex-next";

const rows = [
    { rowKey: "1350", number: "1350", recipient: "ООО Ромашка", sum: 9450 },
    { rowKey: "1351", number: "1351", recipient: "ИП Иванов И. И.", sum: 18914 },
    { rowKey: "1352", number: "1352", recipient: "ООО Росинка", sum: 4200 },
];

export const Sorting = () => {
    // Направление переключается по циклу none → asc → desc → none, следующее значение приходит в onOrderBy.
    const [order, setOrder] = useState<ISortOrder>({ fieldKey: "sum", direction: EOrderDirection.NONE });

    const getDirection = (fieldKey: string) => (order.fieldKey === fieldKey ? order.direction : EOrderDirection.NONE);

    const columns: ITableBasicColumn[] = [
        { fieldKey: "number", label: "Номер", width: 120, orderDirection: getDirection("number") },
        { fieldKey: "recipient", label: "Получатель (без сортировки)" },
        {
            fieldKey: "sum",
            label: "Сумма",
            width: 160,
            horizontalAlign: EHorizontalAlign.RIGHT,
            orderDirection: getDirection("sum"),
        },
    ];

    const sortedRows = [...rows].sort((a, b) => {
        if (order.direction === EOrderDirection.NONE) {
            return 0;
        }

        const sign = order.direction === EOrderDirection.ASC ? 1 : -1;

        return order.fieldKey === "sum" ? sign * (a.sum - b.sum) : sign * a.number.localeCompare(b.number);
    });

    const data: ITableBasicRow[] = sortedRows.map((row) => ({
        rowKey: row.rowKey,
        rowData: { number: row.number, recipient: row.recipient, sum: row.sum.toLocaleString("ru-RU") },
    }));

    return (
        <MasterTable>
            <MasterTable.TableBasic
                columns={columns}
                data={data}
                onOrderBy={setOrder}
                renderNoData={() => <div>Нет данных</div>}
            />
        </MasterTable>
    );
};
