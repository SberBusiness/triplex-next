import React, { useState } from "react";
import { Checkbox, ListSortable, ListSortableItem, ListSortableItemControls } from "@sberbusiness/triplex-next";

export const SortableWithInteractiveElements = () => {
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
};
