import React from "react";
import styles from "../styles/Notification.module.less";

/** Опции кастомной иконки нотификации. */
export interface INotificationIconProps {
    /** Кастомная иконка нотификации. */
    children: React.ReactElement;
}

/**
 * Кастомная иконка нотификации.
 */
export const NotificationIcon: React.FC<INotificationIconProps> = ({ children }) => (
    <div className={styles.notificationIcon}>{children}</div>
);

NotificationIcon.displayName = "NotificationIcon";
