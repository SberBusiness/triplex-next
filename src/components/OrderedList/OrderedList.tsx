import React from "react";
import clsx from "clsx";
import { IOrderedListProps } from "@sberbusiness/triplex-next/components/OrderedList/types";
import { OrderedListItem } from "@sberbusiness/triplex-next/components/OrderedList/OrderedListItem";
import styles from "./styles/OrderedList.module.less";

interface IOrderedListStyle extends React.CSSProperties {
    "--triplex-next-runtime-OrderedList-Root_CounterReset": number;
}

/** Нумерованный список. */
export const OrderedList = Object.assign(
    React.forwardRef<HTMLOListElement, IOrderedListProps>(({ className, start, style, ...restProps }, ref) => {
        // Каждый пункт увеличивает счётчик до вывода номера, поэтому сброс — на единицу меньше start.
        const orderedListStyle =
            start !== undefined
                ? ({
                      ...style,
                      "--triplex-next-runtime-OrderedList-Root_CounterReset": start - 1,
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
