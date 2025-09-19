import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

interface IListItemControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер с кнопками действий. */
export const ListItemControls = React.forwardRef<HTMLDivElement, IListItemControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[listItemControls]", className)} {...rest} ref={ref}>
            {children}
        </div>
    )
);

ListItemControls.displayName = "ListItemControls";
