import React from "react";
import clsx from "clsx";
import styles from "../styles/ListEmptyState.module.less";

/** Свойства компонента ListEmptyState. */
export interface IListEmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Элемент, отображающий пустой список.
 * Используется при применении фильтров, когда не найден ни один элемент.
 * */
export const ListEmptyState = React.forwardRef<HTMLDivElement, IListEmptyStateProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.listEmptyState, className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

ListEmptyState.displayName = "ListEmptyState";
