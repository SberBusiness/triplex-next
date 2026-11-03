import React from "react";
import { ListSortableItem, IListSortableItemProps } from "../../../List/components/ListSortableItem";
import { IListSortableItemControls } from "../../../List/components/ListSortableItemControls";
import { ExpandAnimation } from "../../../ExpandAnimation/ExpandAnimation";
import { ColumnSettingsSortableListItemTarget } from "./ColumnSettingsSortableListItemTarget";

/** Свойства компонента ColumnSettingsSortableListItem. */
export interface IColumnSettingsSortableListItemProps
    extends Omit<IListSortableItemProps, "children">, Pick<IListSortableItemControls, "children"> {
    /** Дополнительное содержимое, сворачивается при перетаскивании. Анимация создаётся только для truthy-значений. */
    staticContent?: React.ReactNode;
}

/**
 * Элемент настроек колонки: передаёт drag-listeners и activator-ref на target, а children защищает от начала drag.
 * staticContent остаётся смонтированным при перетаскивании и сворачивается через ExpandAnimation. ref указывает на li.
 */
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
