import React from "react";
import clsx from "clsx";
import { IUnorderedListItemProps } from "@sberbusiness/triplex-next/components/UnorderedList/types";
import { Text, ETextSize } from "@sberbusiness/triplex-next/components/Typography";
import styles from "./styles/UnorderedListItem.module.less";

/** Элемент маркированного списка. */
export const UnorderedListItem = React.forwardRef<HTMLLIElement, IUnorderedListItemProps>(
    ({ className, ...restProps }, ref) => (
        <Text
            className={clsx(styles.unorderedListItem, className)}
            size={ETextSize.B3}
            tag="li"
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={ref}
        />
    ),
);

UnorderedListItem.displayName = "UnorderedListItem";
