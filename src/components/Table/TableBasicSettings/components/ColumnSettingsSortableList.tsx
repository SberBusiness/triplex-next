import React, { useMemo } from "react";
import {
    IColumnSettingsSortableListProps,
    ITableBasicExtendedColumn,
    ITableBasicColumn,
} from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { ColumnSettingsSortableListItem } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/ColumnSettingsSortableListItem";
import { ListSortable } from "@sberbusiness/triplex-next/components/List/ListSortable";

/** Список компонента ColumnSettings с поддержкой drag-n-drop. */
export const ColumnSettingsSortableList = Object.assign(
    React.forwardRef<HTMLUListElement, IColumnSettingsSortableListProps>(function TableBasicSettingsList(
        { columns, onColumnsChange, ...rest },
        ref,
    ) {
        const items: ITableBasicExtendedColumn[] = useMemo(
            () => columns.map((column) => ({ id: column.fieldKey, ...column })),
            [columns],
        );

        const handleItemsChange = (newExtendedColumns: ITableBasicExtendedColumn[]) => {
            const newColumns: ITableBasicColumn[] = newExtendedColumns.map(({ id, ...column }) => column);

            onColumnsChange(newColumns);
        };

        return <ListSortable items={items} onItemsChange={handleItemsChange} {...rest} ref={ref} />;
    }),
    {
        Item: ColumnSettingsSortableListItem,
    },
);

ColumnSettingsSortableList.displayName = "ColumnSettingsSortableList";
