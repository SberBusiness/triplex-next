import React, { useMemo, useState } from "react";
import { StoryObj } from "@storybook/react";
import { Controls, Description, Stories, Subtitle, Title as SBTitle } from "@storybook/addon-docs/blocks";
import {
    List,
    ListItem,
    ListEmptyState,
    ListSortable,
    ListSortableItem,
    ListSortableItemControls,
    ListItemTable,
    ListItemControlsButton,
    ListItemControlsButtonDropdown,
} from "../../src/components/List";
import { Button, ButtonDropdown, EButtonDotsTheme, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import {
    EFontType,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Text,
    Title,
    EFontWeightText,
} from "../../src/components/Typography";
import {
    AttachmentStrokeSrvIcon20,
    DotshorizontalStrokeSrvIcon20,
    EmptytableSysIcon96,
} from "@sberbusiness/icons-next";
import { Gap } from "../../src/components/Gap";
import { FixedSizeList } from "react-window";
import { Checkbox, CheckboxYGroup } from "../../src/components/Checkbox";
import { MarkerStatus } from "../../src/components/MarkerStatus";
import { EMarkerStatus } from "../../src/components/Marker";
import { ListMaster } from "../../src/components/ListMaster";
import { TabsLine } from "../../src/components/TabsLine";
import { ChipDatePicker, ChipMultiselect, ChipOptions, ChipSort, ChipSuggest } from "../../src/components/Chip";
import { MultiselectField } from "../../src/components/MultiselectField";
import { ISuggestFieldOption } from "../../src/components/SuggestField";
import { EDropdownAlignment } from "../../src/components/Dropdown";
import { LightBox } from "../../src/components/LightBox";
import { EHeaderPageType, EBodyPageType, Page, EFooterPageType } from "../../src/components/Page";
import { ChipGroup } from "../../src/components/ChipGroup";

export default {
    title: "Components/List/List",
    component: List,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
        docs: {
            description: {
                component: `
Компонент List — контейнер для набора элементов. Поддерживает состояние загрузки, пустого списка, выбор элементов и сортировку (drag-and-drop).
                `,
            },
            page: () => (
                <>
                    <SBTitle />
                    <Subtitle />
                    <Description />
                    <Controls of={Default} />
                    <Stories />
                </>
            ),
        },
    },
} as const;

export const Playground: StoryObj<typeof List> = {
    args: {
        loading: false,
    },
    argTypes: {
        loading: {
            table: { disable: false },
            control: { type: "boolean" },
            description: "Состояние загрузки",
        },
    },
    render: (args) => (
        <List loading={args.loading} style={{ width: "500px" }}>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
        </List>
    ),
    parameters: {
        controls: {
            include: ["loading"],
        },
        docs: {
            description: {
                story: "Интерактивный пример списка. Управляйте состоянием loading через панель Storybook.",
            },
        },
    },
};

export const Default: StoryObj<typeof List> = {
    render: () => (
        <div style={{ width: "500px" }}>
            <List>
                <ListItem>Элемент списка</ListItem>
                <ListItem>Элемент списка</ListItem>
                <ListItem>Элемент списка</ListItem>
            </List>
        </div>
    ),
    parameters: {
        controls: { disable: true },
        docs: { description: { story: "Базовый список." } },
    },
};

export const Loading: StoryObj<typeof List> = {
    render: () => (
        <div style={{ width: "150px" }}>
            <List loading>
                <ListItem>Элемент списка</ListItem>
                <ListItem>Элемент списка</ListItem>
                <ListItem>Элемент списка</ListItem>
                <ListItem>Элемент списка</ListItem>
                <ListItem>Элемент списка</ListItem>
                <ListItem>Элемент списка</ListItem>
            </List>
        </div>
    ),
    parameters: {
        controls: { disable: true },
        docs: { description: { story: "Список в состоянии загрузки." } },
    },
};

