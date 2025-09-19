import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { SpinnerWidget } from "@sber-business/triplex/components/SpinnerWidget/SpinnerWidget";
import { ESpinnerSize } from "@sber-business/triplex/components/Spinner/enum";

/** Свойства компонента ListItemLoading. */
export interface IListItemLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
}

/**
 * Спиннер для элемента списка.
 * Используется, как последний элемент при подгрузке новых данных.
 * */
export const ListItemLoading = React.forwardRef<HTMLDivElement, IListItemLoadingProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[listItemLoading]", className)} {...rest} ref={ref}>
            <SpinnerWidget size={ESpinnerSize.SM} />
        </div>
    )
);

ListItemLoading.displayName = "ListItemLoading";
