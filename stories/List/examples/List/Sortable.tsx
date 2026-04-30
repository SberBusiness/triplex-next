import React, { useState } from "react";
import { ListSortable, ListSortableItem } from "@sberbusiness/triplex-next";

export const Sortable = () => {
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
};
