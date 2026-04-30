import React from "react";
import { FixedSizeList } from "react-window";
import { List, ListItem } from "@sberbusiness/triplex-next";

const itemData = Array.from({ length: 100 }).map((_, index) => `List item ${index}`);

export const Virtualized = () => (
    <FixedSizeList
        itemData={itemData}
        itemCount={itemData.length}
        itemSize={20}
        width="100%"
        height={200}
        innerElementType={List}
    >
        {({ data, index, style }) => <ListItem style={style}>{data[index]}</ListItem>}
    </FixedSizeList>
);
