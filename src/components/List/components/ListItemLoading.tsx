import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemLoading.module.less";
import { LoaderScreen } from "@sberbusiness/triplex-next/components/LoaderScreen/LoaderScreen";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

/** Свойства компонента ListItemLoading. */
export interface IListItemLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
}

/**
 * Спиннер для элемента списка.
 * Используется, как последний элемент при подгрузке новых данных.
 * */
export const ListItemLoading = React.forwardRef<HTMLDivElement, IListItemLoadingProps>(
    ({ className, ...rest }, ref) => (
        <div className={clsx(styles.listItemLoading, className)} {...rest} ref={ref}>
            <LoaderScreen type="small" size={EComponentSize.MD} />
        </div>
    ),
);

ListItemLoading.displayName = "ListItemLoading";
