import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemTail.module.less";

interface IListItemTailRightProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
    visible?: boolean;
}

/** Хвост listItem, видимый при свайпе влево. Размещается внутри компонента SwipeableArea. */
export const ListItemTailRight = React.forwardRef<HTMLDivElement, IListItemTailRightProps>(
    ({ className, visible, ...rest }, ref) => (
        <span
            className={clsx(styles.listItemTail, styles.listItemTailRight, className, {
                [styles.visible]: visible,
            })}
            ref={ref}
            {...rest}
        >
            <span className={styles.listItemTailLine} />
            <span className={styles.listItemTailTop} />
            <span className={styles.listItemTailBottom} />
        </span>
    ),
);

ListItemTailRight.displayName = "ListItemTailRight";
