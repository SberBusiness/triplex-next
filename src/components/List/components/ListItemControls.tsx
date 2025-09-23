import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemControls.module.less";

interface IListItemControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер с кнопками действий. */
export const ListItemControls = React.forwardRef<HTMLDivElement, IListItemControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.listItemControls, className)} {...rest} ref={ref}>
            {children}
        </div>
    )
);

ListItemControls.displayName = "ListItemControls";
