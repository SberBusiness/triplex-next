import React, { useState } from "react";
import {
    Amount,
    Button,
    Checkbox,
    ColumnSettings,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EHorizontalAlign,
    ETextSize,
    Gap,
    MasterTable,
    Text,
    ITableBasicColumn,
} from "@sberbusiness/triplex-next";
import { renderNoColumns, renderNoData } from "../utils";

export const TableSettingsColumnExtended = () => {
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

    interface IValueColumnOptions {
        showCounterparty: boolean;
        showNumber: boolean;
        showNDS: boolean;
    }

    const initiateValueColumnOptions = (defaultChecked: boolean): IValueColumnOptions => ({
        showCounterparty: defaultChecked,
        showNumber: defaultChecked,
        showNDS: defaultChecked,
    });

    const defaultValueColumnOptions = initiateValueColumnOptions(true);

    const mapValueColumnOptionKeyToName: Record<string, string> = {
        showCounterparty: "Получатель",
        showNumber: "Номер счета",
        showNDS: "НДС",
    };

    /**
     * Возвращает данные для таблицы.
     * @param showCounterparty - показать блок Получатель в столбце Значение.
     * @param showNumber - показать блок Номер счета в столбце Значение.
     * @param showNDS - показать блок НДС счета в столбце Значение.
     */
    const getData = ({ showCounterparty, showNumber, showNDS }: typeof defaultValueColumnOptions) => {
        return Array.from({ length: 5 }, (_, index) => ({
            rowData: {
                number: 1397450 + index,
                status: "Исполнено",
                sum: "1220000000",
                value: (
                    <>
                        {(showCounterparty || showNumber) && (
                            <>
                                <div>
                                    {showCounterparty && (
                                        <>
                                            Платежное поручение ООО Ромашка <br />
                                        </>
                                    )}
                                    {showNumber && "40702 810 2 0527 5000000"}
                                </div>
                                <Gap size={4} />
                            </>
                        )}

                        {showNDS && (
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                В том числе НДС 20%
                            </Text>
                        )}
                    </>
                ),
            },
            rowKey: `table-basic-row-${index}`,
        }));
    };

    const ValueColumnSettings = ({
        column,
        options,
        setColumn,
        setOptions,
    }: {
        column: ITableBasicColumn;
        options: IValueColumnOptions;
        setColumn: (checked: boolean) => void;
        setOptions: (option: IValueColumnOptions) => void;
    }) => {
        const renderOptions = () => {
            return (
                <ColumnSettings.StaticList depth={1}>
                    {Object.entries(options).map(([key, value], index) => (
                        <ColumnSettings.StaticList.Item key={index}>
                            <Checkbox
                                checked={Boolean(value)}
                                onChange={(event) => handleChildCheckboxChange(event, key)}
                            >
                                {mapValueColumnOptionKeyToName[key]}
                            </Checkbox>
                        </ColumnSettings.StaticList.Item>
                    ))}
                </ColumnSettings.StaticList>
            );
        };

        const handleChildCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, columnKey: string) => {
            const newOptions = { ...options, [columnKey]: event.target.checked };

            if (event.target.checked !== !column.hidden) {
                if (event.target.checked) {
                    if (Object.values(options).every((value) => value === false)) {
                        setColumn(event.target.checked);
                    }
                } else {
                    if (Object.values(newOptions).every((value) => value === false)) {
                        setColumn(event.target.checked);
                    }
                }
            }

            setOptions(newOptions);
        };

        const handleParentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setOptions(initiateValueColumnOptions(event.target.checked));
            setColumn(event.target.checked);
        };

        return (
            <ColumnSettings.SortableList.Item id={column.fieldKey} staticContent={renderOptions()}>
                <Checkbox
                    checked={!column.hidden}
                    bulk={Object.values(options).some((value) => value !== !column.hidden)}
                    onChange={handleParentCheckboxChange}
                >
                    {column.label}
                </Checkbox>
            </ColumnSettings.SortableList.Item>
        );
    };

    const [columns, setColumns] = useState(defaultColumns);
    const [valueColumnOptions, setValueColumnOptions] = useState(defaultValueColumnOptions);
    const [settingsDropdownOpened, setSettingsDropdownOpened] = useState(false);

    // Содержимое колонки «Получатель» выводится из настроек — отдельного состояния для данных не нужно.
    const data = getData(valueColumnOptions);

    const resetColumns = () => {
        setColumns(defaultColumns);
        setValueColumnOptions(defaultValueColumnOptions);
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
        setValueColumnOptions(defaultValueColumnOptions);
    };

    const toggleColumn = (fieldKey: string, checked: boolean): void => {
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
            {columns.map((column) => {
                if (column.fieldKey === "value") {
                    return (
                        <ValueColumnSettings
                            key={column.fieldKey}
                            column={column}
                            options={valueColumnOptions}
                            setColumn={(checked: boolean) => toggleColumn(column.fieldKey, checked)}
                            setOptions={(options) => {
                                setValueColumnOptions(options);
                            }}
                        />
                    );
                }

                return (
                    <ColumnSettings.SortableList.Item key={column.fieldKey} id={column.fieldKey}>
                        <Checkbox
                            checked={column.hidden !== true}
                            onChange={(event) => toggleColumn(column.fieldKey, event.target.checked)}
                        >
                            {column.label}
                        </Checkbox>
                    </ColumnSettings.SortableList.Item>
                );
            })}
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