export const EmptyState: StoryObj<typeof List> = {
    render: () => (
        <ListEmptyState>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <EmptytableSysIcon96 />
            </div>

            <Gap size={16} />

            <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                Title text
            </Title>

            <Gap size={8} />

            <Text size={ETextSize.B3}>Нет данных, но можно предложить какие-то действия для заполнения таблицы.</Text>

            <Gap size={24} />

            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                Button Name
            </Button>
        </ListEmptyState>
    ),
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Используется, если нет данных для отображения хотя бы одного элемента списка.",
            },
        },
    },
};

export const Virtualized: StoryObj<typeof List> = {
    render: () => {
        const itemData = useMemo(() => Array.from({ length: 100 }).map((_, index) => `List item ${index}`), []);

        return (
            <FixedSizeList
                itemData={itemData}
                itemCount={100}
                itemSize={20}
                width="100%"
                height={200}
                innerElementType={List}
            >
                {({ data, index, style }) => <ListItem style={style}>{data[index]}</ListItem>}
            </FixedSizeList>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с виртуализацией для работы с большими наборами данных. Рендерится только видимая область.",
            },
        },
    },
};

export const Sortable: StoryObj<typeof List> = {
    render: () => {
        const [items, setItems] = useState(
            Array.from({ length: 10 }, (_, index) => ({ id: `list-sortable-item-0-${index}`, index })),
        );
        return (
            <ListSortable items={items} onItemsChange={setItems}>
                {items.map(({ id, index }) => (
                    <ListSortableItem key={id} id={id}>
                        {({ listeners, dragging, setActivatorNodeRef }) => (
                            <ListSortableItem.Target {...listeners} dragging={dragging} ref={setActivatorNodeRef}>
                                List item {index}
                            </ListSortableItem.Target>
                        )}
                    </ListSortableItem>
                ))}
            </ListSortable>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с возможностью сортировки элементов.",
            },
        },
    },
};

export const SortableWithInteractiveElements: StoryObj<typeof List> = {
    render: () => {
        const [items, setItems] = useState(
            Array.from({ length: 10 }, (_, index) => ({ id: `list-sortable-item-1-${index}`, index })),
        );

        return (
            <ListSortable items={items} onItemsChange={setItems}>
                {items.map(({ id, index }) => (
                    <ListSortableItem key={id} id={id}>
                        {({ listeners, dragging, setActivatorNodeRef }) => (
                            <ListSortableItem.Target {...listeners} dragging={dragging} ref={setActivatorNodeRef}>
                                <ListSortableItemControls>
                                    <Checkbox>List item {index}</Checkbox>
                                </ListSortableItemControls>
                            </ListSortableItem.Target>
                        )}
                    </ListSortableItem>
                ))}
            </ListSortable>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с возможностью сортировки интерактивных элементов.",
            },
        },
    },
};

