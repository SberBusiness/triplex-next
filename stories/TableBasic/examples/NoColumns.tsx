import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Gap,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

const defaultColumns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", width: 100 },
    { fieldKey: "recipient", label: "Получатель" },
    { fieldKey: "sum", label: "Сумма", width: 140 },
];

const data: ITableBasicRow[] = [
    { rowKey: "1350", rowData: { number: "1350", recipient: "ООО Ромашка", sum: "9 450,00" } },
];

export const NoColumns = () => {
    // Все колонки скрыты: renderNoColumns вызывается вместо таблицы.
    const [columns, setColumns] = useState<ITableBasicColumn[]>(
        defaultColumns.map((column) => ({ ...column, hidden: true })),
    );

    const renderNoColumns = () => (
        <MasterTable.NoColumns>
            <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                Все колонки таблицы скрыты
            </Title>
            <Gap size={12} />
            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                Выберите нужные вам для отображения колонки в настройках таблицы.
            </Text>
            <Gap size={24} />
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={() => setColumns(defaultColumns)}>
                Сбросить настройки
            </Button>
        </MasterTable.NoColumns>
    );

    return (
        <MasterTable>
            <MasterTable.TableBasic
                columns={columns}
                data={data}
                renderNoData={() => <div>Нет данных</div>}
                renderNoColumns={renderNoColumns}
            />
        </MasterTable>
    );
};
