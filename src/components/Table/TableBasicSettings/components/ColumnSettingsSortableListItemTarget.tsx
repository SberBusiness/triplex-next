import React from "react";
import { ListSortableItemTarget, IListSortableItemTargetProps } from "../../../List/components/ListSortableItemTarget";
import { ListSortableItemControls } from "../../../List/components/ListSortableItemControls";
import { clsx } from "clsx";
import styles from "../styles/ColumnSettingsSortableListItemTarget.module.less";

/** Свойства компонента ColumnSettingsSortableListItemTarget. */
export interface IColumnSettingsSortableListItemTargetProps extends IListSortableItemTargetProps {}

/** Целевой элемент компонента ColumnSettingsSortableListItem. */
export const ColumnSettingsSortableListItemTarget = React.forwardRef<
    HTMLDivElement,
    IColumnSettingsSortableListItemTargetProps
>(({ children, className, dragging, ...restProps }, ref) => (
    <ListSortableItemTarget
        className={clsx(styles.columnSettingsSortableListItemTarget, { [styles.dragging]: dragging }, className)}
        dragging={dragging}
        {...restProps}
        ref={ref}
    >
        <ListSortableItemControls>{children}</ListSortableItemControls>
    </ListSortableItemTarget>
));

ColumnSettingsSortableListItemTarget.displayName = "ColumnSettingsSortableListItemTarget";
