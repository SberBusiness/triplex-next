import React from "react";
import { DotsverticalStrokeSrvIcon20} from "@sberbusiness/icons-next";
import clsx from "clsx";
import styles from "../styles/ListSortableItemTarget.module.less";

/** Свойства компонента ListSortableItemTarget. */
export interface IListSortableItemTargetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние перетаскивания. */
    dragging: boolean;
    /** Неактивное состояние. */
    disabled?: boolean;
}

/** Целевой элемент ListSortableItem. */
export const ListSortableItemTarget = React.forwardRef<HTMLDivElement, IListSortableItemTargetProps>(
    ({ children, className, disabled, dragging, ...rest }, ref) => (
        <div
            className={clsx(
                styles.listSortableItemTarget,
                { [styles.dragging]: dragging },
                "hoverable",
                className
            )}
            {...rest}
            ref={ref}
        >
            <div className={styles.listSortableItemTargetContent}>{children}</div>
            {!disabled && <DotsverticalStrokeSrvIcon20 className={styles.listSortableItemTargetIcon} />}
        </div>
    )
);

ListSortableItemTarget.displayName = "ListSortableItemTarget";
