import React from "react";
import { IUnorderedListItemProps } from "./types";
import { UnorderedListExtended } from "../UnorderedListExtended";

/** Элемент маркированного списка. */
export const UnorderedListItem = React.forwardRef<HTMLLIElement, IUnorderedListItemProps>(
    ({ children, marker, ...restProps }, ref) => (
        <UnorderedListExtended.Item {...restProps} ref={ref}>
            <UnorderedListExtended.Item.Marker>{marker}</UnorderedListExtended.Item.Marker>
            {children}
        </UnorderedListExtended.Item>
    ),
);

UnorderedListItem.displayName = "UnorderedListItem";
