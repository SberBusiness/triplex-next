import React from "react";
import { List, ListItem } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs {
    loading: boolean;
}

export const Playground = ({ loading }: PlaygroundArgs) => (
    <List loading={loading} style={{ width: "500px" }}>
        <ListItem>Элемент списка</ListItem>
        <ListItem>Элемент списка</ListItem>
        <ListItem>Элемент списка</ListItem>
    </List>
);
