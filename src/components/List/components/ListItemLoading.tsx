import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemLoading.module.less";
import { LoaderWidget } from "@sberbusiness/triplex-next/components/LoaderWidget/LoaderWidget";
import { ELoaderSmallSize } from "@sberbusiness/triplex-next/components/Loader/LoaderSmall/enum";

/** Свойства компонента ListItemLoading. */
export interface IListItemLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
}

/**
 * Спиннер для элемента списка.
 * Используется, как последний элемент при подгрузке новых данных.
 * */
//@TODO: Добавить лоадер.
export const ListItemLoading = React.forwardRef<HTMLDivElement, IListItemLoadingProps>(
    ({ className, ...rest }, ref) => (
        <div className={clsx(styles.listItemLoading, className)} {...rest} ref={ref}>
            <LoaderWidget type="small" size={ELoaderSmallSize.MD} />
        </div>
    ),
);

ListItemLoading.displayName = "ListItemLoading";
