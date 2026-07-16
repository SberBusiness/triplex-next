import React from "react";
import clsx from "clsx";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { ListItem } from "@sberbusiness/triplex-next/components/List/components/ListItem";
import { ListItemContent } from "@sberbusiness/triplex-next/components/List/components/ListItemContent";
import styles from "../styles/ListActionItem.module.less";

export interface IListActionItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    listItemContentProps?: React.HTMLAttributes<HTMLDivElement>;
}

/** Интерактивная обёртка над элементом списка. */
export const ListActionItem = React.forwardRef<HTMLDivElement, IListActionItemProps>(
    ({ children, listItemContentProps = {}, ...rest }, ref) => {
        const { className, onKeyDown, ...restListItemContentProps } = listItemContentProps;

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(event);

            if (event.defaultPrevented) {
                return;
            }

            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                event.preventDefault();
                event.currentTarget.click();
            }
        };

        return (
            <ListItem {...rest}>
                <ListItemContent
                    className={clsx(styles.listActionItem, className)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={handleKeyDown}
                    {...restListItemContentProps}
                    ref={ref}
                >
                    {children}
                </ListItemContent>
            </ListItem>
        );
    },
);

ListActionItem.displayName = "ListActionItem";
