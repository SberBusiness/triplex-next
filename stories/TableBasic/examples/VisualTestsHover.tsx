import React from "react";
import {
    EOrderDirection,
    ETextSize,
    Gap,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
    Text,
} from "@sberbusiness/triplex-next";

// Кнопка сортировки в состоянии NONE видна только при наведении на .thBlock внутри заголовка,
// а подсветка строки — только при наведении на <tr>. Курсор на эти элементы наводит
// play-функция story VisualTestsHover: сначала заголовок первой таблицы, затем строка второй.
const columns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", title: "Номер", width: 120, orderDirection: EOrderDirection.NONE },
    { fieldKey: "recipient", label: "Получатель", title: "Получатель" },
    { fieldKey: "sum", label: "Сумма", title: "Сумма", width: 160 },
];

const data: ITableBasicRow[] = [
    { rowKey: "1350", rowData: { number: "1350", recipient: "ООО Ромашка", sum: "9 450,00" } },
    { rowKey: "1351", rowData: { number: "1351", recipient: "ИП Иванов И. И.", sum: "18 914,00" } },
];

const renderNoData = () => (
    <Text tag="div" size={ETextSize.B3}>
        Нет данных
    </Text>
);

export const VisualTestsHover = () => (
    <div style={{ maxWidth: 900 }}>
        <Text tag="div" size={ETextSize.B3}>
            Наведение на заголовок с сортировкой
        </Text>
        <Gap size={8} />
        <MasterTable>
            <MasterTable.TableBasic columns={columns} data={data} onOrderBy={() => {}} renderNoData={renderNoData} />
        </MasterTable>
        <Gap size={16} />
        <Text tag="div" size={ETextSize.B3}>
            Наведение на строку с highlightRowOnHover
        </Text>
        <Gap size={8} />
        <MasterTable>
            <MasterTable.TableBasic highlightRowOnHover columns={columns} data={data} renderNoData={renderNoData} />
        </MasterTable>
    </div>
);
