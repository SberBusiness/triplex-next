import { NotificationGroupedFooter } from "./components/NotificationGroupedFooter";
import React from "react";
import styles from "./styles/Notification.module.less";

/**
 * Свойства NotificationGrouped.
 */
export interface INotificationGroupedProps {
    children: React.ReactNode;
}

/**
 * Компонент NotificationGrouped.
 * @prop {React.ReactNode} children Нотификация.
 */
export const NotificationGrouped: React.FC<INotificationGroupedProps> = ({ children }) => (
    <div className={styles.notificationGroupedWrapper}>
        {children}
        <NotificationGroupedFooter />
    </div>
);

NotificationGrouped.displayName = "NotificationGrouped";
