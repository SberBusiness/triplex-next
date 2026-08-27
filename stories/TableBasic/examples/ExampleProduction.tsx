import React, { useState } from "react";
import {
    Amount,
    Button,
    Checkbox,
    CheckboxYGroup,
    Chip,
    ChipGroup,
    ChipMultiselect,
    Col,
    DropdownMobileBody,
    DropdownMobileClose,
    DropdownMobileFooter,
    DropdownMobileHeader,
    DropdownMobileInput,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
    EHorizontalAlign,
    EMarkerStatus,
    ETextSize,
    FormField,
    FormFieldClear,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPostfix,
    Gap,
    Link,
    MarkerStatus,
    MasterTable,
    MultiselectField,
    Row,
    SelectField,
    Tag,
    TagGroup,
    Text,
    TextField,
    ISelectFieldOption,
    ITableBasicColumn,
    ITableBasicRow,
} from "@sberbusiness/triplex-next";
import { counterpartyExampleOptions, dataSetForTest } from "../const";
import { ETableField } from "../enums";
import { renderCounterpartyDetails, renderNoData } from "../utils";

interface IExampleExtraFilters {
    recipientOption: ISelectFieldOption | undefined;
    docNumber: string;
}

export const ExampleProduction = () => {
    const segments: { id: string; label: string; status: string | null; withNotification?: boolean }[] = [
        { id: "all", label: "Все", status: null },
        { id: "drafts", label: "Черновики", status: "Создан" },
        { id: "toSign", label: "На подпись и отправку", status: "Подписан", withNotification: true },
        { id: "executed", label: "Исполненные", status: "Оплачен" },
    ];

    const statusFilterOptions = [
        { id: "created", label: "Создан" },
        { id: "signed", label: "Подписан" },
        { id: "paid", label: "Оплачен" },
    ];

    const statusToMarker: Record<string, EMarkerStatus> = {
        Создан: EMarkerStatus.WAITING,
        Подписан: EMarkerStatus.WARNING,
        Оплачен: EMarkerStatus.SUCCESS,
    };

    const defaultExtraFilters: IExampleExtraFilters = { recipientOption: undefined, docNumber: "" };

    const [activeSegment, setActiveSegment] = useState("all");
    const [selectedStatusIds, setSelectedStatusIds] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [recipientQuery, setRecipientQuery] = useState("");
    const [showExtraFilters, setShowExtraFilters] = useState(false);
    const [appliedExtraFilters, setAppliedExtraFilters] = useState<IExampleExtraFilters>(defaultExtraFilters);
    const [tempExtraFilters, setTempExtraFilters] = useState<IExampleExtraFilters>(defaultExtraFilters);

    const selectedStatusLabels = statusFilterOptions
        .filter((option) => selectedStatusIds.includes(option.id))
        .map((option) => option.label);

    const segmentStatus = segments.find((segment) => segment.id === activeSegment)?.status ?? null;

    const isExtraFilterApplied =
        Boolean(appliedExtraFilters.recipientOption?.value) || Boolean(appliedExtraFilters.docNumber);

    const isAnyFilterApplied = selectedStatusLabels.length > 0 || Boolean(recipientQuery) || isExtraFilterApplied;

    const filteredData = dataSetForTest.filter((doc) => {
        if (segmentStatus && doc.status !== segmentStatus) {
            return false;
        }
        if (selectedStatusLabels.length > 0 && !selectedStatusLabels.includes(doc.status)) {
            return false;
        }
        if (recipientQuery && !doc.recipient.name.toLowerCase().includes(recipientQuery.toLowerCase())) {
            return false;
        }
        if (
            appliedExtraFilters.recipientOption?.value &&
            doc.recipient.name !== appliedExtraFilters.recipientOption.value
        ) {
            return false;
        }
        if (appliedExtraFilters.docNumber && !doc.docNumber.includes(appliedExtraFilters.docNumber)) {
            return false;
        }
        return true;
    });

    const columns: ITableBasicColumn[] = [
        { fieldKey: ETableField.Number, label: "Номер", title: "Номер", width: 100 },
        { fieldKey: ETableField.Recipient, label: "Получатель", title: "Получатель", width: 320 },
        {
            fieldKey: ETableField.Sum,
            label: "Сумма",
            title: "Сумма",
            horizontalAlign: EHorizontalAlign.RIGHT,
            renderCell: (fieldValue) => fieldValue && <Amount value={fieldValue} currency="RUB" />,
        },
        {
            fieldKey: ETableField.Status,
            label: "Статус",
            title: "Статус",
            width: 140,
            renderCell: (status: string) => (
                <MarkerStatus size={EComponentSize.LG} status={statusToMarker[status] ?? EMarkerStatus.WAITING}>
                    {status}
                </MarkerStatus>
            ),
        },
    ];

    const data: ITableBasicRow[] = filteredData.map((doc) => ({
        rowKey: doc.docNumber,
        rowData: {
            [ETableField.Number]: doc.docNumber,
            [ETableField.Recipient]: renderCounterpartyDetails(doc.purpose, doc.recipient.account, doc.tax),
            [ETableField.Sum]: doc.sum,
            [ETableField.Status]: doc.status,
        },
    }));

    const visibleStatusOptions = statusFilterOptions.filter((option) =>
        option.label.toLowerCase().includes(statusFilter.trim().toLowerCase()),
    );

    const toggleStatus = (optionId: string, checked: boolean) => {
        setSelectedStatusIds((prev) => (checked ? [...prev, optionId] : prev.filter((id) => id !== optionId)));
    };

    const unselectAllStatuses = () => {
        setSelectedStatusIds([]);
        setStatusFilter("");
    };

    const handleStatusFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusFilter(event.target.value);
    };

    const handleClickToggleExtraFilters = () => {
        setTempExtraFilters(appliedExtraFilters);
        setShowExtraFilters((prev) => !prev);
    };

    const handleClickResetTempFilters = () => {
        setTempExtraFilters(defaultExtraFilters);
    };

    const handleClickApplyTempFilters = () => {
        setAppliedExtraFilters(tempExtraFilters);
        setShowExtraFilters(false);
    };

    const handleRemoveTag = (newFilters: IExampleExtraFilters) => () => {
        setTempExtraFilters(newFilters);
        setAppliedExtraFilters(newFilters);
    };

    const handleClickResetAllFilters = () => {
        unselectAllStatuses();
        setRecipientQuery("");
        setTempExtraFilters(defaultExtraFilters);
        setAppliedExtraFilters(defaultExtraFilters);
    };

    const renderStatusCheckboxList = () => (
        <CheckboxYGroup aria-label="Статус">
            {visibleStatusOptions.map((option) => (
                <Checkbox
                    key={option.id}
                    id={option.id}
                    size={EComponentSize.MD}
                    checked={selectedStatusIds.includes(option.id)}
                    onChange={(event) => toggleStatus(option.id, event.target.checked)}
                >
                    {option.label}
                </Checkbox>
            ))}
        </CheckboxYGroup>
    );

    const renderStatusDropdownContent = () => {
        const hasResults = !statusFilter.trim() || visibleStatusOptions.length > 0;

        return hasResults ? (
            renderStatusCheckboxList()
        ) : (
            <div style={{ padding: "8px 16px" }}>
                <Text size={ETextSize.B3}>Ничего не найдено</Text>
            </div>
        );
    };

    const renderStatusMultiselect = () => (
        <ChipMultiselect
            size={EComponentSize.MD}
            clearSelected={unselectAllStatuses}
            selected={selectedStatusIds.length > 0}
            label="Статус"
            displayedValue={`Статус: ${selectedStatusLabels.join(", ")}`}
        >
            {({ opened, setOpened, targetRef, dropdownRef }) => (
                <MultiselectField.Dropdown
                    opened={opened}
                    setOpened={setOpened}
                    targetRef={targetRef}
                    ref={dropdownRef}
                    alignment={EDropdownAlignment.LEFT}
                    focusTrapProps={{ focusTrapOptions: { initialFocus: false } }}
                    mobileViewProps={{
                        children: (
                            <>
                                <DropdownMobileHeader
                                    controlButtons={<DropdownMobileClose onClick={() => setOpened(false)} />}
                                >
                                    <DropdownMobileInput
                                        autoFocus
                                        placeholder="Поиск по статусу"
                                        value={statusFilter}
                                        onChange={handleStatusFilterChange}
                                    />
                                </DropdownMobileHeader>
                                <DropdownMobileBody>{renderStatusDropdownContent()}</DropdownMobileBody>
                                <DropdownMobileFooter>
                                    <Button
                                        theme={EButtonTheme.GENERAL}
                                        size={EComponentSize.SM}
                                        onClick={() => setOpened(false)}
                                    >
                                        Применить
                                    </Button>
                                    <Button
                                        theme={EButtonTheme.LINK}
                                        size={EComponentSize.SM}
                                        onClick={unselectAllStatuses}
                                    >
                                        Сбросить
                                    </Button>
                                </DropdownMobileFooter>
                            </>
                        ),
                    }}
                >
                    <MultiselectField.Dropdown.Header>
                        <FormField size={EComponentSize.SM}>
                            <FormFieldLabel>Поиск по статусу</FormFieldLabel>
                            <FormFieldInput value={statusFilter} onChange={handleStatusFilterChange} />
                            <FormFieldPostfix>
                                <FormFieldClear onClick={() => setStatusFilter("")} />
                            </FormFieldPostfix>
                        </FormField>
                    </MultiselectField.Dropdown.Header>
                    <MultiselectField.Dropdown.Content>
                        {renderStatusDropdownContent()}
                    </MultiselectField.Dropdown.Content>
                    <MultiselectField.Dropdown.Footer>
                        <Button
                            theme={EButtonTheme.SECONDARY}
                            size={EComponentSize.SM}
                            onClick={() => setOpened(false)}
                        >
                            Применить
                        </Button>
                        <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={unselectAllStatuses}>
                            Сбросить
                        </Button>
                    </MultiselectField.Dropdown.Footer>
                </MultiselectField.Dropdown>
            )}
        </ChipMultiselect>
    );

    const renderExtraFilters = () => (
        <>
            <Gap size={12} />
            <Row paddingBottom={false}>
                <Col size={6}>
                    <SelectField
                        size={EComponentSize.MD}
                        value={tempExtraFilters.recipientOption}
                        options={counterpartyExampleOptions}
                        onChange={(option) =>
                            setTempExtraFilters((prev) => ({
                                ...prev,
                                recipientOption: option.value ? option : undefined,
                            }))
                        }
                        placeholder="Выберите получателя из списка"
                        targetProps={{ fieldLabel: "Получатель" }}
                    />
                </Col>
                <Col size={6}>
                    <TextField
                        size={EComponentSize.MD}
                        inputProps={{
                            value: tempExtraFilters.docNumber,
                            onChange: (event) =>
                                setTempExtraFilters((prev) => ({ ...prev, docNumber: event.target.value })),
                            placeholder: "Введите номер документа",
                        }}
                        label="Номер документа"
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

    const renderExtraFilterTags = () => {
        const tags: React.JSX.Element[] = [];

        if (appliedExtraFilters.recipientOption) {
            tags.push(
                <Tag
                    key="tag-filter-recipient"
                    id="tag-filter-recipient"
                    size={EComponentSize.MD}
                    onRemove={handleRemoveTag({ ...appliedExtraFilters, recipientOption: undefined })}
                >
                    {`Получатель: ${appliedExtraFilters.recipientOption.value}`}
                </Tag>,
            );
        }

        if (appliedExtraFilters.docNumber) {
            tags.push(
                <Tag
                    key="tag-filter-doc-number"
                    id="tag-filter-doc-number"
                    size={EComponentSize.MD}
                    onRemove={handleRemoveTag({ ...appliedExtraFilters, docNumber: "" })}
                >
                    {`Номер документа: ${appliedExtraFilters.docNumber}`}
                </Tag>,
            );
        }

        return (
            <>
                <Gap size={12} />
                <TagGroup size={EComponentSize.MD}>{tags}</TagGroup>
            </>
        );
    };

    const renderAdditionalFilterArea = () => {
        if (showExtraFilters) {
            return renderExtraFilters();
        }

        return isExtraFilterApplied ? renderExtraFilterTags() : null;
    };

    return (
        <MasterTable>
            <MasterTable.ChipPanel>
                <ChipGroup size={EComponentSize.SM} oneLine>
                    {segments.map((segment) => (
                        <Chip
                            key={segment.id}
                            size={EComponentSize.SM}
                            selected={activeSegment === segment.id}
                            showNotificationIcon={segment.withNotification}
                            onClick={() => setActiveSegment(segment.id)}
                        >
                            {segment.label}
                        </Chip>
                    ))}
                </ChipGroup>
                <MasterTable.ChipPanel.Links>
                    {isExtraFilterApplied && <Link onClick={handleClickResetAllFilters}>Сбросить всё</Link>}
                    <Link onClick={handleClickToggleExtraFilters}>
                        {showExtraFilters ? "Скрыть фильтры" : isExtraFilterApplied ? "Изменить фильтры" : "Фильтры"}
                    </Link>
                </MasterTable.ChipPanel.Links>
            </MasterTable.ChipPanel>
            <MasterTable.FilterPanel>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                    {renderStatusMultiselect()}
                    <TextField
                        size={EComponentSize.MD}
                        inputProps={{
                            value: recipientQuery,
                            onChange: (event) => setRecipientQuery(event.target.value),
                            placeholder: "Введите получателя",
                        }}
                        label="Получатель"
                    />
                </div>
                {renderAdditionalFilterArea()}
            </MasterTable.FilterPanel>
            <MasterTable.TableBasic
                columns={columns}
                data={data}
                renderNoData={() => renderNoData(isAnyFilterApplied)}
            />
        </MasterTable>
    );
};
