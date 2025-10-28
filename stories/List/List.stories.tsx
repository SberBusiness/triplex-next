import React, { useMemo, useState } from "react";
import { StoryObj } from "@storybook/react";
import {
    List,
    ListItem,
    ListEmptyState,
    ListSortable,
    ListSortableItem,
    ListSortableItemControls,
} from "../../src/components/List";
import { Button, EButtonSize, EButtonTheme } from "../../src/components/Button";
import { ETextSize, Text } from "../../src/components/Typography";
// import { NotfoundSrvIcon64 } from "@sberbusiness/icons-next";
import { Gap } from "../../src/components/Gap";
import { FixedSizeList } from "react-window";
import { Checkbox } from "../../src/components/Checkbox";

export default {
    title: "Components/List/List",
    component: List,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент List — контейнер для набора элементов. Поддерживает состояние загрузки, пустого списка, выбор элементов и сортировку (drag-and-drop).
                `,
            },
        },
    },
    argTypes: {
        loading: {
            table: {
                disable: true,
            },
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
        docs: { description: { story: "Базовый список с элементами и контролами." } },
    },
};

export const Default: StoryObj<typeof List> = {
    // argTypes: {
    //     loading: {
    //         table: {
    //             disable: true,
    //         },
    //     },
    // },
    render: () => (
        <List>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
        </List>
    ),
    parameters: {
        docs: { description: { story: "Базовый список с элементами и контролами." } },
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
        docs: { description: { story: "Список в состоянии загрузки." } },
    },
};

export const NotFoundState: StoryObj<typeof List> = {
    render: () => (
        <ListEmptyState>
            <div style={{ display: "flex", justifyContent: "center" }}>
                Иллюстрация не найдено
                {/* <NotfoundSrvIcon64 /> */}
            </div>

            <Text size={ETextSize.B2}>
                Ничего не найдено.
                <br />
                Попробуйте выбрать другие фильтры.
            </Text>

            <Gap size={24} />

            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Сбросить фильтры
            </Button>
        </ListEmptyState>
    ),
    parameters: {
        docs: { description: { story: "Используется при применении фильтров, когда не найден ни один элемент." } },
    },
};

export const EmptyState: StoryObj<typeof List> = {
    render: () => (
        <ListEmptyState>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <EmptytableSrvIcon64 /> */}
                Иллюстрация пустого списка
            </div>

            <Text size={ETextSize.B3}>Нет данных, но можно предложить какие-то действия для заполнения таблицы.</Text>

            <Gap size={24} />

            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                Button Name
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Button Name
            </Button>
        </ListEmptyState>
    ),
    parameters: {
        docs: {
            description: {
                story: "Используется, когда еще нет данных для отображения хотя бы одного элемента списка.",
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
        docs: {
            description: {
                story: "Используется, когда еще нет данных для отображения хотя бы одного элемента списка.",
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
};
