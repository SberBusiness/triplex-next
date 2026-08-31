import React from "react";
import {
    EComponentSize,
    EFontType,
    EFontWeightTitle,
    EHorizontalAlign,
    ETextSize,
    ETitleSize,
    Button,
    EButtonTheme,
    Gap,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

/** Все колонки скрыты — пользователь снял их в настройках таблицы. */
const columns: ITableBasicColumn[] = [
    { fieldKey: "docNumber", label: "Номер", width: "15%", hidden: true },
    { fieldKey: "recipient", label: "Получатель", width: "45%", hidden: true },
    { fieldKey: "status", label: "Статус", width: "20%", hidden: true },
    { fieldKey: "sum", label: "Сумма", width: "20%", horizontalAlign: EHorizontalAlign.RIGHT, hidden: true },
];

const data: ITableBasicRow[] = [
    {
        rowKey: "1350",
        rowData: { docNumber: "1350", recipient: "ООО Ромашка", status: "Создан", sum: "12 500,00 ₽" },
    },
    {
        rowKey: "1351",
        rowData: { docNumber: "1351", recipient: "ИП Иванов Иван Иванович", status: "Подписан", sum: "8 300,00 ₽" },
    },
];

/** Заглушка, которую таблица показывает вместо разметки, когда каждая колонка имеет hidden. */
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
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
            Сбросить настройки
        </Button>
    </MasterTable.NoColumns>
);

export const NoColumns = () => (
    <MasterTable>
        <MasterTable.TableBasic
            columns={columns}
            data={data}
            renderNoColumns={renderNoColumns}
            renderNoData={() => <div>Нет данных</div>}
        />
    </MasterTable>
);
