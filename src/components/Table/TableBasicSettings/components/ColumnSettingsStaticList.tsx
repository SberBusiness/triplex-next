import React from "react";
import { List } from "@sberbusiness/triplex-next/components/List/List";
import { IColumnSettingsStaticListProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { ColumnSettingsStaticListItem } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/ColumnSettingsStaticListItem";

/** Статичный список компонента ColumnSettings */
export const ColumnSettingsStaticList = Object.assign(
    React.forwardRef<HTMLUListElement, IColumnSettingsStaticListProps>(function ColumnSettingsStaticList(
        { style, depth = 0, ...rest },
        ref,
    ) {
        return <List style={{ paddingLeft: `${12 + 12 * depth}px`, ...style }} {...rest} ref={ref} />;
    }),
    {
        Item: ColumnSettingsStaticListItem,
    },
);

ColumnSettingsStaticList.displayName = "ColumnSettingsStaticList";
