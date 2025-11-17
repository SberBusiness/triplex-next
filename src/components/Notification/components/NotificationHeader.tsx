import React from "react";
import styles from "../styles/Notification.module.less";

/**
 * Опции хэдера нотификации.
 *
 * @prop {React.ReactNode} children Дочерний элемент хэдера нотификации.
 */
export interface INotificationHeaderProps {
    children: React.ReactNode;
}

/**
 * Хэдер нотификации.
 */
export const NotificationHeader: React.FC<INotificationHeaderProps> = ({ children }) => (
    <h3 className={styles.notificationHeader}>{children}</h3>
);

NotificationHeader.displayName = "NotificationHeader";
