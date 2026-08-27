import React, { useState } from "react";
import {
    Button,
    Checkbox,
    ECellType,
    EButtonTheme,
    EComponentSize,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
} from "@sberbusiness/triplex-next";

const rows = [
    { rowKey: "1350", number: "1350", recipient: "ООО Ромашка" },
    { rowKey: "1351", number: "1351", recipient: "ИП Иванов И. И." },
];

// Колонки собираются вне рендера, чтобы таблица не обновляла контекст MasterTable на каждый рендер.
const columns: ITableBasicColumn[] = [
    { fieldKey: "checkbox", cellType: ECellType.CHECKBOX, label: "", width: 48 },
    { fieldKey: "number", cellType: ECellType.TEXT, label: "Номер (text)", width: 120 },
    { fieldKey: "recipient", cellType: ECellType.TEXT, label: "Получатель (text)" },
    { fieldKey: "action", cellType: ECellType.COMPONENTS, label: "Действие (components)", width: 180 },
];

export const CellTypes = () => {
    const [checkedRows, setCheckedRows] = useState<string[]>([]);

    const toggleRow = (rowKey: string, checked: boolean) => {
        setCheckedRows((prev) => (checked ? [...prev, rowKey] : prev.filter((key) => key !== rowKey)));
    };

    const data: ITableBasicRow[] = rows.map((row) => ({
        rowKey: row.rowKey,
        selected: checkedRows.includes(row.rowKey),
        rowData: {
            checkbox: (
                <Checkbox
                    checked={checkedRows.includes(row.rowKey)}
                    onChange={(event) => toggleRow(row.rowKey, event.target.checked)}
                    aria-label={`Выбрать строку ${row.number}`}
                />
            ),
            number: row.number,
            recipient: row.recipient,
            action: (
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                    Напечатать
                </Button>
            ),
        },
    }));

    return (
        <MasterTable>
            <MasterTable.TableBasic columns={columns} data={data} renderNoData={() => <div>Нет данных</div>} />
        </MasterTable>
    );
};
