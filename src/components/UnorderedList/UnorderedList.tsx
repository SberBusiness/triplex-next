import React from "react";
import clsx from "clsx";
import { IUnorderedListProps } from "@sberbusiness/triplex-next/components/UnorderedList/types";
import { UnorderedListItem } from "@sberbusiness/triplex-next/components/UnorderedList/UnorderedListItem";
import styles from "./styles/UnorderedList.module.less";

/** Маркированный список. */
export const UnorderedList = Object.assign(
    React.forwardRef<HTMLUListElement, IUnorderedListProps>(({ className, ...restProps }, ref) => (
        <ul
            className={clsx(styles.unorderedList, className)}
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={ref}
        />
    )),
    {
        Item: UnorderedListItem,
    },
);

UnorderedList.displayName = "UnorderedList";
