import React from "react";
import {
    Amount,
    EHorizontalAlign,
    EVerticalAlign,
    MasterTable,
    ITableBasicColumn,
    ITableBasicRow,
} from "@sberbusiness/triplex-next";

// Колонки и данные собираются вне рендера, чтобы таблица не обновляла контекст MasterTable на каждый рендер.
const backendData: ITableBasicRow[] = [
    {
        rowKey: "637",
        rowData: {
            number: "637",
            sender: "ООО Ромашка",
            sum: "1337,00",
            status: "Ячейки первой и второй строки объединены по вертикали.",
        },
        rowLayout: {
            status: { rowSpan: 2 },
        },
    },
    {
        rowKey: "638",
        rowData: {
            number: "638",
            sender: "ООО Росинка",
            sum: "420,00",
        },
    },
    {
        rowKey: "639",
        rowData: {
            number: "639",
            sender: "Ячейки второго и третьего столбца объединены по горизонтали.",
            status: "Исполнено",
        },
        rowLayout: {
            sender: { colSpan: 2 },
        },
    },
];

const columns: ITableBasicColumn[] = [
    {
        fieldKey: "number",
        label: "Номер",
        width: 65,
    },
    {
        fieldKey: "sender",
        label: "Отправитель",
    },
    {
        fieldKey: "sum",
        label: "Сумма",
        horizontalAlign: EHorizontalAlign.RIGHT,
        renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency={"RUB"} />,
    },
    {
        fieldKey: "status",
        label: "Статус",
        verticalAlign: EVerticalAlign.MIDDLE,
        width: 150,
    },
];

export const TableSpan = () => (
    <div style={{ maxWidth: "600px" }}>
        <MasterTable>
            <MasterTable.TableBasic columns={columns} data={backendData} renderNoData={() => <div>Нет данных</div>} />
        </MasterTable>
    </div>
);
