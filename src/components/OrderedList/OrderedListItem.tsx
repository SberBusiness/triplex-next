import React from "react";
import clsx from "clsx";
import { IOrderedListItemProps } from "@sberbusiness/triplex-next/components/OrderedList/types";
import { Text, ETextSize } from "@sberbusiness/triplex-next/components/Typography";
import styles from "./styles/OrderedListItem.module.less";

/** Элемент нумерованного списка. */
export const OrderedListItem = React.forwardRef<HTMLLIElement, IOrderedListItemProps>(
    ({ className, ...restProps }, ref) => (
        <Text
            className={clsx(styles.orderedListItem, className)}
            size={ETextSize.B3}
            tag="li"
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={ref}
        />
    ),
);

OrderedListItem.displayName = "OrderedListItem";
