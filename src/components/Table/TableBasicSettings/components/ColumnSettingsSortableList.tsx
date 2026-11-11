import React, { useMemo } from "react";
import { IColumnSettingsSortableListProps, ITableBasicExtendedColumn, ITableBasicColumn } from "../../TableBasic/types";
import { ColumnSettingsSortableListItem } from "./ColumnSettingsSortableListItem";
import { ListSortable } from "../../../List/ListSortable";

/**
 * Контролируемый список колонок с drag-and-drop: fieldKey служит идентификатором ListSortable.
 * Элементы ColumnSettings.SortableList.Item рендерит потребитель; новый порядок возвращается в onColumnsChange.
 */
export const ColumnSettingsSortableList = Object.assign(
    React.forwardRef<HTMLUListElement, IColumnSettingsSortableListProps>(function ColumnSettingsSortableList(
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
