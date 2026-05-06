import React, { useState } from "react";
import { List, ListItem, ListItemContent, ListItemSelectable } from "@sberbusiness/triplex-next";

export const Selectable = () => {
    const [selected, setSelected] = useState(false);

    return (
        <div style={{ maxWidth: "500px" }}>
            <List>
                <ListItem>
                    <ListItemSelectable selected={selected} onSelect={setSelected}>
                        <ListItemContent>Элемент списка</ListItemContent>
                    </ListItemSelectable>
                </ListItem>
            </List>
        </div>
    );
};