export const Example: StoryObj<typeof List> = {
    render: () => {
        type TTabId = "all" | "draft" | "sign" | "executed" | "rejected";
        type TItemStatus = "draft" | "signed" | "executed" | "rejected";

        const tabsLine: Array<{ id: TTabId; label: string; showNotificationIcon?: boolean }> = [
            { id: "all", label: "Все" },
            { id: "draft", label: "Черновики", showNotificationIcon: true },
            { id: "sign", label: "На подпись и отправку" },
            { id: "executed", label: "Исполненные" },
            { id: "rejected", label: "Отклоненные" },
        ];

        const chipSortOptions = [
            { id: "list-master-chip-sort-1", label: "По возрастанию суммы", value: "asc" },
            { id: "list-master-chip-sort-2", label: "По убыванию суммы", value: "desc" },
        ] as const;

        type TChipSortOption = (typeof chipSortOptions)[number];
        const [chipSortValue, setChipSortValue] = React.useState<TChipSortOption>(chipSortOptions[0]);

        const allStatuses: TItemStatus[] = ["draft", "signed", "executed", "rejected"];

        const statusOptions: Array<{ id: string; label: string; value: TItemStatus }> = [
            { id: "status-draft", label: "Черновики", value: "draft" },
            { id: "status-signed", label: "На подпись", value: "signed" },
            { id: "status-executed", label: "Исполненные", value: "executed" },
            { id: "status-rejected", label: "Отклоненные", value: "rejected" },
        ];

        const statusToMarker: Record<TItemStatus, EMarkerStatus> = {
            draft: EMarkerStatus.WAITING,
            signed: EMarkerStatus.SUCCESS,
            executed: EMarkerStatus.SUCCESS,
            rejected: EMarkerStatus.ERROR,
        };

        const initialAccountOptions: ISuggestFieldOption[] = [
            { id: "acc-1", label: "Счет 40702 810..." },
            { id: "acc-2", label: "Счет 40702 999..." },
        ];

        const initialCounterpartyOptions: ISuggestFieldOption[] = [
            { id: "cp-1", label: "ООО Голубая Роза" },
            { id: "cp-2", label: "ООО Лунная Лилия" },
        ];

        type IListItemData = {
            id: string;
            amount: number;
            title: string;
            description: string;
            numberAndDate: string;
            paymentDate: string; // YYYYMMDD для простых сравнений
            status: TItemStatus;
            statusText: string;

            accountId: string;
            counterpartyId: string;
        };

        const listItemsData: IListItemData[] = [
            {
                id: "1",
                amount: 1_220_000_000,
                title: "№1 ООО Голубая Роза Голубая",
                description: "НДС не облагается",
                numberAndDate: "40702 810 2 0527 5000000 от 09.04.24",
                paymentDate: "20240409",
                status: "draft",
                statusText: "Черновик",
                accountId: "acc-1",
                counterpartyId: "cp-1",
            },
            {
                id: "2",
                amount: 85_500_000,
                title: "№2 ООО Лунная Лилия",
                description: "НДС не облагается",
                numberAndDate: "40702 810 2 0527 5000001 от 21.05.24",
                paymentDate: "20240521",
                status: "signed",
                statusText: "На подпись",
                accountId: "acc-1",
                counterpartyId: "cp-2",
            },
            {
                id: "3",
                amount: 3_300_000,
                title: "№3 ООО Голубая Роза",
                description: "НДС не облагается",
                numberAndDate: "40702 810 2 0527 5000002 от 02.06.24",
                paymentDate: "20240602",
                status: "executed",
                statusText: "Исполнено",
                accountId: "acc-2",
                counterpartyId: "cp-1",
            },
            {
                id: "4",
                amount: 12_700_000,
                title: "№4 ООО Лунная Лилия",
                description: "НДС не облагается",
                numberAndDate: "40702 999 1 0527 5000003 от 10.07.24",
                paymentDate: "20240710",
                status: "rejected",
                statusText: "Отклонено",
                accountId: "acc-2",
                counterpartyId: "cp-2",
            },
            {
                id: "5",
                amount: 12_700_000,
                title: "№4 ООО Лунная Лилия",
                description: "НДС не облагается",
                numberAndDate: "40702 999 1 0527 5000003 от 10.07.24",
                paymentDate: "20240710",
                status: "rejected",
                statusText: "Отклонено",
                accountId: "acc-2",
                counterpartyId: "cp-2",
            },
            {
                id: "6",
                amount: 12_700_000,
                title: "№4 ООО Лунная Лилия",
                description: "НДС не облагается",
                numberAndDate: "40702 999 1 0527 5000003 от 10.07.24",
                paymentDate: "20240710",
                status: "rejected",
                statusText: "Отклонено",
                accountId: "acc-2",
                counterpartyId: "cp-2",
            },
            {
                id: "7",
                amount: 12_700_000,
                title: "№4 ООО Лунная Лилия",
                description: "НДС не облагается",
                numberAndDate: "40702 999 1 0527 5000003 от 10.07.24",
                paymentDate: "20240710",
                status: "rejected",
                statusText: "Отклонено",
                accountId: "acc-2",
                counterpartyId: "cp-2",
            },
        ];

        const [selectedListItemIds, setSelectedListItemIds] = React.useState<string[]>([]);
        const [selectedTabLineId, setSelectedTabLineId] = React.useState<TTabId>("all");

        const [accountValue, setAccountValue] = React.useState<ISuggestFieldOption | undefined>(undefined);
        const [accountOptions, setAccountOptions] = React.useState<ISuggestFieldOption[]>([]);
        const [accountTooltipOpen, setAccountTooltipOpen] = React.useState(false);
        const accountInitialOptionsRef = React.useRef<ISuggestFieldOption[]>(initialAccountOptions);

        const [counterpartyValue, setCounterpartyValue] = React.useState<ISuggestFieldOption | undefined>(undefined);
        const [counterpartyOptions, setCounterpartyOptions] = React.useState<ISuggestFieldOption[]>([]);
        const [counterpartyTooltipOpen, setCounterpartyTooltipOpen] = React.useState(false);
        const counterpartyInitialOptionsRef = React.useRef<ISuggestFieldOption[]>(initialCounterpartyOptions);

        const [multiselectStatusValues, setMultiselectStatusValues] = React.useState<TItemStatus[]>(allStatuses);

        const [dateFrom, setDateFrom] = React.useState("");
        const [dateTo, setDateTo] = React.useState("");

        const [openLightBoxOptions, setOpenLightBoxOptions] = React.useState(false);

        const clearFilters = () => {
            setAccountValue(undefined);
            setCounterpartyValue(undefined);
            setMultiselectStatusValues(allStatuses);

            setDateFrom("");
            setDateTo("");
        };

        React.useEffect(() => {
            setSelectedListItemIds([]);
        }, [selectedTabLineId, accountValue, counterpartyValue, multiselectStatusValues, dateFrom, dateTo]);

        const changedFiltersCount =
            (accountValue ? 1 : 0) +
            (counterpartyValue ? 1 : 0) +
            (multiselectStatusValues.length !== allStatuses.length ? 1 : 0) +
            (dateFrom ? 1 : 0) +
            (dateTo ? 1 : 0);

        const filteredItems = React.useMemo(() => {
            let next = [...listItemsData];

            if (selectedTabLineId !== "all") {
                const map: Record<Exclude<TTabId, "all">, TItemStatus> = {
                    draft: "draft",
                    sign: "signed",
                    executed: "executed",
                    rejected: "rejected",
                };
                next = next.filter((i) => i.status === map[selectedTabLineId as Exclude<TTabId, "all">]);
            }

            if (multiselectStatusValues.length !== allStatuses.length) {
                next = next.filter((i) => multiselectStatusValues.includes(i.status));
            }

            if (accountValue) next = next.filter((i) => i.accountId === accountValue.id);
            if (counterpartyValue) next = next.filter((i) => i.counterpartyId === counterpartyValue.id);

            if (dateFrom) {
                next = next.filter((i) => i.paymentDate >= dateFrom);
            }

            if (dateTo) {
                next = next.filter((i) => i.paymentDate <= dateTo);
            }

            return next;
        }, [
            dateFrom,
            dateTo,
            listItemsData,
            multiselectStatusValues,
            accountValue,
            counterpartyValue,
            selectedTabLineId,
        ]);

        const sortedItems = React.useMemo(() => {
            const next = [...filteredItems];
            next.sort((a, b) => (chipSortValue.value === "desc" ? b.amount - a.amount : a.amount - b.amount));
            return next;
        }, [filteredItems, chipSortValue]);

        const sumSelected = React.useMemo(() => {
            return listItemsData
                .filter((item) => selectedListItemIds.includes(item.id))
                .reduce((acc, item) => acc + item.amount, 0);
        }, [listItemsData, selectedListItemIds]);

        const handleSelectListItem = (id: string, selected: boolean) => {
            setSelectedListItemIds((prev) => (selected ? [...prev, id] : prev.filter((itemId) => itemId !== id)));
        };

        const selectAllListItems = () => {
            setSelectedListItemIds(sortedItems.map((i) => i.id));
        };

        const clearSelected = () => setSelectedListItemIds([]);

        const itemActions = [
            { id: "action-1", label: "Действие 1", onSelect: () => alert("Действие 1") },
            { id: "action-2", label: "Действие 2", onSelect: () => alert("Действие 2") },
        ];

        const options = [
            {
                id: "button-dropdown-card-with-selectable-option-1",
                label: "Текст пункта меню 1",
                onSelect: () => alert("Выбран пункт меню 1."),
            },
            {
                id: "button-dropdown-card-with-selectable-option-2",
                label: "Текст пункта меню 2",
                onSelect: () => alert("Выбран пункт меню 2."),
            },
            {
                id: "button-dropdown-card-with-selectable-option-3",
                label: "Текст пункта меню 3",
                onSelect: () => alert("Выбран пункт меню 3."),
            },
        ];

        return (
            <div>
                <ListMaster>
                    {selectedListItemIds.length ? (
                        <ListMaster.Header>
                            <ListMaster.SelectionControls>
                                <Button theme={EButtonTheme.LINK} size={EComponentSize.MD} onClick={selectAllListItems}>
                                    Выбрать все
                                </Button>

                                <Text size={ETextSize.B3} weight={EFontWeightText.SEMIBOLD}>
                                    Выбрано: {selectedListItemIds.length}
                                </Text>

                                <Button theme={EButtonTheme.LINK} size={EComponentSize.MD} onClick={clearSelected}>
                                    Сбросить все
                                </Button>
                            </ListMaster.SelectionControls>
                        </ListMaster.Header>
                    ) : null}

                    <ListMaster.Body>
                        <Gap size={16} />

                        <TabsLine
                            tabs={tabsLine}
                            selectedId={selectedTabLineId}
                            onChangeTab={setSelectedTabLineId}
                            paddingX={16}
                            withSeparator
                        />

                        <Gap size={16} />

                        <ListMaster.ChipGroup>
                            <ChipSort
                                label="Сортировка"
                                defaultValue={chipSortOptions[0]}
                                value={chipSortValue}
                                options={[...chipSortOptions]}
                                onChange={setChipSortValue}
                                size={EComponentSize.MD}
                            />

                            <ChipOptions
                                selected={changedFiltersCount > 0}
                                clearSelected={clearFilters}
                                onClick={() => setOpenLightBoxOptions(true)}
                                size={EComponentSize.MD}
                            >
                                {changedFiltersCount > 0 ? changedFiltersCount : undefined}
                            </ChipOptions>

                            <ChipSuggest
                                size={EComponentSize.MD}
                                label="Счет"
                                placeholder="Выберите счет"
                                noOptionsText="Ничего не найдено"
                                value={accountValue}
                                options={accountOptions}
                                tooltipOpen={accountTooltipOpen}
                                onSelect={setAccountValue}
                                onFilter={(input) => {
                                    if (!input) {
                                        const initial = accountInitialOptionsRef.current;
                                        setAccountOptions(initial);
                                        setAccountTooltipOpen(false);
                                        return;
                                    }
                                    const filtered = accountInitialOptionsRef.current.filter((o) =>
                                        o.label.toLowerCase().includes(input.toLowerCase()),
                                    );
                                    setAccountOptions(filtered);
                                    setAccountTooltipOpen(filtered.length === 0);
                                }}
                                targetProps={{ clearSelected: () => setAccountValue(undefined) }}
                                dropdownProps={{
                                    onOpen: () => {
                                        setAccountOptions(accountInitialOptionsRef.current);
                                        setAccountTooltipOpen(false);
                                    },
                                }}
                            />

                            <ChipSuggest
                                size={EComponentSize.MD}
                                label="Контрагент"
                                placeholder="Выберите контрагента"
                                noOptionsText="Ничего не найдено"
                                value={counterpartyValue}
                                options={counterpartyOptions}
                                tooltipOpen={counterpartyTooltipOpen}
                                onSelect={setCounterpartyValue}
                                onFilter={(input) => {
                                    if (!input) {
                                        const initial = counterpartyInitialOptionsRef.current;
                                        setCounterpartyOptions(initial);
                                        setCounterpartyTooltipOpen(false);
                                        return;
                                    }
                                    const filtered = counterpartyInitialOptionsRef.current.filter((o) =>
                                        o.label.toLowerCase().includes(input.toLowerCase()),
                                    );
                                    setCounterpartyOptions(filtered);
                                    setCounterpartyTooltipOpen(filtered.length === 0);
                                }}
                                targetProps={{ clearSelected: () => setCounterpartyValue(undefined) }}
                                dropdownProps={{
                                    onOpen: () => {
                                        setCounterpartyOptions(counterpartyInitialOptionsRef.current);
                                        setCounterpartyTooltipOpen(false);
                                    },
                                }}
                            />

                            <ChipMultiselect
                                clearSelected={() => setMultiselectStatusValues(allStatuses)}
                                selected={multiselectStatusValues.length !== allStatuses.length}
                                label="Статус"
                                displayedValue={`${multiselectStatusValues.length}`}
                                size={EComponentSize.MD}
                            >
                                {({ opened, setOpened, targetRef, dropdownRef }) => (
                                    <MultiselectField.Dropdown
                                        opened={opened}
                                        setOpened={setOpened}
                                        targetRef={targetRef}
                                        ref={dropdownRef}
                                        alignment={EDropdownAlignment.LEFT}
                                    >
                                        <MultiselectField.Dropdown.Content>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 8,
                                                    padding: "12px 12px 0 12px",
                                                }}
                                            >
                                                {statusOptions.map((opt) => {
                                                    const checked = multiselectStatusValues.includes(opt.value);
                                                    return (
                                                        <CheckboxYGroup key={opt.id}>
                                                            <Checkbox
                                                                checked={checked}
                                                                onChange={(e) => {
                                                                    const nextChecked = e.target.checked;
                                                                    setMultiselectStatusValues((prev) => {
                                                                        if (nextChecked) {
                                                                            if (prev.includes(opt.value)) return prev;
                                                                            return [...prev, opt.value];
                                                                        }
                                                                        return prev.filter((v) => v !== opt.value);
                                                                    });
                                                                }}
                                                            >
                                                                {opt.label}
                                                            </Checkbox>
                                                        </CheckboxYGroup>
                                                    );
                                                })}
                                            </div>
                                        </MultiselectField.Dropdown.Content>
                                    </MultiselectField.Dropdown>
                                )}
                            </ChipMultiselect>

                            <ChipDatePicker
                                value={dateFrom}
                                label="Дата с"
                                onChange={setDateFrom}
                                alignment={EDropdownAlignment.LEFT}
                                size={EComponentSize.MD}
                                status="default"
                            />

                            <ChipDatePicker
                                value={dateTo}
                                label="Дата по"
                                onChange={setDateTo}
                                alignment={EDropdownAlignment.LEFT}
                                size={EComponentSize.MD}
                                status="default"
                            />
                        </ListMaster.ChipGroup>

                        <Gap size={12} />

                        {sortedItems.length ? (
                            <List>
                                {sortedItems.map((item) => (
                                    <ListItemTable
                                        key={item.id}
                                        selected={selectedListItemIds.includes(item.id)}
                                        onSelect={(sel) => handleSelectListItem(item.id, sel)}
                                        onClickItem={() => console.log("click", item.id)}
                                        controlButtons={
                                            <>
                                                <ListItemControlsButton
                                                    icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}
                                                >
                                                    Скачать
                                                </ListItemControlsButton>

                                                <ListItemControlsButtonDropdown
                                                    icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                                                    options={itemActions}
                                                >
                                                    Действия
                                                </ListItemControlsButtonDropdown>
                                            </>
                                        }
                                    >
                                        <Text size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                            {item.amount.toLocaleString("ru-RU")} RUB
                                        </Text>
                                        <Text size={ETextSize.B3} tag="div">
                                            {item.title}
                                        </Text>
                                        <Text size={ETextSize.B3} type={EFontType.SECONDARY} tag="div">
                                            {item.description}
                                        </Text>
                                        <Text size={ETextSize.B3} type={EFontType.SECONDARY} tag="div">
                                            {item.numberAndDate}
                                        </Text>

                                        <MarkerStatus status={statusToMarker[item.status]} size={EComponentSize.LG}>
                                            {item.statusText}
                                        </MarkerStatus>
                                    </ListItemTable>
                                ))}
                            </List>
                        ) : (
                            <ListEmptyState>
                                <EmptytableSysIcon96 />

                                <Gap size={8} />

                                <Text size={ETextSize.B3}>Ничего не найдено. Попробуйте выбрать другие фильтры.</Text>

                                <Gap size={16} />

                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} onClick={clearFilters}>
                                    Действие
                                </Button>

                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM} onClick={clearFilters}>
                                    Сбросить фильтры
                                </Button>
                            </ListEmptyState>
                        )}
                    </ListMaster.Body>

                    {selectedListItemIds.length ? (
                        <ListMaster.Footer>
                            <ListMaster.FooterDescription>
                                <Text size={ETextSize.B3} weight={EFontWeightText.SEMIBOLD}>
                                    Сумма: {sumSelected.toLocaleString("ru-RU")} RUB
                                </Text>
                            </ListMaster.FooterDescription>

                            <ListMaster.FooterControls>
                                <ButtonDropdown
                                    theme={EButtonDotsTheme.DOTS_SECONDARY}
                                    size={EComponentSize.MD}
                                    options={options}
                                />

                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                    Действие
                                </Button>
                            </ListMaster.FooterControls>
                        </ListMaster.Footer>
                    ) : null}
                </ListMaster>

                {openLightBoxOptions ? (
                    <LightBox>
                        <LightBox.Content>
                            <Page>
                                <Page.Header type={EHeaderPageType.FIRST}>
                                    <Page.Header.Title>
                                        <Page.Header.Title.Content>
                                            <Title size={ETitleSize.H2} tag="div">
                                                Фильтры: {changedFiltersCount}
                                            </Title>
                                        </Page.Header.Title.Content>
                                    </Page.Header.Title>
                                </Page.Header>

                                <Page.Body type={EBodyPageType.FIRST}>
                                    <Text size={ETextSize.B3}>Плательщик и Получатель</Text>

                                    <Gap size={16} />

                                    <ChipGroup>
                                        <ChipSuggest
                                            size={EComponentSize.MD}
                                            label="Счет"
                                            placeholder="Выберите счет"
                                            noOptionsText="Ничего не найдено"
                                            value={accountValue}
                                            options={accountOptions}
                                            tooltipOpen={accountTooltipOpen}
                                            onSelect={setAccountValue}
                                            onFilter={(input) => {
                                                if (!input) {
                                                    const initial = accountInitialOptionsRef.current;
                                                    setAccountOptions(initial);
                                                    setAccountTooltipOpen(false);
                                                    return;
                                                }
                                                const filtered = accountInitialOptionsRef.current.filter((o) =>
                                                    o.label.toLowerCase().includes(input.toLowerCase()),
                                                );
                                                setAccountOptions(filtered);
                                                setAccountTooltipOpen(filtered.length === 0);
                                            }}
                                            targetProps={{ clearSelected: () => setAccountValue(undefined) }}
                                            dropdownProps={{
                                                onOpen: () => {
                                                    setAccountOptions(accountInitialOptionsRef.current);
                                                    setAccountTooltipOpen(false);
                                                },
                                            }}
                                        />

                                        <ChipSuggest
                                            size={EComponentSize.MD}
                                            label="Контрагент"
                                            placeholder="Выберите контрагента"
                                            noOptionsText="Ничего не найдено"
                                            value={counterpartyValue}
                                            options={counterpartyOptions}
                                            tooltipOpen={counterpartyTooltipOpen}
                                            onSelect={setCounterpartyValue}
                                            onFilter={(input) => {
                                                if (!input) {
                                                    const initial = counterpartyInitialOptionsRef.current;
                                                    setCounterpartyOptions(initial);
                                                    setCounterpartyTooltipOpen(false);
                                                    return;
                                                }
                                                const filtered = counterpartyInitialOptionsRef.current.filter((o) =>
                                                    o.label.toLowerCase().includes(input.toLowerCase()),
                                                );
                                                setCounterpartyOptions(filtered);
                                                setCounterpartyTooltipOpen(filtered.length === 0);
                                            }}
                                            targetProps={{ clearSelected: () => setCounterpartyValue(undefined) }}
                                            dropdownProps={{
                                                onOpen: () => {
                                                    setCounterpartyOptions(counterpartyInitialOptionsRef.current);
                                                    setCounterpartyTooltipOpen(false);
                                                },
                                            }}
                                        />
                                    </ChipGroup>

                                    <Gap size={24} />

                                    <Text size={ETextSize.B3}>Статус</Text>

                                    <Gap size={16} />

                                    <ChipMultiselect
                                        clearSelected={() => setMultiselectStatusValues(allStatuses)}
                                        selected={multiselectStatusValues.length !== allStatuses.length}
                                        label="Статус"
                                        displayedValue={`${multiselectStatusValues.length}`}
                                        size={EComponentSize.MD}
                                    >
                                        {({ opened, setOpened, targetRef, dropdownRef }) => (
                                            <MultiselectField.Dropdown
                                                opened={opened}
                                                setOpened={setOpened}
                                                targetRef={targetRef}
                                                ref={dropdownRef}
                                                alignment={EDropdownAlignment.LEFT}
                                            >
                                                <MultiselectField.Dropdown.Content>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                        {statusOptions.map((opt) => {
                                                            const checked = multiselectStatusValues.includes(opt.value);
                                                            return (
                                                                <Checkbox
                                                                    key={opt.id}
                                                                    checked={checked}
                                                                    onChange={(e) => {
                                                                        const nextChecked = e.target.checked;
                                                                        setMultiselectStatusValues((prev) => {
                                                                            if (nextChecked) {
                                                                                if (prev.includes(opt.value))
                                                                                    return prev;
                                                                                return [...prev, opt.value];
                                                                            }
                                                                            return prev.filter((v) => v !== opt.value);
                                                                        });
                                                                    }}
                                                                >
                                                                    {opt.label}
                                                                </Checkbox>
                                                            );
                                                        })}
                                                    </div>
                                                </MultiselectField.Dropdown.Content>
                                            </MultiselectField.Dropdown>
                                        )}
                                    </ChipMultiselect>

                                    <Gap size={24} />

                                    <Text size={ETextSize.B3}>Дата документа</Text>

                                    <Gap size={16} />

                                    <ChipGroup>
                                        <ChipDatePicker
                                            value={dateFrom}
                                            label="Дата с"
                                            onChange={setDateFrom}
                                            alignment={EDropdownAlignment.LEFT}
                                            size={EComponentSize.MD}
                                            status="default"
                                        />

                                        <ChipDatePicker
                                            value={dateTo}
                                            label="Дата по"
                                            onChange={setDateTo}
                                            alignment={EDropdownAlignment.LEFT}
                                            size={EComponentSize.MD}
                                            status="default"
                                        />
                                    </ChipGroup>
                                </Page.Body>

                                <Page.Footer type={EFooterPageType.FIRST}>
                                    <Page.Footer.Description>
                                        <Page.Footer.Description.Controls>
                                            <Button
                                                theme={EButtonTheme.SECONDARY}
                                                size={EComponentSize.MD}
                                                onClick={clearFilters}
                                            >
                                                Сбросить
                                            </Button>

                                            <Button
                                                theme={EButtonTheme.GENERAL}
                                                size={EComponentSize.MD}
                                                onClick={() => setOpenLightBoxOptions(false)}
                                            >
                                                Применить
                                            </Button>
                                        </Page.Footer.Description.Controls>
                                    </Page.Footer.Description>
                                </Page.Footer>
                            </Page>
                        </LightBox.Content>

                        <LightBox.Controls>
                            <LightBox.Controls.Close
                                title="Закрыть"
                                data-test-id="lightbox-close"
                                onClick={() => setOpenLightBoxOptions(false)}
                            />
                        </LightBox.Controls>
                    </LightBox>
                ) : null}
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};
