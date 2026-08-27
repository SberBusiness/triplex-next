import React, { useState } from "react";
import {
    Amount,
    Button,
    Checkbox,
    ColumnSettings,
    EButtonTheme,
    EComponentSize,
    EHorizontalAlign,
    MasterTable,
    ITableBasicColumn,
} from "@sberbusiness/triplex-next";
import { renderCounterpartyDetails, renderNoColumns, renderNoData } from "../utils";

export const TableSettingsColumn = () => {
    const defaultColumns: ITableBasicColumn[] = [
        {
            fieldKey: "number",
            label: "Номер",
        },
        {
            fieldKey: "value",
            label: "Получатель",
        },
        {
            fieldKey: "sum",
            horizontalAlign: EHorizontalAlign.RIGHT,
            label: "Сумма",
            renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency="RUB" />,
        },
        {
            fieldKey: "status",
            label: "Статус",
        },
    ];

    const data = Array.from({ length: 5 }, (_, index) => ({
        rowData: {
            number: 1397450 + index,
            status: "Исполнено",
            sum: "1220000000",
            value: renderCounterpartyDetails(
                "Платежное поручение ООО Ромашка",
                "40702 810 2 0527 5000000",
                "В том числе НДС 20%",
            ),
        },
        rowKey: `table-basic-row-${index}`,
    }));

    const [columns, setColumns] = useState(defaultColumns);
    const [settingsDropdownOpened, setSettingsDropdownOpened] = useState(false);

    const resetColumns = () => {
        setColumns(defaultColumns);
    };

    const showAllColumns = () => {
        setColumns(
            columns.map((column) => {
                if (column.hidden) {
                    return { ...column, hidden: false };
                }
                return column;
            }),
        );
    };

    const toggleColumn = (fieldKey: string, checked: boolean) => {
        setColumns(
            columns.map((column) => {
                if (column.fieldKey === fieldKey) {
                    return { ...column, hidden: !checked };
                }
                return column;
            }),
        );
    };

    const renderColumns = () => (
        <ColumnSettings.SortableList columns={columns} onColumnsChange={setColumns}>
            {columns.map((column) => (
                <ColumnSettings.SortableList.Item key={column.fieldKey} id={column.fieldKey}>
                    <Checkbox
                        checked={column.hidden !== true}
                        onChange={(event) => toggleColumn(column.fieldKey, event.target.checked)}
                    >
                        {column.label}
                    </Checkbox>
                </ColumnSettings.SortableList.Item>
            ))}
        </ColumnSettings.SortableList>
    );

    return (
        <MasterTable>
            <MasterTable.ChipPanel>
                <MasterTable.ChipPanel.Links>
                    <MasterTable.TableBasicSettings
                        linkTitle={settingsDropdownOpened ? "Скрыть настройки" : "Настройки"}
                        opened={settingsDropdownOpened}
                        setOpened={setSettingsDropdownOpened}
                    >
                        <MasterTable.TableBasicSettings.Header>Показать столбцы</MasterTable.TableBasicSettings.Header>

                        <MasterTable.TableBasicSettings.Body>
                            <ColumnSettings>{renderColumns()}</ColumnSettings>
                        </MasterTable.TableBasicSettings.Body>

                        <MasterTable.TableBasicSettings.Footer>
                            <Button theme={EButtonTheme.LINK} size={EComponentSize.MD} onClick={showAllColumns}>
                                Выбрать все
                            </Button>
                            <Button theme={EButtonTheme.LINK} size={EComponentSize.MD} onClick={resetColumns}>
                                Сбросить настройки
                            </Button>
                        </MasterTable.TableBasicSettings.Footer>
                    </MasterTable.TableBasicSettings>
                </MasterTable.ChipPanel.Links>
            </MasterTable.ChipPanel>
            <MasterTable.TableBasic
                columns={columns}
                data={data}
                renderNoData={renderNoData}
                renderNoColumns={() => renderNoColumns(resetColumns)}
            />
        </MasterTable>
    );
};
