// noinspection ES6PreferShortImport

import React, { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Controls, Description, Primary, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { MasterTable } from "../../src/components/Table/MasterTable";
import { Amount } from "../../src/components/Amount/Amount";
import { ColumnSettings } from "../../src/components/Table/TableBasicSettings/components/ColumnSettings";
import {
    ECellType,
    EHorizontalAlign,
    EOrderDirection,
    EVerticalAlign,
} from "../../src/components/Table/TableBasic/enums";
import { ISortOrder, ITableBasicColumn, ITableBasicRow } from "../../src/components/Table/TableBasic/types";
import { Gap } from "../../src/components/Gap/Gap";
import { Text } from "../../src/components/Typography/Text";
import { EFontType, ETextSize } from "../../src/components/Typography/enums";
import { Button } from "../../src/components/Button/Button";
import { ButtonDropdown, IButtonDropdownOption } from "../../src/components/Button/ButtonDropdown";
import { EButtonDotsTheme, EButtonTheme } from "../../src/components/Button/enums";
import { Checkbox } from "../../src/components/Checkbox/Checkbox";
import { amountComparator, formatAmount } from "../../src/utils/amountUtils";
import { AmountConst } from "../../src/consts/AmountConst";
import Big from "big.js";
import { Col } from "../../src/components/Col/Col";
import { Row } from "../../src/components/Row/Row";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { ISelectFieldOption, SelectField } from "../../src/components/SelectField";
import { TextField } from "../../src/components/TextField";
import { ETableField } from "./enums";
import { renderCounterpartyDetails, renderNoColumns, renderNoData } from "./utils";
import { counterpartyExampleOptions, dataSetForTest, defaultTableFilters, statusExampleOptions } from "./const";
import { MarkerStatus } from "../../src/components/MarkerStatus/MarkerStatus";
import { EMarkerStatus } from "../../src/components/Marker/enums";
import { Tag } from "../../src/components/Tag/Tag";
import { TagGroup } from "../../src/components/TagGroup/TagGroup";
import { Link } from "../../src/components/Link/Link";
import { ITableFilters } from "./types";
import { EFormFieldStatus } from "../../src/components/FormField/enums";

// noinspection JSUnusedGlobalSymbols
export default {
    title: "Components/TableBasic",
    component: MasterTable,
    parameters: {
        docs: {
            description: {
                component:
                    "Компонент таблицы отображает структурированный набор данных, состоящий из строк и столбцов (табличных данных).",
            },
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Playground} />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MasterTable>;

interface IPlaygroundArgs {
    isLoading?: boolean;
    isHeadless?: boolean;
    withHighlightRowOnHover?: boolean;
    withData?: boolean;
    withHorizontalScroll?: boolean;
    withButtons?: boolean;
}

export const Playground: StoryObj<IPlaygroundArgs> = {
    render: (args) => {
        const [data, setData] = useState<ITableBasicRow[]>([]);
        const [checkedRows, setCheckedRows] = useState<string[]>([]);
        const [order, setOrder] = useState<ISortOrder>({ fieldKey: ETableField.Sum, direction: EOrderDirection.NONE });
        const [isShowAdditionalFilterPanel, setIsShowAdditionalFilterPanel] = useState<boolean>(false);
        const [appliedFilters, setAppliedFilters] = useState(defaultTableFilters);
        const [tempFilters, setTempFilters] = useState(defaultTableFilters);
        const [tagNodes, setTagNodes] = useState<React.JSX.Element[]>([]);

        const isCheckedAllItems = checkedRows.length === dataSetForTest.length;
        const isSpoilerFilterChanged = !!appliedFilters.statusOption || !!appliedFilters.counterpartyOption;
        const isAnyFilterChanged =
            !!appliedFilters.docNumber || !!appliedFilters.counterparty || isSpoilerFilterChanged;

        const renderHeaderCheckbox = () => {
            const checked = Boolean(checkedRows.length);
            const bulk = checkedRows.length !== data.length;

            return (
                <Checkbox
                    checked={checked}
                    bulk={bulk}
                    onChange={(event) => {
                        setCheckedRows((rows) => {
                            if (event.target.checked || bulk) {
                                rows = data.map((row) => row.rowKey);
                            } else {
                                rows.length = 0;
                            }

                            return [...rows];
                        });
                    }}
                    aria-label="Выбрать все"
                />
            );
        };

        const columns: ITableBasicColumn[] = [
            {
                fieldKey: ETableField.Checkbox,
                cellType: ECellType.CHECKBOX,
                label: renderHeaderCheckbox(),
                width: 48,
            },
            {
                fieldKey: ETableField.Number,
                label: "Номер",
                title: "Номер",
                width: 100,
                orderDirection: order.fieldKey === ETableField.Number ? order.direction : EOrderDirection.NONE,
            },
            { fieldKey: ETableField.Recipient, label: "Получатель", title: "Получатель", width: 300 },
            {
                fieldKey: ETableField.Sum,
                label: "Сумма",
                title: "Сумма",
                horizontalAlign: EHorizontalAlign.RIGHT,
                renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency="RUB" />,
                orderDirection: order.fieldKey === ETableField.Sum ? order.direction : EOrderDirection.NONE,
            },
            {
                fieldKey: ETableField.Status,
                label: "Статус",
                title: "Статус",
                width: 120,
                renderCell: (status: string) => (
                    <MarkerStatus size={EComponentSize.LG} status={EMarkerStatus.SUCCESS}>
                        {status}
                    </MarkerStatus>
                ),
            },
            ...(args.withButtons
                ? [
                      {
                          fieldKey: ETableField.Button,
                          cellType: ECellType.COMPONENTS,
                          renderCell: () => (
                              <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                  Напечатать
                              </Button>
                          ),
                      },
                      {
                          fieldKey: ETableField.ButtonIcon,
                          cellType: ECellType.COMPONENTS,
                          renderCell: () => (
                              <ButtonDropdown
                                  theme={EButtonDotsTheme.DOTS_SECONDARY}
                                  size={EComponentSize.MD}
                                  options={
                                      [
                                          {
                                              id: "option1",
                                              label: "Действие 1",
                                          },
                                          {
                                              id: "option2",
                                              label: "Действие 2",
                                          },
                                          {
                                              id: "option3",
                                              label: "Действие 3",
                                          },
                                      ] satisfies IButtonDropdownOption[]
                                  }
                              />
                          ),
                      },
                  ]
                : []),
            ...(args.withHorizontalScroll
                ? [
                      {
                          fieldKey: ETableField.ToHorizontalScroll1,
                          label: "Пример колонки 1",
                          title: "Пример колонки 1",
                          width: 170,
                      },
                      {
                          fieldKey: ETableField.ToHorizontalScroll2,
                          label: "Пример колонки 2",
                          title: "Пример колонки 2",
                          width: 170,
                      },
                      {
                          fieldKey: ETableField.ToHorizontalScroll3,
                          label: "Пример колонки 3",
                          title: "Пример колонки 3",
                          width: 170,
                      },
                      {
                          fieldKey: ETableField.ToHorizontalScroll4,
                          label: "Пример колонки 4",
                          title: "Пример колонки 4",
                          width: 170,
                      },
                  ]
                : []),
        ];

        useEffect(() => {
            const renderRowCheckbox = (rowKey: string) => {
                const checked = checkedRows.includes(rowKey);

                return (
                    <Checkbox
                        checked={checked}
                        onChange={(event) => {
                            setCheckedRows((rows) => {
                                if (event.target.checked) {
                                    rows.push(rowKey);
                                } else {
                                    rows.splice(checkedRows.indexOf(rowKey), 1);
                                }

                                return [...rows];
                            });
                        }}
                        aria-label="Выбрать строку"
                        labelAttributes={{ onClick: (event) => event.stopPropagation() }}
                    />
                );
            };

            const newData = args.withData
                ? dataSetForTest
                      .filter(
                          (doc) =>
                              doc.docNumber.includes(appliedFilters.docNumber) &&
                              doc.recipient.name.toLowerCase().includes(appliedFilters.counterparty.toLowerCase()) &&
                              (!appliedFilters.statusOption?.value ||
                                  doc.status === appliedFilters.statusOption.value) &&
                              (!appliedFilters.counterpartyOption?.value ||
                                  doc.recipient.name === appliedFilters.counterpartyOption.value),
                      )
                      .sort((a, b) => {
                          switch (order.fieldKey) {
                              case ETableField.Number: {
                                  if (order.direction === EOrderDirection.DESC) {
                                      return amountComparator(b.docNumber, a.docNumber);
                                  }
                                  break;
                              }
                              case ETableField.Sum: {
                                  if (order.direction === EOrderDirection.ASC) {
                                      return amountComparator(a.sum, b.sum);
                                  } else if (order.direction === EOrderDirection.DESC) {
                                      return amountComparator(b.sum, a.sum);
                                  }
                              }
                          }

                          return amountComparator(a.docNumber, b.docNumber);
                      })
                      .map((doc) => ({
                          rowKey: String(doc.docNumber),
                          rowData: {
                              [ETableField.Checkbox]: renderRowCheckbox(doc.docNumber),
                              [ETableField.Number]: doc.docNumber,
                              [ETableField.Recipient]: renderCounterpartyDetails(
                                  doc.purpose,
                                  doc.recipient.account,
                                  doc.tax,
                              ),
                              [ETableField.Sum]: doc.sum,
                              [ETableField.Status]: doc.status,
                              [ETableField.Button]: null,
                              [ETableField.ButtonIcon]: null,
                              [ETableField.ToHorizontalScroll1]: null,
                              [ETableField.ToHorizontalScroll2]: null,
                              [ETableField.ToHorizontalScroll3]: null,
                              [ETableField.ToHorizontalScroll4]: null,
                          },
                          selected: checkedRows.includes(doc.docNumber),
                      }))
                : [];

            setData(newData);
        }, [
            args.withData,
            checkedRows,
            order.direction,
            appliedFilters.docNumber,
            appliedFilters.counterparty,
            appliedFilters.statusOption,
            appliedFilters.counterpartyOption,
        ]);

        const selectAll = () => {
            if (isCheckedAllItems) {
                setCheckedRows([]);
            } else {
                setCheckedRows(data.map((row) => row.rowKey));
            }
        };

        const getCheckedSum = () => {
            const filter = dataSetForTest.filter((doc) => Boolean(checkedRows.includes(doc.docNumber)));
            const array = filter.map((doc) => {
                const str = formatAmount(doc.sum, undefined, false).replace(
                    AmountConst.DecimalComma,
                    AmountConst.DecimalPoint,
                );
                return Big(str);
            });
            return array.length === 0 ? String(0) : array.reduce((a, b) => a.plus(b)).toString();
        };

        const handleChangeDocNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAppliedFilters((prev) => ({ ...prev, docNumber: e.target.value }));
        };

        const handleChangeCounterparty = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAppliedFilters((prev) => ({ ...prev, counterparty: e.target.value }));
        };

        const handleChangeCounterpartyOption = (option: ISelectFieldOption) => {
            setTempFilters((prev) => ({ ...prev, counterpartyOption: option.value ? option : undefined }));
        };
        const handleChangeStatusOption = (option: ISelectFieldOption) => {
            setTempFilters((prev) => ({ ...prev, statusOption: option.value ? option : undefined }));
        };

        const handleClickResetFilters = () => {
            setTagNodes([]);
            setAppliedFilters(defaultTableFilters);
        };

        const handleClickShowFilterPanel = () => {
            setIsShowAdditionalFilterPanel((prevState) => !prevState);
            setTempFilters(appliedFilters);
        };

        const handleClickResetTempFilters = () => {
            setTempFilters(defaultTableFilters);
        };

        const updateTagNodes = (newFilters: ITableFilters) => {
            const tags = [];

            if (newFilters.counterpartyOption !== defaultTableFilters.counterpartyOption) {
                tags.push(
                    <Tag
                        key="tag-filter-counterparty"
                        id="tag-filter-counterparty"
                        size={EComponentSize.MD}
                        onRemove={handleTagRemove({
                            ...newFilters,
                            counterpartyOption: defaultTableFilters.counterpartyOption,
                        })}
                    >
                        {`Получатель: ${newFilters.counterpartyOption?.value}`}
                    </Tag>,
                );
            }

            if (newFilters.statusOption !== defaultTableFilters.statusOption) {
                tags.push(
                    <Tag
                        key="tag-filter-status"
                        id="tag-filter-status"
                        size={EComponentSize.MD}
                        onRemove={handleTagRemove({ ...newFilters, statusOption: defaultTableFilters.statusOption })}
                    >
                        {`Статус: ${newFilters.statusOption?.value}`}
                    </Tag>,
                );
            }

            setTagNodes(tags);
        };

        const handleClickApplyTempFilters = () => {
            setAppliedFilters((prev) => ({
                ...prev,
                statusOption: tempFilters.statusOption,
                counterpartyOption: tempFilters.counterpartyOption,
            }));
            updateTagNodes(tempFilters);
            setIsShowAdditionalFilterPanel((prevState) => !prevState);
        };

        const handleTagRemove = (newFilters: ITableFilters) => () => {
            setTempFilters(newFilters);
            setAppliedFilters(newFilters);
            updateTagNodes(newFilters);
        };

        const renderAdditionalFilters = () => (
            <>
                <Gap size={12} />
                <Row paddingBottom={false}>
                    <Col size={6}>
                        <SelectField
                            status={args.isLoading ? EFormFieldStatus.DISABLED : undefined}
                            size={EComponentSize.LG}
                            value={tempFilters.counterpartyOption}
                            options={counterpartyExampleOptions}
                            onChange={handleChangeCounterpartyOption}
                            placeholder="Выберите получателя из списка"
                            targetProps={{
                                fieldLabel: "Выберите получателя",
                            }}
                        />
                    </Col>
                    <Col size={6}>
                        <SelectField
                            status={args.isLoading ? EFormFieldStatus.DISABLED : undefined}
                            size={EComponentSize.LG}
                            value={tempFilters.statusOption}
                            options={statusExampleOptions}
                            onChange={handleChangeStatusOption}
                            placeholder="Выберите статус документа из списка"
                            targetProps={{
                                fieldLabel: "Выберите статус документа",
                            }}
                        />
                    </Col>
                </Row>
                <Gap size={12} />
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        theme={EButtonTheme.SECONDARY}
                        size={EComponentSize.MD}
                        onClick={handleClickResetTempFilters}
                    >
                        Сбросить
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={handleClickApplyTempFilters}>
                        Применить
                    </Button>
                </div>
            </>
        );

        const renderTags = () => (
            <>
                <Gap size={16} />
                <TagGroup size={EComponentSize.MD}>{tagNodes}</TagGroup>
            </>
        );

        const renderTableFooter = () => (
            <MasterTable.TableFooter data-test-id="TestTable__MasterTable.TableFooter">
                <MasterTable.TableFooter.Summary data-test-id="TestTable__MasterTable.TableFooter.Summary">
                    {renderHeaderCheckbox()}
                    <MasterTable.TableFooter.Summary.SelectedCount>
                        <Text size={ETextSize.B3}>
                            {`Выбрано: ${isCheckedAllItems ? dataSetForTest.length : checkedRows.length} из ${dataSetForTest.length}`}
                        </Text>
                    </MasterTable.TableFooter.Summary.SelectedCount>
                    <MasterTable.TableFooter.Summary.SelectAllButton onClick={selectAll}>
                        {isCheckedAllItems ? "Сбросить всё" : `Выбрать все ${dataSetForTest.length}`}
                    </MasterTable.TableFooter.Summary.SelectAllButton>
                    <MasterTable.TableFooter.Summary.Amount label="Сумма" sum={getCheckedSum()} currency="RUB" />
                </MasterTable.TableFooter.Summary>
                <MasterTable.TableFooter.Controls data-test-id="TestTable__MasterTable.TableFooter.Controls">
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button Name
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button Name
                    </Button>
                </MasterTable.TableFooter.Controls>
            </MasterTable.TableFooter>
        );

        const renderFilterPanel = () => {
            let additionalFilters;

            if (isShowAdditionalFilterPanel) {
                additionalFilters = renderAdditionalFilters();
            } else if (tagNodes.length > 0) {
                additionalFilters = renderTags();
            }

            return (
                <MasterTable.FilterPanel>
                    <Row paddingBottom={false}>
                        <Col size={6}>
                            <TextField
                                status={args.isLoading ? EFormFieldStatus.DISABLED : undefined}
                                inputProps={{
                                    value: appliedFilters.docNumber,
                                    onChange: handleChangeDocNumber,
                                    placeholder: "Введите номер документа",
                                }}
                                label="Номер документа"
                            />
                        </Col>
                        <Col size={6}>
                            <TextField
                                status={args.isLoading ? EFormFieldStatus.DISABLED : undefined}
                                inputProps={{
                                    value: appliedFilters.counterparty,
                                    onChange: handleChangeCounterparty,
                                    placeholder: "Введите получателя",
                                }}
                                label="Получатель"
                            />
                        </Col>
                    </Row>
                    {additionalFilters}
                </MasterTable.FilterPanel>
            );
        };

        return (
            <div style={args.withHorizontalScroll ? { width: "100%" } : undefined}>
                <MasterTable loading={args.isLoading}>
                    <MasterTable.TabsLinePanel>
                        <MasterTable.TabsLinePanel.Links>
                            {isAnyFilterChanged && <Link onClick={handleClickResetFilters}>Сбросить всё</Link>}
                            <Link onClick={handleClickShowFilterPanel}>
                                {isShowAdditionalFilterPanel
                                    ? "Скрыть фильтры"
                                    : isSpoilerFilterChanged
                                      ? "Изменить фильтры"
                                      : "Фильтры"}
                            </Link>
                        </MasterTable.TabsLinePanel.Links>
                    </MasterTable.TabsLinePanel>
                    {renderFilterPanel()}
                    <div style={args.withHorizontalScroll ? { overflow: "auto hidden" } : undefined}>
                        <MasterTable.TableBasic
                            columns={columns}
                            data={data}
                            headless={args.isHeadless}
                            highlightRowOnHover={args.withHighlightRowOnHover}
                            renderNoData={() => renderNoData(isAnyFilterChanged)}
                            onOrderBy={setOrder}
                        />
                    </div>
                    {checkedRows.length > 0 && renderTableFooter()}
                </MasterTable>
            </div>
        );
    },
    argTypes: {
        isLoading: {
            control: { type: "boolean" },
            description: "Состояние обновление данных",
            table: { type: { summary: "boolean" } },
        },
        isHeadless: {
            control: { type: "boolean" },
            description: "Скрытие заголовка таблицы",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
        },
        withHighlightRowOnHover: {
            control: { type: "boolean" },
            description: "Подсвечивание строки при наведении",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
        },
        withData: {
            control: { type: "boolean" },
            description: "Отображение демо-данных",
            table: { type: { summary: "boolean" } },
        },
        withHorizontalScroll: {
            control: { type: "boolean" },
            description:
                "Для корректного отображения горизонтального скролла необходимо обернуть компонент MasterTable.TableBasic в элемент с css-свойством overflow: auto hidden",
            table: { type: { summary: "boolean" } },
        },
        withButtons: {
            control: { type: "boolean" },
            description: "Отображение кнопок",
            table: { type: { summary: "boolean" } },
        },
    },
    args: {
        isLoading: false,
        isHeadless: false,
        withHighlightRowOnHover: false,
        withData: true,
        withHorizontalScroll: false,
        withButtons: false,
    },
    parameters: {
        controls: {
            include: [
                "isLoading",
                "isHeadless",
                "withHighlightRowOnHover",
                "withData",
                "withHorizontalScroll",
                "withButtons",
            ],
        },
        docs: {
            source: {
                code: "disabled",
            },
        },
    },
};

// noinspection JSUnusedGlobalSymbols
export const TableSpan: StoryObj = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const backendData = [
            {
                rowKey: "637",
                rowData: {
                    number: "637",
                    sender: "ООО Ромашка",
                    sum: "1337,00",
                    status: "Ячейки первой и второй строки объединены по вертикали.",
                },
                rowLayout: {
                    status: { rowSpan: 2 },
                },
            },
            {
                rowKey: "638",
                rowData: {
                    number: "638",
                    sender: "ООО Росинка",
                    sum: "420,00",
                },
            },
            {
                rowKey: "639",
                rowData: {
                    number: "639",
                    sender: "Ячейки второго и третьего столбца объединены по горизонтали.",
                    status: "Исполнено",
                },
                rowLayout: {
                    sender: { colSpan: 2 },
                },
            },
        ];

        const columns: ITableBasicColumn[] = [
            {
                fieldKey: "number",
                label: "Номер",
                width: 65,
            },
            {
                fieldKey: "sender",
                label: "Отправитель",
            },
            {
                fieldKey: "sum",
                label: "Сумма",
                horizontalAlign: EHorizontalAlign.RIGHT,
                renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency={"RUB"} />,
            },
            {
                fieldKey: "status",
                label: "Статус",
                verticalAlign: EVerticalAlign.MIDDLE,
                width: 150,
            },
        ];

        return (
            <div style={{ width: "600px" }}>
                <MasterTable>
                    <MasterTable.TableBasic columns={columns} data={backendData} />
                </MasterTable>
            </div>
        );
    },
    parameters: {
        docs: {
            description: { story: "Пример таблицы с объединёнными ячейками." },
        },
    },
};

