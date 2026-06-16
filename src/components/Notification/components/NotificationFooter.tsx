import React from "react";
import styles from "../styles/Notification.module.less";

/** Опции футера нотификации. */
export interface INotificationFooterProps {
    /** Дочерний элемент футера нотификации. */
    children: React.ReactNode;
}

/**
 * Футер нотификации.
 */
export const NotificationFooter: React.FC<INotificationFooterProps> = ({ children }) => (
    <div className={styles.notificationFooter}>{children}</div>
);

NotificationFooter.displayName = "NotificationFooter";
