import React from "react";
import { ETextSize, Gap, ITableBasicColumn, ITableBasicRow, MasterTable, Text } from "@sberbusiness/triplex-next";

const columns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", width: 100 },
    { fieldKey: "recipient", label: "Получатель" },
    { fieldKey: "sum", label: "Сумма", width: 140 },
];

const data: ITableBasicRow[] = [
    { rowKey: "1350", rowData: { number: "1350", recipient: "ООО Ромашка", sum: "9 450,00" } },
    { rowKey: "1351", rowData: { number: "1351", recipient: "ИП Иванов И. И.", sum: "18 914,00" } },
];

// Состояние загрузки задаётся на MasterTable, TableBasic берёт его из контекста.
export const Loading = () => (
    <>
        <Text tag="div" size={ETextSize.B3}>
            Загрузка поверх уже показанных данных
        </Text>
        <Gap size={12} />
        <MasterTable loading>
            <MasterTable.TableBasic columns={columns} data={data} renderNoData={() => <div>Нет данных</div>} />
        </MasterTable>
        <Gap size={24} />
        <Text tag="div" size={ETextSize.B3}>
            Загрузка при пустой таблице
        </Text>
        <Gap size={12} />
        <MasterTable loading>
            <MasterTable.TableBasic columns={columns} data={[]} renderNoData={() => <div>Нет данных</div>} />
        </MasterTable>
    </>
);
