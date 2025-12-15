import React, { useMemo, useState } from "react";
import { StoryObj } from "@storybook/react";
import { Controls, Description, Primary, Stories, Subtitle, Title as SBTitle } from "@storybook/addon-docs/blocks";
import {
    List,
    ListItem,
    ListEmptyState,
    ListSortable,
    ListSortableItem,
    ListSortableItemControls,
} from "../../src/components/List";
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { EFontWeightTitle, ETextSize, ETitleSize, Text, Title } from "../../src/components/Typography";
import { EmptytableSysIcon96 } from "@sberbusiness/icons-next";
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
            page: () => (
                <>
                    <SBTitle />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
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
        controls: {
            include: ["loading"],
        },
        docs: { description: { story: "Базовый список с элементами и контролами." } },
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
        controls: { disable: true },
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
    parameters: {
        controls: { disable: true },
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
    },
};
