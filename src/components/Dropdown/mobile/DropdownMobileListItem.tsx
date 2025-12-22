import React from "react";
import clsx from "clsx";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import styles from "../styles/DropdownMobile.module.less";
import { NotificationIcon } from "../../NotificationIcon/NotificationIcon";

/** Свойства компонента DropdownMobileListItem. */
export interface IDropdownMobileListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    onSelect?: () => void;
    selected?: boolean;
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
}

/** Элемент списка мобильной версии Dropdown. */
export const DropdownMobileListItem = React.forwardRef<HTMLDivElement, IDropdownMobileListItemProps>(
    ({ children, className, id, onClick, onSelect, selected, showNotificationIcon, ...htmlAttributes }, ref) => {
        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            onSelect?.();
            onClick?.(event);
        };

        return (
            <Text
                tag="div"
                size={ETextSize.B3}
                className={clsx(styles.dropdownMobileListItem, { [styles.selected]: Boolean(selected) }, className)}
                aria-selected={Boolean(selected)}
                role="option"
                ref={ref}
                onClick={handleClick}
                title={typeof children === "string" ? children : undefined}
                {...htmlAttributes}
            >
                {children}
                {showNotificationIcon && <NotificationIcon className={styles.notificationIcon} />}
            </Text>
        );
    },
);

DropdownMobileListItem.displayName = "DropdownMobileListItem";
