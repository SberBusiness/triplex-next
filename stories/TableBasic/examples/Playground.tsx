import React, { useState } from "react";
import Big from "big.js";
import {
    Amount,
    AmountConst,
    Button,
    ButtonDropdown,
    Checkbox,
    Col,
    EButtonDotsTheme,
    EButtonTheme,
    ECellType,
    EComponentSize,
    EHorizontalAlign,
    EMarkerStatus,
    EOrderDirection,
    ETextSize,
    Gap,
    Link,
    MarkerStatus,
    MasterTable,
    Row,
    SelectField,
    Tag,
    TagGroup,
    Text,
    TextField,
    amountComparator,
    formatAmount,
    IButtonDropdownOption,
    ISelectFieldOption,
    ISortOrder,
    ITableBasicColumn,
    ITableBasicRow,
} from "@sberbusiness/triplex-next";
import { counterpartyExampleOptions, dataSetForTest, defaultTableFilters, statusExampleOptions } from "../const";
import { ETableField } from "../enums";
import { ITableFilters } from "../types";
import { renderCounterpartyDetails, renderNoData } from "../utils";

export interface IPlaygroundArgs {
    /** Состояние обновления данных. */
    isLoading?: boolean;
    /** Скрытие заголовка таблицы. */
    isHeadless?: boolean;
    /** Подсвечивание строки при наведении. */
    withHighlightRowOnHover?: boolean;
    /** Отображение демо-данных. */
    withData?: boolean;
    /** Отображение таблицы с горизонтальным скроллом. */
    withHorizontalScroll?: boolean;
    /** Отображение колонок с кнопками. */
    withButtons?: boolean;
}

export const Playground = (args: IPlaygroundArgs) => {
    const [checkedRows, setCheckedRows] = useState<string[]>([]);
    const [order, setOrder] = useState<ISortOrder>({ fieldKey: ETableField.Sum, direction: EOrderDirection.NONE });
    const [isShowAdditionalFilterPanel, setIsShowAdditionalFilterPanel] = useState<boolean>(false);
    const [appliedFilters, setAppliedFilters] = useState(defaultTableFilters);
    const [tempFilters, setTempFilters] = useState(defaultTableFilters);
    const [tagNodes, setTagNodes] = useState<React.JSX.Element[]>([]);

    const isCheckedAllItems = checkedRows.length === dataSetForTest.length;
    const isSpoilerFilterChanged = !!appliedFilters.statusOption || !!appliedFilters.counterpartyOption;
    const isAnyFilterChanged = !!appliedFilters.docNumber || !!appliedFilters.counterparty || isSpoilerFilterChanged;

    const renderRowCheckbox = (rowKey: string) => (
        <Checkbox
            checked={checkedRows.includes(rowKey)}
            onChange={(event) => {
                setCheckedRows((rows) =>
                    event.target.checked ? [...rows, rowKey] : rows.filter((key) => key !== rowKey),
                );
            }}
            aria-label="Выбрать строку"
            labelAttributes={{ onClick: (event) => event.stopPropagation() }}
        />
    );

    // Данные выводятся из фильтров, сортировки и выделения — отдельного состояния для них не нужно.
    const data: ITableBasicRow[] = args.withData
        ? dataSetForTest
              .filter(
                  (doc) =>
                      doc.docNumber.includes(appliedFilters.docNumber) &&
                      doc.recipient.name.toLowerCase().includes(appliedFilters.counterparty.toLowerCase()) &&
                      (!appliedFilters.statusOption?.value || doc.status === appliedFilters.statusOption.value) &&
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
                      [ETableField.Recipient]: renderCounterpartyDetails(doc.purpose, doc.recipient.account, doc.tax),
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

    const renderHeaderCheckbox = () => {
        const checked = Boolean(checkedRows.length);
        const bulk = checkedRows.length !== data.length;

        return (
            <Checkbox
                checked={checked}
                bulk={bulk}
                onChange={(event) => {
                    setCheckedRows(event.target.checked || bulk ? data.map((row) => row.rowKey) : []);
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
                        size={EComponentSize.MD}
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
                        size={EComponentSize.MD}
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
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleClickResetTempFilters}>
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
            <Gap size={12} />
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
                            size={EComponentSize.MD}
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
                            size={EComponentSize.MD}
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
                <MasterTable.ChipPanel>
                    <MasterTable.ChipPanel.Links>
                        {isSpoilerFilterChanged && <Link onClick={handleClickResetFilters}>Сбросить всё</Link>}
                        <Link onClick={handleClickShowFilterPanel}>
                            {isShowAdditionalFilterPanel
                                ? "Скрыть фильтры"
                                : isSpoilerFilterChanged
                                  ? "Изменить фильтры"
                                  : "Фильтры"}
                        </Link>
                    </MasterTable.ChipPanel.Links>
                </MasterTable.ChipPanel>
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
};
