import React from "react";
import { List, ListItem, ListItemContent } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ maxWidth: "500px" }}>
        <List>
            <ListItem>
                <ListItemContent>Элемент списка</ListItemContent>
            </ListItem>
        </List>
    </div>
);
