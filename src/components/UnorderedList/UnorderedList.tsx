import React from "react";
import { IUnorderedListProps } from "./types";
import { UnorderedListExtended } from "../UnorderedListExtended";
import { UnorderedListItem } from "./UnorderedListItem";

/** Маркированный список. */
export const UnorderedList = React.forwardRef<HTMLUListElement, IUnorderedListProps>(({ items, ...restProps }, ref) => (
    <UnorderedListExtended {...restProps} ref={ref}>
        {items?.map(({ key, ...restItem }, index) => (
            <UnorderedListItem key={key ?? restItem.id ?? index} {...restItem} />
        ))}
    </UnorderedListExtended>
));

UnorderedList.displayName = "UnorderedList";
