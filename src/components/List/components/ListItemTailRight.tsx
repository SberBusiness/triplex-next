import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

interface IListItemTailRightProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
}

/** Хвост listItem, видимый при свайпе влево. Размещается внутри компонента SwipeableArea. */
export const ListItemTailRight = React.forwardRef<HTMLDivElement, IListItemTailRightProps>(
    ({ className, ...rest }, ref) => (
        <span
            className={classnames("cssClass[listItemTail]", "cssClass[listItemTailRight]", className)}
            ref={ref}
            {...rest}
        >
            <span className="cssClass[listItemTailLine]" />
            <span className="cssClass[listItemTailTop]" />
            <span className="cssClass[listItemTailBottom]" />
        </span>
    )
);

ListItemTailRight.displayName = "ListItemTailRight";
