import React from "react";
import clsx from "clsx";
import styles from "./styles/NotificationIcon.module.less";

export interface INotificationIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: never;
}

/** Компонент NotificationIcon. Отображает значок новых уведомлений в табах, дропдаунах. */
export const NotificationIcon: React.FC<INotificationIconProps> = ({ className, ...htmlAttributes }) => (
    <span {...htmlAttributes} className={clsx(styles.notificationIcon, className)} />
);

NotificationIcon.displayName = "NotificationIcon";
