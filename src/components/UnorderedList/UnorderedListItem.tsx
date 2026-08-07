import React from "react";
import { IUnorderedListItemProps } from "./types";
import { UnorderedListExtended } from "../UnorderedListExtended";
import { ETextSize } from "../Typography";

/** Элемент маркированного списка. */
export const UnorderedListItem = React.forwardRef<HTMLLIElement, IUnorderedListItemProps>(
    ({ children, marker, ...restProps }, ref) => (
        <UnorderedListExtended.Item size={ETextSize.B3} {...restProps} ref={ref}>
            <UnorderedListExtended.Item.Marker>{marker}</UnorderedListExtended.Item.Marker>
            {children}
        </UnorderedListExtended.Item>
    ),
);

UnorderedListItem.displayName = "UnorderedListItem";
