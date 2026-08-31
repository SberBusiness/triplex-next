import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    EHorizontalAlign,
    ISelectFieldOption,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
    Pagination,
    TextField,
} from "@sberbusiness/triplex-next";

/** Свойства примера Playground. */
export interface IPlaygroundProps {
    /** Состояние загрузки. */
    loading: boolean;
    /** Показать панель фильтров. */
    withFilterPanel: boolean;
    /** Показать подвал таблицы. */
    withTableFooter: boolean;
    /** Показать панель пагинации. */
    withPaginationPanel: boolean;
    /** Оставить таблицу без данных. */
    empty: boolean;
}

const columns: ITableBasicColumn[] = [
    { fieldKey: "docNumber", label: "Номер", width: "15%" },
    { fieldKey: "recipient", label: "Получатель", width: "45%" },
    { fieldKey: "status", label: "Статус", width: "20%" },
    { fieldKey: "sum", label: "Сумма", width: "20%", horizontalAlign: EHorizontalAlign.RIGHT },
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
    {
        rowKey: "1352",
        rowData: { docNumber: "1352", recipient: "ООО Василёк", status: "Оплачен", sum: "145 000,00 ₽" },
    },
];

const pageSizeOptions: ISelectFieldOption[] = [
    { id: "10", value: "10", label: "10" },
    { id: "20", value: "20", label: "20" },
];

export const Playground = ({
    loading,
    withFilterPanel,
    withTableFooter,
    withPaginationPanel,
    empty,
}: IPlaygroundProps) => {
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <MasterTable loading={loading}>
            {withFilterPanel && (
                <MasterTable.FilterPanel>
                    <TextField
                        size={EComponentSize.MD}
                        label="Получатель"
                        inputProps={{
                            value: filter,
                            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value),
                        }}
                    />
                </MasterTable.FilterPanel>
            )}

            <MasterTable.TableBasic
                columns={columns}
                data={empty ? [] : data}
                highlightRowOnHover
                onClickRow={action("onClickRow")}
                renderNoData={() => <div>Нет данных</div>}
            />

            {withTableFooter && (
                <MasterTable.TableFooter>
                    <MasterTable.TableFooter.Summary>
                        <MasterTable.TableFooter.Summary.SelectedCount>
                            Выбрано 0 из {data.length}
                        </MasterTable.TableFooter.Summary.SelectedCount>
                    </MasterTable.TableFooter.Summary>
                    <MasterTable.TableFooter.Controls>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={action("onClick")}>
                            Подписать
                        </Button>
                    </MasterTable.TableFooter.Controls>
                </MasterTable.TableFooter>
            )}

            {withPaginationPanel && (
                <MasterTable.PaginationPanel>
                    <Pagination
                        paginationSelectProps={{
                            paginationLabel: "Показывать по",
                            options: pageSizeOptions,
                            value: pageSizeOptions[0],
                            onChange: action("onPageSizeChange"),
                        }}
                        paginationNavigationProps={{
                            currentPage,
                            totalPages: 5,
                            onCurrentPageChange: setCurrentPage,
                        }}
                    />
                </MasterTable.PaginationPanel>
            )}
        </MasterTable>
    );
};
