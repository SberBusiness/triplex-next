import React, { useState } from "react";
import { EmptytableSysIcon96 } from "@sberbusiness/icons-next";
import {
    Amount,
    Button,
    Checkbox,
    ColumnSettings,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EFontWeightTitle,
    EHorizontalAlign,
    ETextSize,
    ETitleSize,
    Gap,
    MasterTable,
    Text,
    Title,
    ITableBasicColumn,
    ITableBasicRow,
} from "@sberbusiness/triplex-next";

const renderCounterpartyDetails = (purpose: string, account: string, tax: string) => (
    <>
        <div>
            {purpose}
            <br />
            {account}
        </div>
        <Gap size={4} />
        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
            {tax}
        </Text>
    </>
);

const renderNoData = () => (
    <>
        <EmptytableSysIcon96 />
        <Gap size={8} />
        <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
            Текст заголовка
        </Title>
        <Gap size={12} />
        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
            Нет данных, но можно предложить какие-то действия для заполнения таблицы
        </Text>
        <Gap size={24} />
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                Button text
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                Button text
            </Button>
        </div>
    </>
);

const renderNoColumns = (onReset: () => void) => (
    <MasterTable.NoColumns>
        <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
            Все колонки таблицы скрыты
        </Title>
        <Gap size={12} />
        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
            Выберите нужные вам для отображения колонки в настройках таблицы.
        </Text>
        <Gap size={24} />
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={onReset}>
            Сбросить настройки
        </Button>
    </MasterTable.NoColumns>
);

// Колонки и данные собираются вне рендера, чтобы таблица не обновляла контекст MasterTable на каждый рендер.
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

const data: ITableBasicRow[] = Array.from({ length: 5 }, (_, index) => ({
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

export const TableSettingsColumn = () => {
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
