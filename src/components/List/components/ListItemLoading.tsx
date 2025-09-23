import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemLoading.module.less";
// import { SpinnerWidget } from "@sberbusiness/triplex-next/components/SpinnerWidget/SpinnerWidget";
// import { ESpinnerSize } from "@sberbusiness/triplex-next/components/Spinner/enum";

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
    ({className, ...rest }, ref) => (
        <div className={clsx(styles.listItemLoading, className)} {...rest} ref={ref}>
            Лоадер
            {/* <SpinnerWidget size={ESpinnerSize.SM} /> */}
        </div>
    )
);

ListItemLoading.displayName = "ListItemLoading";
