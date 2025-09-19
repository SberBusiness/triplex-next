import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemControlsButton.module.less";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";

export interface IListItemControlsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
}

/** Кнопка listItem для области под свайпом. */
export const ListItemControlsButton = React.forwardRef<HTMLButtonElement, IListItemControlsButtonProps>(
    ({ children, className, icon, ...rest }, ref) => (
        <button
            type="button"
            className={clsx(
                styles.listItemControlsButton,
                "hoverable",
                {
                    [styles.withIcon]: typeof icon !== "undefined",
                    [styles.withText]: typeof children !== "undefined",
                },
                className
            )}
            {...rest}
            ref={ref}
        >
            <span className={styles.listItemControlsButtonInner}>
                {icon ? <span className={styles.listItemControlsButtonIcon}>{icon}</span> : null}
                {children ? (
                    <Text className={styles.listItemControlsButtonLabel} size={ETextSize.B2}>
                        {children}
                    </Text>
                ) : null}
            </span>
        </button>
    )
);

ListItemControlsButton.displayName = "ListItemControlsButton";
