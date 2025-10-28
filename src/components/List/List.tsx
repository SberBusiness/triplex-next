import React from "react";
import clsx from "clsx";
import { LoaderWidget } from "@sberbusiness/triplex-next/components/LoaderWidget/LoaderWidget";
import styles from "./styles/List.module.less";

/** Свойства компонента List. */
export interface IListProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Состояние загрузки. Используется при обновлении текущего списка новыми данными, например, после применения фильтра. */
    loading?: boolean;
}

/** Список. */
export const List = React.forwardRef<HTMLUListElement, IListProps>(({ children, className, loading, ...rest }, ref) => (
    <ul className={clsx(styles.list, className)} {...rest} data-tx={process.env.npm_package_version} ref={ref}>
        {children}
        {loading ? <LoaderWidget type="small" /> : null}
    </ul>
));

List.displayName = "List";
