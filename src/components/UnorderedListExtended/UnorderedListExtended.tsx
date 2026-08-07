import React from "react";
import clsx from "clsx";
import { IUnorderedListExtendedProps } from "./types";
import { UnorderedListExtendedItem } from "./UnorderedListExtendedItem";
import styles from "./styles/UnorderedListExtended.module.less";

export const UnorderedListExtendedRoot = React.forwardRef<HTMLUListElement, IUnorderedListExtendedProps>(
    ({ className, ...restProps }, ref) => (
        <ul
            className={clsx(styles.unorderedListExtended, className)}
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={ref}
        />
    ),
);

UnorderedListExtendedRoot.displayName = "UnorderedListExtended";

/** Расширенный маркированный список. */
export const UnorderedListExtended = Object.assign(UnorderedListExtendedRoot, {
    Item: UnorderedListExtendedItem,
});
