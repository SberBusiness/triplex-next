import React from "react";
import {
    Amount,
    Button,
    Checkbox,
    ECellType,
    EButtonTheme,
    EComponentSize,
    EHorizontalAlign,
    EMarkerStatus,
    EOrderDirection,
    ETextSize,
    EVerticalAlign,
    Gap,
    ITableBasicColumn,
    ITableBasicRow,
    MarkerStatus,
    MasterTable,
    Text,
} from "@sberbusiness/triplex-next";

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

const cellTypeColumns: ITableBasicColumn[] = [
    { fieldKey: "checkbox", cellType: ECellType.CHECKBOX, label: "", width: 48 },
    { fieldKey: "number", cellType: ECellType.TEXT, label: "Text", width: 120 },
    { fieldKey: "status", cellType: ECellType.COMPONENTS, label: "Components", width: 180 },
    { fieldKey: "action", cellType: ECellType.COMPONENTS, label: "Кнопка", width: 200 },
];

const cellTypeData: ITableBasicRow[] = [
    {
        rowKey: "1350",
        rowData: {
            checkbox: <Checkbox checked onChange={() => {}} aria-label="Выбрать строку 1350" />,
            number: "1350",
            status: (
                <MarkerStatus size={EComponentSize.LG} status={EMarkerStatus.SUCCESS}>
                    Оплачен
                </MarkerStatus>
            ),
            action: (
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                    Напечатать
                </Button>
            ),
        },
    },
    {
        rowKey: "1351",
        rowData: {
            checkbox: <Checkbox checked={false} onChange={() => {}} aria-label="Выбрать строку 1351" />,
            number: "1351",
            status: (
                <MarkerStatus size={EComponentSize.LG} status={EMarkerStatus.WAITING}>
                    Создан
                </MarkerStatus>
            ),
            action: (
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                    Напечатать
                </Button>
            ),
        },
    },
];

const alignColumns: ITableBasicColumn[] = [
    { fieldKey: "top", label: "Top", horizontalAlign: EHorizontalAlign.LEFT, verticalAlign: EVerticalAlign.TOP },
    {
        fieldKey: "middle",
        label: "Middle / center",
        horizontalAlign: EHorizontalAlign.CENTER,
        verticalAlign: EVerticalAlign.MIDDLE,
    },
    {
        fieldKey: "bottom",
        label: "Bottom / right",
        horizontalAlign: EHorizontalAlign.RIGHT,
        verticalAlign: EVerticalAlign.BOTTOM,
    },
];

const alignData: ITableBasicRow[] = [
    {
        rowKey: "1",
        rowData: {
            top: "Многострочная ячейка, задающая высоту строки, чтобы вертикальное выравнивание было заметно.",
            middle: "По центру",
            bottom: "9 450,00",
        },
    },
];

const spanData: ITableBasicRow[] = [
    {
        rowKey: "637",
        rowData: { number: "637", recipient: "ООО Ромашка", sum: "133700" },
        rowLayout: { sum: { rowSpan: 2 } },
    },
    { rowKey: "638", rowData: { number: "638", recipient: "ООО Росинка" } },
];

const renderNoData = () => (
    <Text tag="div" size={ETextSize.B3}>
        Нет данных
    </Text>
);

export const VisualTests = () => (
    <div style={{ maxWidth: 900 }}>
        {renderCaption("Шапка, выбранная строка и плейсхолдер пустой ячейки")}
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

        {renderCaption("Типы ячеек: checkbox / text / components")}
        <MasterTable>
            <MasterTable.TableBasic columns={cellTypeColumns} data={cellTypeData} renderNoData={renderNoData} />
        </MasterTable>

        {renderCaption("Выравнивание по горизонтали и вертикали")}
        <MasterTable>
            <MasterTable.TableBasic columns={alignColumns} data={alignData} renderNoData={renderNoData} />
        </MasterTable>

        {renderCaption("Объединение ячеек через rowLayout")}
        <MasterTable>
            <MasterTable.TableBasic columns={baseColumns} data={spanData} renderNoData={renderNoData} />
        </MasterTable>

        {renderCaption("Без шапки (headless)")}
        <MasterTable>
            <MasterTable.TableBasic headless columns={baseColumns} data={baseData} renderNoData={renderNoData} />
        </MasterTable>

        {renderCaption("Загрузка поверх данных")}
        <MasterTable loading>
            <MasterTable.TableBasic columns={baseColumns} data={baseData} renderNoData={renderNoData} />
        </MasterTable>

        {renderCaption("Загрузка при пустой таблице")}
        <MasterTable loading>
            <MasterTable.TableBasic columns={baseColumns} data={[]} renderNoData={renderNoData} />
        </MasterTable>
    </div>
);
