import React from "react";
import { EmptytableSysIcon96 } from "@sberbusiness/icons-next";
import {
    EFontType,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Gap,
    ITableBasicColumn,
    MasterTable,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

const columns: ITableBasicColumn[] = [
    { fieldKey: "number", label: "Номер", width: 100 },
    { fieldKey: "recipient", label: "Получатель" },
    { fieldKey: "sum", label: "Сумма", width: 140 },
];

const renderNoData = () => (
    <>
        <EmptytableSysIcon96 />
        <Gap size={8} />
        <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
            Пока нет документов
        </Title>
        <Gap size={12} />
        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
            Здесь появятся платёжные поручения, когда вы их создадите.
        </Text>
    </>
);

export const NoData = () => (
    <MasterTable>
        <MasterTable.TableBasic columns={columns} data={[]} renderNoData={renderNoData} />
    </MasterTable>
);
