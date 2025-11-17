import React from "react";
import styles from "../styles/Notification.module.less";

/**
 * Опции надписи времени нотификации.
 *
 * @prop {React.ReactText} time Строковое значение времени нотификации.
 */
export interface INotificationTimeProps {
    time: React.ReactText;
}

/**
 * Надпись времени нотификации.
 */
export const NotificationTime: React.FC<INotificationTimeProps> = ({ time }) => (
    <span className={styles.notificationTime}>{time}</span>
);

NotificationTime.displayName = "NotificationTime";
