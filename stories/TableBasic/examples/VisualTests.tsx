import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    Amount,
    Checkbox,
    ColumnSettings,
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
// - открытые настройки колонок (play открывает dropdown), включая скрытую и заблокированную колонку;
// - пустой список настроек и список в загрузке;
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

const SETTINGS_COLUMNS: ITableBasicColumn[] = baseColumns.map((column) => ({
    ...column,
    hidden: column.fieldKey === "sum",
}));

const EMPTY_COLUMNS: ITableBasicColumn[] = [];

const ColumnSettingsVisual = () => {
    const [columns, setColumns] = useState(SETTINGS_COLUMNS);

    const toggleColumn = (fieldKey: string, checked: boolean) => {
        setColumns((currentColumns) =>
            currentColumns.map((column) => (column.fieldKey === fieldKey ? { ...column, hidden: !checked } : column)),
        );
    };

    return (
        <div style={{ minHeight: 300 }}>
            <MasterTable>
                <MasterTable.TableBasicSettings linkTitle="Настройки">
                    <MasterTable.TableBasicSettings.Header>Показать столбцы</MasterTable.TableBasicSettings.Header>
                    <MasterTable.TableBasicSettings.Body>
                        <ColumnSettings>
                            {({ columns: currentColumns }) => (
                                <ColumnSettings.SortableList columns={currentColumns} onColumnsChange={setColumns}>
                                    {currentColumns.map((column) => (
                                        <ColumnSettings.SortableList.Item
                                            key={column.fieldKey}
                                            id={column.fieldKey}
                                            disabled={column.fieldKey === "number"}
                                        >
                                            <Checkbox
                                                checked={!column.hidden}
                                                disabled={column.fieldKey === "number"}
                                                onChange={(event) =>
                                                    toggleColumn(column.fieldKey, event.target.checked)
                                                }
                                            >
                                                {column.label}
                                            </Checkbox>
                                        </ColumnSettings.SortableList.Item>
                                    ))}
                                </ColumnSettings.SortableList>
                            )}
                        </ColumnSettings>
                    </MasterTable.TableBasicSettings.Body>
                </MasterTable.TableBasicSettings>
                <Gap size={12} />
                <MasterTable.TableBasic columns={columns} data={baseData} renderNoData={renderNoData} />
            </MasterTable>
        </div>
    );
};

export const VisualTests = () => (
    <div style={{ maxWidth: 900 }}>
        {renderCaption("Настройки колонок: показанные, скрытые и заблокированные")}
        <ColumnSettingsVisual />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div style={{ flex: "1 1 240px" }}>
                {renderCaption("Пустой список настроек")}
                <ColumnSettings.SortableList
                    columns={EMPTY_COLUMNS}
                    onColumnsChange={action("emptyColumnsChange")}
                    aria-label="Пустые настройки"
                    style={{ minHeight: 80 }}
                />
            </div>
            <div style={{ flex: "1 1 240px" }}>
                {renderCaption("Загрузка настроек")}
                <ColumnSettings.SortableList
                    columns={EMPTY_COLUMNS}
                    onColumnsChange={action("loadingColumnsChange")}
                    aria-label="Загрузка настроек"
                    loading
                    style={{ minHeight: 80 }}
                />
            </div>
        </div>

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
