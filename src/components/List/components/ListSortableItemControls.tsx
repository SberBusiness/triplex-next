import React from "react";
import clsx from "clsx";
import styles from "../styles/ListSortableItemControls.module.less";

/** Свойства компонента ListSortableItemControls. */
export interface IListSortableItemControls extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с интерактивными элементами ListSortableItem. */
export const ListSortableItemControls = React.forwardRef<HTMLDivElement, IListSortableItemControls>(
    ({ className, ...rest }, ref) => {
        return (
            <div
                className={clsx(styles.listSortableItemControls, className)}
                data-draggable="false"
                {...rest}
                ref={ref}
            />
        );
    }
);

ListSortableItemControls.displayName = "ListSortableItemControls";
