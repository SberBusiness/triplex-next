import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { SpinnerWidget } from "@sber-business/triplex/components/SpinnerWidget/SpinnerWidget";

/** Свойства компонента List. */
export interface IListProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Состояние загрузки. Используется при обновлении текущего списка новыми данными, например, после применения фильтра. */
    loading?: boolean;
}

/** Список. */
export const List = React.forwardRef<HTMLUListElement, IListProps>(({ children, className, loading, ...rest }, ref) => (
    <ul
        className={classnames("cssClass[list]", className)}
        {...rest}
        data-tx={process.env.npm_package_version}
        ref={ref}
    >
        {children}
        {loading ? <SpinnerWidget /> : null}
    </ul>
));

List.displayName = "List";
