import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import {
    List,
    ListItem,
    ListItemContent,
    ListItemControls,
    ListItemSelectable,
    ListEmptyState,
    ListSortable,
    ListSortableItem,
} from "../src/components/List";
import { Button, EButtonSize, EButtonTheme } from "../src/components/Button";
import { Text } from "../src/components/Typography";

export default {
    title: "Components/List",
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
} as const;

export const Basic: StoryObj<typeof List> = {
    render: () => (
        <List>
            {[1, 2, 3].map((id) => (
                <ListItem key={id}>
                    <ListItemContent>
                        <Text>Item {id}</Text>
                    </ListItemContent>
                    <ListItemControls>
                        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                            Action
                        </Button>
                    </ListItemControls>
                </ListItem>
            ))}
        </List>
    ),
    parameters: {
        docs: { description: { story: "Базовый список с элементами и контролами." } },
    },
};

export const Loading: StoryObj<typeof List> = {
    render: () => (
        <List loading>
            {[1, 2, 3].map((id) => (
                <ListItem key={id}>
                    <ListItemContent>
                        <Text>Item {id}</Text>
                    </ListItemContent>
                </ListItem>
            ))}
        </List>
    ),
    parameters: {
        docs: { description: { story: "Список в состоянии загрузки." } },
    },
};

export const EmptyState: StoryObj<typeof List> = {
    render: () => (
        <List>
            <ListEmptyState>
                <Text>Ничего не найдено</Text>
            </ListEmptyState>
        </List>
    ),
    parameters: {
        docs: { description: { story: "Пустой список с состоянием EmptyState." } },
    },
};

export const Selectable: StoryObj<typeof List> = {
    render: () => {
        const [selectedIds, setSelectedIds] = useState<string[]>([]);
        const items = [
            { id: "1", title: "Document 1" },
            { id: "2", title: "Document 2" },
            { id: "3", title: "Document 3" },
        ];

        const handleToggle = (id: string, next: boolean) => {
            setSelectedIds((prev) => (next ? [...prev, id] : prev.filter((x) => x !== id)));
        };

        return (
            <List>
                {items.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                        <ListItem key={item.id}>
                            <ListItemSelectable selected={isSelected} onSelect={(next) => handleToggle(item.id, next)}>
                                <ListItemContent>
                                    <Text>{item.title}</Text>
                                </ListItemContent>
                            </ListItemSelectable>
                        </ListItem>
                    );
                })}
            </List>
        );
    },
    parameters: {
        docs: { description: { story: "Элементы списка c выбором (checkbox)." } },
    },
};

type SortableItem = { id: string; title: string };

export const Sortable: StoryObj = {
    render: () => {
        const [items, setItems] = useState<SortableItem[]>([
            { id: "1", title: "Row 1" },
            { id: "2", title: "Row 2" },
            { id: "3", title: "Row 3" },
        ]);

        return (
            <ListSortable items={items} onItemsChange={setItems}>
                {items.map((item) => (
                    <ListSortableItem id={item.id} key={item.id}>
                        {({ dragging, setActivatorNodeRef, listeners }) => (
                            <>
                                <ListSortableItem.Target dragging={dragging} {...listeners} ref={setActivatorNodeRef}>
                                    <Text>{item.title}</Text>
                                </ListSortableItem.Target>
                            </>
                        )}
                    </ListSortableItem>
                ))}
            </ListSortable>
        );
    },
    parameters: {
        docs: { description: { story: "Сортируемый список с drag-and-drop." } },
    },
};


