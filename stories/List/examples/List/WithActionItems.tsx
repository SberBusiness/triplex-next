import React from "react";
import { List, ListActionItem } from "@sberbusiness/triplex-next";

export const WithActionItems = () => (
    <div style={{ maxWidth: "500px" }}>
        <List>
            {Array.from({ length: 5 }, (_, index) => (
                <ListActionItem
                    key={index}
                    listItemContentProps={{ onClick: () => alert(`Клик по элементу списка ${index}`) }}
                >
                    Элемент списка {index}
                </ListActionItem>
            ))}
        </List>
    </div>
);
