import React from "react";
import { IUnorderedListProps } from "./types";
import { UnorderedListExtended } from "../UnorderedListExtended";
import { UnorderedListItem } from "./UnorderedListItem";

const UnorderedListRoot = React.forwardRef<HTMLUListElement, IUnorderedListProps>(({ items, ...restProps }, ref) => (
    <UnorderedListExtended {...restProps} ref={ref}>
        {items?.map(({ key, ...restItem }) => (
            <UnorderedListItem key={key} {...restItem} />
        ))}
    </UnorderedListExtended>
));

UnorderedListRoot.displayName = "UnorderedList";

/** Маркированный список. */
export const UnorderedList = Object.assign(UnorderedListRoot, {
    Item: UnorderedListItem,
});
