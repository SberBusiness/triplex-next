import React, { useState } from "react";
import { EmptytableSysIcon96 } from "@sberbusiness/icons-next";
import {
    Amount,
    Button,
    Checkbox,
    ColumnSettings,
    ECellType,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EFontWeightTitle,
    EHorizontalAlign,
    EOrderDirection,
    ETextSize,
    ETitleSize,
    Gap,
    ISelectFieldOption,
    ISortOrder,
    ITableBasicColumn,
    ITableBasicRow,
    MasterTable,
    Pagination,
    Text,
    TextField,
    Title,
} from "@sberbusiness/triplex-next";

/** Документы таблицы. Данные захардкожены, чтобы пример был воспроизводимым. */
const DOCUMENTS = [
    { docNumber: "1350", recipient: "ООО Ромашка", status: "Создан", sum: "12500.00" },
    { docNumber: "1351", recipient: "ИП Иванов Иван Иванович", status: "Подписан", sum: "8300.00" },
    { docNumber: "1352", recipient: "ООО Василёк", status: "Оплачен", sum: "145000.00" },
    { docNumber: "1353", recipient: "ООО Ромашка", status: "Создан", sum: "3200.00" },
];

const PAGE_SIZE_OPTIONS: ISelectFieldOption[] = [
    { id: "2", value: "2", label: "2" },
    { id: "4", value: "4", label: "4" },
];

const INITIAL_COLUMNS: ITableBasicColumn[] = [
    { fieldKey: "selection", label: "", width: "48px", cellType: ECellType.CHECKBOX },
    { fieldKey: "docNumber", label: "Номер", width: "15%", orderDirection: EOrderDirection.NONE },
    { fieldKey: "recipient", label: "Получатель", width: "40%" },
    { fieldKey: "status", label: "Статус", width: "20%" },
    {
        fieldKey: "sum",
        label: "Сумма",
        width: "20%",
        horizontalAlign: EHorizontalAlign.RIGHT,
        orderDirection: EOrderDirection.NONE,
        renderCell: (value) => <Amount value={String(value)} currency="RUB" />,
    },
];

const renderNoData = () => (
    <>
        <EmptytableSysIcon96 />
        <Gap size={8} />
        <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
            Здесь пока пусто
        </Title>
        <Gap size={12} />
        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
            Измените параметры фильтрации, чтобы увидеть документы.
        </Text>
    </>
);

