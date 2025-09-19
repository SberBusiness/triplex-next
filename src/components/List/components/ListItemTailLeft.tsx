import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

interface IListItemTailLeftProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
}

/** Хвост listItem, видимый при свайпе вправо. Размещается внутри компонента SwipeableArea. */
export const ListItemTailLeft = React.forwardRef<HTMLDivElement, IListItemTailLeftProps>(
    ({ className, ...rest }, ref) => (
        <span
            className={classnames("cssClass[listItemTail]", "cssClass[listItemTailLeft]", className)}
            ref={ref}
            {...rest}
        >
            <span className="cssClass[listItemTailLine]" />
            <span className="cssClass[listItemTailTop]" />
            <span className="cssClass[listItemTailBottom]" />
        </span>
    )
);

ListItemTailLeft.displayName = "ListItemTailLeft";
