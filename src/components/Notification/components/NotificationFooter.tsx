import React from "react";
import styles from "../styles/Notification.module.less";

/**
 * Опции футера нотификации.
 *
 * @prop {React.ReactNode} children Дочерний элемент футера нотификации.
 */
export interface INotificationFooterProps {
    children: React.ReactNode;
}

/**
 * Футер нотификации.
 */
export const NotificationFooter: React.FC<INotificationFooterProps> = ({ children }) => (
    <div className={styles.notificationFooter}>{children}</div>
);

NotificationFooter.displayName = "NotificationFooter";