export const Example = () => {
    const [columns, setColumns] = useState<ITableBasicColumn[]>(INITIAL_COLUMNS);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(["1351"]);
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [recipientFilter, setRecipientFilter] = useState("");
    const [sortOrder, setSortOrder] = useState<ISortOrder | null>(null);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
    const [currentPage, setCurrentPage] = useState(1);

    const toggleRow = (rowKey: string) =>
        setSelectedKeys((keys) => (keys.includes(rowKey) ? keys.filter((key) => key !== rowKey) : [...keys, rowKey]));

    const toggleColumn = (fieldKey: string, visible: boolean) =>
        setColumns((current) =>
            current.map((column) => (column.fieldKey === fieldKey ? { ...column, hidden: !visible } : column)),
        );

    const handleOrderBy = ({ fieldKey, direction }: ISortOrder) => {
        setSortOrder(direction === EOrderDirection.NONE ? null : { fieldKey, direction });
        setCurrentPage(1);
        setColumns((current) =>
            current.map((column) =>
                column.fieldKey === fieldKey
                    ? { ...column, orderDirection: direction }
                    : { ...column, orderDirection: column.orderDirection ? EOrderDirection.NONE : undefined },
            ),
        );
    };

    const handlePageSizeChange = (option: ISelectFieldOption) => {
        setPageSize(option);
        setCurrentPage(1);
    };

    const handleFilterChange = (value: string) => {
        setRecipientFilter(value);
        setCurrentPage(1);
    };

    // Фильтрация, сортировка и постраничная нарезка — работа потребителя: таблица только отображает то, что ей передали.
    const filtered = DOCUMENTS.filter((document) =>
        document.recipient.toLowerCase().includes(recipientFilter.trim().toLowerCase()),
    );

    const sorted = sortOrder
        ? [...filtered].sort((left, right) => {
              const comparison = String(left[sortOrder.fieldKey as keyof typeof left]).localeCompare(
                  String(right[sortOrder.fieldKey as keyof typeof right]),
                  "ru",
                  { numeric: true },
              );

              return sortOrder.direction === EOrderDirection.DESC ? -comparison : comparison;
          })
        : filtered;

    const selectedSum = DOCUMENTS.filter((document) => selectedKeys.includes(document.docNumber))
        .reduce((total, document) => total + Number(document.sum), 0)
        .toFixed(2);

    const rowsPerPage = Number(pageSize.value);
    const totalPages = Math.max(1, Math.ceil(sorted.length / rowsPerPage));
    const pageDocuments = sorted.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const data: ITableBasicRow[] = pageDocuments.map((document) => ({
        rowKey: document.docNumber,
        selected: selectedKeys.includes(document.docNumber),
        rowData: {
            ...document,
            selection: (
                <Checkbox
                    checked={selectedKeys.includes(document.docNumber)}
                    onChange={() => toggleRow(document.docNumber)}
                    aria-label={`Выбрать документ ${document.docNumber}`}
                />
            ),
        },
    }));

    return (
        <MasterTable>
            <MasterTable.FilterPanel>
                <TextField
                    size={EComponentSize.MD}
                    label="Получатель"
                    inputProps={{
                        value: recipientFilter,
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                            handleFilterChange(event.target.value),
                    }}
                />
            </MasterTable.FilterPanel>

            <MasterTable.ChipPanel>
                <MasterTable.ChipPanel.Links>
                    <MasterTable.TableBasicSettings
                        linkTitle={settingsOpened ? "Скрыть настройки" : "Настройки"}
                        opened={settingsOpened}
                        setOpened={setSettingsOpened}
                    >
                        <MasterTable.TableBasicSettings.Header>Показать столбцы</MasterTable.TableBasicSettings.Header>
                        <MasterTable.TableBasicSettings.Body>
                            <ColumnSettings>
                                {({ columns: contextColumns }) =>
                                    contextColumns
                                        .filter((column) => column.fieldKey !== "selection")
                                        .map((column) => (
                                            <Checkbox
                                                key={column.fieldKey}
                                                checked={column.hidden !== true}
                                                onChange={(event) =>
                                                    toggleColumn(column.fieldKey, event.target.checked)
                                                }
                                            >
                                                {column.label}
                                            </Checkbox>
                                        ))
                                }
                            </ColumnSettings>
                        </MasterTable.TableBasicSettings.Body>
                        <MasterTable.TableBasicSettings.Footer>
                            <Button
                                theme={EButtonTheme.LINK}
                                size={EComponentSize.MD}
                                onClick={() => {
                                    setColumns(INITIAL_COLUMNS);
                                    setSortOrder(null);
                                }}
                            >
                                Сбросить настройки
                            </Button>
                        </MasterTable.TableBasicSettings.Footer>
                    </MasterTable.TableBasicSettings>
                </MasterTable.ChipPanel.Links>
            </MasterTable.ChipPanel>

            <MasterTable.TableBasic
                columns={columns}
                data={data}
                highlightRowOnHover
                onOrderBy={handleOrderBy}
                renderNoData={renderNoData}
            />

            <MasterTable.TableFooter>
                <MasterTable.TableFooter.Summary>
                    <MasterTable.TableFooter.Summary.SelectedCount>
                        Выбрано {selectedKeys.length} из {DOCUMENTS.length}
                    </MasterTable.TableFooter.Summary.SelectedCount>
                    <MasterTable.TableFooter.Summary.SelectAllButton
                        onClick={() => setSelectedKeys(DOCUMENTS.map((document) => document.docNumber))}
                    >
                        Выбрать все
                    </MasterTable.TableFooter.Summary.SelectAllButton>
                    <MasterTable.TableFooter.Summary.Amount label="Сумма" sum={selectedSum} currency="RUB" />
                </MasterTable.TableFooter.Summary>
                <MasterTable.TableFooter.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Скачать
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Подписать
                    </Button>
                </MasterTable.TableFooter.Controls>
            </MasterTable.TableFooter>

            <MasterTable.PaginationPanel>
                <Pagination
                    paginationSelectProps={{
                        paginationLabel: "Показывать по",
                        options: PAGE_SIZE_OPTIONS,
                        value: pageSize,
                        onChange: handlePageSizeChange,
                    }}
                    paginationNavigationProps={{
                        currentPage,
                        totalPages,
                        onCurrentPageChange: setCurrentPage,
                    }}
                />
            </MasterTable.PaginationPanel>
        </MasterTable>
    );
};
