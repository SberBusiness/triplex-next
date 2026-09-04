import React from "react";
import { EmptytableSysIcon96 } from "@sberbusiness/icons-next";
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
    MasterTable,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

const columns: ITableBasicColumn[] = [
    { fieldKey: "docNumber", label: "Номер", width: "15%" },
    { fieldKey: "recipient", label: "Получатель", width: "45%" },
    { fieldKey: "status", label: "Статус", width: "20%" },
    { fieldKey: "sum", label: "Сумма", width: "20%", horizontalAlign: EHorizontalAlign.RIGHT },
];

/** Заглушка, которую таблица показывает вместо строк, когда data пустой. */
const renderNoData = () => (
    <>
        <EmptytableSysIcon96 />
        <Gap size={8} />
        <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
            Здесь пока пусто
        </Title>
        <Gap size={12} />
        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
            Создайте первый документ, и он появится в таблице.
        </Text>
        <Gap size={24} />
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
            Создать документ
        </Button>
    </>
);

export const NoData = () => (
    <MasterTable>
        <MasterTable.TableBasic columns={columns} data={[]} renderNoData={renderNoData} />
    </MasterTable>
);
