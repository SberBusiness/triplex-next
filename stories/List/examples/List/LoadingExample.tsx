import React from "react";
import { List, ListItem } from "@sberbusiness/triplex-next";

export const LoadingExample = () => (
    <div style={{ width: "150px" }}>
        <List loading>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
            <ListItem>Элемент списка</ListItem>
        </List>
    </div>
);
