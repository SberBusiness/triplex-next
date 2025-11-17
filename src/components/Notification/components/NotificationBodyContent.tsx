import React from "react";
import styles from "../styles/Notification.module.less";

/** Свойства компонента NotificationBodyContent. */
interface INotificationBodyContentProps {
    children?: React.ReactNode;
}

/** Основное сообщение нотификации. */
export const NotificationBodyContent: React.FC<INotificationBodyContentProps> = ({ children }) => (
    <div className={styles.notificationBodyContent}>{children}</div>
);

NotificationBodyContent.displayName = "NotificationBodyContent";
