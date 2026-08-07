import React from "react";
import clsx from "clsx";
import { IUnorderedListExtendedItemProps } from "./types";
import { Text, ETextSize } from "../Typography";
import { UnorderedListExtendedItemMarker } from "./UnorderedListExtendedItemMarker";
import styles from "./styles/UnorderedListExtendedItem.module.less";

const UnorderedListExtendedItemRoot = React.forwardRef<HTMLLIElement, IUnorderedListExtendedItemProps>(
    ({ className, size = ETextSize.B3, ...restProps }, ref) => (
        <Text
            className={clsx(styles.unorderedListExtendedItem, className)}
            size={size}
            tag="li"
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={ref}
        />
    ),
);

UnorderedListExtendedItemRoot.displayName = "UnorderedListExtendedItem";

/** Элемент расширенного маркированного списка. */
export const UnorderedListExtendedItem = Object.assign(UnorderedListExtendedItemRoot, {
    Marker: UnorderedListExtendedItemMarker,
});
