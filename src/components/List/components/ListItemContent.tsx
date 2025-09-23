import React, { useContext } from "react";
import clsx from "clsx";
import styles from "../styles/ListItemContent.module.less";
import { ListItemContext } from "@sberbusiness/triplex-next/components/List/components/ListItemContext";

interface IListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контент элемента списка. */
export const ListItemContent = React.forwardRef<HTMLDivElement, IListItemContentProps>(
    ({ children, className, ...rest }, ref) => {
        const { selected } = useContext(ListItemContext);

        return (
            <div
                className={clsx(styles.listItemContent, { [styles.selected]: selected }, className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

ListItemContent.displayName = "ListItemContent";
