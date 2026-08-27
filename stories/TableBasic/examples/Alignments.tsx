import React from "react";
import {
    EHorizontalAlign,
    EVerticalAlign,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
} from "@sberbusiness/triplex-next";

const columns: ITableBasicColumn[] = [
    {
        fieldKey: "left",
        label: "Слева (по умолчанию)",
        horizontalAlign: EHorizontalAlign.LEFT,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: "center",
        label: "По центру",
        horizontalAlign: EHorizontalAlign.CENTER,
        verticalAlign: EVerticalAlign.MIDDLE,
    },
    {
        fieldKey: "right",
        label: "Справа",
        horizontalAlign: EHorizontalAlign.RIGHT,
        verticalAlign: EVerticalAlign.BOTTOM,
    },
];

const data: ITableBasicRow[] = [
    {
        rowKey: "1",
        rowData: {
            left: "Выравнивание по верхнему краю ячейки. Текст занимает несколько строк, чтобы разница по вертикали была видна.",
            center: "По центру ячейки",
            right: "9 450,00",
        },
    },
    {
        rowKey: "2",
        rowData: {
            left: "Ещё одна многострочная ячейка, задающая высоту строки таблицы для наглядности примера.",
            center: "По центру ячейки",
            right: "18 914,00",
        },
    },
];

export const Alignments = () => (
    <MasterTable>
        <MasterTable.TableBasic columns={columns} data={data} renderNoData={() => <div>Нет данных</div>} />
    </MasterTable>
);
