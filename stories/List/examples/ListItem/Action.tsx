import React from "react";
import { List, ListActionItem } from "@sberbusiness/triplex-next";

export const Action = () => (
    <div style={{ maxWidth: "500px" }}>
        <List>
            <ListActionItem listItemContentProps={{ onClick: () => alert("Клик по элементу списка") }}>
                Элемент списка
            </ListActionItem>
        </List>
    </div>
);
