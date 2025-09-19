import React from "react";
import { DragdropSrvIcon20 } from "@sberbusiness/icons/DragdropSrvIcon20";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

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
            className={classnames(
                "cssClass[listSortableItemTarget]",
                { ["cssClass[dragging]"]: dragging },
                "hoverable",
                className
            )}
            {...rest}
            ref={ref}
        >
            <div className="cssClass[listSortableItemTargetContent]">{children}</div>
            {!disabled && <DragdropSrvIcon20 className="cssClass[listSortableItemTargetIcon]" />}
        </div>
    )
);

ListSortableItemTarget.displayName = "ListSortableItemTarget";
