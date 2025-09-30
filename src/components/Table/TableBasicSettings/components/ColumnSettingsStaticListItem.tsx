import React from "react";
import { clsx } from "clsx";
import { ListItem } from "@sberbusiness/triplex-next/components/List/components/ListItem";
import styles from "../styles/ColumnSettingsStaticListItem.module.less";
import { IColumnSettingsStaticListItemProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/** Элемент компонента ColumnSettingsStaticList. */
export const ColumnSettingsStaticListItem = React.forwardRef<HTMLLIElement, IColumnSettingsStaticListItemProps>(
    ({ className, ...rest }, ref) => {
        return <ListItem className={clsx(styles.columnSettingsStaticListItem, className)} {...rest} ref={ref} />;
    },
);

ColumnSettingsStaticListItem.displayName = "ColumnSettingsStaticListItem";
