import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemTail.module.less";

interface IListItemTailLeftProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
}

/** Хвост listItem, видимый при свайпе вправо. Размещается внутри компонента SwipeableArea. */
export const ListItemTailLeft = React.forwardRef<HTMLDivElement, IListItemTailLeftProps>(
    ({ className, ...rest }, ref) => (
        <span
            className={clsx(styles.listItemTail, styles.listItemTailLeft, className)}
            ref={ref}
            {...rest}
        >
            <span className={styles.listItemTailLine} />
            <span className={styles.listItemTailTop} />
            <span className={styles.listItemTailBottom} />
        </span>
    )
);

ListItemTailLeft.displayName = "ListItemTailLeft";
