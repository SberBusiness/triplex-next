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
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { EFontType, EFontWeightTitle, ETextSize, ETitleSize, Text, Title } from "../../src/components/Typography";
import {
    AttachmentStrokeSrvIcon20,
    DotshorizontalStrokeSrvIcon20,
    EmptytableSysIcon96,
} from "@sberbusiness/icons-next";
import { Gap } from "../../src/components/Gap";
import { FixedSizeList } from "react-window";
import { Checkbox } from "../../src/components/Checkbox";
import { MarkerStatus } from "../../src/components/MarkerStatus";
import { EMarkerStatus } from "../../src/components/Marker/enums";

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
        <List loading={args.loading} style={{ width: "150px" }}>
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
        <List>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
        </List>
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

        const items = Array.from({ length: 5 }, (_, index) => ({ id: `list-example-item-1-${index}` }));

        const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

        const toggleSelect = (id: string) => {
            setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.includes(id) ? prevSelectedIds.filter((x) => x !== id) : [...prevSelectedIds, id],
            );
        };

        return (
            <div style={{ maxWidth: "400px" }}>
                <List>
                    {items.map(({ id }, index) => (
                        <ListItemTable
                            id={id}
                            key={id}
                            {...(index !== 0
                                ? {
                                      selected: selectedIds.includes(id),
                                      onSelect: () => toggleSelect(id),
                                  }
                                : {})}
                            onClickItem={() => console.log("Клик по карточке.")}
                            controlButtons={
                                <>
                                    <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                                        Скачать
                                    </ListItemControlsButton>
                                    <ListItemControlsButtonDropdown
                                        icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                                        options={options}
                                    >
                                        Действия
                                    </ListItemControlsButtonDropdown>
                                </>
                            }
                        >
                            <Title size={ETitleSize.H2}>1 220 000 000 RUB</Title>

                            <Text size={ETextSize.B3} tag="div">
                                №1 ООО Голубая Роза Голубая
                            </Text>
                            <Text size={ETextSize.B3} tag="div">
                                Длинное назначение платежа
                            </Text>
                            <Text size={ETextSize.B3} type={EFontType.SECONDARY} tag="div">
                                НДС не облагается
                            </Text>
                            <Text size={ETextSize.B3} tag="div" type={EFontType.SECONDARY}>
                                40702 810 2 0527 5000000 от 09.04.24
                            </Text>
                            <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.LG}>
                                Status text
                            </MarkerStatus>
                        </ListItemTable>
                    ))}
                </List>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список, состоящий из элементов для отображения табличных данных на мобильных устройствах, в том числе с возможностью выбора элемента.",
            },
        },
    },
};
