import React from "react";
import { List, ListItem, ListItemContent, ListItemAction } from "@sberbusiness/triplex-next";

export const Action = () => (
    <div style={{ maxWidth: "500px" }}>
        <List>
            <ListItem>
                <ListItemAction onClick={() => alert("Клик по элементу списка")}>
                    <ListItemContent>Элемент списка</ListItemContent>
                </ListItemAction>
            </ListItem>
        </List>
    </div>
);
