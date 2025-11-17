import React from "react";
import styles from "../styles/Notification.module.less";

/**
 * Опции кастомной иконки нотификации.
 *
 * @prop {React.ReactElement} children Кастомная иконка нотификации.
 */
export interface INotificationIconProps {
    children: React.ReactElement;
}

/**
 * Кастомная иконка нотификации.
 */
export const NotificationIcon: React.FC<INotificationIconProps> = ({ children }) => (
    <div className={styles.notificationIcon}>{children}</div>
);

NotificationIcon.displayName = "NotificationIcon";
