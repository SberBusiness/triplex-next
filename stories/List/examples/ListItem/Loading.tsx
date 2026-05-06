import React from "react";
import { List, ListItem, ListItemLoading } from "@sberbusiness/triplex-next";

export const Loading = () => (
    <div style={{ maxWidth: "500px" }}>
        <List>
            <ListItem>
                <ListItemLoading />
            </ListItem>
        </List>
    </div>
);
