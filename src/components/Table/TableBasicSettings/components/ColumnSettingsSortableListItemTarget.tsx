import React from "react";
import {
    ListSortableItemTarget,
    IListSortableItemTargetProps,
} from "@sberbusiness/triplex-next/components/List/components/ListSortableItemTarget";
import { ListSortableItemControls } from "@sberbusiness/triplex-next/components/List/components/ListSortableItemControls";
import { clsx } from "clsx";
import styles from "../styles/ColumnSettingsSortableListItemTarget.module.less";

/** Свойства компонента ColumnSettingsSortableListItemTarget. */
export interface ITableBasicSettingsListItemProps extends IListSortableItemTargetProps {}

/** Целевой элемент компонента ColumnSettingsSortableListItem. */
export const ColumnSettingsSortableListItemTarget = React.forwardRef<HTMLDivElement, ITableBasicSettingsListItemProps>(
    ({ children, className, style, dragging, ...rest }, ref) => {
        return (
            <ListSortableItemTarget
                className={clsx(
                    styles.columnSettingsSortableListItemTarget,
                    { [styles.dragging]: dragging },
                    className,
                )}
                dragging={dragging}
                {...rest}
                ref={ref}
            >
                <ListSortableItemControls>{children}</ListSortableItemControls>
            </ListSortableItemTarget>
        );
    },
);

ColumnSettingsSortableListItemTarget.displayName = "ColumnSettingsSortableListItemTarget";
