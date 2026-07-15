import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { ListItemContext } from "@sberbusiness/triplex-next/components/List/components/ListItemContext";
import styles from "../styles/ListItemAction.module.less";

export interface IListItemActionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Интерактивная обёртка элемента списка. */
export const ListItemAction = React.forwardRef<HTMLDivElement, IListItemActionProps>(
    ({ children, className, onKeyDown, ...rest }, ref) => {
        const { setAction } = useContext(ListItemContext);

        useEffect(() => {
            setAction(true);
            return () => {
                setAction(false);
            };
        }, [setAction]);

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
            <div
                className={clsx(styles.listItemAction, className)}
                tabIndex={0}
                role="button"
                onKeyDown={handleKeyDown}
                {...rest}
                ref={ref}
                data-tx={process.env.npm_package_version}
            >
                {children}
            </div>
        );
    },
);

ListItemAction.displayName = "ListItemAction";
