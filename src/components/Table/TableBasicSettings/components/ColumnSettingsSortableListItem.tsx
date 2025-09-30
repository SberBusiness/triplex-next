import React from "react";
import {
    ListSortableItem,
    IListSortableItemProps,
} from "@sberbusiness/triplex-next/components/List/components/ListSortableItem";
import { IListSortableItemControls } from "@sberbusiness/triplex-next/components/List/components/ListSortableItemControls";
import { ColumnSettingsSortableListItemTarget } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/ColumnSettingsSortableListItemTarget";
import { ExpandAnimation } from "@sberbusiness/triplex-next/components/ExpandAnimation/ExpandAnimation";

/** Свойства компонента ColumnSettingsSortableListItem. */
export interface IColumnSettingsSortableListItemProps
    extends Omit<IListSortableItemProps, "children">,
        Pick<IListSortableItemControls, "children"> {
    /** Статичное содержимое, скрывается при перетаскивании. */
    staticContent?: React.ReactNode;
}

/** Элемент компонента ColumnSettingsSortableList. */
export const ColumnSettingsSortableListItem = React.forwardRef<HTMLLIElement, IColumnSettingsSortableListItemProps>(
    ({ children, staticContent, ...rest }, ref) => {
        return (
            <ListSortableItem {...rest} ref={ref}>
                {({ listeners, dragging, disabled, setActivatorNodeRef }) => (
                    <>
                        <ColumnSettingsSortableListItemTarget
                            {...listeners}
                            dragging={dragging}
                            disabled={disabled}
                            ref={setActivatorNodeRef}
                        >
                            {children}
                        </ColumnSettingsSortableListItemTarget>
                        {staticContent && <ExpandAnimation expanded={!dragging}>{staticContent}</ExpandAnimation>}
                    </>
                )}
            </ListSortableItem>
        );
    },
);

ColumnSettingsSortableListItem.displayName = "ColumnSettingsSortableListItem";
