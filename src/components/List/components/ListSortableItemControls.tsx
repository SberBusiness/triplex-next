import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента ListSortableItemControls. */
export interface IListSortableItemControls extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с интерактивными элементами ListSortableItem. */
export const ListSortableItemControls = React.forwardRef<HTMLDivElement, IListSortableItemControls>(
    ({ className, ...rest }, ref) => {
        return (
            <div
                className={classnames("cssClass[listSortableItemControls]", className)}
                data-draggable="false"
                {...rest}
                ref={ref}
            />
        );
    }
);

ListSortableItemControls.displayName = "ListSortableItemControls";
