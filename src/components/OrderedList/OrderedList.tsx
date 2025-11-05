import React from "react";
import clsx from "clsx";
import { IOrderedListProps } from "@sberbusiness/triplex-next/components/OrderedList/types";
import { OrderedListItem } from "@sberbusiness/triplex-next/components/OrderedList/OrderedListItem";
import styles from "./styles/OrderedList.module.less";

/** Нумерованный список. */
export const OrderedList = Object.assign(
    React.forwardRef<HTMLOListElement, IOrderedListProps>(({ className, ...restProps }, ref) => (
        <ol
            className={clsx(styles.orderedList, className)}
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
