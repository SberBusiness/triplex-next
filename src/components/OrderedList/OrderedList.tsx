import React from "react";
import clsx from "clsx";
import { IOrderedListProps } from "@sberbusiness/triplex-next/components/OrderedList/types";
import { OrderedListItem } from "@sberbusiness/triplex-next/components/OrderedList/OrderedListItem";
import styles from "./styles/OrderedList.module.less";

interface IOrderedListStyle extends React.CSSProperties {
    "--start-index-tx": number;
}

/** Нумерованный список. */
export const OrderedList = Object.assign(
    React.forwardRef<HTMLOListElement, IOrderedListProps>(({ className, start, style, ...restProps }, ref) => {
        const orderedListStyle =
            start !== undefined
                ? ({
                      ...style,
                      "--start-index-tx": start - 1,
                  } satisfies IOrderedListStyle)
                : style;

        return (
            <ol
                className={clsx(styles.orderedList, className)}
                start={start}
                style={orderedListStyle}
                {...restProps}
                data-tx={process.env.npm_package_version}
                ref={ref}
            />
        );
    }),
    {
        Item: OrderedListItem,
    },
);

OrderedList.displayName = "OrderedList";