// noinspection JSUnusedGlobalSymbols
export const TableSettingsColumn: StoryObj = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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
                <MasterTable.TabsLinePanel>
                    <MasterTable.TabsLinePanel.Links>
                        <MasterTable.TableBasicSettings
                            linkTitle={settingsDropdownOpened ? "Скрыть настройки" : "Настройки"}
                            opened={settingsDropdownOpened}
                            setOpened={setSettingsDropdownOpened}
                        >
                            <MasterTable.TableBasicSettings.Header>
                                Показать столбцы
                            </MasterTable.TableBasicSettings.Header>

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
                    </MasterTable.TabsLinePanel.Links>
                </MasterTable.TabsLinePanel>
                <MasterTable.TableBasic
                    columns={columns}
                    data={data}
                    renderNoData={renderNoData}
                    renderNoColumns={() => renderNoColumns(resetColumns)}
                />
            </MasterTable>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовая настройка колонок. Реализуется через компоненты TableBasicSettings, ColumnSettings и CheckboxYGroup. Отображение колонки зависит от свойства hidden в объекте, описывающем column.",
            },
        },
    },
};

// noinspection JSUnusedGlobalSymbols
export const TableSettingsColumnExtended: StoryObj = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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

        const mapValueColumnOptionKeyToName = {
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
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/*@ts-expect-error*/}
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

        const [data, setData] = useState(getData(defaultValueColumnOptions));
        const [columns, setColumns] = useState(defaultColumns);
        const [valueColumnOptions, setValueColumnOptions] = useState(defaultValueColumnOptions);
        const [settingsDropdownOpened, setSettingsDropdownOpened] = useState(false);

        useEffect(() => {
            setData(getData(valueColumnOptions));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [valueColumnOptions, setData]);

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
                <MasterTable.TabsLinePanel>
                    <MasterTable.TabsLinePanel.Links>
                        <MasterTable.TableBasicSettings
                            linkTitle={settingsDropdownOpened ? "Скрыть настройки" : "Настройки"}
                            opened={settingsDropdownOpened}
                            setOpened={setSettingsDropdownOpened}
                        >
                            <MasterTable.TableBasicSettings.Header>
                                Показать столбцы
                            </MasterTable.TableBasicSettings.Header>

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
                    </MasterTable.TabsLinePanel.Links>
                </MasterTable.TabsLinePanel>
                <MasterTable.TableBasic
                    columns={columns}
                    data={data}
                    renderNoData={renderNoData}
                    renderNoColumns={() => renderNoColumns(resetColumns)}
                />
            </MasterTable>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Расширенная настройка колонок. Позволяет скрывать/показывать не только колонки, но и элементы внутри колонок. Отображение колонки зависит от свойства hidden в объекте, описывающем column. Логика отображения элементов внутри колонок всегда кастомная, это только один из возможных вариантов.",
            },
        },
    },
};
