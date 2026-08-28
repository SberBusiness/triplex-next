import React from "react";
import {
    Amount,
    EHorizontalAlign,
    EOrderDirection,
    ETextSize,
    Gap,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
    Text,
} from "@sberbusiness/triplex-next";

// Здесь собраны только состояния, которых нет в документационных стори:
// - плейсхолдер «---» для пустого значения ячейки (в остальных примерах все ячейки заполнены);
// - выделенная строка без onClickRow;
// - видимые иконки сортировки ASC и DESC (в стори Sorting стартовое состояние — NONE,
//   а при NONE иконка показывается только при наведении курсора и в кадр не попадает).
const renderCaption = (caption: string) => (
    <>
        <Gap size={16} />
        <Text tag="div" size={ETextSize.B3}>
            {caption}
        </Text>
        <Gap size={8} />
    </>
);

const baseColumns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", title: "Номер", width: 100 },
    { fieldKey: "recipient", label: "Получатель", title: "Получатель" },
    {
        fieldKey: "sum",
        label: "Сумма",
        title: "Сумма",
        width: 160,
        horizontalAlign: EHorizontalAlign.RIGHT,
        renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency="RUB" />,
    },
];

const baseData: ITableBasicRow[] = [
    { rowKey: "1350", rowData: { number: "1350", recipient: "ООО Ромашка", sum: "945000" } },
    // Выделение строки задаётся флагом selected в данных строки.
    { rowKey: "1351", rowData: { number: "1351", recipient: "ИП Иванов И. И.", sum: "1891400" }, selected: true },
    // Пустое значение ячейки — компонент подставляет плейсхолдер «---».
    { rowKey: "1352", rowData: { number: "1352", recipient: "ООО Росинка", sum: "" } },
];

const sortedColumns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Не сортировано", width: 160, orderDirection: EOrderDirection.NONE },
    { fieldKey: "recipient", label: "По возрастанию", orderDirection: EOrderDirection.ASC },
    {
        fieldKey: "sum",
        label: "По убыванию",
        width: 180,
        horizontalAlign: EHorizontalAlign.RIGHT,
        orderDirection: EOrderDirection.DESC,
    },
];

const renderNoData = () => (
    <Text tag="div" size={ETextSize.B3}>
        Нет данных
    </Text>
);

export const VisualTests = () => (
    <div style={{ maxWidth: 900 }}>
        {renderCaption("Выбранная строка и плейсхолдер пустой ячейки")}
        <MasterTable>
            <MasterTable.TableBasic columns={baseColumns} data={baseData} renderNoData={renderNoData} />
        </MasterTable>

        {renderCaption("Направления сортировки: none / asc / desc")}
        <MasterTable>
            <MasterTable.TableBasic
                columns={sortedColumns}
                data={baseData}
                onOrderBy={() => {}}
                renderNoData={renderNoData}
            />
        </MasterTable>
    </div>
);
