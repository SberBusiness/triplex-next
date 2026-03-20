import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemLoading.module.less";
import { EComponentSize } from "../../../enums";
import { ELoaderSmallTheme, LoaderSmall } from "../../Loader";

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
            <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />
        </div>
    ),
);

ListItemLoading.displayName = "ListItemLoading";
