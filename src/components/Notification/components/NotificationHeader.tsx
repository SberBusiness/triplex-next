import React from "react";
import styles from "../styles/Notification.module.less";

/** Опции хэдера нотификации. */
export interface INotificationHeaderProps {
    /** Дочерний элемент хэдера нотификации. */
    children: React.ReactNode;
}

/**
 * Хэдер нотификации.
 */
export const NotificationHeader: React.FC<INotificationHeaderProps> = ({ children }) => (
    <h3 className={styles.notificationHeader}>{children}</h3>
);

NotificationHeader.displayName = "NotificationHeader";
