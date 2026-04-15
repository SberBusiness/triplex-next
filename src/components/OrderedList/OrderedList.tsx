import React from "react";
import clsx from "clsx";
import { IOrderedListProps } from "@sberbusiness/triplex-next/components/OrderedList/types";
import { OrderedListItem } from "@sberbusiness/triplex-next/components/OrderedList/OrderedListItem";
import styles from "./styles/OrderedList.module.less";

/** Нумерованный список. */
export const OrderedList = Object.assign(
    React.forwardRef<HTMLOListElement, IOrderedListProps>(({ className, start, style, ...restProps }, ref) => (
        <ol
            className={clsx(styles.orderedList, className)}
            start={start}
            style={
                start !== undefined
                    ? {
                          ...style,
                          ["--start-index-tx" as keyof React.CSSProperties]: start - 1,
                      }
                    : style
            }
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={ref}
        />
    )),
    {
        Item: OrderedListItem,
    },
);

OrderedList.displayName = "OrderedList";
