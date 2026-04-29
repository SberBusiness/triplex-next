import React, { useMemo } from "react";
import { FixedSizeList } from "react-window";
import { List, ListItem } from "@sberbusiness/triplex-next";

export const VirtualizedExample = () => {
    const itemData = useMemo(() => Array.from({ length: 100 }).map((_, index) => `List item ${index}`), []);

    return (
        <FixedSizeList
            itemData={itemData}
            itemCount={100}
            itemSize={20}
            width="100%"
            height={200}
            innerElementType={List}
        >
            {({ data, index, style }) => <ListItem style={style}>{data[index]}</ListItem>}
        </FixedSizeList>
    );
};
