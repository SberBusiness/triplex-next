import React from "react";
import styles from "../styles/Notification.module.less";

/** Опции надписи времени нотификации. */
export interface INotificationTimeProps {
    /** Значение времени нотификации. */
    time: React.ReactNode;
}

/**
 * Надпись времени нотификации.
 */
export const NotificationTime: React.FC<INotificationTimeProps> = ({ time }) => (
    <span className={styles.notificationTime}>{time}</span>
);

NotificationTime.displayName = "NotificationTime";
